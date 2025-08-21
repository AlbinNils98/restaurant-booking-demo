import { Db, ObjectId } from 'mongodb';
import { CategoryName, Reservation, Restaurant, Role, Table, User, WeekDays } from './generated/graphql';
import * as bcrypt from 'bcryptjs';

function makeDateTime(dateStr: string, timeStr: string) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date(dateStr);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function makeSittingEnd(start: Date, durationMinutes: number) {
  return new Date(start.getTime() + durationMinutes * 60000);
}

export async function seedInitialData(db: Db) {
  const userCollection = db.collection<User>("user");
  const restaurantCollection = db.collection<Restaurant>("restaurant");
  const tableCollection = db.collection<Table>("table");
  const reservationCollection = db.collection<Reservation>("reservation");

  // Insert initial users
  const usersCount = await userCollection.countDocuments();
  if (usersCount === 0) {
    const passwordHash = await bcrypt.hash("password", 10);
    const initialUsers = [
      { _id: new ObjectId(), name: "Alice", email: "alice@example.com", role: Role.Admin, password: passwordHash },
      { _id: new ObjectId(), name: "Bob", email: "bob@example.com", role: Role.User, password: passwordHash },
    ];
    await userCollection.insertMany(initialUsers);
    console.log("✅ Inserted initial users");
  }

  // Insert initial Restaurants
  const restaurantsCount = await restaurantCollection.countDocuments();
  let restaurantIds: ObjectId[] = [];

  if (restaurantsCount === 0) {
    const rest1Id = new ObjectId();
    const rest2Id = new ObjectId();

    await restaurantCollection.insertMany([
      {
        _id: rest1Id,
        name: "Sunny Side Diner",
        menu: [
          {
            category: CategoryName.Breakfast,
            items: [
              { _id: new ObjectId(), name: "Pancakes", description: "Fluffy pancakes with syrup", price: 5000, vegetarian: true },
              { _id: new ObjectId(), name: "Bacon & Eggs", description: "Two eggs with crispy bacon", price: 9000, vegetarian: false },
            ],
          },
        ],
        openingDays: [WeekDays.Tuesday, WeekDays.Wednesday, WeekDays.Thursday, WeekDays.Friday, WeekDays.Saturday],
        sittings: [
          { startTime: "08:00", durationMinutes: 90 },
          { startTime: "09:30", durationMinutes: 90 },
          { startTime: "11:00", durationMinutes: 90 },
          { startTime: "12:30", durationMinutes: 90 },
          { startTime: "14:00", durationMinutes: 90 },
          { startTime: "18:00", durationMinutes: 120 },
          { startTime: "20:30", durationMinutes: 120 },
        ],
      },
      {
        _id: rest2Id,
        name: "Moonlight Eatery",
        menu: [
          {
            category: CategoryName.Dinner,
            items: [
              { _id: new ObjectId(), name: "Steak", description: "Grilled sirloin steak", price: 12000, vegetarian: false },
            ],
          },
        ],
        openingDays: [WeekDays.Tuesday, WeekDays.Wednesday, WeekDays.Thursday, WeekDays.Friday, WeekDays.Saturday],
        sittings: [
          { startTime: "16:00", durationMinutes: 90 },
          { startTime: "17:30", durationMinutes: 90 },
          { startTime: "19:00", durationMinutes: 90 },
          { startTime: "20:30", durationMinutes: 90 },
          { startTime: "22:00", durationMinutes: 90 },
        ],
      },
    ]);

    console.log("✅ Inserted restaurants");
    restaurantIds = [rest1Id, rest2Id];
  } else {
    restaurantIds = (await restaurantCollection.find().limit(2).toArray()).map(r => r._id);
  }

  // Insert Tables (more per restaurant)
  const tablesCount = await tableCollection.countDocuments();
  if (tablesCount === 0) {
    const tables = [
      // Sunny Side Diner
      { _id: new ObjectId(), restaurantId: restaurantIds[0], name: "Window 1", seats: 2, createdAt: new Date(), updatedAt: new Date() },
      { _id: new ObjectId(), restaurantId: restaurantIds[0], name: "Window 2", seats: 4, createdAt: new Date(), updatedAt: new Date() },
      { _id: new ObjectId(), restaurantId: restaurantIds[0], name: "Booth 1", seats: 6, createdAt: new Date(), updatedAt: new Date() },

      // Moonlight Eatery
      { _id: new ObjectId(), restaurantId: restaurantIds[1], name: "Terrace 1", seats: 2, createdAt: new Date(), updatedAt: new Date() },
      { _id: new ObjectId(), restaurantId: restaurantIds[1], name: "Terrace 2", seats: 4, createdAt: new Date(), updatedAt: new Date() },
      { _id: new ObjectId(), restaurantId: restaurantIds[1], name: "Main Hall 1", seats: 8, createdAt: new Date(), updatedAt: new Date() },
    ];

    await tableCollection.insertMany(tables);
    console.log("✅ Inserted tables linked to restaurants");
  }

  // // Insert initial Reservations (commented out)
  // const reservationsCount = await reservationCollection.countDocuments();
  // if (reservationsCount === 0) {
  //   const restaurants = await restaurantCollection.find().limit(2).toArray();
  //   const tables = await tableCollection.find().limit(2).toArray();

  //   const sittingStart = makeDateTime("2025-08-10", "18:00");
  //   const sittingEnd = makeSittingEnd(sittingStart, 120);

  //   await reservationCollection.insertMany([
  //     {
  //       _id: new ObjectId(),
  //       confirmationCode: generateConfirmationCode(),
  //       restaurantId: restaurants[0]._id,
  //       tableId: tables[0]._id,
  //       sittingStart,
  //       sittingEnd,
  //       partySize: 2,
  //       firstName: "John",
  //       lastName: "Doe",
  //       email: "john@example.com",
  //       status: "CONFIRMED",
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     },
  //   ]);
  //   console.log("✅ Inserted initial reservations");
  // }
}