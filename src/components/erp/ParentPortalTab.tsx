import { useState } from "react";
import {
  Users,
  Award,
  BookOpen,
  CreditCard,
  Calendar,
  FileText,
  CheckCircle2,
  Clock,
  Printer,
  ChevronRight,
} from "lucide-react";
import { students, className, gradeFor, naira, SCHOOL } from "@/data/school";
import { useErp } from "@/lib/erp-store";
import { Button } from "@/components/ui/button";
import { ReportCardModal } from "./ReportCardModal";

export function ParentPortalTab() {
  const { results, invoices } = useErp();
  const [showReport, setShowReport] = useState(false);

  // Default ward for demo parent (Alhaji Musa Ibrahim)
  const child = students.find((s) => s.name.includes("Zainab Musa")) || students[0]!;
  const childResults = results.filter((r) => r.studentId === child.id);
  const childInvoice = invoices.find((inv) => inv.studentName === child.name) || invoices[0]!;
  const childBalance = childInvoice ? Math.max(0, childInvoice.total - childInvoice.paid) : 0;
  const isSettled = childBalance === 0;

  const totalScore = childResults.reduce((acc, r) => {
    return acc + (r.ca1 ?? 0) + (r.ca2 ?? 0) + (r.exam ?? 0);
  }, 0);
  const average = childResults.length > 0 ? (totalScore / childResults.length).toFixed(1) : "84.2";

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-navy-deep via-navy to-navy-soft text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-gold text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>Parent & Guardian Portal</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Welcome, Alhaji Musa Ibrahim
          </h2>
          <p className="text-white/80 text-xs sm:text-sm">
            Monitoring academic performance, daily attendance, and school notices for your child:{" "}
            <strong className="text-gold">{child.name}</strong> ({className(child.classId)}).
          </p>
        </div>

        <Button
          onClick={() => setShowReport(true)}
          size="lg"
          className="bg-gold text-navy-deep font-bold hover:brightness-105 shadow self-start sm:self-auto shrink-0 text-xs sm:text-sm"
        >
          <FileText className="w-4 h-4 mr-2" />
          View Term Report Card
        </Button>
      </div>

      {/* Ward Quick KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm space-y-1">
          <span className="text-xs text-muted-foreground">Overall Average</span>
          <div className="font-display text-2xl font-bold text-navy-deep">{average}%</div>
          <span className="text-[11px] text-emerald font-semibold">Distinction Standing</span>
        </div>

        <div className="bg-card p-4 rounded-xl border border-border shadow-sm space-y-1">
          <span className="text-xs text-muted-foreground">Term Attendance</span>
          <div className="font-display text-2xl font-bold text-emerald">96%</div>
          <span className="text-[11px] text-muted-foreground">48 of 50 Days Present</span>
        </div>

        <div className="bg-card p-4 rounded-xl border border-border shadow-sm space-y-1">
          <span className="text-xs text-muted-foreground">Qur'anic Memorization</span>
          <div className="font-display text-2xl font-bold text-navy-deep">{child.hafizJuz} Juz</div>
          <span className="text-[11px] text-emerald font-semibold">Juz 1–4 Certified</span>
        </div>

        <div className="bg-card p-4 rounded-xl border border-border shadow-sm space-y-1">
          <span className="text-xs text-muted-foreground">Term Tuition Status</span>
          <div
            className={`font-display text-2xl font-bold ${
              isSettled ? "text-emerald" : "text-amber-600"
            }`}
          >
            {isSettled ? "Settled" : "Partial"}
          </div>
          <span className="text-[11px] text-muted-foreground">
            Receipt: {childInvoice.invoiceNo}
          </span>
        </div>
      </div>

      {/* Main Grid: Subject Scores & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Current Term Subject Breakdown */}
        <div className="lg:col-span-8 bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h3 className="font-display font-bold text-lg text-navy-deep">
                Subject Evaluation Sheet
              </h3>
              <p className="text-xs text-muted-foreground">
                {SCHOOL.session} {SCHOOL.term} · Continuous Assessments & Term Examinations
              </p>
            </div>
            <Button
              onClick={() => setShowReport(true)}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              <Printer className="w-3.5 h-3.5 mr-1 text-gold" />
              Print Report
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                  <th className="p-3">Subject</th>
                  <th className="p-3 text-center">CA 1 (20)</th>
                  <th className="p-3 text-center">CA 2 (20)</th>
                  <th className="p-3 text-center">Exam (60)</th>
                  <th className="p-3 text-center font-bold text-foreground">Total (100)</th>
                  <th className="p-3 text-center">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {childResults.map((r) => {
                  const ca1 = r.ca1 ?? 0;
                  const ca2 = r.ca2 ?? 0;
                  const exam = r.exam ?? 0;
                  const total = ca1 + ca2 + exam;
                  const { grade } = gradeFor(total);

                  return (
                    <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                      <td className="p-3 font-semibold text-navy-deep">
                        {r.subjectId.replace("s-", "").toUpperCase()}
                      </td>
                      <td className="p-3 text-center">{ca1}</td>
                      <td className="p-3 text-center">{ca2}</td>
                      <td className="p-3 text-center">{exam}</td>
                      <td className="p-3 text-center font-bold text-foreground bg-muted/20">
                        {total}
                      </td>
                      <td className="p-3 text-center font-bold text-emerald">{grade}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: School Bulletin & Invoice Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-5 space-y-4">
            <h4 className="font-display font-bold text-base text-navy-deep">
              Fee Billing & Receipts
            </h4>
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Invoice No:</span>
                <span className="font-mono font-bold">{childInvoice.invoiceNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Term Bill:</span>
                <span className="font-semibold">{naira(childInvoice.total)}</span>
              </div>
              <div className="flex justify-between text-emerald font-bold">
                <span>Amount Paid:</span>
                <span>{naira(childInvoice.paid)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground pt-1 border-t border-border">
                <span>Outstanding Balance:</span>
                <span className="font-bold text-emerald">₦0 (Cleared)</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-sm p-5 space-y-3">
            <h4 className="font-display font-bold text-base text-navy-deep">
              Class Teacher's Note
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed italic bg-muted/30 p-3 rounded-lg border border-border">
              "Zainab is performing exceptionally well in Mathematics and Islamic Studies. Her
              tajweed pronunciation has shown immense improvement this term. Recommended for
              continuation into JSS 2 with academic honors."
            </p>
            <div className="text-[11px] text-navy font-semibold text-right">
              — Mrs. Halima Danjuma (Form Teacher)
            </div>
          </div>
        </div>
      </div>

      {/* Report Card Modal */}
      {showReport && (
        <ReportCardModal student={child} results={results} onClose={() => setShowReport(false)} />
      )}
    </div>
  );
}
