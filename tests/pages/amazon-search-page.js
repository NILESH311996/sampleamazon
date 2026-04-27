const { expect } = require("@playwright/test");

class AmazonSearchPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator("#twotabsearchtextbox");
    this.searchSubmitButton = page.locator("#nav-search-submit-button");
    this.searchResults = page.locator("div[data-component-type='s-search-result']");
  }

  async open() {
    try {
      await this.page.goto("https://www.amazon.in", {
        waitUntil: "domcontentloaded",
        timeout: 60000
      });
    } catch (error) {
      // Retry once to tolerate temporary network or site slowdowns.
      await this.page.goto("https://www.amazon.in", {
        waitUntil: "domcontentloaded",
        timeout: 60000
      });
    }
  }

  async searchFor(term) {
    await this.searchInput.fill(term);
    await this.searchSubmitButton.click();
  }

  async verifyResultsVisible() {
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.searchResults.first()).toBeVisible({ timeout: 15000 });
  }

  async getFirstNProductsWithPrices(count = 5) {
    const items = this.searchResults;
    const total = await items.count();
    const limit = Math.min(count, total);
    const products = [];

    for (let i = 0; i < limit; i += 1) {
      const item = items.nth(i);
      const title = await this.getOptionalText(item.locator("h2 span").first());
      const wholePrice = await this.getOptionalText(item.locator(".a-price-whole").first());
      const fractionPrice = await this.getOptionalText(item.locator(".a-price-fraction").first());

      const cleanedTitle = (title || "").trim();
      const priceWhole = (wholePrice || "").replace(/[^\d,]/g, "").trim();
      const priceFraction = (fractionPrice || "").replace(/[^\d]/g, "").trim();
      const formattedPrice = priceWhole
        ? `INR ${priceWhole}${priceFraction ? `.${priceFraction}` : ""}`
        : "Price not available";

      products.push({
        name: cleanedTitle || "Name not available",
        price: formattedPrice
      });
    }

    return products;
  }

  async getOptionalText(locator) {
    const matchCount = await locator.count();
    if (!matchCount) {
      return "";
    }

    try {
      return (await locator.textContent({ timeout: 2000 })) || "";
    } catch (error) {
      return "";
    }
  }

  async takeResultsScreenshot(filePath) {
    await this.page.screenshot({ path: filePath, fullPage: true });
  }
}

module.exports = { AmazonSearchPage };
