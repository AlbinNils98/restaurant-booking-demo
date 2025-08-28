import { MutationResolvers, Table } from '@/generated/graphql';
import { GraphQLContext } from '@/graphql/context';
import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';

export const tableMutationResolvers: MutationResolvers<GraphQLContext> = {
  addTable: async (_, { restaurantId, name, seats }, { tables }) => {
    const newTableId = new ObjectId();

    const newTable: Partial<Table> = {
      restaurantId: new ObjectId(restaurantId),
      name,
      seats,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await tables.findOneAndUpdate(
      { _id: newTableId },
      { $set: newTable },
      { upsert: true, returnDocument: "after" });

    if (!result) throw new GraphQLError("Failed to add table");

    return result;
  },
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
  undoTableRemoval: async (_, { tableId }, { tables }) => {
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