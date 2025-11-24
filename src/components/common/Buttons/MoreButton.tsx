import React, { useEffect, useRef, useState } from "react";
import { ChevronRightIcon, MoreVerticalIcon } from "../../../utilities/icons";

const DEFAULT_MENU_ITEMS = [
  { label: "Show/hide fields", showArrow: true },
  { label: "Bulk Assign" },
  { label: "Bulk Update" },
  { label: "Import Lead" },
  { label: "Reset Layouts" },
];

type MenuItem = {
  label: string;
  showArrow?: boolean;
};

interface MoreButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  menuItems?: MenuItem[];
  onSelect?: (label: string) => void;
}

const GRADIENT =
  "radial-gradient(239.95% 185.59% at 63.38% -7.95%, #F0F7F5 0%, #D6EBE3 37%, #F0F7F5 84%)";

export function MoreButton({
  onClick,
  className = "",
  disabled = false,
  ariaLabel = "More options",
  menuItems = DEFAULT_MENU_ITEMS,
  onSelect,
}: MoreButtonProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  const baseStyle: React.CSSProperties = {
    borderRadius: "12px",
    borderTop: "0px solid #ADD7C7",
    borderRight: "0.5px solid #ADD7C7",
    borderBottom: "0.9px solid #ADD7C7",
    borderLeft: "0.5px solid #ADD7C7",
    background: GRADIENT,
    boxShadow: "0 1px 1px rgba(5, 25, 18, 0.15)",
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
      onClick?.();
    }
  };

  return (
    <div ref={containerRef} className={`relative inline-flex ${className}`}>
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={handleToggle}
        disabled={disabled}
        style={baseStyle}
        className={`inline-flex size-11 items-center justify-center transition-all ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:shadow-[0_3px_6px_rgba(5,25,18,0.2)]"
        }`}
      >
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/0">
          <MoreVerticalIcon color="#0E121B" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-20 mt-2 min-w-[160px] rounded-[16px] border border-[#e6e8e7] bg-white p-1 shadow-sm">
          <ul className="flex flex-col gap-1">
            {menuItems?.map((item) => (
              <li key={item?.label}>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onSelect?.(item?.label);
                  }}
                  className="flex h-9 w-full items-center justify-between rounded-[12px] px-3 text-left text-[#374741] transition-colors hover:bg-[#f4f6f5]"
                >
                  <span className="font-['Helvetica_Neue',sans-serif] text-[14px] leading-[19px] tracking-[-0.56px]">
                    {item?.label}
                  </span>
                  {item?.showArrow && (
                    <span className="inline-flex h-5 w-5 items-center justify-center">
                      <ChevronRightIcon color="#374741" />
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
