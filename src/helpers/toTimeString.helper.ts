export function toTimeString(timestamp: string): string {
  const date = new Date(timestamp);

  const formatter = Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return formatter.format(date);
}
