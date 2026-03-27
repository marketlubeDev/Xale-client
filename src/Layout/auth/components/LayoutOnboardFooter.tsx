import { useNavigate } from "react-router-dom";
import footerIllustration1 from "../../../assets/images/footerIllustration-1.svg";
// import footerIllustration2 from "../../../assets/images/footerIllustration-2.svg";
import { PrimaryButton } from "../../../components/common/Buttons/PrimaryButton";
import XaleFooter from "../../../components/XaleFooter";
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
import { tenantCreate } from "../endpoints";

const IMAGES = [footerIllustration1, "footerIllustration2"];

function LayoutOnboardFooter() {
  const navigate = useNavigate();
  const { user } = useVerify();

  const { isOnBoarded } = useSelector(
    (state: { basic: { isOnBoarded: boolean | null } }) => state.basic
  );

  const { onBoardingHandleSubmit } = useOnboarding();
  const { pathNum } = useGetPathNum(ONBOARDING_STEPS);

  const { mutate: onBoard } = useMutation({
    mutationFn: async (data: OnboardingFormData) => {
      const body = {
        tenantName: data.companyName,
        industryId: Number(data.category),
      };

      const currentTenant = user?.tenant;

      if (!user?.tenantId) {
        return axiosInstance.post(tenantCreate, body);
      }

      const isChangedName = body.tenantName !== currentTenant?.tenantName;
      const isChangedIndustry = body.industryId !== currentTenant?.industryId;

      if (isChangedName || isChangedIndustry) {
        return axiosInstance.patch("/tenant/edit-my-profile", body);
      }

      return Promise.resolve({ data: "No changes detected" });
    },
    onSuccess: () => toast.success("Profile saved"),
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
      navigate(ONBOARDING_STEPS[pathNum - 1] || "/login");
    },
  });

  const handleOnBoardingSubmit = (data: OnboardingFormData) => {
    onBoard(data);
  };

  const handleNext = () => {
    if (pathNum === 0) {
      onBoardingHandleSubmit(handleOnBoardingSubmit)();
      navigate(ONBOARDING_STEPS[1]);
    } else if (pathNum === 1) {
      navigate(ONBOARDING_STEPS[2]);
    }
  };

  const handleBack = () => {
    if (pathNum > 0) {
      navigate(ONBOARDING_STEPS[pathNum - 1]);
    }
  };

  const isFirstStep = pathNum === 0;

  /* -------------------------------------------------------------------------- */
  /* ✅ CONDITIONAL RENDER (SAFE) */
  /* -------------------------------------------------------------------------- */

  if (pathNum === 1) {
    return <></>; // or null, AFTER hooks is fine
  }

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
        <div className="flex justify-start">
          <LightGreenBtn
            style={{
              width: "15rem",
              opacity: isFirstStep ? "0" : "1",
              pointerEvents: isFirstStep ? "none" : "auto",
            }}
            Icon={LeftArrowIcon}
            onClick={handleBack}
          >
            Back
          </LightGreenBtn>
        </div>

        <div className="flex justify-center w-full mb-2">
          <img
            src={IMAGES[pathNum]}
            alt="Footer Illustration"
            className="h-auto object-contain"
            style={{ maxWidth: "100%", maxHeight: "150px" }}
          />
        </div>

        <div className="flex justify-end">
          <PrimaryButton
            style={{ width: "15rem" }}
            onClick={handleNext}
            Icon={RightArrowIcon}
          >
            {pathNum === ONBOARDING_STEPS.length - 1 ? "Finish" : "Continue"}
          </PrimaryButton>
        </div>
      </div>

      <XaleFooter />
    </div>
  );
}

export default LayoutOnboardFooter;
