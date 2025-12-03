type StatusBadgeType = 'warning' | 'verified' | 'feature';

interface StatusBadge {
  label: string;
  type: StatusBadgeType;
}

export interface StageData {
  stageNumber: number;
  title: string;
  statusCount: number;
  subStatusCount: number;
  badges?: StatusBadge[];
}

interface StageSummaryCardActiveProps {
  stage: StageData;
  className?: string;
}

const BADGE_STYLES: Record<StatusBadgeType, { bg: string; text: string }> = {
  warning: {
    bg: '#ffd5c0',
    text: '#682f12',
  },
  verified: {
    bg: '#c0eaff',
    text: '#124b68',
  },
  feature: {
    bg: '#cac0ff',
    text: '#351a75',
  },
};

export function StageSummaryCardActive({
  stage,
  className = '',
}: StageSummaryCardActiveProps) {
  const {
    stageNumber,
    title,
    statusCount,
    subStatusCount,
    badges = [],
  } = stage;

  return (
    <div
      className={`bg-[var(--color-border-card-active)] box-border content-stretch flex gap-[12px] items-start overflow-clip px-[16px] py-[18px] relative rounded-[16px] shadow-[0px_6px_10px_0px_rgba(30,48,42,0.03)] w-full ${className}`}
      data-name="Application"
      data-node-id="1289:105465"
    >
      {/* Badge */}
      <div
        className="bg-[rgba(255,255,255,0.8)] box-border content-stretch flex flex-col gap-[8px] items-center justify-center overflow-clip px-[3px] py-0 relative rounded-[24px] shrink-0 size-[28px]"
        data-name="draggable"
        data-node-id="1289:105467"
      >
        <p className="text-b4 text-black text-center tracking-[-0.56px] w-full" data-node-id="1289:105468">
          {stageNumber}
        </p>
      </div>

      {/* Content */}
      <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start justify-center min-h-px min-w-px relative shrink-0" data-node-id="1289:105469">
        {/* Title Row with Badges */}
        <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-node-id="1289:105470">
          <p
            className="text-b2-med text-[var(--color-black-10)] text-center text-nowrap tracking-[-0.32px] whitespace-pre shrink-0"
            data-node-id="1289:105471"
          >
            {title}
          </p>
          
          {/* Status Badges */}
          {badges.length > 0 && (
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="1289:105472">
              {badges.map((badge, index) => {
                const style = BADGE_STYLES[badge.type];
                return (
                  <div
                    key={index}
                    className="box-border content-stretch flex gap-[2px] h-[20px] items-center justify-center overflow-clip px-[8px] py-[2px] relative rounded-full shrink-0"
                    style={{ backgroundColor: style.bg }}
                    data-name="Badge [1.0]"
                    data-node-id={index === 0 ? '1289:105473' : index === 1 ? '1289:105474' : '1289:105475'}
                  >
                    <p
                      className="text-[12px] text-nowrap tracking-[-0.24px] whitespace-pre shrink-0"
                      style={{ color: style.text }}
                      data-node-id={`I${index === 0 ? '1289:105473' : index === 1 ? '1289:105474' : '1289:105475'};119:${index === 0 ? '2408' : index === 1 ? '2610' : '2606'}`}
                    >
                      {badge.label}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-node-id="1289:105476">
          <p className="text-b4 text-[var(--color-black-6)] text-center text-nowrap tracking-[-0.56px] whitespace-pre shrink-0" data-node-id="1289:105477">
            {statusCount} {statusCount === 1 ? 'Status' : 'Statuses'}
          </p>
          
          {/* Separator Dot */}
          <div className="relative shrink-0 size-[4px]" data-node-id="1289:105478">
            <div className="w-full h-full bg-[var(--color-black-4)] rounded-full" />
          </div>
          
          <p className="text-b4 text-[var(--color-black-6)] text-center text-nowrap tracking-[-0.56px] whitespace-pre shrink-0" data-node-id="1289:105479">
            {subStatusCount} Sub-{subStatusCount === 1 ? 'status' : 'statuses'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StageSummaryCardActive;

