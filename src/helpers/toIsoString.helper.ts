import dayjs from "dayjs";

export function toIsoString(timestamp: string): string | null {
  const date = dayjs(timestamp);
  if (!date.isValid()) {
    return null;
  }
  return date.toISOString();
}
