import HeadingGradientTextsGreen from "../../../components/common/Texts/HeadingGradientTexts";
import { useSelector } from "react-redux";
import PlanToggle from "./PlanToggle";
import PricingCard from "./PricingCard";
import { useState } from "react";
import { usePlans } from "../../hooks/usePlan";

export default function SelectPlan() {
  const { isOnBoarded } = useSelector(
    (state: { basic: { isOnBoarded: boolean | null } }) => state.basic
  );
  const [isMonthly, setIsMonthly] = useState(false);

  const handleToggle = () => {
    setIsMonthly((val) => !val);
  };
  const { plans } = usePlans();
  console.log(plans, "plans");

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-between overflow-hidden relative z-10 py-4 ${
        !isOnBoarded ? "onboarding-anim-2" : ""
      }`}
    >
      {/* Top Section: Header & Toggle */}
      <div className="flex flex-col items-center shrink-0">
        <HeadingGradientTextsGreen top="" bottom="Choose Your Plan" />
        <p className="text-b2 text-[var(--color-text-gray)] flex items-center justify-center text-nowrap mt-[-2rem] mb-8">
          Pick a plan that fits your companies needs. Don't Worry - you can
          always upgrade later
        </p>
        <PlanToggle onClick={handleToggle} value={isMonthly} />
      </div>

      <div className="plan-container">
        {plans?.map((val) => (
          <PricingCard item={val} isMonthly={isMonthly} />
        ))}
      </div>

      {/* Bottom Section: Footer 
          Changed w-[100vw] to w-full to prevent horizontal scrollbar.
      */}
      <div className="flex justify-center items-end h-[4rem] w-full shrink-0 text-b2">
        Facing an issue while choosing plan?.
        <a
          href="mailto:support@xale.com"
          className="underline ml-2 cursor-pointer text-black"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
