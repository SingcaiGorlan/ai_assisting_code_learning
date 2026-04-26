import { test, expect } from '@playwright/test';

test('docs homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/AI/);
});
