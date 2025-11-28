import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../Layout/auth/sign-up/SignUp";
import OTPPage from "../Layout/auth/sign-up/OtpPage";
import ErrorPage from "../Layout/ErrorPage";
import LoginPage from "../Layout/auth/login/Login";
import OnBoarding from "../Layout/auth/onBoarding/OnBoarding";
import SetupPassword from "../Layout/auth/sign-up/SetupPassword";
import LayoutOnboardWrapper from "../Layout/auth/components/LayoutOnboardWrapper";
import CollectAddress from "../Layout/auth/onBoarding/CollectAddress";

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
    element: <LayoutOnboardWrapper />, // This is the Parent/Layout
    children: [
      {
        // This matches path: "/onboarding" exactly
        index: true,
        // OPTION A: Render the component directly at /onboarding
        element: <OnBoarding />,

        // OPTION B: If you want the URL to automatically change to /onboarding/base
        // element: <Navigate to="base" replace />
      },
      {
        // This matches path: "/onboarding/base"
        path: "company-details",
        element: <CollectAddress />,
      },
      // You can add more steps here, e.g., "profile", "upload", etc.
    ],
  },

  { path: "/create-password", element: <SetupPassword /> },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
