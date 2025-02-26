'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import TaskForm from '../../components/TaskForm/index';
import Layout from '../../components/Layout';
import { useTasks } from '@/contexts/TaskContext';
import { useQuery } from '@tanstack/react-query';
import { TaskService } from '@/services/task.service';

const taskService = new TaskService();

export default function EditTask({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const taskId = parseInt(resolvedParams.id);

  const { data: task, isLoading, error } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      try {
        const task = await taskService.getTaskById(taskId);
        if (!task) {
          throw new Error('Task not found');
        }
        return task;
      } catch (error) {
        if (error instanceof Response && error.status === 404) {
          throw new Error('Task not found');
        }
        throw error;
      }
    }
  });

  const { updateTask } = useTasks();

  const handleSubmit = async (data: { title: string; color: string }) => {
    try {
      await updateTask({ id: taskId, data });
      router.push('/');
    } catch (error) {
      throw error;
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center">
          <p className="text-[#666666]">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!task) {
    return (
      <Layout>
        <div className="flex items-center justify-center">
          <p className="text-[#666666]">Task not found</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center">
          <p className="text-[#666666]">{error instanceof Error ? error.message : 'Task not found'}</p>
        </div>
      </Layout>
    );
  }

  

  return (
    <Layout>
      <TaskForm mode="edit" initialData={task} onSubmit={handleSubmit} />
    </Layout>
  );
} 