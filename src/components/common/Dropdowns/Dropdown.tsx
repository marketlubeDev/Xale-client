import React, { useEffect, useRef, useState } from "react";
import { DropDownHamburgerIcon, RotateArrowIcon } from "../../../utilities/icons";

const MENU_ITEMS = [
  { label: "Show/hide fields" },
  { label: "Bulk Assign" },
  { label: "Bulk Update" },
  { label: "Import Lead" },
  { label: "Reset Layouts" },
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
  width = "184px",
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
    <div ref={containerRef} className={`relative inline-flex w-[${width}]`}>
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between rounded-[4px] border border-[#98cdb8] bg-[#f2f7f5] px-3.5 py-2 shadow-[inset_0_0_3px_2px_rgba(152,205,184,0.2)] transition-colors hover:bg-[#e8f0ec]"
      >
        <span className="inline-flex items-center gap-3">
          <span className="inline-flex h-5 w-5 items-center justify-center">
            <DropDownHamburgerIcon />
          </span>
          <span className="font-['Helvetica_Neue',sans-serif] text-[14px] font-medium leading-[normal] tracking-[-0.56px] text-[#1e302a]">
            {selectedValue}
          </span>
        </span>
        <RotateArrowIcon
          color="#1E302A"
          className={`h-5 w-5 transition-transform duration-200 ${
            !isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-2 w-full rounded-[16px] border border-[#e6e8e7] bg-white p-1 shadow-sm">
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
                      ? "bg-[#eff7f3] text-[#1e302a]"
                      : "hover:bg-[#f4f6f5]"
                  }`}
                >
                  <span
                    className={`font-['Helvetica_Neue',sans-serif] text-[14px] font-normal leading-[19px] tracking-[-0.56px] ${
                      selectedValue === item.label ? "text-[#1e302a]" : "text-[#374741]"
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

