interface TaskInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function TaskInput({ value, onChange, disabled }: TaskInputProps) {
  return (
    <div>
      <label htmlFor="title" className="block text-[#3B82F6] mb-2">
        Title
      </label>
      <input
        type="text"
        id="title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        disabled={disabled}
        placeholder="Ex. Brush your teeth"
        className="w-full px-4 py-3 bg-[#1E1E1E] text-white border-none rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:outline-none placeholder-gray-500"
      />
    </div>
  );
} 