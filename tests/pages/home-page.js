class HomePage {
  constructor(page) {
    this.page = page;
    this.getStartedLink = page.getByRole("link", { name: "Get started" });
  }

  async open() {
    await this.page.goto("/");
  }

  async clickGetStarted() {
    await this.getStartedLink.click();
  }
}

module.exports = { HomePage };
