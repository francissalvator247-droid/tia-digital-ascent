import { useRef } from "react";
import { X, Printer, GraduationCap, Award, ShieldCheck } from "lucide-react";
import {
  SCHOOL,
  gradeFor,
  className,
  students,
  type Student,
  type ResultRow,
  attendanceSummary,
} from "@/data/school";
import { Button } from "@/components/ui/button";

interface ReportCardModalProps {
  student: Student;
  results: ResultRow[];
  onClose: () => void;
}

export function ReportCardModal({ student, results, onClose }: ReportCardModalProps) {
  const studentResults = results.filter((r) => r.studentId === student.id);
  const attendance = attendanceSummary(student.id);

  const totalScore = studentResults.reduce((acc, r) => {
    const total = (r.ca1 ?? 0) + (r.ca2 ?? 0) + (r.exam ?? 0);
    return acc + total;
  }, 0);

  const average = studentResults.length > 0 ? (totalScore / studentResults.length).toFixed(1) : "0";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="bg-background max-w-4xl w-full rounded-2xl shadow-2xl border border-border overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Action Bar */}
        <div className="bg-navy px-6 py-4 flex items-center justify-between text-white border-b border-white/10 print:hidden">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-gold" />
            <h3 className="font-display font-bold text-base">
              Official Term Report Card Preview — {student.name}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handlePrint}
              size="sm"
              className="bg-gold text-navy-deep font-bold hover:brightness-105"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Report Card (A4)
            </Button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE A4 CONTAINER */}
        <div id="report-card-print" className="p-8 sm:p-12 bg-white text-slate-900 space-y-6">
          {/* School Header */}
          <div className="border-b-2 border-navy pb-4 text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-navy text-gold flex items-center justify-center shadow">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div className="text-left">
                <h1 className="font-display text-2xl sm:text-3xl font-black text-navy uppercase tracking-tight">
                  {SCHOOL.name}
                </h1>
                <p className="text-xs text-amber-700 font-bold uppercase tracking-wider">
                  {SCHOOL.tagline}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-600">
              {SCHOOL.address} · Tel: {SCHOOL.phone} · Email: {SCHOOL.email} · Web: {SCHOOL.website}
            </p>
            <div className="inline-block bg-navy text-white text-xs font-bold uppercase px-4 py-1 rounded tracking-widest mt-1">
              Continuous Assessment & Term Performance Report
            </div>
          </div>

          {/* Student Profile Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                Student Name
              </span>
              <span className="font-bold text-slate-900 text-sm">{student.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                Admission Number
              </span>
              <span className="font-semibold text-slate-800">{student.admissionNo}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                Class / Arm
              </span>
              <span className="font-semibold text-slate-800">{className(student.classId)}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                Academic Session
              </span>
              <span className="font-semibold text-slate-800">
                {SCHOOL.session} ({SCHOOL.term})
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                Gender / Blood Group
              </span>
              <span className="font-semibold text-slate-800">
                {student.gender} ({student.bloodGroup})
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                Sport House
              </span>
              <span className="font-semibold text-slate-800">{student.house}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                Tahfiz Memorization
              </span>
              <span className="font-bold text-emerald-800">{student.hafizJuz} Juz Memorized</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                Term Attendance
              </span>
              <span className="font-bold text-slate-800">
                {attendance.present} / {attendance.total} days ({attendance.rate}%)
              </span>
            </div>
          </div>

          {/* Academic Results Table */}
          <div className="overflow-x-auto border border-slate-300 rounded-lg">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-navy text-white text-[11px] uppercase tracking-wider">
                  <th className="p-2.5 border border-navy-soft">Subject Title</th>
                  <th className="p-2.5 text-center border border-navy-soft">CA 1 (20)</th>
                  <th className="p-2.5 text-center border border-navy-soft">CA 2 (20)</th>
                  <th className="p-2.5 text-center border border-navy-soft">Exam (60)</th>
                  <th className="p-2.5 text-center border border-navy-soft bg-navy-soft font-bold">
                    Total (100)
                  </th>
                  <th className="p-2.5 text-center border border-navy-soft">Grade</th>
                  <th className="p-2.5 border border-navy-soft">Teacher Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {studentResults.map((r, i) => {
                  const ca1 = r.ca1 ?? 0;
                  const ca2 = r.ca2 ?? 0;
                  const exam = r.exam ?? 0;
                  const total = ca1 + ca2 + exam;
                  const { grade, remark } = gradeFor(total);

                  return (
                    <tr key={r.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                      <td className="p-2 font-semibold text-slate-900 border-r border-slate-200">
                        {r.subjectId.replace("s-", "").toUpperCase()}
                      </td>
                      <td className="p-2 text-center border-r border-slate-200">{ca1}</td>
                      <td className="p-2 text-center border-r border-slate-200">{ca2}</td>
                      <td className="p-2 text-center border-r border-slate-200">{exam}</td>
                      <td className="p-2 text-center font-bold text-slate-950 bg-amber-50 border-r border-slate-200">
                        {total}
                      </td>
                      <td className="p-2 text-center font-bold border-r border-slate-200">
                        <span
                          className={
                            grade.startsWith("A") || grade.startsWith("B")
                              ? "text-emerald-700 font-bold"
                              : grade.startsWith("F")
                                ? "text-red-600 font-bold"
                                : "text-slate-800"
                          }
                        >
                          {grade}
                        </span>
                      </td>
                      <td className="p-2 text-slate-700 text-[11px]">{remark}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Performance Summary Bar */}
          <div className="grid grid-cols-3 gap-4 p-3 bg-slate-100 rounded-lg border border-slate-200 text-center text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                Grand Total Score
              </span>
              <span className="font-display font-bold text-lg text-slate-900">{totalScore}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                Class Average
              </span>
              <span className="font-display font-bold text-lg text-navy">{average}%</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                Class Standing
              </span>
              <span className="font-display font-bold text-lg text-emerald-800">Top 5%</span>
            </div>
          </div>

          {/* Grading Scale Legend */}
          <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-[10px] flex flex-wrap items-center justify-between text-slate-600">
            <span className="font-bold text-slate-800">Grading Scale:</span>
            <span>75-100% (A1 - Excellent)</span>
            <span>70-74% (B2 - Very Good)</span>
            <span>65-69% (B3 - Good)</span>
            <span>50-64% (C4-C6 - Credit)</span>
            <span>40-49% (D7-E8 - Pass)</span>
            <span>0-39% (F9 - Fail)</span>
          </div>

          {/* Remarks & Signatures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="border border-slate-300 p-4 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-navy uppercase text-[10px] block">
                Class Teacher's Remark:
              </span>
              <p className="text-slate-700 italic">
                "{student.name} has demonstrated commendable dedication in both sciences and
                Qur'anic memorization. Maintains polite decorum and excellent punctuality."
              </p>
              <div className="pt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200">
                <span>Mrs. Halima Danjuma</span>
                <span className="italic font-serif">Signature & Date</span>
              </div>
            </div>

            <div className="border border-slate-300 p-4 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-navy uppercase text-[10px] block">
                Principal's Endorsement:
              </span>
              <p className="text-slate-700 italic">
                "An outstanding term performance. Recommended for promotion with honors. Keep
                striving for knowledge and righteousness."
              </p>
              <div className="pt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200">
                <span className="font-semibold text-slate-800">Dr. Aisha Bello (Ph.D.)</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Official Stamp
                </span>
              </div>
            </div>
          </div>

          {/* Next Term Notice */}
          <div className="text-center text-[11px] text-slate-500 pt-2 border-t border-slate-200">
            Next Term Resumption Date: <strong>{SCHOOL.resumption}</strong> · All fees must be
            settled prior to resumption.
          </div>
        </div>
      </div>
    </div>
  );
}
