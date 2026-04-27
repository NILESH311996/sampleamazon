const { test, expect } = require("@playwright/test");

test("search shoes on Myntra", async ({ page }) => {
  await page.goto("https://www.myntra.com");
  await page.waitForTimeout(2000);
  const searchInput = page.getByPlaceholder("Search for products, brands and more");
  await searchInput.fill("shoes");
  await searchInput.press("Enter");
  await expect(page).toHaveURL(/shoes|search/i);

  const firstProductName = page.locator("xpath=(//li[contains(@class,'product-base')]//h3)[1]");
  const productName = (await firstProductName.textContent())?.trim();
  console.log(`First product: ${productName}`);
});

test.only("search laptops on Amazon and list products with prices", async ({ page }) => {
  await page.goto("https://www.amazon.in");

  const searchInput = page.locator("#twotabsearchtextbox");
  await searchInput.fill("laptops");
  await searchInput.press("Enter");

  const searchResults = page.locator("div.s-main-slot div[data-component-type='s-search-result']");
  await searchResults.first().waitFor({ state: "visible", timeout: 15000 });

  const totalResults = await searchResults.count();
  for (let i = 0; i < totalResults; i += 1) {
    const productCard = searchResults.nth(i);
    const name = (await productCard.locator("h2 span").first().textContent())?.trim();
    const price = (await productCard.locator("span.a-price > span.a-offscreen").first().textContent())?.trim();

    if (name && price) {
      console.log(`${i + 1}. ${name} - ${price}`);
    }
  }
});
