interface ToggleCardGroupProps {
  children: React.ReactNode;
  className?: string;
  columns?: number;
}

export function ToggleCardGroup({
  children,
  className = '',
  columns = 3,
}: ToggleCardGroupProps) {
  return (
    <div 
      className={`grid gap-[20px] ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  );
}

export default ToggleCardGroup;

