import React from "react";

interface SideBarItemProps {
  icon: React.ReactElement;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}

function SideBarItem({
  icon,
  text,
  isActive = false,
  onClick,
}: SideBarItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex gap-2.5 h-11 items-center overflow-hidden px-3 py-2 rounded-xl shrink-0 w-full ${
        isActive ? "bg-[#f5f7f6]" : ""
      } ${onClick ? "cursor-pointer hover:opacity-70 transition-opacity" : ""}`}
    >
      <div className="shrink-0 w-5 h-5">{icon}</div>
      <p
        className={`text-b2 relative shrink-0 whitespace-nowrap ${
          isActive ? "text-[#051912]" : "text-[#505e59]"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

export default SideBarItem;
