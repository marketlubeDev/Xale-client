import React from "react";
import { SearchIcon } from "../../utilities/icons";

export interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  width?: string;
  className?: string;
  height?: string;
    }

export function SearchInput({
  placeholder = "Search by name or company...",
  value,
  onChange,
  width = "380px",
  height = "40px",
  className,
}: SearchInputProps): React.ReactElement {
  return (
    <div
      className={`border border-[var(--color-border-input)] rounded-[12px] ${className || ""}`}
      style={{ width, height }}
    >
      <div className="flex gap-[8px] items-center pl-[16px] pr-[8px] py-[8px]">
        <div className="flex items-center justify-center shrink-0 size-[24px]">
          <SearchIcon size={18} />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="text-b2 text-[var(--color-black-6)] placeholder:text-[var(--color-black-6)] bg-transparent border-none outline-none flex-1 min-w-0"
        />
      </div>
    </div>
  );
}

export default SearchInput;

