import gql from 'graphql-tag';

export const GET_ALL_RESTAURANTS_QUERY = gql`
query GetAllRestaurants {
  getAllRestaurants {
    _id
    name
  }
}`

export const GET_AVAILABLE_SITTINGS_QUERY = gql`
query GetAvailableSittins($restaurantId:ObjectId!, $partySize: Int!) {
  getAvailableSittings(partySize: $partySize, restaurantId: $restaurantId)
}
`;