/// <reference types="node" />

import { defineConfig } from "@playwright/test";

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",

  timeout: 30000,

  fullyParallel: true,

  reporter: [["html"], ["list"]],

  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  webServer: isCI
    ? undefined
    : [
        {
          command: "pnpm --filter express dev",
          port: 5000,
          reuseExistingServer: true,
          timeout: 120000,
        },
        {
          command: "pnpm --filter react dev -- --host 0.0.0.0",
          port: 5173,
          reuseExistingServer: true,
          timeout: 120000,
        },
      ],
});