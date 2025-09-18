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
  addRestaurant: Restaurant;
  addTable: Table;
  addUser: User;
  removeMenuItem: Scalars['Boolean']['output'];
  removeReservation: Scalars['Boolean']['output'];
  removeTable: Table;
  signIn: AuthRes;
  signOut: AuthRes;
  undoTableRemoval: Table;
  updateMenuItem: MenuItem;
  updateReservation: Reservation;
  updateRestaurant: Restaurant;
  updateTable: Table;
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


export type MutationAddRestaurantArgs = {
  adress: Scalars['String']['input'];
  name: Scalars['String']['input'];
  openingDays: Array<WeekDays>;
  openingHours: OpeningHoursInput;
  sittings: Array<SittingInput>;
};


export type MutationAddTableArgs = {
  name: Scalars['String']['input'];
  restaurantId: Scalars['ObjectId']['input'];
  seats: Scalars['Int']['input'];
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


export type MutationRemoveReservationArgs = {
  reservationId: Scalars['ObjectId']['input'];
};


export type MutationRemoveTableArgs = {
  tableId: Scalars['ObjectId']['input'];
};


export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUndoTableRemovalArgs = {
  tableId: Scalars['ObjectId']['input'];
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


export type MutationUpdateReservationArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  partySize?: InputMaybe<Scalars['Int']['input']>;
  reservationId: Scalars['ObjectId']['input'];
  sittingStart?: InputMaybe<Scalars['DateTime']['input']>;
  tableId?: InputMaybe<Scalars['ObjectId']['input']>;
};


export type MutationUpdateRestaurantArgs = {
  adress?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  openingDays?: InputMaybe<Array<WeekDays>>;
  openingHours?: InputMaybe<OpeningHoursInput>;
  restaurantId: Scalars['ObjectId']['input'];
  sittings?: InputMaybe<Array<SittingInput>>;
};


export type MutationUpdateTableArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  seats?: InputMaybe<Scalars['Int']['input']>;
  tableId: Scalars['ObjectId']['input'];
};

export type OpeningHours = {
  __typename?: 'OpeningHours';
  close: Scalars['String']['output'];
  open: Scalars['String']['output'];
};

export type OpeningHoursInput = {
  close: Scalars['String']['input'];
  open: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllRestaurants: Array<RestaurantDto>;
  getAvailableSittings: Array<Scalars['DateTime']['output']>;
  getMenu: Array<MenuCategory>;
  getReservationsByRestaurant: Array<ReservationDto>;
  getTables: Array<Table>;
  getTablesForSitting: Array<Table>;
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


export type QueryGetReservationsByRestaurantArgs = {
  restaurantId: Scalars['ObjectId']['input'];
};


export type QueryGetTablesArgs = {
  restaurantId: Scalars['ObjectId']['input'];
};


export type QueryGetTablesForSittingArgs = {
  partySize: Scalars['Int']['input'];
  restaurantId: Scalars['ObjectId']['input'];
  sitting: Scalars['DateTime']['input'];
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

export type ReservationDto = {
  __typename?: 'ReservationDto';
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
  table: Table;
  tableId: Scalars['ObjectId']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  _id: Scalars['ObjectId']['output'];
  adress: Scalars['String']['output'];
  menu: Array<MenuCategory>;
  name: Scalars['String']['output'];
  openingDays: Array<WeekDays>;
  openingHours: OpeningHours;
  sittings: Array<Sitting>;
};

export type RestaurantDto = {
  __typename?: 'RestaurantDto';
  _id: Scalars['ObjectId']['output'];
  adress: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  openingDays: Array<WeekDays>;
  openingHours: OpeningHours;
  sittings: Array<Sitting>;
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

export type SittingInput = {
  durationMinutes: Scalars['Int']['input'];
  startTime: Scalars['String']['input'];
};

export type Table = {
  __typename?: 'Table';
  _id: Scalars['ObjectId']['output'];
  createdAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  removalDate?: Maybe<Scalars['DateTime']['output']>;
  removed?: Maybe<Scalars['Boolean']['output']>;
  removedAt?: Maybe<Scalars['DateTime']['output']>;
  restaurantId: Scalars['ObjectId']['output'];
  seats: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
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

export type UpdateReservationMutationVariables = Exact<{
  reservationId: Scalars['ObjectId']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  sittingStart?: InputMaybe<Scalars['DateTime']['input']>;
  partySize?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  tableId?: InputMaybe<Scalars['ObjectId']['input']>;
}>;


export type UpdateReservationMutation = { __typename?: 'Mutation', updateReservation: { __typename?: 'Reservation', _id: string } };

export type RemoveReservationMutationVariables = Exact<{
  reservationId: Scalars['ObjectId']['input'];
}>;


export type RemoveReservationMutation = { __typename?: 'Mutation', removeReservation: boolean };

export type AddRestaurantMutationVariables = Exact<{
  name: Scalars['String']['input'];
  adress: Scalars['String']['input'];
  openingDays: Array<WeekDays> | WeekDays;
  openingHours: OpeningHoursInput;
  sittings: Array<SittingInput> | SittingInput;
}>;


export type AddRestaurantMutation = { __typename?: 'Mutation', addRestaurant: { __typename?: 'Restaurant', _id: string } };

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

export type UpdateRestaurantMutationVariables = Exact<{
  restaurantId: Scalars['ObjectId']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  adress?: InputMaybe<Scalars['String']['input']>;
  openingDays?: InputMaybe<Array<WeekDays> | WeekDays>;
  openingHours?: InputMaybe<OpeningHoursInput>;
  sittings?: InputMaybe<Array<SittingInput> | SittingInput>;
}>;


export type UpdateRestaurantMutation = { __typename?: 'Mutation', updateRestaurant: { __typename?: 'Restaurant', _id: string, name: string, adress: string, openingDays: Array<WeekDays>, openingHours: { __typename?: 'OpeningHours', open: string, close: string }, sittings: Array<{ __typename?: 'Sitting', startTime: string, durationMinutes: number }> } };

export type AddTableMutationVariables = Exact<{
  restaurantId: Scalars['ObjectId']['input'];
  name: Scalars['String']['input'];
  seats: Scalars['Int']['input'];
}>;


export type AddTableMutation = { __typename?: 'Mutation', addTable: { __typename?: 'Table', _id: string } };

export type UpdateTableMutationVariables = Exact<{
  tableId: Scalars['ObjectId']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  seats?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateTableMutation = { __typename?: 'Mutation', updateTable: { __typename?: 'Table', _id: string } };

export type RemoveTableMutationVariables = Exact<{
  tableId: Scalars['ObjectId']['input'];
}>;


export type RemoveTableMutation = { __typename?: 'Mutation', removeTable: { __typename?: 'Table', _id: string } };

export type UndoTableRemovalMutationVariables = Exact<{
  tableId: Scalars['ObjectId']['input'];
}>;


export type UndoTableRemovalMutation = { __typename?: 'Mutation', undoTableRemoval: { __typename?: 'Table', _id: string } };

export type GetReservationsByRestaurantQueryVariables = Exact<{
  restaurantId: Scalars['ObjectId']['input'];
}>;


export type GetReservationsByRestaurantQuery = { __typename?: 'Query', getReservationsByRestaurant: Array<{ __typename?: 'ReservationDto', _id: string, restaurantId: string, tableId: string, confirmationCode: string, firstName: string, lastName: string, email: string, partySize: number, sittingStart: string, sittingEnd: string, message: string, createdAt: string, updatedAt: string, table: { __typename?: 'Table', _id: string, name: string, seats: number, restaurantId: string, createdAt: string, updatedAt: string } }> };

export type GetAllRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRestaurantsQuery = { __typename?: 'Query', getAllRestaurants: Array<{ __typename?: 'RestaurantDto', _id: string, name?: string | null, adress: string, openingDays: Array<WeekDays>, openingHours: { __typename?: 'OpeningHours', open: string, close: string }, sittings: Array<{ __typename?: 'Sitting', startTime: string, durationMinutes: number }> }> };

export type GetAvailableSittingsQueryVariables = Exact<{
  restaurantId: Scalars['ObjectId']['input'];
  partySize: Scalars['Int']['input'];
}>;


export type GetAvailableSittingsQuery = { __typename?: 'Query', getAvailableSittings: Array<string> };

export type GetTablesForSittingQueryVariables = Exact<{
  restaurantId: Scalars['ObjectId']['input'];
  sitting: Scalars['DateTime']['input'];
  partySize: Scalars['Int']['input'];
}>;


export type GetTablesForSittingQuery = { __typename?: 'Query', getTablesForSitting: Array<{ __typename?: 'Table', _id: string, name: string, seats: number }> };

export type GetMenuQueryVariables = Exact<{
  restaurantId: Scalars['ObjectId']['input'];
}>;


export type GetMenuQuery = { __typename?: 'Query', getMenu: Array<{ __typename?: 'MenuCategory', category: string, items: Array<{ __typename?: 'MenuItem', _id: string, name: string, description?: string | null, price: number, vegetarian: boolean }> }> };

export type GetTablesQueryVariables = Exact<{
  restaurantId: Scalars['ObjectId']['input'];
}>;


export type GetTablesQuery = { __typename?: 'Query', getTables: Array<{ __typename?: 'Table', _id: string, restaurantId: string, name: string, seats: number, createdAt: string, updatedAt: string, removed?: boolean | null, removedAt?: string | null, removalDate?: string | null }> };

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
export const UpdateReservationDocument = gql`
    mutation UpdateReservation($reservationId: ObjectId!, $firstName: String, $lastName: String, $message: String, $sittingStart: DateTime, $partySize: Int, $email: String, $tableId: ObjectId) {
  updateReservation(
    reservationId: $reservationId
    firstName: $firstName
    lastName: $lastName
    message: $message
    sittingStart: $sittingStart
    partySize: $partySize
    email: $email
    tableId: $tableId
  ) {
    _id
  }
}
    `;
export type UpdateReservationMutationFn = Apollo.MutationFunction<UpdateReservationMutation, UpdateReservationMutationVariables>;

/**
 * __useUpdateReservationMutation__
 *
 * To run a mutation, you first call `useUpdateReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReservationMutation, { data, loading, error }] = useUpdateReservationMutation({
 *   variables: {
 *      reservationId: // value for 'reservationId'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      message: // value for 'message'
 *      sittingStart: // value for 'sittingStart'
 *      partySize: // value for 'partySize'
 *      email: // value for 'email'
 *      tableId: // value for 'tableId'
 *   },
 * });
 */
export function useUpdateReservationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReservationMutation, UpdateReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReservationMutation, UpdateReservationMutationVariables>(UpdateReservationDocument, options);
      }
export type UpdateReservationMutationHookResult = ReturnType<typeof useUpdateReservationMutation>;
export type UpdateReservationMutationResult = Apollo.MutationResult<UpdateReservationMutation>;
export type UpdateReservationMutationOptions = Apollo.BaseMutationOptions<UpdateReservationMutation, UpdateReservationMutationVariables>;
export const RemoveReservationDocument = gql`
    mutation RemoveReservation($reservationId: ObjectId!) {
  removeReservation(reservationId: $reservationId)
}
    `;
export type RemoveReservationMutationFn = Apollo.MutationFunction<RemoveReservationMutation, RemoveReservationMutationVariables>;

/**
 * __useRemoveReservationMutation__
 *
 * To run a mutation, you first call `useRemoveReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeReservationMutation, { data, loading, error }] = useRemoveReservationMutation({
 *   variables: {
 *      reservationId: // value for 'reservationId'
 *   },
 * });
 */
export function useRemoveReservationMutation(baseOptions?: Apollo.MutationHookOptions<RemoveReservationMutation, RemoveReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveReservationMutation, RemoveReservationMutationVariables>(RemoveReservationDocument, options);
      }
export type RemoveReservationMutationHookResult = ReturnType<typeof useRemoveReservationMutation>;
export type RemoveReservationMutationResult = Apollo.MutationResult<RemoveReservationMutation>;
export type RemoveReservationMutationOptions = Apollo.BaseMutationOptions<RemoveReservationMutation, RemoveReservationMutationVariables>;
export const AddRestaurantDocument = gql`
    mutation AddRestaurant($name: String!, $adress: String!, $openingDays: [WeekDays!]!, $openingHours: OpeningHoursInput!, $sittings: [SittingInput!]!) {
  addRestaurant(
    name: $name
    adress: $adress
    openingDays: $openingDays
    openingHours: $openingHours
    sittings: $sittings
  ) {
    _id
  }
}
    `;
export type AddRestaurantMutationFn = Apollo.MutationFunction<AddRestaurantMutation, AddRestaurantMutationVariables>;

/**
 * __useAddRestaurantMutation__
 *
 * To run a mutation, you first call `useAddRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRestaurantMutation, { data, loading, error }] = useAddRestaurantMutation({
 *   variables: {
 *      name: // value for 'name'
 *      adress: // value for 'adress'
 *      openingDays: // value for 'openingDays'
 *      openingHours: // value for 'openingHours'
 *      sittings: // value for 'sittings'
 *   },
 * });
 */
export function useAddRestaurantMutation(baseOptions?: Apollo.MutationHookOptions<AddRestaurantMutation, AddRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddRestaurantMutation, AddRestaurantMutationVariables>(AddRestaurantDocument, options);
      }
export type AddRestaurantMutationHookResult = ReturnType<typeof useAddRestaurantMutation>;
export type AddRestaurantMutationResult = Apollo.MutationResult<AddRestaurantMutation>;
export type AddRestaurantMutationOptions = Apollo.BaseMutationOptions<AddRestaurantMutation, AddRestaurantMutationVariables>;
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
export const UpdateRestaurantDocument = gql`
    mutation UpdateRestaurant($restaurantId: ObjectId!, $name: String, $adress: String, $openingDays: [WeekDays!], $openingHours: OpeningHoursInput, $sittings: [SittingInput!]) {
  updateRestaurant(
    restaurantId: $restaurantId
    name: $name
    adress: $adress
    openingDays: $openingDays
    openingHours: $openingHours
    sittings: $sittings
  ) {
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
}
    `;
export type UpdateRestaurantMutationFn = Apollo.MutationFunction<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>;

/**
 * __useUpdateRestaurantMutation__
 *
 * To run a mutation, you first call `useUpdateRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRestaurantMutation, { data, loading, error }] = useUpdateRestaurantMutation({
 *   variables: {
 *      restaurantId: // value for 'restaurantId'
 *      name: // value for 'name'
 *      adress: // value for 'adress'
 *      openingDays: // value for 'openingDays'
 *      openingHours: // value for 'openingHours'
 *      sittings: // value for 'sittings'
 *   },
 * });
 */
export function useUpdateRestaurantMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>(UpdateRestaurantDocument, options);
      }
export type UpdateRestaurantMutationHookResult = ReturnType<typeof useUpdateRestaurantMutation>;
export type UpdateRestaurantMutationResult = Apollo.MutationResult<UpdateRestaurantMutation>;
export type UpdateRestaurantMutationOptions = Apollo.BaseMutationOptions<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>;
export const AddTableDocument = gql`
    mutation AddTable($restaurantId: ObjectId!, $name: String!, $seats: Int!) {
  addTable(restaurantId: $restaurantId, name: $name, seats: $seats) {
    _id
  }
}
    `;
export type AddTableMutationFn = Apollo.MutationFunction<AddTableMutation, AddTableMutationVariables>;

/**
 * __useAddTableMutation__
 *
 * To run a mutation, you first call `useAddTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTableMutation, { data, loading, error }] = useAddTableMutation({
 *   variables: {
 *      restaurantId: // value for 'restaurantId'
 *      name: // value for 'name'
 *      seats: // value for 'seats'
 *   },
 * });
 */
export function useAddTableMutation(baseOptions?: Apollo.MutationHookOptions<AddTableMutation, AddTableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTableMutation, AddTableMutationVariables>(AddTableDocument, options);
      }
export type AddTableMutationHookResult = ReturnType<typeof useAddTableMutation>;
export type AddTableMutationResult = Apollo.MutationResult<AddTableMutation>;
export type AddTableMutationOptions = Apollo.BaseMutationOptions<AddTableMutation, AddTableMutationVariables>;
export const UpdateTableDocument = gql`
    mutation UpdateTable($tableId: ObjectId!, $name: String, $seats: Int) {
  updateTable(tableId: $tableId, name: $name, seats: $seats) {
    _id
  }
}
    `;
export type UpdateTableMutationFn = Apollo.MutationFunction<UpdateTableMutation, UpdateTableMutationVariables>;

/**
 * __useUpdateTableMutation__
 *
 * To run a mutation, you first call `useUpdateTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTableMutation, { data, loading, error }] = useUpdateTableMutation({
 *   variables: {
 *      tableId: // value for 'tableId'
 *      name: // value for 'name'
 *      seats: // value for 'seats'
 *   },
 * });
 */
export function useUpdateTableMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTableMutation, UpdateTableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTableMutation, UpdateTableMutationVariables>(UpdateTableDocument, options);
      }
export type UpdateTableMutationHookResult = ReturnType<typeof useUpdateTableMutation>;
export type UpdateTableMutationResult = Apollo.MutationResult<UpdateTableMutation>;
export type UpdateTableMutationOptions = Apollo.BaseMutationOptions<UpdateTableMutation, UpdateTableMutationVariables>;
export const RemoveTableDocument = gql`
    mutation RemoveTable($tableId: ObjectId!) {
  removeTable(tableId: $tableId) {
    _id
  }
}
    `;
export type RemoveTableMutationFn = Apollo.MutationFunction<RemoveTableMutation, RemoveTableMutationVariables>;

/**
 * __useRemoveTableMutation__
 *
 * To run a mutation, you first call `useRemoveTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTableMutation, { data, loading, error }] = useRemoveTableMutation({
 *   variables: {
 *      tableId: // value for 'tableId'
 *   },
 * });
 */
export function useRemoveTableMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTableMutation, RemoveTableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTableMutation, RemoveTableMutationVariables>(RemoveTableDocument, options);
      }
export type RemoveTableMutationHookResult = ReturnType<typeof useRemoveTableMutation>;
export type RemoveTableMutationResult = Apollo.MutationResult<RemoveTableMutation>;
export type RemoveTableMutationOptions = Apollo.BaseMutationOptions<RemoveTableMutation, RemoveTableMutationVariables>;
export const UndoTableRemovalDocument = gql`
    mutation UndoTableRemoval($tableId: ObjectId!) {
  undoTableRemoval(tableId: $tableId) {
    _id
  }
}
    `;
export type UndoTableRemovalMutationFn = Apollo.MutationFunction<UndoTableRemovalMutation, UndoTableRemovalMutationVariables>;

/**
 * __useUndoTableRemovalMutation__
 *
 * To run a mutation, you first call `useUndoTableRemovalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUndoTableRemovalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [undoTableRemovalMutation, { data, loading, error }] = useUndoTableRemovalMutation({
 *   variables: {
 *      tableId: // value for 'tableId'
 *   },
 * });
 */
export function useUndoTableRemovalMutation(baseOptions?: Apollo.MutationHookOptions<UndoTableRemovalMutation, UndoTableRemovalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UndoTableRemovalMutation, UndoTableRemovalMutationVariables>(UndoTableRemovalDocument, options);
      }
export type UndoTableRemovalMutationHookResult = ReturnType<typeof useUndoTableRemovalMutation>;
export type UndoTableRemovalMutationResult = Apollo.MutationResult<UndoTableRemovalMutation>;
export type UndoTableRemovalMutationOptions = Apollo.BaseMutationOptions<UndoTableRemovalMutation, UndoTableRemovalMutationVariables>;
export const GetReservationsByRestaurantDocument = gql`
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
    table {
      _id
      name
      seats
      restaurantId
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetReservationsByRestaurantQuery__
 *
 * To run a query within a React component, call `useGetReservationsByRestaurantQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReservationsByRestaurantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReservationsByRestaurantQuery({
 *   variables: {
 *      restaurantId: // value for 'restaurantId'
 *   },
 * });
 */
export function useGetReservationsByRestaurantQuery(baseOptions: Apollo.QueryHookOptions<GetReservationsByRestaurantQuery, GetReservationsByRestaurantQueryVariables> & ({ variables: GetReservationsByRestaurantQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReservationsByRestaurantQuery, GetReservationsByRestaurantQueryVariables>(GetReservationsByRestaurantDocument, options);
      }
export function useGetReservationsByRestaurantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReservationsByRestaurantQuery, GetReservationsByRestaurantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReservationsByRestaurantQuery, GetReservationsByRestaurantQueryVariables>(GetReservationsByRestaurantDocument, options);
        }
export function useGetReservationsByRestaurantSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetReservationsByRestaurantQuery, GetReservationsByRestaurantQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReservationsByRestaurantQuery, GetReservationsByRestaurantQueryVariables>(GetReservationsByRestaurantDocument, options);
        }
export type GetReservationsByRestaurantQueryHookResult = ReturnType<typeof useGetReservationsByRestaurantQuery>;
export type GetReservationsByRestaurantLazyQueryHookResult = ReturnType<typeof useGetReservationsByRestaurantLazyQuery>;
export type GetReservationsByRestaurantSuspenseQueryHookResult = ReturnType<typeof useGetReservationsByRestaurantSuspenseQuery>;
export type GetReservationsByRestaurantQueryResult = Apollo.QueryResult<GetReservationsByRestaurantQuery, GetReservationsByRestaurantQueryVariables>;
export const GetAllRestaurantsDocument = gql`
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
export const GetTablesForSittingDocument = gql`
    query GetTablesForSitting($restaurantId: ObjectId!, $sitting: DateTime!, $partySize: Int!) {
  getTablesForSitting(
    restaurantId: $restaurantId
    sitting: $sitting
    partySize: $partySize
  ) {
    _id
    name
    seats
  }
}
    `;

/**
 * __useGetTablesForSittingQuery__
 *
 * To run a query within a React component, call `useGetTablesForSittingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTablesForSittingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTablesForSittingQuery({
 *   variables: {
 *      restaurantId: // value for 'restaurantId'
 *      sitting: // value for 'sitting'
 *      partySize: // value for 'partySize'
 *   },
 * });
 */
export function useGetTablesForSittingQuery(baseOptions: Apollo.QueryHookOptions<GetTablesForSittingQuery, GetTablesForSittingQueryVariables> & ({ variables: GetTablesForSittingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTablesForSittingQuery, GetTablesForSittingQueryVariables>(GetTablesForSittingDocument, options);
      }
export function useGetTablesForSittingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTablesForSittingQuery, GetTablesForSittingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTablesForSittingQuery, GetTablesForSittingQueryVariables>(GetTablesForSittingDocument, options);
        }
export function useGetTablesForSittingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTablesForSittingQuery, GetTablesForSittingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTablesForSittingQuery, GetTablesForSittingQueryVariables>(GetTablesForSittingDocument, options);
        }
export type GetTablesForSittingQueryHookResult = ReturnType<typeof useGetTablesForSittingQuery>;
export type GetTablesForSittingLazyQueryHookResult = ReturnType<typeof useGetTablesForSittingLazyQuery>;
export type GetTablesForSittingSuspenseQueryHookResult = ReturnType<typeof useGetTablesForSittingSuspenseQuery>;
export type GetTablesForSittingQueryResult = Apollo.QueryResult<GetTablesForSittingQuery, GetTablesForSittingQueryVariables>;
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
export const GetTablesDocument = gql`
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

/**
 * __useGetTablesQuery__
 *
 * To run a query within a React component, call `useGetTablesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTablesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTablesQuery({
 *   variables: {
 *      restaurantId: // value for 'restaurantId'
 *   },
 * });
 */
export function useGetTablesQuery(baseOptions: Apollo.QueryHookOptions<GetTablesQuery, GetTablesQueryVariables> & ({ variables: GetTablesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTablesQuery, GetTablesQueryVariables>(GetTablesDocument, options);
      }
export function useGetTablesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTablesQuery, GetTablesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTablesQuery, GetTablesQueryVariables>(GetTablesDocument, options);
        }
export function useGetTablesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTablesQuery, GetTablesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTablesQuery, GetTablesQueryVariables>(GetTablesDocument, options);
        }
export type GetTablesQueryHookResult = ReturnType<typeof useGetTablesQuery>;
export type GetTablesLazyQueryHookResult = ReturnType<typeof useGetTablesLazyQuery>;
export type GetTablesSuspenseQueryHookResult = ReturnType<typeof useGetTablesSuspenseQuery>;
export type GetTablesQueryResult = Apollo.QueryResult<GetTablesQuery, GetTablesQueryVariables>;
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