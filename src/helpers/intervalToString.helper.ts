export function intervalToString(interval: number = 0): string {
  const seconds = interval / 1e9;

  let result = "";

  if (seconds >= 1 && seconds < 60) {
    result += ` ${Math.floor(seconds)} second${Math.floor(seconds) > 1 ? "s" : ""}`;
  }

  if (seconds >= 60 && seconds < 3600) {
    result += ` ${Math.floor(seconds / 60)} minute${Math.floor(seconds / 60) > 1 ? "s" : ""}`;
  }

  return result.trim();
}
