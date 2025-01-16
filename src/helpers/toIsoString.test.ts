import { toIsoString } from "./toIsoString.helper";

describe("toIsoString", () => {
  test("should return the correct ISO string", () => {
    const date = "2000-05-30";
    const expected = "2000-05-30T00:00:00.000Z";
    const result = toIsoString(date);
    expect(result).toBe(expected);
  });

  test("should return null if the date is invalid", () => {
    const date = "invalid";
    const result = toIsoString(date);
    expect(result).toBeNull();
  });
});
