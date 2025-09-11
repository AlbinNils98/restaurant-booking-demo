import { useQuery } from '@apollo/client';
import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import { useState } from 'react';
import { GET_ALL_RESTAURANTS_QUERY } from '../../../graphql/query/restaurant';
import type { GetAllRestaurantsQuery } from '../../../generated/graphql';
import RestaurantSelect from '../../../components/RestaurantSelect';
import ReservationsList from './components/ReservationsList';
import { DatePicker } from '@mui/x-date-pickers';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const ReservationPortalPage = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const { data: restaurants, loading } = useQuery<GetAllRestaurantsQuery>(GET_ALL_RESTAURANTS_QUERY);

  if (
    !loading &&
    !selectedRestaurant &&
    restaurants?.getAllRestaurants?.length
  ) {
    setSelectedRestaurant(restaurants.getAllRestaurants[0]._id);
  }

  if (loading || !restaurants?.getAllRestaurants?.length) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", paddingBottom: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <RestaurantSelect
          data={restaurants}
          selectedRestaurant={selectedRestaurant}
          setSelectedRestaurant={setSelectedRestaurant}
        />
        <DatePicker
          label="Select date"
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          slotProps={{
            textField: { size: "small" },
          }}
        />
      </Stack>
      <Card variant="outlined" style={{ marginBottom: 24 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Reservations
          </Typography>
          <Divider sx={{ mb: 2, mt: 2 }} />

          <ReservationsList restaurantId={selectedRestaurant} selectedDate={selectedDate} />

        </CardContent>
      </Card>

    </Box>
  )
}

export default ReservationPortalPage;