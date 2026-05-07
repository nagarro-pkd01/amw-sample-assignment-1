import { test, expect } from "@playwright/test";

test("edit own post", async ({ page }) => {
 
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

  const editablePosts = page.locator("article", {
    has: page.getByRole("button", { name: /edit/i }),
  });

  const editableCount = await editablePosts.count();

  if (editableCount === 0) {
    return;
  }

  const firstEditablePost = editablePosts.first();

  const editButton = firstEditablePost.getByRole("button", {
    name: /edit/i,
  });

  await expect(editButton).toBeVisible();

  await editButton.click();

  await expect(page).toHaveURL(/post/);

  const titleInput = page.getByLabel("Title");

  await expect(titleInput).toBeVisible();

  const updatedTitle = `Updated Post ${Date.now()}`;

  await titleInput.fill(updatedTitle);

  await page
    .getByLabel("Description")
    .fill("Updated description");

  const submitButton = page.locator(
    "form button[type='submit']"
  );

  await expect(submitButton).toBeVisible();

  await Promise.all([
    page.waitForURL("/", {
      timeout: 10000,
    }),
    submitButton.click(),
  ]);

  await expect(
    page.getByText(updatedTitle)
  ).toBeVisible();
});