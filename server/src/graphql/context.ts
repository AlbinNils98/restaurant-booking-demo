// src/graphql/context.ts
import type { Collection, Db } from "mongodb";
import type { Reservation, Restaurant, Table, User } from "../generated/graphql";

export interface GraphQLContext {
  db: Db;
  users: Collection<User>;
  restaurants?: Collection<Restaurant>;
  tables?: Collection<Table>;
  reservations?: Collection<Reservation>;

  currentUser?: { _id: string; role: string };
}

export function createContext(db: Db, users: Collection<User>): GraphQLContext {
  return { db, users };
}