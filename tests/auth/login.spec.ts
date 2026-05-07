import { test, expect } from "@playwright/test";

test("login success", async ({ page }) => {
  await page.goto("/login");

  await page.fill("#username", "123");
  await page.fill("#password", "123");

  await page.click("button[type='submit']");

  await expect(page).toHaveURL("/login");
});

test("login failure", async ({ page }) => {
  await page.goto("/login");

  await page.fill("#username", "wrong");
  await page.fill("#password", "wrong");

  await page.click("button[type='submit']");

  await expect(page.getByRole("alert")).toBeVisible();
});