import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useBooking } from '../../context/Booking';
import SittingSelect from '../SittingSelect';

type SittingPickerProps = {
  onClick: () => void;
}

export default function SittingPicker({ onClick }: SittingPickerProps) {
  const { formData, setFormData } = useBooking();
  const [value, setValue] = useState<string | null>(formData.sittingStart || null);

  const handleSelection = () => {
    if (value) {
      setFormData({ sittingStart: value })
      onClick();
    }
  }

  return (
    <Stack spacing={2}>
      <Typography>Select a date and time when you want to visit.</Typography>

      <SittingSelect
        restaurantId={formData.restaurantId}
        partySize={formData.partySize}
        value={value}
        onChange={setValue}
      />
      {value && <Button
        sx={{ width: 200, alignSelf: 'center' }}
        variant="contained"
        onClick={handleSelection}>Next</Button>
      }
    </Stack>
  );
}