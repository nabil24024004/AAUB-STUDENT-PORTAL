import imgHeroImage from "figma:asset/dafb87b5fa06b9ee5f6a35823ca40c2d66807caf.png";
import { motion } from "framer-motion";

interface HeroSectionProps {
  isSignedIn: boolean;
  onJoinNow: () => void;
  onLoginDashboard: () => void;
  onGoToDashboard: () => void;
  onSignOut: () => void;
}

export function HeroSection({
  isSignedIn,
  onJoinNow,
  onLoginDashboard,
  onGoToDashboard,
  onSignOut,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-[auto] sm:min-h-[650px] lg:min-h-[90vh] bg-[#fefefe] overflow-hidden pt-[70px] sm:pt-[80px]"
    >
      {/* Text Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[80px] pt-[45px] sm:pt-[90px] lg:pt-[140px]">
        <div className="max-w-full sm:max-w-[660px]">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-['Asgard_Trial',serif] text-black leading-[91.8%] mb-[12px] text-[52px] sm:text-[85px] md:text-[105px] lg:text-[125px]"
          >
            Student Portal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="font-['Kenac',sans-serif] text-black opacity-80 leading-normal max-w-[550px] text-[16px] sm:text-[21px] md:text-[23px] lg:text-[26px]"
          >
            Aviation and Aerospace University Bangladesh
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap gap-3 sm:gap-6 mt-[24px] sm:mt-[44px]"
          >
            {isSignedIn ? (
              <>
                <button
                  onClick={onGoToDashboard}
                  className="bg-[#4b68e6] text-white font-['Inter',sans-serif] font-medium text-[15px] sm:text-[19px] px-5 sm:px-7 py-2.5 sm:py-4 rounded-[12px] cursor-pointer hover:bg-[#3a57d5] transition-colors"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={onSignOut}
                  className="bg-[rgba(224,207,252,0.65)] text-black font-['Inter',sans-serif] font-medium text-[15px] sm:text-[19px] px-5 sm:px-8 py-2.5 sm:py-4 rounded-[12px] border border-[rgba(46,46,46,0.2)] cursor-pointer hover:bg-[rgba(224,207,252,0.85)] transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onJoinNow}
                  className="bg-[#4b68e6] text-white font-['Inter',sans-serif] font-medium text-[15px] sm:text-[19px] px-5 sm:px-7 py-2.5 sm:py-4 rounded-[12px] cursor-pointer hover:bg-[#3a57d5] transition-colors"
                >
                  Join Now
                </button>
                <button
                  onClick={onLoginDashboard}
                  className="bg-[rgba(224,207,252,0.65)] text-black font-['Inter',sans-serif] font-medium text-[15px] sm:text-[19px] px-5 sm:px-8 py-2.5 sm:py-4 rounded-[12px] border border-[rgba(46,46,46,0.2)] cursor-pointer hover:bg-[rgba(224,207,252,0.85)] transition-colors"
                >
                  Login to Dashboard
                </button>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative sm:absolute mt-6 sm:mt-0 sm:top-[105px] lg:top-[130px] right-0 sm:right-[20px] w-full sm:w-[49%] lg:w-[640px] h-[260px] sm:h-[360px] lg:h-[520px]"
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            alt="Hero illustration"
            className="absolute h-[117.46%] left-[-10%] sm:left-[-27.28%] max-w-none top-[-5.59%] w-[120%] sm:w-[146%]"
            src={imgHeroImage}
          />
        </div>
      </motion.div>
    </section>
  );
}