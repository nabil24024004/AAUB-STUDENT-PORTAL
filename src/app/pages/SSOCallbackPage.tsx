import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

export function SSOCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-[#4B68E6] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/60 font-['Inter',sans-serif] text-sm">
          Completing sign-in...
        </p>
      </div>
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
