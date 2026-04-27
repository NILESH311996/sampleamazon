const { expect } = require("@playwright/test");

class AmazonSearchPage {
  constructor(page) {
    this.page = page;
    this.searchBox = page.locator("#twotabsearchtextbox");
  }

  async goto() {
    await this.page.goto("https://www.amazon.in", { waitUntil: "domcontentloaded" });
  }

  async searchFor(productName) {
    await expect(this.searchBox).toBeVisible({ timeout: 15000 });
    await this.searchBox.fill(productName);
    await this.searchBox.press("Enter");
  }
}

module.exports = { AmazonSearchPage };
