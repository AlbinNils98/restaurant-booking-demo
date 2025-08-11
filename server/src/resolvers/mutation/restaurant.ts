import { MutationResolvers } from '@/generated/graphql';
import { GraphQLContext } from '@/graphql/context';
import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';


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

  removeMenuItem: async (_parent, { restaurantId, categoryName, itemId }, { restaurants }) => {
    const restaurant = await restaurants.findOne({ _id: new ObjectId(restaurantId) });
    if (!restaurant) {
      throw new GraphQLError("Restaurant not found");
    }
    const result = await restaurants.findOneAndUpdate(
      { _id: new ObjectId(restaurantId), "menu.category": categoryName },
      {
        $pull: {
          "menu.$.items": { _id: new ObjectId(itemId) }
        }
      },
      { returnDocument: 'after' }
    );
    if (!result) {
      throw new GraphQLError("Failed to remove menu item");
    }
    const category = result.menu.find(cat => cat.category === categoryName);
    if (!category) {
      throw new GraphQLError("Category not found");
    }
    const removedItem = category.items.find(item => item._id.equals(new ObjectId(itemId)));
    if (removedItem) {
      throw new GraphQLError("Failed to remove menu item");
    }
    return true;
  }
}

