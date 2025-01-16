import { parseReadingOpacity } from "./parseReadingOpacity.helper";

describe("parseReadingOpacity", () => {
  test("should return the correct opacity (50)", () => {
    const opacity = 0.5;
    const expected = "50";
    const result = parseReadingOpacity(opacity);
    expect(result).toBe(expected);
  });

  test("should return the correct opacity (100)", () => {
    const opacity = 1;
    const expected = "100";
    const result = parseReadingOpacity(opacity);
    expect(result).toBe(expected);
  });

  test("should return the correct opacity (0)", () => {
    const opacity = 0;
    const expected = "0";
    const result = parseReadingOpacity(opacity);
    expect(result).toBe(expected);
  });

  test("should return the correct opacity (25)", () => {
    const opacity = 0.25;
    const expected = "25";
    const result = parseReadingOpacity(opacity);
    expect(result).toBe(expected);
  });
});
