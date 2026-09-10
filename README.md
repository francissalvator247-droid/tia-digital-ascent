# TIA Digital Ascent

Build TIA DIGITAL SCHOOL ERP for Talent International Academy, Abuja (reference: https://tiaabuja.com/). Complete foundation UI/UX prototype using mock/demo data only (no live Supabase, auth, or payment backend yet).

Include two integrated sections:

1. Public School Website: Modern premium Nigerian private school aesthetic (Navy blue #0A192F/deep navy, pure white, warm gold accents #D4AF37, subtle emerald green touches). Pages: Home, About, Academics (Early Years, Primary, Secondary, Special Education, Islamiyya), Admissions, Student Life, News & Events, Gallery, Contact, Portal Login. Hero: "Empowering Student Knowledge Through Conventional Education, Qur’anic Memorization, Arabic & Islamic Studies" with CTAs: Apply for Admission, Explore TIA, Portal Login.
2. Private School ERP Portal:

- Role switcher to easily test roles: Principal, Admin, Teacher, Accountant, Parent, Student.
- Principal Dashboard: Key KPI cards (Students, Teachers, Classes, Today's Attendance, Pending Approvals, Upcoming Exams, Outstanding Fees), charts (Population, Attendance, Academic, Fees), and recent activity timeline.
- Admin Sidebar & Views: Dashboard, Students (with comprehensive Student Profile modal/view: Photo, bio, academic history, attendance, results, fees tabs), Admissions, Classes, Teachers, Subjects, Attendance, Exams, Results, Report Cards, Fees & Finance, Approvals, Audit Logs, Settings.
- Teacher Dashboard: My Classes, My Subjects, Attendance tracker (Present/Absent/Late/Excused), Result Entry sheet (Subject, CA1, CA2, Exam, auto Total, Grade, Position, Remark, Save Draft, Submit for Approval with statuses Draft/Pending/Approved/Rejected).
- Approval Centre: Review/Approve/Reject/Request Correction workflow for results, admissions, documents.
- Printable A4 Report Card modal with school branding, scores, remarks, promotion status.
- Student & Parent Dashboards with timetable, children selector, learning materials, and fee invoices/receipts.
- Audit History log view.
- 100% mobile-friendly responsive navigation and layouts.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/85c88006-a7c5-4833-95ea-89a75169514a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
