import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Task } from '@/types/task';
import { TASK_COLORS } from '@/constants/colors';
import ColorPicker from './ColorPicker';
import TaskInput from './TaskInput';
import BackButton from '../BackButton';

interface TaskFormProps {
  mode: 'create' | 'edit';
  initialData?: Task;
  onSubmit: (data: { title: string; color: string }) => Promise<void>;
}

export default function TaskForm({ mode, initialData, onSubmit }: TaskFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || '');
  const [color, setColor] = useState(initialData?.color || TASK_COLORS[0].value);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onSubmit({ title, color });
      router.push('/');
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-8">
        <BackButton />
        <h2 className="text-2xl font-semibold text-white">
          {mode === 'create' ? 'Create Task' : 'Edit Task'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TaskInput
          value={title}
          onChange={setTitle}
          disabled={isSubmitting}
        />

        <ColorPicker
          selectedColor={color}
          onColorSelect={setColor}
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#3B82F6] text-white py-3 px-4 rounded-lg hover:bg-[#2563EB] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : mode === 'create' ? 'Add Task' : 'Save'}
          {!isSubmitting && (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16669 10H15.8334M15.8334 10L10 4.16669M15.8334 10L10 15.8334" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
} 