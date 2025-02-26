import { RequestHandler } from 'express';
import { TaskService } from '../services/task.service';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  getAllTasks: RequestHandler = async (req, res) => {
    try {
      const tasks = await this.taskService.findAll();
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }

  getTaskById: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const task = await this.taskService.findById(id);
      
      if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
      
      res.json(task);
    } catch (error) {
      console.error('Error fetching task:', error);
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  }

  createTask: RequestHandler = async (req, res) => {
    try {
      const { title, color } = req.body;
      const task = await this.taskService.create({ title, color });
      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Failed to create task' });
    }
  }

  updateTask: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { title, color, completed } = req.body;
      const task = await this.taskService.update(id, { title, color, completed });
      res.json(task);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Failed to update task' });
    }
  }

  deleteTask: RequestHandler = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await this.taskService.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }
} 