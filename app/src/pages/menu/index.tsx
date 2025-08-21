import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ALL_RESTAURANTS_QUERY, GET_MENU_QUERY } from '../../graphql/query/restaurant';
import type { GetAllRestaurantsQuery, GetMenuQuery, GetMenuQueryVariables } from '../../generated/graphql';
import { useEffect, useState } from 'react';
import RestaurantSelect from './components/RestaurantSelect';
import { Card, CardContent, Chip, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';


const MenuPage = () => {

  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  const { data: restaurants } = useQuery<GetAllRestaurantsQuery>(GET_ALL_RESTAURANTS_QUERY);

  const [getMenu, { data: menu }] = useLazyQuery<GetMenuQuery, GetMenuQueryVariables>(GET_MENU_QUERY);

  useEffect(() => {
    if (restaurants?.getAllRestaurants?.length && !selectedRestaurant) {
      setSelectedRestaurant(restaurants.getAllRestaurants[0]._id);
    }
  }, [restaurants, selectedRestaurant]);

  useEffect(() => {
    if (selectedRestaurant) {
      getMenu({ variables: { restaurantId: selectedRestaurant } })
    }
  }, [selectedRestaurant])

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <Typography variant="h4" gutterBottom>
        Menu
      </Typography>

      <RestaurantSelect
        data={restaurants}
        selectedRestaurant={selectedRestaurant}
        setSelectedRestaurant={setSelectedRestaurant}
      />

      {menu?.getMenu && (
        <div style={{ marginTop: 24 }}>
          {menu.getMenu.map((category) => (
            <Card
              key={category.category}
              variant="outlined"
              style={{ marginBottom: 24 }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {category.category}
                </Typography>
                <Divider style={{ marginBottom: 8 }} />

                <List>
                  {category.items.map((item) => (
                    <ListItem key={item._id}>
                      <ListItemText
                        primary={
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                            <span>{item.name}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              {item.vegetarian && (
                                <Chip
                                  label="Vegetarian"
                                  size="small"
                                  color="success"
                                  variant="outlined"
                                />
                              )}
                              <Typography variant="body2" color="text.secondary">
                                {(item.price / 100).toFixed(2)} kr
                              </Typography>
                            </div>
                          </div>
                        }
                        secondary={item.description}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default MenuPage;