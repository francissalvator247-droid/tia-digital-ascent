import {
  ShieldCheck,
  Target,
  Eye,
  Heart,
  BookOpen,
  Award,
  Users,
  Compass,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import { SCHOOL, staff } from "@/data/school";
import campusImg from "@/assets/campus.jpg";
import heroStudentsImg from "@/assets/hero-students.jpg";
import type { PublicPage } from "./Header";
import { Button } from "@/components/ui/button";

interface AboutViewProps {
  onNavigate: (page: PublicPage) => void;
}

export function AboutView({ onNavigate }: AboutViewProps) {
  const values = [
    {
      title: "Faith (Iman & Taqwa)",
      desc: "Anchoring every learning endeavour in the consciousness of Allah, humility, and moral integrity.",
      icon: Heart,
    },
    {
      title: "Academic Excellence",
      desc: "Challenging every child to stretch beyond ordinary expectations through inquiry and mastery.",
      icon: Award,
    },
    {
      title: "Character & Discipline (Adab)",
      desc: "Instilling respect, punctuality, modesty, and kindness as pillars of upright community leadership.",
      icon: ShieldCheck,
    },
    {
      title: "Innovation & Technology",
      desc: "Empowering students with contemporary computer science, coding, and problem-solving skill sets.",
      icon: Compass,
    },
    {
      title: "Inclusive Care",
      desc: "Honoring each child's individual learning path, with specialized interventions for diverse abilities.",
      icon: Users,
    },
    {
      title: "Qur'anic Literacy",
      desc: "Systematic memorization and comprehension of the Holy Qur'an to serve as a lifelong moral compass.",
      icon: BookOpen,
    },
  ];

  const leaders = [
    {
      name: "Dr. Aisha Bello",
      role: "Principal & Head of School",
      qual: "Ph.D. Educational Leadership (ABU), M.Ed., B.Sc.",
      bio: "Over 22 years in international school administration, championing dual British-Nigerian curricula and moral education.",
    },
    {
      name: "Mr. Suleiman Yakubu",
      role: "Vice Principal & Administrator",
      qual: "M.Sc. Public Admin, B.Ed. Educational Management",
      bio: "Oversees daily operations, compliance with FCT Quality Assurance, staff excellence, and institutional records.",
    },
    {
      name: "Ustaz Abdulrahman Yusuf",
      role: "Head of Islamiyya & Tahfiz Directorate",
      qual: "B.A. Islamic Studies, Ijazah in Hafs & Shu'bah",
      bio: "Leads the 30-Juz memorization programme, ensuring phonetic Tajweed accuracy and spiritual mentorship.",
    },
    {
      name: "Mrs. Ruth Danladi",
      role: "Head of Special Education & Inclusion",
      qual: "M.Ed. Special Needs Education, B.Sc. Psychology",
      bio: "Designs Individualized Education Plans (IEPs) and sensory support frameworks for learners with unique learning needs.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Banner */}
      <div className="bg-navy-deep text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src={campusImg} alt="Campus" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-white/10 px-3 py-1 rounded">
            Heritage & Identity
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white">
            About Talent International Academy
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Founded with a clear mandate: to deliver uncompromising 21st-century academic rigor
            hand-in-hand with authentic Qur'anic scholarship and moral rectitude in Kubwa, Abuja.
          </p>
        </div>
      </div>

      {/* Profile & History */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-navy px-3 py-1 rounded">
              Institutional Profile
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-navy-deep">
              18 Years of Transformative Educational Leadership
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Established in the Federal Capital Territory, Talent International Academy (TIA) was
              founded to solve a pressing dilemma faced by discerning parents: the choice between
              secular academic standards and Islamic moral grounding.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              At TIA, there is no compromise. Our students simultaneously conquer external national
              examinations (WAEC, NECO, BECE) and complete stages of the Holy Qur'an memorization
              with impeccable tajweed and functional Arabic command.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-navy-deep">
                <CheckCircle2 className="w-5 h-5 text-emerald shrink-0" />
                <span>Fully accredited by FCT Department of Quality Assurance (DQA)</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-navy-deep">
                <CheckCircle2 className="w-5 h-5 text-emerald shrink-0" />
                <span>Certified WAEC & NECO Examination Centre</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-navy-deep">
                <CheckCircle2 className="w-5 h-5 text-emerald shrink-0" />
                <span>Purpose-built sports fields, science labs, and ICT suites</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src={heroStudentsImg}
                alt="TIA Students in Uniform"
                className="w-full h-80 sm:h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center text-gold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-gold">Our Mission</h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                To nurture God-conscious, intellectually formidable, and socially responsible global
                citizens through a well-rounded curriculum combining STEM, humanities, Arabic
                literacy, and Qur'anic memorization within a supportive and secure environment.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald/20 flex items-center justify-center text-emerald">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-emerald">Our Vision</h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                To be West Africa's reference model for modern faith-integrated education, where
                academic distinction, upright Islamic character, and compassionate global
                contribution converge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-navy px-3 py-1 rounded">
            Our Moral Compass
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-deep">
            The Pillars of TIA Character
          </h2>
          <p className="text-muted-foreground text-sm">
            Guiding principles that define our classrooms, playing fields, and community
            interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-navy-deep">{val.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-muted/40 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-navy px-3 py-1 rounded">
              School Governance
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-deep">
              Academic & Executive Leadership
            </h2>
            <p className="text-muted-foreground text-sm">
              Seasoned educational leaders bringing decades of pedagogical leadership and Islamic
              wisdom.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((leader, i) => (
              <div
                key={i}
                className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-14 h-14 rounded-full bg-navy text-gold flex items-center justify-center font-display font-bold text-xl">
                    {leader.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <h3 className="font-display font-bold text-base text-navy-deep">{leader.name}</h3>
                  <div className="text-xs font-semibold text-gold">{leader.role}</div>
                  <div className="text-[11px] text-muted-foreground font-medium">{leader.qual}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-navy-deep text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h3 className="font-display text-2xl font-bold">Experience the TIA Difference</h3>
          <p className="text-xs sm:text-sm text-white/80">
            Book a campus tour with our admissions team to see our classrooms and facilities
            firsthand.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Button
              onClick={() => onNavigate("admissions")}
              className="bg-gold text-navy-deep font-bold hover:brightness-105"
            >
              Enrol Your Child
            </Button>
            <Button
              onClick={() => onNavigate("contact")}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Schedule a Visit
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
