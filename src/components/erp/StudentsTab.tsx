import { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Eye,
  FileText,
  UserCheck,
  Shield,
  Heart,
  BookOpen,
} from "lucide-react";
import { classes, className, type Student, attendanceSummary } from "@/data/school";
import { useErp } from "@/lib/erp-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReportCardModal } from "./ReportCardModal";

export function StudentsTab() {
  const { results, students } = useErp();
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [reportStudent, setReportStudent] = useState<Student | null>(null);

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
      (s.guardian && s.guardian.toLowerCase().includes(search.toLowerCase()));
    const matchesClass = selectedClass === "All" || s.classId === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-deep flex items-center gap-2">
              <Users className="w-6 h-6 text-gold" />
              Student Directory & Enrolment Records
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Comprehensive student bio-data, academic standing, Tahfiz progress, and guardian
              contacts.
            </p>
          </div>
          <div className="text-xs font-semibold text-navy bg-navy/10 px-3 py-1.5 rounded-lg self-start sm:self-auto">
            Total Students: {students.length}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
          <div className="relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
            <Input
              placeholder="Search by student name, admission no, or guardian..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>

          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="text-xs">
              <SelectValue placeholder="Filter by Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Classes & Arms ({students.length})</SelectItem>
              {classes.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name} ({c.level})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">Admission No</th>
                <th className="p-3.5">Class Arm</th>
                <th className="p-3.5">Gender / House</th>
                <th className="p-3.5">Tahfiz Progress</th>
                <th className="p-3.5">Guardian Contact</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((st) => (
                <tr key={st.id} className="hover:bg-muted/20 transition-colors">
                  <td className="p-3.5 font-bold text-navy-deep">{st.name}</td>
                  <td className="p-3.5 font-mono text-muted-foreground text-[11px]">
                    {st.admissionNo}
                  </td>
                  <td className="p-3.5 font-semibold text-foreground">{className(st.classId)}</td>
                  <td className="p-3.5 text-muted-foreground">
                    {st.gender} · <span className="font-medium text-navy">{st.house}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald/15 text-emerald">
                      <BookOpen className="w-3 h-3" />
                      {st.hafizJuz} Juz
                    </span>
                  </td>
                  <td className="p-3.5 text-muted-foreground">
                    <div className="font-medium text-foreground">{st.guardianName}</div>
                    <div className="text-[11px] font-mono">{st.guardianPhone}</div>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedStudent(st)}
                        className="text-xs h-7 px-2 text-navy"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Profile
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setReportStudent(st)}
                        className="bg-navy hover:bg-navy-soft text-gold text-xs h-7 px-2 font-semibold"
                      >
                        <FileText className="w-3.5 h-3.5 mr-1" />
                        Report
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Profile Drawer Modal */}
      {selectedStudent && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="bg-card max-w-lg w-full rounded-2xl p-6 border border-border shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-gold uppercase tracking-wider">
                  Student Record
                </div>
                <h3 className="font-display font-bold text-2xl text-navy-deep">
                  {selectedStudent.name}
                </h3>
                <p className="text-xs text-muted-foreground font-mono">
                  {selectedStudent.admissionNo} · {className(selectedStudent.classId)}
                </p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-muted/30 rounded-lg space-y-1">
                <span className="text-muted-foreground block text-[11px]">Gender</span>
                <span className="font-bold text-foreground">{selectedStudent.gender}</span>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg space-y-1">
                <span className="text-muted-foreground block text-[11px]">Date of Birth</span>
                <span className="font-bold text-foreground">{selectedStudent.dob}</span>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg space-y-1">
                <span className="text-muted-foreground block text-[11px]">Blood Group</span>
                <span className="font-bold text-foreground">{selectedStudent.bloodGroup}</span>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg space-y-1">
                <span className="text-muted-foreground block text-[11px]">Sports House</span>
                <span className="font-bold text-foreground">{selectedStudent.house}</span>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg space-y-1 col-span-2">
                <span className="text-muted-foreground block text-[11px]">Tahfiz Memorization</span>
                <span className="font-bold text-emerald text-sm">
                  {selectedStudent.hafizJuz} of 30 Juz Memorized & Retained
                </span>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg space-y-1 col-span-2">
                <span className="text-muted-foreground block text-[11px]">Guardian Contact</span>
                <div className="font-bold text-foreground">{selectedStudent.guardianName}</div>
                <div className="text-muted-foreground font-mono">
                  {selectedStudent.guardianPhone}
                </div>
                <div className="text-muted-foreground">{selectedStudent.guardianEmail}</div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedStudent(null)}
                className="text-xs"
              >
                Close Profile
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setReportStudent(selectedStudent);
                  setSelectedStudent(null);
                }}
                className="bg-navy text-gold font-bold text-xs"
              >
                View Official Term Report
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Report Card Modal */}
      {reportStudent && (
        <ReportCardModal
          student={reportStudent}
          results={results}
          onClose={() => setReportStudent(null)}
        />
      )}
    </div>
  );
}
