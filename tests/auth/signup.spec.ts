import { test, expect } from "@playwright/test";

test("signup success", async ({ page }) => {
  await page.goto("/signup");

  await page.fill("#username", `user${Date.now()}`);
  await page.fill("#password", "password123");

  await page.click("button[type='submit']");

  await expect(page).toHaveURL("/");
});

test("signup validation failure", async ({ page }) => {
  await page.goto("/signup");

  await page.click("button[type='submit']");

  await expect(page.locator(":invalid")).toHaveCount(3);
});