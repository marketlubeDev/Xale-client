import React from "react";

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

  return (
    <div className="flex flex-col items-center justify-center w-full py-6 onboarding-anim-2">
      {/* Changed max-w-md to max-w-4xl to increase width.
         You can use max-w-5xl, max-w-full, or w-3/4 to adjust further.
      */}
      <div className="relative w-full max-w-4xl h-1.5 bg-emerald-100/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-800 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-gray-500 font-medium">
        {currentStep} of {total}
      </p>
    </div>
  );
}
