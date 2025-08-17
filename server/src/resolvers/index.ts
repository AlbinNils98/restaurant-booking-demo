import type { Resolvers } from "@/generated/graphql";
import { authResolvers } from '@/resolvers/mutation/signIn';
import { userQueryResolvers } from "@/resolvers/query/user";
import { reservationMutationResolvers } from '@/resolvers/mutation/reservation';
import { restaurantMutationResolvers } from '@/resolvers/mutation/restaurant';

export const resolvers: Resolvers = {
  Query: {
    ...userQueryResolvers,
  },
  Mutation: {
    ...authResolvers,
    ...reservationMutationResolvers,
    ...restaurantMutationResolvers,
  },
};