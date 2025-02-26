import { Page } from '@playwright/test';

export async function cleanupTasks(page: Page) {
  const response = await page.request.get('http://localhost:3001/tasks');
  const tasks = await response.json();
  
  for (const task of tasks) {
    await page.request.delete(`http://localhost:3001/tasks/${task.id}`);
  }
} 