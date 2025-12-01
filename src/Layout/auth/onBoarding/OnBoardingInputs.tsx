import React, { forwardRef } from "react";
import { type FieldError } from "react-hook-form";
import InputErrorMessage from "../../../components/common/Texts/InputErrorMessage";

interface OnBoardingInputsProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  width?: string; // Controls the container min-width
  Icon?: React.ElementType; // Keeping ElementType so you can pass components like <BuildingIcon />
  error?: FieldError; // React Hook Form error object
  containerClassName?: string;
}

const OnBoardingInputs = forwardRef<HTMLInputElement, OnBoardingInputsProps>(
  (
    {
      label = "Company name",
      placeholder = "Enter your company's name",
      className = "",
      containerClassName = "",
      width = "45rem",
      Icon,
      error,
      type = "text",
      required,
      ...props
    },
    ref
  ) => {
    // Specific shadow from your original OnBoardingInputs
    const figmaShadow =
      "0px 144px 40px 0px rgba(0, 0, 0, 0.00), 0px 92px 37px 0px rgba(0, 0, 0, 0.00), 0px 52px 31px 0px rgba(0, 0, 0, 0.01), 0px 23px 23px 0px rgba(0, 0, 0, 0.02), 0px 6px 13px 0px rgba(0, 0, 0, 0.02)";

    // Dynamic styles based on Error State
    const borderClass = error
      ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
      : "border-[#E6E8E7] focus:ring-emerald-500/20 focus:border-emerald-500";

    const iconColor = error ? "#ef4444" : "#697571"; // Red if error, else Gray

    return (
      <div className={`mb-7 ${containerClassName}`} style={{ minWidth: width }}>
        {label && (
          <label className="block text-sm font-medium text-emerald-950 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative group">
          {/* Icon Container */}
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-200">
              <Icon color={iconColor} />
            </div>
          )}

          <input
            ref={ref} // Forwarding ref for React Hook Form
            type={type}
            required={required}
            style={{
              boxShadow: figmaShadow,
              // height: "2rem", // Removed fixed height to let padding control it, avoiding cut-off text
            }}
            className={`
              block w-full 
              ${Icon ? "pl-10" : "pl-4"} pr-3 
              py-3.5 
              bg-white 
              border-[1.5px] 
              rounded-xl 
              text-gray-900 
              placeholder:text-gray-500
              focus:outline-none focus:ring-2 
              transition-all duration-200
              ${borderClass}
              ${className}
            `}
            placeholder={placeholder}
            {...props}
          />
        </div>

        {/* Dynamic Error Message */}
        {error && <InputErrorMessage>{error.message}</InputErrorMessage>}
      </div>
    );
  }
);

OnBoardingInputs.displayName = "OnBoardingInputs";

export default OnBoardingInputs;

// ----------------------------------------------------------------------
// Exporting the Icon separately (as requested in your snippet)
// ----------------------------------------------------------------------
export function BuildingIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 22H22"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 2H7C4.93 2 3.25 3.68 3.25 5.75V22H20.75V5.75C20.75 3.68 19.07 2 17 2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 14H15"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 10H15"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 6H15"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
