import { useQuery } from "@apollo/client";
import { Autocomplete, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { GET_AVAILABLE_SITTINGS_QUERY } from '../graphql/query/restaurant';
import type { GetAvailableSittingsQuery, GetAvailableSittingsQueryVariables } from '../generated/graphql';

type SittingSelectProps = {
  restaurantId: string;
  partySize: number;
  value: string | null;
  initialValue?: string; // optional now
  onChange: (value: string | null) => void;
};

export default function SittingSelect({
  restaurantId,
  partySize,
  value,
  initialValue,
  onChange,
}: SittingSelectProps) {
  const { data, loading } = useQuery<GetAvailableSittingsQuery, GetAvailableSittingsQueryVariables>(
    GET_AVAILABLE_SITTINGS_QUERY,
    {
      variables: { restaurantId, partySize },
      fetchPolicy: "network-only",
    }
  );

  if (loading) return <Typography>Loading...</Typography>;
  if (!data) return <Typography>No sittings available</Typography>;

  let sittings = data.getAvailableSittings;

  // Only prepend initialValue if it exists and isn’t already included
  if (initialValue && !sittings.includes(initialValue)) {
    sittings = [initialValue, ...sittings];
  }

  const options = sittings.map((iso) => {
    const d = dayjs(iso);
    return { iso, date: d.format("YYYY-MM-DD"), label: d.format("HH:mm") };
  });

  return (
    <Autocomplete
      options={options}
      groupBy={(option) => option.date}
      getOptionLabel={(option) => `${option.date} ${option.label}`}
      value={options.find((o) => o.iso === value) || (initialValue ? options.find((o) => o.iso === initialValue) : null) || null}
      onChange={(_, newValue) => onChange(newValue ? newValue.iso : null)}
      renderInput={(params) => <TextField {...params} label="Select a sitting" />}
    />
  );
}