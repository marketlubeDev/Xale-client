import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Import your custom icons
import axiosInstance from "../../../../conf/axiosConf";
import LayoutWrapper from "../components/LayoutWrapper";
import { PrimaryButton } from "../../../components/common/Buttons/PrimaryButton";
import HeadingGradientTextsGreen from "../../../components/common/Texts/HeadingGradientTexts";
import LargeInput from "../../../components/common/Inputs/LargeInputs";
import HyperLinkTexts from "../../../components/common/Texts/HyperLinkTexts";
import { AppleIcon, FaceBookIcon, GoogleIcon } from "../../../utilities/icons";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormData) => {
      return axiosInstance.post("/auth/login", data);
    },
    onSuccess: (_) => {
      // Assuming response contains token/user info
      toast.success("Welcome back!");
      // Save token logic here if needed (e.g., localStorage.setItem('token', response.data.token))
      navigate("/dashboard");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Invalid credentials. Please try again.";
      toast.error(message);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <LayoutWrapper>
      {/* Main Content Content Wrapper */}
      <div className="w-full max-w-md flex flex-col items-center justify-center grow mt-10 z-10">
        {/* Header Section */}
        <HeadingGradientTextsGreen
          top="Hey there !"
          bottom="Let's get you into your CRM"
          style={{ marginBottom: "5rem" }}
        />

        {/* Form Section */}
        <div className="w-full space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <LargeInput
              type="email"
              placeholder="Enter email"
              error={errors.email}
              // passing validation via register
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
              })}
            />

            {/* Password Field */}
            <LargeInput
              type="password"
              placeholder="Enter password"
              error={errors.password}
              // passing validation via register
              {...register("password", {
                required: "Password is required",
                pattern: { value: /^\S+@\S+$/, message: "Invalid password" },
              })}
            />

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <HyperLinkTexts to="forgot-password">
                Forgot Password?
              </HyperLinkTexts>
            </div>
            {/* Submit Button - Black Pill Shape */}
            <PrimaryButton
              type="submit"
              disabled={isPending}
              style={{ width: "100%" }}
            >
              {isPending ? "Logging in..." : "Login"}
            </PrimaryButton>
            <div className="flex justify-center">
              <HyperLinkTexts to="sign-up">Login With OTP</HyperLinkTexts>
            </div>
          </form>

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
              OR
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="text-center text-sm text-gray-500 mb-4 ">
            Continue with
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center gap-4">
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
