import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import { createSchema, createYoga } from "graphql-yoga";
import { typeDefs } from "./schema";
import { Reservation, Restaurant, Role, Table, type User } from "./generated/graphql";
import { GraphQLContext } from "./graphql/context";
import { resolvers } from './resolvers';
import { authDirectiveTransformer } from './graphql/directives/authDirective';
import { getCurrentUser } from './auth/getCurrentUser';
import { seedInitialData } from './dbSeed';
import cookieParser from 'cookie-parser';
import { TABLE_TTL_SECONDS } from './constants/constants';

const envFile = process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";

dotenv.config({ path: envFile });

console.log("Enviroment:", process.env.NODE_ENV);

const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

const uri = process.env.MONGO_URI as string;
const dbName = process.env.DB_NAME as string;

export async function initServer() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const userCollection = db.collection<User>("user");
  const restaurantCollection = db.collection<Restaurant>("restaurant");
  const tableCollection = db.collection<Table>("table");
  await tableCollection.createIndex(
    { removedAt: 1 },
    { expireAfterSeconds: TABLE_TTL_SECONDS, name: "RemovedAtTTL" }
  );
  const reservationCollection = db.collection<Reservation>("reservation");

  if (process.env.NODE_ENV === "production") {
    console.log("🚫 Skipping DB seed in production");
  } else {
    console.log("🌱 Seeding initial data (dev only)...");
    await seedInitialData(db);
  }

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
    cors: {
      origin: [
        FRONTEND_URL ? FRONTEND_URL : "http://localhost:5173",
      ],
      credentials: true,
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"]
    },
    context: async ({ req, res }): Promise<GraphQLContext> => {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
      const currentUser = getCurrentUser(token);

      return {
        db,
        users: userCollection,
        restaurants: restaurantCollection,
        tables: tableCollection,
        reservations: reservationCollection,
        currentUser,
        req,
        res
      };
    },
  });

  app.use("/graphql", (req, res) => {
    yoga.requestListener(req, res);
  });

  return app;
}
