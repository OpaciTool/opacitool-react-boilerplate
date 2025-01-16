import { intervalToString } from "./intervalToString.helper";

describe("intervalToString", () => {
  test("should return the correct seconds string", () => {
    const interval = 15000000000;

    const expected = "15 seconds";

    const result = intervalToString(interval);
    expect(result).toBe(expected);
  });
});
