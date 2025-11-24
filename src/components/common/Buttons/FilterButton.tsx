import React from "react";
import { FilterIcon } from "../../../utilities/icons";

interface FilterButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function FilterButton({
  label = "Filter",
  onClick,
  className = "",
  disabled = false,
}: FilterButtonProps): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-[6px] rounded-[4px] border border-[#98cdb8] bg-[#f2f7f5] px-5 py-2 text-[#1e302a] shadow-[inset_0_0_3px_2px_rgba(152,205,184,0.2)] transition-colors ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-[#e8f0ec]"
      } ${className}`}
    >
      <span className="inline-flex h-5 w-5 items-center justify-center">
        <FilterIcon color="#1E302A" />
      </span>
      <span className="font-['Helvetica_Neue',sans-serif] text-[14px] font-medium leading-[normal] tracking-[-0.56px]">
        {label}
      </span>
    </button>
  );
}

