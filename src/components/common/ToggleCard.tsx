import { useState } from 'react';
import Toggle from './Toggle';

interface ToggleCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  infoTooltip?: string;
}

export function ToggleCard({
  icon,
  title,
  description,
  checked,
  onChange,
  disabled = false,
  className = '',
  infoTooltip,
}: ToggleCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

    return (
      <div
        className={`bg-white border border-[var(--color-border-card)] flex flex-col gap-[8px] items-start p-[12px] rounded-[14px] ${
          checked ? 'border-[var(--color-border-card-active)]' : 'border-[var(--color-border-card)]'
        } ${className}`}
      >

      <div className="flex gap-[8px] items-center w-full">

        {icon && (
          <div
            className="relative shrink-0 w-[36px] h-[36px] rounded-full flex items-center justify-center"
            style={{
              background: 'var(--gradient-icon)',
            }}
          >
            {icon}
          </div>
        )}

        <div className="flex gap-[4px] items-center flex-1 min-w-0">
          <p className="text-b4-med text-[var(--color-black-10)] tracking-[-0.56px]">
            {title}
          </p>
          {infoTooltip && (
            <div className="relative">
              <button
                type="button"
                className="w-[20px] h-[20px] flex items-center justify-center cursor-pointer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <div className="w-[12px] h-[12px] rounded-full bg-[var(--color-black-4)] flex items-center justify-center">
                  <span className="text-white text-[8px] font-medium">i</span>
                </div>
              </button>
              {showTooltip && (
                <div className="absolute left-[20px] bottom-[10px] bg-[var(--color-bg-tooltip)] border border-[var(--color-bg-tooltip)] rounded-lg p-[6px] whitespace-nowrap z-10 shadow-sm">
                  <p className="text-b5 text-[var(--color-text-tooltip)]">{infoTooltip}</p>
                </div>
              )}
            </div>
          )}
        </div>


        <Toggle checked={checked} onChange={onChange} disabled={disabled} />
      </div>

      <p className="text-b5 text-[var(--color-text-secondary)] tracking-[-0.24px] w-full">
        {description}
      </p>
    </div>
  );
}

export default ToggleCard;

