import { test, expect } from '@playwright/test';

interface Task {
  id: number;
  title: string;
  color: string;
}

test.describe('Task Creation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should create a new task', async ({ page }) => {
    // Click the create task button
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Fill in the task details
    await page.fill('input[id="title"]', 'Test Task');
    await page.click('button[title="Blue"]'); // Select blue color

    // Submit the form
    await page.click('text=Add Task');

    // Verify task was created
    await expect(page.getByText('Test Task')).toBeVisible();

    // Clean up: Delete the created task
    const response = await page.request.get('http://localhost:3001/tasks');
    const tasks = (await response.json()) as Task[];
    const createdTask = tasks.find(task => task.title === 'Test Task');
    if (createdTask) {
      await page.request.delete(`http://localhost:3001/tasks/${createdTask.id}`);
    }
  });

  test('should show validation error for empty title', async ({ page }) => {
    await page.getByRole('button', { name: 'Create Task' }).click();
    await page.click('text=Add Task');

    // HTML5 validation message should be shown
    const input = page.locator('input[id="title"]');
    await expect(input).toHaveAttribute('required', '');
    const validationMessage = await input.evaluate((e: HTMLInputElement) => e.validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('should navigate back to home on cancel', async ({ page }) => {
    await page.getByRole('button', { name: 'Create Task' }).click();
    await page.click('button >> visible=true'); // Click the back button

    // Verify we're back on the home page
    await expect(page.getByRole('button', { name: 'Create Task' })).toBeVisible();
  });
}); 