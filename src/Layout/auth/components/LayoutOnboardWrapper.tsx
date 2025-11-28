import { useEffect, useState } from "react";
import LayoutOnboardFooter from "./LayoutOnboardFooter";
import OnboardingAnimation from "./OnboardingAnimation";
import LayoutOnboardingHeader from "./LayoutOnboardingHeader";
import { Outlet } from "react-router-dom";

export default function LayoutOnboardWrapper() {
  const [isAnimation, setIsAnimation] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsAnimation(false), 6000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between p-4 font-var(--font-helvetica-neue) relative overflow-hidden bg-var(--body-gradient)"
      style={{
        background: "var(--body-gradient)",
      }}
    >
      {isAnimation ? (
        <OnboardingAnimation />
      ) : (
        <>
          <LayoutOnboardingHeader />
          <Outlet />
          <LayoutOnboardFooter />
        </>
      )}
    </div>
  );
}
