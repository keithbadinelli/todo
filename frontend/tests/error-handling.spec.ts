import { test, expect } from '@playwright/test';

test.describe('Error Handling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should handle network errors gracefully', async ({ page }) => {
    await page.route('**/tasks', route => {
      if (route.request().method() === 'GET') {
        route.abort();
      } else {
        route.continue();
      }
    });

    await expect(page.getByText('You don\'t have any tasks registered yet.')).toBeVisible();
    await expect(page.getByText('Create tasks and organize your to-do items.')).toBeVisible();

    await page.unroute('**/tasks');
  });

  test('should handle invalid task ID', async ({ page }) => {
    await page.route('**/tasks/999999', route => {
      route.fulfill({
        status: 404,
        body: JSON.stringify({ error: 'Task not found' })
      });
    });

    await page.goto('http://localhost:3000/edit/999999');

    await expect(page.getByText('Task not found')).toBeVisible();

    await page.unroute('**/tasks/999999');
  });
}); 