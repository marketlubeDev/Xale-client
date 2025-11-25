import { useState } from 'react';

interface SecondaryButtonProps {
  title: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
  textColor?: string;
}

export function SecondaryButton({
  title,
  onClick,
  className = '',
  disabled = false,
  icon,
  textColor = 'var(--color-error)',
}: SecondaryButtonProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const baseStyle = {
    borderRadius: '12px',
    background: 'transparent',
    color: textColor,
  };

  const hoverStyle = {
    boxShadow: '0 3px 4px 0 rgba(5, 25, 18, 0.15)',
  };

  const currentStyle = !disabled && isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={currentStyle}
      className={`flex items-center justify-center ${icon ? 'gap-[6px] pl-4 pr-6' : 'px-6'} py-2.5 font-medium text-base leading-normal tracking-[-0.32px] transition-all min-w-[140px] overflow-hidden ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
    >
      {icon && <span className="shrink-0 w-6 h-6 flex items-center justify-center">{icon}</span>}
      <span className="truncate min-w-0">{title}</span>
    </button>
  );
}

export default SecondaryButton;