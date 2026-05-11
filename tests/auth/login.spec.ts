import { test, expect } from "@playwright/test";

test("login success", async ({ page, request }) => {
  const username = `user_${Date.now()}`;
  await request.post("http://localhost:5000/auth/signup", {
    data: { username, password: "password123" },
  });

  await page.goto("/login");

  await page.fill("#username", username);
  await page.fill("#password", "password123");

  await Promise.all([
    page.waitForURL("/", { timeout: 10000 }),
    page.click("button[type='submit']"),
  ]);
});

test("login failure", async ({ page }) => {
  await page.goto("/login");

  await page.fill("#username", "wrong");
  await page.fill("#password", "wrong");

  await page.click("button[type='submit']");

  await expect(page.getByRole("alert")).toBeVisible();
});