import { useState } from "react";
import {
  Shield,
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  CalendarDays,
  CreditCard,
  ArrowLeft,
  Menu,
  X,
  FileCheck,
  UserCheck,
  UserPlus,
  LogIn,
  RotateCcw,
  LayoutDashboard,
  Bell,
  Volume2,
  History,
  Sparkles,
} from "lucide-react";
import { ROLES, type Role, SCHOOL } from "@/data/school";
import { useErp } from "@/lib/erp-store";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Tab views
import { PrincipalDashboardTab } from "./PrincipalDashboardTab";
import { AdminDashboardTab } from "./AdminDashboardTab";
import { TeacherDashboardTab } from "./TeacherDashboardTab";
import { AccountantDashboardTab } from "./AccountantDashboardTab";
import { AcademicCalendarTab } from "./AcademicCalendarTab";
import { AttendanceTab } from "./AttendanceTab";
import { GradebookTab } from "./GradebookTab";
import { ApprovalCenterTab } from "./ApprovalCenterTab";
import { StudentsTab } from "./StudentsTab";
import { FinanceTab } from "./FinanceTab";
import { TimetableTab } from "./TimetableTab";
import { ParentPortalTab } from "./ParentPortalTab";
import { StudentPortalTab } from "./StudentPortalTab";
import { NotificationsTab } from "./NotificationsTab";
import { AnnouncementsTab } from "./AnnouncementsTab";
import { AuditLogsTab } from "./AuditLogsTab";

interface ErpPortalViewProps {
  onBackToWebsite: () => void;
  onSwitchRole?: () => void;
}

export function ErpPortalView({ onBackToWebsite, onSwitchRole }: ErpPortalViewProps) {
  const { role, setRole, unreadCount } = useErp();
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Set default tab when role changes
  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setActiveTab("dashboard");

    const rObj = ROLES.find((r) => r.id === newRole);
    toast.success(`Role switched to ${rObj?.person} (${newRole.toUpperCase()})`);
  };

  const navItems = [
    {
      id: "dashboard",
      label:
        role === "principal"
          ? "Executive Leadership"
          : role === "admin"
            ? "Admin Dashboard"
            : role === "teacher"
              ? "Teacher Dashboard"
              : role === "accountant"
                ? "Bursary Dashboard"
                : role === "parent"
                  ? "Guardian Portal"
                  : "Learner Portal",
      icon: LayoutDashboard,
      roles: ["principal", "admin", "teacher", "accountant", "parent", "student"],
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      badge: unreadCount,
      roles: ["principal", "admin", "teacher", "accountant", "parent", "student"],
    },
    {
      id: "announcements",
      label: "Announcement Centre",
      icon: Volume2,
      roles: ["principal", "admin"],
    },
    {
      id: "enrolment",
      label: "Admissions Desk",
      icon: UserPlus,
      roles: ["principal", "admin"],
    },
    {
      id: "attendance",
      label: "Attendance Roll Call",
      icon: Users,
      roles: ["principal", "admin", "teacher"],
    },
    {
      id: "gradebook",
      label: "Continuous Assessment",
      icon: BookOpen,
      roles: ["principal", "teacher", "admin"],
    },
    {
      id: "approvals",
      label: "Approval Centre",
      icon: FileCheck,
      roles: ["principal", "admin"],
    },
    {
      id: "audit",
      label: "Audit Log & History",
      icon: History,
      roles: ["principal", "admin", "accountant"],
    },
    {
      id: "students",
      label: "Student Directory",
      icon: UserCheck,
      roles: ["principal", "admin", "teacher"],
    },
    {
      id: "finance",
      label: "Tuition & Invoices",
      icon: CreditCard,
      roles: ["principal", "accountant", "admin", "parent"],
    },
    {
      id: "calendar",
      label: "Academic Calendar",
      icon: CalendarDays,
      roles: ["principal", "admin", "teacher", "accountant", "parent", "student"],
    },
    {
      id: "timetable",
      label: "Class Timetable",
      icon: Calendar,
      roles: ["principal", "admin", "teacher", "parent", "student"],
    },
    { id: "parent", label: "Parent / Guardian View", icon: Users, roles: ["parent", "principal"] },
    {
      id: "student",
      label: "Student Learner View",
      icon: GraduationCap,
      roles: ["student", "principal"],
    },
  ];

  // Filter visible tabs based on current role
  const visibleNav = navItems.filter((item) => item.roles.includes(role));
  const currentRoleObj = ROLES.find((r) => r.id === role) || ROLES[0]!;

  return (
    <div className="min-h-screen bg-muted/20 text-foreground flex flex-col">
      {/* 1. ERP Top Bar */}
      <header className="sticky top-0 z-40 bg-navy-deep text-white border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10"
              aria-label="Toggle ERP Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-gold" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-gold via-gold-soft to-emerald flex items-center justify-center shadow shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-navy-deep" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-sm sm:text-base tracking-wide text-white">
                    TIA ERP PORTAL
                  </span>
                  <span className="text-[10px] bg-gold text-navy-deep font-bold px-2 py-0.5 rounded uppercase">
                    DEMO MODE
                  </span>
                </div>
                <div className="text-[11px] text-white/75 hidden sm:block">
                  {SCHOOL.session} · {SCHOOL.term} · {SCHOOL.name}
                </div>
              </div>
            </div>
          </div>

          {/* Controls: Role Switcher, Notification Bell, Theme Toggle, Back to Website */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Role Switcher Dropdown */}
            <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-white/15">
              <span className="text-[11px] text-white/70 hidden md:inline font-medium">Role:</span>
              <Select value={role} onValueChange={(val) => handleRoleChange(val as Role)}>
                <SelectTrigger className="h-7 text-xs bg-transparent border-0 text-gold font-bold focus:ring-0 p-0 shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.label} ({r.person.split(" ")[0]})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Notification Bell Icon */}
            <button
              onClick={() => setActiveTab("notifications")}
              className={`relative p-2 rounded-lg text-white/90 hover:text-gold hover:bg-white/10 transition-colors ${
                activeTab === "notifications" ? "bg-white/15 text-gold" : ""
              }`}
              title="Notifications Centre"
              aria-label="Notifications Centre"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse shadow">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Switch Role Full Gateway button */}
            {onSwitchRole && (
              <Button
                onClick={onSwitchRole}
                size="sm"
                variant="ghost"
                className="hidden xl:inline-flex text-white/80 hover:text-white hover:bg-white/10 text-xs h-8 px-2.5 gap-1"
                title="Switch Demonstration Stakeholder"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gold" />
                <span>Switch Role</span>
              </Button>
            )}

            {/* Current Account badge (desktop) */}
            <div className="hidden lg:flex flex-col text-right pr-1">
              <span className="text-xs font-bold text-white leading-tight">
                {currentRoleObj.person}
              </span>
              <span className="text-[10px] text-gold font-bold uppercase tracking-wider">
                {currentRoleObj.label}
              </span>
            </div>

            {/* Theme Toggle Button */}
            <ThemeToggle className="text-white hover:text-gold border-white/20 hover:bg-white/10" />

            {/* EXPLICIT PRIMARY "BACK TO WEBSITE" BUTTON */}
            <Button
              onClick={onBackToWebsite}
              size="sm"
              className="bg-gold text-navy-deep hover:bg-gold-soft font-bold text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4 rounded-lg shadow flex items-center gap-1.5 transition-all"
              aria-label="Return to public school website"
            >
              <ArrowLeft className="w-4 h-4 text-navy-deep" />
              <span>Back to Website</span>
            </Button>
          </div>
        </div>

        {/* Global Demo Mode Notice Bar */}
        <div className="bg-gold/15 border-t border-gold/25 py-1 px-4 text-center text-xs text-gold font-medium flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>
            <strong>DEMO MODE</strong> — Authentication will be enabled after deployment · All ERP
            dashboards are directly accessible for board presentation
          </span>
        </div>
      </header>

      {/* 2. Main App Layout (Sidebar + Content) */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 items-start">
        {/* Sidebar Navigation */}
        <aside
          className={`w-full lg:w-64 bg-card rounded-2xl border border-border p-4 shadow-sm space-y-3 shrink-0 ${
            mobileMenuOpen ? "block" : "hidden lg:block"
          }`}
        >
          {/* Mobile Role Switch & Website Quick Links */}
          <div className="lg:hidden pb-3 border-b border-border/80 flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase">Navigation</span>
            <Button
              onClick={onBackToWebsite}
              size="sm"
              variant="outline"
              className="text-xs h-7 gap-1 font-bold border-gold/40 text-gold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </Button>
          </div>

          <nav className="space-y-1">
            {visibleNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const hasBadge = "badge" in item && typeof item.badge === "number" && item.badge > 0;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-navy text-gold shadow-sm font-bold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${isActive ? "text-gold" : "text-muted-foreground"}`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {hasBadge && (
                    <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Profile Card and Back to Website inside Sidebar */}
          <div className="pt-3 border-t border-border space-y-3 text-xs">
            <div className="p-3.5 bg-muted/50 rounded-xl space-y-1.5 border border-border/60">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                Active Session
              </span>
              <div className="font-bold text-foreground text-xs sm:text-sm leading-tight">
                {currentRoleObj.person}
              </div>
              <div className="text-[11px] text-muted-foreground capitalize font-medium">
                Permissions: <strong className="text-foreground">{currentRoleObj.label}</strong>
              </div>
            </div>

            {onSwitchRole && (
              <Button
                onClick={onSwitchRole}
                variant="outline"
                className="w-full text-xs font-semibold h-8 justify-start gap-2 border-border"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gold" />
                <span>Switch Demonstration Role</span>
              </Button>
            )}

            {/* Permanent Back to Website button in sidebar */}
            <Button
              onClick={onBackToWebsite}
              variant="ghost"
              className="w-full text-xs font-bold h-9 justify-start gap-2 text-gold hover:text-gold-foreground hover:bg-gold/15"
            >
              <ArrowLeft className="w-4 h-4 text-gold" />
              <span>← Exit to Public Website</span>
            </Button>
          </div>
        </aside>

        {/* Dynamic Tab Content Area */}
        <main className="flex-1 w-full min-w-0">
          {/* Role-Specific Dashboard Renderer */}
          {activeTab === "dashboard" && (
            <>
              {role === "principal" && (
                <PrincipalDashboardTab onNavigateTab={(tab) => setActiveTab(tab)} />
              )}
              {role === "admin" && <AdminDashboardTab onNavigateTab={(tab) => setActiveTab(tab)} />}
              {role === "teacher" && (
                <TeacherDashboardTab onNavigateTab={(tab) => setActiveTab(tab)} />
              )}
              {role === "accountant" && (
                <AccountantDashboardTab onNavigateTab={(tab) => setActiveTab(tab)} />
              )}
              {role === "parent" && <ParentPortalTab />}
              {role === "student" && <StudentPortalTab />}
            </>
          )}

          {activeTab === "notifications" && (
            <NotificationsTab onNavigateTab={(tab) => setActiveTab(tab)} />
          )}
          {activeTab === "announcements" && <AnnouncementsTab />}
          {activeTab === "audit" && <AuditLogsTab />}
          {activeTab === "enrolment" && (
            <AdminDashboardTab onNavigateTab={(tab) => setActiveTab(tab)} />
          )}
          {activeTab === "calendar" && <AcademicCalendarTab />}
          {activeTab === "attendance" && <AttendanceTab />}
          {activeTab === "gradebook" && <GradebookTab />}
          {activeTab === "approvals" && <ApprovalCenterTab />}
          {activeTab === "students" && <StudentsTab />}
          {activeTab === "finance" && <FinanceTab />}
          {activeTab === "timetable" && <TimetableTab />}
          {activeTab === "parent" && <ParentPortalTab />}
          {activeTab === "student" && <StudentPortalTab />}
        </main>
      </div>
    </div>
  );
}
