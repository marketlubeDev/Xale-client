import { useNavigate } from "react-router-dom";
import footerIllustration from "../../../assets/images/footerIllustration-1.svg";
import { PrimaryButton } from "../../../components/common/Buttons/PrimaryButton";
import LinkSection from "../footer/LinkSection";
import SecondaryButton from "../../../components/common/Buttons/SecondaryButton";

function LayoutOnboardFooter() {
  const navigate = useNavigate();
  return (
    <div className="w-full mt-auto relative z-0 onboarding-anim-2">
      <div
        className="w-[80vw] m-auto grid grid-cols-3 items-end gap-8 mb-10 px-6"
        style={{ gridTemplateColumns: "1fr auto 1fr" }}
      >
        <div className="flex justify-start">
          <SecondaryButton style={{ opacity: "0" }}>Continue</SecondaryButton>
        </div>
        <div className="flex justify-center w-full mb-2">
          <img
            src={footerIllustration}
            alt="Footer Illustration"
            className="h-auto object-contain"
            style={{ maxWidth: "100%", maxHeight: "150px" }}
          />
        </div>
        <div className="flex justify-end">
          <PrimaryButton
            style={{ width: "width: 18.75rem" }}
            onClick={() => navigate("company-details")}
          >
            Continue
          </PrimaryButton>
        </div>
      </div>

      {/* Links Section */}
      <LinkSection />
    </div>
  );
}
export default LayoutOnboardFooter;
