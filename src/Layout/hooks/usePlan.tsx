import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../conf/axiosConf";
import type { SelectOption } from "../auth/onBoarding/OnBoardingDropDown";

// ✅ API Plan Model (Synced with Prisma Schema)
export interface PlanProps {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  currency: string;
  branchLimit: number;
  usersLimit: number;
  leadsLimit: number;
  rolesLimit: number;
  monthlyOffer: number; // Renamed from offer
  yearlyOffer: number;
  trialDays: number;
  isActive: boolean;
  isMostPopular: boolean;
  isCustomPlan: boolean;
  industryId: number;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

// ✅ Hook Return Type
interface UsePlansResult {
  plans: PlanProps[];
  options: SelectOption[];
  isLoading: boolean;
  error: unknown;
}

export function usePlans(): UsePlansResult {
  const {
    data: plans = [],
    isLoading,
    error,
  } = useQuery<PlanProps[]>({
    queryKey: ["plans"],
    queryFn: async () => {
      const res = await axiosInstance.get("/tenant/plan");
      return res.data.data.plans as PlanProps[];
    },
  });

  const options: SelectOption[] = plans
    .filter((plan) => plan.isActive) // Optimize: Only show active plans in dropdowns
    .map((plan) => ({
      label: `${plan.name} (${plan.currency} ${plan.price})`, // Optimize: informative label
      value: plan.id,
    }));

  return { plans, options, isLoading, error };
}
