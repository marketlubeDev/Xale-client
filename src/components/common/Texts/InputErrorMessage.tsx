import type React from "react";

interface InputErrorMessageProps {
  children: React.ReactNode;
}

export default function InputErrorMessage({
  children,
}: InputErrorMessageProps) {
  return (
    <p
      style={{
        color: "var(--color-error)",
        textDecoration: "none",
        textAlign: "left",
      }}
      className="mt-1.5 text-b5"
    >
      {children}
    </p>
  );
}
