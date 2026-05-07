import { test, expect } from "@playwright/test";

test("view posts anonymously", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("language", "en");
  });
  await page.goto("/");

  await page.waitForLoadState("networkidle");
  const posts = page.locator("article");

  const postCount = await posts.count();
  if (postCount > 0) {
    await expect(posts.first()).toBeVisible();
  }
  else {
    await expect(
      page.getByText(/no posts yet/i)
    ).toBeVisible();

    await expect(
      page.getByText(/create the first post/i)
    ).toBeVisible();
  }
  await expect(
    page.getByRole("button", { name: /login/i }).first()
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: /signup/i }).first()
  ).toBeVisible();
});