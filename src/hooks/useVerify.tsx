import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosConf";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, setCurrentUser, setToken } from "../../global/authSlice";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function useVerify() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const hasVerified = useRef(false);

  const { mutate, isPending, data, error } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/auth/verify");
      return response.data;
    },
    onSuccess: (res) => {
      const { user } = res;
      dispatch(setCurrentUser(user));
    },
    onError: (e) => {
      console.error(e);
      toast.error("Please login again");
      dispatch(logout());
      navigate("/login", { replace: true });
    },
  });

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const tokenFromParams = searchParams.get("token");

    // 🔥 CASE 1: Token coming from Google OAuth redirect
    if (tokenFromParams) {
      dispatch(setToken(tokenFromParams));

      // 🧹 Clean URL (remove token from query params)
      searchParams.delete("token");
      setSearchParams(searchParams, { replace: true });
    }

    // 🔐 Verify token (either from params OR storage)
    mutate();
  }, [dispatch, mutate, navigate, searchParams, setSearchParams]);

  return {
    verify: mutate,
    isLoading: isPending,
    user: data?.user,
    error,
  };
}
