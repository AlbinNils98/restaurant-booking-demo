import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ALL_RESTAURANTS_QUERY, GET_MENU_QUERY } from '../../graphql/query/restaurant';
import type { GetAllRestaurantsQuery, GetMenuQuery, GetMenuQueryVariables, MenuItem } from '../../generated/graphql';
import { useEffect, useState } from 'react';
import RestaurantSelect from '../../components/RestaurantSelect';
import { Typography } from '@mui/material';
import { MenuDisplay } from '../../components/menu/MenuDisplay';
import MenuItemRowView from '../../components/menu/MenuItemRowView';


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
    <div style={{ maxWidth: 800, margin: "0 auto", paddingBottom: 4 }}>
      <Typography variant="h4" gutterBottom>
        Menu
      </Typography>

      <RestaurantSelect
        data={restaurants}
        selectedRestaurant={selectedRestaurant}
        setSelectedRestaurant={setSelectedRestaurant}
      />

      <MenuDisplay
        menu={menu}
        RowComponent={(props: { item: MenuItem }) => (
          <MenuItemRowView
            {...props}
          />
        )}
      />
    </div>
  );
}

export default MenuPage;