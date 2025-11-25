import React, { useEffect, useRef, useState } from "react";
import { RotateArrowIcon } from "../../utilities/icons";

const DEFAULT_BRANCHES = [
  "All branches",
  "Main Branch",
  "North Branch",
  "South Branch",
  "East Branch",
];

export interface BranchSelectorProps {
  branches?: string[];
  selectedBranch?: string;
  count?: number;
  onSelect?: (branch: string) => void;
  className?: string;
}

export function BranchSelector({
  branches = DEFAULT_BRANCHES,
  selectedBranch,
  count = 1256,
  onSelect,
  className,
}: BranchSelectorProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(
    selectedBranch ?? branches[0] ?? "All branches"
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (branch: string) => {
    setSelected(branch);
    setIsOpen(false);
    onSelect?.(branch);
  };

  return (
    <div ref={containerRef} className={`relative inline-flex ${className || ""}`}>
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center gap-[6px]"
      >
        <p
          className="font-['Helvetica_Neue',sans-serif] font-medium leading-[normal] not-italic shrink-0 text-[#051912] text-[28px] whitespace-nowrap tracking-[-1.12px]"
        >
          {selected}
        </p>
        <div
          className="flex flex-col font-['Helvetica_Neue',sans-serif] h-[30px] justify-end leading-[0] not-italic shrink-0 text-[#697571] text-[16px] tracking-[-0.32px] w-[43px]"
        >
          <p className="leading-[normal]">({count})</p>
        </div>
        <div
          className="box-border flex items-center gap-[8px] pb-0 pt-[2px] px-0 shrink-0"
        >
          <div className={`flex-none transition-transform duration-200 ${!isOpen ? 'rotate-180' : ''}`}>
            <RotateArrowIcon className="shrink-0 size-[24px]" color="#0E121B" size={24} />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-2 rounded-[16px] border border-[#e6e8e7] bg-white p-1 shadow-sm min-w-[200px]">
          <ul className="flex flex-col gap-1">
            {branches.map((branch) => (
              <li key={branch}>
                <button
                  type="button"
                  onClick={() => handleSelect(branch)}
                  className={`flex h-9 w-full items-center justify-between gap-2 rounded-[12px] px-2.5 text-left transition-colors ${
                    selected === branch
                      ? "bg-[#eff7f3] text-[#1e302a]"
                      : "hover:bg-[#f4f6f5]"
                  }`}
                >
                  <span
                    className={`font-['Helvetica_Neue',sans-serif] text-[14px] font-normal leading-[19px] tracking-[-0.56px] ${
                      selected === branch ? "text-[#1e302a]" : "text-[#374741]"
                    }`}
                  >
                    {branch}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BranchSelector;

