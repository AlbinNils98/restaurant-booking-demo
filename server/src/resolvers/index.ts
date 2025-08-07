import type { Resolvers } from "../generated/graphql";
import { authResolvers } from './mutation/signIn';
import { userMutationResolvers } from "./mutation/user";
import { userQueryResolvers } from "./query/user";

export const resolvers: Resolvers = {
  Query: {
    ...userQueryResolvers,
  },
  Mutation: {
    ...userMutationResolvers,
    ...authResolvers,
  },
};