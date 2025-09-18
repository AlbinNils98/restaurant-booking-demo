import { Box, Button, IconButton, ListItem, Stack, Typography } from '@mui/material';
import { type RemoveReservationMutation, type RemoveReservationMutationVariables, type ReservationDto } from '../../../../generated/graphql';
import dayjs from 'dayjs';
import { DeleteOutline } from '@mui/icons-material';
import { useState } from 'react';
import ReservationEdit from './ReservationEdit';
import { useMutation } from '@apollo/client';
import { REMOVE_RESERVATION_MUTATION } from '../../../../graphql/mutation/reservation';
import { GET_RESERVATIONS_BY_RESTAURANT_QUERY } from '../../../../graphql/query/reservation';
import ConfirmDialog from '../../../../components/Dialog';
import { useToast } from '../../../../context/Toast';

type ResertavionListItemProps = {
  reservation: ReservationDto;
};

const ReservationListItem = ({ reservation }: ResertavionListItemProps) => {
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!edit);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { showToast } = useToast();

  const [removeReservation] = useMutation<RemoveReservationMutation, RemoveReservationMutationVariables>(REMOVE_RESERVATION_MUTATION, {
    refetchQueries: [{
      query: GET_RESERVATIONS_BY_RESTAURANT_QUERY,
      variables: { restaurantId: reservation.restaurantId }
    }],
    variables: { reservationId: reservation._id },
    onCompleted: () => showToast('Reservation removed successfully', 'success'),
  });

  const handleRemove = () => {
    setShowDeleteDialog(true);
  };

  const remove = () => {
    removeReservation();
  }

  return (
    <ListItem
      key={reservation._id}
      sx={{ borderBottom: '1px solid #e0e0e0', py: 2, alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between' }}
    >
      {edit ?
        <ReservationEdit reservation={reservation} toggleEdit={toggleEdit} />
        :
        <Stack direction="row" alignItems="flex-start" flex={1} justifyContent="space-between">
          <Stack spacing={1} flex={1}>
            <Typography variant="h6">
              {reservation.firstName} {reservation.lastName}
            </Typography>

            <Stack direction="row" spacing={2}>
              <Typography variant="body2" color="text.secondary">
                {dayjs(reservation.sittingStart).format("YYYY-MM-DD")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {dayjs(reservation.sittingStart).format("HH:mm")} - {dayjs(reservation.sittingEnd).format("HH:mm")}
              </Typography>
            </Stack>

            <Typography variant="body2" color="text.secondary">
              Confirmation Code: {reservation.confirmationCode}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Table: {`${reservation.table.name} (seats: ${reservation.table.seats})` || 'N/A'}
            </Typography>


            <Typography variant="body2" color="text.secondary">
              Email: {reservation.email}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Party Size: {reservation.partySize}
            </Typography>

            <Box sx={{ border: '1px solid #f5f5f5', p: 1, mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {reservation.message || 'N/A'}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="flex-start">
            <Button variant="outlined" onClick={toggleEdit}>Edit</Button>
            <IconButton onClick={handleRemove}>
              <DeleteOutline color="error" />
            </IconButton>
          </Stack>
        </Stack>
      }
      <ConfirmDialog text='Are you sure you want to delete this reservation?' open={showDeleteDialog} setOpen={setShowDeleteDialog} onConfirm={remove} onAbort={() => { }} />
    </ListItem>
  );
}

export default ReservationListItem;