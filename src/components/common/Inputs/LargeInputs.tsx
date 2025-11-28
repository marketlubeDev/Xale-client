import React, { forwardRef } from "react";
import { type FieldError } from "react-hook-form";
import InputErrorMessage from "../Texts/InputErrorMessage";

// We extend InputHTMLAttributes to inherit standard props like 'required', 'type', 'placeholder', etc.
interface LargeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError; // specifically typed for React Hook Form errors
  icon?: React.ReactNode;
  containerClassName?: string;
}

const LargeInput = forwardRef<HTMLInputElement, LargeInputProps>(
  (
    {
      type = "text",
      placeholder,
      className = "",
      containerClassName = "",
      error,
      icon,
      required,
      ...props
    },
    ref
  ) => {
    // Determine border color based on error state
    // Switched to standard red-500 to ensure the error state is clearly visible
    const borderColorClass = error
      ? "border-red-500 focus:ring-1 focus:ring-red-500"
      : "border-[var(--color-border-input)] focus:border-[var(--color-text-primary)] focus:ring-0";

    return (
      <div className={`relative group ${containerClassName}`}>
        <div className="relative">
          <input
            ref={ref} // Critical for react-hook-form
            type={type}
            style={{ textAlign: "left" }}
            placeholder={placeholder}
            required={required}
            className={`w-full py-3.5 border rounded-xl outline-none transition-all text-b2 text-var(--color-text-primary) bg-white
            ${icon ? "pl-11" : "pl-4"} pr-4 
            ${borderColorClass} 
            ${className} placeholder:text-left`}
            {...props}
          />
        </div>

        {/* Dynamic Error Message */}
        {error && <InputErrorMessage>{error.message}</InputErrorMessage>}
      </div>
    );
  }
);

LargeInput.displayName = "LargeInput";

export default LargeInput;
