import { QueryResolvers } from '@/generated/graphql';
import { GraphQLContext } from '@/graphql/context';
import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';

export const tableQueryResolvers: QueryResolvers<GraphQLContext> = {
  getTables: async (_, { restaurantId }, { tables, restaurants }) => {
    const restaurant = await restaurants.findOne({ _id: new ObjectId(restaurantId) });
    if (!restaurant) throw new GraphQLError("No restaurant found with id");

    const restaurantsTables = await tables.find({ restaurantId: restaurant._id }).toArray();

    return restaurantsTables;
  },
};