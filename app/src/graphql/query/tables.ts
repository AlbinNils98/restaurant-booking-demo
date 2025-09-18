import gql from 'graphql-tag';

export const GET_TABLES_QUERY = gql`
query GetTables($restaurantId: ObjectId!) {
  getTables(restaurantId: $restaurantId) {
    _id
    restaurantId
    name
    seats
    createdAt
    updatedAt
    removed
    removedAt
    removalDate
  }
}
`;