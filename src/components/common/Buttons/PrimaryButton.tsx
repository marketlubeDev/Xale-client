import React, { useState } from "react";

interface PrimaryButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
  style?: React.CSSProperties; // Use CSSProperties for better safety
  children: string;
  // 1. Define the specific type HERE in the interface
  type?: "button" | "submit" | "reset";
}

export function PrimaryButton({
  onClick,
  className = "",
  disabled = false,
  icon,
  style = {},
  children,
  // 2. Only set the default value here. Do not add type definitions or semicolons.
  type = "button",
}: PrimaryButtonProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const baseStyle: React.CSSProperties = {
    borderRadius: "12px",
    borderTop: "none",
    borderRight: "0.5px solid #218760",
    borderBottom: "0.9px solid #218760",
    borderLeft: "0.5px solid #218760",
    background:
      "radial-gradient(239.95% 185.59% at 63.38% -7.95%, #319B72 0%, #102F23 33.08%, #319B72 97.6%)",
    boxShadow: "0 1px 1px 0 rgba(5, 25, 18, 0.20)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const hoverStyle: React.CSSProperties = {
    borderRight: "1px solid #218760",
    borderBottom: "1.25px solid #218760",
    borderLeft: "1px solid #218760",
    background:
      "radial-gradient(239.95% 185.59% at 63.38% -7.95%, #319B72 7.52%, #102F23 42.43%, #319B72 97.6%)",
    boxShadow: "0 3px 4px 0 rgba(5, 25, 18, 0.25)",
  };

  const currentStyle =
    !disabled && isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      // 3. Use the variable {type}, not the string "button"
      type={type}
      style={{ ...style, ...currentStyle }}
      className={`flex items-center justify-center ${
        icon ? "gap-[6px] pl-4 pr-6" : "px-6"
      } py-2.5 text-white font-medium text-base leading-normal tracking-[-0.32px] transition-all min-w-[140px] overflow-hidden ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
    >
      {icon && (
        <span className="shrink-0 w-6 h-6 flex items-center justify-center">
          {icon}
        </span>
      )}
      <span className="truncate min-w-0">{children}</span>
    </button>
  );
}
