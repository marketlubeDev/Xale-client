import React from "react";

export type SegmentOption = {
  label: string;
  value: string;
};

interface SegmentToggleProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: SegmentOption[];
  className?: string;
}

export const DEFAULT_SEGMENT_OPTIONS: SegmentOption[] = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const ACTIVE_GRADIENT =
  "radial-gradient(239.95% 185.59% at 63.38% -7.95%, #319B72 0%, #20654A 16.5%, #184A36 24.8%, #102F23 33.1%, #184A36 49.2%, #20654A 65.3%, #319B72 98%)";

const activeSegmentStyle: React.CSSProperties = {
  borderRadius: "12px",
  borderTop: "0px solid #218760",
  borderRight: "0.5px solid #218760",
  borderBottom: "0.9px solid #218760",
  borderLeft: "0.5px solid #218760",
  background: ACTIVE_GRADIENT,
  boxShadow: "0 1px 1px rgba(5, 25, 18, 0.25)",
};

export function SegmentToggle({
  value,
  onChange,
  options = DEFAULT_SEGMENT_OPTIONS,
  className = "",
}: SegmentToggleProps): React.ReactElement {
  const resolvedValue = value ?? options[0]?.value;

  return (
    <div className={`inline-flex rounded-[14px] p-[2px] items-center ${className}`}>
      {options?.map((option) => {
        const isActive = option.value === resolvedValue;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => {
              if (!isActive) {
                onChange?.(option.value);
              }
            }}
            style={isActive ? activeSegmentStyle : undefined}
            className={`flex h-8 w-[80px] items-center justify-center rounded-[12px] px-3 text-[14px] tracking-[-0.56px] transition-colors ${
              isActive
                ? "font-medium text-white"
                : "font-normal text-[#374741]"

            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

