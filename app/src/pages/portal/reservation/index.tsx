import { useQuery } from '@apollo/client';
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import { useState } from 'react';
import { GET_ALL_RESTAURANTS_QUERY } from '../../../graphql/query/restaurant';
import type { GetAllRestaurantsQuery } from '../../../generated/graphql';
import RestaurantSelect from '../../../components/RestaurantSelect';
import ReservationsList from './components/ReservationsList';
import { DatePicker } from '@mui/x-date-pickers';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import BookingFlow from '../../../components/bookingFlow/BookingFlow';
import { BookingProvider } from '../../../context/Booking';

const ReservationPortalPage = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [create, setCreate] = useState(false);

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

  const toggleCreate = () => setCreate(!create);


  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", pb: 2 }}>
      <Typography variant="h4" gutterBottom>
        Reservations
      </Typography>
      {!create ?
        <Box>
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
              <Stack direction='row' justifyContent='space-between'>
                <Typography variant="h6" gutterBottom>
                  Reservations
                </Typography>
                <Button variant='outlined' onClick={toggleCreate}>Create new reservation</Button>
              </Stack>
              <Divider sx={{ mb: 2, mt: 2 }} />

              <ReservationsList restaurantId={selectedRestaurant} selectedDate={selectedDate} />
            </CardContent>
          </Card>
        </Box>
        :
        <BookingProvider>
          <Stack spacing={2} alignItems='center'>
            <BookingFlow />
            <Button variant='contained' onClick={toggleCreate}>Abort</Button>
          </Stack>
        </BookingProvider>
      }
    </Box>

  )
}

export default ReservationPortalPage;