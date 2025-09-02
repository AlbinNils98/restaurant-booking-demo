import { useQuery } from '@apollo/client';
import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { GET_ALL_RESTAURANTS_QUERY } from '../../../graphql/query/restaurant';
import type { GetAllRestaurantsQuery } from '../../../generated/graphql';
import RestaurantSelect from '../../../components/RestaurantSelect';
import ReservationsList from './components/ReservationsList';

const ReservationPortalPage = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  const { data: restaurants } = useQuery<GetAllRestaurantsQuery>(GET_ALL_RESTAURANTS_QUERY);

  useEffect(() => {
    if (!selectedRestaurant && restaurants?.getAllRestaurants?.length) {
      setSelectedRestaurant(restaurants.getAllRestaurants[0]._id);
    }
  }, [restaurants, selectedRestaurant]);

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", paddingBottom: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <RestaurantSelect
          data={restaurants}
          selectedRestaurant={selectedRestaurant}
          setSelectedRestaurant={setSelectedRestaurant}
        />
      </Stack>
      <Card variant="outlined" style={{ marginBottom: 24 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Reservations
          </Typography>
          <Divider sx={{ mb: 2, mt: 2 }} />

          <ReservationsList restaurantId={selectedRestaurant} />

        </CardContent>
      </Card>

    </Box>
  )
}

export default ReservationPortalPage;