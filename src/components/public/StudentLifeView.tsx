import {
  Trophy,
  Shield,
  Sparkles,
  Users,
  Compass,
  Heart,
  Target,
  ChevronRight,
} from "lucide-react";
import studentLifeImg from "@/assets/student-life.jpg";
import campusImg from "@/assets/campus.jpg";
import { Button } from "@/components/ui/button";
import type { PublicPage } from "./Header";

interface StudentLifeViewProps {
  onNavigate: (page: PublicPage) => void;
}

export function StudentLifeView({ onNavigate }: StudentLifeViewProps) {
  const houses = [
    {
      name: "Zamfara House",
      color: "Gold",
      bg: "from-amber-500/20 to-amber-600/10 border-amber-500/40 text-amber-900",
      pill: "bg-amber-500 text-white",
      motto: "Courage & Industry",
      patron: "Mallam Aminu Kano",
    },
    {
      name: "Kaduna House",
      color: "Navy Blue",
      bg: "from-blue-600/20 to-blue-700/10 border-blue-600/40 text-blue-950",
      pill: "bg-navy text-white",
      motto: "Honor & Service",
      patron: "Sir Ahmadu Bello",
    },
    {
      name: "Kano House",
      color: "Emerald Green",
      bg: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/40 text-emerald-950",
      pill: "bg-emerald text-white",
      motto: "Knowledge & Growth",
      patron: "Alhaji Shehu Shagari",
    },
    {
      name: "Sokoto House",
      color: "Pure White / Silver",
      bg: "from-slate-300/30 to-slate-400/10 border-slate-400/40 text-slate-900",
      pill: "bg-slate-700 text-white",
      motto: "Faith & Integrity",
      patron: "Usman Dan Fodio",
    },
  ];

  const clubs = [
    {
      title: "Robotics & Coding Society",
      category: "STEM",
      desc: "Pupils assemble micro-controllers, write Python scripts, and program basic robotic arms for obstacle detection.",
    },
    {
      title: "Qur'an & Tajweed Circle",
      category: "Spiritual",
      desc: "Advanced vocal training, breath control, and recitation aesthetics preparing students for national musabaqah contests.",
    },
    {
      title: "Press & Media Bureau",
      category: "Literary",
      desc: "Student journalists publish the termly wall magazine, conduct interviews, and broadcast the weekly school audio news.",
    },
    {
      title: "Debating & Public Oratory Club",
      category: "Leadership",
      desc: "Weekly parliamentary debates sharpening rhetoric, logical fallacies identification, and poise on public stages.",
    },
    {
      title: "Red Cross & First Aid Society",
      category: "Service",
      desc: "Practical CPR techniques, bandage application, hygiene advocacy, and emergency drill management.",
    },
    {
      title: "Young Farmers & Eco-Green Club",
      category: "Vocational",
      desc: "Hands-on organic greenhouse farming on campus, soil composting, and environmental stewardship.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Banner */}
      <div className="bg-navy-deep text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-white/10 px-3 py-1 rounded">
            Co-Curricular Excellence
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white">
            Student Life at TIA Abuja
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Building camaraderie, healthy physical vigor, leadership maturity, and joyful school
            memories that last a lifetime.
          </p>
        </div>
      </div>

      {/* Hero Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-navy px-3 py-1 rounded">
              Whole-Child Philosophy
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-navy-deep">
              Nurturing Hearts, Minds & Athletic Spirit
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              At Talent International Academy, we recognize that character is tested not merely in
              examination halls, but on football pitches, during student union assemblies, and when
              serving community charities.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Every student belongs to an active house and is encouraged to join at least one
              academic club and one physical sports society each academic term.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Button
                onClick={() => onNavigate("admissions")}
                className="bg-navy text-gold hover:bg-navy-soft"
              >
                Join Our Student Body
              </Button>
              <Button onClick={() => onNavigate("gallery")} variant="outline">
                View Photo Gallery
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src={studentLifeImg}
                alt="TIA Student Life and Sports"
                className="w-full h-80 sm:h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* House System */}
      <section className="py-16 bg-muted/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-navy px-3 py-1 rounded">
              Inter-House System
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-navy-deep">
              The Four Houses of TIA
            </h2>
            <p className="text-muted-foreground text-sm">
              Fostering team loyalty, healthy inter-house sports competitions, academic quizzes, and
              leadership governance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {houses.map((house, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${house.bg} p-6 rounded-xl border shadow-sm space-y-4 flex flex-col justify-between`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Shield className="w-6 h-6 text-navy-deep" />
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${house.pill}`}>
                      {house.color}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-navy-deep">{house.name}</h3>
                  <div className="text-xs italic font-medium">"{house.motto}"</div>
                </div>

                <div className="pt-3 border-t border-navy/10 text-xs space-y-1">
                  <div className="text-muted-foreground">Historical Inspiration:</div>
                  <div className="font-semibold text-navy-deep">{house.patron}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs & Societies */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-navy px-3 py-1 rounded">
            Skill Enrichment
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-navy-deep">
            Clubs & Societies
          </h2>
          <p className="text-muted-foreground text-sm">
            Activities hold every Thursday afternoon, encouraging experiential passion projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club, i) => (
            <div
              key={i}
              className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy bg-navy/10 px-2.5 py-1 rounded">
                  {club.category}
                </span>
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
              <h3 className="font-display font-bold text-lg text-navy-deep">{club.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{club.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Annual Sports Festival Teaser */}
      <section className="py-16 bg-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <Trophy className="w-12 h-12 text-gold mx-auto" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            Annual Inter-House Sports & Tahfiz Festival
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Our premier annual spectacle bringing together parents, alumni, and students for 100m
            sprints, relay races, high jumps, tug of war, and the grand Tahfiz recitation finale!
          </p>
          <div className="pt-2">
            <Button
              onClick={() => onNavigate("news-events")}
              className="bg-gold text-navy-deep font-bold hover:brightness-105"
            >
              View Upcoming Term Events
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
