import { useState } from "react";
import { Clock, Calendar, BookOpen, MapPin, Users } from "lucide-react";
import { classes, subjects, className } from "@/data/school";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TimetableTab() {
  const [selectedClassId, setSelectedClassId] = useState("c-jss1a");

  const periods = [
    { time: "08:00 - 08:45", period: "Period 1" },
    { time: "08:45 - 09:30", period: "Period 2" },
    { time: "09:30 - 10:15", period: "Period 3" },
    { time: "10:15 - 10:45", period: "Morning Break" },
    { time: "10:45 - 11:30", period: "Period 4" },
    { time: "11:30 - 12:15", period: "Period 5" },
    { time: "12:15 - 01:00", period: "Period 6" },
    { time: "01:00 - 02:00", period: "Zuhr Salaah & Lunch" },
    { time: "02:00 - 03:30", period: "Tahfiz Circle & Clubs" },
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Weekly schedule matrix
  const schedule: Record<string, string[]> = {
    Monday: [
      "Mathematics",
      "English Studies",
      "Basic Science",
      "Break",
      "Social Studies",
      "Arabic Language",
      "Business Studies",
      "Salaah & Lunch",
      "Tahfiz & Tajweed",
    ],
    Tuesday: [
      "English Studies",
      "Mathematics",
      "Computer / ICT",
      "Break",
      "Basic Tech",
      "Islamic Studies",
      "Civic Education",
      "Salaah & Lunch",
      "Tahfiz & Tajweed",
    ],
    Wednesday: [
      "Basic Science",
      "Basic Tech",
      "Mathematics",
      "Break",
      "English Studies",
      "Agric Science",
      "Creative Arts",
      "Salaah & Lunch",
      "Tahfiz & Tajweed",
    ],
    Thursday: [
      "Islamic Studies",
      "Arabic Language",
      "Computer / ICT",
      "Break",
      "Mathematics",
      "English Studies",
      "Physical Health",
      "Salaah & Lunch",
      "Co-Curricular Clubs",
    ],
    Friday: [
      "Tahfiz Sprint",
      "Islamic History",
      "Jum'ah Prep",
      "Break",
      "Jum'ah Khutbah & Prayer",
      "—",
      "—",
      "—",
      "—",
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header & Selector */}
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-deep flex items-center gap-2">
            <Calendar className="w-6 h-6 text-gold" />
            Class Academic & Tahfiz Timetable
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Structured period allocations harmonizing conventional STEM, languages, and afternoon
            Qur'anic memorization.
          </p>
        </div>

        <div className="w-full sm:w-64">
          <Select value={selectedClassId} onValueChange={setSelectedClassId}>
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {classes.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name} ({c.level})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <span className="font-bold text-xs sm:text-sm text-navy-deep">
            Timetable Schedule: {className(selectedClassId)}
          </span>
          <span className="text-xs text-muted-foreground">Session: 2025/2026 First Term</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                <th className="p-3 w-28">Time Slot</th>
                {days.map((day) => (
                  <th key={day} className="p-3 font-bold text-navy-deep">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {periods.map((p, idx) => {
                const isBreak = p.period.includes("Break") || p.period.includes("Salaah");

                return (
                  <tr
                    key={idx}
                    className={isBreak ? "bg-amber-500/10 font-semibold" : "hover:bg-muted/20"}
                  >
                    <td className="p-3 font-mono text-[11px] text-muted-foreground border-r border-border">
                      <div className="font-bold text-navy-deep">{p.period}</div>
                      <div>{p.time}</div>
                    </td>

                    {days.map((day) => {
                      const subject = schedule[day]?.[idx] ?? "—";
                      const isTahfiz = subject.includes("Tahfiz") || subject.includes("Islamic");

                      return (
                        <td key={day} className="p-3 border-r border-border last:border-0">
                          {isBreak ? (
                            <span className="text-[11px] text-amber-900 font-bold uppercase tracking-wider">
                              {subject}
                            </span>
                          ) : (
                            <div className="space-y-0.5">
                              <span
                                className={`font-semibold ${
                                  isTahfiz ? "text-emerald font-bold" : "text-foreground"
                                }`}
                              >
                                {subject}
                              </span>
                              {subject !== "—" && (
                                <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                                  <MapPin className="w-2.5 h-2.5" />
                                  <span>Room 102</span>
                                </div>
                              )}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
