import { test, expect } from "@playwright/test";

test("switch language to french", async ({ page }) => {
  await page.goto("/");

  const languageSelect = page.locator("#language-select");

  await languageSelect.waitFor();

  await languageSelect.selectOption("fr");

  await expect(
    page.getByText(/publier/i)
  ).toBeVisible();
});