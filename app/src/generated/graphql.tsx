import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
  ObjectId: { input: string; output: string; }
};

export enum CategoryName {
  Appetizers = 'APPETIZERS',
  Breakfast = 'BREAKFAST',
  Desserts = 'DESSERTS',
  Dinner = 'DINNER',
  Drinks = 'DRINKS',
  Lunch = 'LUNCH'
}

export type MenuCategory = {
  __typename?: 'MenuCategory';
  category: Scalars['String']['output'];
  items: Array<MenuItem>;
};

export type MenuItem = {
  __typename?: 'MenuItem';
  _id: Scalars['ObjectId']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  vegetarian: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addMenuItem: MenuItem;
  addReservation: Reservation;
  addUser: User;
  removeMenuItem: Scalars['Boolean']['output'];
  signIn: AuthRes;
  signOut: AuthRes;
  updateMenuItem: MenuItem;
};


export type MutationAddMenuItemArgs = {
  categoryName: CategoryName;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  restaurantId: Scalars['ObjectId']['input'];
  vegetarian: Scalars['Boolean']['input'];
};


export type MutationAddReservationArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  partySize: Scalars['Int']['input'];
  restaurantId: Scalars['ObjectId']['input'];
  sittingStart: Scalars['DateTime']['input'];
};


export type MutationAddUserArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveMenuItemArgs = {
  itemId: Scalars['ObjectId']['input'];
  restaurantId: Scalars['ObjectId']['input'];
};


export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateMenuItemArgs = {
  categoryName?: InputMaybe<CategoryName>;
  description?: InputMaybe<Scalars['String']['input']>;
  itemId: Scalars['ObjectId']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  restaurantId: Scalars['ObjectId']['input'];
  vegetarian?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getAllRestaurants: Array<RestaurantDto>;
  getAvailableSittings: Array<Scalars['DateTime']['output']>;
  getMenu: Array<MenuCategory>;
  me: UserDto;
  userByName?: Maybe<User>;
  users: Array<User>;
};


export type QueryGetAvailableSittingsArgs = {
  partySize: Scalars['Int']['input'];
  restaurantId: Scalars['ObjectId']['input'];
};


export type QueryGetMenuArgs = {
  restaurantId: Scalars['ObjectId']['input'];
};


export type QueryUserByNameArgs = {
  name: Scalars['String']['input'];
};

export type Reservation = {
  __typename?: 'Reservation';
  _id: Scalars['ObjectId']['output'];
  confirmationCode: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  message: Scalars['String']['output'];
  partySize: Scalars['Int']['output'];
  restaurantId: Scalars['ObjectId']['output'];
  sittingEnd: Scalars['DateTime']['output'];
  sittingStart: Scalars['DateTime']['output'];
  tableId: Scalars['ObjectId']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  _id: Scalars['ObjectId']['output'];
  menu: Array<MenuCategory>;
  name: Scalars['String']['output'];
  openingDays: Array<WeekDays>;
  sittings: Array<Sitting>;
};

export type RestaurantDto = {
  __typename?: 'RestaurantDto';
  _id: Scalars['ObjectId']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Sitting = {
  __typename?: 'Sitting';
  durationMinutes: Scalars['Int']['output'];
  startTime: Scalars['String']['output'];
};

export type Table = {
  __typename?: 'Table';
  _id: Scalars['ObjectId']['output'];
  createdAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  restaurantId: Scalars['ObjectId']['output'];
  seats: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TableDto = {
  __typename?: 'TableDto';
  _id: Scalars['ObjectId']['output'];
  availableDates: Array<Scalars['DateTime']['output']>;
  restaurantId: Scalars['ObjectId']['output'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Role;
};

export type UserDto = {
  __typename?: 'UserDto';
  _id: Scalars['ObjectId']['output'];
  name: Scalars['String']['output'];
};

export enum WeekDays {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type AuthRes = {
  __typename?: 'authRes';
  success: Scalars['Boolean']['output'];
};

export type SignInMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'authRes', success: boolean } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: { __typename?: 'authRes', success: boolean } };

export type AddReservationMutationVariables = Exact<{
  restaurantId: Scalars['ObjectId']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  sittingStart: Scalars['DateTime']['input'];
  partySize: Scalars['Int']['input'];
  email: Scalars['String']['input'];
}>;


export type AddReservationMutation = { __typename?: 'Mutation', addReservation: { __typename?: 'Reservation', _id: string, firstName: string, lastName: string, message: string, sittingStart: string, sittingEnd: string, partySize: number, email: string, restaurantId: string, tableId: string, createdAt: string } };

export type UpdateMenuItemMutationVariables = Exact<{
  restaurantId: Scalars['ObjectId']['input'];
  itemId: Scalars['ObjectId']['input'];
  categoryName?: InputMaybe<CategoryName>;
  name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  vegetarian?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateMenuItemMutation = { __typename?: 'Mutation', updateMenuItem: { __typename?: 'MenuItem', _id: string, name: string, description?: string | null, price: number, vegetarian: boolean } };

export type RemoveMenuItemMutationVariables = Exact<{
  restaurantId: Scalars['ObjectId']['input'];
  itemId: Scalars['ObjectId']['input'];
}>;


export type RemoveMenuItemMutation = { __typename?: 'Mutation', removeMenuItem: boolean };

export type AddMenuItemMutationVariables = Exact<{
  restaurantId: Scalars['ObjectId']['input'];
  categoryName: CategoryName;
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
  vegetarian: Scalars['Boolean']['input'];
}>;


export type AddMenuItemMutation = { __typename?: 'Mutation', addMenuItem: { __typename?: 'MenuItem', _id: string, name: string, description?: string | null, price: number, vegetarian: boolean } };

export type GetAllRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRestaurantsQuery = { __typename?: 'Query', getAllRestaurants: Array<{ __typename?: 'RestaurantDto', _id: string, name?: string | null }> };

export type GetAvailableSittingsQueryVariables = Exact<{
  restaurantId: Scalars['ObjectId']['input'];
  partySize: Scalars['Int']['input'];
}>;


export type GetAvailableSittingsQuery = { __typename?: 'Query', getAvailableSittings: Array<string> };

export type GetMenuQueryVariables = Exact<{
  restaurantId: Scalars['ObjectId']['input'];
}>;


export type GetMenuQuery = { __typename?: 'Query', getMenu: Array<{ __typename?: 'MenuCategory', category: string, items: Array<{ __typename?: 'MenuItem', _id: string, name: string, description?: string | null, price: number, vegetarian: boolean }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserDto', _id: string, name: string } };


export const SignInDocument = gql`
    mutation SignIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    success
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignOutDocument = gql`
    mutation SignOut {
  signOut {
    success
  }
}
    `;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, options);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const AddReservationDocument = gql`
    mutation AddReservation($restaurantId: ObjectId!, $firstName: String!, $lastName: String!, $message: String, $sittingStart: DateTime!, $partySize: Int!, $email: String!) {
  addReservation(
    restaurantId: $restaurantId
    firstName: $firstName
    lastName: $lastName
    message: $message
    sittingStart: $sittingStart
    partySize: $partySize
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
}
    `;
export type AddReservationMutationFn = Apollo.MutationFunction<AddReservationMutation, AddReservationMutationVariables>;

/**
 * __useAddReservationMutation__
 *
 * To run a mutation, you first call `useAddReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReservationMutation, { data, loading, error }] = useAddReservationMutation({
 *   variables: {
 *      restaurantId: // value for 'restaurantId'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      message: // value for 'message'
 *      sittingStart: // value for 'sittingStart'
 *      partySize: // value for 'partySize'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddReservationMutation(baseOptions?: Apollo.MutationHookOptions<AddReservationMutation, AddReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddReservationMutation, AddReservationMutationVariables>(AddReservationDocument, options);
      }
export type AddReservationMutationHookResult = ReturnType<typeof useAddReservationMutation>;
export type AddReservationMutationResult = Apollo.MutationResult<AddReservationMutation>;
export type AddReservationMutationOptions = Apollo.BaseMutationOptions<AddReservationMutation, AddReservationMutationVariables>;
export const UpdateMenuItemDocument = gql`
    mutation updateMenuItem($restaurantId: ObjectId!, $itemId: ObjectId!, $categoryName: CategoryName, $name: String, $description: String, $price: Float, $vegetarian: Boolean) {
  updateMenuItem(
    restaurantId: $restaurantId
    categoryName: $categoryName
    itemId: $itemId
    name: $name
    description: $description
    price: $price
    vegetarian: $vegetarian
  ) {
    _id
    name
    description
    price
    vegetarian
  }
}
    `;
export type UpdateMenuItemMutationFn = Apollo.MutationFunction<UpdateMenuItemMutation, UpdateMenuItemMutationVariables>;

/**
 * __useUpdateMenuItemMutation__
 *
 * To run a mutation, you first call `useUpdateMenuItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMenuItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMenuItemMutation, { data, loading, error }] = useUpdateMenuItemMutation({
 *   variables: {
 *      restaurantId: // value for 'restaurantId'
 *      itemId: // value for 'itemId'
 *      categoryName: // value for 'categoryName'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      price: // value for 'price'
 *      vegetarian: // value for 'vegetarian'
 *   },
 * });
 */
export function useUpdateMenuItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMenuItemMutation, UpdateMenuItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMenuItemMutation, UpdateMenuItemMutationVariables>(UpdateMenuItemDocument, options);
      }
export type UpdateMenuItemMutationHookResult = ReturnType<typeof useUpdateMenuItemMutation>;
export type UpdateMenuItemMutationResult = Apollo.MutationResult<UpdateMenuItemMutation>;
export type UpdateMenuItemMutationOptions = Apollo.BaseMutationOptions<UpdateMenuItemMutation, UpdateMenuItemMutationVariables>;
export const RemoveMenuItemDocument = gql`
    mutation RemoveMenuItem($restaurantId: ObjectId!, $itemId: ObjectId!) {
  removeMenuItem(restaurantId: $restaurantId, itemId: $itemId)
}
    `;
export type RemoveMenuItemMutationFn = Apollo.MutationFunction<RemoveMenuItemMutation, RemoveMenuItemMutationVariables>;

/**
 * __useRemoveMenuItemMutation__
 *
 * To run a mutation, you first call `useRemoveMenuItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMenuItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMenuItemMutation, { data, loading, error }] = useRemoveMenuItemMutation({
 *   variables: {
 *      restaurantId: // value for 'restaurantId'
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useRemoveMenuItemMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMenuItemMutation, RemoveMenuItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMenuItemMutation, RemoveMenuItemMutationVariables>(RemoveMenuItemDocument, options);
      }
export type RemoveMenuItemMutationHookResult = ReturnType<typeof useRemoveMenuItemMutation>;
export type RemoveMenuItemMutationResult = Apollo.MutationResult<RemoveMenuItemMutation>;
export type RemoveMenuItemMutationOptions = Apollo.BaseMutationOptions<RemoveMenuItemMutation, RemoveMenuItemMutationVariables>;
export const AddMenuItemDocument = gql`
    mutation AddMenuItem($restaurantId: ObjectId!, $categoryName: CategoryName!, $name: String!, $description: String, $price: Float!, $vegetarian: Boolean!) {
  addMenuItem(
    restaurantId: $restaurantId
    categoryName: $categoryName
    name: $name
    description: $description
    price: $price
    vegetarian: $vegetarian
  ) {
    _id
    name
    description
    price
    vegetarian
  }
}
    `;
export type AddMenuItemMutationFn = Apollo.MutationFunction<AddMenuItemMutation, AddMenuItemMutationVariables>;

/**
 * __useAddMenuItemMutation__
 *
 * To run a mutation, you first call `useAddMenuItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMenuItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMenuItemMutation, { data, loading, error }] = useAddMenuItemMutation({
 *   variables: {
 *      restaurantId: // value for 'restaurantId'
 *      categoryName: // value for 'categoryName'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      price: // value for 'price'
 *      vegetarian: // value for 'vegetarian'
 *   },
 * });
 */
export function useAddMenuItemMutation(baseOptions?: Apollo.MutationHookOptions<AddMenuItemMutation, AddMenuItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMenuItemMutation, AddMenuItemMutationVariables>(AddMenuItemDocument, options);
      }
export type AddMenuItemMutationHookResult = ReturnType<typeof useAddMenuItemMutation>;
export type AddMenuItemMutationResult = Apollo.MutationResult<AddMenuItemMutation>;
export type AddMenuItemMutationOptions = Apollo.BaseMutationOptions<AddMenuItemMutation, AddMenuItemMutationVariables>;
export const GetAllRestaurantsDocument = gql`
    query GetAllRestaurants {
  getAllRestaurants {
    _id
    name
  }
}
    `;

/**
 * __useGetAllRestaurantsQuery__
 *
 * To run a query within a React component, call `useGetAllRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRestaurantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRestaurantsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRestaurantsQuery, GetAllRestaurantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRestaurantsQuery, GetAllRestaurantsQueryVariables>(GetAllRestaurantsDocument, options);
      }
export function useGetAllRestaurantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRestaurantsQuery, GetAllRestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRestaurantsQuery, GetAllRestaurantsQueryVariables>(GetAllRestaurantsDocument, options);
        }
export function useGetAllRestaurantsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllRestaurantsQuery, GetAllRestaurantsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllRestaurantsQuery, GetAllRestaurantsQueryVariables>(GetAllRestaurantsDocument, options);
        }
export type GetAllRestaurantsQueryHookResult = ReturnType<typeof useGetAllRestaurantsQuery>;
export type GetAllRestaurantsLazyQueryHookResult = ReturnType<typeof useGetAllRestaurantsLazyQuery>;
export type GetAllRestaurantsSuspenseQueryHookResult = ReturnType<typeof useGetAllRestaurantsSuspenseQuery>;
export type GetAllRestaurantsQueryResult = Apollo.QueryResult<GetAllRestaurantsQuery, GetAllRestaurantsQueryVariables>;
export const GetAvailableSittingsDocument = gql`
    query GetAvailableSittings($restaurantId: ObjectId!, $partySize: Int!) {
  getAvailableSittings(partySize: $partySize, restaurantId: $restaurantId)
}
    `;

/**
 * __useGetAvailableSittingsQuery__
 *
 * To run a query within a React component, call `useGetAvailableSittingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvailableSittingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvailableSittingsQuery({
 *   variables: {
 *      restaurantId: // value for 'restaurantId'
 *      partySize: // value for 'partySize'
 *   },
 * });
 */
export function useGetAvailableSittingsQuery(baseOptions: Apollo.QueryHookOptions<GetAvailableSittingsQuery, GetAvailableSittingsQueryVariables> & ({ variables: GetAvailableSittingsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAvailableSittingsQuery, GetAvailableSittingsQueryVariables>(GetAvailableSittingsDocument, options);
      }
export function useGetAvailableSittingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAvailableSittingsQuery, GetAvailableSittingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAvailableSittingsQuery, GetAvailableSittingsQueryVariables>(GetAvailableSittingsDocument, options);
        }
export function useGetAvailableSittingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAvailableSittingsQuery, GetAvailableSittingsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAvailableSittingsQuery, GetAvailableSittingsQueryVariables>(GetAvailableSittingsDocument, options);
        }
export type GetAvailableSittingsQueryHookResult = ReturnType<typeof useGetAvailableSittingsQuery>;
export type GetAvailableSittingsLazyQueryHookResult = ReturnType<typeof useGetAvailableSittingsLazyQuery>;
export type GetAvailableSittingsSuspenseQueryHookResult = ReturnType<typeof useGetAvailableSittingsSuspenseQuery>;
export type GetAvailableSittingsQueryResult = Apollo.QueryResult<GetAvailableSittingsQuery, GetAvailableSittingsQueryVariables>;
export const GetMenuDocument = gql`
    query GetMenu($restaurantId: ObjectId!) {
  getMenu(restaurantId: $restaurantId) {
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

/**
 * __useGetMenuQuery__
 *
 * To run a query within a React component, call `useGetMenuQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMenuQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMenuQuery({
 *   variables: {
 *      restaurantId: // value for 'restaurantId'
 *   },
 * });
 */
export function useGetMenuQuery(baseOptions: Apollo.QueryHookOptions<GetMenuQuery, GetMenuQueryVariables> & ({ variables: GetMenuQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMenuQuery, GetMenuQueryVariables>(GetMenuDocument, options);
      }
export function useGetMenuLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMenuQuery, GetMenuQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMenuQuery, GetMenuQueryVariables>(GetMenuDocument, options);
        }
export function useGetMenuSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMenuQuery, GetMenuQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMenuQuery, GetMenuQueryVariables>(GetMenuDocument, options);
        }
export type GetMenuQueryHookResult = ReturnType<typeof useGetMenuQuery>;
export type GetMenuLazyQueryHookResult = ReturnType<typeof useGetMenuLazyQuery>;
export type GetMenuSuspenseQueryHookResult = ReturnType<typeof useGetMenuSuspenseQuery>;
export type GetMenuQueryResult = Apollo.QueryResult<GetMenuQuery, GetMenuQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    _id
    name
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;