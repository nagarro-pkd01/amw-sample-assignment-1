import { Page } from "@playwright/test";

export async function signupAndLogin(page: Page) {
  const username = `user_${Date.now()}`;

  await page.goto("/signup");

  await page.getByLabel(/username/i).fill(username);

  await page.getByLabel(/password/i).fill("password123");

  await page
    .locator("form")
    .getByRole("button", { name: /signup/i })
    .click();

  return username;
}