import dayjs from "dayjs";

export function setDateTime(date: string, time: string): string | null {
  let dateTime = dayjs(date);
  if (!dateTime.isValid()) {
    return null;
  }

  const hour = parseInt(time.split(":")[0]);
  const minute = parseInt(time.split(":")[1]);

  if (isNaN(hour) || isNaN(minute)) {
    return null;
  }

  dateTime = dateTime.set("hour", parseInt(time.split(":")[0]));
  dateTime = dateTime.set("minute", parseInt(time.split(":")[1]));

  return dateTime.toISOString();
}
