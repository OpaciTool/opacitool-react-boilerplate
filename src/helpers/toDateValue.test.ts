import { toDateValue } from "./toDateValue.helper";

describe("toDateValue", () => {
  test("should return the correct date value", () => {
    const date = "2000-05-30T00:00:00.000Z";
    const expected = "2000-05-30";
    const result = toDateValue(date);
    expect(result).toBe(expected);
  });

  test("should return null if the date is invalid", () => {
    const date = "invalid";
    const result = toDateValue(date);
    expect(result).toBeNull();
  });
});
