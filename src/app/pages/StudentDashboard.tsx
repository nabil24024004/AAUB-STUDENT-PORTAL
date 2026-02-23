import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  Search,
  TrendingUp,
  Clock,
  Users,
  FileText,
  ChevronRight,
} from "lucide-react";

export function StudentDashboard() {
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
    { icon: BookOpen, label: "Courses", active: false },
    { icon: GraduationCap, label: "Grades", active: false },
    { icon: Calendar, label: "Schedule", active: false },
    { icon: MessageSquare, label: "Messages", active: false },
    { icon: FileText, label: "Assignments", active: false },
    { icon: Users, label: "Community", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  const stats = [
    {
      label: "Enrolled Courses",
      value: "6",
      change: "+2 this semester",
      icon: BookOpen,
    },
    {
      label: "Avg. Grade",
      value: "3.8",
      change: "+0.3 from last",
      icon: TrendingUp,
    },
    {
      label: "Upcoming Exams",
      value: "3",
      change: "Next: Feb 28",
      icon: Clock,
    },
    {
      label: "Assignments Due",
      value: "5",
      change: "2 this week",
      icon: FileText,
    },
  ];

  const recentCourses = [
    { name: "Advanced Mathematics", code: "MATH 301", progress: 72 },
    { name: "Data Structures", code: "CS 201", progress: 85 },
    { name: "Digital Electronics", code: "ECE 202", progress: 58 },
    { name: "Technical Writing", code: "ENG 105", progress: 91 },
  ];

  const upcomingEvents = [
    { title: "Calculus II Lecture", time: "10:00 AM - 11:30 AM", type: "Lecture" },
    { title: "CS Lab Session", time: "2:00 PM - 4:00 PM", type: "Lab" },
    { title: "Study Group - Physics", time: "5:00 PM - 6:30 PM", type: "Group" },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white font-['Inter',sans-serif]">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#0f0f18] border-r border-white/5 flex flex-col">
        <div className="px-6 py-6 border-b border-white/5">
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-[#4B68E6]">Student</span> Portal
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
              <p className="text-sm font-medium text-white truncate">
                {user?.fullName || "Student"}
              </p>
              <p className="text-xs text-[#6b6b80] truncate">
                {user?.primaryEmailAddress?.emailAddress || ""}
              </p>
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
              placeholder="Search courses, assignments..."
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
              Welcome back, {user?.firstName || "Student"}
            </h2>
            <p className="text-[#6b6b80] text-sm">
              Here's what's happening with your academic progress today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#12121c] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group"
              >
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

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-[#12121c] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Course Progress</h3>
                <button className="text-sm text-[#4B68E6] hover:underline cursor-pointer">View All</button>
              </div>
              <div className="space-y-5">
                {recentCourses.map((course) => (
                  <div key={course.code} className="group cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-[#4B68E6] transition-colors">{course.name}</p>
                        <p className="text-xs text-[#6b6b80]">{course.code}</p>
                      </div>
                      <span className="text-sm font-semibold text-[#a1a1b5]">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500 bg-[#4B68E6]/60" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#12121c] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Today's Schedule</h3>
                <button className="text-sm text-[#4B68E6] hover:underline cursor-pointer">Full Calendar</button>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, idx) => (
                  <div key={idx} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition-all cursor-pointer">
                    <p className="text-sm font-medium text-white mb-1">{event.title}</p>
                    <p className="text-xs text-[#6b6b80] flex items-center gap-1.5">
                      <Clock size={12} />
                      {event.time}
                    </p>
                    <span className="mt-2 inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#4B68E6]/10 text-[#4B68E6]">
                      {event.type}
                    </span>
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
