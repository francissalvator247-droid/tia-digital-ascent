import { useState } from "react";
import {
  CheckCircle2,
  FileText,
  CreditCard,
  UserCheck,
  Calendar,
  Send,
  Sparkles,
  Phone,
  Mail,
  HelpCircle,
} from "lucide-react";
import { SCHOOL, naira } from "@/data/school";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useErp } from "@/lib/erp-store";
import type { PublicPage } from "./Header";

interface AdmissionsViewProps {
  onNavigate: (page: PublicPage) => void;
  onOpenPortal?: () => void;
}

export function AdmissionsView({ onNavigate, onOpenPortal }: AdmissionsViewProps) {
  const { addApplication, setRole } = useErp();
  const [submitted, setSubmitted] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string>("");
  const [formData, setFormData] = useState({
    childName: "",
    dob: "",
    gender: "Male" as "Male" | "Female",
    classApplying: "JSS 1",
    parentName: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.childName || !formData.parentName || !formData.phone) {
      toast.error("Please fill in the child's name, parent's name, and contact phone number.");
      return;
    }

    // Save to ERP store so Administrator immediately sees this application
    const newApp = addApplication({
      childName: formData.childName,
      gender: formData.gender,
      dob: formData.dob || "2015-01-01",
      classApplying: formData.classApplying,
      parentName: formData.parentName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      notes: formData.notes,
    });

    setSubmittedAppId(newApp.id);
    setSubmitted(true);
    toast.success(`Application registered in ERP! Reference: ${newApp.id}`);
  };

  const steps = [
    {
      num: "01",
      title: "Submit Application",
      desc: "Complete the online application form below or visit the admissions office on campus to purchase an enrollment pack.",
    },
    {
      num: "02",
      title: "Screening Assessment",
      desc: "Prospective pupils sit for a gentle diagnostic test in English, Mathematics, and reading fluency (with Qur'an review for Islamiyya).",
    },
    {
      num: "03",
      title: "Family Interview",
      desc: "A brief meeting between school leadership, the applicant, and parents to align expectations, values, and student support needs.",
    },
    {
      num: "04",
      title: "Offer & Enrolment",
      desc: "Successful applicants receive an official admission letter and student ID, followed by fee payment to secure placement.",
    },
  ];

  const feeBreakdown = [
    {
      tier: "Early Years (Creche & Nursery)",
      tuition: 180000,
      materials: 35000,
      tahfiz: 25000,
      uniform: 22000,
      devLevy: 18000,
    },
    {
      tier: "Primary School (Basic 1 – 6)",
      tuition: 240000,
      materials: 35000,
      tahfiz: 25000,
      uniform: 22000,
      devLevy: 18000,
    },
    {
      tier: "Secondary School (JSS 1 – SSS 3)",
      tuition: 320000,
      materials: 35000,
      tahfiz: 25000,
      uniform: 22000,
      devLevy: 18000,
    },
    {
      tier: "Special Education & Inclusion Unit",
      tuition: 380000,
      materials: 45000,
      tahfiz: 25000,
      uniform: 22000,
      devLevy: 20000,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Banner */}
      <div className="bg-navy-deep text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-white/10 px-3 py-1 rounded">
            Enrolment Guidelines
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white">
            Admissions for {SCHOOL.session} Session
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            We welcome applications from families who share our commitment to academic excellence,
            upright moral character, and Qur'anic devotion.
          </p>
        </div>
      </div>

      {/* 4 Steps Section */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-navy px-3 py-1 rounded">
            Straightforward Process
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-navy-deep">
            Four Steps to Joining TIA
          </h2>
          <p className="text-muted-foreground text-sm">
            Our admissions team is dedicated to making the transition smooth and supportive for your
            family.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-3 relative overflow-hidden"
            >
              <div className="font-display font-black text-4xl text-navy/10">{st.num}</div>
              <h3 className="font-display font-bold text-lg text-navy-deep">{st.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fee Schedule Section */}
      <section className="py-16 bg-muted/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-navy px-3 py-1 rounded">
              Transparent Financing
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-navy-deep">
              Official Termly Fee Schedule ({SCHOOL.session})
            </h2>
            <p className="text-muted-foreground text-sm">
              All fees are payable termly. Discretionary installment plans are available through our
              accounts department.
            </p>
          </div>

          <div className="overflow-x-auto bg-card rounded-xl border border-border shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-navy text-white font-semibold">
                  <th className="p-4">Academic Tier</th>
                  <th className="p-4">Tuition Fee</th>
                  <th className="p-4">Books & Learning Materials</th>
                  <th className="p-4">Islamiyya / Tahfiz</th>
                  <th className="p-4">Uniform & Sports Kit</th>
                  <th className="p-4">Development Levy</th>
                  <th className="p-4 text-gold">Total Termly Bill</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {feeBreakdown.map((row, i) => {
                  const total =
                    row.tuition + row.materials + row.tahfiz + row.uniform + row.devLevy;
                  return (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-bold text-navy-deep text-sm">{row.tier}</td>
                      <td className="p-4">{naira(row.tuition)}</td>
                      <td className="p-4">{naira(row.materials)}</td>
                      <td className="p-4">{naira(row.tahfiz)}</td>
                      <td className="p-4">{naira(row.uniform)}</td>
                      <td className="p-4">{naira(row.devLevy)}</td>
                      <td className="p-4 font-bold text-navy-deep text-sm bg-gold/10">
                        {naira(total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-navy-deep/5 rounded-lg border border-navy/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground">
            <div>
              <span className="font-bold text-navy-deep">Optional Services:</span> School Bus
              Shuttle (₦45,000 – ₦70,000 based on route across Kubwa/Dutse/Gwarinpa), Hot Lunch
              Scheme (₦35,000 per term).
            </div>
            <div className="text-navy font-semibold shrink-0">
              Discounts: 10% on 3rd sibling tuition
            </div>
          </div>
        </div>
      </section>

      {/* Application Form & Requirements */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Requirements Checklist */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-navy px-3 py-1 rounded">
                Checklist
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-deep">
                Admission Requirements
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Please ensure you have copies of the following documents ready for physical
                screening upon invitation:
              </p>
            </div>

            <div className="space-y-3">
              {[
                "Certified copy of Child's Birth Certificate or National Identity Number (NIN) slip",
                "Four recent colored passport photographs of the student with white background",
                "Most recent academic term report card from the previous school (Primary/Secondary)",
                "Transfer certificate or testimonial for candidates joining from outside the FCT",
                "Medical fitness certificate and immunization records",
                "Two passport photographs of parents or legal guardian",
              ].map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border text-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                  <span className="text-foreground">{req}</span>
                </div>
              ))}
            </div>

            <div className="p-5 bg-navy text-white rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-gold font-bold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Need Admissions Guidance?</span>
              </div>
              <p className="text-xs text-white/80">
                Call our admissions desk directly or walk in Monday to Friday, 8:00am – 3:00pm.
              </p>
              <div className="text-xs font-semibold text-gold pt-1">
                {SCHOOL.phone} · admissions@tiaabuja.com
              </div>
            </div>
          </div>

          {/* Right: Interactive Application Form */}
          <div className="lg:col-span-7">
            <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border shadow-md space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-navy-deep">
                  Online Admission Application
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Fill in the details below. Our admissions registrar will contact you within 24
                  hours to schedule the assessment.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 bg-emerald/10 border border-emerald/30 rounded-xl text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald text-white rounded-full mx-auto flex items-center justify-center shadow">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-emerald">
                    Application Enrolled in ERP System!
                  </h4>
                  <div className="inline-flex items-center gap-2 bg-emerald/20 border border-emerald/40 text-emerald-800 dark:text-emerald-300 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold">
                    <span>Reference ID:</span>
                    <span className="text-sm font-black">{submittedAppId}</span>
                  </div>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.parentName}</strong>. The application for{" "}
                    <strong>{formData.childName}</strong> (applying for{" "}
                    <strong>{formData.classApplying}</strong>) has been added to the{" "}
                    <strong>TIA Admissions Queue</strong>.
                  </p>

                  <div className="p-3 bg-card border border-border rounded-lg text-left text-xs space-y-1 max-w-md mx-auto">
                    <div className="text-[11px] font-bold text-navy-deep uppercase tracking-wider">
                      Live ERP Connection Status:
                    </div>
                    <p className="text-muted-foreground text-[11px]">
                      The School Administrator now sees this applicant in the{" "}
                      <strong>Administrator Portal → Admissions Desk</strong> to review credentials,
                      assign a class arm, and generate an official Admission Number.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    {onOpenPortal && (
                      <Button
                        onClick={() => {
                          setRole("admin");
                          onOpenPortal();
                        }}
                        className="bg-navy text-gold hover:bg-navy-deep font-bold text-xs"
                      >
                        Open Administrator Dashboard to Review →
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          childName: "",
                          dob: "",
                          gender: "Male",
                          classApplying: "JSS 1",
                          parentName: "",
                          phone: "",
                          email: "",
                          address: "",
                          notes: "",
                        });
                      }}
                      variant="outline"
                      className="text-xs"
                    >
                      Submit Another Application
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="childName">Child's Full Name *</Label>
                      <Input
                        id="childName"
                        required
                        placeholder="e.g. Maryam Aminu Bello"
                        value={formData.childName}
                        onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="classApplying">Class Applying For *</Label>
                      <Select
                        value={formData.classApplying}
                        onValueChange={(val) => setFormData({ ...formData, classApplying: val })}
                      >
                        <SelectTrigger id="classApplying">
                          <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Creche">Creche (Age 18m+)</SelectItem>
                          <SelectItem value="Nursery 1">Nursery 1</SelectItem>
                          <SelectItem value="Nursery 2">Nursery 2</SelectItem>
                          <SelectItem value="Primary 1">Primary 1 (Basic 1)</SelectItem>
                          <SelectItem value="Primary 2">Primary 2</SelectItem>
                          <SelectItem value="Primary 3">Primary 3</SelectItem>
                          <SelectItem value="Primary 4">Primary 4</SelectItem>
                          <SelectItem value="Primary 5">Primary 5</SelectItem>
                          <SelectItem value="Primary 6">Primary 6</SelectItem>
                          <SelectItem value="JSS 1">JSS 1 (Junior Secondary)</SelectItem>
                          <SelectItem value="JSS 2">JSS 2</SelectItem>
                          <SelectItem value="JSS 3">JSS 3</SelectItem>
                          <SelectItem value="SSS 1">SSS 1 (Senior Secondary)</SelectItem>
                          <SelectItem value="SSS 2">SSS 2</SelectItem>
                          <SelectItem value="Islamiyya (Tahfiz)">
                            Islamiyya / Tahfiz Full-time
                          </SelectItem>
                          <SelectItem value="Inclusive Unit">
                            Inclusive Special Education Unit
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="gender">Child's Gender</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(val) => setFormData({ ...formData, gender: val })}
                      >
                        <SelectTrigger id="gender">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
                    <div className="space-y-1.5">
                      <Label htmlFor="parentName">Parent / Guardian Name *</Label>
                      <Input
                        id="parentName"
                        required
                        placeholder="e.g. Alhaji Ibrahim Bello"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        required
                        type="tel"
                        placeholder="e.g. 0803 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e.g. parent@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="notes">
                      Additional Information / Previous School / Special Support
                    </Label>
                    <Input
                      id="notes"
                      placeholder="e.g. Currently in Basic 5, has completed 4 Juz of Qur'an"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gold to-gold-soft text-navy-deep font-bold hover:brightness-105 py-2.5 text-xs sm:text-sm mt-2"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Online Application
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
