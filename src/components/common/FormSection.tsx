interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  width?: string;
}

export function FormSection({
  title,
  description,
  children,
  className = "",
  width = "w-full",
}: FormSectionProps) {
  return (
    <div
      className={`bg-[var(--color-bg-section)] flex flex-col gap-[20px] items-start p-[16px] rounded-[24px] ${width} ${className}`}
    >
      <div className="flex flex-col gap-[6px] items-start">
        <h3 className="text-b1-med text-[var(--color-black-10)] tracking-[-0.72px] whitespace-pre shrink-0">
          {title}
        </h3>
        {description && (
          <p className="text-b4 text-[var(--color-black-6)] tracking-[-0.56px] shrink-0">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-[16px] items-stretch pb-[8px] pt-0  w-full">
        {children}
      </div>
    </div>
  );
}

export default FormSection;
