import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../conf/axiosConf";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, setTokenAndUser } from "../../global/authSlice";

export default function useVerify() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isPending, data, error } = useMutation({
    mutationFn: async () => {
      // You can pass payload here if needed, e.g., OTP code
      const response = await axiosInstance.post("/auth/verify");
      return response.data;
    },
    onSuccess: (res) => {
      const { user, token } = res;
      dispatch(setTokenAndUser({ token, user }));
    },
    onError: (e) => {
      dispatch(logout());
      navigate("/login");
    },
  });

  // You expose 'verify' (which is the mutate function) to your UI
  return { verify: mutate, isLoading: isPending, data, error };
}
