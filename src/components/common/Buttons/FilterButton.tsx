import React from "react";
import { FilterIcon } from "../../../utilities/icons";

interface FilterButtonProps {
  label?: string;
  onClick?: () => void;
  width?: string;
  className?: string;
  disabled?: boolean;
}

export function FilterButton({
  label = "Filter",
  onClick,
  width = "96px",
  className = "",
  disabled = false,
}: FilterButtonProps): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-[6px] rounded-[4px] border border-[var(--color-border-green)] bg-[var(--color-bg-green)] px-5 py-2 text-[var(--color-text-primary)] shadow-[inset_0_0_3px_2px_rgba(152,205,184,0.2)] transition-colors ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-[var(--color-bg-hover)]"
      } ${className}`}
      style={width ? { width } : undefined}
    >
      <span className="inline-flex h-5 w-5 items-center justify-center">
        <FilterIcon />
      </span>
      <span className="text-b4 font-medium leading-[normal]">
        {label}
      </span>
    </button>
  );
}

