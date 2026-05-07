import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  use: {
    baseURL: "http://localhost:5173",
    headless: true,
  },
  timeout: 30000,

  webServer: [
    {
      command: "pnpm --filter express dev",
      port: 5000,
      reuseExistingServer: true,
    },
    {
      command: "pnpm --filter react dev",
      port: 5173,
      reuseExistingServer: true,
    },
  ],
});