import { Task } from '@/types/task';
import { useRouter } from 'next/navigation';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (data: { id: number; completed: boolean }) => void;
  onDelete: (id: number) => void;
}

export default function TaskCard({ task, onToggleComplete, onDelete }: TaskCardProps) {
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleComplete({ id: task.id, completed: !task.completed });
  };

  return (
    <div
      className="bg-[#1E1E1E] rounded-lg p-4 flex items-center justify-between group hover:bg-[#2A2A2A] transition-all cursor-pointer"
      onClick={() => router.push(`/edit/${task.id}`)}
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer"
          style={{ 
            borderColor: task.color,
            backgroundColor: task.completed ? task.color : 'transparent'
          }}
          onClick={handleToggle}
        >
          {task.completed && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <span className={`text-base ${task.completed ? 'text-[#666666] line-through' : 'text-white'}`}>
          {task.title}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
} 