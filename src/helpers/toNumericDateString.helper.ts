export function toNumericDateString(dateString: string): string {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formatter.format(date);
}
