import { TextField } from '@mui/material';

type TimeInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const formatTime = (val: string) => {
  const digits = val.replace(/\D/g, "");
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
};

const TimeInput = ({ label, value, onChange }: TimeInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatTime(e.target.value);
    onChange(formatted);
  };

  return (
    <TextField
      label={label}
      placeholder="HH:mm"
      value={value}
      onChange={handleChange}
      slotProps={{ inputLabel: { shrink: true } }}
      sx={{ width: 100 }}
    />
  );
};

export default TimeInput;