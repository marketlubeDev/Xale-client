interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectorProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

export function FormSelector({
  label,
  placeholder = "Select an option",
  value = "",
  onChange,
  options = [],
  disabled = false,
  className = "",
  required = false,
}: FormSelectorProps) {
  return (
    <div className={`flex flex-col gap-[6px] items-start ${className}`}>
      <label className="text-b4-med text-[var(--color-text-primary)] text-center tracking-[-0.56px] whitespace-pre shrink-0 font-['Helvetica Neue']">
        {label}
        {required && <span className="text-[var(--color-error)] ml-1">*</span>}
      </label>

      <div className="bg-[var(--color-bg-input-field)] border border-[var(--color-border-input)] h-[40px] rounded-[12px] w-full">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className="text-b4 text-[var(--color-text-secondary)] w-full h-full px-[12px]  rounded-[inherit] bg-transparent outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FormSelector;

