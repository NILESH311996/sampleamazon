const { test, expect } = require("@playwright/test");
const { AmazonSearchPage } = require("./pages/amazon-search-page");

test.setTimeout(120000);

test("search laptop on amazon india and capture top 5 results", async ({ page }) => {
  const amazonPage = new AmazonSearchPage(page);

  await amazonPage.open();
  await amazonPage.searchFor("laptop");
  await amazonPage.verifyResultsVisible();

  const products = await amazonPage.getFirstNProductsWithPrices(5);
  expect(products.length).toBeGreaterThan(0);

  console.log("Top 5 Amazon laptop search results:");
  products.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name} - ${product.price}`);
  });

  await amazonPage.takeResultsScreenshot("test-results/amazon-search-results.png");
});
