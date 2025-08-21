import sendEmail from '@/email/emailService';
import { EmailTemplate, getTemplate } from '@/email/templateLoader';
import { MutationResolvers, Reservation } from '@/generated/graphql';
import { GraphQLContext } from '@/graphql/context';
import generateConfirmationCode from '@/util/generateConfirmationCode';
import normalizeDate from '@/util/normalizeDate';
import validateEmail from '@/util/validateEmail';
import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';

export const reservationMutationResolvers: MutationResolvers<GraphQLContext> = {
  addReservation: async (
    _parent,
    { firstName, lastName, message, sittingStart, email, partySize, restaurantId },
    { restaurants, tables, reservations }
  ) => {
    if (!validateEmail(email)) {
      throw new GraphQLError("Invalid email format");
    }

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

    const sittingStartDate = new Date(sittingStart);
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

    // Convert tableIds to string or ObjectId for matching
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