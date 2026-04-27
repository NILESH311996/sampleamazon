const { test, expect } = require("@playwright/test");

test("facebook login with blank password shows validation message", async ({ page }) => {
  // 1. Navigate to Facebook using goto.
  await page.goto("https://www.facebook.com", { waitUntil: "domcontentloaded" });

  // 2. Locate email and password fields with stable locators.
  const emailField = page.locator("#email");
  const passwordField = page.locator("#pass");
  const loginButton = page.locator("button[name='login']");

  await page.waitForTimeout(2000);


  // 3. Fill email and keep password blank.
  await emailField.fill("nileshsingh3105@gmail.com");
  await passwordField.fill("");

  // 4. Click login button.
  await loginButton.click();

  // 5. Assertion: validate required-password message from browser validation API.
  const validationMessage = await passwordField.evaluate((el) =>
    el.validationMessage?.trim()
  );
  expect(validationMessage).toBeTruthy();
});
