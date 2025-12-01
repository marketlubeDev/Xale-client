import { createContext, useContext, useEffect, type ReactNode } from "react";
import {
  type UseFormRegister,
  type FieldErrors,
  type UseFormHandleSubmit,
  useForm,
} from "react-hook-form";
import { useIndustries } from "../../hooks/useIndustries";
import type { SelectOption } from "../onBoarding/OnBoardingDropDown";

// ---------------- TYPES ----------------

// ✅ Form Data
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useVerify from "../../../hooks/useVerify";

// Zod schema for Onboarding form validation
export const onboardingSchema = z.object({
  companyName: z.string().min(3, "Company name is required"),
  category: z.string().min(1, "Select an option"),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;

// ✅ Industry structure ONLY
interface IndustryConfigs {
  options: SelectOption[];
}

// ✅ Context Contract
interface OnboardingContextType {
  onBoardingRegister: UseFormRegister<OnboardingFormData>;
  onBoardingErrors: FieldErrors<OnboardingFormData>;
  onBoardingHandleSubmit: UseFormHandleSubmit<OnboardingFormData>;
  industryConfigs: IndustryConfigs;
}

// ---------------- CONTEXT ----------------

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

interface OnboardingProviderProps {
  children: ReactNode;
}

// ---------------- PROVIDER ----------------

function OnboardingProvider({ children }: OnboardingProviderProps) {
  const { user } = useVerify();
  const industryConfigs = useIndustries();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    // No defaultValues here, they will be set with useEffect
  });

  useEffect(() => {
    if (user) {
      reset({
        companyName: user?.tenant?.tenantName,
        category: user?.tenant?.industryId,
      });
    }
  }, [reset, user]);

  const value: OnboardingContextType = {
    onBoardingRegister: register,
    onBoardingErrors: errors,
    onBoardingHandleSubmit: handleSubmit,
    industryConfigs,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

// ---------------- HOOK ----------------

function useOnboarding(): OnboardingContextType {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }

  return context;
}

export { useOnboarding, OnboardingProvider };
