import { motion } from "framer-motion";
import imgNovoair from "figma:asset/ed9400871ffe0b2a14d75f22955b71cf00c72338.png";
import imgEdge from "figma:asset/7d6d8b242e18236d84b1073568f96654a6be12b7.png";
import imgSkyair from "figma:asset/23017413dc7d0083db60f75dafa3cbe638477baf.png";
import imgIitm from "figma:asset/14659dc754d9fdb865345dd7a53018ab58ed7ae6.png";
import imgNorthsouth from "figma:asset/442511a92a7355035002d4921c3aec099fa924c3.png";
import imgSapienza from "figma:asset/07e46f605f2b227580a0436e0c0e09bfbe57f65b.png";

const logoVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const logoItemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function CollaboratorsSection() {
  return (
    <section className="border-2 border-[#e7e5e4] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] overflow-hidden mx-2.5 sm:mx-4">
      {/* Hero Text */}
      <div className="flex flex-col items-center justify-center px-4 sm:px-[54px] py-10 sm:py-[60px] gap-8 sm:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[896px] text-center py-2"
        >
          <div className="mb-3">
            <p className="font-['Kenac','Public_Sans',sans-serif] font-bold text-black text-[32px] sm:text-[40px] lg:text-[48px] leading-[48px] tracking-[-1.2px]">
              Expanding Global
            </p>
            <p className="font-['Kenac','Public_Sans',sans-serif] font-bold text-[#4b68e6] text-[32px] sm:text-[40px] lg:text-[48px] leading-[48px] tracking-[-1.2px]">
              Connectivity
            </p>
          </div>
          <p className="font-['Public_Sans',sans-serif] text-[#73777d] text-[14px] sm:text-[16px] lg:text-[18px] leading-[29.25px] tracking-[2px] max-w-[823px] mx-auto">
            Connecting industry leaders through a secure, high-performance
            network. Our
            <br className="hidden sm:block" />
            ecosystem drives innovation across 45 countries with unmatched
            reliability.
          </p>
        </motion.div>

        {/* Collaboration Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="bg-[rgba(36,27,53,0.03)] border-t border-b border-[rgba(49,38,70,0.4)] w-full px-4 sm:px-8 lg:px-[72px] py-6 sm:py-[41px]"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-[112px] justify-center">
            {/* Heading */}
            <div className="flex flex-col items-center lg:items-start gap-1 shrink-0">
              <div className="flex items-center gap-2">
                <div className="bg-[#ec5b13] w-1 h-4 rounded-full" />
                <span className="font-['Public_Sans',sans-serif] font-bold text-black text-[14px] sm:text-[16px] tracking-[3px] uppercase">
                  Our Collaborations
                </span>
              </div>
              <p className="font-['Public_Sans',sans-serif] font-medium text-[#64748b] text-[12px] tracking-[0.25px]">
                TRUSTED BY INDUSTRY LEADERS
              </p>
            </div>

            {/* Logos */}
            <motion.div
              variants={logoVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="flex flex-wrap items-center justify-center gap-14 sm:gap-16 lg:gap-0 lg:justify-between w-full max-w-[788px]"
            >
              <motion.div variants={logoItemVariants} className="h-[41px] w-[100px] sm:w-[124px] relative overflow-hidden shrink-0">
                <img
                  alt="Novoair"
                  className="absolute h-[345.07%] left-[-8.87%] max-w-none top-[-132.21%] w-[114.44%]"
                  src={imgNovoair}
                />
              </motion.div>
              <motion.div variants={logoItemVariants} className="h-[30px] sm:h-[38px] w-[63px] sm:w-[79px] relative shrink-0">
                <img
                  alt="Edge"
                  className="absolute inset-0 max-w-none object-cover size-full"
                  src={imgEdge}
                />
              </motion.div>
              <motion.div variants={logoItemVariants} className="h-[30px] sm:h-[38px] w-[100px] sm:w-[127px] relative shrink-0">
                <img
                  alt="Skyair"
                  className="absolute inset-0 max-w-none object-cover size-full"
                  src={imgSkyair}
                />
              </motion.div>
              <motion.div variants={logoItemVariants} className="size-[48px] sm:size-[60px] relative shrink-0">
                <img
                  alt="IITM"
                  className="absolute inset-0 max-w-none object-cover size-full"
                  src={imgIitm}
                />
              </motion.div>
              <motion.div variants={logoItemVariants} className="h-[47px] sm:h-[59px] w-[59px] sm:w-[74px] relative shrink-0">
                <img
                  alt="North South"
                  className="absolute inset-0 max-w-none object-cover size-full"
                  src={imgNorthsouth}
                />
              </motion.div>
              <motion.div variants={logoItemVariants} className="h-[48px] sm:h-[60px] w-[100px] sm:w-[124px] relative shrink-0">
                <img
                  alt="Sapienza"
                  className="absolute inset-0 max-w-none object-cover size-full"
                  src={imgSapienza}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}