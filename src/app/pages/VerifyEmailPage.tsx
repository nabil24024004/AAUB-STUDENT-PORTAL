import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";

export function VerifyEmailPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setError("");
    setLoading(true);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        navigate("/onboarding");
      } else {
        setError("Verification could not be completed. Please try again.");
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "Invalid verification code. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded || resending) return;

    setResending(true);
    setResendSuccess(false);
    setError("");

    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 3000);
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "Failed to resend code. Please try again.";
      setError(message);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f9ff] to-[#eef1fb] px-6">
      <div className="w-full max-w-[460px]">
        {/* Back link */}
        <Link
          to="/signup"
          className="flex items-center gap-2 text-[#717182] hover:text-[#030213] transition-colors font-['Inter',sans-serif] text-sm mb-8"
        >
          <ArrowLeft size={18} />
          Back to Sign Up
        </Link>

        {/* Card */}
        <div className="bg-white rounded-[20px] border border-[rgba(0,0,0,0.06)] shadow-[0_8px_40px_rgba(75,104,230,0.08)] p-8 sm:p-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#4B68E6]/10 flex items-center justify-center">
              <MailCheck size={28} className="text-[#4B68E6]" />
            </div>
          </div>

          <h1 className="font-['Inter',sans-serif] font-bold text-[26px] text-[#030213] text-center mb-2">
            Verify Your Email
          </h1>
          <p className="font-['Inter',sans-serif] text-[#717182] text-[15px] text-center mb-8 leading-relaxed">
            We've sent a verification code to your email address.
            <br />
            Please enter it below to continue.
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-['Inter',sans-serif]">
              {error}
            </div>
          )}

          {/* Resend success */}
          {resendSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm font-['Inter',sans-serif]">
              Verification code resent successfully!
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <label
                htmlFor="code"
                className="block font-['Inter',sans-serif] font-medium text-[14px] text-[#030213] mb-1.5"
              >
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                inputMode="numeric"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="w-full h-[52px] px-4 bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] rounded-[10px] font-['Inter',sans-serif] text-[20px] text-center text-[#030213] placeholder:text-[#a0a0b0] placeholder:text-[16px] tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-[#4B68E6]/30 focus:border-[#4B68E6] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !code}
              className="w-full h-[48px] bg-[#4B68E6] hover:bg-[#3a57d5] text-white font-['Inter',sans-serif] font-semibold text-[15px] rounded-[10px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              Verify Email
            </button>
          </form>

          {/* Resend */}
          <p className="text-center font-['Inter',sans-serif] text-[14px] text-[#717182] mt-6">
            Didn't receive a code?{" "}
            <button
              onClick={handleResendCode}
              disabled={resending}
              className="text-[#4B68E6] font-semibold hover:underline cursor-pointer disabled:opacity-50"
            >
              {resending ? "Sending..." : "Resend"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
