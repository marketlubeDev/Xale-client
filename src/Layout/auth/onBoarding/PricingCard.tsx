import { useMutation } from "@tanstack/react-query";
import { LightGreenBtn } from "../../../components/common/Buttons/LightButton";
import { PrimaryButton } from "../../../components/common/Buttons/PrimaryButton";
import type { PlanProps } from "../../hooks/usePlan";
import axiosInstance from "../../../../conf/axiosConf";

interface PricingCardProps {
  item: PlanProps;
  isMonthly: boolean;
}

const PricingCard = ({ item, isMonthly }: PricingCardProps) => {
  const type = item.isMostPopular;

  // ✅ Base monthly price
  const monthlyBase = item.price;

  // ✅ Monthly calculation
  const monthlyDiscount = item.monthlyOffer || 0;
  const monthlyFinal = Math.max(monthlyBase - monthlyDiscount, 0);

  // ✅ Yearly calculation
  const yearlyBase = monthlyBase * 12;
  const yearlyDiscount = item.yearlyOffer || 0;
  const yearlyFinal = Math.max(yearlyBase - yearlyDiscount, 0);

  // ✅ Decide current view
  const originalPrice = isMonthly ? monthlyBase : yearlyBase;
  const finalPrice = isMonthly ? monthlyFinal : yearlyFinal;
  const discount = isMonthly ? monthlyDiscount : yearlyDiscount;

  const { mutate } = useMutation({
    mutationFn: async (plan: PlanProps) => {
      const body = {
        planId: plan.id,
        planStatus: "TRIAL",
      };
      return axiosInstance.patch("/tenant/start-my-plan", body);
    },

    onSuccess: (_) => {
      window.location.href = "http://localhost:5174";
    },

    onError: (err: any) => {
      console.error("❌ Tenant update failed:");
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
        className={`relative w-full max-w-[450px] rounded-[32px] bg-white p-8 shadow-sm transition-all duration-300 
        ${type ? "most-popular" : "border border-[#dbece5]"}
      `}
      >
        {/* MOST POPULAR BADGE */}
        {type && <div className="most-popular-tag">Most Popular</div>}

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-[17px] font-medium text-[#0f392b] tracking-tight mb-2">
            {item.name}
          </h2>

          {/* PRICE BLOCK */}
          <div className="flex items-center justify-center gap-3">
            {/* STRIKE PRICE */}
            {discount > 0 && (
              <span className="text-[2.4rem] font-medium text-gray-400 line-through decoration-1 decoration-gray-400/80">
                ₹{originalPrice}
              </span>
            )}

            {/* FINAL PRICE */}
            {item.isCustomPlan ? (
              <span className="text-[2.5rem] my-2 leading-none font-medium text-[#133d30] tracking-tight">
                {`Starting ₹${finalPrice}`}
              </span>
            ) : (
              <span className="text-[2.5rem]  my-2  leading-none font-medium  text-[#133d30] tracking-tight">
                {finalPrice === 0 ? "Free" : `₹${finalPrice}`}
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          <p className="mt-2 px-5 text-[15px] text-gray-600 font-normal">
            {item.description}
          </p>
        </div>

        {/* DIVIDER */}
        <div className="my-7 w-full border-t border-dashed border-gray-300/80"></div>

        {/* CTA */}
        <div className="mb-8">
          {type ? (
            <PrimaryButton
              onClick={() => handleSelectPlan(item)}
              style={{ width: "100%", height: "50px", fontSize: "16px" }}
            >
              Start free trial
            </PrimaryButton>
          ) : (
            <LightGreenBtn
              style={{ width: "100%", height: "50px", fontSize: "16px" }}
              onClick={() => handleSelectPlan(item)}
            >
              {item.isCustomPlan ? "Contact us" : "Start free trial"}
            </LightGreenBtn>
          )}
        </div>

        {/* FEATURES */}
        <div className="flex flex-col items-center space-y-[18px]">
          {[
            "Add & track leads",
            "Dashboard & reporting",
            "Advanced workflows & automation",
            "Email/SMS integration",
            "Role-based permissions",
          ].map((feature, index) => {
            const locked = !type && index > 1;

            return (
              <div
                key={index}
                className="flex items-center gap-3 w-full justify-center"
              >
                <div
                  className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full 
                  ${locked ? "border border-gray-300" : "bg-[#133d30]"}
                `}
                />

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
