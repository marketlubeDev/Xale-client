interface IconButtonConfig {
  icon: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

interface IconButtonProps {
  config: IconButtonConfig;
}

export function IconButton({ config }: IconButtonProps) {
  const {
    icon,
    onClick,
    active = false,
    disabled = false,
    className = '',
  } = config;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`border border-[var(--color-border-primary)] flex gap-[8px] items-center justify-center p-[6px] rounded-[8px] w-[40px] h-[40px] shrink-0 transition-colors ${
        active ? 'bg-[var(--color-bg-hover)] border-[var(--color-border-accent)]' : 'bg-transparent'
      } ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[var(--color-bg-hover)]'
      } ${className}`}
    >
      <div className="w-[20px] h-[20px] shrink-0 flex items-center justify-center">
        {icon}
      </div>
    </button>
  );
}

export default IconButton;

