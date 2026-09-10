import { useState } from "react";
import {
  GraduationCap,
  Calendar,
  BookOpen,
  Award,
  FileText,
  Download,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { students, className, gradeFor, SCHOOL } from "@/data/school";
import { useErp } from "@/lib/erp-store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ReportCardModal } from "./ReportCardModal";

export function StudentPortalTab() {
  const { results } = useErp();
  const [showReport, setShowReport] = useState(false);

  // Default student for demo
  const me = students.find((s) => s.name.includes("Zainab Musa")) || students[0]!;
  const myResults = results.filter((r) => r.studentId === me.id);

  const todayClasses = [
    { time: "08:00 - 08:45", subject: "Mathematics", room: "Room 102", teacher: "Mr. Chukwuma" },
    { time: "08:45 - 09:30", subject: "English Studies", room: "Room 102", teacher: "Mrs. Halima" },
    { time: "09:30 - 10:15", subject: "Basic Science", room: "Lab 1", teacher: "Mr. Danladi" },
    { time: "10:15 - 10:45", subject: "Morning Break", room: "Campus Court", teacher: "—" },
    { time: "10:45 - 11:30", subject: "Social Studies", room: "Room 102", teacher: "Mrs. Bello" },
    {
      time: "01:00 - 02:00",
      subject: "Zuhr Salaah & Lunch",
      room: "School Mosque",
      teacher: "Ustaz",
    },
    {
      time: "02:00 - 03:30",
      subject: "Tahfiz Circle (Surah An-Nisa)",
      room: "Tahfiz Hall",
      teacher: "Ustaz Yusuf",
    },
  ];

  const assignments = [
    {
      title: "Algebraic Factorization Worksheet",
      subject: "Mathematics",
      due: "Tomorrow, 8:00 AM",
      status: "Submitted",
    },
    {
      title: "Tajweed Rules: Ahkam Nun Sakinah",
      subject: "Qur'an Studies",
      due: "Friday, 2:00 PM",
      status: "Pending",
    },
    {
      title: "Basic Science Practical: Photosynthesis",
      subject: "Science",
      due: "Monday, 9:00 AM",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-navy-deep to-navy text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Learner Academic Dashboard</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            As-salamu alaykum, {me.name}!
          </h2>
          <p className="text-white/80 text-xs sm:text-sm">
            Admission No: <span className="font-mono text-gold font-bold">{me.admissionNo}</span> ·{" "}
            {className(me.classId)} · House: <strong className="text-white">{me.house}</strong>
          </p>
        </div>

        <Button
          onClick={() => setShowReport(true)}
          className="bg-gold text-navy-deep font-bold hover:brightness-105 shadow text-xs sm:text-sm"
        >
          <FileText className="w-4 h-4 mr-2" />
          My Term Report Card
        </Button>
      </div>

      {/* Grid: Today's Schedule & My Grades */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Today's Timetable */}
        <div className="lg:col-span-6 bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-display font-bold text-lg text-navy-deep flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold" />
              Today's Academic Schedule
            </h3>
            <span className="text-xs text-muted-foreground font-semibold">Thursday</span>
          </div>

          <div className="space-y-2.5">
            {todayClasses.map((cl, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between text-xs hover:bg-muted/70 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-navy-deep">{cl.subject}</div>
                  <div className="text-muted-foreground text-[11px]">
                    {cl.room} · {cl.teacher}
                  </div>
                </div>
                <div className="font-mono text-gold font-bold text-[11px] bg-navy px-2 py-0.5 rounded">
                  {cl.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Personal Grades & Homework */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-display font-bold text-lg text-navy-deep flex items-center gap-2">
                <Award className="w-5 h-5 text-gold" />
                Continuous Assessment Highlights
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReport(true)}
                className="text-xs text-navy font-semibold"
              >
                Full Details
              </Button>
            </div>

            <div className="space-y-2">
              {myResults.slice(0, 5).map((r) => {
                const total = (r.ca1 ?? 0) + (r.ca2 ?? 0) + (r.exam ?? 0);
                const { grade } = gradeFor(total);

                return (
                  <div
                    key={r.id}
                    className="flex items-center justify-between p-2.5 bg-muted/30 rounded-lg border border-border text-xs"
                  >
                    <span className="font-semibold text-navy-deep">
                      {r.subjectId.replace("s-", "").toUpperCase()}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">
                        CA: {(r.ca1 ?? 0) + (r.ca2 ?? 0)}/40 · Exam: {r.exam ?? 0}/60
                      </span>
                      <span className="font-bold text-emerald text-sm bg-emerald/15 px-2 py-0.5 rounded">
                        {grade} ({total})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assignments */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
            <h3 className="font-display font-bold text-lg text-navy-deep flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gold" />
              Active Assignments & Tasks
            </h3>
            <div className="space-y-2.5 text-xs">
              {assignments.map((as, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-muted/40 border border-border flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-foreground">{as.title}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {as.subject} · Due: {as.due}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      as.status === "Submitted"
                        ? "bg-emerald/15 text-emerald"
                        : "bg-amber-500/15 text-amber-700"
                    }`}
                  >
                    {as.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Report Card Modal */}
      {showReport && (
        <ReportCardModal student={me} results={results} onClose={() => setShowReport(false)} />
      )}
    </div>
  );
}
