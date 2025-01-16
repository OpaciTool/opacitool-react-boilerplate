import dayjs from "dayjs";

export function toTimeValue(timestamp: string): string | null {
  const date = dayjs(timestamp);
  if (!date.isValid()) {
    return null;
  }

  return date.format("HH:mm");
}
