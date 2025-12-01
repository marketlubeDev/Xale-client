import { Catagory, CompanyIcon } from "../../../utilities/icons";
import { usePreventBack } from "../../../hooks/usePreventBack";
import HeadingGradientTextsGreen from "../../../components/common/Texts/HeadingGradientTexts";
import OnBoardingInputs from "./OnBoardingInputs";
import OnBoardingDropDown from "./OnBoardingDropDown";
import { useSelector } from "react-redux";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const onBoardingSchema = z.object({
  companyName: z.string().min(1, "Please enter your company name"),
  option: z.string().min(1, "Please select a company category"),
});

type OnboardingFormData = z.infer<typeof onBoardingSchema>;

export default function OnBoarding() {
  usePreventBack();
  const { isOnBoarded } = useSelector(
    (state: { basic: { isOnBoarded: boolean | null } }) => state.basic
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onBoardingSchema),
  });

  return (
    <div
      className={`w-full max-w-md flex flex-col items-center justify-center grow mt-10 z-10 ${
        !isOnBoarded ? "onboarding-anim-2" : ""
      }`}
    >
      {/* Header Section */}
      <HeadingGradientTextsGreen top="" bottom="Tell us about your company" />
      <p
        style={{ marginTop: "-2rem", marginBottom: "5rem" }}
        className="text-b2 text-var(--color-text-gray) flex items-center justify-center  text-nowrap"
      >
        This helps us to setup your CRM right away
      </p>
      <OnBoardingInputs
        Icon={CompanyIcon}
        type="input"
        placeholder="Enter your company name"
        error={errors.companyName}
        {...register("companyName", {
          required: "Company name is required",
        })}
      />
      <OnBoardingDropDown Icon={Catagory} />
      <div className="h-20 opacity-0">space</div>
    </div>
  );
}
