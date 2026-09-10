/**
 * Demo dataset for the TIA Digital School ERP prototype.
 * Everything here is mock data — no backend is connected yet.
 */

export const SCHOOL = {
  name: "Talent International Academy",
  shortName: "TIA",
  motto: "Knowledge, Character, Faith",
  tagline:
    "Empowering Student Knowledge Through Conventional Education, Qur'anic Memorization, Arabic & Islamic Studies",
  address: "Plot 214, Airport Road, Lugbe, Abuja, FCT",
  phone: "+234 803 000 1122",
  altPhone: "+234 705 411 8890",
  email: "info@tiaabuja.com",
  website: "tiaabuja.com",
  session: "2025/2026",
  term: "First Term",
  resumption: "8 September 2025",
  hours: "Mon – Fri, 7:30am – 3:30pm",
} as const;

export type Level =
  | "Early Years"
  | "Primary"
  | "Secondary"
  | "Special Education"
  | "Islamiyya";

export type Role =
  | "principal"
  | "admin"
  | "teacher"
  | "accountant"
  | "parent"
  | "student";

export const ROLES: { id: Role; label: string; person: string }[] = [
  { id: "principal", label: "Principal", person: "Dr. Aisha Bello" },
  { id: "admin", label: "Administrator", person: "Mr. Suleiman Yakubu" },
  { id: "teacher", label: "Teacher", person: "Mrs. Halima Danjuma" },
  { id: "accountant", label: "Accountant", person: "Mr. Chuka Obi" },
  { id: "parent", label: "Parent", person: "Alhaji Musa Ibrahim" },
  { id: "student", label: "Student", person: "Zainab Musa Ibrahim" },
];

export type SchoolClass = {
  id: string;
  name: string;
  level: Level;
  teacherId: string;
  room: string;
  capacity: number;
};

export const classes: SchoolClass[] = [
  { id: "c-cre", name: "Creche", level: "Early Years", teacherId: "t-06", room: "EY 1", capacity: 20 },
  { id: "c-nur1", name: "Nursery 1", level: "Early Years", teacherId: "t-06", room: "EY 2", capacity: 24 },
  { id: "c-nur2", name: "Nursery 2", level: "Early Years", teacherId: "t-07", room: "EY 3", capacity: 24 },
  { id: "c-pry1", name: "Primary 1", level: "Primary", teacherId: "t-03", room: "PB 1", capacity: 30 },
  { id: "c-pry3", name: "Primary 3", level: "Primary", teacherId: "t-04", room: "PB 3", capacity: 30 },
  { id: "c-pry5", name: "Primary 5", level: "Primary", teacherId: "t-05", room: "PB 5", capacity: 30 },
  { id: "c-jss1", name: "JSS 1", level: "Secondary", teacherId: "t-01", room: "SB 1", capacity: 32 },
  { id: "c-jss3", name: "JSS 3", level: "Secondary", teacherId: "t-02", room: "SB 3", capacity: 32 },
  { id: "c-sss1", name: "SSS 1", level: "Secondary", teacherId: "t-08", room: "SB 5", capacity: 30 },
  { id: "c-sss3", name: "SSS 3", level: "Secondary", teacherId: "t-09", room: "SB 7", capacity: 28 },
  { id: "c-isl", name: "Islamiyya (Tahfiz)", level: "Islamiyya", teacherId: "t-10", room: "IS 1", capacity: 26 },
  { id: "c-spc", name: "Inclusive Unit", level: "Special Education", teacherId: "t-11", room: "IU 1", capacity: 12 },
];

export type Staff = {
  id: string;
  name: string;
  role: string;
  gender: "Male" | "Female";
  subjects: string[];
  classes: string[];
  phone: string;
  email: string;
  qualification: string;
  joined: string;
  status: "Active" | "On leave";
};

export const staff: Staff[] = [
  { id: "t-01", name: "Mrs. Halima Danjuma", role: "Class Teacher / Mathematics", gender: "Female", subjects: ["s-mth", "s-bsc"], classes: ["c-jss1", "c-jss3"], phone: "+234 803 221 0011", email: "h.danjuma@tiaabuja.com", qualification: "B.Sc. Ed. Mathematics", joined: "2019-09-02", status: "Active" },
  { id: "t-02", name: "Mr. Emeka Nwosu", role: "English Language", gender: "Male", subjects: ["s-eng", "s-lit"], classes: ["c-jss3", "c-sss1"], phone: "+234 806 553 8822", email: "e.nwosu@tiaabuja.com", qualification: "B.A. English", joined: "2020-01-13", status: "Active" },
  { id: "t-03", name: "Mrs. Grace Adeyemi", role: "Primary Class Teacher", gender: "Female", subjects: ["s-eng", "s-mth"], classes: ["c-pry1"], phone: "+234 809 118 4477", email: "g.adeyemi@tiaabuja.com", qualification: "NCE / B.Ed.", joined: "2018-09-10", status: "Active" },
  { id: "t-04", name: "Mr. Ibrahim Sani", role: "Primary Class Teacher", gender: "Male", subjects: ["s-bsc", "s-mth"], classes: ["c-pry3"], phone: "+234 802 664 2210", email: "i.sani@tiaabuja.com", qualification: "B.Ed. Primary Education", joined: "2021-09-06", status: "Active" },
  { id: "t-05", name: "Mrs. Fatima Aliyu", role: "Primary Class Teacher", gender: "Female", subjects: ["s-eng", "s-soc"], classes: ["c-pry5"], phone: "+234 807 900 3345", email: "f.aliyu@tiaabuja.com", qualification: "B.Ed. Language Arts", joined: "2017-09-11", status: "Active" },
  { id: "t-06", name: "Miss Blessing Okon", role: "Early Years Lead", gender: "Female", subjects: ["s-lit"], classes: ["c-cre", "c-nur1"], phone: "+234 805 442 7719", email: "b.okon@tiaabuja.com", qualification: "NCE Early Childhood", joined: "2022-01-10", status: "Active" },
  { id: "t-07", name: "Miss Amina Garba", role: "Early Years Teacher", gender: "Female", subjects: ["s-lit"], classes: ["c-nur2"], phone: "+234 813 220 5567", email: "a.garba@tiaabuja.com", qualification: "NCE Early Childhood", joined: "2023-09-04", status: "On leave" },
  { id: "t-08", name: "Mr. Tunde Bakare", role: "Physics / Further Maths", gender: "Male", subjects: ["s-phy", "s-mth"], classes: ["c-sss1"], phone: "+234 802 771 9903", email: "t.bakare@tiaabuja.com", qualification: "B.Sc. Physics", joined: "2019-04-22", status: "Active" },
  { id: "t-09", name: "Mrs. Ngozi Eze", role: "Chemistry / Biology", gender: "Female", subjects: ["s-che", "s-bio"], classes: ["c-sss3"], phone: "+234 808 334 1120", email: "n.eze@tiaabuja.com", qualification: "M.Sc. Chemistry", joined: "2016-09-05", status: "Active" },
  { id: "t-10", name: "Ustaz Abdulrahman Yusuf", role: "Qur'an, Arabic & Islamic Studies", gender: "Male", subjects: ["s-qur", "s-ara", "s-isl"], classes: ["c-isl", "c-jss1"], phone: "+234 806 110 2244", email: "a.yusuf@tiaabuja.com", qualification: "B.A. Islamic Studies, Ijazah", joined: "2015-09-07", status: "Active" },
  { id: "t-11", name: "Mrs. Ruth Danladi", role: "Special Needs Coordinator", gender: "Female", subjects: ["s-lit", "s-eng"], classes: ["c-spc"], phone: "+234 810 556 8834", email: "r.danladi@tiaabuja.com", qualification: "M.Ed. Special Education", joined: "2020-09-14", status: "Active" },
  { id: "t-12", name: "Mr. Peter Audu", role: "ICT & Computer Studies", gender: "Male", subjects: ["s-ict"], classes: ["c-jss1", "c-jss3", "c-sss1"], phone: "+234 811 220 9987", email: "p.audu@tiaabuja.com", qualification: "B.Sc. Computer Science", joined: "2021-01-11", status: "Active" },
];

export type Subject = {
  id: string;
  name: string;
  code: string;
  levels: Level[];
  teacherId: string;
};

export const subjects: Subject[] = [
  { id: "s-eng", name: "English Language", code: "ENG", levels: ["Primary", "Secondary"], teacherId: "t-02" },
  { id: "s-mth", name: "Mathematics", code: "MTH", levels: ["Primary", "Secondary"], teacherId: "t-01" },
  { id: "s-bsc", name: "Basic Science", code: "BSC", levels: ["Primary", "Secondary"], teacherId: "t-04" },
  { id: "s-soc", name: "Social Studies", code: "SOS", levels: ["Primary", "Secondary"], teacherId: "t-05" },
  { id: "s-qur", name: "Qur'anic Memorization (Tahfiz)", code: "QUR", levels: ["Islamiyya", "Primary", "Secondary"], teacherId: "t-10" },
  { id: "s-ara", name: "Arabic Language", code: "ARA", levels: ["Islamiyya", "Primary", "Secondary"], teacherId: "t-10" },
  { id: "s-isl", name: "Islamic Studies", code: "IRS", levels: ["Islamiyya", "Primary", "Secondary"], teacherId: "t-10" },
  { id: "s-ict", name: "Computer Studies", code: "ICT", levels: ["Primary", "Secondary"], teacherId: "t-12" },
  { id: "s-phy", name: "Physics", code: "PHY", levels: ["Secondary"], teacherId: "t-08" },
  { id: "s-che", name: "Chemistry", code: "CHE", levels: ["Secondary"], teacherId: "t-09" },
  { id: "s-bio", name: "Biology", code: "BIO", levels: ["Secondary"], teacherId: "t-09" },
  { id: "s-lit", name: "Literacy & Numeracy", code: "LIT", levels: ["Early Years", "Special Education"], teacherId: "t-06" },
];

export type Student = {
  id: string;
  admissionNo: string;
  name: string;
  gender: "Male" | "Female";
  dob: string;
  classId: string;
  guardian: string;
  relationship: string;
  guardianPhone: string;
  address: string;
  house: string;
  status: "Active" | "Graduated" | "Withdrawn";
  admittedOn: string;
  bloodGroup: string;
  genotype: string;
  stateOfOrigin: string;
  religion: string;
  hafizJuz: number;
};

const firstNamesF = ["Zainab", "Aisha", "Maryam", "Hauwa", "Chiamaka", "Grace", "Fatima", "Halima", "Rukayya", "Blessing", "Amina", "Nafisa"];
const firstNamesM = ["Musa", "Abdullahi", "Ibrahim", "Emeka", "Daniel", "Yusuf", "Suleiman", "Chinedu", "Ahmed", "Samuel", "Bashir", "Tobi"];
const surnames = ["Ibrahim", "Danjuma", "Okonkwo", "Adeyemi", "Sani", "Bello", "Nwosu", "Aliyu", "Yakubu", "Eze", "Garba", "Audu", "Lawal", "Obi"];
const houses = ["Zamfara (Gold)", "Kaduna (Navy)", "Kano (Emerald)", "Sokoto (White)"];
const states = ["FCT", "Kaduna", "Niger", "Kano", "Anambra", "Lagos", "Kwara", "Bauchi"];

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length]!;
}

export const students: Student[] = classes.flatMap((cls, ci) =>
  Array.from({ length: cls.level === "Special Education" ? 4 : 6 }, (_, si) => {
    const i = ci * 7 + si;
    const female = (i + ci) % 2 === 0;
    const first = female ? pick(firstNamesF, i) : pick(firstNamesM, i + 3);
    const sur = pick(surnames, i + ci);
    const idNum = 1000 + ci * 20 + si;
    return {
      id: `st-${idNum}`,
      admissionNo: `TIA/${cls.level === "Secondary" ? "SEC" : cls.level === "Primary" ? "PRY" : "EYS"}/${idNum}`,
      name: `${first} ${sur}`,
      gender: female ? ("Female" as const) : ("Male" as const),
      dob: `${2020 - ci}-0${(si % 9) + 1}-1${si % 9}`,
      classId: cls.id,
      guardian: `${female ? "Alhaji" : "Mr."} ${pick(firstNamesM, i + 1)} ${sur}`,
      relationship: i % 4 === 0 ? "Mother" : "Father",
      guardianPhone: `+234 80${(i % 9) + 1} ${100 + i} ${2000 + i * 3}`,
      address: `No. ${12 + i} ${pick(["Airport Road", "Gwarinpa Estate", "Kubwa Phase 2", "Lokogoma District", "Apo Legislative Quarters"], i)}, Abuja`,
      house: pick(houses, i),
      status: "Active" as const,
      admittedOn: `${2019 + (ci % 6)}-09-0${(si % 8) + 1}`,
      bloodGroup: pick(["O+", "A+", "B+", "AB+", "O-"], i),
      genotype: pick(["AA", "AS", "AA", "AA"], i),
      stateOfOrigin: pick(states, i),
      religion: i % 3 === 0 ? "Christianity" : "Islam",
      hafizJuz: (i * 3) % 31,
    };
  }),
);

export function className(classId: string) {
  return classes.find((c) => c.id === classId)?.name ?? "—";
}
export function staffName(id: string) {
  return staff.find((s) => s.id === id)?.name ?? "—";
}
export function subjectName(id: string) {
  return subjects.find((s) => s.id === id)?.name ?? "—";
}

/* ---------------------------------- grading --------------------------------- */

export function gradeFor(total: number) {
  if (total >= 75) return { grade: "A1", remark: "Excellent" };
  if (total >= 70) return { grade: "B2", remark: "Very Good" };
  if (total >= 65) return { grade: "B3", remark: "Good" };
  if (total >= 60) return { grade: "C4", remark: "Credit" };
  if (total >= 55) return { grade: "C5", remark: "Credit" };
  if (total >= 50) return { grade: "C6", remark: "Credit" };
  if (total >= 45) return { grade: "D7", remark: "Pass" };
  if (total >= 40) return { grade: "E8", remark: "Weak Pass" };
  return { grade: "F9", remark: "Fail" };
}

export type ResultStatus = "Draft" | "Pending" | "Approved" | "Rejected";

export type ResultRow = {
  id: string;
  studentId: string;
  classId: string;
  subjectId: string;
  term: string;
  ca1: number | null;
  ca2: number | null;
  exam: number | null;
  status: ResultStatus;
  remark: string;
};

function subjectsForClass(cls: SchoolClass) {
  return subjects.filter((s) => s.levels.includes(cls.level)).slice(0, 7);
}

export const initialResults: ResultRow[] = students.flatMap((st, sti) => {
  const cls = classes.find((c) => c.id === st.classId)!;
  return subjectsForClass(cls).map((sub, i) => {
    const seed = (sti * 13 + i * 7) % 30;
    const ca1 = 10 + (seed % 10);
    const ca2 = 9 + ((seed + 4) % 11);
    const exam = 32 + ((seed * 3) % 28);
    const status: ResultStatus =
      sti % 9 === 0 ? "Draft" : sti % 7 === 0 ? "Pending" : sti % 11 === 0 ? "Rejected" : "Approved";
    return {
      id: `r-${st.id}-${sub.id}`,
      studentId: st.id,
      classId: st.classId,
      subjectId: sub.id,
      term: `${SCHOOL.term} ${SCHOOL.session}`,
      ca1,
      ca2,
      exam,
      status,
      remark: gradeFor(ca1 + ca2 + exam).remark,
    };
  });
});

/* -------------------------------- attendance -------------------------------- */

export type AttendanceMark = "present" | "absent" | "late" | "excused";

export const initialAttendance: Record<string, AttendanceMark> = Object.fromEntries(
  students.map((st, i) => [
    st.id,
    (i % 13 === 0 ? "absent" : i % 9 === 0 ? "late" : i % 17 === 0 ? "excused" : "present") as AttendanceMark,
  ]),
);

export function attendanceSummary(studentId: string) {
  const seed = studentId.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const present = 52 + (seed % 8);
  const absent = 2 + (seed % 4);
  const late = 1 + (seed % 3);
  const excused = seed % 3;
  const total = present + absent + late + excused;
  return {
    present,
    absent,
    late,
    excused,
    total,
    rate: Math.round(((present + late) / total) * 100),
  };
}

/* ----------------------------------- fees ----------------------------------- */

export type Invoice = {
  id: string;
  studentId: string;
  term: string;
  issued: string;
  due: string;
  items: { label: string; amount: number }[];
  paid: number;
};

export const invoices: Invoice[] = students.map((st, i) => {
  const cls = classes.find((c) => c.id === st.classId)!;
  const tuition =
    cls.level === "Secondary" ? 320000 : cls.level === "Primary" ? 240000 : cls.level === "Special Education" ? 380000 : 180000;
  const items = [
    { label: "Tuition", amount: tuition },
    { label: "Books & Materials", amount: 35000 },
    { label: "Islamiyya / Tahfiz", amount: 25000 },
    { label: "Uniform & Sportswear", amount: 22000 },
    { label: "Development Levy", amount: 18000 },
  ];
  const total = items.reduce((a, b) => a + b.amount, 0);
  const paid = i % 5 === 0 ? 0 : i % 3 === 0 ? Math.round(total * 0.5) : total;
  return {
    id: `INV-${2600 + i}`,
    studentId: st.id,
    term: `${SCHOOL.term} ${SCHOOL.session}`,
    issued: "2025-09-08",
    due: "2025-09-30",
    items,
    paid,
  };
});

export function invoiceTotal(inv: Invoice) {
  return inv.items.reduce((a, b) => a + b.amount, 0);
}
export function invoiceStatus(inv: Invoice): "Paid" | "Part payment" | "Unpaid" {
  const total = invoiceTotal(inv);
  if (inv.paid >= total) return "Paid";
  if (inv.paid > 0) return "Part payment";
  return "Unpaid";
}
export function naira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export type Receipt = {
  id: string;
  studentId: string;
  amount: number;
  method: "Bank transfer" | "POS" | "Cash";
  date: string;
  reference: string;
};

export const receipts: Receipt[] = invoices
  .filter((i) => i.paid > 0)
  .slice(0, 14)
  .map((inv, i) => ({
    id: `RCP-${4100 + i}`,
    studentId: inv.studentId,
    amount: inv.paid,
    method: (["Bank transfer", "POS", "Cash"] as const)[i % 3],
    date: `2025-09-${String(9 + (i % 20)).padStart(2, "0")}`,
    reference: `TIA-PAY-${77120 + i * 4}`,
  }));

/* -------------------------------- admissions -------------------------------- */

export type Application = {
  id: string;
  applicant: string;
  classApplied: string;
  guardian: string;
  phone: string;
  submitted: string;
  stage: "New" | "Screening" | "Interview" | "Offered" | "Enrolled" | "Declined";
};

export const applications: Application[] = [
  { id: "APP-3001", applicant: "Khadija Umar", classApplied: "Nursery 2", guardian: "Mrs. Zahra Umar", phone: "+234 803 555 0091", submitted: "2025-09-02", stage: "New" },
  { id: "APP-3002", applicant: "Daniel Okafor", classApplied: "Primary 3", guardian: "Mr. Paul Okafor", phone: "+234 806 220 7781", submitted: "2025-09-03", stage: "Screening" },
  { id: "APP-3003", applicant: "Sadiq Bello", classApplied: "JSS 1", guardian: "Alhaji Kabir Bello", phone: "+234 810 993 2214", submitted: "2025-09-04", stage: "Interview" },
  { id: "APP-3004", applicant: "Miriam Joseph", classApplied: "SSS 1", guardian: "Mrs. Deborah Joseph", phone: "+234 802 447 1180", submitted: "2025-09-05", stage: "Offered" },
  { id: "APP-3005", applicant: "Yusuf Adamu", classApplied: "Islamiyya (Tahfiz)", guardian: "Mallam Adamu Sule", phone: "+234 807 118 3390", submitted: "2025-09-05", stage: "New" },
  { id: "APP-3006", applicant: "Precious Eze", classApplied: "Inclusive Unit", guardian: "Mr. Kingsley Eze", phone: "+234 813 664 2200", submitted: "2025-09-06", stage: "Screening" },
  { id: "APP-3007", applicant: "Hafsat Idris", classApplied: "Primary 1", guardian: "Hajiya Salamatu Idris", phone: "+234 805 771 4409", submitted: "2025-09-06", stage: "Enrolled" },
];

/* --------------------------------- approvals -------------------------------- */

export type ApprovalKind = "Result" | "Admission" | "Document";
export type ApprovalStatus = "Pending" | "Approved" | "Rejected" | "Correction requested";

export type Approval = {
  id: string;
  kind: ApprovalKind;
  title: string;
  detail: string;
  submittedBy: string;
  submittedOn: string;
  status: ApprovalStatus;
  note?: string;
};

export const initialApprovals: Approval[] = [
  { id: "AP-9001", kind: "Result", title: "JSS 1 — Mathematics, First Term", detail: "32 students · CA1, CA2 and Exam scores complete", submittedBy: "Mrs. Halima Danjuma", submittedOn: "2025-09-09", status: "Pending" },
  { id: "AP-9002", kind: "Result", title: "SSS 3 — Chemistry, First Term", detail: "28 students · 2 entries missing exam score", submittedBy: "Mrs. Ngozi Eze", submittedOn: "2025-09-09", status: "Pending" },
  { id: "AP-9003", kind: "Result", title: "Islamiyya — Tahfiz assessment", detail: "26 students · Juz progress and tajweed grading", submittedBy: "Ustaz Abdulrahman Yusuf", submittedOn: "2025-09-08", status: "Pending" },
  { id: "AP-9004", kind: "Admission", title: "Offer of admission — Miriam Joseph (SSS 1)", detail: "Screening score 82% · interview passed", submittedBy: "Mr. Suleiman Yakubu", submittedOn: "2025-09-08", status: "Pending" },
  { id: "AP-9005", kind: "Document", title: "Transfer certificate — Sadiq Bello", detail: "Previous school records uploaded for verification", submittedBy: "Mr. Suleiman Yakubu", submittedOn: "2025-09-07", status: "Pending" },
  { id: "AP-9006", kind: "Result", title: "Primary 5 — English Language", detail: "30 students · resubmitted after correction", submittedBy: "Mrs. Fatima Aliyu", submittedOn: "2025-09-06", status: "Approved" },
  { id: "AP-9007", kind: "Document", title: "Medical report — Precious Eze", detail: "Inclusive unit support plan attached", submittedBy: "Mrs. Ruth Danladi", submittedOn: "2025-09-05", status: "Correction requested", note: "Please attach the paediatrician's signed assessment." },
];

/* --------------------------------- audit log -------------------------------- */

export type AuditEntry = {
  id: string;
  actor: string;
  role: string;
  action: string;
  target: string;
  at: string;
  ip: string;
};

export const initialAudit: AuditEntry[] = [
  { id: "AU-7001", actor: "Mrs. Halima Danjuma", role: "Teacher", action: "Submitted results for approval", target: "JSS 1 · Mathematics", at: "2025-09-09 14:12", ip: "102.89.34.11" },
  { id: "AU-7002", actor: "Dr. Aisha Bello", role: "Principal", action: "Approved result sheet", target: "Primary 5 · English Language", at: "2025-09-09 12:40", ip: "102.89.34.02" },
  { id: "AU-7003", actor: "Mr. Chuka Obi", role: "Accountant", action: "Recorded payment", target: "INV-2604 · ₦180,000", at: "2025-09-09 11:05", ip: "197.210.55.90" },
  { id: "AU-7004", actor: "Mr. Suleiman Yakubu", role: "Admin", action: "Created student record", target: "Hafsat Idris · Primary 1", at: "2025-09-08 16:22", ip: "102.89.34.07" },
  { id: "AU-7005", actor: "Ustaz Abdulrahman Yusuf", role: "Teacher", action: "Marked attendance", target: "Islamiyya (Tahfiz) · 26 students", at: "2025-09-08 08:05", ip: "102.89.34.19" },
  { id: "AU-7006", actor: "Mrs. Ruth Danladi", role: "Teacher", action: "Uploaded document", target: "Medical report · Precious Eze", at: "2025-09-05 10:31", ip: "102.89.34.44" },
  { id: "AU-7007", actor: "Dr. Aisha Bello", role: "Principal", action: "Requested correction", target: "Medical report · Precious Eze", at: "2025-09-05 15:02", ip: "102.89.34.02" },
  { id: "AU-7008", actor: "Mr. Peter Audu", role: "Teacher", action: "Published learning material", target: "JSS 3 · Spreadsheet basics", at: "2025-09-04 09:48", ip: "102.89.34.31" },
];

/* ----------------------------------- exams ---------------------------------- */

export const exams = [
  { id: "EX-01", title: "First Term Mid-Term Test", scope: "Primary & Secondary", starts: "2025-10-13", ends: "2025-10-17", status: "Scheduled" },
  { id: "EX-02", title: "Tahfiz Recitation Assessment", scope: "Islamiyya", starts: "2025-10-20", ends: "2025-10-22", status: "Scheduled" },
  { id: "EX-03", title: "First Term Examination", scope: "All levels", starts: "2025-12-01", ends: "2025-12-12", status: "Draft" },
  { id: "EX-04", title: "Mock WAEC / NECO", scope: "SSS 3", starts: "2025-11-10", ends: "2025-11-21", status: "Scheduled" },
];

/* --------------------------------- timetable -------------------------------- */

export const periods = ["08:00 – 08:45", "08:45 – 09:30", "09:30 – 10:15", "10:45 – 11:30", "11:30 – 12:15", "13:00 – 13:45"];
export const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const timetable: Record<string, string[]> = {
  Monday: ["English Language", "Mathematics", "Qur'an (Tahfiz)", "Basic Science", "Arabic", "Computer Studies"],
  Tuesday: ["Mathematics", "Islamic Studies", "English Language", "Social Studies", "Physical Education", "Qur'an (Tahfiz)"],
  Wednesday: ["Basic Science", "Arabic", "Mathematics", "English Language", "Computer Studies", "Creative Arts"],
  Thursday: ["Qur'an (Tahfiz)", "Social Studies", "Mathematics", "Islamic Studies", "English Language", "Library"],
  Friday: ["English Language", "Mathematics", "Arabic", "Jumu'ah Preparation", "Assembly & Clubs", "Prep"],
};

/* --------------------------- learning materials ---------------------------- */

export const materials = [
  { id: "M-01", title: "Mathematics — Fractions worksheet", subject: "Mathematics", classId: "c-pry5", type: "PDF", size: "480 KB", by: "Mrs. Fatima Aliyu", date: "2025-09-08" },
  { id: "M-02", title: "Qur'an — Juz 3 memorization plan", subject: "Qur'anic Memorization", classId: "c-isl", type: "PDF", size: "310 KB", by: "Ustaz Abdulrahman Yusuf", date: "2025-09-07" },
  { id: "M-03", title: "Basic Science — Living things slides", subject: "Basic Science", classId: "c-jss1", type: "Slides", size: "2.1 MB", by: "Mr. Ibrahim Sani", date: "2025-09-06" },
  { id: "M-04", title: "English — Comprehension passages", subject: "English Language", classId: "c-jss3", type: "PDF", size: "690 KB", by: "Mr. Emeka Nwosu", date: "2025-09-05" },
  { id: "M-05", title: "Arabic — Vocabulary audio drill", subject: "Arabic Language", classId: "c-jss1", type: "Audio", size: "8.4 MB", by: "Ustaz Abdulrahman Yusuf", date: "2025-09-04" },
  { id: "M-06", title: "Computer Studies — Spreadsheet basics", subject: "Computer Studies", classId: "c-jss3", type: "Video", size: "42 MB", by: "Mr. Peter Audu", date: "2025-09-04" },
];

/* ----------------------------- charts / analytics --------------------------- */

export const populationByLevel = [
  { level: "Early Years", students: 148, capacity: 180 },
  { level: "Primary", students: 412, capacity: 480 },
  { level: "Secondary", students: 386, capacity: 420 },
  { level: "Islamiyya", students: 214, capacity: 240 },
  { level: "Special Ed.", students: 34, capacity: 48 },
];

export const attendanceTrend = [
  { week: "Wk 1", rate: 91 },
  { week: "Wk 2", rate: 94 },
  { week: "Wk 3", rate: 92 },
  { week: "Wk 4", rate: 96 },
  { week: "Wk 5", rate: 95 },
  { week: "Wk 6", rate: 97 },
];

export const academicPerformance = [
  { subject: "English", average: 68 },
  { subject: "Maths", average: 64 },
  { subject: "Basic Sci.", average: 71 },
  { subject: "Qur'an", average: 82 },
  { subject: "Arabic", average: 76 },
  { subject: "ICT", average: 73 },
];

export const feesCollection = [
  { month: "Apr", collected: 41, outstanding: 12 },
  { month: "May", collected: 48, outstanding: 10 },
  { month: "Jun", collected: 52, outstanding: 9 },
  { month: "Jul", collected: 33, outstanding: 14 },
  { month: "Aug", collected: 29, outstanding: 16 },
  { month: "Sep", collected: 61, outstanding: 21 },
];

export const activityTimeline = [
  { id: 1, title: "JSS 1 Mathematics results submitted", by: "Mrs. Halima Danjuma", when: "12 minutes ago", kind: "result" as const },
  { id: 2, title: "₦180,000 fee payment confirmed", by: "Mr. Chuka Obi", when: "1 hour ago", kind: "fee" as const },
  { id: 3, title: "New admission enquiry — Nursery 2", by: "Website form", when: "2 hours ago", kind: "admission" as const },
  { id: 4, title: "Attendance completed for Islamiyya (Tahfiz)", by: "Ustaz Abdulrahman Yusuf", when: "Today, 8:05am", kind: "attendance" as const },
  { id: 5, title: "Mock WAEC timetable published", by: "Mr. Suleiman Yakubu", when: "Yesterday", kind: "exam" as const },
  { id: 6, title: "Medical report correction requested", by: "Dr. Aisha Bello", when: "4 days ago", kind: "document" as const },
];

/* ------------------------------- website content ---------------------------- */

export const news = [
  { id: "n-1", title: "TIA pupils sweep FCT Qur'anic recitation competition", excerpt: "Six of our Tahfiz students placed in the top ten at the FCT inter-school recitation held in Garki.", date: "2025-09-05", category: "Achievement" },
  { id: "n-2", title: "2025/2026 session resumption and reopening guide", excerpt: "Classes resume Monday 8 September. Find the term calendar, uniform list and bus routes inside.", date: "2025-09-01", category: "Announcement" },
  { id: "n-3", title: "New science and robotics laboratory commissioned", excerpt: "A fully equipped lab now supports Physics, Chemistry, Biology and our after-school robotics club.", date: "2025-08-22", category: "Campus" },
  { id: "n-4", title: "Parent–teacher conference: what to expect", excerpt: "Termly conferences hold in week six. Book your slot through the parent portal.", date: "2025-08-14", category: "Parents" },
  { id: "n-5", title: "Inter-house sports returns with four houses", excerpt: "Zamfara, Kaduna, Kano and Sokoto houses compete across track, field and Qur'an quiz events.", date: "2025-07-30", category: "Student Life" },
  { id: "n-6", title: "SSS 3 records 100% WAEC credit passes in Maths", excerpt: "Our graduating set posted the school's strongest external results to date.", date: "2025-07-18", category: "Achievement" },
];

export const upcomingEvents = [
  { id: "e-1", title: "Open Day & Campus Tour", date: "2025-09-27", time: "10:00am", venue: "Main Hall" },
  { id: "e-2", title: "Mid-Term Test begins", date: "2025-10-13", time: "8:00am", venue: "All classrooms" },
  { id: "e-3", title: "Tahfiz Recitation Assessment", date: "2025-10-20", time: "9:00am", venue: "Islamiyya Block" },
  { id: "e-4", title: "Inter-House Sports Festival", date: "2025-11-08", time: "8:30am", venue: "TIA Sports Field" },
];

export const facts = [
  { value: "1,194", label: "Students enrolled" },
  { value: "86", label: "Teaching staff" },
  { value: "18", label: "Years of service" },
  { value: "98%", label: "WAEC credit passes" },
];
