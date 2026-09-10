import { useState } from "react";
import { Calendar, Clock, MapPin, Tag, ChevronRight, Share2, Sparkles } from "lucide-react";
import { news, upcomingEvents } from "@/data/school";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { PublicPage } from "./Header";

interface NewsEventsViewProps {
  onNavigate: (page: PublicPage) => void;
}

export function NewsEventsView({ onNavigate }: NewsEventsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Achievement", "Announcement", "Campus", "Parents", "Student Life"];

  const filteredNews =
    selectedCategory === "All" ? news : news.filter((n) => n.category === selectedCategory);

  const featured = news[0]!;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Banner */}
      <div className="bg-navy-deep text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-white/10 px-3 py-1 rounded">
            Communication & Happenings
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white">
            News, Announcements & Events
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Stay up to date with student milestones, official term notices, academic calendar dates,
            and campus life developments.
          </p>
        </div>
      </div>

      {/* Featured Story */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-navy to-navy-deep text-white rounded-2xl p-6 sm:p-10 border border-gold/30 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-gold text-navy-deep text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Featured Story
              </span>
              <span className="text-xs text-white/70">{featured.date}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
              {featured.title}
            </h2>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-2xl">
              {featured.excerpt}
            </p>
            <div className="pt-2 flex items-center gap-4">
              <Button
                onClick={() =>
                  toast.info(
                    `Viewing story: "${featured.title}" — Six TIA students qualified for the national finals in Kano.`,
                  )
                }
                className="bg-gold text-navy-deep font-bold hover:brightness-105"
              >
                Read Complete Report
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <button
                onClick={() => {
                  toast.success("Story link copied to clipboard!");
                }}
                className="text-xs text-white/80 hover:text-gold flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-xl p-6 space-y-3">
            <div className="text-xs uppercase font-bold tracking-wider text-gold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Competitor Recognition</span>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              "We commend Ustaz Abdulrahman Yusuf and our Tahfiz department for coaching these young
              huffaz to national prominence."
            </p>
            <div className="text-xs text-gold font-semibold pt-1">— Dr. Aisha Bello, Principal</div>
          </div>
        </div>
      </section>

      {/* Main Content Grid: Articles & Events Calendar */}
      <section className="py-8 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: News List & Categories */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <h3 className="font-display font-bold text-2xl text-navy-deep">
                Articles & Bulletins
              </h3>

              {/* Category pills */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? "bg-navy text-gold shadow-sm"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredNews.map((item) => (
                <div
                  key={item.id}
                  className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="bg-navy/10 text-navy font-semibold px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span>{item.date}</span>
                    </div>
                    <h4 className="font-display font-bold text-lg text-navy-deep leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.excerpt}</p>
                  </div>

                  <div className="pt-2 border-t border-border flex items-center justify-between">
                    <button
                      onClick={() => toast.info(`Viewing article: ${item.title}`)}
                      className="text-xs font-semibold text-navy hover:text-gold inline-flex items-center"
                    >
                      Read story <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                    <button
                      onClick={() => toast.success("Article link copied!")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Upcoming Term Calendar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6 sticky top-24">
              <div>
                <h3 className="font-display font-bold text-xl text-navy-deep">
                  Upcoming Term Events
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Official school calendar for First Term 2025/2026.
                </p>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-4 rounded-lg bg-muted/40 border border-border space-y-2 hover:bg-muted/70 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gold bg-navy px-2.5 py-0.5 rounded">
                        {evt.date}
                      </span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gold" />
                        {evt.time}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-navy-deep">{evt.title}</h4>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald" />
                      {evt.venue}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-border">
                <Button
                  onClick={() =>
                    toast.success("Term calendar downloaded as PDF: TIA-Calendar-2025-2026.pdf")
                  }
                  variant="outline"
                  className="w-full text-xs font-semibold"
                >
                  <Calendar className="w-3.5 h-3.5 mr-2 text-gold" />
                  Download Complete Term Calendar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
