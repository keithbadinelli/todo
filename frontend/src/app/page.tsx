'use client';

import { useRouter } from 'next/navigation';
import TaskCard from './components/TaskCard';
import Layout from './components/Layout';
import { useTasks } from '@/contexts/TaskContext';

export default function Home() {
  const router = useRouter();
  const { tasks, isLoading: loading, error, toggleTaskComplete, deleteTask } = useTasks();

  return (
    <Layout>
      <button
        onClick={() => router.push('/create')}
        className="w-full bg-[#3B82F6] text-white py-3 px-4 rounded-lg mb-8 -mt-14 hover:bg-[#2563EB] transition-colors flex items-center justify-center gap-2"
      >
        Create Task
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 10H15M10 15V5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-[#4EA8DE]">Tasks</span>
          <span className="bg-[#1E1E1E] text-white text-sm px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#8B5CF6]">Completed</span>
          <span className="bg-[#1E1E1E] text-white text-sm px-2 py-0.5 rounded-full">
            {tasks.filter(task => task.completed).length}
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg mb-6">
          {error.message}
        </div>
      )}

      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={toggleTaskComplete}
            onDelete={deleteTask}
          />
        ))}
        {tasks.length === 0 && !error && !loading && (
          <div className="text-center py-12">
            <svg className="mx-auto mb-4" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M44 22V34C44 42 42 44 34 44H14C6 44 4 42 4 34V14C4 6 6 4 14 4H17C20 4 20.66 4.88 21.8 6.4L24.8 10.4C25.56 11.4 26 12 28 12H34C42 12 44 14 44 22Z" stroke="#666666" strokeWidth="3" strokeMiterlimit="10"/>
            </svg>
            <p className="text-[#666666] text-lg mb-2">You don&apos;t have any tasks registered yet.</p>
            <p className="text-[#666666]">Create tasks and organize your to-do items.</p>
          </div>
        )}
        {loading && (
          <div className="text-center py-12">
            <p className="text-[#666666]">Loading tasks...</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
