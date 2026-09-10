import { useState } from "react";
import {
  Volume2,
  Send,
  Users,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  History,
  Shield,
  Sparkles,
  Search,
} from "lucide-react";
import { useErp } from "@/lib/erp-store";
import { ROLES, type Role } from "@/data/school";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export function AnnouncementsTab() {
  const { announcements, sendAnnouncement, roleLabel, person } = useErp();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState<"Normal" | "High" | "Urgent">("Normal");
  const [targetMode, setTargetMode] = useState<"all" | "selected">("all");
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([
    "principal",
    "teacher",
    "accountant",
    "parent",
    "student",
    "admin",
  ]);
  const [search, setSearch] = useState("");

  const toggleRole = (r: Role) => {
    if (selectedRoles.includes(r)) {
      if (selectedRoles.length === 1) {
        toast.error("At least one stakeholder role must be selected.");
        return;
      }
      setSelectedRoles(selectedRoles.filter((item) => item !== r));
    } else {
      setSelectedRoles([...selectedRoles, r]);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      toast.error("Please fill in both title and announcement message.");
      return;
    }

    const recipients: (Role | "all")[] = targetMode === "all" ? ["all"] : selectedRoles;

    sendAnnouncement({
      title: title.trim(),
      message: message.trim(),
      category,
      recipients,
      priority,
    });

    setTitle("");
    setMessage("");
    setPriority("Normal");
  };

  const filteredAnnouncements = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.message.toLowerCase().includes(search.toLowerCase()) ||
      a.sender.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/10 dark:bg-white/10 text-navy dark:text-gold text-xs font-bold mb-2">
            <Volume2 className="w-3.5 h-3.5 text-gold" />
            <span>Administrator Broadcast Centre</span>
          </div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-deep flex items-center gap-2">
            Institutional Announcement Dispatch
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Draft and dispatch official notices to targeted stakeholders across the school ERP.
          </p>
        </div>
      </div>

      {/* Grid: Composer & History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Composer Form (Left 6-7 cols) */}
        <div className="lg:col-span-7 bg-card rounded-2xl border border-border shadow-sm p-6 space-y-5">
          <div className="border-b border-border pb-3">
            <h3 className="font-display font-bold text-lg text-navy-deep flex items-center gap-2">
              <Send className="w-5 h-5 text-gold" />
              Compose New School Announcement
            </h3>
            <p className="text-xs text-muted-foreground">
              Broadcast immediately triggers role-specific notification feeds across all portals.
            </p>
          </div>

          <form onSubmit={handleSend} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">
                Announcement Subject / Title *
              </label>
              <Input
                placeholder="e.g. Mid-Term Continuous Assessment Submission Deadline"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xs font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Notice Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General Administrative</SelectItem>
                    <SelectItem value="Academic">Academic & Exams</SelectItem>
                    <SelectItem value="Finance">Bursary & Tuition</SelectItem>
                    <SelectItem value="Events">School Events & Sports</SelectItem>
                    <SelectItem value="Transport">School Bus & Routes</SelectItem>
                    <SelectItem value="Emergency">Urgent Notice</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Priority Level</label>
                <Select
                  value={priority}
                  onValueChange={(val) => setPriority(val as "Normal" | "High" | "Urgent")}
                >
                  <SelectTrigger className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Normal">Normal Priority</SelectItem>
                    <SelectItem value="High">High Priority</SelectItem>
                    <SelectItem value="Urgent">Urgent Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Target Audience Selector */}
            <div className="space-y-2 pt-2 border-t border-border/70">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gold" />
                  Target Recipients Audience *
                </label>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setTargetMode("all")}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                      targetMode === "all"
                        ? "bg-navy text-gold font-bold shadow-sm"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    Whole School (All Users)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetMode("selected")}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                      targetMode === "selected"
                        ? "bg-navy text-gold font-bold shadow-sm"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    Custom Roles
                  </button>
                </div>
              </div>

              {targetMode === "selected" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-muted/40 rounded-xl border border-border">
                  {ROLES.map((r) => {
                    const isSelected = selectedRoles.includes(r.id);
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => toggleRole(r.id)}
                        className={`p-2 rounded-lg text-xs font-semibold text-left transition-all border flex items-center justify-between ${
                          isSelected
                            ? "bg-navy text-gold border-gold/40 shadow-sm"
                            : "bg-card text-muted-foreground border-border hover:text-foreground"
                        }`}
                      >
                        <span className="truncate">{r.label}</span>
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-3 bg-emerald/10 border border-emerald/30 rounded-xl text-xs text-emerald font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    Will be delivered to all 6 stakeholder feeds: Principal, Administrators,
                    Teachers, Accountants, Parents, and Students.
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Message Body *</label>
              <Textarea
                placeholder="Write the complete announcement details, instructions, or deadlines..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="text-xs leading-relaxed"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-navy hover:bg-navy-soft text-gold font-bold text-xs sm:text-sm py-4 rounded-xl shadow-md gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Announcement Now</span>
            </Button>
          </form>
        </div>

        {/* Announcement History (Right 5 cols) */}
        <div className="lg:col-span-5 bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-display font-bold text-lg text-navy-deep flex items-center gap-2">
              <History className="w-5 h-5 text-gold" />
              Broadcast History ({announcements.length})
            </h3>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
            <Input
              placeholder="Search sent announcements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>

          <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
            {filteredAnnouncements.map((ann) => (
              <div
                key={ann.id}
                className="p-4 rounded-xl bg-muted/30 border border-border space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-foreground text-xs leading-snug">
                    {ann.title}
                  </span>
                  <span
                    className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded shrink-0 border ${
                      ann.priority === "Urgent"
                        ? "bg-red-500/15 text-red-600 border-red-500/30"
                        : ann.priority === "High"
                          ? "bg-amber-500/15 text-amber-700 border-amber-500/30"
                          : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {ann.priority}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {ann.message}
                </p>

                <div className="pt-2 border-t border-border/70 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
                  <span>
                    To:{" "}
                    <strong className="text-foreground">
                      {ann.recipients.includes("all")
                        ? "Whole School"
                        : ann.recipients.map((r) => r.toUpperCase()).join(", ")}
                    </strong>
                  </span>
                  <span>{ann.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
