interface ToggleProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Toggle({
  checked,
  onChange,
  disabled = false,
  className = '',
}: ToggleProps) {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={handleClick}
      className={`relative h-[20px] w-[32px] shrink-0 rounded-full transition-colors ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      style={{
        backgroundColor: checked ? 'var(--color-toggle-active)' : 'var(--color-toggle-inactive)',
      }}
    >
      {/* Toggle Circle */}
      <div
        className="absolute top-[4px] h-[12px] w-[12px] bg-white rounded-full transition-all"
        style={{
          left: checked ? '16px' : '4px',
        }}
      />
    </button>
  );
}

export default Toggle;

