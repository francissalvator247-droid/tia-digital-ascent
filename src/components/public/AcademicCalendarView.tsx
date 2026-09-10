import { useState } from "react";
import {
  Calendar as CalendarIcon,
  BookOpen,
  GraduationCap,
  Clock,
  Sparkles,
  Printer,
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Users,
} from "lucide-react";
import { SCHOOL, academicCalendar, type AcademicEvent, type AcademicTermId } from "@/data/school";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { toast } from "sonner";
import type { PublicPage } from "./Header";

interface AcademicCalendarViewProps {
  onNavigate: (page: PublicPage) => void;
  onOpenPortal?: () => void;
}

export function AcademicCalendarView({ onNavigate, onOpenPortal }: AcademicCalendarViewProps) {
  const [selectedTerm, setSelectedTerm] = useState<AcademicTermId | "all">("first-term");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const terms = [
    {
      id: "first-term" as const,
      label: "First Term (Autumn)",
      period: "Sep 8, 2025 – Dec 12, 2025",
      weeks: "14 Weeks",
      focus: "Foundational mastery, CA 1, CA 2 & Term 1 Exams",
    },
    {
      id: "second-term" as const,
      label: "Second Term (Spring)",
      period: "Jan 12, 2026 – Apr 3, 2026",
      weeks: "12 Weeks",
      focus: "STEM exhibition, Ramadan intensive & Mock WAEC",
    },
    {
      id: "third-term" as const,
      label: "Third Term (Summer)",
      period: "Apr 27, 2026 – Jul 24, 2026",
      weeks: "13 Weeks",
      focus: "Promotional examinations, Khatm al-Qur'an & Valedictory",
    },
  ];

  const categories = ["All", "Academic", "Examination", "Tahfiz", "Holiday", "Co-Curricular"];

  const filteredEvents = academicCalendar.filter((ev) => {
    const termMatch = selectedTerm === "all" || ev.term === selectedTerm;
    const catMatch = selectedCategory === "All" || ev.category === selectedCategory;
    return termMatch && catMatch;
  });

  const getCategoryColor = (cat: AcademicEvent["category"]) => {
    switch (cat) {
      case "Examination":
        return "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30";
      case "Tahfiz":
        return "bg-purple-500/15 text-purple-800 dark:text-purple-300 border-purple-500/30";
      case "Holiday":
        return "bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/30";
      case "Co-Curricular":
        return "bg-sky-500/15 text-sky-800 dark:text-sky-300 border-sky-500/30";
      default:
        return "bg-emerald/15 text-emerald-800 dark:text-emerald-300 border-emerald/30";
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Banner */}
      <div className="bg-navy-deep text-white py-16 sm:py-20 relative overflow-hidden border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold font-bold bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
            <CalendarIcon className="w-3.5 h-3.5 text-gold" />
            <span>2025/2026 Session Schedule</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Official Academic Calendar
          </h1>

          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Detailed schedule of school resumption dates, continuous assessment windows, mid-term
            breaks, Qur'anic retention circles, and terminal examination milestones.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={handlePrint}
              variant="outline"
              size="sm"
              className="bg-white/10 text-white hover:bg-white/20 border-white/20 text-xs font-semibold"
            >
              <Printer className="w-3.5 h-3.5 mr-1.5 text-gold" />
              Print / Save Calendar
            </Button>
            {onOpenPortal && (
              <Button
                onClick={onOpenPortal}
                size="sm"
                className="bg-gold text-navy-deep hover:bg-gold-soft font-bold text-xs shadow"
              >
                View in ERP Portal →
              </Button>
            )}
          </div>
        </div>

        {/* Decorative circle */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        {/* Term Switcher Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {terms.map((t) => {
            const isSelected = selectedTerm === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTerm(t.id)}
                className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? "bg-navy text-white border-gold shadow-lg ring-1 ring-gold"
                    : "bg-card hover:bg-muted/50 border-border text-foreground"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected ? "bg-gold text-navy-deep" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {t.weeks}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] text-gold font-bold uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Active View
                    </span>
                  )}
                </div>

                <h3
                  className={`font-display font-bold text-lg ${isSelected ? "text-white" : "text-navy-deep"}`}
                >
                  {t.label}
                </h3>
                <div
                  className={`text-xs mt-1 font-medium ${isSelected ? "text-white/80" : "text-muted-foreground"}`}
                >
                  {t.period}
                </div>
                <p
                  className={`text-[11px] mt-2 leading-relaxed ${isSelected ? "text-white/70" : "text-muted-foreground"}`}
                >
                  {t.focus}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Filter Bar */}
        <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Category:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === c
                      ? "bg-navy text-gold font-bold shadow-sm"
                      : "bg-muted/70 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setSelectedTerm("all")}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all self-start sm:self-auto ${
              selectedTerm === "all"
                ? "bg-gold text-navy-deep font-bold"
                : "text-muted-foreground hover:text-foreground underline underline-offset-4"
            }`}
          >
            {selectedTerm === "all" ? "Viewing Full Year (3 Terms)" : "Show All 3 Terms Overview"}
          </button>
        </div>

        {/* Events Timeline List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-deep">
              Key Academic Dates & Events ({filteredEvents.length})
            </h2>
            <span className="text-xs text-muted-foreground font-medium">
              School Hours: 7:45 AM – 3:30 PM (Mon – Thu), 7:45 AM – 1:00 PM (Fri)
            </span>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="p-12 text-center bg-card rounded-2xl border border-border text-muted-foreground space-y-2">
              <CalendarIcon className="w-10 h-10 mx-auto opacity-30 text-gold" />
              <div className="font-bold text-sm text-foreground">
                No events match the selected category.
              </div>
              <p className="text-xs">
                Choose another filter or select "All" to view the complete schedule.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEvents.map((item, idx) => (
                <Reveal key={item.id} delay={idx * 0.04}>
                  <div className="bg-card p-5 rounded-2xl border border-border hover:border-gold/50 transition-all shadow-sm flex flex-col justify-between h-full space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryColor(
                            item.category,
                          )}`}
                        >
                          {item.category}
                        </span>

                        <div className="flex items-center gap-1.5 text-xs font-bold text-navy dark:text-gold">
                          <Clock className="w-3.5 h-3.5 text-gold" />
                          <span>
                            {item.startDate}
                            {item.endDate && ` → ${item.endDate}`}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-display font-bold text-base sm:text-lg text-navy-deep leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-gold" />
                        <span>{item.audience}</span>
                      </div>
                      {item.venue && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5 text-gold" />
                          <span>{item.venue}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        {/* Tahfiz Halqah & Quranic Schedule Card */}
        <div className="bg-gradient-to-br from-navy to-navy-deep text-white rounded-3xl p-6 sm:p-8 border border-gold/30 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold">
            <BookOpen className="w-4 h-4 text-gold" />
            <span>Integrated Tahfiz & Islamiyya Routine</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Daily Qur'anic Memorization Schedule
          </h3>
          <p className="text-white/80 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Memorization circles are held daily from <strong>7:45am to 8:30am</strong> prior to
            conventional academic periods, with revision halaqat (Muraja'ah) during afternoon
            Islamic Studies windows. Certified Azhari instructors monitor Tajweed and record daily
            Juz progression into the TIA ERP Tahfiz tracker.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-gold font-bold text-sm">Morning Hifz</div>
              <div className="text-xs text-white/70 mt-1">
                7:45am – 8:30am daily (New Sabaq lessons)
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-gold font-bold text-sm">Afternoon Muraja'ah</div>
              <div className="text-xs text-white/70 mt-1">
                1:45pm – 2:30pm (Retention & review of past Juz)
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-gold font-bold text-sm">Weekend Intensive</div>
              <div className="text-xs text-white/70 mt-1">
                Saturdays 9:00am – 12:00pm (Elective Tahfiz Scholars)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
