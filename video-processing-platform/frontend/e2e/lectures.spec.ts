import { test, expect } from '@playwright/test';

test.describe('Lectures Page', () => {
  test('should list lectures', async ({ page }) => {
    await page.goto('/student');
    await expect(page.getByText(/lectures|my lectures|all lectures/i)).toBeVisible();
    // Optionally check for at least one lecture card
    // await expect(page.getByTestId('lecture-card')).toBeVisible();
  });

  test('should search lectures', async ({ page }) => {
    await page.goto('/student');
    const search = page.getByPlaceholder(/search/i);
    await expect(search).toBeVisible();
    await search.fill('math');
    // Optionally trigger search and check results
    // await expect(page.getByText(/math/i)).toBeVisible();
  });
});
