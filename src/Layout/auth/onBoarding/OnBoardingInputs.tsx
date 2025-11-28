import React from "react";

interface OnBoardingInputsProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  width?: string;
  // CHANGED: ReactNode -> React.ElementType so you can use it as <Icon />
  Icon: React.ElementType;
}

export default function OnBoardingInputs({
  label = "Company name",
  placeholder = "Enter your company's name",
  className = "w-full max-w-md",
  width = "45rem",
  Icon, // Capitalized so it can be used as a JSX tag
  ...props
}: OnBoardingInputsProps) {
  const figmaShadow =
    "0px 144px 40px 0px rgba(0, 0, 0, 0.00), 0px 92px 37px 0px rgba(0, 0, 0, 0.00), 0px 52px 31px 0px rgba(0, 0, 0, 0.01), 0px 23px 23px 0px rgba(0, 0, 0, 0.02), 0px 6px 13px 0px rgba(0, 0, 0, 0.02)";

  return (
    <div className={`${className} mb-7`} style={{ minWidth: width }}>
      <label className="block text-sm font-medium text-emerald-950 mb-2">
        {label}
      </label>

      <div className="relative">
        {/* Icon Container */}
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
          {/* Now valid because Icon is React.ElementType */}
          <Icon color={"#697571"} />
        </div>

        <input
          type="text"
          style={{
            boxShadow: figmaShadow,
            borderColor: "#E6E8E7",
            height: "2rem",
          }}
          className="
            block w-full pl-10 pr-3 py-5.5
            bg-white 
            border-[1.5px] 
            rounded-xl 
            text-gray-900 
            placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
            transition-all duration-200
          "
          placeholder={placeholder}
          {...props}
        />
      </div>
    </div>
  );
}

// You can export this separately to use it as a prop
export function BuildingIcon() {
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
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 2H7C4.93 2 3.25 3.68 3.25 5.75V22H20.75V5.75C20.75 3.68 19.07 2 17 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 14H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 10H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 6H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
