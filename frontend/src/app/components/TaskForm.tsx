import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Task } from '@/types/task';
import { TASK_COLORS } from '@/constants/colors';

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: { title: string; color: string }) => Promise<void>;
}

export default function TaskForm({ task, onSubmit }: TaskFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(task?.title || '');
  const [color, setColor] = useState(task?.color || TASK_COLORS[0].value);
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
        <button
          onClick={() => router.back()}
          className="text-white hover:text-gray-300 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="text-2xl font-semibold text-white">{task ? 'Edit Task' : 'Create Task'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-[#3B82F6] mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isSubmitting}
            placeholder="Ex. Brush your teeth"
            className="w-full px-4 py-3 bg-[#1E1E1E] text-white border-none rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:outline-none placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block text-[#3B82F6] mb-2">
            Color
          </label>
          <div className="flex gap-2">
            {TASK_COLORS.map((colorOption) => (
              <button
                key={colorOption.value}
                type="button"
                onClick={() => setColor(colorOption.value)}
                disabled={isSubmitting}
                className={`w-8 h-8 rounded-full transition-all relative ${
                  color === colorOption.value ? 'ring-2 ring-white ring-offset-2 ring-offset-[#121212]' : ''
                }`}
                style={{ backgroundColor: colorOption.value }}
                title={colorOption.label}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#3B82F6] text-white py-3 px-4 rounded-lg hover:bg-[#2563EB] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : task ? 'Save' : 'Add Task'}
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