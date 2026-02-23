import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useSupabaseClient } from "../../lib/supabase";
import { StudentDashboard } from "./StudentDashboard";
import { FacultyDashboard } from "./FacultyDashboard";
import { OfficeDashboard } from "./OfficeDashboard";
import { Loader2 } from "lucide-react";

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, isLoaded: userLoaded } = useUser();
  const supabase = useSupabaseClient();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userLoaded || !user) return;

    async function loadProfile() {
      // 1. Check localStorage cache first (fast)
      const cachedRole = localStorage.getItem("userRole");
      if (cachedRole) {
        setRole(cachedRole);
        setLoading(false);
        return;
      }

      // 2. No cache — fetch from Supabase
      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("role")
          .eq("id", user!.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching profile:", error);
          // Redirect to onboarding if we can't determine role
          navigate("/onboarding", { replace: true });
          return;
        }

        if (data?.role) {
          // Cache it for next time
          localStorage.setItem("userRole", data.role);
          setRole(data.role);
        } else {
          // No profile exists — user needs onboarding
          navigate("/onboarding", { replace: true });
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        navigate("/onboarding", { replace: true });
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [userLoaded, user, supabase, navigate]);

  if (loading || !userLoaded) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <Loader2
            size={32}
            className="text-[#4B68E6] animate-spin mx-auto mb-3"
          />
          <p className="text-white/50 font-['Inter',sans-serif] text-sm">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  switch (role) {
    case "student":
      return <StudentDashboard />;
    case "faculty":
      return <FacultyDashboard />;
    case "office":
      return <OfficeDashboard />;
    default:
      return null;
  }
}
