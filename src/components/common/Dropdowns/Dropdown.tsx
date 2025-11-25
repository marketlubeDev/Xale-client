import React, { useEffect, useRef, useState } from "react";
import { DropDownHamburgerIcon, RotateArrowIcon } from "../../../utilities/icons";

const MENU_ITEMS = [
  { label: "Recent" },
  { label: "All" },
  { label: "Starred" },
  { label: "My Leads (20) sdfsdfsadf" },
  { label: "Archived" },
];

type MenuItem = { label: string };

interface DropDownProps {
  value?: string;
  menuItems?: MenuItem[];
  onSelect?: (label: string) => void;
  width?: string;
}



export function Dropdown({
  value,
  menuItems = MENU_ITEMS,
  onSelect,
  width = "135px",
}: DropDownProps): React.ReactElement {
  const resolvedValue = value ?? menuItems[0]?.label ?? "";
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(resolvedValue);
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

  return (
    <div ref={containerRef} className="relative inline-flex" style={{ width }}>
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between rounded-[4px] border border-[var(--color-border-green)] bg-[var(--color-bg-green)] px-3.5 py-2 shadow-[inset_0_0_3px_2px_rgba(152,205,184,0.2)] transition-colors hover:bg-[var(--color-bg-hover)]"
      >
        <span className="inline-flex items-center gap-3 min-w-0 overflow-hidden">
          <span className="inline-flex h-5 w-5 items-center justify-center shrink-0">
            <DropDownHamburgerIcon />
          </span>
          <span className="text-b4 font-medium leading-[normal] text-[var(--color-text-primary)] overflow-hidden text-ellipsis whitespace-nowrap">
            {selectedValue}
          </span>
        </span>
        <RotateArrowIcon
          className={`h-5 w-5 transition-transform duration-200 shrink-0 ml-2 ${
            !isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-2 w-full rounded-[16px] border border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] p-1 shadow-sm">
          <ul className="flex flex-col gap-1">
            {menuItems?.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedValue(item.label);
                    onSelect?.(item.label);
                  }}
                  className={`flex h-9 w-full items-center justify-between gap-2 rounded-[12px] px-2.5 text-left transition-colors ${
                    selectedValue === item.label
                      ? "bg-[var(--color-bg-success-light)] text-[var(--color-text-primary)]"
                      : "hover:bg-[var(--color-bg-hover)]"
                  }`}
                >
                  <span
                    className={`text-b4 leading-[19px] overflow-hidden text-ellipsis whitespace-nowrap ${
                      selectedValue === item.label ? "text-[var(--color-text-primary)]" : "text-[var(--color-black-8)]"
                    }`}
                  >
                    {item.label}
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

