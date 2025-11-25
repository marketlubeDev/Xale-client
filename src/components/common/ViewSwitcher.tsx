import React from "react";
import { GridIcon, ListIcon, BoardIcon } from "../../utilities/icons";

export type ViewType = "grid" | "list" | "board";

export interface ViewSwitcherProps {
  activeView?: ViewType;
  onViewChange?: (view: ViewType) => void;
  className?: string;
}

interface ViewOption {
  type: ViewType;
  label: string;
  icon: React.ReactElement;
}

const VIEW_OPTIONS: ViewOption[] = [
  { type: "grid", label: "Grid", icon: <GridIcon /> },
  { type: "list", label: "List", icon: <ListIcon /> },
  { type: "board", label: "Board", icon: <BoardIcon /> },
];

export function ViewSwitcher({
  activeView = "grid",
  onViewChange,
  className,
}: ViewSwitcherProps): React.ReactElement {
  return (
    <div className={`flex items-start relative ${className || ""}`}>
      {VIEW_OPTIONS.map((option) => {
        const isActive = activeView === option.type;
        return (
          <div
            key={option.type}
            className="relative"
          >
            <button
              type="button"
              onClick={() => onViewChange?.(option.type)}
              className="flex gap-[8px] items-center justify-center px-[24px] py-[8px] transition-opacity hover:opacity-70"
            >
              <div className="shrink-0 size-[20px]">
                {React.cloneElement(option.icon, {
                  color: isActive
                    ? "var(--color-black-10)"
                    : "var(--color-black-8)",
                  size: 20,
                })}
              </div>
              <p
                className={`text-b2-med shrink-0 whitespace-nowrap ${
                  isActive
                    ? "text-[var(--color-black-10)]"
                    : "text-[var(--color-black-8)]"
                }`}
              >
                {option.label}
              </p>
            </button>
            {isActive && (
              <div className="absolute -bottom-[7px] left-[2px] h-[3px] rounded-full bg-[var(--color-black-10)]" style={{ width: 'calc(100% - 4px)' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ViewSwitcher;

