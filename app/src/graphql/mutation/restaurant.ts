import gql from 'graphql-tag';

export const UPDATE_MENU_ITEM_MUTATION = gql`
mutation updateMenuItem(
$restaurantId: ObjectId!, 
$itemId:ObjectId!, 
$categoryName: CategoryName, 
$name: String, 
$description: String, 
$price: Float, 
$vegetarian: Boolean){
  updateMenuItem(
    restaurantId: $restaurantId, 
    categoryName: $categoryName,
    itemId: $itemId,
    name: $name, 
    description: $description,
    price: $price,
    vegetarian: $vegetarian
  ){
    _id
    name
    description
    price
    vegetarian
  }
}
`;

export const REMOVE_MENU_ITEM_MUTATION = gql`
mutation RemoveMenuItem(
  $restaurantId: ObjectId!,
  $itemId: ObjectId!
){
  removeMenuItem(
    restaurantId: $restaurantId,
    itemId: $itemId 
  )
}
`;

export const ADD_MENU_ITEM_MUTATION = gql`
mutation AddMenuItem(
$restaurantId: ObjectId!, 
$categoryName: CategoryName!, 
$name: String!, 
$description: String, 
$price: Float!, 
$vegetarian: Boolean!){
  addMenuItem(
    restaurantId: $restaurantId, 
    categoryName: $categoryName,
    name: $name, 
    description: $description,
    price: $price,
    vegetarian: $vegetarian
  ){
    _id
    name
    description
    price
    vegetarian
  }
}
`;