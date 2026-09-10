import { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  History,
  AlertCircle,
  FileCheck,
  CheckCheck,
} from "lucide-react";
import { students, subjects, classes, className } from "@/data/school";
import { useErp } from "@/lib/erp-store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ApprovalCenterTab() {
  const {
    results,
    admissions,
    auditLogs,
    approveResult,
    rejectResult,
    approveAdmission,
    rejectAdmission,
  } = useErp();

  const [activeSubTab, setActiveSubTab] = useState<"grades" | "admissions" | "audit">("grades");

  const pendingResults = results.filter((r) => r.status === "Pending" || r.status === "submitted");
  const pendingAdmissions = admissions.filter(
    (a) =>
      a.status === "Pending" ||
      a.status === "submitted" ||
      a.status === "Under Review" ||
      a.status === "under-review",
  );

  const handleApproveAllGrades = () => {
    pendingResults.forEach((r) => approveResult(r.id));
    toast.success(`Approved all ${pendingResults.length} pending grade submissions.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-deep flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-gold" />
            Executive Approval & Governance Centre
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Principal oversight workflow for gradebook publishing, student intake approvals, and
            compliance audit records.
          </p>
        </div>

        {/* Sub-tab pills */}
        <div className="flex items-center gap-1.5 bg-muted p-1 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab("grades")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeSubTab === "grades"
                ? "bg-navy text-gold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Grades ({pendingResults.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab("admissions")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeSubTab === "admissions"
                ? "bg-navy text-gold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Admissions ({pendingAdmissions.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab("audit")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeSubTab === "audit"
                ? "bg-navy text-gold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Audit Trail ({auditLogs.length})</span>
          </button>
        </div>
      </div>

      {/* 1. GRADES APPROVAL */}
      {activeSubTab === "grades" && (
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-navy-deep">
                Pending Grade Submissions
              </h3>
              <p className="text-xs text-muted-foreground">
                Review scores submitted by subject teachers before they reflect on official report
                cards.
              </p>
            </div>
            {pendingResults.length > 0 && (
              <Button
                onClick={handleApproveAllGrades}
                size="sm"
                className="bg-emerald hover:bg-emerald/90 text-white font-bold text-xs"
              >
                <CheckCheck className="w-4 h-4 mr-1.5" />
                Approve All Pending ({pendingResults.length})
              </Button>
            )}
          </div>

          {pendingResults.length === 0 ? (
            <div className="p-12 text-center space-y-3 bg-muted/20 rounded-xl border border-dashed border-border">
              <CheckCircle2 className="w-12 h-12 text-emerald mx-auto" />
              <h4 className="font-display font-bold text-navy-deep">All Grade Sheets Approved</h4>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No grade submissions are awaiting principal verification at this time.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Class</th>
                    <th className="p-3">Subject</th>
                    <th className="p-3 text-center">CA1</th>
                    <th className="p-3 text-center">CA2</th>
                    <th className="p-3 text-center">Exam</th>
                    <th className="p-3 text-center font-bold text-foreground">Total</th>
                    <th className="p-3 text-right">Decision Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {pendingResults.map((r) => {
                    const st = students.find((s) => s.id === r.studentId);
                    const subj = subjects.find((s) => s.id === r.subjectId);
                    const total = (r.ca1 ?? 0) + (r.ca2 ?? 0) + (r.exam ?? 0);

                    return (
                      <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-bold text-navy-deep">{st?.name ?? r.studentId}</td>
                        <td className="p-3 text-muted-foreground">{className(r.classId)}</td>
                        <td className="p-3 font-semibold text-foreground">
                          {subj?.name ?? r.subjectId}
                        </td>
                        <td className="p-3 text-center">{r.ca1}</td>
                        <td className="p-3 text-center">{r.ca2}</td>
                        <td className="p-3 text-center">{r.exam}</td>
                        <td className="p-3 text-center font-bold text-emerald text-sm">{total}</td>
                        <td className="p-3 text-right">
                          <div className="inline-flex items-center gap-2">
                            <Button
                              size="sm"
                              onClick={() => approveResult(r.id)}
                              className="bg-emerald hover:bg-emerald/90 text-white font-semibold text-xs h-7 px-2.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => rejectResult(r.id)}
                              className="text-red-600 hover:bg-red-50 text-xs h-7 px-2.5"
                            >
                              <XCircle className="w-3.5 h-3.5 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 2. ADMISSIONS APPROVAL */}
      {activeSubTab === "admissions" && (
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden space-y-4 p-6">
          <div>
            <h3 className="font-display font-bold text-lg text-navy-deep">
              Admission Applicant Approvals
            </h3>
            <p className="text-xs text-muted-foreground">
              Review diagnostic assessment results and approve candidate enrollment.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                  <th className="p-3">Applicant Name</th>
                  <th className="p-3">Class Applying</th>
                  <th className="p-3">Parent Name & Phone</th>
                  <th className="p-3 text-center">Entrance Score</th>
                  <th className="p-3">Current Status</th>
                  <th className="p-3 text-right">Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {admissions.map((adm) => (
                  <tr key={adm.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 font-bold text-navy-deep">{adm.applicantName}</td>
                    <td className="p-3 text-muted-foreground font-medium">{adm.classApplying}</td>
                    <td className="p-3 text-muted-foreground">
                      <div>{adm.parentName}</div>
                      <div className="text-[11px] text-muted-foreground font-mono">{adm.phone}</div>
                    </td>
                    <td className="p-3 text-center font-bold">
                      {adm.score ? (
                        <span className="text-emerald font-bold text-sm">{adm.score}%</span>
                      ) : (
                        <span className="text-muted-foreground italic">Pending</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          adm.status === "approved"
                            ? "bg-emerald/15 text-emerald"
                            : adm.status === "rejected"
                              ? "bg-red-500/15 text-red-600"
                              : "bg-amber-500/15 text-amber-700"
                        }`}
                      >
                        {adm.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {adm.status !== "approved" && (
                        <div className="inline-flex items-center gap-1.5">
                          <Button
                            size="sm"
                            onClick={() => approveAdmission(adm.id)}
                            className="bg-navy hover:bg-navy-soft text-gold font-semibold text-xs h-7 px-2.5"
                          >
                            Approve Enrolment
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => rejectAdmission(adm.id)}
                            className="text-red-600 hover:bg-red-50 text-xs h-7 px-2"
                          >
                            Decline
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. AUDIT TRAIL LOG */}
      {activeSubTab === "audit" && (
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-navy-deep">
                Institutional Security Audit Trail
              </h3>
              <p className="text-xs text-muted-foreground">
                Tamper-evident log of score edits, admission decisions, and attendance
                registrations.
              </p>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gold" />
              <span>Auto-recorded</span>
            </div>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-xl bg-muted/30 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy-deep">{log.actor}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.2 rounded bg-navy/10 text-navy">
                      {log.role}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald">{log.action}</span>
                  </div>
                  <p className="text-muted-foreground">{log.details}</p>
                </div>

                <div className="text-[11px] text-muted-foreground font-mono shrink-0">
                  {log.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
