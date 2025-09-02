import { useQuery } from '@apollo/client';
import { GET_RESERVATIONS_BY_RESTAURANT_QUERY } from '../../../../graphql/query/reservation';
import type { GetReservationsByRestaurantQuery, GetReservationsByRestaurantQueryVariables } from '../../../../generated/graphql';
import { Box, List, TextField, Typography } from '@mui/material';
import ReservationListItem from './ReservationListItem';
import { useState } from 'react';
import dayjs from 'dayjs';


type ReservationsListProps = {
  restaurantId: string;
}

const ReservationsList = ({ restaurantId }: ReservationsListProps) => {

  const { data, loading } = useQuery<GetReservationsByRestaurantQuery, GetReservationsByRestaurantQueryVariables>(GET_RESERVATIONS_BY_RESTAURANT_QUERY, {
    variables: { restaurantId }
  }
  );

  const [searchTerm, setSearchTerm] = useState('');


  if (loading) return <Typography>Loading...</Typography>;

  const filteredReservations = data?.getReservationsByRestaurant.filter((reservation) => {
    const term = searchTerm.toLowerCase();
    return (
      reservation.firstName.toLowerCase().includes(term) ||
      reservation.lastName.toLowerCase().includes(term) ||
      reservation.email.toLowerCase().includes(term) ||
      reservation.confirmationCode.toLowerCase().includes(term) ||
      reservation.tableName?.toLowerCase().includes(term)

    );
  }).sort((a, b) => dayjs(a.sittingStart).unix() - dayjs(b.sittingStart).unix()) || [];


  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name, email, or confirmation code"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      <List>
        {filteredReservations.map((reservation) => (
          <ReservationListItem key={reservation._id} reservation={reservation} />
        ))}
      </List>

      {filteredReservations.length === 0 && (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          No reservations found.
        </Typography>
      )}
    </Box>
  );
}

export default ReservationsList;