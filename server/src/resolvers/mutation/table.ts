import { MutationResolvers } from '@/generated/graphql';
import { GraphQLContext } from '@/graphql/context';
import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';

export const tableMutationResolvers: MutationResolvers<GraphQLContext> = {
  updateTable: async (_, { tableId, name, seats }, { tables }) => {
    const update = {
      ...(name && { name }),
      ...(seats && { seats }),
      updatedAt: new Date()
    }

    const updatedTable = await tables.findOneAndUpdate(
      { _id: new ObjectId(tableId) },
      { $set: update },
      { returnDocument: "after" }
    );

    if (!updatedTable) throw new GraphQLError("Failed to update table");

    return updatedTable;
  },
  removeTable: async (_, { tableId }, { tables }) => {

    const removedTable = await tables.findOneAndUpdate(
      { _id: new ObjectId(tableId) },
      { $set: { removed: true, removedAt: new Date(), updatedAt: new Date() } },
      { returnDocument: "after" }
    );

    if (!removedTable) throw new GraphQLError("Failed to remove table");

    return removedTable;
  },
  undoRemoval: async (_, { tableId }, { tables }) => {
    const updatedTable = await tables.findOneAndUpdate(
      { _id: new ObjectId(tableId) },
      {
        $unset: { removed: "", removedAt: "" },
        $set: { updatedAt: new Date() }
      },
      { returnDocument: "after" }
    );

    if (!updatedTable) throw new GraphQLError("Failed to undo removal");

    return updatedTable;
  }
}