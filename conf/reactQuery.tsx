import { QueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosConf";

// Optional: Define default query function that uses your axios instance
const defaultQueryFn = async ({
  queryKey,
}: {
  queryKey: readonly unknown[];
}) => {
  const { data } = await axiosInstance.get(queryKey[0] as string);
  return data;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      staleTime: 3 * 60 * 1000, // 3 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      // You can set mutation defaults here if needed
      retry: 1,
    },
  },
});
