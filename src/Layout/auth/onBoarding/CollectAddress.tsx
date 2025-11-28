import { usePreventBack } from "../../../hooks/usePreventBack";
import HeadingGradientTextsGreen from "../../../components/common/Texts/HeadingGradientTexts";
import OnBoardingInputs from "./OnBoardingInputs";
import { LocationIcon } from "../../../utilities/icons";

export default function CollectAddress() {
  usePreventBack();

  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center grow mt-10 z-10 onboarding-anim-2 ">
      {/* Header Section */}
      <HeadingGradientTextsGreen
        top=""
        bottom="Lets brand your CRM"
        gradient="var(--gradient-text-gray)"
      />
      <p
        style={{ marginTop: "-2rem", marginBottom: "5rem" }}
        className="text-b2 text-var(--color-text-gray) flex items-center justify-center  text-nowrap"
      >
        Add your logo and address to complete your personalized setup
      </p>
      <OnBoardingInputs Icon={LocationIcon} />

      <div className="h-20 opacity-0">space</div>
    </div>
  );
}
