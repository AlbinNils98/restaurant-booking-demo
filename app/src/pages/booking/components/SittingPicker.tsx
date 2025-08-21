import { Button, Typography } from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_AVAILABLE_SITTINGS_QUERY } from '../../../graphql/query/restaurant';
import { useBooking } from '../../../context/Booking';
import type { GetAvailableSittingsQuery, GetAvailableSittingsQueryVariables } from '../../../generated/graphql';

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

  // Convert ISO strings into objects with date + label
  const options = data?.getAvailableSittings.map((iso) => {
    const d = dayjs(iso);
    return {
      iso,
      date: d.format("YYYY-MM-DD"),
      label: d.format("HH:mm"),
    };
  });

  const handleSelection = () => {
    if (value) {
      setFormData({ sittingStart: value })
      onClick();
    }
  }

  return (
    <>
      <Typography>Select a date and time when you want to visit.</Typography>

      <Autocomplete
        options={options}
        groupBy={(option) => option.date} // groups by date
        getOptionLabel={(option) => `${option.date} ${option.label}`}
        value={options.find((o) => o.iso === value) || null}
        onChange={(_, newValue) => setValue(newValue ? newValue.iso : null)}
        renderInput={(params) => (
          <TextField {...params} label="Select a sitting" />
        )}
      />
      <Button
        variant="contained"
        fullWidth
        onClick={handleSelection}>Next</Button>
    </>
  );
}