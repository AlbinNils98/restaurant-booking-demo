export default function normalizeDate(date: Date) {
  const d = new Date(date);
  d.setMilliseconds(0);
  return d;
}