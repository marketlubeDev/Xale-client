import React from "react";

// Define the shape of an option
export interface SelectOption {
  label: string;
  value: string | number;
}

interface OnBoardingSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  width?: string;
  Icon: React.ElementType;
  options?: SelectOption[];
  placeholder?: string;
}

export default function OnBoardingDropDown({
  label = "Select Option",
  placeholder = "Select an option",
  className = "w-full max-w-md",
  width = "45rem",
  Icon,
  options = [{ label: "Education", value: "Education" }],
  value,
  ...props
}: OnBoardingSelectProps) {
  const figmaShadow =
    "0px 144px 40px 0px rgba(0, 0, 0, 0.00), 0px 92px 37px 0px rgba(0, 0, 0, 0.00), 0px 52px 31px 0px rgba(0, 0, 0, 0.01), 0px 23px 23px 0px rgba(0, 0, 0, 0.02), 0px 6px 13px 0px rgba(0, 0, 0, 0.02)";

  // Check if the current value is empty (placeholder state)
  const isPlaceholderActive = value === "" || value === undefined;

  return (
    <div className={`${className} mb-7`} style={{ minWidth: width }}>
      <label className="block text-sm font-medium text-emerald-950 mb-2">
        {label}
      </label>

      <div className="relative">
        {/* Left Icon */}
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
          <Icon color={"#697571"} />
        </div>

        {/* Select Input */}
        <select
          value={value !== undefined ? value : ""}
          style={{
            boxShadow: figmaShadow,
            borderColor: "#E6E8E7",
          }}
          className={`
            appearance-none 
            block w-full pl-10 pr-10 py-3
            bg-white 
            border-[1.5px] 
            rounded-xl 
            text-gray-500
            focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
            transition-all duration-200
            cursor-pointer
             placeholder:text-gray-500
            ${isPlaceholderActive ? "text-gray-400" : "text-gray-900"} 
          `}
          {...props}
        >
          {/* Placeholder Option */}
          <option value="" disabled className="text-gray-400">
            {placeholder}
          </option>

          {/* Mapped Options */}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-gray-900" // Ensure options are always dark even if select is gray
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Right Chevron Icon */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
