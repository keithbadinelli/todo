import { PrismaClient } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from '../interfaces/task.interface';

export class TaskService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll() {
    return this.prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async findById(id: number) {
    return this.prisma.task.findUnique({
      where: { id }
    });
  }

  async create(data: CreateTaskDto) {
    return this.prisma.task.create({
      data
    });
  }

  async update(id: number, data: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data
    });
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: { id }
    });
  }
} 