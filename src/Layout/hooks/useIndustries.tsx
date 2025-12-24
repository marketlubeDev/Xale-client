import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../conf/axiosConf";
import type { SelectOption } from "../auth/onBoarding/OnBoardingDropDown";

// ✅ API Industry Model
interface Industry {
  id: string;
  name: string;
}

// ✅ Hook Return Type
interface UseIndustriesResult {
  industries: Industry[];
  options: SelectOption[];
  isLoading: boolean;
  error: unknown;
}

export function useIndustries(): UseIndustriesResult {
  const {
    data: industries = [],
    isLoading,
    error,
  } = useQuery<Industry[]>({
    queryKey: ["industries"],
    queryFn: async () => {
      const res = await axiosInstance.get("/platform/industry");
      console.log(res, "res");

      return res.data.industries as Industry[];
    },
  });

  // ✅ Safe Mapping
  const options: SelectOption[] = industries.map((obj) => ({
    label: obj.name,
    value: obj.id,
  }));

  console.log(industries, "indus");

  return { industries, options, isLoading, error };
}
