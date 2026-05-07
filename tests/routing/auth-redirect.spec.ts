import { test, expect } from "@playwright/test";

test("logged in user redirected from login", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("token", "fake-token");
  });

  await page.goto("/login");

  await expect(page).toHaveURL("/");
});