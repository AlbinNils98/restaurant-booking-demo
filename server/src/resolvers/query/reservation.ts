import { QueryResolvers, ReservationDto, Table } from '@/generated/graphql';
import { GraphQLContext } from '@/graphql/context';
import { ObjectId } from 'mongodb';

export const reservationQueryResolvers: QueryResolvers<GraphQLContext> = {
  getReservationsByRestaurant: async (_parent, { restaurantId }, { reservations, tables }) => {
    const restaurantObjectId = new ObjectId(restaurantId);
    const reservationDocs = await reservations.find({ restaurantId: restaurantObjectId }).toArray();
    const tableDocs = await tables.find({ restaurantId: restaurantObjectId }).toArray();

    const tableMap = new Map(tableDocs.map(table => [table._id.toString(), table]));

    const reservationDtos: ReservationDto[] = reservationDocs.map(doc => {
      const table = tableMap.get(doc.tableId.toString());

      return {
        _id: doc._id,
        restaurantId: doc.restaurantId,
        tableId: doc.tableId,
        confirmationCode: doc.confirmationCode,
        firstName: doc.firstName,
        lastName: doc.lastName,
        email: doc.email,
        partySize: doc.partySize,
        sittingStart: doc.sittingStart,
        sittingEnd: doc.sittingEnd,
        message: doc.message,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        table: table || { _id: new ObjectId(), restaurantId: doc.restaurantId, name: "Unknown", seats: 0 } as Table,
      };
    });

    return reservationDtos;
  },
};

