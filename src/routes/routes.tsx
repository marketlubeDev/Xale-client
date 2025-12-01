import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../Layout/auth/sign-up/SignUp";
import OTPPage from "../Layout/auth/sign-up/OtpPage";
import ErrorPage from "../Layout/ErrorPage";
import LoginPage from "../Layout/auth/login/Login";
import OnBoarding from "../Layout/auth/onBoarding/OnBoarding";
import SetupPassword from "../Layout/auth/sign-up/SetupPassword";
import LayoutOnboardWrapper from "../Layout/auth/components/LayoutOnboardWrapper";
import CollectAddress from "../Layout/auth/onBoarding/CollectAddress";
import SelectPlan from "../Layout/auth/onBoarding/SelectPlan";
import { OnboardingProvider } from "../Layout/auth/contexts/OnboardingContext";

export const router = createBrowserRouter([
  {
    path: "/sign-up",
    element: <SignupPage />,
  },
  {
    path: "/otp-verification",
    element: <OTPPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/onboarding",
    element: (
      <OnboardingProvider>
        <LayoutOnboardWrapper />
      </OnboardingProvider>
    ),
    children: [
      {
        // This matches path: "/onboarding" exactly
        index: true,
        element: <OnBoarding />,
      },
      {
        // This matches path: "/onboarding/company-details"
        path: "company-details",
        element: <CollectAddress />,
      },
      {
        // This matches path: "/onboarding/select-plan"
        path: "select-plan",
        element: <SelectPlan />,
      },
      // You can add more steps here, e.g., "profile", "upload", etc.
    ],
  },
  {
    path: "/create-password",
    element: <SetupPassword />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
