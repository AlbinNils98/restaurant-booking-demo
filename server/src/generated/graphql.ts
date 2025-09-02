import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
  ObjectId: { input: ObjectId; output: ObjectId; }
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
  tableId: Scalars['ObjectId']['output'];
  tableName?: Maybe<Scalars['String']['output']>;
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

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  CategoryName: CategoryName;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  MenuCategory: ResolverTypeWrapper<MenuCategory>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  MenuItem: ResolverTypeWrapper<MenuItem>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ObjectId: ResolverTypeWrapper<Scalars['ObjectId']['output']>;
  OpeningHours: ResolverTypeWrapper<OpeningHours>;
  OpeningHoursInput: OpeningHoursInput;
  Query: ResolverTypeWrapper<{}>;
  Reservation: ResolverTypeWrapper<Reservation>;
  ReservationDto: ResolverTypeWrapper<ReservationDto>;
  Restaurant: ResolverTypeWrapper<Restaurant>;
  RestaurantDto: ResolverTypeWrapper<RestaurantDto>;
  Role: Role;
  Sitting: ResolverTypeWrapper<Sitting>;
  SittingInput: SittingInput;
  Table: ResolverTypeWrapper<Table>;
  User: ResolverTypeWrapper<User>;
  UserDto: ResolverTypeWrapper<UserDto>;
  WeekDays: WeekDays;
  authRes: ResolverTypeWrapper<AuthRes>;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  DateTime: Scalars['DateTime']['output'];
  MenuCategory: MenuCategory;
  String: Scalars['String']['output'];
  MenuItem: MenuItem;
  Int: Scalars['Int']['output'];
  Boolean: Scalars['Boolean']['output'];
  Mutation: {};
  Float: Scalars['Float']['output'];
  ObjectId: Scalars['ObjectId']['output'];
  OpeningHours: OpeningHours;
  OpeningHoursInput: OpeningHoursInput;
  Query: {};
  Reservation: Reservation;
  ReservationDto: ReservationDto;
  Restaurant: Restaurant;
  RestaurantDto: RestaurantDto;
  Sitting: Sitting;
  SittingInput: SittingInput;
  Table: Table;
  User: User;
  UserDto: UserDto;
  authRes: AuthRes;
  AdditionalEntityFields: AdditionalEntityFields;
};

export type AuthDirectiveArgs = {
  role: Role;
};

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type PublicDirectiveArgs = { };

export type PublicDirectiveResolver<Result, Parent, ContextType = any, Args = PublicDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String']['input'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String']['input'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MenuCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuCategory'] = ResolversParentTypes['MenuCategory']> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['MenuItem']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuItem'] = ResolversParentTypes['MenuItem']> = {
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  vegetarian?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addMenuItem?: Resolver<ResolversTypes['MenuItem'], ParentType, ContextType, RequireFields<MutationAddMenuItemArgs, 'categoryName' | 'name' | 'price' | 'restaurantId' | 'vegetarian'>>;
  addReservation?: Resolver<ResolversTypes['Reservation'], ParentType, ContextType, RequireFields<MutationAddReservationArgs, 'email' | 'firstName' | 'lastName' | 'partySize' | 'restaurantId' | 'sittingStart'>>;
  addRestaurant?: Resolver<ResolversTypes['Restaurant'], ParentType, ContextType, RequireFields<MutationAddRestaurantArgs, 'adress' | 'name' | 'openingDays' | 'openingHours' | 'sittings'>>;
  addTable?: Resolver<ResolversTypes['Table'], ParentType, ContextType, RequireFields<MutationAddTableArgs, 'name' | 'restaurantId' | 'seats'>>;
  addUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAddUserArgs, 'email' | 'name' | 'password'>>;
  removeMenuItem?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveMenuItemArgs, 'itemId' | 'restaurantId'>>;
  removeTable?: Resolver<ResolversTypes['Table'], ParentType, ContextType, RequireFields<MutationRemoveTableArgs, 'tableId'>>;
  signIn?: Resolver<ResolversTypes['authRes'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'email' | 'password'>>;
  signOut?: Resolver<ResolversTypes['authRes'], ParentType, ContextType>;
  undoTableRemoval?: Resolver<ResolversTypes['Table'], ParentType, ContextType, RequireFields<MutationUndoTableRemovalArgs, 'tableId'>>;
  updateMenuItem?: Resolver<ResolversTypes['MenuItem'], ParentType, ContextType, RequireFields<MutationUpdateMenuItemArgs, 'itemId' | 'restaurantId'>>;
  updateReservation?: Resolver<ResolversTypes['Reservation'], ParentType, ContextType, RequireFields<MutationUpdateReservationArgs, 'reservationId'>>;
  updateRestaurant?: Resolver<ResolversTypes['Restaurant'], ParentType, ContextType, RequireFields<MutationUpdateRestaurantArgs, 'restaurantId'>>;
  updateTable?: Resolver<ResolversTypes['Table'], ParentType, ContextType, RequireFields<MutationUpdateTableArgs, 'tableId'>>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export type OpeningHoursResolvers<ContextType = any, ParentType extends ResolversParentTypes['OpeningHours'] = ResolversParentTypes['OpeningHours']> = {
  close?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  open?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllRestaurants?: Resolver<Array<ResolversTypes['RestaurantDto']>, ParentType, ContextType>;
  getAvailableSittings?: Resolver<Array<ResolversTypes['DateTime']>, ParentType, ContextType, RequireFields<QueryGetAvailableSittingsArgs, 'partySize' | 'restaurantId'>>;
  getMenu?: Resolver<Array<ResolversTypes['MenuCategory']>, ParentType, ContextType, RequireFields<QueryGetMenuArgs, 'restaurantId'>>;
  getReservationsByRestaurant?: Resolver<Array<ResolversTypes['ReservationDto']>, ParentType, ContextType, RequireFields<QueryGetReservationsByRestaurantArgs, 'restaurantId'>>;
  getTables?: Resolver<Array<ResolversTypes['Table']>, ParentType, ContextType, RequireFields<QueryGetTablesArgs, 'restaurantId'>>;
  me?: Resolver<ResolversTypes['UserDto'], ParentType, ContextType>;
  userByName?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByNameArgs, 'name'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type ReservationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reservation'] = ResolversParentTypes['Reservation']> = {
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  confirmationCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  partySize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  restaurantId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  sittingEnd?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  sittingStart?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  tableId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReservationDtoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReservationDto'] = ResolversParentTypes['ReservationDto']> = {
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  confirmationCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  partySize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  restaurantId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  sittingEnd?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  sittingStart?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  tableId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  tableName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RestaurantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Restaurant'] = ResolversParentTypes['Restaurant']> = {
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  adress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  menu?: Resolver<Array<ResolversTypes['MenuCategory']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  openingDays?: Resolver<Array<ResolversTypes['WeekDays']>, ParentType, ContextType>;
  openingHours?: Resolver<ResolversTypes['OpeningHours'], ParentType, ContextType>;
  sittings?: Resolver<Array<ResolversTypes['Sitting']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RestaurantDtoResolvers<ContextType = any, ParentType extends ResolversParentTypes['RestaurantDto'] = ResolversParentTypes['RestaurantDto']> = {
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  adress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  openingDays?: Resolver<Array<ResolversTypes['WeekDays']>, ParentType, ContextType>;
  openingHours?: Resolver<ResolversTypes['OpeningHours'], ParentType, ContextType>;
  sittings?: Resolver<Array<ResolversTypes['Sitting']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SittingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sitting'] = ResolversParentTypes['Sitting']> = {
  durationMinutes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TableResolvers<ContextType = any, ParentType extends ResolversParentTypes['Table'] = ResolversParentTypes['Table']> = {
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  removed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  removedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  restaurantId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  seats?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserDtoResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserDto'] = ResolversParentTypes['UserDto']> = {
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthResResolvers<ContextType = any, ParentType extends ResolversParentTypes['authRes'] = ResolversParentTypes['authRes']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  MenuCategory?: MenuCategoryResolvers<ContextType>;
  MenuItem?: MenuItemResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  OpeningHours?: OpeningHoursResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reservation?: ReservationResolvers<ContextType>;
  ReservationDto?: ReservationDtoResolvers<ContextType>;
  Restaurant?: RestaurantResolvers<ContextType>;
  RestaurantDto?: RestaurantDtoResolvers<ContextType>;
  Sitting?: SittingResolvers<ContextType>;
  Table?: TableResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserDto?: UserDtoResolvers<ContextType>;
  authRes?: AuthResResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  public?: PublicDirectiveResolver<any, any, ContextType>;
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};

import { ObjectId } from 'mongodb';