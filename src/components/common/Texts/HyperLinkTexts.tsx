import React from "react";
import { Link } from "react-router-dom";

interface HyperLinkTextsProps {
  // react-router-dom 'to' is usually a string, but can be an object.
  // Given your code uses template literal `/${to}`, strict string is best here.
  to: string;
  children: React.ReactNode;
}

export default function HyperLinkTexts({ children, to }: HyperLinkTextsProps) {
  return (
    <Link
      to={`/${to}`}
      // Fixed: Wrapped CSS variables in square brackets [] for Tailwind
      className="text-b5 font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] underline transition-colors"
    >
      {children}
    </Link>
  );
}
