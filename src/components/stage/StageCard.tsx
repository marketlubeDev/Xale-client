interface StageCardProps {
  title: string;
  statusCount: number;
  subStatusCount: number;
  className?: string;
}

export function StageCard({
  title,
  statusCount,
  subStatusCount,
  className = '',
}: StageCardProps) {
  return (
    <div className={`flex flex-col gap-[6px] items-start justify-center ${className}`}>
      {/* Title */}
      <p className="text-h2 text-[var(--color-black-10)] text-center whitespace-pre shrink-0">
        {title}
      </p>
      
      {/* Metadata Row */}
      <div className="flex gap-[8px] items-center justify-center shrink-0">
        <p className="text-b4 text-[var(--color-black-6)] text-center whitespace-pre shrink-0">
          {statusCount} {statusCount === 1 ? 'Status' : 'Statuses'}
        </p>
        
        {/* Separator Dot */}
        <div className="w-[4px] h-[4px] bg-[var(--color-black-4)] rounded-full shrink-0" />
        
        <p className="text-b4 text-[var(--color-black-6)] text-center whitespace-pre shrink-0">
          {subStatusCount} Sub-{subStatusCount === 1 ? 'status' : 'statuses'}
        </p>
      </div>
    </div>
  );
}

export default StageCard;

