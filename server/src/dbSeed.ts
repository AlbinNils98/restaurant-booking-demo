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
        adress: "Street Name, City",
        menu: [
          {
            category: CategoryName.Breakfast,
            items: [
              { _id: new ObjectId(), name: "Pancakes", description: "Fluffy pancakes with syrup", price: 5000, vegetarian: true },
              { _id: new ObjectId(), name: "Bacon & Eggs", description: "Two eggs with crispy bacon", price: 9000, vegetarian: false },
              { _id: new ObjectId(), name: "Avocado Toast", description: "Toasted bread with smashed avocado and cherry tomatoes", price: 7500, vegetarian: true },
              { _id: new ObjectId(), name: "Omelette", description: "Three-egg omelette with cheese and mushrooms", price: 8500, vegetarian: true },
              { _id: new ObjectId(), name: "French Toast", description: "Golden brown with cinnamon sugar", price: 8000, vegetarian: true },
            ],
          },
          {
            category: CategoryName.Lunch,
            items: [
              { _id: new ObjectId(), name: "Club Sandwich", description: "Triple-layer sandwich with fries", price: 9500, vegetarian: false },
              { _id: new ObjectId(), name: "Caesar Salad", description: "Crisp romaine, parmesan, and dressing", price: 8500, vegetarian: false },
              { _id: new ObjectId(), name: "Veggie Wrap", description: "Grilled vegetables in tortilla wrap", price: 8000, vegetarian: true },
              { _id: new ObjectId(), name: "Soup of the Day", description: "Served with bread", price: 7000, vegetarian: true },
            ],
          },
          {
            category: CategoryName.Appetizers,
            items: [
              { _id: new ObjectId(), name: "Garlic Bread", description: "Toasted with garlic butter", price: 4000, vegetarian: true },
              { _id: new ObjectId(), name: "Buffalo Wings", description: "Spicy chicken wings with dip", price: 8500, vegetarian: false },
              { _id: new ObjectId(), name: "Mozzarella Sticks", description: "Crispy and cheesy", price: 6500, vegetarian: true },
            ],
          },
          {
            category: CategoryName.Desserts,
            items: [
              { _id: new ObjectId(), name: "Cheesecake", description: "Classic New York style", price: 6000, vegetarian: true },
              { _id: new ObjectId(), name: "Apple Pie", description: "Served warm with vanilla ice cream", price: 5500, vegetarian: true },
              { _id: new ObjectId(), name: "Brownie", description: "Rich chocolate brownie with fudge", price: 5000, vegetarian: true },
            ],
          },
          {
            category: CategoryName.Drinks,
            items: [
              { _id: new ObjectId(), name: "Fresh Orange Juice", description: "Squeezed daily", price: 3500, vegetarian: true },
              { _id: new ObjectId(), name: "Coffee", description: "Bottomless filter coffee", price: 2500, vegetarian: true },
              { _id: new ObjectId(), name: "Smoothie", description: "Berry blast smoothie", price: 4500, vegetarian: true },
              { _id: new ObjectId(), name: "Iced Latte", description: "Chilled coffee with milk", price: 4000, vegetarian: true },
            ],
          },
        ],
        openingDays: [WeekDays.Tuesday, WeekDays.Wednesday, WeekDays.Thursday, WeekDays.Friday, WeekDays.Saturday],
        openingHours: { open: "12:00", close: "23:00" },
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
        adress: "Street Name, City",
        menu: [
          {
            category: CategoryName.Appetizers,
            items: [
              { _id: new ObjectId(), name: "Bruschetta", description: "Tomato, basil, olive oil on toasted bread", price: 6000, vegetarian: true },
              { _id: new ObjectId(), name: "Shrimp Cocktail", description: "Chilled shrimp with cocktail sauce", price: 8500, vegetarian: false },
              { _id: new ObjectId(), name: "Stuffed Mushrooms", description: "Cheese-filled baked mushrooms", price: 7500, vegetarian: true },
            ],
          },
          {
            category: CategoryName.Dinner,
            items: [
              { _id: new ObjectId(), name: "Steak", description: "Grilled sirloin steak", price: 12000, vegetarian: false },
              { _id: new ObjectId(), name: "Pasta Primavera", description: "Pasta with seasonal vegetables", price: 10500, vegetarian: true },
              { _id: new ObjectId(), name: "Grilled Salmon", description: "Served with lemon butter sauce", price: 13500, vegetarian: false },
              { _id: new ObjectId(), name: "Veggie Burger", description: "Plant-based patty with fresh toppings", price: 9500, vegetarian: true },
              { _id: new ObjectId(), name: "Chicken Parmesan", description: "Breaded chicken with tomato sauce and cheese", price: 11500, vegetarian: false },
            ],
          },
          {
            category: CategoryName.Desserts,
            items: [
              { _id: new ObjectId(), name: "Chocolate Cake", description: "Rich chocolate cake with ganache", price: 6000, vegetarian: true },
              { _id: new ObjectId(), name: "Ice Cream Sundae", description: "Three scoops with toppings", price: 5500, vegetarian: true },
              { _id: new ObjectId(), name: "Tiramisu", description: "Coffee-flavored Italian dessert", price: 7000, vegetarian: true },
            ],
          },
          {
            category: CategoryName.Drinks,
            items: [
              { _id: new ObjectId(), name: "Red Wine", description: "House red, glass", price: 8500, vegetarian: true },
              { _id: new ObjectId(), name: "White Wine", description: "House white, glass", price: 8500, vegetarian: true },
              { _id: new ObjectId(), name: "Sparkling Water", description: "Chilled and refreshing", price: 3000, vegetarian: true },
              { _id: new ObjectId(), name: "Cocktail", description: "Bartender's choice of the day", price: 9500, vegetarian: true },
            ],
          },
        ],
        openingDays: [WeekDays.Tuesday, WeekDays.Wednesday, WeekDays.Thursday, WeekDays.Friday, WeekDays.Saturday],
        openingHours: { open: "12:00", close: "23:00" },
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