import { useEffect, useState } from "react";
import LayoutOnboardFooter from "./LayoutOnboardFooter";
import OnboardingAnimation from "./OnboardingAnimation";
import LayoutOnboardingHeader from "./LayoutOnboardingHeader";
import { Outlet } from "react-router-dom";
import { useGetPathNum } from "../../../hooks/useGetPathNum";
import { useDispatch, useSelector } from "react-redux";
import { setIsOnBoarded } from "../../../../global/basicSlice";

// Define your onboarding steps in order
export const ONBOARDING_STEPS = [
  "/onboarding",
  "/onboarding/company-details",
  "/onboarding/select-plan",
];

export default function LayoutOnboardWrapper() {
  const [isAnimation, setIsAnimation] = useState(true);
  const { isOnBoarded } = useSelector(
    (state: { basic: { isOnBoarded: boolean | null } }) => state.basic
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOnBoarded) return;
    const timeoutId = setTimeout(() => {
      setIsAnimation(false);
      const onBoardedTimeoutId = setTimeout(
        () => dispatch(setIsOnBoarded(true)),
        1500
      );
      // Clean up the second timeout as well
      return () => clearTimeout(onBoardedTimeoutId);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  const { pathNum } = useGetPathNum(ONBOARDING_STEPS);
  useEffect(() => {
    if (pathNum !== 0 && pathNum !== -1 && !isOnBoarded) {
      dispatch(setIsOnBoarded(true));
    }
  }, [pathNum]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between p-4 font-var(--font-helvetica-neue) relative overflow-hidden bg-var(--body-gradient)"
      style={{
        background: "var(--body-gradient)",
      }}
    >
      {isAnimation && pathNum === 0 && !isOnBoarded ? (
        <OnboardingAnimation />
      ) : (
        <>
          <LayoutOnboardingHeader num={pathNum + 1} />
          <Outlet />
          {pathNum !== 2 && <LayoutOnboardFooter />}
        </>
      )}
    </div>
  );
}
