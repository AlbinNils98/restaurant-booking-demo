import { MutationResolvers, Restaurant, WeekDays } from '@/generated/graphql';
import { GraphQLContext } from '@/graphql/context';
import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';

export const restaurantMutationResolvers: MutationResolvers<GraphQLContext> = {
  addRestaurant: async (_, {
    name,
    adress,
    openingDays,
    openingHours,
    sittings
  }, { restaurants }
  ) => {

    if (openingDays.length === 0) {
      throw new GraphQLError("At least one opening day must be specified");
    }

    const validDays = Object.values(WeekDays);
    for (const day of openingDays) {
      if (!validDays.includes(day)) {
        throw new GraphQLError(`Invalid opening day: ${day}`);
      }
    }

    // Validate opening hours format (HH:MM)
    const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(openingHours.open) || !timeRegex.test(openingHours.close)) {
      throw new GraphQLError("Opening hours must be in HH:MM format");
    }

    // Validate sittings
    if (sittings.length === 0) {
      throw new GraphQLError("At least one sitting must be specified");
    }
    for (const sitting of sittings) {
      if (!timeRegex.test(sitting.startTime)) {
        throw new GraphQLError(`Invalid sitting start time: ${sitting.startTime}`);
      }
      if (sitting.durationMinutes <= 0) {
        throw new GraphQLError("Sitting duration must be a positive integer");
      }
    }

    const newRestaurantId = new ObjectId();

    const newRestaurant: Partial<Restaurant> = {
      name,
      adress,
      openingDays,
      openingHours: {
        open: openingHours.open,
        close: openingHours.close
      },
      sittings: sittings.map(s => ({
        startTime: s.startTime,
        durationMinutes: s.durationMinutes
      })),
      menu: []
    };

    const result = await restaurants.findOneAndUpdate(
      { _id: newRestaurantId },
      { $set: newRestaurant },
      { upsert: true, returnDocument: "after" });

    if (!result) {
      throw new GraphQLError("Failed to create restaurant");
    }

    return result;
  },
  updateRestaurant: async (_, {
    restaurantId,
    name,
    adress,
    openingDays,
    openingHours,
    sittings
  },
    { restaurants }
  ) => {
    const restaurant = await restaurants.findOne({ _id: new ObjectId(restaurantId) });
    if (!restaurant) throw new GraphQLError("Restaurant not found");

    const update = {
      ...(name && { name }),
      ...(adress! && { adress }),
      ...(openingDays && { openingDays }),
      ...(openingHours && { openingHours }),
      ...(sittings && { sittings }),
    };

    const result = await restaurants.findOneAndUpdate(
      { _id: new ObjectId(restaurantId) },
      { $set: update },
      { returnDocument: "after" }
    );

    if (!result) throw new GraphQLError("Failed to update restaurant");

    return result;
  },

  addMenuItem: async (_parent, { restaurantId, categoryName, name, description, price, vegetarian }, { restaurants }) => {

    const restaurant = await restaurants.findOne({ _id: new ObjectId(restaurantId) });
    if (!restaurant) {
      throw new GraphQLError("Restaurant not found");
    }

    if (price < 0) {
      throw new GraphQLError("Price must be a positive value");
    }

    const newItemId = new ObjectId();

    let result = await restaurants.findOneAndUpdate(
      { _id: new ObjectId(restaurantId), "menu.category": categoryName },
      {
        $push: {
          "menu.$.items": {
            _id: newItemId,
            name,
            description: description || "",
            price,
            vegetarian
          }
        }
      },
      { returnDocument: 'after' }
    );

    // If category doesn't exist, create it and add the item
    if (!result || !result.menu.some(cat => cat.category === categoryName)) {
      result = await restaurants.findOneAndUpdate(
        { _id: new ObjectId(restaurantId) },
        {
          $push: {
            menu: {
              category: categoryName,
              items: [{
                _id: newItemId,
                name,
                description: description || "",
                price: price,
                vegetarian,
              }],
            },
          },
        },
        { returnDocument: "after" }
      );
    }

    if (!result) {
      throw new GraphQLError("Failed to add menu item");
    }

    const updatedRestaurant = result;

    const category = updatedRestaurant.menu.find(cat => cat.category === categoryName);
    if (!category) {
      throw new GraphQLError("Category not found after update");
    }
    const newItem = category.items.find(item => item._id.equals(newItemId));
    if (!newItem) {
      throw new GraphQLError("New menu item not found after update");
    }

    return newItem;
  },

  removeMenuItem: async (_parent, { restaurantId, itemId }, { restaurants }) => {
    const restaurantObjectId = new ObjectId(restaurantId);
    const restaurant = await restaurants.findOne({ _id: restaurantObjectId });
    if (!restaurant) {
      throw new GraphQLError("Restaurant not found");
    }

    const itemObjectId = new ObjectId(itemId);
    const itemExists = restaurant.menu.some(cat =>
      cat.items.some(item => item._id.equals(itemObjectId))
    );
    if (!itemExists) {
      throw new GraphQLError("Menu item not found");
    }

    const result = await restaurants.findOneAndUpdate(
      { _id: restaurantObjectId, "menu.items._id": itemObjectId },
      {
        $pull: {
          "menu.$[].items": { _id: itemObjectId }
        }
      },
      { returnDocument: "after" }
    );

    if (!result) {
      throw new GraphQLError("Failed to remove menu item");
    }

    const stillExists = result.menu.some(cat =>
      cat.items.some(item => item._id.equals(itemObjectId))
    );

    if (stillExists) {
      throw new GraphQLError("Failed to remove menu item");
    }

    return true;
  },

  updateMenuItem: async (
    _parent,
    { restaurantId, itemId, name, description, price, vegetarian, categoryName },
    { restaurants }
  ) => {
    const restaurantObjectId = new ObjectId(restaurantId);
    const itemObjectId = new ObjectId(itemId);

    if (price && price < 0) {
      throw new GraphQLError("Price must be a positive value");
    }

    const restaurant = await restaurants.findOne({
      _id: restaurantObjectId,
      "menu.items._id": itemObjectId,
    });

    if (!restaurant) {
      throw new GraphQLError("Restaurant or menu item not found");
    }

    const oldCategory = restaurant.menu.find(cat =>
      cat.items.some(item => item._id.equals(itemObjectId))
    );
    if (!oldCategory) {
      throw new GraphQLError("Menu category not found in restaurant");
    }
    const oldItem = oldCategory.items.find(item => item._id.equals(itemObjectId));

    if (!oldCategory || !oldItem) {
      throw new GraphQLError("Menu item not found in restaurant");
    }

    const updatedItem = {
      ...oldItem,
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price }),
      vegetarian: vegetarian ?? oldItem.vegetarian,
    };

    // Check if category is changing
    const categoryChanging = categoryName && categoryName !== oldCategory.category;

    if (!categoryChanging) {
      const updateFields: any = {};
      if (name) updateFields["menu.$[].items.$[item].name"] = name;
      if (description) updateFields["menu.$[].items.$[item].description"] = description;
      if (price) updateFields["menu.$[].items.$[item].price"] = price;
      if (vegetarian === true || vegetarian === false) {
        updateFields["menu.$[].items.$[item].vegetarian"] = vegetarian;
      }
      const result = await restaurants.findOneAndUpdate(
        { _id: restaurantObjectId, "menu.items._id": itemObjectId },
        { $set: updateFields },
        { returnDocument: "after", arrayFilters: [{ "item._id": itemObjectId }] }
      );

      if (!result) throw new GraphQLError("Failed to update menu item");

      const itemAfterUpdate = result.menu.flatMap(cat => cat.items).find(
        item => item._id.equals(itemObjectId)
      );
      if (!itemAfterUpdate) {
        throw new GraphQLError("Updated item not found after update");
      }
      return itemAfterUpdate;
    }

    // Category is changing → remove from old category
    await restaurants.updateOne(
      { _id: restaurantObjectId },
      { $pull: { "menu.$[].items": { _id: itemObjectId } } }
    );

    //  Push into new category (create if missing)
    const categoryExists = restaurant.menu.some(cat => cat.category === categoryName);

    if (categoryExists) {
      await restaurants.updateOne(
        { _id: restaurantObjectId, "menu.category": categoryName },
        { $push: { "menu.$.items": updatedItem } }
      );
    } else {
      await restaurants.updateOne(
        { _id: restaurantObjectId },
        {
          $push: {
            menu: {
              category: categoryName,
              items: [updatedItem],
            },
          },
        }
      );
    }

    const updatedRestaurant = await restaurants.findOne({ _id: restaurantObjectId });
    if (!updatedRestaurant) {
      throw new GraphQLError("Failed to find updated restaurant");
    }
    const itemAfterUpdate = updatedRestaurant.menu
      .flatMap(cat => cat.items)
      .find(item => String(item._id) === String(itemObjectId));
    if (!itemAfterUpdate) {
      throw new GraphQLError("Updated item not found after update");
    }
    return itemAfterUpdate;
  },
}

