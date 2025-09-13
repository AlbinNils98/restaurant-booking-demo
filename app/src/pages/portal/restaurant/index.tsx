import { Box, Button, Stack, Typography } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_ALL_RESTAURANTS_QUERY } from '../../../graphql/query/restaurant'
import type { GetAllRestaurantsQuery } from '../../../generated/graphql'
import RestaurantSelect from '../../../components/RestaurantSelect'
import { useState } from 'react'
import RestaurantEdit from './components/RestaurantEdit'
import TableEdit from './components/TableEdit'
import RestaurantCreate from './components/RestaurantCreate'

const RestaurantPortalPage = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [create, setCreate] = useState(false);

  const { data: restaurants, loading } = useQuery<GetAllRestaurantsQuery>(GET_ALL_RESTAURANTS_QUERY);

  if (
    !loading &&
    !selectedRestaurant &&
    restaurants?.getAllRestaurants?.length
  ) {
    setSelectedRestaurant(restaurants.getAllRestaurants[0]._id);
  }

  const restaurant = restaurants?.getAllRestaurants.find(
    (res) => res._id === selectedRestaurant
  );

  const toggleCreate = () => {
    setCreate(!create);
  }

  if (loading || !restaurants?.getAllRestaurants?.length) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", pb: 2 }}>
      <Typography variant="h4" gutterBottom>
        Restaurants
      </Typography>
      {create ?
        <RestaurantCreate toggleCreate={toggleCreate} />
        :
        <>
          <Stack direction="row" justifyContent="space-between" alignItems="end" mb={2}>
            <RestaurantSelect data={restaurants} selectedRestaurant={selectedRestaurant} setSelectedRestaurant={setSelectedRestaurant} />
            <Button size='small' variant="outlined" onClick={toggleCreate}>Add Restaurant</Button>
          </Stack>
          <RestaurantEdit restaurant={restaurant} />
          <TableEdit selectedRestaurant={selectedRestaurant} />
        </>
      }
    </Box>
  )
}

export default RestaurantPortalPage