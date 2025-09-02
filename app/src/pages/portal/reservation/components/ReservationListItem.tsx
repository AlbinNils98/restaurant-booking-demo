import { Box, Button, IconButton, ListItem, Stack, Typography } from '@mui/material';
import type { ReservationDto } from '../../../../generated/graphql';
import dayjs from 'dayjs';
import { DeleteOutline } from '@mui/icons-material';
import { useState } from 'react';
import ReservationEdit from './ReservationEdit';

type ResertavionListItemProps = {
  reservation: ReservationDto;
};

const ReservationListItem = ({ reservation }: ResertavionListItemProps) => {
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!edit);

  return (
    <ListItem
      key={reservation._id}
      sx={{ borderBottom: '1px solid #e0e0e0', py: 2, alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between' }}
    >
      {edit ?
        <ReservationEdit reservation={reservation} onAbort={toggleEdit} onSave={(updated) => {
          console.log('Save', updated);
          toggleEdit();
        }} />
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

            <Stack direction="row" spacing={2}>
              <Typography variant="body2" color="text.secondary">
                Table: {reservation.tableName || 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Confirmation Code: {reservation.confirmationCode}
              </Typography>
            </Stack>

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
            <IconButton>
              <DeleteOutline color="error" />
            </IconButton>
          </Stack>
        </Stack>
      }
    </ListItem>
  );
}

export default ReservationListItem;