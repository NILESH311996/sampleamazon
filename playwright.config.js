const { defineConfig, devices } = require("@playwright/test");
const dotenv = require("dotenv");

dotenv.config();

const baseURL = process.env.BASE_URL || "https://playwright.dev";
const isCI = !!process.env.CI;

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 10 * 1000
  },
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    ["json", { outputFile: "test-results/results.json" }],
    ["junit", { outputFile: "test-results/results.xml" }]
  ],
  outputDir: "test-results/artifacts",
  use: {
    baseURL,
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] }
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] }
    // }
  ]
});
