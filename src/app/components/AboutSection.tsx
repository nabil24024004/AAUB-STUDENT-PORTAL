import { motion } from "framer-motion";
import svgPaths from "../../imports/svg-uzq3257rrw";

interface AboutSectionProps {
  onViewDetails: () => void;
}

export function AboutSection({ onViewDetails }: AboutSectionProps) {
  return (
    <section id="about" className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-[192px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white text-center mb-6 sm:mb-8"
        >
          <h2 className="font-['Kenac',sans-serif] font-bold text-[#0f172a] text-[48px] sm:text-[60px] lg:text-[72px] leading-[72px] tracking-[-1.8px] mb-3">
            About
          </h2>
          <p className="font-['Inter',sans-serif] text-[#475569] text-[18px] sm:text-[20px] lg:text-[24px] leading-[32px] max-w-[672px] mx-auto">
            "A place for learning, discovery, innovation, expression and
            discourse"
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="max-w-[704px] mx-auto mb-6 sm:mb-8"
        >
          <p className="font-['Inter',sans-serif] text-black text-[15px] sm:text-[16px] lg:text-[18px] leading-[32.4px]">
            BAAU Bangladesh is a premier institution dedicated to nurturing the
            next generation of aviation and aerospace professionals. By
            integrating cutting-edge research with practical engineering
            excellence, we bridge the gap between academic theory and the
            evolving demands of the global aerospace industry.
          </p>
        </motion.div>

        {/* Vision & Mission */}
        <div className="max-w-[704px] mx-auto pt-[17px] border-t border-[#e2e8f0] flex flex-col gap-8">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#e67e22] h-[2px] w-12" />
              <h3 className="font-['Kenac',sans-serif] font-semibold text-[#e67e22] text-[24px] sm:text-[30px] leading-[36px] tracking-[1.5px] uppercase">
                Vision
              </h3>
            </div>
            <div className="border-l-4 border-[rgba(17,82,212,0.2)] pl-5">
              <p className="font-['Inter',sans-serif] text-black text-[16px] sm:text-[18px] lg:text-[20px] leading-[32.5px]">
                To be a leading international university in aviation, space, and
                technology, providing quality education and promoting global
                research.
              </p>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#e67e22] h-[2px] w-12" />
              <h3 className="font-['Kenac',sans-serif] font-semibold text-[#e67e22] text-[24px] sm:text-[30px] leading-[36px] tracking-[1.5px] uppercase">
                Mission
              </h3>
            </div>
            <div className="border-l-4 border-[rgba(17,82,212,0.2)] pl-5">
              <p className="font-['Inter',sans-serif] text-[#1e293b] text-[16px] sm:text-[18px] lg:text-[20px] leading-[32.5px]">
                To transform students into world-class professionals equipped
                with the skills to lead the national and global aerospace
                sectors.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="max-w-[704px] mx-auto pt-6 border-t border-[#e2e8f0] mt-8 flex flex-col items-center"
        >
          <p className="font-['Inter',sans-serif] text-[#64748b] text-[14px] sm:text-[16px] leading-[24px] text-center mb-8">
            Want to learn more about our history and campus?
          </p>
          <button
            onClick={() => window.open("https://aaub.edu.bd/content/about-us", "_blank")}
            className="bg-[#4b68e6] rounded-[10px] px-7 py-3 flex items-center gap-3 cursor-pointer hover:bg-[#3a57d5] transition-colors"
          >
            <span className="font-['Inter',sans-serif] font-medium text-white text-[16px] sm:text-[18px] leading-[28px]">
              View Details
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d={svgPaths.p1a406200} fill="white" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
