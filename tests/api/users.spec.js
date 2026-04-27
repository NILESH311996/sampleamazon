const { test, expect } = require("@playwright/test");
const { api } = require("../fixtures/test-data");

test.describe("Users API", () => {
  test("@smoke should fetch users successfully", async ({ request }) => {
    const response = await request.get(api.usersEndpoint);
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty("id");
    expect(data[0]).toHaveProperty("email");
  });
});
