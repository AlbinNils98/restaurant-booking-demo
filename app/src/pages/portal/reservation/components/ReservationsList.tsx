import { useQuery } from '@apollo/client';
import { GET_RESERVATIONS_BY_RESTAURANT_QUERY } from '../../../../graphql/query/reservation';
import type { GetReservationsByRestaurantQuery, GetReservationsByRestaurantQueryVariables } from '../../../../generated/graphql';
import { Box, List, TextField, Typography } from '@mui/material';
import ReservationListItem from './ReservationListItem';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';


type ReservationsListProps = {
  restaurantId: string;
  selectedDate?: dayjs.Dayjs | null;
}

const ReservationsList = ({ restaurantId, selectedDate }: ReservationsListProps) => {

  const { data, loading } = useQuery<GetReservationsByRestaurantQuery, GetReservationsByRestaurantQueryVariables>(GET_RESERVATIONS_BY_RESTAURANT_QUERY, {
    variables: { restaurantId }
  }
  );

  const [searchTerm, setSearchTerm] = useState('');

  const reservations = data?.getReservationsByRestaurant || [];

  const dateFiltered = useMemo(() => {
    return selectedDate
      ? reservations.filter((r) => dayjs(r.sittingStart).isSame(selectedDate, 'day'))
      : reservations;
  }, [reservations, selectedDate]);

  const searchFiltered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return dateFiltered.filter((reservation) =>
      reservation.firstName.toLowerCase().includes(term) ||
      reservation.lastName.toLowerCase().includes(term) ||
      reservation.email.toLowerCase().includes(term) ||
      reservation.confirmationCode.toLowerCase().includes(term) ||
      reservation.table.name?.toLowerCase().includes(term)
    );
  }, [dateFiltered, searchTerm]);

  const filteredReservations = useMemo(() => {
    return [...searchFiltered].sort(
      (a, b) =>
        dayjs(b.sittingStart).unix() - dayjs(a.sittingStart).unix()
    );
  }, [searchFiltered]);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name, email, table name or confirmation code"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      <List>
        {filteredReservations.map((reservation) => (
          <ReservationListItem key={reservation._id} reservation={reservation} />
        ))}
      </List>

      {!filteredReservations.length && (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          No reservations found.
        </Typography>
      )}
    </Box>
  );
}

export default ReservationsList;