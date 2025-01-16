import { toTimeValue } from "./toTimeValue.helper";

describe("toTimeValue", () => {
  test("should return the correct date value", () => {
    const date = "2000-05-30T00:00:00.000Z";
    const expected = "00:00";
    const result = toTimeValue(date);
    expect(result).toBe(expected);
  });

  test("should return null if the date is invalid", () => {
    const date = "invalid";
    const result = toTimeValue(date);
    expect(result).toBeNull();
  });
});
