import { useState } from "react";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  TrendingUp,
  Receipt,
  PlusCircle,
  Building,
  ArrowRight,
  Shield,
  Search,
  Printer,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { useErp } from "@/lib/erp-store";
import { naira, classes, className, SCHOOL, type Invoice } from "@/data/school";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AccountantDashboardTabProps {
  onNavigateTab: (tab: string) => void;
}

export function AccountantDashboardTab({ onNavigateTab }: AccountantDashboardTabProps) {
  const { invoices, receipts } = useErp();

  const totalBilled = invoices.reduce((acc, inv) => acc + inv.total, 0);
  const totalPaid = invoices.reduce((acc, inv) => acc + inv.paid, 0);
  const totalOutstanding = Math.max(0, totalBilled - totalPaid);
  const collectionRate = totalBilled > 0 ? Math.round((totalPaid / totalBilled) * 100) : 0;

  // Breakdown by class arm
  const classBreakdowns = classes.map((cls) => {
    const classInvoices = invoices.filter((i) => i.classId === cls.id);
    const billed = classInvoices.reduce((a, b) => a + b.total, 0);
    const paid = classInvoices.reduce((a, b) => a + b.paid, 0);
    const rate = billed > 0 ? Math.round((paid / billed) * 100) : 0;
    return {
      class: cls,
      billed,
      paid,
      rate,
      count: classInvoices.length,
    };
  });

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-navy-deep via-navy to-navy-soft text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-gold text-xs font-semibold">
            <Building className="w-3.5 h-3.5" />
            <span>Bursary Executive Terminal</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Welcome, Mr. Chuka Obi
          </h2>
          <p className="text-white/80 text-xs sm:text-sm">
            Chief Accountant & Bursar · Session: <strong>{SCHOOL.session}</strong> ({SCHOOL.term}) ·
            Kubwa Campus, Abuja.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => onNavigateTab("finance")}
            className="bg-gold text-navy-deep font-bold hover:brightness-105 shadow text-xs sm:text-sm gap-1.5"
          >
            <CreditCard className="w-4 h-4 text-navy-deep" />
            <span>Fee Register & Payments</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-medium">Total Term Invoiced</span>
            <div className="font-display text-2xl font-bold text-navy-deep">
              {naira(totalBilled)}
            </div>
            <span className="text-[11px] text-muted-foreground">
              {invoices.length} Students Billed
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-navy/10 text-navy flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-gold" />
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-medium">Revenue Collected</span>
            <div className="font-display text-2xl font-bold text-emerald">{naira(totalPaid)}</div>
            <span className="text-[11px] text-emerald font-semibold">Verified Bank Inflows</span>
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
            <span className="text-[11px] text-red-600 font-semibold">Awaiting Settlement</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-medium">Overall Collection %</span>
            <div className="font-display text-2xl font-bold text-navy-deep">{collectionRate}%</div>
            <span className="text-[11px] text-muted-foreground">Session Benchmark</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-gold/20 text-navy-deep flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-gold" />
          </div>
        </div>
      </div>

      {/* Grid: Class Recovery Progress & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Class-by-Class Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h3 className="font-display font-bold text-lg text-navy-deep">
                Class Arm Fee Collection Performance
              </h3>
              <p className="text-xs text-muted-foreground">
                Progressive tuition recovery across Early Years, Primary, and Secondary sections.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {classBreakdowns.map((item) => (
              <div
                key={item.class.id}
                className="space-y-1.5 p-3 rounded-xl bg-muted/20 border border-border"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="font-bold text-navy-deep">
                    {item.class.name}{" "}
                    <span className="font-normal text-muted-foreground">({item.class.level})</span>
                  </div>
                  <div className="font-bold text-foreground">
                    {naira(item.paid)} / {naira(item.billed)}{" "}
                    <span className="text-emerald ml-1 font-bold">({item.rate}%)</span>
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.rate >= 80 ? "bg-emerald" : item.rate >= 50 ? "bg-gold" : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min(100, item.rate)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payment Receipts Stream (5 cols) */}
        <div className="lg:col-span-5 bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h3 className="font-display font-bold text-lg text-navy-deep flex items-center gap-2">
                <Receipt className="w-5 h-5 text-gold" />
                Latest Issued Receipts
              </h3>
              <p className="text-xs text-muted-foreground">Recent tuition lodgements recorded.</p>
            </div>
            <Button
              onClick={() => onNavigateTab("finance")}
              variant="ghost"
              size="sm"
              className="text-xs text-gold hover:text-gold-foreground"
            >
              View All →
            </Button>
          </div>

          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {receipts.map((rcp) => {
              const inv = invoices.find((i) => i.studentId === rcp.studentId);
              return (
                <div
                  key={rcp.id}
                  className="p-3.5 rounded-xl bg-muted/30 border border-border space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-navy-deep">{rcp.id}</span>
                    <span className="font-bold text-emerald text-xs">{naira(rcp.amount)}</span>
                  </div>
                  <div className="text-xs font-medium text-foreground">
                    {inv?.studentName || "Student Payment"}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/60">
                    <span>Channel: {rcp.method}</span>
                    <span>{rcp.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
