import { test, expect } from '@playwright/test';

interface Task {
  id: number;
  title: string;
  color: string;
}

test.describe('Task Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should edit an existing task', async ({ page }) => {
    await page.getByRole('button', { name: 'Create Task' }).click();
    await page.fill('input[id="title"]', 'Task to Edit');
    await page.click('text=Add Task');

    await page.getByText('Task to Edit').click();
    await page.fill('input[id="title"]', 'Edited Task');
    await page.click('text=Save');

    await expect(page.getByText('Edited Task')).toBeVisible();

    const response = await page.request.get('http://localhost:3001/tasks');
    const tasks = (await response.json()) as Task[];
    const editedTask = tasks.find(task => task.title === 'Edited Task');
    if (editedTask) {
      await page.request.delete(`http://localhost:3001/tasks/${editedTask.id}`);
    }
  });

  test('should delete an existing task', async ({ page }) => {
    await page.getByRole('button', { name: 'Create Task' }).click();
    await page.fill('input[id="title"]', 'Task to Delete');
    await page.click('text=Add Task');

    page.on('dialog', dialog => dialog.accept());

    const taskRow = page.getByText('Task to Delete').locator('..').locator('..');
    await taskRow.hover();
    await taskRow.getByRole('button').click();

    await expect(page.getByText('Task to Delete')).not.toBeVisible();
  });

  test('should update task color', async ({ page }) => {
    await page.getByRole('button', { name: 'Create Task' }).click();
    await page.fill('input[id="title"]', 'Color Test Task');
    await page.click('button[title="Blue"]');
    await page.click('text=Add Task');

    await page.getByText('Color Test Task').click();
    await page.click('button[title="Red"]');
    await page.click('text=Save');

    const response = await page.request.get('http://localhost:3001/tasks');
    const tasks = (await response.json()) as Task[];
    const colorTask = tasks.find(task => task.title === 'Color Test Task');
    if (colorTask) {
      await page.request.delete(`http://localhost:3001/tasks/${colorTask.id}`);
    }
  });
}); 