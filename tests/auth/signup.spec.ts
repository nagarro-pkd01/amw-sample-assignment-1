import { test, expect } from "@playwright/test";

test("signup success", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("language", "en");
  });

  const username = `user_${Date.now()}`;

  await page.goto("/signup");

  await page.getByLabel(/username/i).fill(username);

  await page.getByLabel(/password/i).fill("password123");
  await page
    .locator("form")
    .getByRole("button", { name: /signup/i })
    .click();

  await expect(page).toHaveURL("/");
});