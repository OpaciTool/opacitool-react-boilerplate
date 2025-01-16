export function logger(...args: string[]) {
  if (process.env.NODE_ENV === "development") {
    console.log("[LOGGER]", ...args);
  }
}
