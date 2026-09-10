import { useState } from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Search,
  School,
  Building2,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Eye,
  ShieldCheck,
} from "lucide-react";
import { useErp } from "@/lib/erp-store";
import { classes, staff, type EnrolmentApplication } from "@/data/school";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface AdminDashboardTabProps {
  onNavigateTab?: (tab: string) => void;
}

export function AdminDashboardTab({ onNavigateTab }: AdminDashboardTabProps) {
  const { students, applications, approveApplication, rejectApplication, addStudent, audit } =
    useErp();

  const [selectedApp, setSelectedApp] = useState<EnrolmentApplication | null>(null);
  const [assignedClassId, setAssignedClassId] = useState<string>("c-jss1");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Walk-in student enrolment dialog
  const [walkinOpen, setWalkinOpen] = useState(false);
  const [walkinData, setWalkinData] = useState({
    name: "",
    gender: "Male" as "Male" | "Female",
    dob: "2015-06-01",
    classId: "c-jss1",
    guardian: "",
    relationship: "Father",
    guardianPhone: "",
    address: "Airport Road, Lugbe, Abuja",
    house: "Zamfara",
    status: "Active" as const,
    bloodGroup: "O+",
    genotype: "AA",
    stateOfOrigin: "FCT Abuja",
    religion: "Islam",
    hafizJuz: 1,
  });

  const pendingApps = applications.filter((a) => a.status === "Pending");
  const approvedApps = applications.filter((a) => a.status === "Approved");

  const filteredApps = applications.filter((a) => {
    const matchesSearch =
      a.childName.toLowerCase().includes(search.toLowerCase()) ||
      a.parentName.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.classApplying.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (app: EnrolmentApplication) => {
    // Find matching class ID by name or fallback
    const matchedClass =
      classes.find(
        (c) =>
          c.name.toLowerCase().includes(app.classApplying.toLowerCase()) ||
          app.classApplying.toLowerCase().includes(c.name.toLowerCase()),
      ) ||
      classes.find((c) => c.id === assignedClassId) ||
      classes[0]!;

    const result = approveApplication(app.id, matchedClass.id);
    setSelectedApp(null);
    toast.success(
      `Candidate "${app.childName}" enrolled! Assigned Admission No: ${result.admissionNo} (${matchedClass.name})`,
    );
  };

  const handleReject = (app: EnrolmentApplication) => {
    rejectApplication(app.id, "Did not meet assessment cut-off");
    setSelectedApp(null);
    toast.error(`Application ${app.id} marked as Rejected.`);
  };

  const handleWalkinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinData.name || !walkinData.guardian || !walkinData.guardianPhone) {
      toast.error("Please fill in the student name, guardian name, and contact phone number.");
      return;
    }
    const created = addStudent(walkinData);
    setWalkinOpen(false);
    toast.success(
      `Walk-in candidate "${created.name}" enrolled! Admission No: ${created.admissionNo}`,
    );
    setWalkinData({
      name: "",
      gender: "Male",
      dob: "2015-06-01",
      classId: "c-jss1",
      guardian: "",
      relationship: "Father",
      guardianPhone: "",
      address: "Airport Road, Lugbe, Abuja",
      house: "Zamfara",
      status: "Active",
      bloodGroup: "O+",
      genotype: "AA",
      stateOfOrigin: "FCT Abuja",
      religion: "Islam",
      hafizJuz: 1,
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-navy to-navy-deep text-white p-6 rounded-3xl border border-gold/30 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-gold/20 text-gold font-bold px-2.5 py-0.5 rounded uppercase border border-gold/30">
              Operations Center
            </span>
            <span className="text-xs text-white/70">Administrator Portal</span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
            School Administration & Admissions Desk
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-2xl">
            Real-time student registry management, processing of online admission applications, and
            class capacity allocations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={() => setWalkinOpen(true)}
            size="sm"
            className="bg-gold text-navy-deep hover:bg-gold-soft font-bold text-xs shadow h-9 px-4 gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Enrol Walk-in Student</span>
          </Button>
        </div>
      </div>

      {/* 2. Key Administrative Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Total Enrolled</span>
            <div className="w-8 h-8 rounded-lg bg-navy/10 text-navy-deep flex items-center justify-center">
              <Users className="w-4 h-4 text-gold" />
            </div>
          </div>
          <div className="font-display text-2xl sm:text-3xl font-bold text-navy-deep">
            {students.length}
          </div>
          <div className="text-[11px] text-emerald font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Active registered scholars</span>
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Pending Enrolments</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display text-2xl sm:text-3xl font-bold text-amber-600">
            {pendingApps.length}
          </div>
          <div className="text-[11px] text-muted-foreground">Awaiting administrator approval</div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Academic Staff</span>
            <div className="w-8 h-8 rounded-lg bg-emerald/10 text-emerald flex items-center justify-center">
              <School className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display text-2xl sm:text-3xl font-bold text-navy-deep">
            {staff.length}
          </div>
          <div className="text-[11px] text-muted-foreground">86 teaching & support members</div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Class Arms</span>
            <div className="w-8 h-8 rounded-lg bg-navy/10 text-navy flex items-center justify-center">
              <Building2 className="w-4 h-4 text-navy-deep" />
            </div>
          </div>
          <div className="font-display text-2xl sm:text-3xl font-bold text-navy-deep">
            {classes.length}
          </div>
          <div className="text-[11px] text-muted-foreground">EYS, Primary, Secondary & Tahfiz</div>
        </div>
      </div>

      {/* 3. Live Enrolment Applications Queue (Linked directly with website form!) */}
      <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden space-y-4 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-bold text-lg sm:text-xl text-navy-deep">
                Student Enrolments & Admissions Queue
              </h2>
              {pendingApps.length > 0 && (
                <span className="bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                  {pendingApps.length} New
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live online applications submitted from the public website. Review candidate details,
              assign a class arm, and enroll directly into the database.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-2">
            <div className="relative w-48 sm:w-60">
              <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-2.5" />
              <Input
                placeholder="Search applicants..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 text-xs h-8"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="text-xs h-8 w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending ({pendingApps.length})</SelectItem>
                <SelectItem value="Approved">Enrolled ({approvedApps.length})</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Applications Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                <th className="p-3">Ref ID</th>
                <th className="p-3">Candidate / Child Name</th>
                <th className="p-3">Target Class</th>
                <th className="p-3">Parent / Guardian</th>
                <th className="p-3">Phone & Location</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    No enrolment applications match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-mono font-bold text-navy-deep">{app.id}</td>
                    <td className="p-3">
                      <div className="font-bold text-foreground text-xs sm:text-sm">
                        {app.childName}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {app.gender} · DOB: {app.dob}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="bg-navy/10 text-navy font-bold px-2 py-0.5 rounded text-xs">
                        {app.classApplying}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-foreground">{app.parentName}</td>
                    <td className="p-3 text-muted-foreground">
                      <div>{app.phone}</div>
                      <div className="text-[10px] truncate max-w-[140px]">{app.address}</div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          app.status === "Approved"
                            ? "bg-emerald/15 text-emerald border border-emerald/30"
                            : app.status === "Rejected"
                              ? "bg-rose-500/15 text-rose-600 border border-rose-500/30"
                              : "bg-amber-500/15 text-amber-700 border border-amber-500/30"
                        }`}
                      >
                        {app.status === "Approved" ? "Enrolled" : app.status}
                      </span>
                      {app.assignedAdmissionNo && (
                        <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                          {app.assignedAdmissionNo}
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          onClick={() => {
                            setSelectedApp(app);
                            // Suggest matching class
                            const match = classes.find(
                              (c) =>
                                c.name.toLowerCase().includes(app.classApplying.toLowerCase()) ||
                                app.classApplying.toLowerCase().includes(c.name.toLowerCase()),
                            );
                            if (match) setAssignedClassId(match.id);
                          }}
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs px-2"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          Review
                        </Button>

                        {app.status === "Pending" && (
                          <Button
                            onClick={() => handleApprove(app)}
                            size="sm"
                            className="h-7 text-xs bg-emerald hover:bg-emerald/90 text-white font-bold px-2.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            Enrol
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Quick Links & Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation Shortcuts */}
        <div className="bg-card p-5 rounded-3xl border border-border shadow-sm space-y-3">
          <h3 className="font-display font-bold text-base text-navy-deep">
            Administrative Modules
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => onNavigateTab && onNavigateTab("students")}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted text-xs font-semibold text-left transition-colors"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gold" />
                <span>Full Student Directory ({students.length})</span>
              </div>
              <span className="text-muted-foreground">→</span>
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab("timetable")}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted text-xs font-semibold text-left transition-colors"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold" />
                <span>Class Timetable & Room Master</span>
              </div>
              <span className="text-muted-foreground">→</span>
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab("approvals")}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted text-xs font-semibold text-left transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Approval Center & Grade Sign-offs</span>
              </div>
              <span className="text-muted-foreground">→</span>
            </button>
          </div>
        </div>

        {/* Real-time Audit Trail */}
        <div className="lg:col-span-2 bg-card p-5 rounded-3xl border border-border shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-navy-deep">
              System Activity & Audit Log
            </h3>
            <span className="text-[11px] text-muted-foreground">Latest events</span>
          </div>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {audit.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded-xl bg-muted/30 border border-border/60 flex items-center justify-between text-xs gap-3"
              >
                <div>
                  <div className="font-bold text-foreground">{log.action}</div>
                  <div className="text-[11px] text-muted-foreground">
                    Target: <span className="font-medium text-foreground">{log.target}</span> · By{" "}
                    {log.actor} ({log.role})
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground font-mono shrink-0">{log.at}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Enrolment Application Modal */}
      <Dialog open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
        {selectedApp && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display font-bold text-xl text-navy-deep">
                Enrolment Application: {selectedApp.childName}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Review candidate credentials and confirm official class enrollment.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 text-xs py-2">
              <div className="grid grid-cols-2 gap-3 p-3 bg-muted/40 rounded-xl border border-border">
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold">
                    Child's Name
                  </span>
                  <span className="font-bold text-foreground text-sm">{selectedApp.childName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold">
                    Class Applying For
                  </span>
                  <span className="font-bold text-gold bg-navy px-2 py-0.5 rounded inline-block mt-0.5">
                    {selectedApp.classApplying}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold">
                    Gender & DOB
                  </span>
                  <span className="font-medium text-foreground">
                    {selectedApp.gender} · {selectedApp.dob}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold">
                    Application Reference
                  </span>
                  <span className="font-mono font-bold text-navy-deep">{selectedApp.id}</span>
                </div>
              </div>

              <div className="space-y-1.5 p-3 bg-muted/20 rounded-xl border border-border">
                <span className="text-muted-foreground block text-[10px] uppercase font-bold">
                  Guardian Contact
                </span>
                <div className="font-bold text-foreground">{selectedApp.parentName}</div>
                <div className="text-muted-foreground flex items-center gap-3">
                  <span>📞 {selectedApp.phone}</span>
                  {selectedApp.email && <span>✉️ {selectedApp.email}</span>}
                </div>
                <div className="text-muted-foreground text-[11px] pt-1">
                  📍 {selectedApp.address}
                </div>
              </div>

              {selectedApp.notes && (
                <div className="p-3 bg-card border border-border rounded-xl">
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold mb-1">
                    Prior Academic / Qur'anic Notes
                  </span>
                  <p className="text-foreground leading-relaxed">{selectedApp.notes}</p>
                </div>
              )}

              {selectedApp.status === "Pending" && (
                <div className="space-y-1.5 pt-2 border-t border-border">
                  <label className="text-xs font-bold text-foreground">
                    Assign Official Class Arm:
                  </label>
                  <Select value={assignedClassId} onValueChange={setAssignedClassId}>
                    <SelectTrigger className="text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name} ({c.level}) — Room: {c.room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <DialogFooter className="gap-2">
              {selectedApp.status === "Pending" ? (
                <>
                  <Button
                    onClick={() => handleReject(selectedApp)}
                    variant="outline"
                    className="text-xs text-rose-600 border-rose-300 hover:bg-rose-50"
                  >
                    <XCircle className="w-3.5 h-3.5 mr-1" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleApprove(selectedApp)}
                    className="text-xs bg-emerald hover:bg-emerald/90 text-white font-bold"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    Approve & Assign Admission Number
                  </Button>
                </>
              ) : (
                <Button onClick={() => setSelectedApp(null)} className="text-xs">
                  Close Review
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Walk-in Candidate Enrolment Dialog */}
      <Dialog open={walkinOpen} onOpenChange={setWalkinOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-xl text-navy-deep flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-gold" />
              Direct Walk-in Student Registration
            </DialogTitle>
            <DialogDescription className="text-xs">
              Directly register a student on campus into the official TIA directory.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleWalkinSubmit} className="space-y-3 text-xs py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Student's Full Name *</label>
                <Input
                  required
                  placeholder="e.g. Fatima Kabir"
                  value={walkinData.name}
                  onChange={(e) => setWalkinData({ ...walkinData, name: e.target.value })}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Gender</label>
                <Select
                  value={walkinData.gender}
                  onValueChange={(val) =>
                    setWalkinData({ ...walkinData, gender: val as "Male" | "Female" })
                  }
                >
                  <SelectTrigger className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Date of Birth</label>
                <Input
                  type="date"
                  value={walkinData.dob}
                  onChange={(e) => setWalkinData({ ...walkinData, dob: e.target.value })}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Enrolment Class *</label>
                <Select
                  value={walkinData.classId}
                  onValueChange={(val) => setWalkinData({ ...walkinData, classId: val })}
                >
                  <SelectTrigger className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name} ({c.level})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Guardian Name *</label>
                <Input
                  required
                  placeholder="e.g. Alhaji Kabir"
                  value={walkinData.guardian}
                  onChange={(e) => setWalkinData({ ...walkinData, guardian: e.target.value })}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Guardian Phone *</label>
                <Input
                  required
                  type="tel"
                  placeholder="e.g. 0803 123 4567"
                  value={walkinData.guardianPhone}
                  onChange={(e) => setWalkinData({ ...walkinData, guardianPhone: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-foreground">Residential Address</label>
              <Input
                value={walkinData.address}
                onChange={(e) => setWalkinData({ ...walkinData, address: e.target.value })}
                className="text-xs"
              />
            </div>

            <DialogFooter className="pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setWalkinOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" className="text-xs bg-navy text-gold font-bold">
                Confirm & Register Student
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
