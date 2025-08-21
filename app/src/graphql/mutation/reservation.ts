import gql from 'graphql-tag';

export const ADD_RESERVATION_MUTATION = gql`
mutation AddReservation(
  $restaurantId:ObjectId!,
  $firstName: String!, 
  $lastName: String!,
  $message: String,
  $sittingStart: DateTime!, 
  $partySize: Int!, 
  $email: String!,
) {
  addReservation(
    restaurantId: $restaurantId
    firstName: $firstName, 
    lastName: $lastName,
    message: $message,
    sittingStart: $sittingStart, 
    partySize: $partySize, 
    email: $email
  ) {
    _id
    firstName
    lastName
    message
    sittingStart
    sittingEnd
    partySize
    email
    restaurantId
    tableId
    createdAt
  }
}`  