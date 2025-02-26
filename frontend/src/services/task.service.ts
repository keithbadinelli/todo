import { Task } from '@/types/task';

export class TaskService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server did not return JSON');
    }
    return response.json();
  }

  async getAllTasks(): Promise<Task[]> {
    const response = await fetch(`${this.apiUrl}/tasks`);
    return this.handleResponse<Task[]>(response);
  }

  async getTaskById(id: number): Promise<Task> {
    const response = await fetch(`${this.apiUrl}/tasks/${id}`);
    return this.handleResponse<Task>(response);
  }

  async createTask(data: { title: string; color: string }): Promise<Task> {
    const response = await fetch(`${this.apiUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return this.handleResponse<Task>(response);
  }

  async updateTask(id: number, data: { title?: string; color?: string; completed?: boolean }): Promise<Task> {
    const response = await fetch(`${this.apiUrl}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return this.handleResponse<Task>(response);
  }

  async deleteTask(id: number): Promise<void> {
    const response = await fetch(`${this.apiUrl}/tasks/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
} 