import { calculateViewingAngle } from "./calculateViewingAngle.helper";

describe("calculateViewingAngle", () => {
  test("should return the correct viewing angle (11.31)", () => {
    const distance = 10;
    const height = 2;
    const expected = 11.31;
    const result = calculateViewingAngle(distance, height);
    expect(result).toBeCloseTo(expected, 2);
  });

  test("should return the correct viewing angle (18.43)", () => {
    const distance = 300;
    const height = 100;
    const expected = 18.43;
    const result = calculateViewingAngle(distance, height);
    expect(result).toBeCloseTo(expected, 2);
  });
});
