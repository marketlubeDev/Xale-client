interface PageHeaderProps {
  leftContent: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  leftContent,
  rightContent,
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`flex justify-between items-start pb-5 border-b border-[var(--color-border-input)] ${className}`}>
    
      <div className="flex-shrink-0">
        {leftContent}
      </div>

    
      {rightContent && (
        <div className="flex gap-2 items-center">
          {rightContent}
        </div>
      )}
    </div>
  );
}

export default PageHeader;

