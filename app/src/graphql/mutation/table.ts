import gql from 'graphql-tag';

export const ADD_TABLE_MUTATION = gql`
mutation AddTable($restaurantId: ObjectId!, $name: String!, $seats: Int!) {
  addTable(restaurantId: $restaurantId, name: $name, seats: $seats) {
  _id
  }
}
`;

export const UPDATE_TABLE_MUTATION = gql`
mutation UpdateTable($tableId: ObjectId!, $name: String, $seats: Int) {
  updateTable(tableId: $tableId, name: $name, seats: $seats) {
  _id
  }
}
`;

export const REMOVE_TABLE_MUTATION = gql`
mutation RemoveTable($tableId: ObjectId!) {
  removeTable(tableId: $tableId) {
  _id
  }
}
`;

export const UNDO_TABLE_REMOVAL_MUTATION = gql`
mutation UndoTableRemoval($tableId: ObjectId!) {
  undoTableRemoval(tableId: $tableId) {
  _id
  }
}
`;