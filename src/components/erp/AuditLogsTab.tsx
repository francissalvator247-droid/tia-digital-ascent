import { useState } from "react";
import {
  History,
  Shield,
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Clock,
  CheckCircle2,
  FileCheck,
  CreditCard,
  BookOpen,
  Users,
} from "lucide-react";
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
import { toast } from "sonner";

export function AuditLogsTab() {
  const { auditLogs, role } = useErp();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.target.toLowerCase().includes(search.toLowerCase()) ||
      log.actor.toLowerCase().includes(search.toLowerCase()) ||
      (log.details && log.details.toLowerCase().includes(search.toLowerCase()));
    const matchesRole =
      roleFilter === "All" || log.role.toLowerCase().includes(roleFilter.toLowerCase());
    return matchesSearch && matchesRole;
  });

  const handleExport = () => {
    toast.success("Institutional Audit Trail exported (JSON/CSV simulation).");
  };

  const getActionBadge = (action: string) => {
    const act = action.toLowerCase();
    if (act.includes("approved")) {
      return "bg-emerald/15 text-emerald border-emerald/30";
    }
    if (act.includes("rejected")) {
      return "bg-red-500/15 text-red-600 border-red-500/30";
    }
    if (act.includes("submitted") || act.includes("score")) {
      return "bg-amber-500/15 text-amber-700 border-amber-500/30";
    }
    if (act.includes("payment") || act.includes("fee")) {
      return "bg-purple-500/15 text-purple-700 border-purple-500/30";
    }
    if (act.includes("attendance")) {
      return "bg-blue-500/10 text-blue-700 border-blue-500/30";
    }
    return "bg-navy/10 text-navy dark:text-gold border-navy/20";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/10 dark:bg-white/10 text-navy dark:text-gold text-xs font-bold mb-2">
            <Shield className="w-3.5 h-3.5 text-gold" />
            <span>Immutable Institutional Audit Trail</span>
          </div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-deep flex items-center gap-2">
            School Operations Activity History
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Full compliance ledger recording grade submissions, approvals, fee payments, admissions,
            and system notices.
          </p>
        </div>

        <Button
          onClick={handleExport}
          variant="outline"
          size="sm"
          className="text-xs font-semibold gap-1.5 self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-gold" />
          <span>Export Audit Report</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
          <Input
            placeholder="Search activity by actor, action description, student, or class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-56 text-xs">
            <SelectValue placeholder="Filter by Actor Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Roles ({auditLogs.length})</SelectItem>
            <SelectItem value="Principal">Principal & Executive</SelectItem>
            <SelectItem value="Administrator">Administrator</SelectItem>
            <SelectItem value="Teacher">Subject Teacher</SelectItem>
            <SelectItem value="Accountant">Accountant / Bursar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Audit Trail List */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                <th className="p-3.5">Log ID</th>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Stakeholder Actor</th>
                <th className="p-3.5">Action Executed</th>
                <th className="p-3.5">Entity / Target Reference</th>
                <th className="p-3.5">Operational Details</th>
                <th className="p-3.5 text-right">Client IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    No activity records found matching your query.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3.5 font-mono text-[11px] font-bold text-navy-deep">
                      {log.id}
                    </td>
                    <td className="p-3.5 whitespace-nowrap text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{log.at || log.timestamp}</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-foreground">{log.actor}</div>
                      <div className="text-[10px] text-muted-foreground">{log.role}</div>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded border inline-block ${getActionBadge(
                          log.action,
                        )}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3.5 font-medium text-foreground">{log.target}</td>
                    <td className="p-3.5 text-muted-foreground max-w-xs truncate">
                      {log.details || "Standard ERP operation committed."}
                    </td>
                    <td className="p-3.5 text-right font-mono text-[10px] text-muted-foreground">
                      {log.ip || "102.89.34.02"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
