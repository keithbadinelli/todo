export const TASK_COLORS = [
  { label: 'Red', value: '#F87171' },
  { label: 'Orange', value: '#FB923C' },
  { label: 'Yellow', value: '#FACC15' },
  { label: 'Green', value: '#4ADE80' },
  { label: 'Blue', value: '#3B82F6' },
  { label: 'Indigo', value: '#6366F1' },
  { label: 'Purple', value: '#A855F7' },
  { label: 'Pink', value: '#EC4899' },
  { label: 'Brown', value: '#92400E' },
] as const;

export type TaskColor = typeof TASK_COLORS[number]['value']; 