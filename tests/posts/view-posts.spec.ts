import { test, expect } from "@playwright/test";

test("view posts anonymously", async ({ page }) => {
  await page.goto("/");

  const posts = page.locator("article");

  const count = await posts.count();

  if (count > 0) {
    await expect(posts.first()).toBeVisible();
  } else {
    await expect(
      page.getByText(/no posts yet/i)
    ).toBeVisible();
  }
});