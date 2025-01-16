import dayjs from "dayjs";

export function toDateValue(timestamp: string): string | null {
  const date = dayjs(timestamp);
  if (!date.isValid()) {
    return null;
  }
  return date.format("YYYY-MM-DD");
}
