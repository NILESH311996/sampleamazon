const { test, expect } = require("@playwright/test");

test("search shoes on Amazon and add first product to cart", async ({ context, page }) => {
  await page.goto("https://www.amazon.in", { waitUntil: "domcontentloaded" });

  const searchBox = page.locator("#twotabsearchtextbox");
  await expect(searchBox).toBeVisible({ timeout: 15000 });
  await searchBox.fill("shoes");
  await searchBox.press("Enter");

  // User requested 3000 wait after search.
  await page.waitForTimeout(3000);

  const firstResultLink = page
    .locator("div.s-main-slot div[data-component-type='s-search-result'] h2 a.a-link-normal")
    .first();
  await expect(firstResultLink).toBeVisible({ timeout: 15000 });
  await firstResultLink.scrollIntoViewIfNeeded();

  const [productPage] = await Promise.all([
    context.waitForEvent("page"),
    firstResultLink.click({ timeout: 10000 }),
  ]);

  await productPage.waitForLoadState("domcontentloaded");

  const addToCartButton = productPage.locator("#add-to-cart-button");
  await expect(addToCartButton).toBeVisible({ timeout: 15000 });
  await addToCartButton.click();

  const cartConfirmation = productPage.locator(
    "#attachDisplayAddBaseAlert, #NATC_SMART_WAGON_CONF_MSG_SUCCESS, .a-size-medium-plus"
  );
  await expect(cartConfirmation.first()).toBeVisible({ timeout: 15000 });
});
