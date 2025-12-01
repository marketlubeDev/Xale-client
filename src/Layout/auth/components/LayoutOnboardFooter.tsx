import { useNavigate } from "react-router-dom";
import footerIllustration1 from "../../../assets/images/footerIllustration-1.svg";
import footerIllustration2 from "../../../assets/images/footerIllustration-2.svg";
import footerIllustration3 from "../../../assets/images/footerIllustration-3.svg";
import { PrimaryButton } from "../../../components/common/Buttons/PrimaryButton";
import LinkSection from "../footer/LinkSection";
import { LightGreenBtn } from "../../../components/common/Buttons/LightButton";
import { LeftArrowIcon, RightArrowIcon } from "../../../utilities/icons";
import { useGetPathNum } from "../../../hooks/useGetPathNum";
import { ONBOARDING_STEPS } from "./LayoutOnboardWrapper";
import { useSelector } from "react-redux";

const IMAGES = [footerIllustration1, footerIllustration2, footerIllustration3];

function LayoutOnboardFooter() {
  const navigate = useNavigate();

  const { isOnBoarded } = useSelector(
    (state: { basic: { isOnBoarded: boolean | null } }) => state.basic
  );

  // Pass the constant array to your hook
  const { pathNum } = useGetPathNum(ONBOARDING_STEPS);

  const handleNext = () => {
    // If we are not at the last step, go to the next one
    if (pathNum < ONBOARDING_STEPS.length - 1) {
      navigate(ONBOARDING_STEPS[pathNum + 1]);
    } else {
      // Logic for the final step (e.g., navigate to dashboard)
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    // Explicitly navigate to the previous step in the list
    if (pathNum > 0) {
      navigate(ONBOARDING_STEPS[pathNum - 1]);
    }
  };

  // Determine if we are on the first step to hide the Back button
  const isFirstStep = pathNum === 0;

  return (
    <div
      className={`w-full mt-auto relative z-0 ${
        !isOnBoarded ? "onboarding-anim-2" : ""
      }`}
    >
      <div
        className="w-[90vw] m-auto grid grid-cols-3 items-end gap-8 mb-10 px-6"
        style={{ gridTemplateColumns: "1fr auto 1fr" }}
      >
        {/* Back Button Section */}
        <div className="flex justify-start">
          <LightGreenBtn
            style={{
              width: "15rem",
              opacity: isFirstStep ? "0" : "1",
              // Critical: prevent clicking when hidden
              pointerEvents: isFirstStep ? "none" : "auto",
            }}
            Icon={LeftArrowIcon}
            onClick={handleBack}
          >
            Back
          </LightGreenBtn>
        </div>

        {/* Illustration Section */}
        <div className="flex justify-center w-full mb-2">
          <img
            src={IMAGES[pathNum]}
            alt="Footer Illustration"
            className="h-auto object-contain"
            style={{ maxWidth: "100%", maxHeight: "150px" }}
          />
        </div>

        {/* Continue Button Section */}
        <div className="flex justify-end">
          <PrimaryButton
            style={{ width: "15rem" }}
            onClick={handleNext}
            Icon={RightArrowIcon}
          >
            {/* Change text if it's the last step (optional) */}
            {pathNum === ONBOARDING_STEPS.length - 1 ? "Finish" : "Continue"}
          </PrimaryButton>
        </div>
      </div>

      {/* Links Section */}
      <LinkSection />
    </div>
  );
}

export default LayoutOnboardFooter;
