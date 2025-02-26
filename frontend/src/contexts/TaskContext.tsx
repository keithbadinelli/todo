'use client';

import { createContext, useContext } from 'react';
import { Task } from '@/types/task';
import { useTaskQueries } from '@/hooks/useTaskQueries';

interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  error: Error | null;
  toggleTaskComplete: (data: { id: number; completed: boolean }) => void;
  deleteTask: (id: number) => void;
  createTask: (data: { title: string; color: string }) => void;
  updateTask: (params: { id: number; data: { title: string; color: string } }) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const taskQueries = useTaskQueries();

  return (
    <TaskContext.Provider value={taskQueries}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
} 