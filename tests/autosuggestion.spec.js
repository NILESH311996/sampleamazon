const { test, expect } = require("@playwright/test");

test("print Amazon suggestions for iphone 16 pro", async ({ page }) => {
  await page.goto("https://www.amazon.in", { waitUntil: "domcontentloaded" });

  const searchBox = page.locator("#twotabsearchtextbox");
  await expect(searchBox).toBeVisible({ timeout: 15000 });
  await searchBox.fill("iphone 16 pro");

  // Wait 3 seconds so autosuggestions can load.
  await page.waitForTimeout(5000);

  const suggestions = page.locator(
    "//div[@class='s-suggestion s-suggestion-ellipsis-direction']"
  );
  
  const totalSuggestions = await suggestions.count();

  console.log(`Total suggestions: ${totalSuggestions}`);
  const printed = new Set();
  for (let i = 0; i < totalSuggestions; i += 1) {
    const text = (await suggestions.nth(i).innerText())?.trim();
    if (text && !printed.has(text)) {
      printed.add(text);
      console.log(`${printed.size}. ${text}`);
    }
  }
});
