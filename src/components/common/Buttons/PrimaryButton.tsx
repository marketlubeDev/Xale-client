import React, { useState } from 'react';

interface PrimaryButtonProps {
  title: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
}



export function PrimaryButton({
  title,
  onClick,
  className = '',
  disabled = false,
  icon,
}: PrimaryButtonProps) {   

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const baseStyle = {
    borderRadius: '12px',
    borderTop: 'none',
    borderRight: '0.5px solid #218760',
    borderBottom: '0.9px solid #218760',
    borderLeft: '0.5px solid #218760',
    background: 'radial-gradient(239.95% 185.59% at 63.38% -7.95%, #319B72 0%, #102F23 33.08%, #319B72 97.6%)',
    boxShadow: '0 1px 1px 0 rgba(5, 25, 18, 0.20)',
  };

  const hoverStyle = {
    borderRight: '1px solid #218760',
    borderBottom: '1.25px solid #218760',
    borderLeft: '1px solid #218760',
    background: 'radial-gradient(239.95% 185.59% at 63.38% -7.95%, #319B72 7.52%, #102F23 42.43%, #319B72 97.6%)',
    boxShadow: '0 3px 4px 0 rgba(5, 25, 18, 0.25)',
  };

  const currentStyle = !disabled && isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={currentStyle}
      className={`flex items-center justify-center ${icon ? 'gap-[6px] pl-4 pr-6' : 'px-6'} py-2.5 text-white font-medium text-base leading-normal tracking-[-0.32px] transition-all min-w-[140px] overflow-hidden ${
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






