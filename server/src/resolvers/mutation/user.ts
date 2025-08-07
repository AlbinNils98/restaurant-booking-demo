import { ObjectId } from 'mongodb';
import { Role, type MutationResolvers } from "../../generated/graphql";

export const userMutationResolvers: MutationResolvers = {
  addUser: async (_parent, { name, email, password }, {users}) => {
    const doc = { _id: new ObjectId(), name, email, role: Role.User, password: password };
    await users.insertOne(doc);
    return doc;
  },
};