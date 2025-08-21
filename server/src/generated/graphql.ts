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
  addUser: User;
  removeMenuItem: Scalars['Boolean']['output'];
  signIn: Scalars['String']['output'];
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
  categoryName: CategoryName;
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
  user?: Maybe<User>;
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


export type QueryUserArgs = {
  _id: Scalars['ObjectId']['input'];
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

export enum WeekDays {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

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
  Query: ResolverTypeWrapper<{}>;
  Reservation: ResolverTypeWrapper<Reservation>;
  Restaurant: ResolverTypeWrapper<Restaurant>;
  RestaurantDto: ResolverTypeWrapper<RestaurantDto>;
  Role: Role;
  Sitting: ResolverTypeWrapper<Sitting>;
  Table: ResolverTypeWrapper<Table>;
  TableDto: ResolverTypeWrapper<TableDto>;
  User: ResolverTypeWrapper<User>;
  WeekDays: WeekDays;
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
  Query: {};
  Reservation: Reservation;
  Restaurant: Restaurant;
  RestaurantDto: RestaurantDto;
  Sitting: Sitting;
  Table: Table;
  TableDto: TableDto;
  User: User;
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
  addUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAddUserArgs, 'email' | 'name' | 'password'>>;
  removeMenuItem?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveMenuItemArgs, 'categoryName' | 'itemId' | 'restaurantId'>>;
  signIn?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'email' | 'password'>>;
  updateMenuItem?: Resolver<ResolversTypes['MenuItem'], ParentType, ContextType, RequireFields<MutationUpdateMenuItemArgs, 'itemId' | 'restaurantId'>>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllRestaurants?: Resolver<Array<ResolversTypes['RestaurantDto']>, ParentType, ContextType>;
  getAvailableSittings?: Resolver<Array<ResolversTypes['DateTime']>, ParentType, ContextType, RequireFields<QueryGetAvailableSittingsArgs, 'partySize' | 'restaurantId'>>;
  getMenu?: Resolver<Array<ResolversTypes['MenuCategory']>, ParentType, ContextType, RequireFields<QueryGetMenuArgs, 'restaurantId'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, '_id'>>;
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

export type RestaurantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Restaurant'] = ResolversParentTypes['Restaurant']> = {
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  menu?: Resolver<Array<ResolversTypes['MenuCategory']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  openingDays?: Resolver<Array<ResolversTypes['WeekDays']>, ParentType, ContextType>;
  sittings?: Resolver<Array<ResolversTypes['Sitting']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RestaurantDtoResolvers<ContextType = any, ParentType extends ResolversParentTypes['RestaurantDto'] = ResolversParentTypes['RestaurantDto']> = {
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  restaurantId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  seats?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TableDtoResolvers<ContextType = any, ParentType extends ResolversParentTypes['TableDto'] = ResolversParentTypes['TableDto']> = {
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  availableDates?: Resolver<Array<ResolversTypes['DateTime']>, ParentType, ContextType>;
  restaurantId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
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

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  MenuCategory?: MenuCategoryResolvers<ContextType>;
  MenuItem?: MenuItemResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Reservation?: ReservationResolvers<ContextType>;
  Restaurant?: RestaurantResolvers<ContextType>;
  RestaurantDto?: RestaurantDtoResolvers<ContextType>;
  Sitting?: SittingResolvers<ContextType>;
  Table?: TableResolvers<ContextType>;
  TableDto?: TableDtoResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
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