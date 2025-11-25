
interface PageSectionHeaderProps {
  title: string;
  count?: number;
  description?: string;
  className?: string;
}

export function PageSectionHeader({
  title,
  count,
  description,
  className = '',
}: PageSectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-[6px] items-start w-full max-w-[285px] ${className}`}>

      <div className="flex gap-[6px] items-center w-full">
        <h2 className="text-h2 text-[var(--color-black-10)] whitespace-pre shrink-0">
          {title}
        </h2>
        {count && (
          <div className="flex flex-col h-[28px] justify-end font-normal text-[16px] leading-[0] text-[#697571] tracking-[-0.32px] w-[43px] shrink-0">
            <p className="leading-[normal]">({count})</p>
          </div>
        )}
      </div>

      {description && (
        <p className="font-normal text-[14px] leading-[1.35] text-[#697571] tracking-[-0.56px] whitespace-pre shrink-0">
          {description}
        </p>
      )}
    </div>
  );
}

export default PageSectionHeader;

