import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_AVAILABLE_SITTINGS_QUERY } from '../../../graphql/query/restaurant';
import { useBooking } from '../../../context/Booking';
import type { GetAvailableSittingsQuery, GetAvailableSittingsQueryVariables } from '../../../generated/graphql';
import SittingSelect from '../../../components/SittingSelect';

type SittingPickerProps = {
  onClick: () => void;
}

export default function SittingPicker({ onClick }: SittingPickerProps) {
  const { formData, setFormData } = useBooking();
  const [value, setValue] = useState<string | null>(formData.sittingStart || null);

  const { data, loading } = useQuery<GetAvailableSittingsQuery, GetAvailableSittingsQueryVariables>(GET_AVAILABLE_SITTINGS_QUERY, {
    variables: {
      restaurantId: formData.restaurantId,
      partySize: formData.partySize
    }
  });

  useEffect(() => {
    if (data?.getAvailableSittings.length && !value) {
      setValue(data?.getAvailableSittings[0]);
    }
  }, [data?.getAvailableSittings, value]);

  if (!data || loading) return <Typography>Loading...</Typography>

  if (data.getAvailableSittings.length < 1) return <Typography>No available sittings for the selected party size.</Typography>

  const handleSelection = () => {
    if (value) {
      setFormData({ sittingStart: value })
      onClick();
    }
  }

  return (
    <>
      <Typography>Select a date and time when you want to visit.</Typography>

      <SittingSelect
        restaurantId={formData.restaurantId}
        partySize={formData.partySize}
        value={value}
        onChange={setValue}
      />
      <Button
        variant="contained"
        fullWidth
        onClick={handleSelection}>Next</Button>
    </>
  );
}