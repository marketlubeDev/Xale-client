import { LightGreenBtn } from "../../../components/common/Buttons/LightButton";
import { PrimaryButton } from "../../../components/common/Buttons/PrimaryButton";

interface PricingCardProps {
  type?: boolean; // Renamed Boolean to boolean (primitive type is preferred in TS)
}

const PricingCard = ({ type = false }: PricingCardProps) => {
  return (
    <div className="flex items-center justify-center mt-6 plan-card">
      {/* Main Card Container */}
      <div
        className={`relative w-full max-w-[450px] rounded-[32px] bg-white p-8 shadow-sm transition-all duration-300 
          ${type ? "most-popular" : "border border-[#dbece5]"}
        `}
      >
        {/* 'Most Popular' Badge - Only shows if type is true */}
        {type && <div className="most-popular-tag">Most Popular</div>}

        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-[17px] font-medium text-[#0f392b] tracking-tight mb-2">
            {type ? "Pro Plan" : "Starter Plan"}
          </h2>

          {/* Price Section */}
          <div className="flex items-center justify-center gap-3">
            {/* You can make pricing dynamic here too if needed */}
            <span className="text-[3rem]  font-medium text-gray-400 line-through decoration-1 decoration-gray-400/80">
              ₹899
            </span>
            <span className="text-[3rem] leading-none font-medium text-[#133d30] tracking-tight">
              {type ? "₹1,499" : "Free"}
            </span>
          </div>

          <p className="mt-2 text-[15px] text-gray-600 font-normal">
            {type
              ? "Full features, ideal for growing companies"
              : "14 days free trial"}
          </p>
        </div>

        {/* Dashed Divider */}
        <div className="my-7 w-full border-t border-dashed border-gray-300/80"></div>

        {/* Button */}
        <div className="mb-8">
          {type ? (
            <PrimaryButton
              style={{ width: "100%", height: "50px", fontSize: "16px" }}
            >
              Start free trial
            </PrimaryButton>
          ) : (
            <LightGreenBtn
              style={{ width: "100%", height: "50px", fontSize: "16px" }}
            >
              Start free trial
            </LightGreenBtn>
          )}
        </div>

        {/* Features List */}
        <div className="flex flex-col items-center space-y-[18px]">
          {/* Active Item 1 */}
          <div className="flex items-center gap-3 w-full justify-center">
            <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#133d30] text-white">
              {/* <Check size={12} strokeWidth={4} /> */}
            </div>
            <span className="text-[15px] text-[#133d30]">
              Add & track leads
            </span>
          </div>

          {/* Active Item 2 */}
          <div className="flex items-center gap-3 w-full justify-center">
            <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#133d30] text-white">
              {/* <Check size={12} strokeWidth={4} /> */}
            </div>
            <span className="text-[15px] text-[#133d30]">
              Dashboard & reporting
            </span>
          </div>

          {/* Item 3 - Conditional Check */}
          <div className="flex items-center gap-3 w-full justify-center">
            <div
              className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${
                type
                  ? "bg-[#133d30] text-white"
                  : "border border-gray-300 text-gray-300"
              }`}
            >
              {/* Icon goes here */}
            </div>
            <span
              className={`text-[15px] ${
                type
                  ? "text-[#133d30]"
                  : "text-gray-400 line-through decoration-gray-300"
              }`}
            >
              Advanced workflows & automation
            </span>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-3 w-full justify-center">
            <div
              className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${
                type
                  ? "bg-[#133d30] text-white"
                  : "border border-gray-300 text-gray-300"
              }`}
            >
              {/* Icon goes here */}
            </div>
            <span
              className={`text-[15px] ${
                type
                  ? "text-[#133d30]"
                  : "text-gray-400 line-through decoration-gray-300"
              }`}
            >
              Email/SMS integration
            </span>
          </div>

          {/* Item 5 */}
          <div className="flex items-center gap-3 w-full justify-center">
            <div
              className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${
                type
                  ? "bg-[#133d30] text-white"
                  : "border border-gray-300 text-gray-300"
              }`}
            >
              {/* Icon goes here */}
            </div>
            <span
              className={`text-[15px] ${
                type
                  ? "text-[#133d30]"
                  : "text-gray-400 line-through decoration-gray-300"
              }`}
            >
              Role-based permissions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
