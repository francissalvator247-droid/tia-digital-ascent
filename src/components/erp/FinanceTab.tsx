import { useState } from "react";
import {
  CreditCard,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  Printer,
  Receipt,
  FileCheck,
  Building,
  DollarSign,
  TrendingUp,
  PlusCircle,
  ShieldCheck,
  Calendar,
  User,
  ArrowRight,
} from "lucide-react";
import { naira, className, SCHOOL, type Invoice } from "@/data/school";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function FinanceTab() {
  const { invoices: liveInvoices, recordPayment, students } = useErp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeReceipt, setActiveReceipt] = useState<Invoice | null>(null);

  // Modal for recording custom payment
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>("");
  const [payAmount, setPayAmount] = useState<string>("");
  const [payMethod, setPayMethod] = useState<"Bank transfer" | "POS" | "Cash">("Bank transfer");

  // Financial KPIs from live store
  const totalBilled = liveInvoices.reduce((acc, inv) => acc + inv.total, 0);
  const totalPaid = liveInvoices.reduce((acc, inv) => acc + inv.paid, 0);
  const totalOutstanding = Math.max(0, totalBilled - totalPaid);
  const collectionRate = totalBilled > 0 ? Math.round((totalPaid / totalBilled) * 100) : 0;

  const filtered = liveInvoices.filter((inv) => {
    const matchesSearch =
      inv.studentName.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceNo.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenPaymentModal = (inv?: Invoice) => {
    if (inv) {
      setSelectedInvoiceId(inv.id);
      const remaining = inv.total - inv.paid;
      setPayAmount(remaining > 0 ? remaining.toString() : inv.total.toString());
    } else {
      const firstUnpaid = liveInvoices.find((i) => i.status !== "paid");
      if (firstUnpaid) {
        setSelectedInvoiceId(firstUnpaid.id);
        setPayAmount((firstUnpaid.total - firstUnpaid.paid).toString());
      }
    }
    setIsPayModalOpen(true);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const inv = liveInvoices.find((i) => i.id === selectedInvoiceId);
    if (!inv) {
      toast.error("Please select a valid student invoice.");
      return;
    }
    const amt = parseFloat(payAmount);
    if (isNaN(amt) || amt <= 0) {
      toast.error("Please enter a valid payment amount.");
      return;
    }

    recordPayment(inv.studentId, inv.id, amt, payMethod);
    setIsPayModalOpen(false);
    // Open receipt modal for immediate confirmation
    setActiveReceipt({
      ...inv,
      paid: Math.min(inv.total, inv.paid + amt),
      status: inv.paid + amt >= inv.total ? "paid" : "partial",
    });
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-medium">Total Termly Invoiced</span>
            <div className="font-display text-2xl font-bold text-navy-deep">
              {naira(totalBilled)}
            </div>
            <span className="text-[11px] text-muted-foreground">Session {SCHOOL.session}</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-navy/10 text-navy flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-gold" />
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-medium">Revenue Realized</span>
            <div className="font-display text-2xl font-bold text-emerald">{naira(totalPaid)}</div>
            <span className="text-[11px] text-emerald font-semibold">Verified Lodgements</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald/10 text-emerald flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-medium">Outstanding Balances</span>
            <div className="font-display text-2xl font-bold text-red-600">
              {naira(totalOutstanding)}
            </div>
            <span className="text-[11px] text-red-600 font-semibold">Overdue Invoices</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-medium">Fee Recovery Rate</span>
            <div className="font-display text-2xl font-bold text-navy-deep">{collectionRate}%</div>
            <span className="text-[11px] text-muted-foreground">Target: 95%</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-gold/20 text-navy-deep flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-gold" />
          </div>
        </div>
      </div>

      {/* Main Ledger Card */}
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-700 text-xs font-bold mb-2">
              <Building className="w-3.5 h-3.5" />
              <span>Bursary & Accounts Division</span>
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-deep flex items-center gap-2">
              Tuition Invoicing & Payment Reconciliation
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live ledger of student term bills, bank transfers, receipts, and real-time audit trail
              updates.
            </p>
          </div>

          <Button
            onClick={() => handleOpenPaymentModal()}
            className="bg-navy hover:bg-navy-soft text-gold font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow gap-2 self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4 text-gold" />
            <span>Record Fee Payment</span>
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
          <div className="relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
            <Input
              placeholder="Search invoice number or student name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="text-xs">
              <SelectValue placeholder="Status Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Invoices ({liveInvoices.length})</SelectItem>
              <SelectItem value="paid">Fully Settled (Paid)</SelectItem>
              <SelectItem value="partial">Partial Payment</SelectItem>
              <SelectItem value="unpaid">Unpaid / Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                <th className="p-3.5">Invoice Ref</th>
                <th className="p-3.5">Student / Class</th>
                <th className="p-3.5 text-right">Total Bill</th>
                <th className="p-3.5 text-right">Amount Paid</th>
                <th className="p-3.5 text-right">Balance Due</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((inv) => {
                const balance = inv.total - inv.paid;

                return (
                  <tr key={inv.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-navy-deep text-[11px]">
                      {inv.invoiceNo}
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-navy-deep">{inv.studentName}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {className(inv.classId)}
                      </div>
                    </td>
                    <td className="p-3.5 text-right font-medium">{naira(inv.total)}</td>
                    <td className="p-3.5 text-right font-semibold text-emerald">
                      {naira(inv.paid)}
                    </td>
                    <td className="p-3.5 text-right font-bold text-red-600">
                      {balance > 0 ? naira(balance) : "₦0"}
                    </td>
                    <td className="p-3.5 text-center">
                      <span
                        className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                          inv.status === "paid"
                            ? "bg-emerald/15 text-emerald border border-emerald/30"
                            : inv.status === "partial"
                              ? "bg-amber-500/15 text-amber-700 border border-amber-500/30"
                              : "bg-red-500/15 text-red-600 border border-red-500/30"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setActiveReceipt(inv)}
                          className="text-xs h-7 px-2 text-navy hover:text-navy-deep border-border"
                        >
                          <Receipt className="w-3.5 h-3.5 mr-1 text-gold" />
                          Receipt
                        </Button>
                        {inv.status !== "paid" && (
                          <Button
                            size="sm"
                            onClick={() => handleOpenPaymentModal(inv)}
                            className="bg-emerald hover:bg-emerald/90 text-white text-xs h-7 px-2.5 font-semibold"
                          >
                            Pay Fee
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Dialog */}
      <Dialog open={isPayModalOpen} onOpenChange={setIsPayModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald/10 text-emerald text-xs font-bold w-fit mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Bursary Cash & Lodgement Register</span>
            </div>
            <DialogTitle className="text-lg font-bold text-navy-deep">
              Record Student Tuition Payment
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Posting this payment will issue an official electronic receipt, notify the parent and
              administrator, and log to the school activity ledger.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleConfirmPayment} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Select Student Bill *</label>
              <Select value={selectedInvoiceId} onValueChange={setSelectedInvoiceId}>
                <SelectTrigger className="text-xs">
                  <SelectValue placeholder="Choose student invoice..." />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {liveInvoices.map((inv) => (
                    <SelectItem key={inv.id} value={inv.id}>
                      {inv.studentName} ({inv.invoiceNo}) - Due: {naira(inv.total - inv.paid)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Amount to Pay (₦) *</label>
                <Input
                  type="number"
                  placeholder="e.g. 150000"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="text-xs font-semibold"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Payment Channel</label>
                <Select
                  value={payMethod}
                  onValueChange={(v) => setPayMethod(v as "Bank transfer" | "POS" | "Cash")}
                >
                  <SelectTrigger className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bank transfer">Direct Bank Transfer</SelectItem>
                    <SelectItem value="POS">Campus POS Terminal</SelectItem>
                    <SelectItem value="Cash">Bursary Cash Vault</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-3 bg-muted/40 rounded-xl text-xs space-y-1 border border-border">
              <div className="flex justify-between text-muted-foreground">
                <span>Payment Reference:</span>
                <span className="font-mono text-foreground font-bold">
                  Auto-Generated (TIA-PAY)
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Issuing Officer:</span>
                <span className="text-foreground font-medium">Mr. Chuka Obi (Accountant)</span>
              </div>
            </div>

            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPayModalOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-emerald hover:bg-emerald/90 text-white font-bold text-xs"
              >
                Confirm & Issue Receipt
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Printable Official Receipt Modal */}
      {activeReceipt && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveReceipt(null)}
        >
          <div
            className="bg-card max-w-md w-full rounded-2xl p-6 border border-border shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-border pb-4 text-center space-y-1">
              <div className="text-xs font-bold text-gold uppercase tracking-wider">
                Official Bursary Receipt
              </div>
              <h3 className="font-display font-bold text-xl text-navy-deep">{SCHOOL.name}</h3>
              <p className="text-[11px] text-muted-foreground">{SCHOOL.address}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-dashed border-border">
                <span className="text-muted-foreground">Receipt / Invoice Ref:</span>
                <span className="font-mono font-bold text-navy-deep">
                  {activeReceipt.invoiceNo}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed border-border">
                <span className="text-muted-foreground">Student Name:</span>
                <span className="font-bold text-foreground">{activeReceipt.studentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed border-border">
                <span className="text-muted-foreground">Class Placement:</span>
                <span className="font-medium text-foreground">
                  {className(activeReceipt.classId)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed border-border">
                <span className="text-muted-foreground">Term / Session:</span>
                <span className="font-medium text-foreground">{activeReceipt.term}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed border-border">
                <span className="text-muted-foreground">Date Issued:</span>
                <span className="font-medium text-foreground">{activeReceipt.issued}</span>
              </div>
            </div>

            {/* Fee Items Breakdown */}
            <div className="space-y-1 bg-muted/40 p-3 rounded-xl border border-border text-xs">
              <div className="font-bold text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                Fee Schedule Breakdown:
              </div>
              {activeReceipt.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-[11px]">
                  <span className="text-muted-foreground">{it.label}:</span>
                  <span className="font-medium">{naira(it.amount)}</span>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-border flex justify-between font-bold text-navy-deep text-xs">
                <span>Total Term Assessment:</span>
                <span>{naira(activeReceipt.total)}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald/10 border border-emerald/30 rounded-xl space-y-1 text-center">
              <div className="text-[11px] font-bold text-emerald uppercase tracking-wider">
                Total Amount Paid
              </div>
              <div className="font-display font-bold text-2xl text-emerald">
                {naira(activeReceipt.paid)}
              </div>
              <div className="text-[10px] text-emerald/80 font-medium">
                {activeReceipt.paid >= activeReceipt.total
                  ? "FULL SETTLEMENT · NO BALANCE DUE"
                  : `OUTSTANDING BALANCE: ${naira(activeReceipt.total - activeReceipt.paid)}`}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[10px] text-muted-foreground border-t border-border">
              <span>Bursar Signature: Verified Digital Stamp</span>
              <span className="font-mono text-gold font-bold">
                STATUS: {activeReceipt.status.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handlePrintReceipt}
                className="flex-1 bg-navy hover:bg-navy-soft text-gold font-bold text-xs h-9 gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Slip</span>
              </Button>
              <Button
                onClick={() => setActiveReceipt(null)}
                variant="outline"
                className="text-xs h-9"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
