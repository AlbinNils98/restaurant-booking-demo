import sendEmail from '@/email/emailService';
import { EmailTemplate, getTemplate } from '@/email/templateLoader';
import { MutationResolvers, Reservation } from '@/generated/graphql';
import { GraphQLContext } from '@/graphql/context';
import generateConfirmationCode from '@/util/generateConfirmationCode';
import validateEmail from '@/util/validateEmail';
import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';

const validateName = (name: string, fieldName: string) => {
  const trimmedName = name.trim();
  if (trimmedName.length <= 0) throw new GraphQLError(`${fieldName} cannot be empty`);
  if (trimmedName.length > 35) throw new GraphQLError(`${fieldName} cannot exceed 50 characters`);
  if (!/^[a-zA-Z ,.'-]+$/.test(trimmedName)) throw new GraphQLError(`${fieldName} contains invalid characters`);
}

const validatePartySize = (partySize: number) => {
  if (partySize <= 0) throw new GraphQLError("Party size must be greater than zero");
  if (partySize > 10) throw new GraphQLError("Party size cannot exceed 10 people. Please contact the restaurant directly for larger groups.");
}

const validateMessage = (message: string) => {
  if (message.length > 500) throw new GraphQLError("Message cannot exceed 500 characters");
}

const validateDateTime = (dateTime: Date) => {
  if (isNaN(dateTime.getTime())) throw new GraphQLError("Invalid date time format");
  if (dateTime < new Date()) throw new GraphQLError("Reservation time must be in the future");
}

export const reservationMutationResolvers: MutationResolvers<GraphQLContext> = {
  addReservation: async (
    _parent,
    { firstName, lastName, message, sittingStart, email, partySize, restaurantId },
    { restaurants, tables, reservations }
  ) => {

    validateName(firstName, "First name");
    validateName(lastName, "Last name");
    validatePartySize(partySize);
    if (message) validateMessage(message);
    if (!validateEmail(email)) throw new GraphQLError("Invalid email format");
    const sittingStartDate = new Date(sittingStart);
    validateDateTime(sittingStartDate);


    const restaurant = await restaurants.findOne({ _id: new ObjectId(restaurantId) });
    if (!restaurant) throw new GraphQLError("Restaurant not found");

    // Find the sitting object for the selected start time
    const sitting = restaurant.sittings.find(s => {
      const [hours, minutes] = s.startTime.split(":").map(Number);
      const sittingDate = new Date(sittingStart);
      sittingDate.setHours(hours, minutes, 0, 0);
      return sittingDate.getTime() === new Date(sittingStart).getTime();
    });

    if (!sitting) throw new GraphQLError("No sitting available at the selected time");

    const sittingEnd = new Date(sittingStartDate.getTime() + sitting.durationMinutes * 60000);

    // Find reservations that overlap with this sitting
    const overlappingReservations = await reservations
      .find({
        restaurantId: restaurant._id,
        $or: [
          { sittingStart: { $lt: sittingEnd }, sittingEnd: { $gt: sittingStartDate } }
        ]
      })
      .toArray();

    const reservedTableIds = overlappingReservations.map(r => r.tableId.toString());

    // Pick the first table that fits the party size and isn't reserved
    const availableTable = await tables.findOne({
      restaurantId: restaurant._id,
      seats: { $gte: partySize },
      _id: { $nin: reservedTableIds.map(id => new ObjectId(id)) },
    });

    if (!availableTable) throw new GraphQLError("No tables available for this sitting");

    const now = new Date();
    const newReservationId = new ObjectId();

    const newReservation = await reservations.findOneAndUpdate(
      { _id: newReservationId },
      {
        $setOnInsert: {
          _id: newReservationId,
          confirmationCode: generateConfirmationCode(),
          firstName,
          lastName,
          email,
          message: message || "",
          tableId: availableTable._id,
          restaurantId: restaurant._id,
          partySize,
          sittingStart: sittingStartDate,
          sittingEnd,
          createdAt: now,
          updatedAt: now,
        },
      },
      { upsert: true, returnDocument: "after" }
    );

    if (!newReservation) throw new GraphQLError("Failed to create reservation");

    await sendEmail(
      email,
      "Your Table Booking is Confirmed!",
      confirmationMessage({
        firstName,
        lastName,
        confirmationCode: newReservation.confirmationCode,
        arrival: sittingStartDate.toLocaleString(),
        partySize,
        restaurantName: restaurant.name,
      }),
      getTemplate(EmailTemplate.CONFIRMATION, {
        firstName,
        lastName,
        confirmationCode: newReservation.confirmationCode,
        arrival: sittingStartDate.toLocaleString(),
        partySize,
        restaurantName: restaurant.name,
      })
    ).catch(async () => {
      await reservations.deleteOne({ _id: newReservation._id });
      throw new GraphQLError(
        "Failed to confirm reservation via email, please contact the restaurant directly or try again later."
      );
    });

    return newReservation;
  },

  updateReservation: async (
    _parent,
    { reservationId, firstName, lastName, message, email, partySize, sittingStart, tableId },
    { reservations, tables, restaurants }
  ) => {

    const reservation = await reservations.findOne({ _id: new ObjectId(reservationId) });
    if (!reservation) throw new GraphQLError("Reservation not found");

    if (reservation.sittingStart < new Date()) {
      throw new GraphQLError("Cannot modify past reservations");
    }

    const restaurant = await restaurants.findOne({ _id: reservation.restaurantId });
    if (!restaurant) throw new GraphQLError("Restaurant not found");

    if (email && !validateEmail(email)) throw new GraphQLError("Invalid email format");
    if (firstName) validateName(firstName, "First name");
    if (lastName) validateName(lastName, "Last name");
    if (partySize) validatePartySize(partySize);
    if (message) validateMessage(message);
    if (sittingStart) {
      const sittingStartDate = new Date(sittingStart);
      validateDateTime(sittingStartDate);
    }

    let updatedFields: Partial<Reservation> = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(message && { message }),
      ...(email && { email }),
      ...(partySize && { partySize }),
      updatedAt: new Date(),
    };

    // Handle sittingStart change
    if (sittingStart && new Date(sittingStart).getTime() !== reservation.sittingStart.getTime()) {
      const sitting = restaurant.sittings.find(s => {
        const [hours, minutes] = s.startTime.split(":").map(Number);
        const sittingDate = new Date(sittingStart);
        sittingDate.setHours(hours, minutes, 0, 0);
        return sittingDate.getTime() === new Date(sittingStart).getTime();
      });
      if (!sitting) throw new GraphQLError("No sitting available at the selected time");

      const sittingStartDate = new Date(sittingStart);
      const sittingEnd = new Date(sittingStartDate.getTime() + sitting.durationMinutes * 60000);

      // Find overlapping reservations for this sitting
      const overlappingReservations = await reservations
        .find({
          restaurantId: restaurant._id,
          _id: { $ne: reservation._id },
          $or: [{ sittingStart: { $lt: sittingEnd }, sittingEnd: { $gt: sittingStartDate } }]
        })
        .toArray();
      const reservedTableIds = overlappingReservations.map(r => r.tableId.toString());

      let finalTableId: ObjectId;

      // If specific tableId is passed, check availability
      if (tableId) {
        if (reservedTableIds.includes(tableId.toString())) {
          throw new GraphQLError("Requested table is already reserved for this sitting");
        }
        const requestedTable = await tables.findOne({
          _id: new ObjectId(tableId),
          restaurantId: restaurant._id,
          seats: { $gte: partySize || reservation.partySize },
        });
        if (!requestedTable) throw new GraphQLError("Requested table is not available for this sitting");
        finalTableId = requestedTable._id;
      } else {
        // Otherwise, auto-assign first available table
        const availableTable = await tables.findOne({
          restaurantId: restaurant._id,
          seats: { $gte: partySize || reservation.partySize },
          _id: { $nin: reservedTableIds.map(id => new ObjectId(id)) }
        });
        if (!availableTable) throw new GraphQLError("No tables available for this sitting");
        finalTableId = availableTable._id;
      }

      updatedFields = {
        ...updatedFields,
        tableId: finalTableId,
        sittingStart: sittingStartDate,
        sittingEnd,
      };


    } else if (tableId && !new ObjectId(tableId).equals(reservation.tableId)) {
      // Sitting not changed, but maybe tableId and partySize changed

      // Find overlapping reservations for current sitting
      const sittingStartDate = reservation.sittingStart;
      const sittingEndDate = reservation.sittingEnd;

      const overlappingReservations = await reservations
        .find({
          restaurantId: restaurant._id,
          _id: { $ne: reservation._id },
          $or: [{ sittingStart: { $lt: sittingEndDate }, sittingEnd: { $gt: sittingStartDate } }]
        })
        .toArray();

      const reservedTableIds = overlappingReservations.map(r => r.tableId.toString());

      if (reservedTableIds.includes(tableId.toString())) {
        throw new GraphQLError("Requested table is already reserved for this sitting");
      }

      const requestedTable = await tables.findOne({
        _id: new ObjectId(tableId),
        restaurantId: restaurant._id,
        seats: { $gte: partySize || reservation.partySize },
      });

      if (!requestedTable) {
        throw new GraphQLError("Requested table is not available for this sitting");
      }

      updatedFields.tableId = requestedTable._id;
    }


    else if (partySize && partySize !== reservation.partySize) {
      // If only party size changed, check current table
      const table = await tables.findOne({ _id: reservation.tableId });
      if (!table) throw new GraphQLError("Table not found");
      if (table.seats < partySize) {
        throw new GraphQLError("Current table cannot accommodate the new party size. Choose a new sitting and or table.");
      }
    }

    const updatedReservation = await reservations.findOneAndUpdate(
      { _id: new ObjectId(reservationId) },
      { $set: updatedFields },
      { returnDocument: "after" }
    );

    if (!updatedReservation) throw new GraphQLError("Failed to update reservation");
    await sendEmail(
      updatedReservation.email,
      "Your Table Reservation Has Been Updated!",
      confirmationMessage({
        firstName: updatedReservation.firstName,
        lastName: updatedReservation.lastName,
        confirmationCode: updatedReservation.confirmationCode,
        arrival: updatedReservation.sittingStart.toLocaleString(),
        partySize: updatedReservation.partySize,
        restaurantName: restaurant.name,
      }),
      getTemplate(EmailTemplate.CONFIRMATION, {
        firstName: updatedReservation.firstName,
        lastName: updatedReservation.lastName,
        confirmationCode: updatedReservation.confirmationCode,
        arrival: updatedReservation.sittingStart.toLocaleString(),
        partySize: updatedReservation.partySize,
        restaurantName: restaurant.name,
      })
    ).catch(() => {
      throw new GraphQLError(
        "Failed to confirm reservation via email, please contact the restaurant directly or try again later."
      );
    });

    return updatedReservation;
  },

  removeReservation: async (
    _parent,
    { reservationId },
    { reservations }
  ) => {
    const result = await reservations.deleteOne({ _id: new ObjectId(reservationId) });
    return result.deletedCount === 1;
  }
}

const confirmationMessage = ({
  firstName,
  lastName,
  confirmationCode,
  arrival,
  partySize,
  restaurantName
}: {
  firstName: string;
  lastName: string;
  confirmationCode: string;
  arrival: string;
  partySize: number;
  restaurantName: string;
}) => `
Dear ${firstName} ${lastName},

Thank you for your reservation at ${restaurantName}.

Your reservation details:
- Confirmation Code: ${confirmationCode}
- Arrival Time: ${arrival}
- Party Size: ${partySize}

We look forward to welcoming you!

If you have any questions, please contact us.
`;