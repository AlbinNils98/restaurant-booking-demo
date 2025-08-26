import gql from 'graphql-tag';

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