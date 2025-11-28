import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Import your custom icons
import axiosInstance from "../../../../conf/axiosConf";
import { useEffect } from "react";
import LayoutWrapper from "../components/LayoutWrapper";
import HeadingGradientTextsGreen from "../../../components/common/Texts/HeadingGradientTexts";
import LargeInput from "../../../components/common/Inputs/LargeInputs";
import { PrimaryButton } from "../../../components/common/Buttons/PrimaryButton";
import { AppleIcon, FaceBookIcon, GoogleIcon } from "../../../utilities/icons";
import useVerify from "../../../hooks/useVerify";
import { usePreventBack } from "../../../hooks/usePreventBack";

// --- Validation Schema ---
const setupPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SetupPasswordFormData = z.infer<typeof setupPasswordSchema>;

export default function SetupPassword() {
  usePreventBack();
  const { verify } = useVerify();
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  useEffect(() => {
    verify();
  }, [verify]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.error("Please login first!");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetupPasswordFormData>({
    resolver: zodResolver(setupPasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SetupPasswordFormData) => {
      return axiosInstance.post("/auth/create-password", data);
    },
    onSuccess: (_) => {
      toast.success("Password set successfully!");
      navigate("/");
    },
    onError: (error: any) => {
      console.log(error, "error");

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred. Please try again.";
      toast.error(message);
    },
  });

  const onSubmit = (data: SetupPasswordFormData) => {
    mutate(data);
  };

  return (
    <LayoutWrapper>
      <div className="w-full max-w-md flex flex-col items-center justify-center grow mt-10 z-10">
        {/* Header Section */}
        <div className="text-center mb-10">
          <HeadingGradientTextsGreen
            top="Secure your CRM"
            bottom="Set a password to continue"
            style={{ marginBottom: "0rem" }}
          />
        </div>

        {/* Form Section */}
        <div className="w-full space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Password Field */}
            <LargeInput
              type="password"
              placeholder="Set password"
              error={errors.password}
              // passing validation via register
              {...register("password", {
                required: "Password is required",
              })}
            />

            {/* Confirm Password Field */}
            <LargeInput
              type="password"
              placeholder="Confirm Password"
              error={errors.password}
              // passing validation via register
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
            />

            <PrimaryButton
              type="submit"
              disabled={isPending}
              style={{ width: "100%" }}
            >
              {isPending ? "Setting Password..." : "Set Password"}
            </PrimaryButton>
          </form>
          <div className="flex justify-center gap-4 opacity-0">
            {/* Apple */}
            <AppleIcon />
            {/* Google */}
            <GoogleIcon />
            {/* Facebook */}
            <FaceBookIcon />
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
