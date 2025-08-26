import type { Resolvers } from "@/generated/graphql";
import { authMutationResolvers } from '@/resolvers/mutation/auth';
import { userQueryResolvers } from "@/resolvers/query/user";
import { reservationMutationResolvers } from '@/resolvers/mutation/reservation';
import { restaurantMutationResolvers } from '@/resolvers/mutation/restaurant';
import { restaurantQueryResolvers } from './query/restaurant';
import { tableQueryResolvers } from './query/table';
import { tableMutationResolvers } from './mutation/table';

export const resolvers: Resolvers = {
  Query: {
    ...userQueryResolvers,
    ...restaurantQueryResolvers,
    ...tableQueryResolvers,
  },
  Mutation: {
    ...authMutationResolvers,
    ...reservationMutationResolvers,
    ...restaurantMutationResolvers,
    ...tableMutationResolvers,

  },
};