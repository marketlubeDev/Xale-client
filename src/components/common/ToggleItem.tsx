import Toggle from './Toggle';

interface ToggleItemProps {
  title: string;
  description: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function ToggleItem({
  title,
  description,
  checked,
  onChange,
  disabled = false,
  className = '',
}: ToggleItemProps) {
  return (
    <div
      className={`flex gap-[12px] items-start w-full ${
        disabled ? 'opacity-40' : ''
      } ${className}`}
    >
      <Toggle checked={checked} onChange={onChange} disabled={disabled} />
      <div className="flex flex-col gap-[4px] items-start flex-1">
        <p className="text-b4-med text-[var(--color-black-10)] tracking-[-0.56px] whitespace-pre text-center">
          {title}
        </p>
        <p className="text-b4 text-[var(--color-black-6)] tracking-[-0.56px] leading-[1.35]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ToggleItem;

