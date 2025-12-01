import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import axiosInstance from "../../../../conf/axiosConf";
import { setTokenAndUser } from "../../../../global/authSlice";
import LayoutWrapper from "../components/LayoutWrapper";
// Ensure this path matches your file structure exactly
import HeadingGradientTextsGreen from "../../../components/common/Texts/HeadingGradientTexts";
import { PrimaryButton } from "../../../components/common/Buttons/PrimaryButton";
import Timer from "./Timer";

// --- Validation Schema ---
const otpSchema = z.object({
  otp: z.string().length(6, "Please enter a complete 6-digit code"),
  email: z.string().email().optional(),
});

type OtpFormData = z.infer<typeof otpSchema>;

export default function OTPPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [otpArray, setOtpArray] = useState<string[]>(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);

  console.log("otp page");

  // Retrieve email passed from Signup Page
  const user = location.state?.user;

  // --- Fix 1: Auth Guard with Early Return ---
  // Prevent the component from rendering if user is missing to avoid redirect loops or crashes
  useEffect(() => {
    if (!user?.email) {
      toast.error("Please login first!");
      navigate("/sign-up", { replace: true });
    }
  }, [user, navigate]);

  // If no user, return null so the rest of the component doesn't render while redirecting
  if (!user?.email) return null;

  // Refs to control focus of the 6 input boxes
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Setup React Hook Form
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
      email: user.email,
    },
  });

  // --- API Mutation: Validate OTP ---
  const { mutate: submitOtp, isPending } = useMutation({
    mutationFn: (data: OtpFormData) => {
      return axiosInstance.post("/auth/validate-signup-otp", {
        email: user.email,
        otp: data.otp,
      });
    },
    onSuccess: (response) => {
      const token = response?.data?.token;
      const userData = response?.data?.data?.user;

      dispatch(
        setTokenAndUser({
          token,
          user: userData,
        })
      );
      if (userData?.profileCompletion > 0) {
        navigate("/onboarding", {
          state: { user: userData },
        });
      } else {
        navigate("/create-password", {
          state: { user: userData },
        });
        toast.success("Email Verified Successfully!");
      }
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Invalid OTP. Please try again.";
      toast.error(message);
    },
  });

  // --- API Mutation: Resend OTP ---
  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: () => {
      return axiosInstance.post("/auth/otp-send-again", {
        email: user.email,
      });
    },
    onSuccess: () => {
      toast.success("Code resent successfully!");
      setTimer(30); // Reset timer
      // Clear inputs on resend if desired
      // setOtpArray(new Array(6).fill(""));
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to resend code. Please try again.";
      toast.error(message);
    },
  });

  // Sync Local Array to RHF
  useEffect(() => {
    const otpString = otpArray.join("");
    setValue("otp", otpString);
    if (otpString.length === 6) {
      trigger("otp");
    }
  }, [otpArray, setValue, trigger]);

  // Handle Input Change
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otpArray];
    newOtp[index] = element.value;
    setOtpArray(newOtp);

    // Focus next input
    if (element.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle Paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pastedData.every((char) => !isNaN(Number(char)))) {
      const newOtp = [...otpArray];
      pastedData.forEach((char, index) => {
        if (index < 6) newOtp[index] = char;
      });
      setOtpArray(newOtp);
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const onSubmit = (data: OtpFormData) => {
    submitOtp(data);
  };

  return (
    <LayoutWrapper>
      <div className="w-full max-w-lg mb-[5rem] flex flex-col items-center justify-center grow mt-10 z-10">
        {/* Header Section */}
        <HeadingGradientTextsGreen
          top={user?.profileCompletion > 0 ? "Welcome Back" : "Almost there"}
          bottom="We just sent you a code"
          gradient="var(--gradient-text-gray)"
        />
        <p
          style={{ marginTop: "-2rem", marginBottom: "5rem" }}
          className="text-b2 text-var(--color-text-gray) flex items-center justify-center text-nowrap"
        >
          We just sent a 6-digit code to
          <Link to={"/sign-up"} className="text-b2-bold underline ml-1">
            {user.email}
          </Link>
          . Enter it below to continue
        </p>

        {/* OTP Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center space-y-8"
        >
          {/* 6 Digit Inputs */}
          <div className="flex flex-col w-full">
            <div
              className="flex justify-between w-full"
              style={{ gap: "0.5rem" }}
            >
              {otpArray.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  style={{ border: "1px solid var(--color-black-8)" }}
                  className={`h-12 w-18 text-center text-xl md:text-2xl font-medium border rounded-xl outline-none transition-all bg-white 
                    ${
                      errors.otp
                        ? "border-[var(--color-error)] ring-1 ring-[var(--color-error)]"
                        : data
                        ? "border-[var(--color-black-10)] ring-1 ring-[var(--color-black-10)]"
                        : "border-[var(--color-border-input)] focus:border-[var(--color-black-10)] focus:ring-1 focus:ring-[var(--color-black-10)]"
                    }`}
                />
              ))}
            </div>
            {/* Error Message for OTP */}
            {errors.otp && (
              <p className="mt-2 text-b5 text-[var(--color-error)]">
                {errors.otp.message}
              </p>
            )}
          </div>

          <PrimaryButton
            type="submit"
            disabled={isPending || otpArray.some((digit) => !digit)}
            style={{ width: "100%", opacity: "1" }}
          >
            {isPending ? "Verifying..." : "Verify & Continue"}
          </PrimaryButton>

          {/* Resend Timer */}
          <Timer seconds={timer}>
            <button
              type="button"
              onClick={() => resendOtp()}
              disabled={isResending}
              className="font-medium text-var(--color-black-10) underline hover:text-black transition-colors disabled:opacity-50 disabled:cursor-wait"
            >
              {isResending ? "Resending..." : "Resend code"}
            </button>
          </Timer>
        </form>
      </div>
    </LayoutWrapper>
  );
}
