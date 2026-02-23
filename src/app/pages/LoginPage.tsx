import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import loginBg from "@/assets/blue-bg.png";
import loginFore from "@/assets/login-fore.png";

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export function LoginPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Second factor state
  const [showEmailCode, setShowEmailCode] = useState(false);
  const [code, setCode] = useState("");

  // Forgot password state
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetCodeSent, setResetCodeSent] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setError("");
    setLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        navigate("/dashboard");
      } else if (signInAttempt.status === "needs_second_factor") {
        const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
          (factor) => factor.strategy === "email_code"
        );
        if (emailCodeFactor && "emailAddressId" in emailCodeFactor) {
          await signIn.prepareSecondFactor({
            strategy: "email_code",
            emailAddressId: emailCodeFactor.emailAddressId,
          });
          setShowEmailCode(true);
        }
      } else {
        setError("Sign-in could not be completed. Please try again.");
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "An error occurred. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setError("");
    setLoading(true);

    try {
      const signInAttempt = await signIn.attemptSecondFactor({
        strategy: "email_code",
        code,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        navigate("/dashboard");
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "Invalid verification code.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Forgot password: send reset code
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setError("");
    setLoading(true);

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setResetCodeSent(true);
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "Could not send reset code. Please check your email.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Forgot password: verify code and set new password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setError("");
    setLoading(true);

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: resetCode,
        password: newPassword,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/dashboard");
      } else {
        setError("Password reset could not be completed. Please try again.");
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "Invalid code or password. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 py-12 bg-white relative">
        {/* Back button */}
        <Link
          to="/"
          className="absolute top-6 left-6 sm:left-12 lg:left-20 flex items-center gap-2 text-[#717182] hover:text-[#030213] transition-colors font-['Inter',sans-serif] text-sm"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="w-full max-w-[420px]">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-['Inter',sans-serif] font-bold text-[32px] text-[#030213] leading-tight mb-2">
              {forgotPassword ? "Reset Password" : "Welcome Back"}
            </h1>
            <p className="font-['Inter',sans-serif] text-[#717182] text-[16px]">
              {forgotPassword
                ? resetCodeSent
                  ? "Enter the code sent to your email and your new password"
                  : "Enter your email to receive a reset code"
                : "Log in to your student portal account"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-['Inter',sans-serif]">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm font-['Inter',sans-serif]">
              {successMessage}
            </div>
          )}

          {forgotPassword ? (
            /* Forgot Password Flow */
            resetCodeSent ? (
              /* Step 2: Enter reset code + new password */
              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label
                    htmlFor="resetCode"
                    className="block font-['Inter',sans-serif] font-medium text-[14px] text-[#030213] mb-1.5"
                  >
                    Reset Code
                  </label>
                  <input
                    id="resetCode"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="one-time-code"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit code"
                    required
                    className="w-full h-[48px] px-4 bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] rounded-[10px] font-['Inter',sans-serif] text-[15px] text-[#030213] placeholder:text-[#a0a0b0] focus:outline-none focus:ring-2 focus:ring-[#4B68E6]/30 focus:border-[#4B68E6] transition-all tracking-[0.3em] text-center"
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block font-['Inter',sans-serif] font-medium text-[14px] text-[#030213] mb-1.5"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter your new password"
                      required
                      className="w-full h-[48px] px-4 pr-12 bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] rounded-[10px] font-['Inter',sans-serif] text-[15px] text-[#030213] placeholder:text-[#a0a0b0] focus:outline-none focus:ring-2 focus:ring-[#4B68E6]/30 focus:border-[#4B68E6] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a0a0b0] hover:text-[#717182] transition-colors cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !resetCode || !newPassword}
                  className="w-full h-[48px] bg-[#4B68E6] hover:bg-[#3a57d5] text-white font-['Inter',sans-serif] font-semibold text-[15px] rounded-[10px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading && <Loader2 size={18} className="animate-spin" />}
                  Reset Password
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setForgotPassword(false);
                    setResetCodeSent(false);
                    setResetCode("");
                    setNewPassword("");
                    setError("");
                    setSuccessMessage("");
                  }}
                  className="w-full text-center font-['Inter',sans-serif] text-[14px] text-[#4B68E6] hover:underline cursor-pointer"
                >
                  Back to Sign In
                </button>
              </form>
            ) : (
              /* Step 1: Enter email to get reset code */
              <form onSubmit={handleForgotPassword} className="space-y-5">
                <div>
                  <label
                    htmlFor="resetEmail"
                    className="block font-['Inter',sans-serif] font-medium text-[14px] text-[#030213] mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="resetEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full h-[48px] px-4 bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] rounded-[10px] font-['Inter',sans-serif] text-[15px] text-[#030213] placeholder:text-[#a0a0b0] focus:outline-none focus:ring-2 focus:ring-[#4B68E6]/30 focus:border-[#4B68E6] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full h-[48px] bg-[#4B68E6] hover:bg-[#3a57d5] text-white font-['Inter',sans-serif] font-semibold text-[15px] rounded-[10px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading && <Loader2 size={18} className="animate-spin" />}
                  Send Reset Code
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setForgotPassword(false);
                    setError("");
                  }}
                  className="w-full text-center font-['Inter',sans-serif] text-[14px] text-[#4B68E6] hover:underline cursor-pointer"
                >
                  Back to Sign In
                </button>
              </form>
            )
          ) : showEmailCode ? (
            /* Verification Code Form */
            <form onSubmit={handleEmailCode} className="space-y-5">
              <p className="text-[#717182] text-sm font-['Inter',sans-serif] mb-2">
                A verification code has been sent to your email.
              </p>
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
                  placeholder="Enter code"
                  className="w-full h-[48px] px-4 bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] rounded-[10px] font-['Inter',sans-serif] text-[15px] text-[#030213] placeholder:text-[#a0a0b0] focus:outline-none focus:ring-2 focus:ring-[#4B68E6]/30 focus:border-[#4B68E6] transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !code}
                className="w-full h-[48px] bg-[#4B68E6] hover:bg-[#3a57d5] text-white font-['Inter',sans-serif] font-semibold text-[15px] rounded-[10px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                Verify
              </button>
            </form>
          ) : (
            /* Sign-In Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-['Inter',sans-serif] font-medium text-[14px] text-[#030213] mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full h-[48px] px-4 bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] rounded-[10px] font-['Inter',sans-serif] text-[15px] text-[#030213] placeholder:text-[#a0a0b0] focus:outline-none focus:ring-2 focus:ring-[#4B68E6]/30 focus:border-[#4B68E6] transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block font-['Inter',sans-serif] font-medium text-[14px] text-[#030213] mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full h-[48px] px-4 pr-12 bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] rounded-[10px] font-['Inter',sans-serif] text-[15px] text-[#030213] placeholder:text-[#a0a0b0] focus:outline-none focus:ring-2 focus:ring-[#4B68E6]/30 focus:border-[#4B68E6] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a0a0b0] hover:text-[#717182] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end mt-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setForgotPassword(true);
                      setError("");
                    }}
                    className="font-['Inter',sans-serif] text-[13px] text-[#4B68E6] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full h-[48px] bg-[#4B68E6] hover:bg-[#3a57d5] text-white font-['Inter',sans-serif] font-semibold text-[15px] rounded-[10px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                Sign In
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[rgba(0,0,0,0.08)]" />
            <span className="text-[#a0a0b0] font-['Inter',sans-serif] text-[13px]">
              or continue with
            </span>
            <div className="flex-1 h-px bg-[rgba(0,0,0,0.08)]" />
          </div>

          {/* LinkedIn Button */}
          <button
            type="button"
            onClick={() => {
              if (!isLoaded) return;
              signIn.authenticateWithRedirect({
                strategy: "oauth_linkedin_oidc",
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/dashboard",
              });
            }}
            className="w-full h-[48px] bg-[#0A66C2] hover:bg-[#004182] text-white font-['Inter',sans-serif] font-semibold text-[15px] rounded-[10px] transition-colors flex items-center justify-center gap-3 cursor-pointer"
          >
            <LinkedInIcon />
            Sign in with LinkedIn
          </button>

          {/* Sign Up Link */}
          <p className="text-center font-['Inter',sans-serif] text-[14px] text-[#717182] mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#4B68E6] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden flex-col items-center justify-start py-20 px-12">
        <img
          src={loginBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#4B68E6]/20 to-[#2a1f6e]/40" />

        {/* Text Content */}
        <div className="relative z-10 text-center max-w-md animate-in fade-in slide-in-from-top-6 duration-1000">
          <h2 className="font-['Playfair_Display',serif] font-bold text-white text-[52px] leading-tight mb-4 drop-shadow-2xl">
            Welcome back to Student Portal
          </h2>
          <p className="font-['Inter',sans-serif] text-blue-50 text-[18px] font-medium drop-shadow-md">
            Access your courses, grades, and university resources
          </p>
        </div>

        {/* Illustration at the bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[110%] max-w-[1000px]">
          <img
            src={loginFore}
            alt="Student Portal Illustration"
            className="w-full h-auto drop-shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
          />
        </div>
      </div>
    </div>
  );
}
