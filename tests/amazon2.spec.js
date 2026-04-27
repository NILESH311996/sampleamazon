const { test, expect } = require("@playwright/test");
const { AmazonSearchPage } = require("../pages/amazonSearchPage");

test("search shoes on Amazon", async ({ page }) => {
  const amazonSearchPage = new AmazonSearchPage(page);
  await amazonSearchPage.goto();
  await amazonSearchPage.searchFor("shoes");

  await expect(page).toHaveURL(/s\?k=shoes|\/s\//i);
});
