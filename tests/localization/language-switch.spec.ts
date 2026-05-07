import { test, expect } from "@playwright/test";

test("switch language to french", async ({ page }) => {
  await page.goto("/");

  await page.selectOption("#language-select", "fr");

  await expect(page.getByText("Publier l'application")).toBeVisible();
});