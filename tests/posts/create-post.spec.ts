import { test, expect } from "@playwright/test";
import { signupAndLogin } from "../auth/utils";

test("create post success", async ({ page }) => {
  // -------------------------
  // LOGIN
  // -------------------------
  await signupAndLogin(page);

  await expect(page).toHaveURL("/");

  // -------------------------
  // WAIT FOR HOME
  // -------------------------
  await page.waitForLoadState("load");

  // -------------------------
  // CLICK HEADER CREATE BUTTON
  // -------------------------
  const createButton = page
    .locator("header")
    .getByRole("button", { name: /create post/i });

  await expect(createButton).toBeVisible();

  await createButton.click();

  // -------------------------
  // VERIFY CREATE PAGE
  // -------------------------
  await expect(page).toHaveURL(/post/);

  // -------------------------
  // FILL FORM
  // -------------------------
  await page.getByLabel(/title/i).fill("My Test Post");

  await page
    .getByLabel(/description/i)
    .fill("This is test content");

  // -------------------------
  // SUBMIT FORM
  // -------------------------
  const submitButton = page
    .locator("form")
    .getByRole("button", { name: /create/i });

  await expect(submitButton).toBeVisible();

  await submitButton.click();

  // -------------------------
  // VERIFY REDIRECT
  // -------------------------
  await expect(page).toHaveURL("/");
});