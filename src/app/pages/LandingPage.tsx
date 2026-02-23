import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser, useClerk } from "@clerk/clerk-react";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { FacultiesSection } from "../components/FacultiesSection";
import { CollaboratorsSection } from "../components/CollaboratorsSection";
import { AboutSection } from "../components/AboutSection";
import { EducationSection } from "../components/EducationSection";
import { Footer } from "../components/Footer";

export function LandingPage() {
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "help"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
      setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = useCallback(
    (section: string) => {
      if (section === "login") {
        navigate("/login");
        return;
      }
      if (section === "signup") {
        navigate("/signup");
        return;
      }
      setActiveSection(section);
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [navigate]
  );

  const handleJoinNow = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  const handleLoginDashboard = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const handleGoToDashboard = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const handleSignOut = useCallback(async () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userProfile");
    await signOut();
    navigate("/");
  }, [signOut, navigate]);

  const handleViewDetails = useCallback(() => {
    const el = document.getElementById("help");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="bg-[#fefefe] min-h-screen w-full overflow-x-hidden">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <HeroSection
        isSignedIn={!!isSignedIn}
        onJoinNow={handleJoinNow}
        onLoginDashboard={handleLoginDashboard}
        onGoToDashboard={handleGoToDashboard}
        onSignOut={handleSignOut}
      />

      <div className="py-4 sm:py-6">
        <FacultiesSection />
      </div>

      <div className="py-4 sm:py-6">
        <CollaboratorsSection />
      </div>

      <AboutSection onViewDetails={handleViewDetails} />

      <div className="px-2.5 sm:px-4 py-4 sm:py-6">
        <EducationSection />
      </div>

      <Footer />
    </div>
  );
}
