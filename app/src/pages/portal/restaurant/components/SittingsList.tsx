import { Box, Chip } from '@mui/material';

const SittingsList = ({ sittings }: { sittings: { startTime: string; durationMinutes: number }[] }) => {
  // Sort sittings by start time
  const sortedSittings = sittings
    .map(s => {
      const [hours, minutes] = s.startTime.split(":").map(Number);
      const start = new Date();
      start.setHours(hours, minutes, 0, 0);
      const end = new Date(start.getTime() + s.durationMinutes * 60000);
      return { start, end };
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  return (
    <Box display="flex" flexWrap="wrap" gap={1}>
      {sortedSittings.map((s, idx) => {
        const startStr = s.start.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
        const endStr = s.end.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
        return (
          <Box key={idx} sx={{ width: 120 }}>
            <Chip label={`${startStr} – ${endStr}`} variant="outlined" />
          </Box>
        );
      })}
    </Box>
  );
};

export default SittingsList;