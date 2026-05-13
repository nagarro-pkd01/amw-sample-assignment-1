import { test, expect } from "@playwright/test";

test("signup success", async ({ page }) => {
  const username = `user_${Date.now()}`;

  await page.goto("/signup");

  await page.getByLabel(/username/i).fill(username);

  await page.getByLabel(/password/i).fill("password123");

  await Promise.all([
    page.waitForURL("/", { timeout: 10000 }),
    page
      .locator("form")
      .getByRole("button", { name: /signup/i })
      .click(),
  ]);
});