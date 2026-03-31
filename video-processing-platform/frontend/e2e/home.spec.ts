import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display welcome text', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/next\.js/i);
    await expect(page.getByText(/next\.js/i)).toBeVisible();
  });
});
