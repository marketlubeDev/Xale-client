import { DragIcon } from '../../utilities/icons';

interface DraggableItemProps {
  label: string;
  badgeNumber?: number;
  className?: string;
}

export function DraggableItem({
  label,
  badgeNumber,
  className = '',
}: DraggableItemProps) {
  return (
    <div
      className={`bg-white border border-[var(--color-border-primary)] box-border content-stretch flex gap-[8px] items-center overflow-clip px-[8px] py-[10px] relative rounded-[12px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.04)] w-full ${className}`}

    >
      {/* Drag Handle */}
      <div className="overflow-clip relative shrink-0 size-[24px] cursor-grab active:cursor-grabbing">
        <DragIcon size={24} color="var(--color-black-10)" />
      </div>

      {/* Badge */}
      {badgeNumber !== undefined && (
        <div
          className="bg-[#c1e1d5] relative rounded-full shrink-0 size-[24px] flex items-center justify-center"
        >
          <p className="text-b4-med text-[var(--color-black-10)] text-center tracking-[-0.24px]">
            {badgeNumber}
          </p>
        </div>
      )}

      {/* Label */}
      <p
        className="text-b4 text-[var(--color-text-primary)] text-center text-nowrap tracking-[-0.56px] whitespace-pre shrink-0"
      >
        {label}
      </p>
    </div>
  );
}

export default DraggableItem;

