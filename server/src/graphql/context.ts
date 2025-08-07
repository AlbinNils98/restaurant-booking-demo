// src/graphql/context.ts
import type { Collection, Db } from "mongodb";
import type { User } from "../generated/graphql";

export interface GraphQLContext {
  db: Db;
  users: Collection<User>;
  currentUser?: { _id: string; role: string }; 
}

export function createContext(db: Db, users: Collection<User>): GraphQLContext {
  return { db, users };
}