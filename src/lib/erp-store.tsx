import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  ROLES,
  initialApprovals,
  initialAttendance,
  initialAudit,
  initialResults,
  initialApplications,
  initialStudents,
  initialNotifications,
  initialAnnouncements,
  invoices as initialInvoices,
  receipts as initialReceipts,
  classes,
  subjects,
  className,
  subjectName,
  type Approval,
  type ApprovalStatus,
  type AttendanceMark,
  type AuditEntry,
  type ResultRow,
  type ResultStatus,
  type Role,
  type Student,
  type EnrolmentApplication,
  type ErpNotification,
  type ErpAnnouncement,
  type Invoice,
  type Receipt,
} from "@/data/school";
import { toast } from "sonner";

export type ErpState = {
  role: Role;
  setRole: (r: Role) => void;
  roleLabel: string;
  person: string;

  // Continuous Assessment & Gradebook
  results: ResultRow[];
  updateResult: (id: string, patch: Partial<ResultRow>) => void;
  setClassResultStatus: (classId: string, subjectId: string, status: ResultStatus) => void;
  saveDraftResults: (classId: string, subjectId: string) => void;
  submitResultForApproval: (resultId: string) => void;
  submitResultsForApproval: (classId: string, subjectId: string) => void;

  // Selected filters for teaching / assessment
  selectedClassId: string;
  setSelectedClassId: (id: string) => void;
  selectedSubjectId: string;
  setSelectedSubjectId: (id: string) => void;

  // Attendance
  attendance: Record<string, AttendanceMark>;
  attendanceRecords: {
    studentId: string;
    classId: string;
    date: string;
    status: "present" | "absent" | "late" | "excused";
  }[];
  setMark: (studentId: string, mark: AttendanceMark) => void;
  markAttendance: (
    studentId: string,
    classId: string,
    date: string,
    status: "present" | "absent" | "late" | "excused",
  ) => void;
  saveAttendanceSession: (classId: string, date: string) => void;
  saveAttendanceRegister: (classId: string, marks?: Record<string, AttendanceMark>) => void;

  // Approvals & Governance
  approvals: Approval[];
  decideApproval: (id: string, status: ApprovalStatus, note?: string) => void;
  approveResult: (resultId: string, note?: string) => void;
  rejectResult: (resultId: string, note?: string) => void;
  approveAdmission: (appId: string, assignedClassId?: string) => void;
  rejectAdmission: (appId: string, reason?: string) => void;

  // Audit Logs & Activity History
  audit: AuditEntry[];
  auditLogs: AuditEntry[];
  addAuditLog: (action: string, target: string, details?: string) => void;

  // Parent ward selection
  selectedChildId: string | null;
  setSelectedChildId: (id: string) => void;

  // Student directory & Enrolments
  students: Student[];
  applications: EnrolmentApplication[];
  admissions: EnrolmentApplication[];
  addApplication: (
    appData: Omit<EnrolmentApplication, "id" | "appliedAt" | "status">,
  ) => EnrolmentApplication;
  approveApplication: (
    appId: string,
    assignedClassId: string,
  ) => { admissionNo: string; student: Student };
  rejectApplication: (appId: string, reason?: string) => void;
  addStudent: (studentData: Omit<Student, "id" | "admissionNo" | "admittedOn">) => Student;

  // Fees & Bursary
  invoices: Invoice[];
  receipts: Receipt[];
  recordPayment: (
    studentId: string,
    invoiceId: string,
    amount: number,
    method: "Bank transfer" | "POS" | "Cash",
  ) => void;

  // Notifications & Announcements
  notifications: ErpNotification[];
  userNotifications: ErpNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  announcements: ErpAnnouncement[];
  sendAnnouncement: (data: {
    title: string;
    message: string;
    category: string;
    recipients: (Role | "all")[];
    priority: "Normal" | "High" | "Urgent";
  }) => void;
};

const ErpContext = createContext<ErpState | null>(null);

let auditSeq = 8010;
let appSeq = 46;
let studentSeq = 1198;
let notifSeq = 20;
let annSeq = 10;
let rcpSeq = 4120;

export function ErpProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("principal");
  const [results, setResults] = useState<ResultRow[]>(initialResults);
  const [attendance, setAttendance] = useState<Record<string, AttendanceMark>>(initialAttendance);
  const [attendanceRecords, setAttendanceRecords] = useState<
    {
      studentId: string;
      classId: string;
      date: string;
      status: "present" | "absent" | "late" | "excused";
    }[]
  >(() => {
    // Generate initial historical attendance records
    return initialStudents.map((s) => ({
      studentId: s.id,
      classId: s.classId,
      date: "2026-09-10",
      status: initialAttendance[s.id] || "present",
    }));
  });

  const [approvals, setApprovals] = useState<Approval[]>(initialApprovals);
  const [audit, setAudit] = useState<AuditEntry[]>(initialAudit);
  const [selectedChildId, setSelectedChildId] = useState<string | null>("st-1001");
  const [selectedClassId, setSelectedClassId] = useState<string>("c-jss1");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("sub-math");

  // Dynamic state for enrolled students, applications, finances, notifications, announcements
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [applications, setApplications] = useState<EnrolmentApplication[]>(initialApplications);
  const [invoicesList, setInvoicesList] = useState<Invoice[]>(initialInvoices);
  const [receiptsList, setReceiptsList] = useState<Receipt[]>(initialReceipts);
  const [notifications, setNotifications] = useState<ErpNotification[]>(initialNotifications);
  const [announcements, setAnnouncements] = useState<ErpAnnouncement[]>(initialAnnouncements);

  const actor = useMemo(() => ROLES.find((r) => r.id === role) || ROLES[0]!, [role]);

  // Logging engine
  const addAuditLog = useCallback(
    (action: string, target: string, details?: string) => {
      auditSeq += 1;
      const now = new Date();
      const timestamp = `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 5)}`;
      setAudit((prev) => [
        {
          id: `AU-${auditSeq}`,
          actor: actor.person,
          role: actor.label,
          action,
          target,
          at: timestamp,
          details,
          timestamp,
          ip: "102.89.34.02",
        },
        ...prev,
      ]);
    },
    [actor],
  );

  // Helper to push a notification
  const pushNotification = useCallback(
    (
      title: string,
      message: string,
      category: ErpNotification["category"],
      targetRoles: (Role | "all")[],
      linkTab?: string,
      priority: "Normal" | "High" | "Urgent" = "Normal",
    ) => {
      notifSeq += 1;
      const now = new Date();
      const newNotif: ErpNotification = {
        id: `notif-${notifSeq}`,
        title,
        message,
        category,
        targetRoles,
        sender: actor.person,
        senderRole: actor.label,
        createdAt: `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 5)}`,
        read: false,
        linkTab,
        priority,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    },
    [actor],
  );

  // 1. Gradebook score editing
  const updateResult = useCallback((id: string, patch: Partial<ResultRow>) => {
    setResults((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }, []);

  const setClassResultStatus = useCallback(
    (classId: string, subjectId: string, status: ResultStatus) => {
      setResults((prev) =>
        prev.map((r) =>
          r.classId === classId && r.subjectId === subjectId ? { ...r, status } : r,
        ),
      );
      addAuditLog(
        status === "Pending" ? "Submitted results for approval" : `Saved results as ${status}`,
        `${className(classId)} · ${subjectName(subjectId)}`,
      );
    },
    [addAuditLog],
  );

  const saveDraftResults = useCallback(
    (classId: string, subjectId: string) => {
      setResults((prev) =>
        prev.map((r) =>
          r.classId === classId && r.subjectId === subjectId ? { ...r, status: "Draft" } : r,
        ),
      );
      addAuditLog(
        "Saved Gradebook Draft",
        `${className(classId)} · ${subjectName(subjectId)}`,
        "Continuous assessment marks saved locally as draft.",
      );
      toast.info("Gradebook draft saved successfully.");
    },
    [addAuditLog],
  );

  // Teacher submits class subject scores for Executive Approval
  const submitResultsForApproval = useCallback(
    (classId: string, subjectId: string) => {
      // 1. Update results to Pending
      setResults((prev) =>
        prev.map((r) =>
          r.classId === classId && r.subjectId === subjectId ? { ...r, status: "Pending" } : r,
        ),
      );

      // 2. Add or update approval record
      const cName = className(classId);
      const sName = subjectName(subjectId);
      const newApprovalId = `APR-${Date.now().toString().slice(-4)}`;

      setApprovals((prev) => [
        {
          id: newApprovalId,
          title: `${cName} ${sName} Terminal Scores`,
          kind: "Results",
          submittedBy: actor.person,
          submittedRole: actor.label,
          submittedAt: new Date().toISOString().slice(0, 10),
          status: "Pending",
          summary: `Continuous assessment and exam marks for ${cName} submitted by ${actor.person}.`,
          metadata: { classId, subjectId },
        },
        ...prev,
      ]);

      // 3. Notify Principal and Administrator
      pushNotification(
        `Gradebook Submission: ${cName} ${sName}`,
        `${actor.person} submitted continuous assessment scores for ${cName} ${sName} for your executive clearance.`,
        "Approval",
        ["principal", "admin"],
        "approvals",
        "High",
      );

      // 4. Audit Log
      addAuditLog(
        "Submitted Scores for Approval",
        `${cName} · ${sName}`,
        `Submitted term scores for Principal approval.`,
      );

      toast.success(
        `Submitted ${cName} ${sName} scores to Principal's Approval Centre for verification!`,
      );
    },
    [actor, addAuditLog, pushNotification],
  );

  const submitResultForApproval = useCallback(
    (resultId: string) => {
      const res = results.find((r) => r.id === resultId);
      if (res) {
        submitResultsForApproval(res.classId, res.subjectId);
      }
    },
    [results, submitResultsForApproval],
  );

  // 2. Approvals workflow (Principal / Admin decisions)
  const decideApproval = useCallback(
    (id: string, status: ApprovalStatus, note?: string) => {
      setApprovals((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status, note: note ?? a.note } : a)),
      );

      const item = approvals.find((a) => a.id === id);
      const targetTitle = item ? `${item.kind} · ${item.title}` : id;

      // If this is a Results approval, also update the actual Results records!
      if (item && item.kind === "Results" && item.metadata?.classId && item.metadata?.subjectId) {
        const resultStatus: ResultStatus =
          status === "Approved" ? "Approved" : status === "Rejected" ? "Draft" : "Pending";
        setResults((prev) =>
          prev.map((r) =>
            r.classId === item.metadata?.classId && r.subjectId === item.metadata?.subjectId
              ? { ...r, status: resultStatus }
              : r,
          ),
        );

        if (status === "Approved") {
          pushNotification(
            `Results Approved: ${item.title}`,
            `Dr. Aisha Bello has approved terminal scores for ${item.title}. Scores are now published to Parent and Student portals.`,
            "Academic",
            ["teacher", "parent", "student", "admin"],
            "gradebook",
          );
        } else if (status === "Rejected") {
          pushNotification(
            `Revision Requested: ${item.title}`,
            `Results for ${item.title} require revision: ${note || "Please review score entries and resubmit."}`,
            "Academic",
            ["teacher"],
            "gradebook",
            "High",
          );
        }
      }

      addAuditLog(
        status === "Approved"
          ? "Approved Submission"
          : status === "Rejected"
            ? "Rejected Submission"
            : "Requested Correction",
        targetTitle,
        note,
      );

      toast.success(`Workflow item marked as ${status}.`);
    },
    [approvals, addAuditLog, pushNotification],
  );

  const approveResult = useCallback(
    (resultId: string, note?: string) => {
      // Find approval or result
      const item = approvals.find((a) => a.id === resultId);
      if (item) {
        decideApproval(item.id, "Approved", note);
      } else {
        setResults((prev) =>
          prev.map((r) => (r.id === resultId ? { ...r, status: "Approved" } : r)),
        );
        addAuditLog("Approved Subject Result", resultId, note);
        toast.success("Result approved successfully.");
      }
    },
    [approvals, decideApproval, addAuditLog],
  );

  const rejectResult = useCallback(
    (resultId: string, note?: string) => {
      const item = approvals.find((a) => a.id === resultId);
      if (item) {
        decideApproval(item.id, "Rejected", note);
      } else {
        setResults((prev) => prev.map((r) => (r.id === resultId ? { ...r, status: "Draft" } : r)));
        addAuditLog("Rejected Subject Result", resultId, note);
        toast.info("Result rejected and returned to teacher.");
      }
    },
    [approvals, decideApproval, addAuditLog],
  );

  // 3. Attendance
  const setMark = useCallback((studentId: string, mark: AttendanceMark) => {
    setAttendance((prev) => ({ ...prev, [studentId]: mark }));
  }, []);

  const markAttendance = useCallback(
    (
      studentId: string,
      classId: string,
      date: string,
      status: "present" | "absent" | "late" | "excused",
    ) => {
      setAttendance((prev) => ({ ...prev, [studentId]: status }));
      setAttendanceRecords((prev) => {
        const existingIdx = prev.findIndex(
          (rec) => rec.studentId === studentId && rec.date === date,
        );
        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx] = { studentId, classId, date, status };
          return updated;
        }
        return [...prev, { studentId, classId, date, status }];
      });
    },
    [],
  );

  const saveAttendanceSession = useCallback(
    (classId: string, date: string) => {
      const cName = className(classId);
      addAuditLog(
        "Saved Attendance Register",
        `${cName} · ${date}`,
        "Class morning roll call confirmed and committed to database.",
      );
      toast.success(`Attendance register for ${cName} on ${date} saved and synchronized!`);
    },
    [addAuditLog],
  );

  const saveAttendanceRegister = useCallback(
    (classId: string, marks?: Record<string, AttendanceMark>) => {
      if (marks) {
        setAttendance((prev) => ({ ...prev, ...marks }));
      }
      const cName = className(classId);
      addAuditLog("Saved Attendance Register", cName, "Roll call recorded by teacher.");
      toast.success(`Attendance register for ${cName} saved.`);
    },
    [addAuditLog],
  );

  // 4. Admissions & Enrolment
  const addApplication = useCallback(
    (appData: Omit<EnrolmentApplication, "id" | "appliedAt" | "status">) => {
      appSeq += 1;
      const now = new Date();
      const newApp: EnrolmentApplication = {
        ...appData,
        id: `APP-2025-${String(appSeq).padStart(3, "0")}`,
        status: "Pending",
        appliedAt: `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 5)}`,
      };

      setApplications((prev) => [newApp, ...prev]);

      pushNotification(
        "New Student Admission Application",
        `New application submitted for ${newApp.childName} applying into ${newApp.classApplying}.`,
        "Admission",
        ["admin", "principal"],
        "enrolment",
      );

      addAuditLog(
        "New Online Admission Submitted",
        `${newApp.id} · ${newApp.childName} (${newApp.classApplying})`,
      );
      return newApp;
    },
    [addAuditLog, pushNotification],
  );

  const approveApplication = useCallback(
    (appId: string, assignedClassId: string) => {
      studentSeq += 1;
      const targetCls = classes.find((c) => c.id === assignedClassId) || classes[0]!;
      const prefix =
        targetCls.level === "Secondary"
          ? "SEC"
          : targetCls.level === "Primary"
            ? "PRY"
            : targetCls.level === "Early Years"
              ? "EYS"
              : "GEN";
      const admissionNo = `TIA/${prefix}/${studentSeq}`;
      const now = new Date().toISOString().slice(0, 10);

      let createdStudent: Student | null = null;

      setApplications((prev) =>
        prev.map((app) => {
          if (app.id !== appId) return app;

          createdStudent = {
            id: `st-${studentSeq}`,
            admissionNo,
            name: app.childName,
            gender: app.gender,
            dob: app.dob || "2015-05-15",
            classId: assignedClassId,
            guardian: app.parentName,
            relationship: "Guardian",
            guardianPhone: app.phone,
            address: app.address || "Off Arab Road, Kubwa, Abuja",
            house: ["Zamfara", "Kaduna", "Kano", "Sokoto"][studentSeq % 4]!,
            status: "Active",
            admittedOn: now,
            bloodGroup: "O+",
            genotype: "AA",
            stateOfOrigin: "FCT Abuja",
            religion: "Islam",
            hafizJuz: 1,
          };

          return {
            ...app,
            status: "Approved",
            assignedClassId,
            assignedAdmissionNo: admissionNo,
          };
        }),
      );

      if (createdStudent) {
        setStudents((prev) => [createdStudent!, ...prev]);

        // Auto create first term invoice for newly admitted student!
        const newInvId = `INV-${2700 + studentSeq}`;
        const newInvoice: Invoice = {
          id: newInvId,
          invoiceNo: newInvId,
          studentId: (createdStudent as Student).id,
          studentName: (createdStudent as Student).name,
          classId: assignedClassId,
          term: "First Term 2025/2026",
          issued: now,
          due: "2025-09-30",
          items: [
            { label: "Admission & Registration Fee", amount: 50000 },
            { label: "Tuition Fee", amount: 280000 },
            { label: "Uniform & Starter Kit", amount: 45000 },
            { label: "Books & Educational Pack", amount: 35000 },
          ],
          total: 410000,
          paid: 0,
          status: "unpaid",
        };
        setInvoicesList((prev) => [newInvoice, ...prev]);

        addAuditLog(
          "Approved & Enrolled Student",
          `${admissionNo} · ${(createdStudent as Student).name} into ${targetCls.name}`,
        );

        pushNotification(
          "Student Enrolment Completed",
          `${(createdStudent as Student).name} has been officially registered with Admission No ${admissionNo}. Tuition invoice generated.`,
          "Admission",
          ["principal", "admin", "accountant"],
          "students",
        );
      }

      return {
        admissionNo,
        student: createdStudent!,
      };
    },
    [addAuditLog, pushNotification],
  );

  const rejectApplication = useCallback(
    (appId: string, reason?: string) => {
      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status: "Rejected" } : app)),
      );
      addAuditLog("Rejected Enrolment Application", `${appId}${reason ? ` (${reason})` : ""}`);
      toast.info("Enrolment application rejected.");
    },
    [addAuditLog],
  );

  const approveAdmission = useCallback(
    (appId: string, assignedClassId?: string) => {
      approveApplication(appId, assignedClassId || "c-jss1");
      toast.success("Application approved and student enrolled!");
    },
    [approveApplication],
  );

  const rejectAdmission = useCallback(
    (appId: string, reason?: string) => {
      rejectApplication(appId, reason);
    },
    [rejectApplication],
  );

  const addStudent = useCallback(
    (studentData: Omit<Student, "id" | "admissionNo" | "admittedOn">) => {
      studentSeq += 1;
      const targetCls = classes.find((c) => c.id === studentData.classId) || classes[0]!;
      const prefix =
        targetCls.level === "Secondary" ? "SEC" : targetCls.level === "Primary" ? "PRY" : "EYS";
      const admissionNo = `TIA/${prefix}/${studentSeq}`;
      const now = new Date().toISOString().slice(0, 10);

      const newStudent: Student = {
        ...studentData,
        id: `st-${studentSeq}`,
        admissionNo,
        admittedOn: now,
      };

      setStudents((prev) => [newStudent, ...prev]);
      addAuditLog("Enrolled Walk-in Student", `${admissionNo} · ${newStudent.name}`);
      toast.success(`Walk-in pupil ${newStudent.name} successfully registered.`);
      return newStudent;
    },
    [addAuditLog],
  );

  // 5. Bursary & Payment Recording
  const recordPayment = useCallback(
    (
      studentId: string,
      invoiceId: string,
      amount: number,
      method: "Bank transfer" | "POS" | "Cash",
    ) => {
      rcpSeq += 1;
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10);
      const receiptNo = `RCP-${rcpSeq}`;
      const reference = `TIA-PAY-${Date.now().toString().slice(-6)}`;

      let updatedStudentName = "Student";

      // 1. Update invoice
      setInvoicesList((prev) =>
        prev.map((inv) => {
          if (inv.id === invoiceId || inv.invoiceNo === invoiceId) {
            updatedStudentName = inv.studentName;
            const newPaid = Math.min(inv.total, inv.paid + amount);
            const status: "paid" | "partial" | "unpaid" =
              newPaid >= inv.total ? "paid" : newPaid > 0 ? "partial" : "unpaid";
            return {
              ...inv,
              paid: newPaid,
              status,
            };
          }
          return inv;
        }),
      );

      // 2. Add receipt
      const newReceipt: Receipt = {
        id: receiptNo,
        studentId,
        amount,
        method,
        date: dateStr,
        reference,
      };
      setReceiptsList((prev) => [newReceipt, ...prev]);

      // 3. Notify Parent and Admin
      pushNotification(
        `Tuition Payment Acknowledged: ₦${amount.toLocaleString()}`,
        `Payment of ₦${amount.toLocaleString()} via ${method} for ${updatedStudentName} has been verified. Official Receipt: ${receiptNo}.`,
        "Finance",
        ["parent", "principal", "admin", "accountant"],
        "finance",
      );

      // 4. Audit Log
      addAuditLog(
        "Recorded Fee Payment",
        `${receiptNo} · ${updatedStudentName}`,
        `Amount: ₦${amount.toLocaleString()} via ${method} (Ref: ${reference})`,
      );

      toast.success(
        `Receipt ${receiptNo} issued! Payment of ₦${amount.toLocaleString()} recorded.`,
      );
    },
    [addAuditLog, pushNotification],
  );

  // 6. Notifications & Announcements
  const userNotifications = useMemo(() => {
    return notifications.filter(
      (n) => n.targetRoles.includes(role) || n.targetRoles.includes("all"),
    );
  }, [notifications, role]);

  const unreadCount = useMemo(() => {
    return userNotifications.filter((n) => !n.read).length;
  }, [userNotifications]);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((n) => {
        if (n.targetRoles.includes(role) || n.targetRoles.includes("all")) {
          return { ...n, read: true };
        }
        return n;
      }),
    );
    toast.success("All notifications marked as read.");
  }, [role]);

  // Administrator Announcement Centre
  const sendAnnouncement = useCallback(
    (data: {
      title: string;
      message: string;
      category: string;
      recipients: (Role | "all")[];
      priority: "Normal" | "High" | "Urgent";
    }) => {
      annSeq += 1;
      const now = new Date();
      const dateStr = `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 5)}`;

      const newAnnouncement: ErpAnnouncement = {
        id: `ann-${annSeq}`,
        title: data.title,
        message: data.message,
        category: data.category,
        recipients: data.recipients,
        priority: data.priority,
        sender: actor.person,
        senderRole: actor.label,
        createdAt: dateStr,
      };

      setAnnouncements((prev) => [newAnnouncement, ...prev]);

      // Generate notifications for targeted recipient roles!
      notifSeq += 1;
      const newNotif: ErpNotification = {
        id: `notif-${notifSeq}`,
        title: `School Notice: ${data.title}`,
        message: data.message,
        category: "Announcement",
        targetRoles: data.recipients,
        sender: actor.person,
        senderRole: actor.label,
        createdAt: dateStr,
        read: false,
        priority: data.priority,
      };
      setNotifications((prev) => [newNotif, ...prev]);

      const recipientNames = data.recipients.includes("all")
        ? "All Users (Whole School)"
        : data.recipients.map((r) => r.toUpperCase()).join(", ");

      addAuditLog(
        "Sent School Announcement",
        data.title,
        `Dispatched to: ${recipientNames} (Priority: ${data.priority})`,
      );

      toast.success(`Announcement dispatched to ${recipientNames}!`);
    },
    [actor, addAuditLog],
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
      saveDraftResults,
      submitResultForApproval,
      submitResultsForApproval,

      selectedClassId,
      setSelectedClassId,
      selectedSubjectId,
      setSelectedSubjectId,

      attendance,
      attendanceRecords,
      setMark,
      markAttendance,
      saveAttendanceSession,
      saveAttendanceRegister,

      approvals,
      decideApproval,
      approveResult,
      rejectResult,
      approveAdmission,
      rejectAdmission,

      audit,
      auditLogs: audit,
      addAuditLog,

      selectedChildId,
      setSelectedChildId,

      students,
      applications,
      admissions: applications,
      addApplication,
      approveApplication,
      rejectApplication,
      approveAdmission,
      rejectAdmission,
      addStudent,

      invoices: invoicesList,
      receipts: receiptsList,
      recordPayment,

      notifications,
      userNotifications,
      unreadCount,
      markAsRead,
      markAllAsRead,

      announcements,
      sendAnnouncement,
    }),
    [
      role,
      actor,
      results,
      updateResult,
      setClassResultStatus,
      saveDraftResults,
      submitResultForApproval,
      submitResultsForApproval,
      selectedClassId,
      selectedSubjectId,
      attendance,
      attendanceRecords,
      setMark,
      markAttendance,
      saveAttendanceSession,
      saveAttendanceRegister,
      approvals,
      decideApproval,
      approveResult,
      rejectResult,
      approveAdmission,
      rejectAdmission,
      audit,
      addAuditLog,
      selectedChildId,
      students,
      applications,
      addApplication,
      approveApplication,
      rejectApplication,
      addStudent,
      invoicesList,
      receiptsList,
      recordPayment,
      notifications,
      userNotifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      announcements,
      sendAnnouncement,
    ],
  );

  return <ErpContext.Provider value={value}>{children}</ErpContext.Provider>;
}

export function useErp() {
  const ctx = useContext(ErpContext);
  if (!ctx) throw new Error("useErp must be used inside ErpProvider");
  return ctx;
}
