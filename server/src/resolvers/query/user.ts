import { ObjectId } from 'mongodb';
import type { QueryResolvers } from "../../generated/graphql";
import { GraphQLContext } from '@/graphql/context';
import { GraphQLError } from 'graphql';

export const userQueryResolvers: QueryResolvers<GraphQLContext> = {
  me: async (_parent, _, { req, users, currentUser }) => {
    if (!currentUser) throw new GraphQLError("Not authenticated");
    const me = await users.findOne({ _id: new ObjectId(currentUser?._id) });
    if (!me) throw new GraphQLError("Could not find user")

    return { _id: me._id, name: me.name }

  },
  users: async (_parent, _args, ctx) => {
    return ctx.users.find().toArray();
  },
};