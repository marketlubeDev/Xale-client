import { useSelector } from "react-redux";

interface LayoutOnboardingHeaderProps {
  num?: number;
  total?: number;
}

export default function LayoutOnboardingHeader({
  num = 1,
  total = 3,
}: LayoutOnboardingHeaderProps) {
  const currentStep = Math.min(Math.max(num, 0), total);
  const progressPercentage = (currentStep / total) * 100;
  const { isOnBoarded } = useSelector(
    (state: { basic: { isOnBoarded: boolean | null } }) => state.basic
  );

  return (
    <div
      className={`flex flex-col items-center justify-center w-full py-6 ${
        !isOnBoarded ? "onboarding-anim-2" : ""
      }`}
    >
      {/* 1. Added 'shadow-inner' to the parent: Makes the track look like an indented groove.
          2. Changed bg to 'bg-emerald-200/30' for a cleaner track look.
      */}
      <div className="relative w-full max-w-4xl h-1.5 bg-emerald-200/30 rounded-full overflow-hidden shadow-inner">
        <div
          /* 3D CYLINDER EFFECT:
             - bg-gradient-to-b: Gradient flows Top to Bottom.
             - from-emerald-400: Lightest color (Top Highlight).
             - via-emerald-600: Mid-tone (Body of cylinder).
             - to-emerald-900: Darkest color (Bottom Shadow).
          */
          className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-b from-emerald-500 via-emerald-600 to-emerald-900 shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-gray-500 font-medium">
        {currentStep} of {total}
      </p>
    </div>
  );
}
