// src/graphql/context.ts
import type { Collection, Db } from "mongodb";
import type { Reservation, Restaurant, Table, User } from "../generated/graphql";
import { Request, Response } from 'express';

export interface GraphQLContext {
  db: Db;
  users: Collection<User>;
  restaurants: Collection<Restaurant>;
  tables: Collection<Table>;
  reservations: Collection<Reservation>;

  currentUser?: { _id: string; role: string } | null;

  req: Request;
  res: Response;
}

export function createContext(
  db: Db, users: Collection<User>,
  restaurants: Collection<Restaurant>,
  tables: Collection<Table>,
  reservations: Collection<Reservation>,
  req: Request,
  res: Response
): GraphQLContext {
  return { db, users, restaurants, tables, reservations, req, res };
}