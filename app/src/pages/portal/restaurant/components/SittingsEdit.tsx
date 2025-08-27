import { Stack, Button, TextField, Typography, IconButton, Box } from "@mui/material";
import { useState } from "react";
import type { Sitting, SittingInput } from '../../../../generated/graphql';
import { DeleteOutline } from '@mui/icons-material';
import TimeInput from './TimeInput';

interface SittingsEditProps {
  sittings: Sitting[];
  onChange: (newSittings: SittingInput[]) => void;
}

export const SittingsEdit = ({ sittings, onChange }: SittingsEditProps) => {
  if (!sittings) return <Typography></Typography>
  const [localSittings, setLocalSittings] = useState<SittingInput[]>([...sittings]);

  const handleAdd = () => {
    const newSitting: SittingInput = { startTime: "12:00", durationMinutes: 60 };
    const updated = [...localSittings, newSitting];
    setLocalSittings(updated);
    onChange(updated);
  };

  const handleUpdate = (index: number, field: keyof SittingInput, value: any) => {
    const updated = [...localSittings];
    updated[index] = { ...updated[index], [field]: value };
    setLocalSittings(updated);
    onChange(updated);
  };

  const handleRemove = (index: number) => {
    const updated = localSittings.filter((_, i) => i !== index);
    setLocalSittings(updated);
    onChange(updated);
  };

  return (
    <Stack spacing={2} >
      <Box display="flex" flexWrap="wrap" gap={1}>
        {localSittings.map((s, i) => (
          <Box
            key={i}
            sx={{
              width: localSittings.length === 1 ? '100%' : 'calc(50% - 8px)'
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <TimeInput
                label="Start Time"
                value={s.startTime}
                onChange={(value) => handleUpdate(i, "startTime", value)}
              />
              <TextField
                label="Duration (min)"
                type="number"
                value={s.durationMinutes}
                onChange={(e) => handleUpdate(i, "durationMinutes", parseInt(e.target.value))}
                sx={{ width: 120 }}
              />
              <IconButton onClick={() => handleRemove(i)}>
                <DeleteOutline color="error" />
              </IconButton>
            </Stack>
          </Box>
        ))}
      </Box>

      <Box>
        <Button variant="outlined" onClick={handleAdd}>Add Sitting</Button>
      </Box>
    </Stack>
  );
};

export default SittingsEdit;