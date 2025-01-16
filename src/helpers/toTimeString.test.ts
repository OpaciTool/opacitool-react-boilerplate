import { toTimeString } from "./toTimeString.helper";

describe("toTimeString", () => {
  it("should return a formatted time string", () => {
    const timestamp = "2024-07-28T10:00:00Z";
    const expected = "10:00:00";
    const result = toTimeString(timestamp);
    expect(result).toBe(expected);

    const timestamp2 = "2024-07-28T22:00:00Z";
    const expected2 = "22:00:00";
    const result2 = toTimeString(timestamp2);
    expect(result2).toBe(expected2);
  });
});
