import { useEffect, useState } from 'react';
import { Box, Button, TextField, Stack, Select, FormControl, InputLabel, MenuItem, Typography, CircularProgress } from '@mui/material';
import type { GetTablesForSittingQuery, GetTablesForSittingQueryVariables, ReservationDto, UpdateReservationMutation, UpdateReservationMutationVariables } from '../../../../generated/graphql';
import SittingSelect from '../../../../components/SittingSelect';
import ConfirmDialog from '../../../../components/Dialog';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_RESERVATION_MUTATION } from '../../../../graphql/mutation/reservation';
import { GET_RESERVATIONS_BY_RESTAURANT_QUERY } from '../../../../graphql/query/reservation';
import { GET_TABLES_FOR_SITTING_QUERY } from '../../../../graphql/query/restaurant';
import dayjs from 'dayjs';
import { useToast } from '../../../../context/Toast';

type EditReservationProps = {
  reservation: ReservationDto;
  toggleEdit: () => void;
};

const ReservationEdit = ({ reservation, toggleEdit }: EditReservationProps) => {
  const [reservationData, setReservationData] = useState<UpdateReservationMutationVariables>({
    reservationId: reservation._id,
  });
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const [updateReservation, { loading: updateLoading }] = useMutation<UpdateReservationMutation, UpdateReservationMutationVariables>(UPDATE_RESERVATION_MUTATION, {
    refetchQueries: [
      {
        query: GET_RESERVATIONS_BY_RESTAURANT_QUERY, variables: { restaurantId: reservation.restaurantId }
      }],
    variables: reservationData,
    onError: (err) => setError(err.message),
    onCompleted: () => {
      showToast('Reservation updated successfully', 'success');
      toggleEdit();
    },
  });

  const { data: tables, loading: tableLoad } = useQuery<GetTablesForSittingQuery, GetTablesForSittingQueryVariables>(GET_TABLES_FOR_SITTING_QUERY, {
    variables: {
      restaurantId: reservation.restaurantId, sitting: reservationData.sittingStart ?? reservation.sittingStart, partySize: reservationData.partySize ?? reservation.partySize
    },
    fetchPolicy: 'network-only'
  });

  let availableTables = tables?.getTablesForSitting || [];

  useEffect(() => {
    setReservationData(prev => ({ ...prev, tableId: undefined }));

  }, [availableTables]);

  const isSameSitting = (reservationData.sittingStart && new Date(reservationData.sittingStart).getTime() === new Date(reservation.sittingStart).getTime());

  const isWithinPartySizeRange = reservation.table.seats >= (reservationData.partySize ?? reservation.partySize) && reservation.table.seats <= (reservationData.partySize ?? reservation.partySize) + 2;

  const sittingButNoSelectedTable = reservationData.sittingStart && availableTables.length > 0 && !reservationData.tableId;

  if (
    (!reservationData.sittingStart || isSameSitting) &&
    isWithinPartySizeRange &&
    !availableTables.some(t => t._id === reservation.tableId)
  ) {
    availableTables = [
      {
        _id: reservation.tableId,
        name: reservation.table.name,
        seats: reservation.table.seats,
      },
      ...availableTables
    ];
  };

  const handleTableChange = (tableId: string) => {
    const table = availableTables.find((t) => t._id === tableId);
    if (table) {
      setReservationData((prev) => ({ ...prev, tableId }));
    }
  };

  const handleChange = (data: Partial<UpdateReservationMutationVariables>) => {
    setReservationData(prev => {
      return { ...prev, ...data };
    });
  };

  const handleSave = () => {
    setError(null);
    setShowSaveDialog(true);
  };

  const save = () => {
    updateReservation();
  }

  if (updateLoading) return (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ p: 4 }}>
      <CircularProgress size={20} />

      <Typography>Saving...</Typography>

    </Stack>
  );

  return (
    <Box component="form" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="First Name"
            value={reservationData.firstName ?? reservation.firstName}
            onChange={(e) => handleChange({ firstName: e.target.value })}
            fullWidth
          />
          <TextField
            label="Last Name"
            value={reservationData.lastName ?? reservation.lastName}
            onChange={(e) => handleChange({ lastName: e.target.value })}
            fullWidth
          />
        </Stack>

        <TextField
          label="Email"
          value={reservationData.email ?? reservation.email}
          onChange={(e) => handleChange({ email: e.target.value })}
          fullWidth
        />

        <Stack direction="row" spacing={2}>
          <TextField
            label="Party Size"
            type="number"
            value={reservationData.partySize ?? reservation.partySize}
            onChange={(e) => handleChange({ partySize: Number(e.target.value) })}
            fullWidth
          />
        </Stack>

        <Typography variant='body2' color='textDisabled'>Current sitting: {dayjs(reservation.sittingStart).format('YYYY-MM-DD HH:mm')}</Typography>
        <SittingSelect
          restaurantId={reservation.restaurantId}
          partySize={reservationData.partySize ?? reservation.partySize}
          initialValue={reservation.sittingStart}
          value={reservationData.sittingStart ?? ''}
          onChange={(value) => handleChange({ sittingStart: value })}
        />

        <Typography variant='subtitle2' color='textDisabled'>Current table: {`${reservation.table.name} (seats: ${reservation.table.seats})`}</Typography>

        {sittingButNoSelectedTable && <ErrorMessage message='If no table is selected for the new sitting one will be assigned for you.' />}

        {!tableLoad && availableTables.length ?
          <FormControl fullWidth>
            <InputLabel id="table-select-label">Available Tables</InputLabel>
            <Select
              labelId="table-select-label"
              value={reservationData.tableId ?? ''}
              onChange={(e) => handleTableChange(e.target.value)}
            >
              {availableTables.map(t => (
                <MenuItem key={t._id} value={t._id}>
                  {t.name} ({t.seats} seats)
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          :
          <ErrorMessage message='No available tables for the selected sitting and party size.' />
        }

        <TextField
          label="Message"
          value={reservationData.message ?? reservation.message}
          onChange={(e) => handleChange({ message: e.target.value })}
          fullWidth
          multiline
          rows={3}
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" onClick={handleSave}>Save</Button>
          <Button variant="outlined" onClick={toggleEdit}>Abort</Button>
        </Stack>
      </Stack>
      <ConfirmDialog text='' open={showSaveDialog} setOpen={setShowSaveDialog} onConfirm={save} onAbort={() => { }} />
      {error && <Box sx={{ color: 'error.main', mt: 2, border: "1px solid", borderColor: "error.main", p: 2 }}>{error}</Box>}
    </Box>
  );
};

const ErrorMessage = ({ message }: { message: string }) => (
  <Typography variant='body2' color='error' maxWidth={400}>{message}</Typography>
);

export default ReservationEdit;