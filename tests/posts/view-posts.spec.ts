import { test, expect } from "@playwright/test";

test("view posts anonymously", async ({ page }) => {
  await page.goto("/");

  const posts = page.locator("article");
  const emptyState = page.getByText(/no posts yet/i);

  await Promise.any([
    posts.first().waitFor({ state: "visible", timeout: 10000 }),
    emptyState.waitFor({ state: "visible", timeout: 10000 }),
  ]);

  if ((await posts.count()) > 0) {
    await expect(posts.first()).toBeVisible();
  } else {
    await expect(emptyState).toBeVisible();
  }
});