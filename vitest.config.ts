/// <reference types="vitest" />
import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.tsx",
    testTimeout: 10000,
    watch: false
  },
});
