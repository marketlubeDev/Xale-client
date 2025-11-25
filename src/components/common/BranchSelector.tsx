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
        <p className="text-h2 shrink-0 text-[var(--color-black-10)] whitespace-nowrap">
          {selected}
        </p>
        <div className="flex flex-col h-[30px] justify-end leading-[0] shrink-0 text-[var(--color-black-6)] w-[43px]">
          <p className="text-b2 leading-[normal]">({count})</p>
        </div>
        <div
          className="box-border flex items-center gap-[8px] pb-0 pt-[2px] px-0 shrink-0"
        >
          <div className={`flex-none transition-transform duration-200 ${!isOpen ? 'rotate-180' : ''}`}>
            <RotateArrowIcon className="shrink-0 size-[24px]" size={24} />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-2 rounded-[16px] border border-[var(--color-border-primary)] bg-white p-1 shadow-sm min-w-[200px]">
          <ul className="flex flex-col gap-1">
            {branches.map((branch) => (
              <li key={branch}>
                <button
                  type="button"
                  onClick={() => handleSelect(branch)}
                  className={`flex h-9 w-full items-center justify-between gap-2 rounded-[12px] px-2.5 text-left transition-colors ${
                    selected === branch
                      ? "bg-[var(--color-bg-success-light)] text-[var(--color-text-primary)]"
                      : "hover:bg-[var(--color-bg-hover)]"
                  }`}
                >
                  <span
                    className={`text-b4 ${
                      selected === branch ? "text-[var(--color-text-primary)]" : "text-[var(--color-black-8)]"
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

