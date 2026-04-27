const { test, expect } = require("@playwright/test");
const { HomePage } = require("../pages/home-page");
const { homePage } = require("../fixtures/test-data");

test.describe("Home page", () => {
  test("@smoke should open the home page", async ({ page }) => {
    const app = new HomePage(page);
    await app.open();
    await expect(page).toHaveTitle(new RegExp(homePage.titleText, "i"));
  });

  test("should navigate to getting started docs", async ({ page }) => {
    const app = new HomePage(page);
    await app.open();
    await app.clickGetStarted();
    await expect(page).toHaveURL(new RegExp(homePage.docsLink));
  });
});
