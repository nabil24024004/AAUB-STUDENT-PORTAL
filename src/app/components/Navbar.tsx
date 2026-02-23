import { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import imgAaub1 from "figma:asset/41f88c4974abfcca8d71231b0413ad2fc852764c.png";

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Help", id: "help" },
  ];

  return (
    <nav className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[940px]">
      <div className="backdrop-blur-[3px] bg-[rgba(235,233,230,0.7)] border border-[rgba(119,117,117,0.7)] rounded-[12px] px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-1 shrink-0">
          <img src={imgAaub1} alt="AAUB" className="w-6 h-6 object-cover" />
          <span className="font-['Inter',sans-serif] font-bold text-[20px] text-black">
            AAUB
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`font-['Inter',sans-serif] text-[14px] text-black cursor-pointer relative pb-1 ${
                activeSection === item.id ? "font-semibold" : "font-medium"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#4B68E6] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <SignedOut>
            <button
              onClick={() => onNavigate("login")}
              className="font-['Inter',sans-serif] font-medium text-[14px] text-black px-[15px] py-[6.818px] rounded-[5.455px] cursor-pointer hover:bg-black/5 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => onNavigate("signup")}
              className="bg-[#4b68e6] font-['Inter',sans-serif] font-medium text-[14px] text-white px-[15px] py-[6.818px] rounded-[8px] cursor-pointer hover:bg-[#3a57d5] transition-colors"
            >
              Sign Up
            </button>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </SignedIn>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span
            className={`w-6 h-0.5 bg-black transition-transform ${
              mobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-black transition-opacity ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-black transition-transform ${
              mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 backdrop-blur-[3px] bg-[rgba(235,233,230,0.95)] border border-[rgba(119,117,117,0.7)] rounded-[12px] px-4 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`font-['Inter',sans-serif] text-[14px] text-black text-left py-2 cursor-pointer ${
                activeSection === item.id ? "font-semibold" : "font-medium"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-black/10">
            <SignedOut>
              <button
                onClick={() => {
                  onNavigate("login");
                  setMobileMenuOpen(false);
                }}
                className="font-['Inter',sans-serif] font-medium text-[14px] text-black px-4 py-2 cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => {
                  onNavigate("signup");
                  setMobileMenuOpen(false);
                }}
                className="bg-[#4b68e6] font-['Inter',sans-serif] font-medium text-[14px] text-white px-4 py-2 rounded-[8px] cursor-pointer"
              >
                Sign Up
              </button>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
}
