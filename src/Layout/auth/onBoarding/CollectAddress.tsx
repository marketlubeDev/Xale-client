import HeadingGradientTextsGreen from "../../../components/common/Texts/HeadingGradientTexts";
import OnBoardingInputs from "./OnBoardingInputs";
import { LocationIcon } from "../../../utilities/icons";
import { useSelector } from "react-redux";
import ImageUpload from "../../../components/feature/ImageUploader";

export default function CollectAddress() {
  const { isOnBoarded } = useSelector(
    (state: { basic: { isOnBoarded: boolean | null } }) => state.basic
  );
  return (
    <div
      className={`w-full max-w-md flex flex-col items-center justify-center grow mt-10 z-10 ${
        !isOnBoarded ? "onboarding-anim-2" : ""
      }`}
    >
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
      <OnBoardingInputs
        Icon={LocationIcon}
        label="Company address"
        placeholder="Search or type your full address"
      />
      <ImageUpload />
      <OnBoardingInputs
        Icon={LocationIcon}
        label=""
        placeholder="Paste image Url"
      />

      {/* <div className="h-20 opacity-0">space</div> */}
    </div>
  );
}
