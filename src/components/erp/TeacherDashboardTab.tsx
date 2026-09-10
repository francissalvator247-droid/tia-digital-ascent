import { useState } from "react";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck,
  GraduationCap,
  Users,
  Award,
  ChevronRight,
  AlertCircle,
  PlusCircle,
} from "lucide-react";
import { useErp } from "@/lib/erp-store";
import { classes, subjects, className, subjectName, SCHOOL } from "@/data/school";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TeacherDashboardTabProps {
  onNavigateTab?: (tab: string) => void;
}

export function TeacherDashboardTab({ onNavigateTab }: TeacherDashboardTabProps) {
  const { results, students, attendance } = useErp();

  // Teacher today's timetable periods
  const todayPeriods = [
    {
      period: 1,
      time: "08:30 – 09:15",
      subject: "Mathematics",
      classId: "c-jss1",
      className: "JSS 1",
      room: "SB 1",
      status: "Completed",
    },
    {
      period: 2,
      time: "09:15 – 10:00",
      subject: "Further Mathematics",
      classId: "c-sss1",
      className: "SSS 1",
      room: "SB 5",
      status: "In Progress",
    },
    {
      period: 4,
      time: "11:00 – 11:45",
      subject: "Basic Science",
      classId: "c-pry5",
      className: "Primary 5",
      room: "PB 5",
      status: "Upcoming",
    },
    {
      period: 6,
      time: "01:00 – 01:45",
      subject: "Remedial Mathematics Clinic",
      classId: "c-jss3",
      className: "JSS 3",
      room: "Library Lab",
      status: "Upcoming",
    },
  ];

  // Assigned classes
  const assigned = [
    {
      classId: "c-jss1",
      name: "JSS 1 (Secondary)",
      subject: "Mathematics",
      studentsCount: 32,
      ca1Status: "Approved",
      ca2Status: "In Review",
      examStatus: "Pending",
    },
    {
      classId: "c-sss1",
      name: "SSS 1 (Secondary)",
      subject: "Further Mathematics",
      studentsCount: 30,
      ca1Status: "Approved",
      ca2Status: "Draft",
      examStatus: "Pending",
    },
    {
      classId: "c-pry5",
      name: "Primary 5 (Basic 5)",
      subject: "Basic Science & Tech",
      studentsCount: 30,
      ca1Status: "Approved",
      ca2Status: "Submitted",
      examStatus: "Pending",
    },
  ];

  // Calculate my pending grades
  const pendingGradesCount = 38;

  return (
    <div className="space-y-6">
      {/* Teacher Banner */}
      <div className="bg-gradient-to-r from-navy to-navy-deep text-white p-6 rounded-3xl border border-gold/30 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-gold/20 text-gold font-bold px-2.5 py-0.5 rounded uppercase border border-gold/30">
              Instructor Hub
            </span>
            <span className="text-xs text-white/70">
              {SCHOOL.session} · {SCHOOL.term}
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
            Teacher Academic Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-2xl">
            Welcome, Mrs. Halima Danjuma. Track daily classroom schedules, student attendance roll
            calls, continuous assessment entries, and syllabus progression.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={() => onNavigateTab && onNavigateTab("attendance")}
            size="sm"
            className="bg-gold text-navy-deep hover:bg-gold-soft font-bold text-xs shadow h-9 px-4 gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Take Roll Call</span>
          </Button>
          <Button
            onClick={() => onNavigateTab && onNavigateTab("gradebook")}
            size="sm"
            variant="outline"
            className="bg-white/10 text-white hover:bg-white/20 border-white/20 text-xs h-9 px-3"
          >
            Enter Scores
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Today's Periods</span>
            <div className="w-8 h-8 rounded-lg bg-navy/10 text-navy-deep flex items-center justify-center">
              <Clock className="w-4 h-4 text-gold" />
            </div>
          </div>
          <div className="font-display text-2xl sm:text-3xl font-bold text-navy-deep">
            4 Periods
          </div>
          <div className="text-[11px] text-emerald font-semibold">1 completed · 1 in progress</div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">My Students</span>
            <div className="w-8 h-8 rounded-lg bg-emerald/10 text-emerald flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display text-2xl sm:text-3xl font-bold text-navy-deep">92</div>
          <div className="text-[11px] text-muted-foreground">Across 3 academic class arms</div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Syllabus Progress</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display text-2xl sm:text-3xl font-bold text-purple-600">74%</div>
          <div className="text-[11px] text-muted-foreground">Term 1 Scheme of Work</div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">CA2 Score Window</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display text-2xl sm:text-3xl font-bold text-amber-600">Open</div>
          <div className="text-[11px] text-muted-foreground">Closes in 5 school days</div>
        </div>
      </div>

      {/* Main Grid: Today's Teaching Schedule & Assigned Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-6 bg-card p-6 rounded-3xl border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-lg text-navy-deep">
                Today's Teaching Schedule
              </h2>
              <p className="text-xs text-muted-foreground">
                Assigned lesson timetable for Thursday, Week 6
              </p>
            </div>
            <Button
              onClick={() => onNavigateTab && onNavigateTab("timetable")}
              size="sm"
              variant="ghost"
              className="text-xs text-gold hover:text-gold font-bold"
            >
              Full Master Timetable →
            </Button>
          </div>

          <div className="space-y-3">
            {todayPeriods.map((p) => (
              <div
                key={p.period}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  p.status === "In Progress"
                    ? "bg-navy/5 border-gold/60 shadow-sm"
                    : p.status === "Completed"
                      ? "bg-muted/30 border-border opacity-75"
                      : "bg-card border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                      p.status === "In Progress"
                        ? "bg-gold text-navy-deep font-black shadow"
                        : p.status === "Completed"
                          ? "bg-emerald/15 text-emerald"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    P{p.period}
                  </div>

                  <div>
                    <div className="font-bold text-foreground text-xs sm:text-sm">{p.subject}</div>
                    <div className="text-[11px] text-muted-foreground">
                      Class: <strong className="text-foreground">{p.className}</strong> · Room:{" "}
                      {p.room}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono text-xs font-semibold text-foreground">{p.time}</div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      p.status === "In Progress"
                        ? "bg-gold/20 text-gold-darker dark:text-gold border border-gold/40"
                        : p.status === "Completed"
                          ? "bg-emerald/15 text-emerald"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Classes & CA Progress */}
        <div className="lg:col-span-6 bg-card p-6 rounded-3xl border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-lg text-navy-deep">
                Assigned Subject Classes
              </h2>
              <p className="text-xs text-muted-foreground">
                Continuous Assessment entry and verification progress
              </p>
            </div>
            <Button
              onClick={() => onNavigateTab && onNavigateTab("gradebook")}
              size="sm"
              variant="ghost"
              className="text-xs text-gold hover:text-gold font-bold"
            >
              Continuous Assessment →
            </Button>
          </div>

          <div className="space-y-3">
            {assigned.map((cls) => (
              <div
                key={cls.classId}
                className="p-4 rounded-2xl bg-muted/30 border border-border space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="font-bold text-foreground text-sm">{cls.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Subject: <strong className="text-foreground">{cls.subject}</strong> ·{" "}
                      {cls.studentsCount} Students
                    </div>
                  </div>
                  <Button
                    onClick={() => onNavigateTab && onNavigateTab("gradebook")}
                    size="sm"
                    className="bg-navy text-gold hover:bg-navy-deep text-xs h-7 px-2.5 font-bold"
                  >
                    Enter Scores
                  </Button>
                </div>

                {/* Score Status Pills */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/70 text-center">
                  <div className="p-2 bg-card rounded-xl border border-border/80">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">
                      CA 1 (20)
                    </div>
                    <div className="text-xs font-bold text-emerald mt-0.5 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{cls.ca1Status}</span>
                    </div>
                  </div>

                  <div className="p-2 bg-card rounded-xl border border-border/80">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">
                      CA 2 (20)
                    </div>
                    <div className="text-xs font-bold text-amber-600 mt-0.5">{cls.ca2Status}</div>
                  </div>

                  <div className="p-2 bg-card rounded-xl border border-border/80">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">
                      Exam (60)
                    </div>
                    <div className="text-xs font-medium text-muted-foreground mt-0.5">
                      {cls.examStatus}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
