import gql from 'graphql-tag';

export const GET_ALL_RESTAURANTS_QUERY = gql`
query GetAllRestaurants {
  getAllRestaurants {
    _id
    name
    adress
    openingDays
    openingHours {
    open
    close
    }
    sittings {
    startTime
    durationMinutes
    }
  }
}`

export const GET_AVAILABLE_SITTINGS_QUERY = gql`
query GetAvailableSittings($restaurantId:ObjectId!, $partySize: Int!) {
  getAvailableSittings(partySize: $partySize, restaurantId: $restaurantId)
}
`;


export const GET_MENU_QUERY = gql`
query GetMenu($restaurantId: ObjectId!){
  getMenu(restaurantId: $restaurantId){
  category
  items {
    _id
    name
    description
    price
    vegetarian
  }
  }
}
`;