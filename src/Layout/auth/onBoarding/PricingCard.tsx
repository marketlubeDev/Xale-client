import { useMutation } from "@tanstack/react-query";
import { LightGreenBtn } from "../../../components/common/Buttons/LightButton";
import { PrimaryButton } from "../../../components/common/Buttons/PrimaryButton";
import type { PlanProps } from "../../hooks/usePlan";
import axiosInstance from "../../../../conf/axiosConf";
import { onboardingCrm } from "../endpoints";
import { toast } from "react-toastify";
import useVerify from "../../../hooks/useVerify";
import { useSelector } from "react-redux";

interface PricingCardProps {
  item: PlanProps;
  isMonthly: boolean;
}

const FEATURES = [
  "Add & track leads",
  "Dashboard & reporting",
  "Advanced workflows & automation",
  "Email/SMS integration",
  "Role-based permissions",
];

const CUSTOM_PLAN_START_PRICE = 2000;

const PricingCard = ({ item, isMonthly }: PricingCardProps) => {
  useVerify();

  const { token } = useSelector(
    (state: { auth: { token: string | null } }) => state.auth
  );

  const isPopular = item.isMostPopular;
  const isCustomPlan = item.isCustomPlan;

  /* -------------------------------------------------------------------------- */
  /* 💰 PRICING LOGIC */
  /* -------------------------------------------------------------------------- */

  const basePrice = Number(item.price);

  const monthlyDiscountPercent = item.monthlyOffer || 0;
  const yearlyDiscountPercent = item.yearlyOffer || 0;

  const discountPercent = isMonthly
    ? monthlyDiscountPercent
    : yearlyDiscountPercent;

  const finalPrice =
    discountPercent > 0
      ? Math.max(basePrice - (basePrice * discountPercent) / 100, 0)
      : basePrice;

  const { mutate } = useMutation({
    mutationFn: async (plan: PlanProps) => {
      const body = {
        planId: plan.id,
        planStatus: "TRIAL",
        billingCycle: isMonthly ? "MONTHLY" : "YEARLY",
      };
      return axiosInstance.post(onboardingCrm, body);
    },

    onSuccess: () => {
      window.location.href = `http://localhost:5174/auth-redirect?token=${token}`;
    },

    onError: () => {
      toast.error("Server Error");
    },
  });

  const handleSelectPlan = (data: PlanProps) => {
    if (!data.isCustomPlan) {
      mutate(data);
    }
  };

  return (
    <div className="flex items-center justify-center mt-6 plan-card">
      <div
        className={`relative w-full max-w-[450px] rounded-[32px] bg-white p-8 shadow-sm 
        ${isPopular ? "most-popular" : "border border-[#dbece5]"}
      `}
      >
        {/* MOST POPULAR BADGE */}
        {isPopular && <div className="most-popular-tag">Most Popular</div>}

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-[17px] font-medium text-[#0f392b] mb-2">
            {item.name}
          </h2>

          {/* PRICE */}
          <div className="flex items-center justify-center gap-3">
            {!isCustomPlan && discountPercent > 0 && (
              <span className="text-[2.2rem] text-gray-400 line-through">
                ₹{basePrice}
              </span>
            )}

            <span className="text-[2.6rem] font-medium text-[#133d30]">
              {isCustomPlan
                ? `Starting ₹${CUSTOM_PLAN_START_PRICE}`
                : finalPrice === 0
                ? "Free"
                : `₹${Math.round(finalPrice)}`}
            </span>
          </div>

          <p className="mt-3 px-5 text-[15px] text-gray-600">
            {item.description}
          </p>
        </div>

        {/* CTA */}
        <div className="my-8">
          {isPopular && !isCustomPlan ? (
            <PrimaryButton
              onClick={() => handleSelectPlan(item)}
              style={{ width: "100%", height: "50px" }}
            >
              Start free trial
            </PrimaryButton>
          ) : (
            <LightGreenBtn
              onClick={() => handleSelectPlan(item)}
              style={{ width: "100%", height: "50px" }}
            >
              {isCustomPlan ? "Contact us" : "Start free trial"}
            </LightGreenBtn>
          )}
        </div>

        {/* FEATURES */}
        <div className="flex flex-col items-center space-y-[18px]">
          {FEATURES.map((feature, index) => {
            const locked = !isCustomPlan && !isPopular && index > 1;

            return (
              <div
                key={index}
                className="flex items-center gap-3 w-full justify-center"
              >
                {/* ICON */}
                <div
                  className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full 
                  ${locked ? "border border-gray-300" : "bg-[#133d30]"}`}
                >
                  {!locked && (
                    <svg
                      className="w-[12px] h-[12px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>

                {/* TEXT */}
                <span
                  className={`text-[15px] ${
                    locked
                      ? "text-gray-400 line-through decoration-gray-300"
                      : "text-[#133d30]"
                  }`}
                >
                  {feature}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
