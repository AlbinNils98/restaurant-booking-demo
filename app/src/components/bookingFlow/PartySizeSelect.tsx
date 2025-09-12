import { Button, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import { useBooking } from '../../context/Booking';

type PartySizeSelectProps = {
  onClick: () => void;
}

const PartySizeSelect = ({ onClick }: PartySizeSelectProps) => {
  const { formData, setFormData } = useBooking();
  const [partySize, setPartySize] = useState(formData.partySize > 0 ? String(formData.partySize) : 1);
  const [error, setError] = useState<string>("");


  const handlePartySizeSelect = () => {
    const numericValue = Number(partySize);

    if (!partySize) {
      setError("Please enter a value");
      return;
    }
    if (isNaN(numericValue) || numericValue < 1 || numericValue > 10) {
      setError("Party size must be between 1 and 10");
      return;
    }

    setError("");
    setFormData({ partySize: numericValue, sittingStart: "" });
    onClick();
  }



  return (
    <>
      <Typography>How many people is the reservation for?</Typography>

      <TextField
        label="Party size"
        type="number"
        value={partySize}
        onChange={(e) => setPartySize(e.target.value)}
        slotProps={{ input: { inputProps: { min: 1, max: 10 } } }}
        error={!!error}
        helperText={error}
      />

      <Button
        onClick={handlePartySizeSelect}
        variant="contained"
        sx={{ width: 200 }}
      >
        Next
      </Button>
    </>
  );
};

export default PartySizeSelect