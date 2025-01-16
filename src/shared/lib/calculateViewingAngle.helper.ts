export function calculateViewingAngle(
  distance: number,
  height: number,
): number {
  return Math.atan2(height, distance) * (180 / Math.PI);
}
