import { useState } from "react";
import {
  GraduationCap,
  Menu,
  X,
  LogIn,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { SCHOOL } from "@/data/school";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export type PublicPage =
  | "home"
  | "about"
  | "academics"
  | "calendar"
  | "admissions"
  | "student-life"
  | "news-events"
  | "gallery"
  | "contact"
  | "portal-login";

interface HeaderProps {
  currentPage: PublicPage;
  onNavigate: (page: PublicPage) => void;
  onOpenPortal: () => void;
}

export function Header({ currentPage, onNavigate, onOpenPortal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PublicPage; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "academics", label: "Academics" },
    { id: "calendar", label: "Academic Calendar" },
    { id: "admissions", label: "Admissions" },
    { id: "student-life", label: "Student Life" },
    { id: "news-events", label: "News & Events" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  const handleNav = (page: PublicPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenPortalClick = () => {
    setMobileMenuOpen(false);
    onOpenPortal();
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-md bg-navy text-white select-none">
      {/* 1. Top Institutional Utility Bar */}
      <div className="bg-navy-deep text-white/90 text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-medium">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>Off Arab Road, Kubwa, Abuja, FCT</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>{SCHOOL.phone}</span>
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>{SCHOOL.hours}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded text-xs text-gold font-bold">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>
                {SCHOOL.session} · {SCHOOL.term}
              </span>
            </span>
            <button
              onClick={handleOpenPortalClick}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-gold text-navy-deep hover:bg-gold-soft px-3 py-1 rounded-md transition-all shadow-sm"
              aria-label="Open ERP Portal Login gateway"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>PORTAL LOGIN</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="px-4 py-3 sm:py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* School Brand / Crest */}
          <button
            onClick={() => handleNav("home")}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg"
            aria-label="Talent International Academy - Home"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0 p-1">
              <img
                src={tiaLogo.url}
                alt="Talent International Academy crest"
                className="w-full h-full object-contain object-left"
                style={{ objectPosition: "left center", transform: "scale(2.9)" }}
              />
            </div>
            <div>
              <div className="font-display font-extrabold text-lg sm:text-2xl tracking-tight leading-none text-white group-hover:text-gold transition-colors">
                Talent International Academy
              </div>
              <p className="text-[11px] sm:text-xs text-white/80 tracking-wider uppercase font-semibold mt-1">
                Abuja · Learning &amp; Morality
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  currentPage === item.id
                    ? "bg-white/20 text-gold shadow-inner font-bold"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Controls: Theme Toggle & PORTAL LOGIN */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle className="text-white hover:text-gold border-white/20 hover:bg-white/10" />

            {/* Clear Primary PORTAL LOGIN Button (Desktop/Tablet) */}
            <Button
              onClick={handleOpenPortalClick}
              className="bg-gold text-navy-deep hover:bg-gold-soft font-bold text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg shadow-md transition-transform hover:scale-102 flex items-center gap-2"
              aria-label="Open Portal Login screen"
            >
              <LogIn className="w-4 h-4 text-navy-deep" />
              <span>PORTAL LOGIN</span>
            </Button>

            {/* Apply for Admission (Hidden on small mobile) */}
            <Button
              onClick={() => handleNav("admissions")}
              variant="outline"
              className="hidden lg:inline-flex border-white/30 text-white hover:bg-white/15 font-semibold text-xs sm:text-sm px-4 py-2 rounded-lg"
            >
              Admissions
            </Button>

            {/* Mobile Hamburger Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden text-white hover:bg-white/10 rounded-lg p-2"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gold" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-navy-deep border-t border-white/15 px-4 py-5 space-y-4 animate-in slide-in-from-top duration-250 shadow-2xl">
          {/* Big Mobile ERP Access CTA */}
          <div className="p-3 bg-white/5 rounded-xl border border-gold/40 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-gold">
                Digital School ERP
              </div>
              <div className="text-sm font-bold text-white">6-Role Enterprise Portal</div>
            </div>
            <Button
              onClick={handleOpenPortalClick}
              className="bg-gold text-navy-deep hover:bg-gold-soft font-bold text-xs px-3.5 py-2 rounded-lg shadow"
            >
              <LogIn className="w-3.5 h-3.5 mr-1" />
              PORTAL LOGIN
            </Button>
          </div>

          {/* Links list with comfortable touch targets */}
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-semibold text-left transition-colors min-h-[48px] ${
                  currentPage === item.id
                    ? "bg-white/20 text-gold font-bold shadow-inner"
                    : "text-white/90 hover:bg-white/10 active:bg-white/15"
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-white/40" />
              </button>
            ))}
          </div>

          {/* Mobile Bottom Actions */}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Button
              onClick={() => handleNav("admissions")}
              className="w-full bg-gradient-to-r from-gold to-gold-soft text-navy-deep font-bold py-3 text-sm rounded-xl shadow"
            >
              Apply for Admission ({SCHOOL.session})
            </Button>

            <div className="flex items-center justify-between px-2 pt-1 text-xs text-white/75">
              <span>Display Theme</span>
              <ThemeToggle showLabel className="text-white border-white/20 hover:bg-white/10" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
