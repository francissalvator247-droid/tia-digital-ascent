import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  ROLES,
  initialApprovals,
  initialAttendance,
  initialAudit,
  initialResults,
  type Approval,
  type ApprovalStatus,
  type AttendanceMark,
  type AuditEntry,
  type ResultRow,
  type ResultStatus,
  type Role,
} from "@/data/school";

type ErpState = {
  role: Role;
  setRole: (r: Role) => void;
  roleLabel: string;
  person: string;

  results: ResultRow[];
  updateResult: (id: string, patch: Partial<ResultRow>) => void;
  setClassResultStatus: (classId: string, subjectId: string, status: ResultStatus) => void;

  attendance: Record<string, AttendanceMark>;
  setMark: (studentId: string, mark: AttendanceMark) => void;

  approvals: Approval[];
  decideApproval: (id: string, status: ApprovalStatus, note?: string) => void;

  audit: AuditEntry[];

  selectedChildId: string | null;
  setSelectedChildId: (id: string) => void;
};

const ErpContext = createContext<ErpState | null>(null);

let auditSeq = 8000;

export function ErpProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("principal");
  const [results, setResults] = useState<ResultRow[]>(initialResults);
  const [attendance, setAttendance] = useState<Record<string, AttendanceMark>>(initialAttendance);
  const [approvals, setApprovals] = useState<Approval[]>(initialApprovals);
  const [audit, setAudit] = useState<AuditEntry[]>(initialAudit);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  const actor = ROLES.find((r) => r.id === role)!;

  const log = useCallback(
    (action: string, target: string) => {
      auditSeq += 1;
      const now = new Date();
      setAudit((prev) => [
        {
          id: `AU-${auditSeq}`,
          actor: actor.person,
          role: actor.label,
          action,
          target,
          at: `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 5)}`,
          ip: "102.89.34.02",
        },
        ...prev,
      ]);
    },
    [actor],
  );

  const updateResult = useCallback((id: string, patch: Partial<ResultRow>) => {
    setResults((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }, []);

  const setClassResultStatus = useCallback(
    (classId: string, subjectId: string, status: ResultStatus) => {
      setResults((prev) =>
        prev.map((r) => (r.classId === classId && r.subjectId === subjectId ? { ...r, status } : r)),
      );
      log(status === "Pending" ? "Submitted results for approval" : `Saved results as ${status}`, `${classId} · ${subjectId}`);
    },
    [log],
  );

  const setMark = useCallback(
    (studentId: string, mark: AttendanceMark) => {
      setAttendance((prev) => ({ ...prev, [studentId]: mark }));
    },
    [],
  );

  const decideApproval = useCallback(
    (id: string, status: ApprovalStatus, note?: string) => {
      setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status, note: note ?? a.note } : a)));
      const item = approvals.find((a) => a.id === id);
      log(
        status === "Approved" ? "Approved submission" : status === "Rejected" ? "Rejected submission" : "Requested correction",
        item ? `${item.kind} · ${item.title}` : id,
      );
    },
    [approvals, log],
  );

  const value = useMemo<ErpState>(
    () => ({
      role,
      setRole,
      roleLabel: actor.label,
      person: actor.person,
      results,
      updateResult,
      setClassResultStatus,
      attendance,
      setMark,
      approvals,
      decideApproval,
      audit,
      selectedChildId,
      setSelectedChildId,
    }),
    [
      role,
      actor,
      results,
      updateResult,
      setClassResultStatus,
      attendance,
      setMark,
      approvals,
      decideApproval,
      audit,
      selectedChildId,
    ],
  );

  return <ErpContext.Provider value={value}>{children}</ErpContext.Provider>;
}

export function useErp() {
  const ctx = useContext(ErpContext);
  if (!ctx) throw new Error("useErp must be used inside ErpProvider");
  return ctx;
}
