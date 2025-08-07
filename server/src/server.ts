import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import { createSchema, createYoga } from "graphql-yoga";
import { typeDefs } from "./schema";
import { Role, type User } from "./generated/graphql";
import { GraphQLContext } from "./graphql/context";
import { resolvers } from './resolvers';
import bcrypt from "bcryptjs";
import { authDirectiveTransformer } from './graphql/directives/authDirective';
import { getCurrentUser } from './auth/getCurrentUser';



dotenv.config();

const app = express();
app.use(express.json());

const uri = process.env.MONGO_URI as string;
const dbName = process.env.DB_NAME as string;

let db: Db;
let userCollection: Collection<User>;

export async function initServer() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  userCollection = db.collection<User>("user");

  const usersCount = await userCollection.countDocuments();
  if (usersCount === 0) {
    const passwordHash = await bcrypt.hash("password", 10);
    const initialUsers: User[] = [
      { _id: new ObjectId(), name: "Alice", email: "alice@example.com", role: Role.Admin, password: passwordHash },
      { _id: new ObjectId(), name: "Bob", email: "bob@example.com", role: Role.User, password: passwordHash },
    ];
    await userCollection.insertMany(initialUsers);
    console.log("✅ Inserted initial users");
  }

  console.log("✅ Connected to MongoDB and initialized collections");

  // simple REST route
  app.get("/", async (_req: Request, res: Response) => {
    const user = await userCollection.findOne({ name: "Alice" });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
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
        currentUser,
      };
    },
  });

  app.use("/graphql", (req, res) => {
    yoga.requestListener(req, res);
  });

  return app;
}

export { userCollection };