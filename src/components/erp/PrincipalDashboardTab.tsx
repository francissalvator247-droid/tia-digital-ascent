import {
  Shield,
  Users,
  GraduationCap,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { students, staff, classes, invoices, naira, SCHOOL } from "@/data/school";
import { useErp } from "@/lib/erp-store";
import { Button } from "@/components/ui/button";

interface PrincipalDashboardTabProps {
  onNavigateTab: (tab: string) => void;
}

export function PrincipalDashboardTab({ onNavigateTab }: PrincipalDashboardTabProps) {
  const {
    results,
    admissions,
    auditLogs,
    invoices: liveInvoices,
    students: liveStudents,
  } = useErp();

  const pendingResults = results.filter((r) => r.status === "Pending" || r.status === "submitted");
  const pendingAdmissions = admissions.filter(
    (a) => a.status === "Pending" || a.status === "Under Review" || a.status === "submitted",
  );

  const totalStudents = liveStudents.length;
  const totalStaff = staff.length;
  const totalBilled = liveInvoices.reduce((acc, inv) => acc + inv.total, 0);
  const totalPaid = liveInvoices.reduce((acc, inv) => acc + inv.paid, 0);
  const feeRate = totalBilled > 0 ? Math.round((totalPaid / totalBilled) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Executive Welcome Banner */}
      <div className="bg-gradient-to-r from-navy-deep via-navy to-navy-soft text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-gold text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>Executive Management Terminal</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Welcome, Dr. Aisha Bello
          </h2>
          <p className="text-white/80 text-xs sm:text-sm">
            Principal & Chief Executive · Session: <strong>{SCHOOL.session}</strong> ({SCHOOL.term})
            · Lugbe Campus, Abuja.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => onNavigateTab("approvals")}
            className="bg-gold text-navy-deep font-bold hover:brightness-105 shadow text-xs sm:text-sm"
          >
            Review Approvals ({pendingResults.length + pendingAdmissions.length})
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-medium">
              Total Student Enrolment
            </span>
            <div className="font-display text-2xl font-bold text-navy-deep">{totalStudents}</div>
            <span className="text-[11px] text-emerald font-semibold">12 Academic Classes</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-navy/10 text-navy flex items-center justify-center">
            <Users className="w-6 h-6 text-gold" />
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-medium">
              Academic & Admin Staff
            </span>
            <div className="font-display text-2xl font-bold text-navy-deep">{totalStaff}</div>
            <span className="text-[11px] text-muted-foreground">Certified Educators</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-navy/10 text-navy flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-emerald" />
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-medium">Tuition Revenue</span>
            <div className="font-display text-2xl font-bold text-emerald">{naira(totalPaid)}</div>
            <span className="text-[11px] text-muted-foreground">{feeRate}% collected</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald/10 text-emerald flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-medium">Pending Approvals</span>
            <div className="font-display text-2xl font-bold text-amber-600">
              {pendingResults.length + pendingAdmissions.length}
            </div>
            <span className="text-[11px] text-amber-700 font-semibold">Requires Action</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Approvals Alert & Class Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Quick Approval Notice & Recent Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-display font-bold text-lg text-navy-deep flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold" />
                Action Items Awaiting Verification
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigateTab("approvals")}
                className="text-xs text-navy font-semibold"
              >
                Open Workflow
              </Button>
            </div>

            {pendingResults.length > 0 || pendingAdmissions.length > 0 ? (
              <div className="space-y-3">
                {pendingResults.length > 0 && (
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-amber-950">
                        {pendingResults.length} Subject Grade Submissions Pending
                      </div>
                      <div className="text-[11px] text-amber-800">
                        Submitted by form teachers for term continuous assessment approval.
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onNavigateTab("approvals")}
                      className="bg-navy text-gold text-xs h-7 font-semibold"
                    >
                      Review
                    </Button>
                  </div>
                )}

                {pendingAdmissions.length > 0 && (
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-blue-950">
                        {pendingAdmissions.length} Admission Applications Pending Review
                      </div>
                      <div className="text-[11px] text-blue-800">
                        Diagnostic assessments completed; awaiting enrolment approval.
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onNavigateTab("approvals")}
                      className="bg-navy text-gold text-xs h-7 font-semibold"
                    >
                      Process
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-muted-foreground bg-muted/20 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-emerald mx-auto mb-2" />
                No pending items requiring attention. All workflows cleared!
              </div>
            )}
          </div>

          {/* Institutional Audit Feed */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
            <h3 className="font-display font-bold text-lg text-navy-deep flex items-center gap-2">
              <Shield className="w-5 h-5 text-gold" />
              Recent Institutional Operations Log
            </h3>
            <div className="space-y-3">
              {auditLogs.slice(0, 4).map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-muted/30 rounded-lg border border-border flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-navy-deep">{log.actor}</span>
                    <span className="text-muted-foreground ml-2">({log.action})</span>
                    <p className="text-[11px] text-muted-foreground">{log.details}</p>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground shrink-0">
                    {log.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Class Enrolment Distribution */}
        <div className="lg:col-span-5 bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
          <h3 className="font-display font-bold text-lg text-navy-deep">
            Class Enrolment Breakdown
          </h3>
          <p className="text-xs text-muted-foreground">
            Current capacity and pupil allocations across tiers.
          </p>

          <div className="space-y-3">
            {classes.map((c) => {
              const count = students.filter((s) => s.classId === c.id).length;
              const pct = Math.round((count / 30) * 100);

              return (
                <div key={c.id} className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="font-semibold text-navy-deep">{c.name}</span>
                    <span className="text-muted-foreground">
                      {count} / {c.capacity} pupils ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-navy h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
