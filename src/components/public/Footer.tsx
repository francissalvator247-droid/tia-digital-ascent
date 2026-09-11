import { Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import { SCHOOL } from "@/data/school";
import type { PublicPage } from "./Header";
import tiaCrest from "@/assets/tia-crest.png.asset.json";

interface FooterProps {
  onNavigate: (page: PublicPage) => void;
  onOpenPortal: () => void;
}

export function Footer({ onNavigate, onOpenPortal }: FooterProps) {
  return (
    <footer className="bg-navy-deep text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center p-0.5">
                <img
                  src={tiaCrest.url}
                  alt="Talent International Academy crest"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">TIA Abuja</h3>
                <p className="text-xs text-gold font-medium">{SCHOOL.motto}</p>
              </div>
            </div>
            <p className="text-xs text-white/75 leading-relaxed">
              Talent International Academy is a premier Islamic and conventional co-educational
              institution dedicated to balanced moral character, Qur'anic memorization, and rigorous
              21st-century academic excellence.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/70 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald" />
              <span>Approved by FCT Department of Quality Assurance</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-gold text-sm tracking-wide uppercase mb-4">
              Explore TIA
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="hover:text-gold transition-colors"
                >
                  About Our Vision & Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("academics")}
                  className="hover:text-gold transition-colors"
                >
                  Academic Programmes (EY to SSS 3)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("academics")}
                  className="hover:text-gold transition-colors"
                >
                  Islamiyya & Tahfiz Circle
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("admissions")}
                  className="hover:text-gold transition-colors"
                >
                  Admission Guidelines & Fees
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("student-life")}
                  className="hover:text-gold transition-colors"
                >
                  Clubs, Sports & Co-Curricular
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("calendar")}
                  className="hover:text-gold transition-colors font-medium text-gold/90"
                >
                  Official Academic Calendar (2025/2026)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("news-events")}
                  className="hover:text-gold transition-colors"
                >
                  School News & Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("gallery")}
                  className="hover:text-gold transition-colors"
                >
                  Campus Photo Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Programmes & Levels */}
          <div>
            <h4 className="font-display font-semibold text-gold text-sm tracking-wide uppercase mb-4">
              Academic Levels
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span>Early Years (Creche & Nursery)</span>
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gold">
                  Age 1–5
                </span>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span>Primary School (Basic 1–6)</span>
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gold">
                  Age 6–11
                </span>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span>Junior Secondary (JSS 1–3)</span>
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gold">
                  BECE Prep
                </span>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span>Senior Secondary (SSS 1–3)</span>
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gold">
                  WAEC / NECO
                </span>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span>Islamiyya & Tahfiz Section</span>
                <span className="text-[10px] bg-emerald/20 px-1.5 py-0.5 rounded text-emerald">
                  30 Juz
                </span>
              </li>
              <li className="flex items-center justify-between pb-1.5">
                <span>Inclusive Special Education</span>
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gold">
                  Individualized
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Portal */}
          <div>
            <h4 className="font-display font-semibold text-gold text-sm tracking-wide uppercase mb-4">
              Campus & Portal
            </h4>
            <div className="space-y-3 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{SCHOOL.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>
                  {SCHOOL.phone} / {SCHOOL.altPhone}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>{SCHOOL.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span>{SCHOOL.hours}</span>
              </div>

              <div className="pt-3">
                <button
                  onClick={onOpenPortal}
                  className="w-full bg-gradient-to-r from-gold to-gold-soft text-navy-deep font-bold py-2.5 px-4 rounded-md shadow hover:brightness-105 transition-all text-xs flex items-center justify-center gap-2"
                >
                  <span>Launch ERP Demonstration</span>
                  <span className="text-[10px] bg-navy-deep/20 px-1.5 py-0.5 rounded">Live</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/60">
          <p>
            © {new Date().getFullYear()} Talent International Academy (TIA), Abuja. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>National Curriculum (NERDC)</span>
            <span>·</span>
            <span>British Cambridge Pathway</span>
            <span>·</span>
            <span>Certified Tahfiz Academy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
