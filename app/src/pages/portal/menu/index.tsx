import { useLazyQuery, useQuery } from '@apollo/client';
import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { GET_ALL_RESTAURANTS_QUERY, GET_MENU_QUERY } from '../../../graphql/query/restaurant';
import { type GetAllRestaurantsQuery, type GetMenuQuery, type GetMenuQueryVariables, type MenuItem } from '../../../generated/graphql';
import RestaurantSelect from '../../../components/RestaurantSelect';
import MenuItemRow from './components/MenuItemRow';
import MenuItemAdd from './components/MenuItemAdd';
import { MenuDisplay } from '../../../components/menu/MenuDisplay';

const MenuPortalPage = () => {

  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  const [addItem, setAddItem] = useState(false);

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
  }, [selectedRestaurant]);


  const toggleAddItem = () => {
    setAddItem(!addItem)
  }

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

      {!addItem && <Button variant='outlined' onClick={toggleAddItem} sx={{ mt: 2, mb: 2 }}>Add item</Button>}

      {addItem && <MenuItemAdd restaurantId={selectedRestaurant} toggleAddItem={toggleAddItem} addItem={addItem} />}

      <MenuDisplay
        menu={menu}
        RowComponent={(props: { item: MenuItem }) => (
          <MenuItemRow
            {...props}
            restaurantId={selectedRestaurant}
          />
        )}
      />
    </div>
  );
}



export default MenuPortalPage;