interface StageSummaryCardProps {
  stageNumber: number;
  title: string;
  statusCount: number;
  subStatusCount: number;
  className?: string;
}

export function StageSummaryCard({
  stageNumber,
  title,
  statusCount,
  subStatusCount,
  className = '',
}: StageSummaryCardProps) {
  return (
    <div
      className={`bg-white box-border content-stretch flex gap-[12px] items-start overflow-clip px-[16px] py-[18px] relative rounded-[16px] shadow-[0px_6px_10px_0px_rgba(30,48,42,0.03)] w-full ${className}`}
      data-node-id="269:46174"
    >
      {/* Badge */}
      <div
        className="bg-[var(--color-border-card-active)] box-border content-stretch flex flex-col gap-[8px] items-center justify-center overflow-clip px-[3px] py-0 relative rounded-[24px] shrink-0 size-[28px]"
        data-name="draggable"
        data-node-id="269:46176"
      >
        <p className="text-b4 text-black text-center tracking-[-0.56px] w-full">
          {stageNumber}
        </p>
      </div>

      {/* Content */}
      <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-node-id="269:46178">
        {/* Title */}
        <p
          className="text-b2-med text-[var(--color-black-10)] text-center text-nowrap tracking-[-0.32px] whitespace-pre shrink-0"
          data-node-id="269:46179"
        >
          {title}
        </p>

        {/* Metadata */}
        <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-node-id="269:46180">
          <p className="text-b4 text-[var(--color-black-6)] text-center text-nowrap tracking-[-0.56px] whitespace-pre shrink-0" data-node-id="269:46181">
            {statusCount} {statusCount === 1 ? 'Status' : 'Statuses'}
          </p>
          
          {/* Separator Dot */}
          <div className="relative shrink-0 size-[4px]" data-node-id="269:46182">
            <div className="w-full h-full bg-[var(--color-black-4)] rounded-full" />
          </div>
          
          <p className="text-b4 text-[var(--color-black-6)] text-center text-nowrap tracking-[-0.56px] whitespace-pre shrink-0" data-node-id="269:46183">
            {subStatusCount} Sub-{subStatusCount === 1 ? 'status' : 'statuses'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StageSummaryCard;

