'use client';

import { useState } from 'react';
import TaskForm from '../components/TaskForm/index';
import Layout from '../components/Layout';
import { useTasks } from '@/contexts/TaskContext';

export default function CreateTask() {
  const [error, setError] = useState<string | null>(null);
  const { createTask } = useTasks();

  const handleSubmit = async (data: { title: string; color: string }) => {
    try {
      createTask(data);
    } catch (error) {
      console.error('Failed to create task:', error);
      setError('Failed to create task. Please try again.');
      throw error;
    }
  };

  return (
    <Layout>
      {error && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-900/20 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      <TaskForm mode="create" onSubmit={handleSubmit} />
    </Layout>
  );
} 