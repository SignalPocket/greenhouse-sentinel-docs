import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: { baseURL: "http://127.0.0.1:8000", trace: "on-first-retry" },
  webServer: {
    command: "zensical serve --dev-addr 127.0.0.1:8000",
    url: "http://127.0.0.1:8000",
    reuseExistingServer: !process.env.CI
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }]
});
