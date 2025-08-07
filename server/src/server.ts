import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import { createSchema, createYoga } from "graphql-yoga";
import { typeDefs } from "./schema";
import { Reservation, Restaurant, Role, Table, type User } from "./generated/graphql";
import { GraphQLContext } from "./graphql/context";
import { resolvers } from './resolvers';
import bcrypt from "bcryptjs";
import { authDirectiveTransformer } from './graphql/directives/authDirective';
import { getCurrentUser } from './auth/getCurrentUser';
import { seedInitialData } from './dbSeed';

dotenv.config();

const app = express();
app.use(express.json());

const uri = process.env.MONGO_URI as string;
const dbName = process.env.DB_NAME as string;

export async function initServer() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const userCollection = db.collection<User>("user");
  const restaurantCollection = db.collection<Restaurant>("restaurant");
  const tableCollection = db.collection<Table>("table");
  const reservationCollection = db.collection<Reservation>("reservation");

  // Seed initial data
  // Should be removed in production
  await seedInitialData(db);

  console.log("✅ Connected to MongoDB and initialized collections");

  app.get("/", async (_req: Request, res: Response) => {
    res.send("Test")
  });

  let schema = createSchema<GraphQLContext>({
    typeDefs,
    resolvers,
  });

  // Apply auth directive to the schema
  schema = authDirectiveTransformer(schema);

  const yoga = createYoga<GraphQLContext>({
    schema,
    context: async ({ request }): Promise<GraphQLContext> => {
      const authHeader = request.headers.get("authorization");
      const currentUser = getCurrentUser(authHeader);

      return {
        db,
        users: userCollection,
        restaurants: restaurantCollection,
        tables: tableCollection,
        reservations: reservationCollection,
        currentUser,
      };
    },
  });

  app.use("/graphql", (req, res) => {
    yoga.requestListener(req, res);
  });

  return app;
}
