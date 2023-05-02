import { expect, test } from '@playwright/test';

test('about page has expected h1', async ({ page }) => {
  await page.goto('/sign-in');
  await expect(page.getByTestId('login-layout')).toBeVisible();
});
