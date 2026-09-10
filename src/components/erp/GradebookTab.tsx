import { useState } from "react";
import {
  BookOpen,
  Send,
  Save,
  CheckCircle2,
  FileText,
  AlertCircle,
  HelpCircle,
  Eye,
} from "lucide-react";
import { classes, subjects, students, className, gradeFor, type Student } from "@/data/school";
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
import { ReportCardModal } from "./ReportCardModal";

export function GradebookTab() {
  const {
    results,
    selectedClassId,
    setSelectedClassId,
    selectedSubjectId,
    setSelectedSubjectId,
    updateResult,
    submitResultForApproval,
    submitResultsForApproval,
    saveDraftResults,
    role,
  } = useErp();

  const [selectedStudentForReport, setSelectedStudentForReport] = useState<Student | null>(null);

  const classStudents = students.filter((s) => s.classId === selectedClassId);

  const handleScoreChange = (resultId: string, field: "ca1" | "ca2" | "exam", val: string) => {
    const num = val === "" ? 0 : Math.max(0, parseInt(val, 10) || 0);
    // Cap CA to 20, Exam to 60
    const max = field === "exam" ? 60 : 20;
    const cleanNum = Math.min(num, max);
    updateResult(resultId, { [field]: cleanNum });
  };

  const handleSubmitClassResults = () => {
    submitResultsForApproval(selectedClassId, selectedSubjectId);
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Action Bar */}
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-deep flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-gold" />
              Continuous Assessment & Exam Gradebook
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Enter CA1 (20%), CA2 (20%), and Term Exam (60%). Totals, WAEC grades, and remarks are
              computed automatically.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleSubmitClassResults}
              className="bg-navy hover:bg-navy-soft text-white font-bold text-xs shadow"
            >
              <Send className="w-4 h-4 mr-1.5 text-gold" />
              Submit Sheet for Approval
            </Button>
          </div>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Class Arm</label>
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
            <label className="text-xs font-semibold text-muted-foreground">Subject</label>
            <Select value={selectedSubjectId} onValueChange={setSelectedSubjectId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Grade Table */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <div className="font-bold text-xs sm:text-sm text-navy-deep">
            {className(selectedClassId)} ·{" "}
            {subjects.find((s) => s.id === selectedSubjectId)?.name || "Subject"} (
            {classStudents.length} Students)
          </div>
          <div className="text-[11px] text-muted-foreground">
            Max Scores: CA1 (20) + CA2 (20) + Exam (60) = 100
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                <th className="p-3">Student Name</th>
                <th className="p-3">Admission No</th>
                <th className="p-3 text-center">CA 1 (20)</th>
                <th className="p-3 text-center">CA 2 (20)</th>
                <th className="p-3 text-center">Exam (60)</th>
                <th className="p-3 text-center bg-muted/70 font-bold text-foreground">
                  Total (100)
                </th>
                <th className="p-3 text-center">Grade</th>
                <th className="p-3">Remark</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {classStudents.map((st) => {
                // Find or mock result
                const r = results.find(
                  (item) =>
                    item.studentId === st.id &&
                    item.subjectId === selectedSubjectId &&
                    item.classId === selectedClassId,
                );

                const ca1 = r?.ca1 ?? 15;
                const ca2 = r?.ca2 ?? 16;
                const exam = r?.exam ?? 45;
                const total = ca1 + ca2 + exam;
                const { grade, remark } = gradeFor(total);
                const status = r?.status ?? "draft";

                return (
                  <tr key={st.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 font-bold text-navy-deep">{st.name}</td>
                    <td className="p-3 text-muted-foreground font-mono text-[11px]">
                      {st.admissionNo}
                    </td>

                    {/* CA1 Input */}
                    <td className="p-2 text-center">
                      <Input
                        type="number"
                        min={0}
                        max={20}
                        value={ca1}
                        onChange={(e) => r && handleScoreChange(r.id, "ca1", e.target.value)}
                        className="w-16 mx-auto text-center font-bold text-xs h-8"
                        disabled={status === "approved"}
                      />
                    </td>

                    {/* CA2 Input */}
                    <td className="p-2 text-center">
                      <Input
                        type="number"
                        min={0}
                        max={20}
                        value={ca2}
                        onChange={(e) => r && handleScoreChange(r.id, "ca2", e.target.value)}
                        className="w-16 mx-auto text-center font-bold text-xs h-8"
                        disabled={status === "approved"}
                      />
                    </td>

                    {/* Exam Input */}
                    <td className="p-2 text-center">
                      <Input
                        type="number"
                        min={0}
                        max={60}
                        value={exam}
                        onChange={(e) => r && handleScoreChange(r.id, "exam", e.target.value)}
                        className="w-16 mx-auto text-center font-bold text-xs h-8"
                        disabled={status === "approved"}
                      />
                    </td>

                    {/* Total */}
                    <td className="p-3 text-center font-bold text-sm bg-muted/30 text-navy-deep">
                      {total}
                    </td>

                    {/* Grade */}
                    <td className="p-3 text-center font-bold">
                      <span
                        className={
                          grade.startsWith("A") || grade.startsWith("B")
                            ? "text-emerald font-bold"
                            : grade.startsWith("F")
                              ? "text-red-600 font-bold"
                              : "text-foreground font-bold"
                        }
                      >
                        {grade}
                      </span>
                    </td>

                    {/* Remark */}
                    <td className="p-3 text-muted-foreground text-[11px] max-w-[140px] truncate">
                      {remark}
                    </td>

                    {/* Workflow Status */}
                    <td className="p-3 text-center">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          status === "approved" || status === "Approved"
                            ? "bg-emerald/15 text-emerald border border-emerald/30"
                            : status === "submitted" || status === "Pending"
                              ? "bg-amber-500/15 text-amber-700 border border-amber-500/30"
                              : status === "rejected" || status === "Rejected"
                                ? "bg-red-500/15 text-red-600 border border-red-500/30"
                                : "bg-muted text-muted-foreground border border-border"
                        }`}
                      >
                        {status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="p-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedStudentForReport(st)}
                        className="text-xs text-navy hover:text-gold hover:bg-navy/10 h-7 px-2"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Report
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Card Modal */}
      {selectedStudentForReport && (
        <ReportCardModal
          student={selectedStudentForReport}
          results={results}
          onClose={() => setSelectedStudentForReport(null)}
        />
      )}
    </div>
  );
}
