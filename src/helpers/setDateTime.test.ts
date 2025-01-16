import { setDateTime } from "./setDateTime.helper";

describe("setDateTime", () => {
  test("should return the correct ISO string", () => {
    const date = "2000-05-30";
    const time = "12:34";
    const expected = "2000-05-30T12:34:00.000Z";
    const result = setDateTime(date, time);
    expect(result).toBe(expected);
  });

  test("should return null if the date is invalid", () => {
    const date = "invalid";
    const time = "12:34";
    const result = setDateTime(date, time);
    expect(result).toBeNull();
  });

  test("should return null if the time is invalid", () => {
    const date = "2000-05-30";
    const time = "invalid";
    const result = setDateTime(date, time);
    expect(result).toBeNull();
  });
});
