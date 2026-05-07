import { test, expect } from "@playwright/test";

test("delete own post", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("language", "en");
  });

  await page.goto("/login");

  await page.getByLabel("Username").fill("123");
  await page.getByLabel("Password").fill("123");

  await page
    .locator("form")
    .getByRole("button", { name: /login/i })
    .click();

  await expect(page).toHaveURL("/");

  await page.waitForLoadState("networkidle");

  const emptyState = page.getByText(/no posts yet/i);

  if (await emptyState.isVisible().catch(() => false)) {
    await expect(emptyState).toBeVisible();
    return;
  }

  const deletablePosts = page.locator("article", {
    has: page.getByRole("button", { name: /delete/i }),
  });

  const deletableCount = await deletablePosts.count();

  if (deletableCount === 0) {
    return;
  }

  const firstOwnPost = deletablePosts.first();

  const title = await firstOwnPost
    .locator("h2")
    .textContent();

  expect(title).toBeTruthy();

  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  const deleteButton = firstOwnPost.getByRole("button", {
    name: /delete/i,
  });

  await expect(deleteButton).toBeVisible();

  await deleteButton.click();

  await page.waitForLoadState("networkidle");

  await expect(
    page.getByText(title as string)
  ).toHaveCount(0);
});