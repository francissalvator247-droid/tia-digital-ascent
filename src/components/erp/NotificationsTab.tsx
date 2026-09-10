import { useState } from "react";
import {
  Bell,
  CheckCircle2,
  CheckCheck,
  Filter,
  Search,
  Calendar,
  AlertTriangle,
  Info,
  Clock,
  ArrowRight,
  Shield,
  BookOpen,
  Users,
  CreditCard,
  FileCheck,
  UserPlus,
  Volume2,
} from "lucide-react";
import { useErp } from "@/lib/erp-store";
import { type NotificationCategory, type ErpNotification } from "@/data/school";
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

interface NotificationsTabProps {
  onNavigateTab?: (tab: string) => void;
}

export function NotificationsTab({ onNavigateTab }: NotificationsTabProps) {
  const { userNotifications, markAsRead, markAllAsRead, unreadCount, roleLabel } = useErp();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filterRead, setFilterRead] = useState<"all" | "unread" | "read">("all");
  const [search, setSearch] = useState("");
  const [activeModalNotif, setActiveModalNotif] = useState<ErpNotification | null>(null);

  const categories: (NotificationCategory | "All")[] = [
    "All",
    "Announcement",
    "Academic",
    "Attendance",
    "Finance",
    "Approval",
    "Admission",
    "General",
  ];

  const filtered = userNotifications.filter((n) => {
    const matchesCategory = selectedCategory === "All" || n.category === selectedCategory;
    const matchesRead = filterRead === "all" ? true : filterRead === "unread" ? !n.read : n.read;
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase()) ||
      n.sender.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesRead && matchesSearch;
  });

  const getCategoryIcon = (cat: NotificationCategory) => {
    switch (cat) {
      case "Announcement":
        return Volume2;
      case "Academic":
        return BookOpen;
      case "Attendance":
        return Users;
      case "Finance":
        return CreditCard;
      case "Approval":
        return FileCheck;
      case "Admission":
        return UserPlus;
      default:
        return Info;
    }
  };

  const getCategoryColor = (cat: NotificationCategory) => {
    switch (cat) {
      case "Announcement":
        return "bg-purple-500/10 text-purple-700 border-purple-500/30";
      case "Academic":
        return "bg-blue-500/10 text-blue-700 border-blue-500/30";
      case "Attendance":
        return "bg-teal-500/10 text-teal-700 border-teal-500/30";
      case "Finance":
        return "bg-emerald/10 text-emerald border-emerald/30";
      case "Approval":
        return "bg-amber-500/10 text-amber-700 border-amber-500/30";
      case "Admission":
        return "bg-indigo-500/10 text-indigo-700 border-indigo-500/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const handleOpenDetail = (notif: ErpNotification) => {
    if (!notif.read) {
      markAsRead(notif.id);
    }
    setActiveModalNotif(notif);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/10 dark:bg-white/10 text-navy dark:text-gold text-xs font-bold mb-2">
            <Bell className="w-3.5 h-3.5 text-gold" />
            <span>Dedicated Role Notification Feed</span>
          </div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-deep flex items-center gap-2">
            Notification & Communications Centre
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time administrative briefings, departmental notices, and status updates for{" "}
            <strong className="text-foreground">{roleLabel}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              variant="outline"
              size="sm"
              className="text-xs font-semibold gap-1.5 border-border"
            >
              <CheckCheck className="w-4 h-4 text-emerald" />
              <span>Mark All as Read ({unreadCount})</span>
            </Button>
          )}
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-card p-4 rounded-2xl border border-border shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
            <Input
              placeholder="Search notifications by keyword, sender, or content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-muted p-1 rounded-lg w-full sm:w-auto self-stretch sm:self-auto">
            <button
              onClick={() => setFilterRead("all")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                filterRead === "all"
                  ? "bg-navy text-gold shadow-sm font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({userNotifications.length})
            </button>
            <button
              onClick={() => setFilterRead("unread")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                filterRead === "unread"
                  ? "bg-navy text-gold shadow-sm font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilterRead("read")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                filterRead === "read"
                  ? "bg-navy text-gold shadow-sm font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Read ({userNotifications.length - unreadCount})
            </button>
          </div>
        </div>

        {/* Categories horizontally scrollable */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-border/70">
          <span className="text-[11px] font-bold text-muted-foreground uppercase mr-1 shrink-0">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-gold text-navy-deep font-bold shadow-sm"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-card rounded-2xl border border-dashed border-border space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald mx-auto" />
            <h3 className="font-display font-bold text-foreground text-base">
              No Notifications Found
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              There are no messages matching your selected filters in your role feed.
            </p>
          </div>
        ) : (
          filtered.map((notif) => {
            const Icon = getCategoryIcon(notif.category);
            const catBadgeStyle = getCategoryColor(notif.category);

            return (
              <div
                key={notif.id}
                onClick={() => handleOpenDetail(notif)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  notif.read
                    ? "bg-card border-border hover:border-navy/30 opacity-85 hover:opacity-100"
                    : "bg-card border-gold/40 shadow-sm ring-1 ring-gold/20"
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${catBadgeStyle}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-foreground text-sm leading-tight hover:underline">
                        {notif.title}
                      </span>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-gold shrink-0 animate-pulse" />
                      )}
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${catBadgeStyle}`}
                      >
                        {notif.category}
                      </span>
                      {notif.priority === "Urgent" && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-500/15 text-red-600 border border-red-500/30">
                          Urgent
                        </span>
                      )}
                      {notif.priority === "High" && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/15 text-amber-700 border border-amber-500/30">
                          High Priority
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground pt-1">
                      <span>
                        Sender: <strong className="text-foreground">{notif.sender}</strong> (
                        {notif.senderRole})
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notif.createdAt}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {!notif.read && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notif.id);
                      }}
                      size="sm"
                      variant="ghost"
                      className="text-xs h-7 text-muted-foreground hover:text-foreground"
                    >
                      Mark Read
                    </Button>
                  )}
                  {notif.linkTab && onNavigateTab && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!notif.read) markAsRead(notif.id);
                        onNavigateTab(notif.linkTab!);
                      }}
                      size="sm"
                      className="bg-navy text-gold hover:bg-navy-deep text-xs h-7 px-2.5 font-bold gap-1"
                    >
                      <span>Open</span>
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!activeModalNotif} onOpenChange={(open) => !open && setActiveModalNotif(null)}>
        {activeModalNotif && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded border ${getCategoryColor(
                    activeModalNotif.category,
                  )}`}
                >
                  {activeModalNotif.category}
                </span>
                {activeModalNotif.priority && (
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-muted text-foreground border border-border">
                    {activeModalNotif.priority} Priority
                  </span>
                )}
              </div>
              <DialogTitle className="text-lg font-bold text-navy-deep">
                {activeModalNotif.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground flex items-center gap-2 pt-1">
                <span>
                  From: <strong>{activeModalNotif.sender}</strong> ({activeModalNotif.senderRole})
                </span>
                <span>·</span>
                <span>{activeModalNotif.createdAt}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 text-xs sm:text-sm text-foreground leading-relaxed whitespace-pre-wrap bg-muted/30 p-4 rounded-xl border border-border">
              {activeModalNotif.message}
            </div>

            <DialogFooter className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <span className="text-[11px] text-muted-foreground">
                Recipients:{" "}
                {activeModalNotif.targetRoles.includes("all")
                  ? "All School Stakeholders"
                  : activeModalNotif.targetRoles.map((r) => r.toUpperCase()).join(", ")}
              </span>

              <div className="flex items-center gap-2">
                {activeModalNotif.linkTab && onNavigateTab && (
                  <Button
                    onClick={() => {
                      const target = activeModalNotif.linkTab!;
                      setActiveModalNotif(null);
                      onNavigateTab(target);
                    }}
                    className="bg-navy text-gold text-xs font-bold gap-1.5"
                  >
                    <span>Proceed to Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                )}
                <Button
                  onClick={() => setActiveModalNotif(null)}
                  variant="outline"
                  className="text-xs font-semibold"
                >
                  Close
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
