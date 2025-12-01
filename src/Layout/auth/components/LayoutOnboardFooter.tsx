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
import {
  useOnboarding,
  type OnboardingFormData,
} from "../contexts/OnboardingContext";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../../conf/axiosConf";
import { toast } from "react-toastify";
import useVerify from "../../../hooks/useVerify";

const IMAGES = [footerIllustration1, footerIllustration2, footerIllustration3];

function LayoutOnboardFooter() {
  const navigate = useNavigate();
  const { user } = useVerify();

  const { isOnBoarded } = useSelector(
    (state: { basic: { isOnBoarded: boolean | null } }) => state.basic
  );
  const { onBoardingHandleSubmit } = useOnboarding();

  // Pass the constant array to your hook
  const { pathNum } = useGetPathNum(ONBOARDING_STEPS);

  const { mutate: onBoard } = useMutation({
    mutationFn: async (data: OnboardingFormData) => {
      const body = {
        tenantName: data.companyName,
        industryId: Number(data.category),
      };

      const currentTenant = user?.tenant;

      // ✅ CASE 1: No tenant exists → CREATE
      if (!user?.tenantId) {
        return axiosInstance.post("/auth/create-profile", body);
      }

      // ✅ CASE 2: Tenant exists → CHECK IF UPDATE NEEDED
      const isChangedName = body.tenantName !== currentTenant?.tenantName;
      const isChangedIndustry = body.industryId !== currentTenant?.industryId;

      if (isChangedName || isChangedIndustry) {
        return axiosInstance.patch("/tenant/edit-my-profile", body);
      }

      // ✅ CASE 3: Nothing changed → safe resolve
      return Promise.resolve({ data: "No changes detected" });
    },

    onSuccess: (res) => {
      console.log("✅ SUCCESS:", res);
      toast.success("Profile saved");
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      toast.error(message);
      navigate(ONBOARDING_STEPS[pathNum - 1] || "/login");
    },
  });

  // console.log(pathNum, "num");

  const handleOnBoardingSubmit = (data: OnboardingFormData) => {
    onBoard(data);
  };

  const handleNext = () => {
    if (pathNum === 0) {
      onBoardingHandleSubmit(handleOnBoardingSubmit)();
      navigate(ONBOARDING_STEPS[1]);
      console.log("working");
    } else if (pathNum === 1) {
      navigate(ONBOARDING_STEPS[2]);
    } else if (pathNum === 2) {
      console.log("hitting 3");
    } else {
      console.log(ONBOARDING_STEPS[2]);
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
