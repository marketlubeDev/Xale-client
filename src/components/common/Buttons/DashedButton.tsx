import React from 'react';

interface DashedButtonConfig {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  iconColor?: string;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

interface DashedButtonProps {
  config: DashedButtonConfig;
}

export function DashedButton({ config }: DashedButtonProps) {
  const {
    label,
    icon,
    onClick,
    backgroundColor,
    borderColor = '#5aaf8e',
    textColor = 'var(--color-black-10)',
    iconColor = 'var(--color-black-10)',
    className = '',
    disabled = false,
    fullWidth = true,
  } = config;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`border border-dashed rounded-[12px] flex gap-[8px] items-center justify-center px-[24px] py-[10px] transition-opacity ${
        fullWidth ? 'w-full' : ''
      } ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'
      } ${className}`}
      style={{
        backgroundColor,
        borderColor,
        color: textColor,
      }}
    >
      {icon && (
        <div className="shrink-0">
          {React.isValidElement(icon) && typeof icon.type !== 'string'
            ? (() => {
                const iconElement = icon as React.ReactElement<{ size?: number; color?: string }>;
                const existingSize = iconElement.props?.size;
                return React.cloneElement(iconElement, { 
                  color: iconColor,
                  size: existingSize || 24
                });
              })()
            : icon}
        </div>
      )}
      <p className="text-b2-med tracking-[-0.32px] whitespace-nowrap" style={{ color: textColor }}>
        {label}
      </p>
    </button>
  );
}

export default DashedButton;

