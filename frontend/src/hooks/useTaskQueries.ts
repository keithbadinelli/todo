import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TaskService } from '@/services/task.service';

const taskService = new TaskService();

export const useTaskQueries = () => {
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => taskService.getAllTasks(),
  });

  const { mutate: toggleTaskComplete } = useMutation({
    mutationFn: async ({ id, completed }: { id: number; completed: boolean }) =>
      taskService.updateTask(id, { completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const { mutate: deleteTask } = useMutation({
    mutationFn: (id: number) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const { mutate: createTask } = useMutation({
    mutationFn: (data: { title: string; color: string }) => taskService.createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const { mutate: updateTask } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { title: string; color: string } }) =>
      taskService.updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    tasks,
    isLoading,
    error: error as Error | null,
    toggleTaskComplete,
    deleteTask,
    createTask,
    updateTask,
  };
}; 