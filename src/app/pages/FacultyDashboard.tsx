import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardCheck,
  Award,
  Calendar,
  Settings,
  LogOut,
  Bell,
  Search,
  Clock,
  FileText,
  ChevronRight,
} from "lucide-react";

export function FacultyDashboard() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userProfile");
    await signOut();
    navigate("/");
  };

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: BookOpen, label: "My Courses", active: false },
    { icon: Users, label: "Students", active: false },
    { icon: ClipboardCheck, label: "Attendance", active: false },
    { icon: Award, label: "Grading", active: false },
    { icon: Calendar, label: "Schedule", active: false },
    { icon: FileText, label: "Resources", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  const stats = [
    { label: "Classes Today", value: "4", change: "Next at 10:00 AM", icon: BookOpen },
    { label: "Total Students", value: "127", change: "Across 4 courses", icon: Users },
    { label: "Pending Grades", value: "18", change: "Due by Mar 5", icon: Award },
    { label: "Office Hours", value: "2h", change: "Today 3-5 PM", icon: Clock },
  ];

  const myCourses = [
    { name: "Aerodynamics I", code: "AERO 201", students: 32, section: "A" },
    { name: "Flight Mechanics", code: "AERO 305", students: 28, section: "B" },
    { name: "Aircraft Structures", code: "AERO 401", students: 35, section: "A" },
    { name: "Propulsion Systems", code: "AERO 310", students: 32, section: "C" },
  ];

  const recentSubmissions = [
    { student: "Ahmed Rahman", assignment: "Aerodynamics Lab Report", time: "2 hours ago" },
    { student: "Fatima Hassan", assignment: "Flight Mechanics HW #5", time: "4 hours ago" },
    { student: "Karim Uddin", assignment: "Structures Mid-term", time: "Yesterday" },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white font-['Inter',sans-serif]">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#0f0f18] border-r border-white/5 flex flex-col">
        <div className="px-6 py-6 border-b border-white/5">
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-[#4B68E6]">Faculty</span> Portal
          </h1>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all cursor-pointer ${
                item.active
                  ? "bg-[#4B68E6]/10 text-[#4B68E6]"
                  : "text-[#6b6b80] hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4B68E6] to-[#8B5CF6] flex items-center justify-center text-white text-sm font-semibold">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.fullName || "Faculty"}</p>
              <p className="text-xs text-[#6b6b80] truncate">{user?.primaryEmailAddress?.emailAddress || ""}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] font-medium text-[#6b6b80] hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-white/5 bg-[#0f0f18]/80 backdrop-blur-xl flex items-center justify-between px-8">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6b80]" />
            <input
              type="text"
              placeholder="Search students, courses..."
              className="w-[320px] h-10 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-[#6b6b80] focus:outline-none focus:ring-2 focus:ring-[#4B68E6]/30 focus:border-[#4B68E6]/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
              <Bell size={18} className="text-[#6b6b80]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4B68E6] to-[#8B5CF6] flex items-center justify-center text-white text-sm font-semibold">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-1">
              Welcome back, {user?.firstName || "Professor"}
            </h2>
            <p className="text-[#6b6b80] text-sm">Here's your teaching overview for today.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[#12121c] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.06]">
                    <stat.icon size={20} className="text-[#a1a1b5]" />
                  </div>
                  <ChevronRight size={16} className="text-[#6b6b80] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-[#6b6b80]">{stat.label}</p>
                <p className="text-xs mt-2 text-[#6b6b80]">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* My Courses */}
            <div className="xl:col-span-2 bg-[#12121c] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">My Courses</h3>
                <button className="text-sm text-[#4B68E6] hover:underline cursor-pointer">View All</button>
              </div>
              <div className="space-y-4">
                {myCourses.map((course) => (
                  <div key={course.code} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition-all cursor-pointer group">
                    <div>
                      <p className="text-sm font-medium text-white group-hover:text-[#4B68E6] transition-colors">{course.name}</p>
                      <p className="text-xs text-[#6b6b80]">{course.code} · Section {course.section}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-[#6b6b80]" />
                      <span className="text-sm text-[#a1a1b5]">{course.students}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="bg-[#12121c] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Recent Submissions</h3>
                <button className="text-sm text-[#4B68E6] hover:underline cursor-pointer">View All</button>
              </div>
              <div className="space-y-4">
                {recentSubmissions.map((sub, idx) => (
                  <div key={idx} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition-all cursor-pointer">
                    <p className="text-sm font-medium text-white mb-1">{sub.student}</p>
                    <p className="text-xs text-[#6b6b80] mb-1">{sub.assignment}</p>
                    <p className="text-xs text-[#6b6b80] flex items-center gap-1.5">
                      <Clock size={12} />
                      {sub.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
