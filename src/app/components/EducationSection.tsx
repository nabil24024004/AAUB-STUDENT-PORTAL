import { motion } from "framer-motion";
import svgPaths from "../../imports/svg-uzq3257rrw";

export function EducationSection() {
  return (
    <section className="w-full bg-white rounded-[12px] border border-[#e7e5e4] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] overflow-hidden mx-auto max-w-[1441px]">
      {/* Yellow top bar */}
      <div className="bg-[#f4e225] h-[6px] w-full" />

      {/* Content */}
      <div
        className="relative flex flex-col items-center px-4 sm:px-12 lg:px-24 py-12 sm:py-16 lg:py-24"
        style={{
          backgroundImage:
            "linear-gradient(146.625deg, rgb(255, 255, 255) 0%, rgb(248, 248, 245) 100%)",
        }}
      >
        {/* Background decorative blobs - hidden on mobile */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.02]">
          <svg
            className="absolute -left-[5%] -bottom-[10%] w-[35%] h-auto"
            viewBox="0 0 351.765 397.464"
            fill="none"
          >
            <path d={svgPaths.p1ac0a280} fill="#1C1917" />
          </svg>
          <svg
            className="absolute -right-[5%] -top-[10%] w-[35%] h-auto rotate-180"
            viewBox="0 0 351.765 397.464"
            fill="none"
          >
            <path d={svgPaths.p1ac0a280} fill="#1C1917" />
          </svg>
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 max-w-[768px] text-center mb-6"
        >
          <h2 className="font-['Kenac','Public_Sans',sans-serif] font-black text-[#1c1917] text-[32px] sm:text-[42px] lg:text-[60px] leading-[60px] tracking-[-1.5px] mb-0">
            Explore the possibilities of
          </h2>
          <p className="font-['Kenac','Public_Sans',sans-serif] font-black text-[#1c1917] text-[32px] sm:text-[42px] lg:text-[60px] leading-[60px] tracking-[-1.5px]">
            a{" "}
            <span className="underline decoration-[#f4e225] decoration-solid">
              AAUB
            </span>{" "}
            education
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="relative z-10 max-w-[672px] text-center mb-10"
        >
          <p className="font-['Public_Sans',sans-serif] text-[#57534e] text-[16px] sm:text-[18px] lg:text-[20px] leading-[28px]">
            Join a community of excellence and unlock your future with our
            world-class academic programs designed for the leaders of tomorrow.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="relative z-10 flex flex-wrap gap-4 justify-center"
        >
          <button 
          onClick={() => window.open("http://aaub.teletalk.com.bd/", "_blank")}
          className="bg-[#f4e225] min-w-[180px] h-[56px] rounded-[10px] flex items-center justify-center gap-2 px-8 cursor-pointer hover:bg-[#e5d320] transition-colors">
            <span className="font-['Public_Sans',sans-serif] font-bold text-[#1c1917] text-[16px] leading-[24px]">
              Apply Now
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d={svgPaths.p1a406200} fill="#1C1917" />
            </svg>
          </button>
          <button 
          onClick={() => window.open("http://aaub.edu.bd/", "_blank")}
          className="min-w-[180px] h-[56px] rounded-[10px] border-2 border-[#f4e225] flex items-center justify-center px-8 cursor-pointer hover:bg-[#f4e225]/10 transition-colors">
            <span className="font-['Public_Sans',sans-serif] font-bold text-[#1c1917] text-[16px] leading-[24px]">
              View Requirements
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
