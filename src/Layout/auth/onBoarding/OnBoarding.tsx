import { Catagory, CompanyIcon } from "../../../utilities/icons";
import { usePreventBack } from "../../../hooks/usePreventBack";
import HeadingGradientTextsGreen from "../../../components/common/Texts/HeadingGradientTexts";
import OnBoardingInputs from "./OnBoardingInputs";
import OnBoardingDropDown from "./OnBoardingDropDown";

export default function OnBoarding() {
  usePreventBack();

  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center grow mt-10 z-10 onboarding-anim-2 ">
      {/* Header Section */}
      <HeadingGradientTextsGreen top="" bottom="Tell us about your company" />
      <p
        style={{ marginTop: "-2rem", marginBottom: "5rem" }}
        className="text-b2 text-var(--color-text-gray) flex items-center justify-center  text-nowrap"
      >
        This helps us to setup your CRM right away
      </p>
      <OnBoardingInputs Icon={CompanyIcon} />
      <OnBoardingDropDown
        Icon={Catagory}
        placeholder="Select your company catagory"
      />
      <div className="h-20 opacity-0">space</div>
    </div>
  );
}
