import { MutationResolvers } from '@/generated/graphql';
import { GraphQLContext } from '@/graphql/context';
import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';
import { it } from 'node:test';


export const restaurantMutationResolvers: MutationResolvers<GraphQLContext> = {
  addMenuItem: async (_parent, { restaurantId, categoryName, name, description, price, vegetarian }, { restaurants }) => {

    const restaurant = await restaurants.findOne({ _id: new ObjectId(restaurantId) });
    if (!restaurant) {
      throw new GraphQLError("Restaurant not found");
    }

    if (price < 0) {
      throw new GraphQLError("Price must be a positive value");
    }
    //Price in swedish kronor (öre)
    const priceInOre = Math.round(price * 100);

    const newItemId = new ObjectId();

    let result = await restaurants.findOneAndUpdate(
      { _id: new ObjectId(restaurantId), "menu.category": categoryName },
      {
        $push: {
          "menu.$.items": {
            _id: newItemId,
            name,
            description: description || "",
            price: priceInOre,
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
                price: priceInOre,
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
      ...(price && { price: Math.round(price * 100) }),
      vegetarian: vegetarian ?? oldItem.vegetarian,
    };

    // Check if category is changing
    const categoryChanging = categoryName && categoryName !== oldCategory.category;

    if (!categoryChanging) {
      const updateFields: any = {};
      if (name) updateFields["menu.$[].items.$[item].name"] = name;
      if (description) updateFields["menu.$[].items.$[item].description"] = description;
      if (price) updateFields["menu.$[].items.$[item].price"] = Math.round(price * 100);
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

