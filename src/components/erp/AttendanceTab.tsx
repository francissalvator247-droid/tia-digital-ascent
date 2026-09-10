import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  Save,
  Users,
  CheckCheck,
} from "lucide-react";
import { classes, students, className } from "@/data/school";
import { useErp } from "@/lib/erp-store";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function AttendanceTab() {
  const { selectedClassId, setSelectedClassId, attendance, markAttendance, saveAttendanceSession } =
    useErp();

  const [date, setDate] = useState("2026-09-10");
  const [filter, setFilter] = useState<string>("All");

  const classStudents = students.filter((s) => s.classId === selectedClassId);

  // Status for student on selected date
  const getStatus = (studentId: string) => {
    const rec = attendance.find((a) => a.studentId === studentId && a.date === date);
    return rec?.status || "present";
  };

  const handleSetStatus = (
    studentId: string,
    status: "present" | "absent" | "late" | "excused",
  ) => {
    markAttendance(studentId, selectedClassId, date, status);
  };

  const handleMarkAllPresent = () => {
    classStudents.forEach((st) => {
      markAttendance(st.id, selectedClassId, date, "present");
    });
    toast.success(`Marked all ${classStudents.length} students as Present`);
  };

  const handleSave = () => {
    saveAttendanceSession(selectedClassId, date);
  };

  // Stats calculation
  const total = classStudents.length;
  const presentCount = classStudents.filter((s) => getStatus(s.id) === "present").length;
  const absentCount = classStudents.filter((s) => getStatus(s.id) === "absent").length;
  const lateCount = classStudents.filter((s) => getStatus(s.id) === "late").length;
  const excusedCount = classStudents.filter((s) => getStatus(s.id) === "excused").length;
  const rate = total > 0 ? Math.round(((presentCount + lateCount) / total) * 100) : 100;

  const filteredStudents =
    filter === "All"
      ? classStudents
      : classStudents.filter((s) => getStatus(s.id).toLowerCase() === filter.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Top Filter & Control Panel */}
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-deep flex items-center gap-2">
              <Users className="w-6 h-6 text-gold" />
              Daily Attendance Register
            </h2>
            <p className="text-xs text-muted-foreground">
              Record and synchronize morning roll call with guardian SMS/notification channels.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleMarkAllPresent}
              variant="outline"
              size="sm"
              className="text-xs font-semibold"
            >
              <CheckCheck className="w-4 h-4 mr-1.5 text-emerald" />
              Mark All Present
            </Button>
            <Button
              onClick={handleSave}
              size="sm"
              className="bg-navy hover:bg-navy-soft text-white font-bold text-xs"
            >
              <Save className="w-4 h-4 mr-1.5 text-gold" />
              Save Register
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Target Class Arm</label>
            <Select value={selectedClassId} onValueChange={setSelectedClassId}>
              <SelectTrigger>
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

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Register Date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Status Filter</label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses ({total})</SelectItem>
                <SelectItem value="present">Present ({presentCount})</SelectItem>
                <SelectItem value="absent">Absent ({absentCount})</SelectItem>
                <SelectItem value="late">Late ({lateCount})</SelectItem>
                <SelectItem value="excused">Excused ({excusedCount})</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Metrics Band */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Class Attendance</div>
            <div className="font-display text-2xl font-bold text-navy-deep">{rate}%</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald/10 text-emerald flex items-center justify-center font-bold">
            P
          </div>
        </div>

        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Present Today</div>
            <div className="font-display text-2xl font-bold text-emerald">{presentCount}</div>
          </div>
          <CheckCircle2 className="w-7 h-7 text-emerald/60" />
        </div>

        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Absent</div>
            <div className="font-display text-2xl font-bold text-red-600">{absentCount}</div>
          </div>
          <XCircle className="w-7 h-7 text-red-500/60" />
        </div>

        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Late / Excused</div>
            <div className="font-display text-2xl font-bold text-amber-600">
              {lateCount + excusedCount}
            </div>
          </div>
          <Clock className="w-7 h-7 text-amber-500/60" />
        </div>
      </div>

      {/* Student Attendance Table */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <div className="font-bold text-xs sm:text-sm text-navy-deep">
            Students in {className(selectedClassId)} ({filteredStudents.length} listed)
          </div>
          <div className="text-[11px] text-muted-foreground">
            Click status pill to toggle roll call
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                <th className="p-3.5">Roll / Name</th>
                <th className="p-3.5">Admission No</th>
                <th className="p-3.5">Gender</th>
                <th className="p-3.5">Current Status</th>
                <th className="p-3.5 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredStudents.map((st, idx) => {
                const currentStatus = getStatus(st.id);

                return (
                  <tr key={st.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3.5 font-bold text-navy-deep flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-navy/10 text-navy flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <span>{st.name}</span>
                    </td>
                    <td className="p-3.5 text-muted-foreground font-mono">{st.admissionNo}</td>
                    <td className="p-3.5 text-muted-foreground">{st.gender}</td>
                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          currentStatus === "present"
                            ? "bg-emerald/15 text-emerald"
                            : currentStatus === "absent"
                              ? "bg-red-500/15 text-red-600"
                              : currentStatus === "late"
                                ? "bg-amber-500/15 text-amber-700"
                                : "bg-blue-500/15 text-blue-700"
                        }`}
                      >
                        {currentStatus === "present" && <CheckCircle2 className="w-3 h-3" />}
                        {currentStatus === "absent" && <XCircle className="w-3 h-3" />}
                        {currentStatus === "late" && <Clock className="w-3 h-3" />}
                        {currentStatus === "excused" && <HelpCircle className="w-3 h-3" />}
                        {currentStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleSetStatus(st.id, "present")}
                          className={`w-7 h-7 rounded text-xs font-bold transition-all ${
                            currentStatus === "present"
                              ? "bg-emerald text-white shadow"
                              : "bg-muted text-muted-foreground hover:bg-emerald/20 hover:text-emerald"
                          }`}
                          title="Mark Present"
                        >
                          P
                        </button>
                        <button
                          onClick={() => handleSetStatus(st.id, "absent")}
                          className={`w-7 h-7 rounded text-xs font-bold transition-all ${
                            currentStatus === "absent"
                              ? "bg-red-600 text-white shadow"
                              : "bg-muted text-muted-foreground hover:bg-red-100 hover:text-red-600"
                          }`}
                          title="Mark Absent"
                        >
                          A
                        </button>
                        <button
                          onClick={() => handleSetStatus(st.id, "late")}
                          className={`w-7 h-7 rounded text-xs font-bold transition-all ${
                            currentStatus === "late"
                              ? "bg-amber-500 text-white shadow"
                              : "bg-muted text-muted-foreground hover:bg-amber-100 hover:text-amber-700"
                          }`}
                          title="Mark Late"
                        >
                          L
                        </button>
                        <button
                          onClick={() => handleSetStatus(st.id, "excused")}
                          className={`w-7 h-7 rounded text-xs font-bold transition-all ${
                            currentStatus === "excused"
                              ? "bg-blue-600 text-white shadow"
                              : "bg-muted text-muted-foreground hover:bg-blue-100 hover:text-blue-700"
                          }`}
                          title="Mark Excused"
                        >
                          E
                        </button>
                      </div>
                    </td>
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
