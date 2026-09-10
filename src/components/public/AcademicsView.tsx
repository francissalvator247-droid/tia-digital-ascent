import { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  Award,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { SCHOOL, subjects, classes } from "@/data/school";
import { Button } from "@/components/ui/button";
import type { PublicPage } from "./Header";

import progEarlyImg from "@/assets/programme-early-years.jpg";
import progPrimaryImg from "@/assets/programme-primary.jpg";
import progSecondaryImg from "@/assets/programme-secondary.jpg";
import progIslamiyyaImg from "@/assets/programme-islamiyya.jpg";
import progSpecialImg from "@/assets/programme-special.jpg";

interface AcademicsViewProps {
  onNavigate: (page: PublicPage) => void;
}

export function AcademicsView({ onNavigate }: AcademicsViewProps) {
  const [activeTab, setActiveTab] = useState<
    "early-years" | "primary" | "secondary" | "islamiyya" | "special"
  >("early-years");

  const programmes = [
    {
      id: "early-years" as const,
      name: "Early Years",
      classes: "Creche, Nursery 1, Nursery 2",
      ages: "Ages 18 months – 5 years",
      image: progEarlyImg,
      overview:
        "The Early Years Foundation Stage (EYFS) at TIA provides a safe, nurturing, and inquiry-rich environment where young children discover literacy, numeracy, and social collaboration through play, sensory tasks, and phonetic building blocks.",
      keyFeatures: [
        "Montessori-infused practical life and sensorial materials",
        "Jolly Phonics literacy programme ensuring early independent reading",
        "Foundational Arabic alphabet recognition & short Surahs memorization",
        "Gross & fine motor development in a safe, carpeted playground",
        "Warm, experienced caregiving with low pupil-to-teacher ratios (1:8)",
      ],
      curriculum: [
        "Communication & Language",
        "Mathematical Development & Numbers",
        "Expressive Arts & Music",
        "Physical & Sensorial Coordination",
        "Early Qur'an & Moral Foundations",
      ],
    },
    {
      id: "primary" as const,
      name: "Primary School",
      classes: "Basic 1 through Basic 6",
      ages: "Ages 6 – 11 years",
      image: progPrimaryImg,
      overview:
        "Our Primary curriculum merges the Nigerian National Basic Education curriculum with key elements of the British National Curriculum. Pupils build rigorous critical thinking, analytical computation, and confident communication.",
      keyFeatures: [
        "Intensive STEM grounding in Mathematics, Coding, and Elementary Science",
        "English grammar, creative writing, and public elocution mastery",
        "Seamless integration of daily Qur'an memorization and Arabic lessons",
        "Regular termly continuous assessment (CA) tracking via ERP",
        "Preparation for National Common Entrance and state scholarship exams",
      ],
      curriculum: [
        "Mathematics & Quantitative Aptitude",
        "English Language & Verbal Reasoning",
        "Basic Science & Technology",
        "Social Studies & Civic Education",
        "Qur'an (Tahfiz), Tajweed & Islamic Religious Studies",
        "Arabic Language (Grammar & Conversation)",
        "ICT & Elementary Computer Science",
      ],
    },
    {
      id: "secondary" as const,
      name: "Secondary College",
      classes: "JSS 1 – JSS 3 (Junior) & SSS 1 – SSS 3 (Senior)",
      ages: "Ages 11 – 17 years",
      image: progSecondaryImg,
      overview:
        "TIA Secondary School offers a rigorous academic regimen structured around Junior Secondary BECE and Senior Secondary WAEC & NECO curricula. We prepare students for competitive university placements in Nigeria, the UK, the Middle East, and beyond.",
      keyFeatures: [
        "Modern dedicated laboratories for Physics, Chemistry, Biology, and ICT",
        "Specialized Science, Arts, and Commercial senior streams",
        "Robotics, coding, and artificial intelligence fundamentals club",
        "100% historical WAEC & NECO credit rates in Mathematics & English",
        "Career guidance, university advisory, and leadership retreats",
      ],
      curriculum: [
        "Core: Mathematics, English Language, Civic Education",
        "Sciences: Physics, Chemistry, Biology, Further Mathematics, Agric. Science",
        "Humanities: Literature in English, Government, Islamic Studies, Arabic",
        "Technology: Computer Studies / Data Processing, Technical Drawing",
        "Commerce: Financial Accounting, Commerce, Economics",
      ],
    },
    {
      id: "islamiyya" as const,
      name: "Islamiyya & Tahfiz Directorate",
      classes: "Parallel Track for All Levels",
      ages: "Creche through SSS 3",
      image: progIslamiyyaImg,
      overview:
        "A cornerstone of TIA's identity. The Tahfiz programme is a structured, timetabled department where students memorize the 30 Juz of the Holy Qur'an with authentic Tajweed rules, learn Hadith, and study Fiqh and Islamic morals.",
      keyFeatures: [
        "Graduated memorization pace tailored to individual retention speed",
        "Mastery of Tajweed phonetics, articulation points (Makharij), and rules",
        "Daily revision (Muraja'ah) circles to guarantee durable retention",
        "Annual participation in FCT and national Qur'anic recitation contests",
        "Sanad certification upon successful completion of the 30 Juz",
      ],
      curriculum: [
        "Qur'anic Memorization (Hifz) & Revision",
        "Ahkam at-Tajweed (Rules of Recitation)",
        "Hadith an-Nabawiyyah (Prophetic Traditions)",
        "Fiqh al-Ibadat (Jurisprudence of Worship)",
        "Classical & Conversational Arabic",
        "Adab & Islamic Akhlaq (Moral Etiquette)",
      ],
    },
    {
      id: "special" as const,
      name: "Inclusive Special Education Unit",
      classes: "Individualized Classrooms",
      ages: "Ages 3 – 16 years",
      image: progSpecialImg,
      overview:
        "TIA believes in education for every soul. Our Special Education department provides loving, customized support for learners with autism spectrum conditions, speech delay, ADHD, dyslexia, and developmental variations.",
      keyFeatures: [
        "Qualified special education tutors and behavioral interventionists",
        "Collaborative Individualized Education Plans (IEPs) reviewed termly",
        "Sensory integration spaces and assistive learning technology",
        "Mainstream integration for social events, sports, and assembly",
        "Close parent partnership and therapy progress tracking",
      ],
      curriculum: [
        "Functional Communication & Speech Support",
        "Sensory & Motor Skill Development",
        "Adapted Literacy & Functional Numeracy",
        "Social Interaction & Emotional Regulation",
        "Life Skills & Islamic Etiquette",
      ],
    },
  ];

  const current = programmes.find((p) => p.id === activeTab)!;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Banner */}
      <div className="bg-navy-deep text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-white/10 px-3 py-1 rounded">
            Academic Pathways
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white">
            Curriculum & Academic Programmes
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Delivering the best of conventional scholarship, science, and technology with
            uncompromising fidelity to Qur'anic memorization and Islamic virtue.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        {/* Navigation buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border pb-6">
          {programmes.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === p.id
                  ? "bg-navy text-gold shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Image & Quick Stats */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>

            <div className="bg-muted/50 p-5 rounded-xl border border-border space-y-2">
              <div className="flex items-center justify-between text-xs border-b border-border pb-2">
                <span className="text-muted-foreground">Class Tiers:</span>
                <span className="font-semibold text-navy-deep">{current.classes}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-border pb-2">
                <span className="text-muted-foreground">Target Age Group:</span>
                <span className="font-semibold text-navy-deep">{current.ages}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-muted-foreground">Termly Evaluation:</span>
                <span className="font-semibold text-emerald">CA1, CA2 & Exam via ERP</span>
              </div>
            </div>

            <Button
              onClick={() => onNavigate("admissions")}
              className="w-full bg-gold text-navy-deep font-bold hover:brightness-105"
            >
              Apply for {current.name}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Right: Detailed Description & Curriculum */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wider font-bold text-gold bg-navy inline-block px-2.5 py-1 rounded">
                Programme Overview
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-deep">
                {current.name}
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {current.overview}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="font-display font-bold text-lg text-navy-deep flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold" />
                Key Highlights & Pedagogy
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {current.keyFeatures.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-xs sm:text-sm text-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subjects / Curriculum */}
            <div className="space-y-3">
              <h3 className="font-display font-bold text-lg text-navy-deep flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gold" />
                Curricular Focus Areas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {current.curriculum.map((subj, i) => (
                  <div
                    key={i}
                    className="bg-card p-3 rounded-lg border border-border text-xs font-medium text-navy-deep flex items-center gap-2 shadow-sm"
                  >
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    <span>{subj}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Routine Summary Band */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Structured Daily Balance
            </h2>
            <p className="text-white/70 text-xs sm:text-sm">
              How our timetable seamlessly integrates prayer, academic periods, and physical health.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-2">
              <div className="text-gold text-xs font-bold">7:30am – 8:00am</div>
              <h4 className="font-bold text-sm">Morning Assembly & Du'a</h4>
              <p className="text-xs text-white/70">
                Praise to Allah, National Anthem, Pledge, and morning Azkar recitation.
              </p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-2">
              <div className="text-gold text-xs font-bold">8:00am – 1:30pm</div>
              <h4 className="font-bold text-sm">Core Academic Blocks</h4>
              <p className="text-xs text-white/70">
                Mathematics, Sciences, English, Humanities, and hands-on lab practicals.
              </p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-2">
              <div className="text-gold text-xs font-bold">1:30pm – 2:15pm</div>
              <h4 className="font-bold text-sm">Zuhr Salaah & Lunch</h4>
              <p className="text-xs text-white/70">
                Congregational Zuhr prayer in the school mosque followed by wholesome lunch.
              </p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-2">
              <div className="text-gold text-xs font-bold">2:15pm – 3:30pm</div>
              <h4 className="font-bold text-sm">Tahfiz Circles & Clubs</h4>
              <p className="text-xs text-white/70">
                Qur'an memorization review, Arabic conversation, robotics, and sports.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
