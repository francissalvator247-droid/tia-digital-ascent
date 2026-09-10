import {
  Shield,
  KeyRound,
  GraduationCap,
  Users,
  Calculator,
  User,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { ROLES, type Role, SCHOOL } from "@/data/school";
import { useErp } from "@/lib/erp-store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Reveal } from "@/components/ui/Reveal";

interface PortalLoginViewProps {
  onEnterPortal: () => void;
  onBackToWebsite?: () => void;
}

export function PortalLoginView({ onEnterPortal, onBackToWebsite }: PortalLoginViewProps) {
  const { setRole } = useErp();

  const roleDetails: Record<
    Role,
    {
      description: string;
      icon: typeof Shield;
      color: string;
      badge: string;
      capabilities: string[];
    }
  > = {
    principal: {
      description:
        "Executive leadership, institutional KPI analytics, CA & exam approval, and complete audit trails.",
      icon: Shield,
      color:
        "from-amber-600/20 to-amber-700/10 border-amber-500/40 text-amber-900 dark:text-amber-300",
      badge: "Executive Leadership",
      capabilities: [
        "Institutional KPI Dashboard",
        "Approve / Reject Gradebooks",
        "Monitor Tuition & Fee Recovery",
        "Executive Audit & Activity Log",
      ],
    },
    admin: {
      description:
        "Student registries, staff records, class allocations, admission processing, and timetable operations.",
      icon: KeyRound,
      color: "from-blue-600/20 to-blue-700/10 border-blue-600/40 text-blue-900 dark:text-blue-300",
      badge: "Operations & Records",
      capabilities: [
        "Student Registry & Profile Drawer",
        "Staff Directory & Qualifications",
        "Admissions Funnel Processing",
        "Class & Subject Assignments",
      ],
    },
    teacher: {
      description:
        "Daily attendance register, CA1 & CA2 entry, exam score recording, and terminal gradebook submission.",
      icon: GraduationCap,
      color:
        "from-emerald-600/20 to-emerald-700/10 border-emerald-500/40 text-emerald-900 dark:text-emerald-300",
      badge: "Pedagogy & Classroom",
      capabilities: [
        "Interactive Roll Call Register",
        "Continuous Assessment (CA) Gradebook",
        "Automatic WAEC Grading (A1–F9)",
        "Submit Scores to Principal",
      ],
    },
    accountant: {
      description:
        "Tuition billing, invoice generation, payment receipts, outstanding balance tracking, and reconciliations.",
      icon: Calculator,
      color:
        "from-purple-600/20 to-purple-700/10 border-purple-500/40 text-purple-900 dark:text-purple-300",
      badge: "Finance & Accounts",
      capabilities: [
        "Total Invoiced & Collected Metrics",
        "Invoice Status (Paid / Partial / Unpaid)",
        "Digital Payment Receipts",
        "Outstanding Balances Summary",
      ],
    },
    parent: {
      description:
        "Ward academic progress, continuous assessment preview, attendance percentage, and fee invoices.",
      icon: Users,
      color: "from-teal-600/20 to-teal-700/10 border-teal-500/40 text-teal-900 dark:text-teal-300",
      badge: "Guardian Portal",
      capabilities: [
        "Child Switcher (Zainab Musa Ibrahim)",
        "Term Academic Scores Preview",
        "Fee Invoices & Payment Slips",
        "Attendance & Class Timetable",
      ],
    },
    student: {
      description:
        "Personal academic timetable, continuous assessment breakdown, learning materials, and term report card.",
      icon: User,
      color:
        "from-indigo-600/20 to-indigo-700/10 border-indigo-500/40 text-indigo-900 dark:text-indigo-300",
      badge: "Learner Portal",
      capabilities: [
        "Personal Subject Timetable",
        "Continuous Assessment Breakdown",
        "Download Learning Materials",
        "View Official Term Report Card",
      ],
    },
  };

  const handleSelectRole = (r: Role, person: string) => {
    setRole(r);
    toast.success(`Access granted as ${person} (${r.toUpperCase()})`);
    onEnterPortal();
  };

  return (
    <div className="min-h-screen bg-muted/20 py-12 sm:py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Top return link */}
        {onBackToWebsite && (
          <div className="flex items-center justify-between">
            <Button
              onClick={onBackToWebsite}
              variant="outline"
              size="sm"
              className="gap-2 font-semibold text-xs sm:text-sm border-border bg-card hover:bg-accent shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-gold" />
              <span>Back to School Website</span>
            </Button>
            <div className="text-xs text-muted-foreground hidden sm:block">
              {SCHOOL.name} · Institutional Portal
            </div>
          </div>
        )}

        {/* Header Title */}
        <Reveal>
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy text-gold text-xs sm:text-sm font-bold shadow-md border border-gold/30">
              <Sparkles className="w-4 h-4 text-gold animate-pulse" />
              <span>DEMO MODE — Authentication will be enabled after deployment</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-navy-deep tracking-tight">
              Select Your Role to Enter ERP
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Experience TIA's enterprise school management system. Clicking any of the six official
              roles below immediately opens that role's live ERP dashboard.
            </p>
          </div>
        </Reveal>

        {/* Roles Grid (6 Stakeholders) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROLES.map((r, index) => {
            const meta = roleDetails[r.id];
            const Icon = meta.icon;

            return (
              <Reveal key={r.id} delay={index * 75}>
                <div
                  onClick={() => handleSelectRole(r.id, r.person)}
                  className="h-full bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all flex flex-col justify-between space-y-6 group cursor-pointer hover:border-gold/50"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-13 h-13 rounded-xl bg-navy text-gold flex items-center justify-center shadow-md group-hover:scale-105 group-hover:bg-gold group-hover:text-navy-deep transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-navy/10 dark:bg-white/10 text-navy dark:text-gold border border-navy/20 dark:border-white/10">
                        {meta.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-2xl text-navy-deep tracking-tight group-hover:text-gold-foreground transition-colors">
                        {r.label}
                      </h3>
                      <div className="text-xs font-bold text-gold uppercase tracking-wider mt-1">
                        Active User: {r.person}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2.5 leading-relaxed font-normal">
                        {meta.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-border/70">
                      <div className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                        Included Capabilities:
                      </div>
                      {meta.capabilities.map((cap, i) => (
                        <div
                          key={i}
                          className="text-xs sm:text-sm text-foreground flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald shrink-0" />
                          <span className="font-medium truncate">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectRole(r.id, r.person);
                    }}
                    className="w-full bg-navy hover:bg-navy-soft text-white font-bold group-hover:bg-gold group-hover:text-navy-deep transition-all shadow-md py-5 text-sm sm:text-base rounded-xl"
                  >
                    <span>Enter {r.label} Dashboard</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Informational security banner */}
        <Reveal delay={200}>
          <div className="p-5 bg-navy-deep text-white rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm shadow-md">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-gold shrink-0" />
              <span>
                Academic Session: <strong>{SCHOOL.session}</strong> · Current Term:{" "}
                <strong>{SCHOOL.term}</strong> · Live interactive state with in-memory persistence
              </span>
            </div>
            <span className="text-gold font-semibold shrink-0">
              No authentication credentials required for board evaluation
            </span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
