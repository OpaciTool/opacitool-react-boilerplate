import { toNumericDateString } from "./toNumericDateString.helper";

describe("toDateString", () => {
  test("should return the correct date string", () => {
    const date = "2000-05-30T00:00:00.000Z";
    const expected = "05/30/2000";
    const result = toNumericDateString(date);
    expect(result).toBe(expected);
  });
});
