import { DragIcon, DeleteIcon } from '../../utilities/icons';

interface SubStatus {
  id: string | number;
  name: string;
}

interface StatusCardConfig {
  statusTitle: string;
  statusName: string;
  subStatuses?: SubStatus[];
  onStatusNameChange?: (value: string) => void;
  onSubStatusNameChange?: (id: string | number, value: string) => void;
  onDeleteStatus?: () => void;
  onDeleteSubStatus?: (id: string | number) => void;
  className?: string;
}

interface StatusCardProps {
  config: StatusCardConfig;
}

export function StatusCard({ config }: StatusCardProps) {
  const {
    statusTitle,
    statusName,
    subStatuses = [],
    onStatusNameChange,
    onSubStatusNameChange,
    onDeleteStatus,
    onDeleteSubStatus,
    className = '',
  } = config;
  return (
    <div className={`bg-white flex flex-col gap-[12px] items-start p-[12px] rounded-[16px] ${className}`}>
      {/* Status Header */}
      <div className="flex gap-[8px] items-center w-full">
        <div className="shrink-0 cursor-grab active:cursor-grabbing">
          <DragIcon size={24} color="var(--color-black-7)" />
        </div>
        <p className="text-b2-med text-[var(--color-text-primary)] tracking-[-0.32px] flex-1">
          {statusTitle}
        </p>
      </div>

      {/* Status Name Input */}
      <div className="flex gap-[8px] items-start w-full">
        <div className="flex-1 bg-[var(--color-bg-input-field)] border border-[var(--color-border-input)] h-[40px] rounded-[12px]">
          <input
            type="text"
            value={statusName}
            onChange={(e) => onStatusNameChange?.(e.target.value)}
            placeholder="Status name"
            className="text-b4 text-[var(--color-text-secondary)] w-full h-full px-[12px] py-[12px] rounded-[inherit] bg-transparent outline-none placeholder:text-[var(--color-text-secondary)]"
          />
        </div>
        <button
          onClick={onDeleteStatus}
          className="flex items-center justify-center size-[40px] rounded-[12px] shrink-0 hover:bg-[var(--color-bg-hover)] transition-colors"
        >
          <DeleteIcon size={18} color="var(--color-error)" />
        </button>
      </div>

      {/* Sub-statuses */}
      {subStatuses.map((subStatus) => (
        <div key={subStatus.id} className="flex gap-[6px] items-center w-full">
          <div className="shrink-0 cursor-grab active:cursor-grabbing">
            <DragIcon size={24} color="var(--color-black-7)" />
          </div>
          <div className="flex-1 bg-[var(--color-bg-input-field)] border border-[var(--color-border-input)] h-[40px] rounded-[12px]">
            <input
              type="text"
              value={subStatus.name}
              onChange={(e) => onSubStatusNameChange?.(subStatus.id, e.target.value)}
              placeholder="Sub status name"
              className="text-b4 text-[var(--color-text-secondary)] w-full h-full px-[12px] py-[12px] rounded-[inherit] bg-transparent outline-none placeholder:text-[var(--color-text-secondary)]"
            />
          </div>
          <button
            onClick={() => onDeleteSubStatus?.(subStatus.id)}
            className="flex items-center justify-center size-[40px] rounded-[12px] shrink-0 hover:bg-[var(--color-bg-hover)] transition-colors"
          >
            <DeleteIcon size={18} color="var(--color-error)" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default StatusCard;

