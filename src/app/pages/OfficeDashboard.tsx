import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Megaphone,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Clock,
  Users,
  Inbox,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

export function OfficeDashboard() {
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
    { icon: Inbox, label: "Applications", active: false },
    { icon: FolderOpen, label: "Records", active: false },
    { icon: Megaphone, label: "Notices", active: false },
    { icon: BarChart3, label: "Reports", active: false },
    { icon: HelpCircle, label: "Support", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  const stats = [
    { label: "Pending Applications", value: "24", change: "8 new today", icon: Inbox },
    { label: "Total Students", value: "1,247", change: "+58 this semester", icon: Users },
    { label: "Notices Published", value: "12", change: "3 this week", icon: Megaphone },
    { label: "Support Tickets", value: "7", change: "2 unresolved", icon: HelpCircle },
  ];

  const recentApplications = [
    { name: "Rahim Chowdhury", type: "Admission", status: "Pending", time: "1 hour ago" },
    { name: "Sadia Akter", type: "Transcript", status: "Processing", time: "3 hours ago" },
    { name: "Tanvir Hasan", type: "Certificate", status: "Pending", time: "5 hours ago" },
    { name: "Nusrat Jahan", type: "Transfer", status: "Review", time: "Yesterday" },
  ];

  const recentNotices = [
    { title: "Spring 2026 Registration Open", date: "Feb 22, 2026", views: 342 },
    { title: "Library Hours Extended for Exams", date: "Feb 20, 2026", views: 218 },
    { title: "Campus Maintenance Schedule", date: "Feb 18, 2026", views: 156 },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white font-['Inter',sans-serif]">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#0f0f18] border-r border-white/5 flex flex-col">
        <div className="px-6 py-6 border-b border-white/5">
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-[#4B68E6]">Office</span> Portal
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
              <p className="text-sm font-medium text-white truncate">{user?.fullName || "Staff"}</p>
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
              placeholder="Search applications, records..."
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
              Welcome back, {user?.firstName || "Staff"}
            </h2>
            <p className="text-[#6b6b80] text-sm">Here's your administrative overview for today.</p>
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
            {/* Recent Applications */}
            <div className="xl:col-span-2 bg-[#12121c] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Recent Applications</h3>
                <button className="text-sm text-[#4B68E6] hover:underline cursor-pointer">View All</button>
              </div>
              <div className="space-y-4">
                {recentApplications.map((app, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition-all cursor-pointer group">
                    <div>
                      <p className="text-sm font-medium text-white group-hover:text-[#4B68E6] transition-colors">{app.name}</p>
                      <p className="text-xs text-[#6b6b80] flex items-center gap-1.5">
                        <FileText size={12} />
                        {app.type}
                        <span className="mx-1">·</span>
                        <Clock size={12} />
                        {app.time}
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#4B68E6]/10 text-[#4B68E6]">
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Notices */}
            <div className="bg-[#12121c] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Published Notices</h3>
                <button className="text-sm text-[#4B68E6] hover:underline cursor-pointer">View All</button>
              </div>
              <div className="space-y-4">
                {recentNotices.map((notice, idx) => (
                  <div key={idx} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition-all cursor-pointer">
                    <p className="text-sm font-medium text-white mb-1">{notice.title}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-[#6b6b80] flex items-center gap-1.5">
                        <Clock size={12} />
                        {notice.date}
                      </p>
                      <p className="text-xs text-[#6b6b80]">{notice.views} views</p>
                    </div>
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
