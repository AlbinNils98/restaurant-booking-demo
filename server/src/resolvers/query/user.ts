import { ObjectId } from 'mongodb';
import type { QueryResolvers } from "../../generated/graphql";

export const userQueryResolvers: QueryResolvers = {
  user: async (_parent, { _id }, ctx) => {
    return ctx.users.findOne({ _id: new ObjectId(_id) });
  },
  users: async (_parent, _args, ctx) => {
    return ctx.users.find().toArray();
  },
};