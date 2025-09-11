import { TABLE_TTL_DAYS } from '@/constants/constants';
import { MenuCategory, QueryResolvers, WeekDays } from '@/generated/graphql';
import { GraphQLContext } from '@/graphql/context';
import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';

export const restaurantQueryResolvers: QueryResolvers<GraphQLContext> = {
  getAllRestaurants: async (_parent, _args, { restaurants }) => {
    const restaurantDocs = await restaurants.find().toArray();
    return restaurantDocs.map(restaurant => ({
      _id: restaurant._id,
      name: restaurant.name,
      adress: restaurant.adress,
      openingDays: restaurant.openingDays,
      openingHours: restaurant.openingHours,
      sittings: restaurant.sittings
    }));
  },
  getAvailableSittings: async (_parent, { restaurantId, partySize }, { restaurants, tables, reservations }) => {
    const restaurant = await restaurants.findOne({ _id: new ObjectId(restaurantId) });
    if (!restaurant) throw new GraphQLError("Restaurant not found");

    // Only consider tables that fit the party size (with a tolerance of +2)
    const validTables = await tables.find({
      restaurantId: restaurant._id,
      seats: { $gte: partySize, $lte: partySize + 2 }
    }).toArray();
    if (validTables.length === 0) return [];

    const results: Date[] = [];
    const now = new Date();
    const horizon = new Date();
    horizon.setDate(now.getDate() + 30);
    const windowStart = now;

    const WEEKDAY: WeekDays[] = [WeekDays.Sunday, WeekDays.Monday, WeekDays.Tuesday, WeekDays.Wednesday, WeekDays.Thursday, WeekDays.Friday, WeekDays.Saturday];

    const allRes = await reservations.find(
      {
        restaurantId: restaurant._id,
        sittingStart: { $lt: horizon },
        sittingEnd: { $gte: windowStart },
      },
      { projection: { tableId: 1, sittingStart: 1, sittingEnd: 1 } }
    ).toArray();

    const lastReservationByWeekday = new Map<WeekDays, Date>();

    for (const r of allRes) {
      const date = new Date(r.sittingStart);
      const dayName = WEEKDAY[date.getDay()];

      // Track last reservation per weekday
      if (
        !lastReservationByWeekday.has(dayName) ||
        date > lastReservationByWeekday.get(dayName)!
      ) {
        lastReservationByWeekday.set(dayName, date);
      }
    }

    for (let d = new Date(now); d <= horizon; d.setDate(d.getDate() + 1)) {
      const dayName = WEEKDAY[new Date(d).getDay()];
      const dateStr = d.toDateString();

      // Skip if weekday not in openingDays
      // and either no reservations OR date is after last reservation for that weekday
      if (!restaurant.openingDays.includes(dayName)) {
        const lastRes = lastReservationByWeekday.get(dayName);
        if (!lastRes || d > lastRes) continue;
      }

      for (const sitting of restaurant.sittings) {
        const [hours, minutes] = sitting.startTime.split(":").map(Number);
        const startTime = new Date(d);
        startTime.setHours(hours, minutes, 0, 0);

        if (startTime < now) continue;

        const endTime = new Date(startTime.getTime() + sitting.durationMinutes * 60000);

        const overlaps = allRes.filter(
          r => r.sittingStart < endTime && r.sittingEnd > startTime
        );

        const takenTableIds = new Set(overlaps.map(r => r.tableId.toString()));

        const freeTables = validTables.filter(t => {
          if (t.removedAt) {
            // TTL removes table 30 days after removedAt
            const expiry = new Date(t.removedAt);
            expiry.setDate(expiry.getDate() + TABLE_TTL_DAYS);
            expiry.setHours(0, 0, 0, 0);

            // cutoff is the day before expiry
            if (startTime >= expiry) {
              return false;
            }
          }

          return !takenTableIds.has(t._id.toString());
        });

        if (freeTables.length > 0) {
          results.push(startTime)
        }
      }
    }
    return results;
  },
  getTablesForSitting: async (_parent, { restaurantId, sitting, partySize }, { restaurants, tables, reservations }) => {
    const restaurant = await restaurants.findOne({ _id: new ObjectId(restaurantId) });
    if (!restaurant) throw new GraphQLError("Restaurant not found");

    const sittingStart = new Date(sitting);
    if (isNaN(sittingStart.getTime())) throw new GraphQLError("Invalid sitting date");

    const sittingConfig = restaurant.sittings.find(s => {
      const [hours, minutes] = s.startTime.split(":").map(Number);
      const testStart = new Date(sittingStart);
      testStart.setHours(hours, minutes, 0, 0);
      return testStart.getTime() === sittingStart.getTime();
    });

    if (!sittingConfig) throw new GraphQLError("No sitting found for that time");

    const sittingEnd = new Date(sittingStart.getTime() + sittingConfig.durationMinutes * 60000);

    // All tables large enough for the party size (with a tolerance of +2)
    const validTables = await tables.find({
      restaurantId: restaurant._id,
      seats: { $gte: partySize, $lte: partySize + 2 }
    }).toArray();

    if (validTables.length === 0) return [];

    // Reservations that overlap this sitting
    const overlappingReservations = await reservations.find({
      restaurantId: restaurant._id,
      sittingStart: { $lt: sittingEnd },
      sittingEnd: { $gt: sittingStart },
    }, { projection: { tableId: 1 } }).toArray();

    const takenTableIds = new Set(overlappingReservations.map(r => r.tableId.toString()));

    // Filter out taken/expired tables
    const freeTables = validTables.filter(t => {
      if (t.removedAt) {
        const expiry = new Date(t.removedAt);
        expiry.setDate(expiry.getDate() + TABLE_TTL_DAYS);
        expiry.setHours(0, 0, 0, 0);

        if (sittingStart >= expiry) return false;
      }
      return !takenTableIds.has(t._id.toString());
    });

    return freeTables;
  },
  getMenu: async (_parent, { restaurantId }, { restaurants }) => {
    const restaurant = await restaurants.findOne({ _id: new ObjectId(restaurantId) });

    if (!restaurant) throw new GraphQLError("No restaurant found")

    return restaurant?.menu;
  }
};