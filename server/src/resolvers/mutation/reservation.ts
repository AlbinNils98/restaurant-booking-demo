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
  addReservation: async (_parent, { firstName, lastName, message, arrival, email, partySize, tableId }, { restaurants, tables, reservations }) => {

    if (!validateEmail(email)) {
      throw new GraphQLError('Invalid email format');
    }

    const table = await tables.findOne({ _id: new ObjectId(tableId) });

    const arrivalDate = normalizeDate(arrival);

    // Check if the table exists
    if (!table) {
      throw new GraphQLError('Table not found');
    }

    // Check that party size does not exceed table capacity
    if (table.seats < partySize) {
      throw new GraphQLError('Party size exceeds table capacity');
    }

    // Check that time is still available
    if (!table.availableDates.some(d => new Date(d).getTime() === arrivalDate.getTime())) {
      throw new GraphQLError('Table is not available at the selected time');
    }

    const restaurant = await restaurants.findOne({ _id: table.restaurantId });

    // Check if the restaurant exists
    if (!restaurant) {
      throw new GraphQLError('Restaurant not found');
    }

    const newReservationId = new ObjectId();
    const now = new Date();

    const newReservation = await reservations.findOneAndUpdate(
      { _id: newReservationId },
      {
        $setOnInsert: {
          _id: newReservationId,
          confirmationCode: generateConfirmationCode(),
          firstName,
          lastName,
          email,
          message: message || '',
          tableId: table._id,
          restaurantId: table.restaurantId,
          partySize,
          arrival: arrivalDate,
          createdAt: now,
          updatedAt: now,
        }
      },
      { upsert: true, returnDocument: 'after' }
    );

    if (!newReservation) {
      throw new GraphQLError('Failed to create reservation');
    }

    const removeDate = await tables.findOneAndUpdate(
      { _id: new ObjectId(tableId) },
      { $pull: { availableDates: arrivalDate }, $push: { reservationIds: newReservation._id } },
      { returnDocument: 'after' }
    );


    if (removeDate?.availableDates.some(d => new Date(d).getTime() === arrivalDate.getTime())) {
      await reservations.deleteOne({ _id: newReservation._id });
      await tables.findOneAndUpdate(
        { _id: new ObjectId(tableId) },
        {
          $pull: { reservationIds: newReservation._id },
          $push: { availableDates: arrivalDate }
        },
      );
      throw new GraphQLError("Failed to update table availability");
    }

    await sendEmail(email
      , "Your Table Booking is Confirmed!", confirmationMessage({
        firstName,
        lastName,
        confirmationCode: newReservation.confirmationCode,
        arrival: arrivalDate.toLocaleString(),
        partySize,
        restaurantName: restaurant.name
      }), getTemplate(EmailTemplate.CONFIRMATION, {
        firstName,
        lastName,
        confirmationCode: newReservation.confirmationCode,
        arrival: arrivalDate.toLocaleString(),
        partySize,
        restaurantName: restaurant.name
      })).catch(async () => {
        await reservations.deleteOne({ _id: newReservation._id });
        await tables.findOneAndUpdate(
          { _id: new ObjectId(tableId) },
          {
            $pull: { reservationIds: newReservation._id },
            $push: { availableDates: arrivalDate }
          },
        );
        throw new GraphQLError('Failed to confirm reservation via email, please contact the restaurant directly or try again at a later time.');

      })

    return newReservation;
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