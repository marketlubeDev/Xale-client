interface IconButtonGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: number;
}

export function IconButtonGrid({
  children,
  className = '',
  columns = 6,
}: IconButtonGridProps) {
  // Map columns prop to actual Tailwind classes
  const gridColsClasses: { [key: number]: string } = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };
  
  const gridColsClass = gridColsClasses[columns] || 'grid-cols-6';
  
  return (
    <div className={`bg-gray-50 border border-[var(--color-border-card-active)] rounded-[14px] p-[12px] ${className}`}>
      <div className={`grid ${gridColsClass} gap-[31px] items-start`}>
        {children}
      </div>
    </div>
  );
}

export default IconButtonGrid;

