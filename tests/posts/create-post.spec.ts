import { test, expect } from "@playwright/test";

test("create post success", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("language", "en");
  });
  await page.goto("/login");

  await page.getByLabel("Username").fill("123");
  await page.getByLabel("Password").fill("123");

  const loginForm = page.locator("form");

  await loginForm
    .getByRole("button", { name: /login/i })
    .click();

  await expect(page).toHaveURL("/");

  await page.getByRole("button", { name: /create post/i }).click();

  await expect(page).toHaveURL(/post/);

  const titleInput = page.getByLabel("Title");
  await expect(titleInput).toBeVisible();

  await titleInput.fill("My Test Post");

  await page.getByLabel("Description").fill("This is test content");

  await page.setInputFiles(
    "input[type='file']",
    "tests/fixtures/test-image.png"
  );

  await page.locator("form button[type='submit']").click();

  await expect(page).toHaveURL("/");
});