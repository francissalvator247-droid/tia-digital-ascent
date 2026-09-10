import { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Printer,
  Users,
  MapPin,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { academicCalendar, type AcademicEvent, type AcademicTermId, SCHOOL } from "@/data/school";
import { Button } from "@/components/ui/button";

export function AcademicCalendarTab() {
  const [selectedTerm, setSelectedTerm] = useState<AcademicTermId | "all">("first-term");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

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

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-navy to-navy-deep text-white p-6 rounded-3xl border border-gold/30 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-gold/20 text-gold font-bold px-2.5 py-0.5 rounded uppercase border border-gold/30">
              Session Schedule
            </span>
            <span className="text-xs text-white/70">
              {SCHOOL.session} · {SCHOOL.term}
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
            Official School Academic Calendar
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-2xl">
            Term resumption dates, continuous assessment windows, revision periods, public holidays,
            and terminal examination milestones.
          </p>
        </div>

        <Button
          onClick={() => window.print()}
          size="sm"
          variant="outline"
          className="bg-white/10 text-white hover:bg-white/20 border-white/20 text-xs font-semibold self-start sm:self-auto gap-1.5"
        >
          <Printer className="w-3.5 h-3.5 text-gold" />
          <span>Print Schedule</span>
        </Button>
      </div>

      {/* Term Selector & Category Filter */}
      <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Term Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTerm("first-term")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedTerm === "first-term"
                ? "bg-navy text-gold shadow-sm"
                : "bg-muted/70 text-muted-foreground hover:text-foreground"
            }`}
          >
            First Term (Current)
          </button>
          <button
            onClick={() => setSelectedTerm("second-term")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedTerm === "second-term"
                ? "bg-navy text-gold shadow-sm"
                : "bg-muted/70 text-muted-foreground hover:text-foreground"
            }`}
          >
            Second Term
          </button>
          <button
            onClick={() => setSelectedTerm("third-term")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedTerm === "third-term"
                ? "bg-navy text-gold shadow-sm"
                : "bg-muted/70 text-muted-foreground hover:text-foreground"
            }`}
          >
            Third Term
          </button>
          <button
            onClick={() => setSelectedTerm("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedTerm === "all"
                ? "bg-gold text-navy-deep shadow-sm"
                : "bg-muted/70 text-muted-foreground hover:text-foreground"
            }`}
          >
            Full Year
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Filter:</span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === c
                  ? "bg-navy text-gold font-bold"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Events Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map((item) => (
          <div
            key={item.id}
            className="bg-card p-5 rounded-2xl border border-border shadow-sm flex flex-col justify-between h-full space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
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

              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-gold" />
                <span>{item.audience}</span>
              </div>
              {item.venue && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  <span>{item.venue}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
