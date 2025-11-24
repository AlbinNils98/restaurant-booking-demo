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

  const { data, loading } = useQuery<GetAllRestaurantsQuery>(GET_ALL_RESTAURANTS_QUERY);

  const [getMenu, { data: menu }] = useLazyQuery<GetMenuQuery, GetMenuQueryVariables>(GET_MENU_QUERY);

  const restaurants = data?.getAllRestaurants ?? [];

  useEffect(() => {
    if (!selectedRestaurant && restaurants.length > 0) {
      setSelectedRestaurant(restaurants[0]._id);
    }
  }, [restaurants]);

  useEffect(() => {
    if (selectedRestaurant) {
      getMenu({ variables: { restaurantId: selectedRestaurant } })
    }
  }, [selectedRestaurant])

  if (loading) return <Typography>Loading...</Typography>;


  if (restaurants.length === 0) {
    return <Typography>No restaurants available</Typography>;
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", paddingBottom: 4 }}>
      <Typography variant="h4" gutterBottom>
        Menus
      </Typography>

      <RestaurantSelect
        data={data}
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