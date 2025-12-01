import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../../conf/axiosConf";
import { toast } from "react-toastify";
import LayoutWrapper from "../components/LayoutWrapper";
import HeadingGradientTextsGreen from "../../../components/common/Texts/HeadingGradientTexts";
import LargeInput from "../../../components/common/Inputs/LargeInputs";
import { PrimaryButton } from "../../../components/common/Buttons/PrimaryButton";
import HyperLinkTexts from "../../../components/common/Texts/HyperLinkTexts";
import { AppleIcon, FaceBookIcon, GoogleIcon } from "../../../utilities/icons";

// --- Validation Schema ---
const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  console.log("sign-in-page");

  const { mutate, isPending } = useMutation({
    // 🟢 B. The 'mutate' function passes the data here as 'data'
    mutationFn: (data: SignupFormData) => {
      return axiosInstance.post("/auth/signup", data);
    },
    onSuccess: (res) => {
      toast.success("Otp Send Successfully");
      const user = res?.data?.user;
      console.log(res?.data, "data");

      navigate("/otp-verification", {
        state: {
          user,
        },
      });
    },
    onError: (error: any) => {
      // Handle case where error may not have .response
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred. Please try again.";
      toast.error(message);
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    mutate(data);
  };

  return (
    <LayoutWrapper>
      {/* Main Content Content Wrapper */}
      <div className="w-full max-w-md flex flex-col items-center justify-center grow mt-10 z-10">
        {/* Header Section */}
        <HeadingGradientTextsGreen
          top="Hey there"
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

            {/* Submit Button - Black Pill Shape */}
            <PrimaryButton
              type="submit"
              disabled={isPending}
              style={{ width: "100%" }}
            >
              {isPending ? "Processing..." : "Continue"}
            </PrimaryButton>
            <div className="flex justify-center">
              <HyperLinkTexts to="login">Login with password</HyperLinkTexts>
            </div>
          </form>

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="grow border-t border-gray-200"></div>
            <span className="shrink-0 mx-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
              OR
            </span>
            <div className="grow border-t border-gray-200"></div>
          </div>

          <div className="text-center text-sm text-gray-500 mb-4">
            Continue with
          </div>

          {/* Social Login Buttons (Placeholders matching image style) */}
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
