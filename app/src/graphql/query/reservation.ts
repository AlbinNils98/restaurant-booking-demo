import gql from 'graphql-tag';

export const GET_RESERVATIONS_BY_RESTAURANT_QUERY = gql`
  query GetReservationsByRestaurant($restaurantId: ObjectId!) {
    getReservationsByRestaurant(restaurantId: $restaurantId) {
      _id
      restaurantId
      tableId
      confirmationCode
      firstName
      lastName
      email
      partySize
      sittingStart
      sittingEnd
      message
      createdAt
      updatedAt
      tableName
    }
  }
`;