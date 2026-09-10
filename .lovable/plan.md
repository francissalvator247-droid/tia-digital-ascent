# TIA Digital School ERP — Foundation Prototype

Talent International Academy, Abuja. Two connected experiences in one app, built with demo data only (no accounts, database, or payments yet).

## Look and feel
- Deep navy (#0A192F) as the base, pure white space, warm gold (#D4AF37) accents, subtle emerald highlights for positive states.
- Serif display headings paired with a clean sans for body text; gold hairline dividers, soft navy shadows, restrained motion.
- Everything works on phones: collapsible menu on the website, slide-over sidebar in the portal, scrollable tables.

## Part 1 — Public school website
Pages: Home, About, Academics, Admissions, Student Life, News & Events, Gallery, Contact, Portal Login.

- Home hero: "Empowering Student Knowledge Through Conventional Education, Qur'anic Memorization, Arabic & Islamic Studies" with three buttons: Apply for Admission, Explore TIA, Portal Login. Plus welcome note, programme highlights, stats band, news preview, call to action.
- Academics covers the five programmes: Early Years, Primary, Secondary, Special Education, Islamiyya — each with its own detail card.
- Admissions: process steps, requirements, fee summary table, and an enquiry/application form (submits to a confirmation message only).
- Student Life, News & Events (article cards), Gallery (image grid with lightbox), Contact (details, map placeholder, message form).
- Portal Login page: styled sign-in that drops straight into the portal as the selected demo role.

## Part 2 — ERP portal
A role switcher in the top bar instantly re-renders the portal as Principal, Admin, Teacher, Accountant, Parent, or Student.

- **Principal**: KPI cards (Students, Teachers, Classes, Today's Attendance, Pending Approvals, Upcoming Exams, Outstanding Fees), four charts (population, attendance trend, academic performance, fees collection), and a recent-activity timeline.
- **Admin**: sidebar with Dashboard, Students, Admissions, Classes, Teachers, Subjects, Attendance, Exams, Results, Report Cards, Fees & Finance, Approvals, Audit Logs, Settings. Students list opens a full profile view with tabs: photo/bio, academic history, attendance, results, fees.
- **Teacher**: My Classes, My Subjects, attendance tracker (Present/Absent/Late/Excused), and a result-entry sheet with CA1, CA2, Exam, auto total, grade, position, remark, Save Draft and Submit for Approval (statuses Draft / Pending / Approved / Rejected).
- **Accountant**: fees dashboard, invoices, receipts, outstanding balances.
- **Approval Centre**: review queue for results, admissions and documents with Approve, Reject and Request Correction — actions update statuses live.
- **Report Card**: printable A4 modal with school crest, scores, remarks, promotion status.
- **Student**: timetable, results, learning materials, fee invoices. **Parent**: children selector then the same views per child.
- **Audit Logs**: filterable history of who did what and when.

## Technical notes
- TanStack Start file routes: public pages at `/`, `/about`, `/academics`, `/admissions`, `/student-life`, `/news`, `/gallery`, `/contact`, `/portal-login`; portal under a `/portal` layout with child routes per module. Each page gets its own title/description metadata.
- Design tokens (navy, gold, emerald, radii, shadows) added to `src/styles.css`; no hardcoded colour classes in components.
- Shared mock dataset in `src/data/` (students, staff, classes, subjects, attendance, results, fees, approvals, audit entries, news, gallery). Mutable state (attendance marks, result drafts, approvals) held in a React context so actions feel real within a session.
- Charts via Recharts; icons via Lucide; report-card printing via a print stylesheet.
- Generated imagery for hero, campus, programme and gallery visuals.

## Not in this phase
Real logins, live database, payments, email/SMS. Data resets on refresh — the structure is built so a backend can be wired in later.
