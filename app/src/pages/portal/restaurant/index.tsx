import { Box } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_ALL_RESTAURANTS_QUERY } from '../../../graphql/query/restaurant'
import type { GetAllRestaurantsQuery } from '../../../generated/graphql'
import RestaurantSelect from '../../../components/RestaurantSelect'
import { useEffect, useState } from 'react'
import RestaurantEdit from './components/RestaurantEdit'
import TableEdit from './components/TableEdit'

const RestaurantPortalPage = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  const { data: restaurants } = useQuery<GetAllRestaurantsQuery>(GET_ALL_RESTAURANTS_QUERY);

  useEffect(() => {
    if (!selectedRestaurant && restaurants?.getAllRestaurants?.length) {
      setSelectedRestaurant(restaurants.getAllRestaurants[0]._id);
    }
  }, [restaurants, selectedRestaurant]);

  const restaurant = restaurants?.getAllRestaurants.find(
    (res) => res._id === selectedRestaurant
  );

  return (
    <Box>
      <RestaurantSelect data={restaurants} selectedRestaurant={selectedRestaurant} setSelectedRestaurant={setSelectedRestaurant} />
      <RestaurantEdit restaurant={restaurant} />
      <TableEdit selectedRestaurant={selectedRestaurant} />

    </Box>
  )
}

export default RestaurantPortalPage