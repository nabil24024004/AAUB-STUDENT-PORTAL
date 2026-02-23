import { motion } from "framer-motion";
import imgAaub1 from "../../assets/41f88c4974abfcca8d71231b0413ad2fc852764c.png";
import svgPaths from "../../imports/svg-uzq3257rrw";

const footerColumns = [
  {
    heading: "Academic program",
    items: ["Undergraduate", "Graduate", "Doctoral", "Certificate Courses"],
  },
  {
    heading: "annual performance",
    items: [
      "National Correctional",
      "Action Plan & Activities",
      "APA Activies",
      "APA Instructions & Report",
    ],
  },
  {
    heading: "Resources",
    items: [
      "Documentation",
      "Gallery",
      "Mission",
      "Vision",
      "Startups",
      "Web Mail",
    ],
  },
  {
    heading: "university",
    items: ["About", "Careers", "Blog", "Chancellor", "Contact"],
  },
  {
    heading: "Legal",
    items: ["Terms and conditions", "Terms of engagement", "Privacy policy"],
  },
];

function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={svgPaths.p36ae5c00} fill="#6B7280" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <g clipPath="url(#clip_li)">
        <path
          clipRule="evenodd"
          d={svgPaths.pbb77300}
          fill="#6B7280"
          fillRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="clip_li">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <g clipPath="url(#clip_dc)">
        <path d={svgPaths.p2d632420} fill="#6B7280" />
      </g>
      <defs>
        <clipPath id="clip_dc">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        clipRule="evenodd"
        d={svgPaths.p481eb80}
        fill="#6B7280"
        fillRule="evenodd"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        clipRule="evenodd"
        d={svgPaths.p22253480}
        fill="#6B7280"
        fillRule="evenodd"
      />
    </svg>
  );
}

const columnVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const columnItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function Footer() {
  return (
    <footer id="help" className="bg-white px-2.5 sm:px-4 py-8">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[88px] items-start mb-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="shrink-0"
          >
            <img
              src={imgAaub1}
              alt="AAUB Logo"
              className="w-[80px] h-[80px] sm:w-[132px] sm:h-[132px] object-cover"
            />
          </motion.div>

          {/* Footer Links Grid */}
          <motion.div
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 w-full"
          >
            {footerColumns.map((col) => (
              <motion.div key={col.heading} variants={columnItemVariants}>
                <h4 className="font-['Inter',sans-serif] font-medium text-[#6b7280] text-[14px] tracking-[0.35px] uppercase leading-[20px] mb-4">
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-3">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="font-['Inter',sans-serif] font-semibold text-[#111827] text-[14px] leading-[20px] hover:text-[#4b68e6] transition-colors cursor-pointer"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="border-t border-[#e5e7eb] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="font-['Inter',sans-serif] text-[#6b7280] text-[13px] sm:text-[14px] leading-[20px] text-center sm:text-left">
            Copyright &copy; 2026 Aviation and Aerospace
            University Bangladesh all rights reserved 
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:opacity-70 transition-opacity cursor-pointer">
              <TwitterIcon />
            </a>
            {/* <a href="#" className="hover:opacity-70 transition-opacity cursor-pointer">
              <LinkedInIcon />
            </a> */}
            <a href="#" className="hover:opacity-70 transition-opacity cursor-pointer">
              <DiscordIcon />
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity cursor-pointer">
              <GitHubIcon />
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity cursor-pointer">
              <YouTubeIcon />
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
