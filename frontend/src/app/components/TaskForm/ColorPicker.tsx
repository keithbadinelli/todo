import { TASK_COLORS } from '@/constants/colors';

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  disabled?: boolean;
}

export default function ColorPicker({ selectedColor, onColorSelect, disabled }: ColorPickerProps) {
  return (
    <div>
      <label className="block text-[#3B82F6] mb-2">
        Color
      </label>
      <div className="flex gap-2">
        {TASK_COLORS.map((colorOption) => (
          <button
            key={colorOption.value}
            type="button"
            onClick={() => onColorSelect(colorOption.value)}
            disabled={disabled}
            className={`w-8 h-8 rounded-full transition-all relative ${
              selectedColor === colorOption.value ? 'ring-2 ring-white ring-offset-2 ring-offset-[#121212]' : ''
            }`}
            style={{ backgroundColor: colorOption.value }}
            title={colorOption.label}
          />
        ))}
      </div>
    </div>
  );
} 