import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Compass,
  Star,
  LogIn,
  KeyRound,
  Calculator,
  Shield,
  FileCheck2,
} from "lucide-react";
import { SCHOOL, facts, news, upcomingEvents } from "@/data/school";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import type { PublicPage } from "./Header";

import heroStudentsImg from "@/assets/hero-students.jpg";
import campusImg from "@/assets/campus.jpg";
import studentLifeImg from "@/assets/student-life.jpg";
import progEarlyImg from "@/assets/programme-early-years.jpg";
import progPrimaryImg from "@/assets/programme-primary.jpg";
import progSecondaryImg from "@/assets/programme-secondary.jpg";
import progIslamiyyaImg from "@/assets/programme-islamiyya.jpg";
import progSpecialImg from "@/assets/programme-special.jpg";

interface HomeViewProps {
  onNavigate: (page: PublicPage) => void;
  onOpenPortal: () => void;
}

export function HomeView({ onNavigate, onOpenPortal }: HomeViewProps) {
  const programmes = [
    {
      id: "early-years",
      title: "Early Years",
      subtitle: "Creche & Nursery",
      ages: "Ages 1 – 5",
      desc: "Montessori-inspired sensory learning, early literacy, numeracy, and gentle introduction to Arabic phonetics and Du'a in a caring environment.",
      image: progEarlyImg,
      highlight: "1:8 Educator-to-Pupil Ratio",
    },
    {
      id: "primary",
      title: "Primary School",
      subtitle: "Grades 1 – 6",
      ages: "Ages 6 – 11",
      desc: "Robust foundation in English diction, Singapore-style mathematics, general science, social sciences, ICT coding, and conversational Arabic.",
      image: progPrimaryImg,
      highlight: "National & Cambridge Checkpoint Ready",
    },
    {
      id: "secondary",
      title: "Secondary School",
      subtitle: "JSS1 – SSS3",
      ages: "Ages 11 – 17",
      desc: "Science, arts, and commercial streams preparing confident youth for WAEC, NECO, UTME (JAMB), and IGCSE examinations with modern laboratory practice.",
      image: progSecondaryImg,
      highlight: "100% WAEC Credit Pass Rate",
    },
    {
      id: "islamiyya",
      title: "Islamiyya & Tahfiz",
      subtitle: "Comprehensive Qur'anic Studies",
      ages: "All Ages",
      desc: "Rigorous Tajweed instruction, structured Hifz memorization tracks, Hadith studies, Fiqh, and Islamic moral character mentoring (Adab).",
      image: progIslamiyyaImg,
      highlight: "Certified Azhari Qur'an Instructors",
    },
    {
      id: "special-needs",
      title: "Special Education & IEP",
      subtitle: "Inclusive Learning Support",
      ages: "Personalized",
      desc: "Individualized Education Plans (IEP) designed for gifted learners, speech enrichment, reading remediation, and neurodivergent support.",
      image: progSpecialImg,
      highlight: "Qualified Special Needs Therapists",
    },
  ];

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION WITH HIGH-IMPACT SCHOOL BRANDING */}
      <section className="relative overflow-hidden bg-navy-deep text-white">
        {/* Background image overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroStudentsImg}
            alt="Talent International Academy Pupils"
            className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-navy-deep/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 sm:py-28 lg:py-36">
          <Reveal>
            <div className="max-w-3xl space-y-7">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gold/15 border border-gold/50 text-gold text-xs sm:text-sm font-bold backdrop-blur-md shadow-sm">
                <Sparkles className="w-4 h-4 text-gold shrink-0" />
                <span>Admissions Open for {SCHOOL.session} Academic Session</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                Nurturing <span className="text-gold italic font-normal">Minds</span>, Instilling{" "}
                <span className="text-gold italic font-normal">Faith</span>, Inspiring Excellence.
              </h1>

              <p className="text-base sm:text-xl text-white/95 leading-relaxed font-normal max-w-2xl">
                At Talent International Academy, Abuja, we harmonize world-class British & Nigerian
                curricula with authentic Qur'anic memorization (Tahfiz) and Islamic character
                formation.
              </p>

              {/* Action buttons including clear ACCESS ERP PORTAL button */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Button
                  onClick={() => onNavigate("admissions")}
                  size="lg"
                  className="bg-gradient-to-r from-gold to-gold-soft text-navy-deep hover:brightness-105 font-bold shadow-xl text-sm sm:text-base px-7 py-6.5 rounded-xl transition-all"
                >
                  <span>Apply for Admission</span>
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </Button>

                {/* Explicit Hero Access ERP Portal Button */}
                <Button
                  onClick={onOpenPortal}
                  size="lg"
                  className="bg-white/15 hover:bg-white/25 border-2 border-gold/70 text-white hover:text-gold font-extrabold text-sm sm:text-base px-6 py-6.5 rounded-xl backdrop-blur-md transition-all shadow-lg flex items-center gap-2.5"
                  aria-label="Access ERP Portal login screen"
                >
                  <LogIn className="w-5 h-5 text-gold" />
                  <span>ACCESS ERP PORTAL</span>
                </Button>

                <Button
                  onClick={() => onNavigate("academics")}
                  variant="ghost"
                  size="lg"
                  className="text-white/90 hover:text-white hover:bg-white/10 font-semibold text-sm sm:text-base px-5 py-6.5 rounded-xl"
                >
                  View Programmes
                </Button>
              </div>

              {/* Quick trust metrics */}
              <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/20">
                {facts.map((fact, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="font-display text-3xl sm:text-4xl font-extrabold text-gold tracking-tight">
                      {fact.value}
                    </div>
                    <div className="text-xs sm:text-sm text-white/80 font-medium leading-snug">
                      {fact.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. WELCOME STATEMENT & CORE PHILOSOPHY */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <Reveal>
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-card">
                  <img
                    src={campusImg}
                    alt="TIA Abuja Campus"
                    className="w-full h-84 sm:h-96 object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 bg-navy text-white p-5 rounded-2xl shadow-xl max-w-xs border border-white/15">
                  <div className="flex items-center gap-2 text-gold font-bold text-sm">
                    <ShieldCheck className="w-5 h-5" />
                    <span>Abuja FCT Accredited</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/85 mt-1 leading-relaxed">
                    Purpose-built safe campus at No 1 Talent Academy Street, Off Arab Road Kubwa.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <Reveal delay={150}>
                <div className="space-y-3">
                  <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-navy px-3.5 py-1.5 rounded-full">
                    Principal's Welcome
                  </div>
                  <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-navy-deep tracking-tight leading-tight">
                    A Sanctuary for Balanced Spiritual & Academic Growth
                  </h2>
                </div>

                <div className="space-y-4 text-muted-foreground text-base sm:text-lg leading-relaxed pt-2">
                  <p>
                    "Welcome to Talent International Academy. For over eighteen years, our mission
                    has remained steadfast: to provide children with the finest conventional
                    academic tools while anchoring their hearts in moral uprightness, the Holy
                    Qur'an, and exemplary Islamic etiquette (Adab)."
                  </p>
                  <p>
                    Whether in our early years Montessori suites, our secondary science
                    laboratories, or our hallowed Tahfiz circles, every child is celebrated, guided,
                    and empowered to achieve their highest God-given potential.
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-navy text-gold flex items-center justify-center font-display font-extrabold text-xl shadow-md">
                    AB
                  </div>
                  <div>
                    <div className="font-display font-extrabold text-navy-deep text-lg sm:text-xl">
                      Dr. Aisha Bello
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                      Principal & Chief Executive, Talent International Academy
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FIVE ACADEMIC PROGRAMMES */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-navy px-3.5 py-1.5 rounded-full">
              Curricular Pathways
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-navy-deep tracking-tight">
              Comprehensive Academic Programmes
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Structured progression designed to prepare students for national and international
              universities without compromising spiritual devotion.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programmes.map((prog, index) => (
            <Reveal key={prog.id} delay={index * 80}>
              <div className="h-full bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col group">
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                  />
                  <div className="absolute top-3.5 right-3.5 bg-navy-deep/85 backdrop-blur-md text-gold px-3 py-1 rounded-full text-xs font-bold border border-white/10 shadow-sm">
                    {prog.ages}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-emerald uppercase tracking-wider">
                      {prog.subtitle}
                    </div>
                    <h3 className="font-display font-bold text-2xl text-navy-deep tracking-tight">
                      {prog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{prog.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-border/70">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-navy font-semibold mb-4">
                      <Star className="w-4 h-4 text-gold fill-gold shrink-0" />
                      <span>{prog.highlight}</span>
                    </div>
                    <Button
                      onClick={() => onNavigate("academics")}
                      variant="outline"
                      className="w-full text-xs sm:text-sm font-bold hover:bg-navy hover:text-white py-2.5 rounded-xl border-border"
                    >
                      <span>Programme Details</span>
                      <ChevronRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Quick Enrolment Card */}
          <Reveal delay={programmes.length * 80}>
            <div className="h-full bg-gradient-to-br from-navy-deep via-navy to-navy-soft p-7 rounded-2xl text-white flex flex-col justify-between border-2 border-gold/40 shadow-lg">
              <div className="space-y-4">
                <div className="w-13 h-13 rounded-xl bg-gold/20 flex items-center justify-center text-gold shadow-md">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gold tracking-tight">
                  Begin Your Child's Journey
                </h3>
                <p className="text-sm text-white/90 leading-relaxed font-normal">
                  Take the first step toward enrolling your child in Abuja's premier faith-anchored
                  academy. Schedule an entrance assessment or open day tour today.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-white/95 pt-2">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                    <span>Termly flexible tuition payment plans</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                    <span>Air-conditioned school shuttle bus network</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                    <span>Dedicated Special Needs / IEP support unit</span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={() => onNavigate("admissions")}
                className="mt-6 bg-gold text-navy-deep font-bold hover:bg-gold-soft py-6 rounded-xl shadow-lg text-sm sm:text-base"
              >
                Start Admission Process
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. CENTRALIZED SCHOOL ERP SPOTLIGHT BANNER */}
      <section className="py-20 bg-gradient-to-r from-navy-deep via-navy to-navy-deep text-white border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal>
            <div className="bg-white/5 rounded-3xl p-8 sm:p-12 border border-gold/30 shadow-2xl backdrop-blur-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/20 text-gold text-xs sm:text-sm font-bold border border-gold/40">
                    <Shield className="w-4 h-4 text-gold" />
                    <span>Digital Ascent ERP Management Suite</span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    Centralized Cloud ERP for Modern School Operations
                  </h2>

                  <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                    Experience TIA's integrated management portal connecting leadership, teachers,
                    bursary, parents, and students on a unified platform with WAEC-compliant
                    gradebooks, live attendance registers, fee reconciliation, and instant A4 termly
                    report generation.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
                      <div className="font-bold text-sm text-gold">Executive KPIs</div>
                      <div className="text-xs text-white/75 mt-0.5">Principal Oversight</div>
                    </div>
                    <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
                      <div className="font-bold text-sm text-gold">Continuous CA</div>
                      <div className="text-xs text-white/75 mt-0.5">Automated WAEC Grades</div>
                    </div>
                    <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
                      <div className="font-bold text-sm text-gold">Bursary Ledgers</div>
                      <div className="text-xs text-white/75 mt-0.5">Tuition & Invoicing</div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Button
                      onClick={onOpenPortal}
                      size="lg"
                      className="bg-gold text-navy-deep hover:bg-gold-soft font-extrabold text-sm sm:text-base px-8 py-6.5 rounded-xl shadow-xl flex items-center gap-2"
                    >
                      <LogIn className="w-5 h-5 text-navy-deep" />
                      <span>ACCESS ERP PORTAL</span>
                    </Button>
                    <span className="text-xs text-white/70">
                      6 Stakeholder roles available for interactive evaluation
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-navy-deep/80 p-6 rounded-2xl border border-white/15 space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-gold flex items-center justify-between">
                    <span>Available Stakeholder Portals</span>
                    <span className="text-[11px] text-white/60">Live Demonstration</span>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm">
                    {[
                      { role: "Principal", label: "Executive Leadership & KPI Audits" },
                      { role: "Administrator", label: "Registry, Allocations & Admissions" },
                      { role: "Teacher", label: "Daily Roll Call & Term Gradebooks" },
                      { role: "Accountant", label: "Fee Billing & Revenue Receipts" },
                      { role: "Parent", label: "Ward Progress & Online Invoices" },
                      { role: "Student", label: "Timetables, CA & Term Reports" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/5"
                      >
                        <span className="font-bold text-white">{item.role}</span>
                        <span className="text-xs text-white/75">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={onOpenPortal}
                    variant="outline"
                    className="w-full border-gold/50 text-gold hover:bg-gold/10 font-bold text-xs sm:text-sm py-2.5 rounded-xl"
                  >
                    Launch Demonstration Roles
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. WHY CHOOSE TIA (PILLARS) */}
      <section className="py-20 bg-navy-deep text-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
              <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-white/10 px-3.5 py-1.5 rounded-full">
                The TIA Advantage
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Why Discerning Parents Choose TIA
              </h2>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                An educational ecosystem where intellectual rigor and spiritual devotion flourish
                side by side.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal delay={100}>
              <div className="h-full bg-white/5 border border-white/15 p-7 rounded-2xl space-y-4 hover:border-gold/60 transition-all">
                <div className="w-13 h-13 rounded-xl bg-gold/20 flex items-center justify-center text-gold shadow-md">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  Dual Excellence Pathway
                </h3>
                <p className="text-sm text-white/85 leading-relaxed">
                  Seamless blend of the Nigerian National Curriculum (NERDC) and British Cambridge
                  frameworks, empowering students for top Nigerian and international tertiary
                  admissions.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="h-full bg-white/5 border border-white/15 p-7 rounded-2xl space-y-4 hover:border-emerald/60 transition-all">
                <div className="w-13 h-13 rounded-xl bg-emerald/20 flex items-center justify-center text-emerald shadow-md">
                  <HeartHandshake className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  Authentic Qur'an & Character
                </h3>
                <p className="text-sm text-white/85 leading-relaxed">
                  Dedicated daily Tahfiz slots led by Azhar-certified instructors ensure children
                  memorize the Qur'an with proper Tajweed while internalizing prophetic morals and
                  modesty.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="h-full bg-white/5 border border-white/15 p-7 rounded-2xl space-y-4 hover:border-gold/60 transition-all">
                <div className="w-13 h-13 rounded-xl bg-gold/20 flex items-center justify-center text-gold shadow-md">
                  <Compass className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  Modern STEM & Digital ERP
                </h3>
                <p className="text-sm text-white/85 leading-relaxed">
                  State-of-the-art computer and robotics labs paired with a transparent cloud school
                  ERP, giving parents live access to results, attendance, timetables, and teacher
                  communication.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. STUDENT LIFE HIGHLIGHT */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="space-y-6">
              <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-navy px-3.5 py-1.5 rounded-full">
                Beyond The Classroom
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-navy-deep tracking-tight">
                Vibrant Co-Curricular & Student Life
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Education at TIA extends far beyond textbooks. Our pupils engage in vibrant
                inter-house athletic competitions, debating tournaments, robotics design challenges,
                charity drives, and leadership retreats.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-card border border-border p-4 rounded-xl space-y-1 shadow-sm">
                  <div className="font-display font-bold text-navy-deep text-lg">
                    4 Sports Houses
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    Zamfara, Kaduna, Kano, Sokoto
                  </div>
                </div>
                <div className="bg-card border border-border p-4 rounded-xl space-y-1 shadow-sm">
                  <div className="font-display font-bold text-navy-deep text-lg">
                    12 Active Clubs
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    Robotics, Press, Red Cross & Tahfiz
                  </div>
                </div>
                <div className="bg-card border border-border p-4 rounded-xl space-y-1 shadow-sm">
                  <div className="font-display font-bold text-navy-deep text-lg">
                    Annual Sports Day
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    Track, field & Qur'an quiz sprint
                  </div>
                </div>
                <div className="bg-card border border-border p-4 rounded-xl space-y-1 shadow-sm">
                  <div className="font-display font-bold text-navy-deep text-lg">Excursions</div>
                  <div className="text-xs text-muted-foreground font-medium">
                    National Space Agency, NILS & Museums
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => onNavigate("student-life")}
                  className="bg-navy hover:bg-navy-soft text-white font-bold px-6 py-5 rounded-xl shadow-md"
                >
                  <span>Explore Student Activities</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-card">
              <img
                src={studentLifeImg}
                alt="TIA Student Life Activities"
                className="w-full h-84 sm:h-[440px] object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. NEWS & UPCOMING EVENTS PREVIEW */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-navy px-3.5 py-1.5 rounded-full mb-2.5">
                  Campus Updates
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-deep">
                  Latest News & Events
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                <Button
                  onClick={() => onNavigate("calendar")}
                  className="bg-gold text-navy-deep hover:bg-gold-soft text-xs sm:text-sm font-bold shadow-sm"
                >
                  <Calendar className="w-4 h-4 mr-1.5" />
                  <span>Academic Calendar</span>
                </Button>
                <Button
                  onClick={() => onNavigate("news-events")}
                  variant="outline"
                  className="text-xs sm:text-sm font-bold border-border"
                >
                  View News & Stories
                </Button>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* News items (first 2) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Featured School Stories
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {news.slice(0, 2).map((item, idx) => (
                  <Reveal key={item.id} delay={idx * 100}>
                    <div className="h-full bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="bg-navy/10 text-navy font-bold px-2.5 py-0.5 rounded-full">
                            {item.category}
                          </span>
                          <span>{item.date}</span>
                        </div>
                        <h3 className="font-display font-bold text-lg sm:text-xl text-navy-deep leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                          {item.excerpt}
                        </p>
                      </div>
                      <button
                        onClick={() => onNavigate("news-events")}
                        className="text-xs sm:text-sm font-bold text-gold hover:underline inline-flex items-center pt-2"
                      >
                        Read full announcement <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </button>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Upcoming events preview */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Upcoming Academic Events
              </div>
              <Reveal delay={200}>
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-4">
                  {upcomingEvents.slice(0, 3).map((evt) => (
                    <div
                      key={evt.id}
                      className="flex items-start gap-3.5 pb-3.5 border-b border-border/80 last:border-0 last:pb-0"
                    >
                      <div className="bg-navy text-gold p-2.5 rounded-xl text-center min-w-[58px] shrink-0 shadow-sm">
                        <Calendar className="w-4 h-4 mx-auto mb-1 text-gold" />
                        <div className="text-[11px] font-extrabold uppercase leading-tight">
                          {evt.date.slice(5)}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-navy-deep leading-snug">
                          {evt.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {evt.time} · {evt.venue}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ADMISSIONS ENQUIRY CTA BAND */}
      <section className="py-20 bg-navy text-white text-center">
        <Reveal>
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-white/10 px-3.5 py-1.5 rounded-full">
              Enrolment Open
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold">
              Give Your Child the Foundation They Deserve
            </h2>
            <p className="text-white/85 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Join hundreds of families across Abuja who trust Talent International Academy for
              balanced morals and academic brilliance. Limited spaces available for the{" "}
              {SCHOOL.session} session.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                onClick={() => onNavigate("admissions")}
                size="lg"
                className="bg-gradient-to-r from-gold to-gold-soft text-navy-deep hover:brightness-105 font-bold px-8 py-6 rounded-xl shadow-xl text-base"
              >
                Apply Online Now
              </Button>
              <Button
                onClick={() => onNavigate("contact")}
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 px-8 py-6 rounded-xl text-base"
              >
                Contact Admissions Desk
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
