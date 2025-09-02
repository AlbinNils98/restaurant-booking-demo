import { useState } from 'react';
import { Box, Button, TextField, Stack } from '@mui/material';
import type { ReservationDto } from '../../../../generated/graphql';
import SittingSelect from '../../../../components/SittingSelect';

type EditReservationProps = {
  reservation: ReservationDto;
  onSave: (updated: any) => void;
  onAbort: () => void;
};

const ReservationEdit = ({ reservation, onSave, onAbort }: EditReservationProps) => {
  const [reservationData, setReservationData] = useState({
    firstName: reservation.firstName || '',
    lastName: reservation.lastName || '',
    email: reservation.email || '',
    tableName: reservation.tableName || '',
    partySize: reservation.partySize || 1,
    message: reservation.message || '',
    sittingStart: reservation.sittingStart,
    sittingEnd: reservation.sittingEnd,
    confirmationCode: reservation.confirmationCode || '',
  });

  const handleChange = (field: string, value: any) => {
    setReservationData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(reservationData);
  };

  return (
    <Box component="form" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="First Name"
            value={reservationData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            fullWidth
          />
          <TextField
            label="Last Name"
            value={reservationData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            fullWidth
          />
        </Stack>

        <TextField
          label="Email"
          value={reservationData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          fullWidth
        />

        <Stack direction="row" spacing={2}>
          <TextField
            label="Table Name"
            value={reservationData.tableName}
            onChange={(e) => handleChange('tableName', e.target.value)}
            fullWidth
          />
          <TextField
            label="Party Size"
            type="number"
            value={reservationData.partySize}
            onChange={(e) => handleChange('partySize', Number(e.target.value))}
            fullWidth
          />
        </Stack>

        <SittingSelect
          restaurantId={reservation.restaurantId}
          partySize={reservationData.partySize}
          value={reservationData.sittingStart}
          onChange={(value) => handleChange('sittingStart', value)}
        />

        <TextField
          label="Message"
          value={reservationData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          fullWidth
          multiline
          rows={3}
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" onClick={handleSubmit}>Save</Button>
          <Button variant="outlined" onClick={onAbort}>Abort</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ReservationEdit;