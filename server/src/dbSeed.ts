import { Db, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { generate } from '@graphql-codegen/cli';
import generateConfirmationCode from './util/generateConfirmationCode';
import normalizeDate from './util/normalizeDate';

export async function seedInitialData(db: Db) {
  const userCollection = db.collection("user");
  const restaurantCollection = db.collection("restaurant");
  const tableCollection = db.collection("table");
  const reservationCollection = db.collection("reservation");

  // Insert initial users
  const usersCount = await userCollection.countDocuments();
  if (usersCount === 0) {
    const passwordHash = await bcrypt.hash("password", 10);
    const initialUsers = [
      { _id: new ObjectId(), name: "Alice", email: "alice@example.com", role: "Admin", password: passwordHash },
      { _id: new ObjectId(), name: "Bob", email: "bob@example.com", role: "User", password: passwordHash },
    ];
    await userCollection.insertMany(initialUsers);
    console.log("✅ Inserted initial users");
  }

  // Insert initial Tables with restaurantId
  const tablesCount = await tableCollection.countDocuments();
  if (tablesCount === 0) {
    const restaurantIds = (await restaurantCollection.find().limit(2).toArray()).map(r => r._id);
    // If restaurants don't exist yet, create dummy ObjectIds here or insert restaurants first.

    // For safety, if no restaurants yet, create dummy IDs:
    const restId1 = restaurantIds[0] ?? new ObjectId();
    const restId2 = restaurantIds[1] ?? new ObjectId();

    const table1Id = new ObjectId();
    const table2Id = new ObjectId();

    await tableCollection.insertMany([
      {
        _id: table1Id,
        restaurantId: restId1,
        reservationIds: [],
        availableDates: [
          normalizeDate(new Date("2025-08-10T12:00:00Z")),
          normalizeDate(new Date("2025-08-11T12:00:00Z")),
        ],
        seats: 4,
      },
      {
        _id: table2Id,
        restaurantId: restId2,
        reservationIds: [],
        availableDates: [
          normalizeDate(new Date("2025-08-12T12:00:00Z")),
          normalizeDate(new Date("2025-08-13T12:00:00Z")),
        ],
        seats: 2,
      },
    ]);
    console.log("✅ Inserted initial tables");
  }

  // Insert initial Restaurants
  const restaurantsCount = await restaurantCollection.countDocuments();
  if (restaurantsCount === 0) {
    const tableIds = (await tableCollection.find().limit(2).toArray()).map(t => t._id);

    await restaurantCollection.insertMany([
      {
        _id: new ObjectId(),
        name: "Sunny Side Diner",
        tables: [tableIds[0]],
      },
      {
        _id: new ObjectId(),
        name: "Moonlight Eatery",
        tables: [tableIds[1]],
      },
    ]);
    console.log("✅ Inserted initial restaurants");
  }

  // // Insert initial Reservations
  // const reservationsCount = await reservationCollection.countDocuments();
  // if (reservationsCount === 0) {
  //   const restaurants = await restaurantCollection.find().limit(2).toArray();
  //   const tables = await tableCollection.find().limit(2).toArray();

  //   await reservationCollection.insertMany([
  //     {
  //       _id: new ObjectId(),
  //       confirmationCode: generateConfirmationCode(),
  //       restaurantId: restaurants[0]._id,
  //       tableId: tables[0]._id,
  //       arrival: new Date("2025-08-10T12:30:00Z"),
  //       partySize: 4,
  //       name: "John Doe",
  //       email: "john@example.com",
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     },
  //     {
  //       _id: new ObjectId(),
  //       confirmationCode: generateConfirmationCode(),
  //       restaurantId: restaurants[1]._id,
  //       tableId: tables[1]._id,
  //       arrival: new Date("2025-08-12T18:30:00Z"),
  //       partySize: 2,
  //       name: "Jane Smith",
  //       email: "jane@example.com",
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     },
  //   ]);
  //   console.log("✅ Inserted initial reservations");
  // }
}