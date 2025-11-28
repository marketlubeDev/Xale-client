import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

// Import your custom icons
import {
  LeadsIcon,
  MailIcon,
  ChevronRightIcon,
  RotateArrowIcon,
} from "../../../utilities/icons";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../../conf/axiosConf";
import { toast } from "react-toastify";

// --- Validation Schema ---
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const navigate = useNavigate();

  // Use your design system variable for icon color
  const iconColor = "var(--color-black-6)";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const { mutate, isPending } = useMutation({
    // 🟢 B. The 'mutate' function passes the data here as 'data'
    mutationFn: (data: SignupFormData) => {
      return axiosInstance.post("/auth/signup", data);
    },
    onSuccess: (_) => {
      toast.success("Otp Send Successfully");
      navigate("/otp-verification", {
        state: {
          email: watch("email"),
        },
      });
    },
    onError: (error: any) => {
      // Handle case where error may not have .response
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "An error occurred. Please try again.";
      console.log(message);
      toast.error(message);
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 bg-gradient-to-b from-blue-50 to-white font-[var(--font-helvetica-neue)] relative overflow-hidden">
      {/* Main Content Content Wrapper */}
      <div className="w-full max-w-md flex flex-col items-center justify-center flex-grow mt-10 z-10">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold text-[var(--color-text-primary)] mb-3 tracking-tight">
            Hey there !
          </h1>
          <h2 className="text-3xl md:text-4xl font-medium text-[var(--color-text-secondary)] tracking-tight">
            Let’s start your XALE
          </h2>
        </div>

        {/* Form Section */}
        <div className="w-full space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name Field */}
            <div className="relative group">
              {/* No Label (Placeholder style as per image) */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LeadsIcon size={20} color={iconColor} />
                </div>
                <input
                  type="text"
                  {...register("name")}
                  className={`w-full pl-11 pr-4 py-3.5 border rounded-xl outline-none transition-all text-b2 text-[var(--color-text-primary)] bg-white shadow-sm
                    ${
                      errors.name
                        ? "border-[var(--color-error)] focus:ring-1 focus:ring-[var(--color-error)]"
                        : "border-[var(--color-border-input)] focus:border-[var(--color-text-primary)] focus:ring-0"
                    }`}
                  placeholder="Your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 ml-1 text-b5 text-[var(--color-error)]">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="relative group">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MailIcon size={20} color={iconColor} />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full pl-11 pr-4 py-3.5 border rounded-xl outline-none transition-all text-b2 text-[var(--color-text-primary)] bg-white shadow-sm
                    ${
                      errors.email
                        ? "border-[var(--color-error)] focus:ring-1 focus:ring-[var(--color-error)]"
                        : "border-[var(--color-border-input)] focus:border-[var(--color-text-primary)] focus:ring-0"
                    }`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 ml-1 text-b5 text-[var(--color-error)]">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit Button - Black Pill Shape */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center bg-[var(--color-black-10)] hover:bg-black text-white font-medium py-3.5 px-4 rounded-full transition-all duration-200 transform hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg mt-4 text-b1-med"
            >
              {isPending ? (
                <>
                  <RotateArrowIcon
                    className="animate-spin mr-2"
                    color="white"
                    size={20}
                  />
                  Processing...
                </>
              ) : (
                <>
                  Continue
                  <span className="ml-2 flex items-center">
                    <ChevronRightIcon color="white" size={20} />
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
              OR
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="text-center text-sm text-gray-500 mb-4">
            Continue with
          </div>

          {/* Social Login Buttons (Placeholders matching image style) */}
          <div className="flex justify-center gap-4">
            {/* Apple */}
            <button className="w-16 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.64 3.98-1.54 2.1.12 3.25 1.15 3.96 2.14-3.54 1.73-2.95 6.64.45 8.05-.72 1.6-1.74 2.76-3.47 3.58zM12.94 5.65c.98-1.39.77-3.07.72-3.41-1.35.13-2.97.94-3.76 2.07-.67.97-.87 2.25-.09 3.54 1.39.06 2.28-.73 3.13-2.2z" />
              </svg>
            </button>
            {/* Google */}
            <button className="w-16 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>
            {/* Facebook */}
            <button className="w-16 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
          </div>

          <div className="text-center mt-6">
            <span className="text-sm text-gray-500">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="text-sm font-medium text-[var(--color-black-10)] hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Illustration & Footer Links */}
      <div className="w-full mt-auto relative z-0">
        <div className="border-t border-gray-200 w-full mb-6"></div>{" "}
        {/* Line similar to image */}
        <div className="flex justify-center space-x-6 pb-6 text-xs text-gray-500">
          <a
            href="#"
            className="hover:text-gray-900 hover:underline transition-colors"
          >
            Terms of use
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="#"
            className="hover:text-gray-900 hover:underline transition-colors"
          >
            Privacy policy
          </a>
        </div>
      </div>
    </div>
  );
}
