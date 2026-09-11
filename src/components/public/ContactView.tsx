import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  Navigation,
} from "lucide-react";
import { SCHOOL } from "@/data/school";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import type { PublicPage } from "./Header";

interface ContactViewProps {
  onNavigate: (page: PublicPage) => void;
}

export function ContactView({ onNavigate }: ContactViewProps) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Admissions Enquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error("Please fill in your name, phone number, and message.");
      return;
    }
    setSent(true);
    toast.success("Your message has been sent to our administrative desk! We will reply promptly.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Banner */}
      <div className="bg-navy-deep text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-white/10 px-3 py-1 rounded">
            Reach Out To Us
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white">
            Contact & Campus Location
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Have questions about admissions, fees, transport routes, or our Tahfiz curriculum? Our
            friendly administration team is here to assist you.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details & Map Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-navy px-3 py-1 rounded">
                Direct Channels
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-deep">
                Get in Touch Directly
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                We invite parents to visit our campus during regular school hours for tours, fee
                consultations, and student assessments.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="font-bold text-navy-deep">Campus Address</div>
                  <p className="text-muted-foreground mt-0.5">{SCHOOL.address}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Landmark: Off Arab Road, Kubwa, Abuja.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="font-bold text-navy-deep">Phone Lines</div>
                  <p className="text-muted-foreground mt-0.5">
                    Telephone:{" "}
                    <span className="font-semibold text-foreground">{SCHOOL.phone}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Mobile: <span className="font-semibold text-foreground">{SCHOOL.altPhone}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="font-bold text-navy-deep">Email Enquiries</div>
                  <p className="text-muted-foreground mt-0.5">{SCHOOL.email}</p>
                  <p className="text-[11px] text-muted-foreground">admissions@tiaabuja.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="font-bold text-navy-deep">Visiting Hours</div>
                  <p className="text-muted-foreground mt-0.5">{SCHOOL.hours}</p>
                  <p className="text-[11px] text-muted-foreground">
                    Saturday tours by prior appointment only (10:00am – 2:00pm).
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder Card */}
            <div className="rounded-xl overflow-hidden border border-border bg-card shadow-sm p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-bold text-sm text-navy-deep flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-emerald" />
                  <span>Campus Location Map</span>
                </div>
                <span className="text-[10px] bg-emerald/20 text-emerald font-semibold px-2 py-0.5 rounded">
                  Kubwa District
                </span>
              </div>
              <div className="h-44 rounded-lg bg-muted/70 flex flex-col items-center justify-center text-center p-4 border border-dashed border-border">
                <MapPin className="w-8 h-8 text-gold mb-2" />
                <div className="font-bold text-xs text-navy-deep">Talent International Academy</div>
                <div className="text-[11px] text-muted-foreground max-w-xs mt-1">
                  No 1 Talent Academy Street, Off Arab Road Kubwa, Abuja
                </div>
                <div className="mt-3 text-[11px] bg-navy text-white px-3 py-1 rounded font-medium">
                  Easily accessible from Arab Road and the Kubwa Expressway
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border shadow-md space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-navy-deep">
                  Send Us a Direct Message
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Fill out the form below and an administrative officer will respond within one
                  business day.
                </p>
              </div>

              {sent ? (
                <div className="p-8 bg-emerald/10 border border-emerald/30 rounded-xl text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald text-white rounded-full mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-emerald">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{form.name}</strong>. Your enquiry regarding{" "}
                    <strong>{form.subject}</strong> has been logged. We will reach you on{" "}
                    <strong>{form.phone}</strong>.
                  </p>
                  <Button
                    onClick={() => {
                      setSent(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "Admissions Enquiry",
                        message: "",
                      });
                    }}
                    variant="outline"
                    className="text-xs"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="contactName">Full Name *</Label>
                      <Input
                        id="contactName"
                        required
                        placeholder="e.g. Hajiya Fatima Garba"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contactPhone">Phone Number *</Label>
                      <Input
                        id="contactPhone"
                        required
                        type="tel"
                        placeholder="e.g. 0802 345 6789"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="contactEmail">Email Address</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        placeholder="e.g. parent@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contactSubject">Enquiry Category</Label>
                      <Input
                        id="contactSubject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contactMessage">Your Message / Question *</Label>
                    <Textarea
                      id="contactMessage"
                      rows={5}
                      required
                      placeholder="Please let us know how we can assist you..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-navy hover:bg-navy-soft text-white font-bold py-2.5 text-xs sm:text-sm"
                  >
                    <Send className="w-4 h-4 mr-2 text-gold" />
                    Send Message to Administration
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
