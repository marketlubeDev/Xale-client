import type { ReactNode } from "react";
import LayoutFooter from "./LayoutFooter";

type LayoutWrapperProps = {
  children: ReactNode;
};

function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between p-4 font-[var(--font-helvetica-neue)] relative overflow-hidden bg-[var(--body-gradient)]"
      style={{
        background: "var(--body-gradient)",
      }}
    >
      {children}
      <LayoutFooter />
    </div>
  );
}

export default LayoutWrapper;
