import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";
import { useSupabaseClient } from "../../lib/supabase";
import {
  GraduationCap,
  BookOpen,
  Building2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Phone,
  Hash,
  Layers,
  Users,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

type UserRole = "student" | "faculty" | "office";

interface RoleOption {
  id: UserRole;
  title: string;
  description: string;
  icon: LucideIcon;
}

const roles: RoleOption[] = [
  {
    id: "student",
    title: "Student",
    description: "Access courses, grades, schedules, and assignments",
    icon: GraduationCap,
  },
  {
    id: "faculty",
    title: "Faculty Member",
    description: "Manage courses, attendance, grading, and students",
    icon: BookOpen,
  },
  {
    id: "office",
    title: "Office Staff",
    description: "Handle applications, records, notices, and reports",
    icon: Building2,
  },
];

const departments = [
  "Department of Space System Engineering",
  "Department of Space Communication and Navigation Technology",
  "Department of Avionics Engineering",
  "Department of Aerospace Engineering",
  "Department of Aviation Operation Management",
  "Department of Science and Humanities",
  "Department of Aviation and Space Law",
  "Department of Aviation Standardization, Regulations and Safety",
  "Department of Aircraft Maintenance Engineering (Avionics)",
  "Department of General Aviaton",
  "Department of Aircraft Maintenance Engineering (Aerospace)",
];

const semesters = [
  "1st Semester",
  "2nd Semester",
  "3rd Semester",
  "4th Semester",
  "5th Semester",
  "6th Semester",
  "7th Semester",
  "8th Semester",
];

const designations = [
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Lecturer",
  "Senior Lecturer",
  "Adjunct Lecturer",
];

const inputClassName =
  "w-full h-[48px] px-4 bg-white/[0.06] border border-white/10 rounded-xl font-['Inter',sans-serif] text-[15px] text-white placeholder:text-[#6b6b80] focus:outline-none focus:ring-2 focus:ring-[#4B68E6]/40 focus:border-[#4B68E6]/50 transition-all";

const selectClassName =
  "w-full h-[48px] px-4 bg-white/[0.06] border border-white/10 rounded-xl font-['Inter',sans-serif] text-[15px] text-white focus:outline-none focus:ring-2 focus:ring-[#4B68E6]/40 focus:border-[#4B68E6]/50 transition-all appearance-none cursor-pointer";

const labelClassName =
  "block font-['Inter',sans-serif] font-medium text-[13px] text-[#a1a1b5] mb-1.5 uppercase tracking-wide";

export function OnboardingPage() {
  const { user, isLoaded: userLoaded } = useUser();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();

  const [checkingProfile, setCheckingProfile] = useState(true);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Guard: redirect to dashboard if user already completed onboarding
  useEffect(() => {
    if (!userLoaded) return;

    // Not signed in — redirect to login
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    // Check localStorage first (fast)
    const cachedRole = localStorage.getItem("userRole");
    if (cachedRole) {
      navigate("/dashboard", { replace: true });
      return;
    }

    // Check Supabase
    async function checkProfile() {
      try {
        const { data } = await supabase
          .from("user_profiles")
          .select("role")
          .eq("id", user!.id)
          .maybeSingle();

        if (data?.role) {
          localStorage.setItem("userRole", data.role);
          navigate("/dashboard", { replace: true });
          return;
        }
      } catch (err) {
        console.error("Profile check error:", err);
      }
      setCheckingProfile(false);
    }

    checkProfile();
  }, [userLoaded, user, supabase, navigate]);

  // Student fields
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");

  // Faculty fields
  const [facultyDepartment, setFacultyDepartment] = useState("");
  const [designation, setDesignation] = useState("");

  // Common field
  const [whatsapp, setWhatsapp] = useState("");

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    // Reset form fields
    setStudentId("");
    setDepartment("");
    setSemester("");
    setFacultyDepartment("");
    setDesignation("");
    setWhatsapp("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Build the profile row for Supabase
      const profileRow: Record<string, string | null> = {
        id: user?.id ?? "",
        role: selectedRole!,
        whatsapp,
        department: null,
        batch: null,
        student_id: null,
        designation: null,
      };

      if (selectedRole === "student") {
        profileRow.student_id = studentId;
        profileRow.department = department;
        profileRow.batch = semester;
      } else if (selectedRole === "faculty") {
        profileRow.department = facultyDepartment;
        profileRow.designation = designation;
      }

      // Save to Supabase
      const { error: dbError } = await supabase
        .from("user_profiles")
        .upsert(profileRow, { onConflict: "id" });

      if (dbError) {
        console.error("Supabase error:", dbError);
        setError(`Database error: ${dbError.message}`);
        setLoading(false);
        return;
      }

      // Also cache in localStorage for fast dashboard loads
      localStorage.setItem("userRole", selectedRole!);
      localStorage.setItem("userProfile", JSON.stringify(profileRow));

      navigate("/dashboard");
    } catch (err) {
      console.error("Submit error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    if (!whatsapp) return false;
    if (selectedRole === "student") {
      return !!studentId && !!department && !!semester;
    }
    if (selectedRole === "faculty") {
      return !!facultyDepartment && !!designation;
    }
    return true; // office only needs whatsapp
  };

  // Show loading while checking if user already onboarded
  if (checkingProfile || !userLoaded) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <Loader2 size={32} className="text-[#4B68E6] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 font-['Inter',sans-serif]">
      <div className="w-full max-w-[640px]">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Welcome, {user?.firstName || "there"}
          </h1>
          <p className="text-[#6b6b80] text-sm">
            {step === 1
              ? "Let's set up your account. Who are you?"
              : "Fill in your details to complete setup"}
          </p>
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div
              className={`h-1 w-12 rounded-full transition-colors ${
                step >= 1 ? "bg-[#4B68E6]" : "bg-white/10"
              }`}
            />
            <div
              className={`h-1 w-12 rounded-full transition-colors ${
                step >= 2 ? "bg-[#4B68E6]" : "bg-white/10"
              }`}
            />
          </div>
        </div>

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className="bg-[#12121c] border border-white/5 rounded-2xl p-6 text-left hover:border-[#4B68E6]/40 hover:bg-[#4B68E6]/5 transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center mb-4 group-hover:bg-[#4B68E6]/10 transition-colors">
                  <role.icon
                    size={22}
                    className="text-[#a1a1b5] group-hover:text-[#4B68E6] transition-colors"
                  />
                </div>
                <h3 className="text-white font-semibold text-[16px] mb-1">
                  {role.title}
                </h3>
                <p className="text-[#6b6b80] text-[13px] leading-relaxed">
                  {role.description}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Role-Specific Form */}
        {step === 2 && selectedRole && (
          <div className="bg-[#12121c] border border-white/5 rounded-2xl p-6 sm:p-8">
            {/* Back button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-[#6b6b80] hover:text-white text-sm mb-6 transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
              Change role
            </button>

            {/* Role badge */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
                {selectedRole === "student" && (
                  <GraduationCap size={16} className="text-[#a1a1b5]" />
                )}
                {selectedRole === "faculty" && (
                  <BookOpen size={16} className="text-[#a1a1b5]" />
                )}
                {selectedRole === "office" && (
                  <Building2 size={16} className="text-[#a1a1b5]" />
                )}
              </div>
              <span className="text-white font-medium text-sm capitalize">
                {selectedRole === "faculty"
                  ? "Faculty Member"
                  : selectedRole}{" "}
                Profile
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Student-specific fields */}
              {selectedRole === "student" && (
                <>
                  <div>
                    <label className={labelClassName}>
                      <Hash size={12} className="inline mr-1" />
                      Student ID
                    </label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. 240101001"
                      required
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className={labelClassName}>
                      <Layers size={12} className="inline mr-1" />
                      Department
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                      className={selectClassName}
                    >
                      <option value="" disabled>
                        Select your department
                      </option>
                      {departments.map((d) => (
                        <option key={d} value={d} className="bg-[#12121c]">
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClassName}>
                      <Users size={12} className="inline mr-1" />
                      Semester
                    </label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      required
                      className={selectClassName}
                    >
                      <option value="" disabled>
                        Select your semester
                      </option>
                      {semesters.map((s) => (
                        <option key={s} value={s} className="bg-[#12121c]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* Faculty-specific fields */}
              {selectedRole === "faculty" && (
                <>
                  <div>
                    <label className={labelClassName}>
                      <Layers size={12} className="inline mr-1" />
                      Department
                    </label>
                    <select
                      value={facultyDepartment}
                      onChange={(e) => setFacultyDepartment(e.target.value)}
                      required
                      className={selectClassName}
                    >
                      <option value="" disabled>
                        Select your department
                      </option>
                      {departments.map((d) => (
                        <option key={d} value={d} className="bg-[#12121c]">
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClassName}>
                      <Briefcase size={12} className="inline mr-1" />
                      Designation
                    </label>
                    <select
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      required
                      className={selectClassName}
                    >
                      <option value="" disabled>
                        Select your designation
                      </option>
                      {designations.map((d) => (
                        <option key={d} value={d} className="bg-[#12121c]">
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* WhatsApp (common for all roles) */}
              <div>
                <label className={labelClassName}>
                  <Phone size={12} className="inline mr-1" />
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+880 1XXX-XXXXXX"
                  required
                  className={inputClassName}
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !isFormValid()}
                className="w-full h-[48px] bg-[#4B68E6] hover:bg-[#3a57d5] text-white font-semibold text-[15px] rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    Continue to Dashboard
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
