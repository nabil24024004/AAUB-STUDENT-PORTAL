import { useState } from "react";
import { motion } from "framer-motion";
import svgPaths from "../../imports/svg-uzq3257rrw";

interface FacultyCard {
  id: string;
  title: string[];
  icon: React.ReactNode;
  iconBg: string;
  departments: number;
  badgeActive: boolean;
}

function RocketIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 29.9672 29.9672" fill="none">
      <path d={svgPaths.p2ad20080} fill="#1A56DB" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg width="31" height="27" viewBox="0 0 30.4368 26.1562" fill="none">
      <path d={svgPaths.p18657d00} fill="#F97316" />
    </svg>
  );
}

function SatelliteIcon() {
  return (
    <svg width="35" height="35" viewBox="0 0 34.5234 34.5059" fill="none">
      <path d={svgPaths.p252de400} fill="#6366F1" />
    </svg>
  );
}

function GearPersonIcon() {
  return (
    <svg width="33" height="27" viewBox="0 0 32.9062 27" fill="none">
      <path d={svgPaths.p338d0a80} fill="#0D9488" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12.0234 12.0234" fill="none">
      <path d={svgPaths.p55b9680} fill="white" />
    </svg>
  );
}

const faculties: FacultyCard[] = [
  {
    id: "space",
    title: ["Faculty of Space", "Science, Engineering", "and Applications"],
    icon: <RocketIcon />,
    iconBg: "bg-[#eff6ff]",
    departments: 2,
    badgeActive: true,
  },
  {
    id: "engineering",
    title: ["Faculty of Engineering", "and Technology"],
    icon: <PlaneIcon />,
    iconBg: "bg-[#fff7ed]",
    departments: 0,
    badgeActive: false,
  },
  {
    id: "avionics",
    title: ["Faculty of Avionics", "Engineering"],
    icon: <SatelliteIcon />,
    iconBg: "bg-[#eef2ff]",
    departments: 1,
    badgeActive: true,
  },
  {
    id: "aerospace",
    title: ["Faculty of Aerospace", "Engineering"],
    icon: <GearPersonIcon />,
    iconBg: "bg-[#f0fdfa]",
    departments: 1,
    badgeActive: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function FacultiesSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="bg-[rgba(233,228,223,0.31)] rounded-[23px] shadow-[0px_4px_10px_1px_rgba(0,0,0,0.1),0px_2px_8.6px_-1px_rgba(0,0,0,0.1)] mx-2.5 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-[768px] mx-auto mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="font-['Playfair_Display',serif] font-bold text-[#0a0a0a] text-[28px] sm:text-[32px] lg:text-[36px] leading-[40px] tracking-[-0.9px] mb-4">
            Our Faculties
          </h2>
          <p className="font-['Kenac',sans-serif] text-[#0a0a0a] text-[15px] sm:text-[16px] lg:text-[18px] leading-[29.25px]">
            Academic institutions play a critical role in preparing skilled human
            resources. Explore our
            <br className="hidden sm:block" />
            diverse centers of excellence.
          </p>
        </motion.div>

        {/* Faculty Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12 lg:mb-16"
        >
          {faculties.map((faculty) => (
            <motion.div
              key={faculty.id}
              variants={cardVariants}
              className={`bg-white rounded-[16px] overflow-hidden cursor-pointer transition-all duration-300 ${
                hoveredCard === faculty.id
                  ? "shadow-[0px_8px_20px_2px_rgba(0,0,0,0.15),0px_4px_8px_-2px_rgba(0,0,0,0.06)] -translate-y-1"
                  : "shadow-[0px_4px_10px_1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.03)]"
              } ${
                faculty.id === "engineering"
                  ? "border border-[#f3f4f6]"
                  : ""
              }`}
              onMouseEnter={() => setHoveredCard(faculty.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Content */}
              <div className="flex flex-col items-center p-8">
                <div
                  className={`${faculty.iconBg} w-[80px] h-[80px] rounded-full flex items-center justify-center mb-6`}
                >
                  {faculty.icon}
                </div>
                <div className="text-center">
                  {faculty.title.map((line, i) => (
                    <p
                      key={i}
                      className="font-['Inter',sans-serif] font-semibold text-[#3649da] text-[18px] leading-[24.75px]"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="bg-[#f9fafb] border-t border-[#f3f4f6] px-6 py-4 flex items-center justify-between">
                <span className="font-['Inter',sans-serif] font-medium text-[#64748b] text-[12px] tracking-[0.6px] uppercase">
                  Departments
                </span>
                <span
                  className={`${
                    faculty.badgeActive
                      ? "bg-[#1a56db] text-white"
                      : "bg-[#e5e7eb] text-[#4b5563]"
                  } font-['Inter',sans-serif] font-bold text-[12px] rounded-full px-2.5 py-1 min-w-[24px] text-center`}
                >
                  {faculty.departments}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center"
        >
          <button 
          onClick={() => window.open("https://aaub.edu.bd/faculties", "_blank")}
          className="relative bg-[#4b68e6] text-white font-['Inter',sans-serif] font-medium text-[16px] leading-[24px] px-8 py-[14px] rounded-[9999px] flex items-center gap-2 cursor-pointer shadow-[0px_10px_15px_-3px_rgba(42,69,185,0.4),0px_4px_6px_-4px_rgba(64,76,125,0.2)] hover:bg-[#3a57d5] transition-colors">
            View all Faculties
            <ArrowIcon />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
