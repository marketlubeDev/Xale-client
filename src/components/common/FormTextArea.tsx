interface FormTextAreaProps {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  rows?: number;
}

export function FormTextArea({
  label,
  placeholder,
  value = "",
  onChange,
  disabled = false,
  className = "",
  required = false,
  rows = 2,
}: FormTextAreaProps) {
  return (
    <div className={`flex flex-col gap-[6px] items-start ${className}`}>

      <label className="text-b4-med text-[var(--color-text-primary)] text-center tracking-[-0.56px] whitespace-pre shrink-0">
        {label}
        {required && <span className="text-[var(--color-error)] ml-1">*</span>}
      </label>


      <div className="bg-[var(--color-bg-input-field)] border border-[var(--color-border-input)] rounded-[12px] w-full">
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className="text-b4 text-[var(--color-text-secondary)] w-full px-[12px] py-[12px] rounded-[inherit] bg-transparent outline-none placeholder:text-[var(--color-text-secondary)] disabled:opacity-50 disabled:cursor-not-allowed resize-none"
        />
      </div>
    </div>
  );
}

export default FormTextArea;
