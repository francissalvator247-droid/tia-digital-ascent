import { useState } from "react";
import { X, ZoomIn, Camera } from "lucide-react";
import type { PublicPage } from "./Header";

import campusImg from "@/assets/campus.jpg";
import heroStudentsImg from "@/assets/hero-students.jpg";
import progEarlyImg from "@/assets/programme-early-years.jpg";
import progPrimaryImg from "@/assets/programme-primary.jpg";
import progSecondaryImg from "@/assets/programme-secondary.jpg";
import progIslamiyyaImg from "@/assets/programme-islamiyya.jpg";
import progSpecialImg from "@/assets/programme-special.jpg";
import studentLifeImg from "@/assets/student-life.jpg";

interface GalleryViewProps {
  onNavigate: (page: PublicPage) => void;
}

export function GalleryView({ onNavigate }: GalleryViewProps) {
  const [activeImage, setActiveImage] = useState<{
    src: string;
    title: string;
    desc: string;
    tag: string;
  } | null>(null);

  const galleryItems = [
    {
      src: campusImg,
      title: "Main Campus Grounds & Administration",
      desc: "Our purpose-built modern learning facility located on Airport Road, Lugbe, Abuja.",
      tag: "Campus",
    },
    {
      src: heroStudentsImg,
      title: "TIA Scholars in Assembly",
      desc: "Junior and Senior students gathered in formal academy uniform for morning assembly.",
      tag: "Academics",
    },
    {
      src: progEarlyImg,
      title: "Early Years Montessori Learning",
      desc: "Sensory exploration, motor skill toys, and foundational phonetics in Nursery 1.",
      tag: "Academics",
    },
    {
      src: progPrimaryImg,
      title: "Primary Interactive Classroom",
      desc: "Collaborative problem-solving and mathematics discovery in Primary 5.",
      tag: "Academics",
    },
    {
      src: progSecondaryImg,
      title: "Secondary Advanced Science Laboratory",
      desc: "Senior secondary students conducting practical experiments in Physics and Chemistry.",
      tag: "Academics",
    },
    {
      src: progIslamiyyaImg,
      title: "Tahfiz Memorization & Tajweed Circle",
      desc: "Dedicated daily Qur'an recitation sessions under certified Azhari instructors.",
      tag: "Tahfiz",
    },
    {
      src: progSpecialImg,
      title: "Inclusive Special Needs Suite",
      desc: "Loving individualized education support and sensory-adapted classrooms.",
      tag: "Academics",
    },
    {
      src: studentLifeImg,
      title: "Inter-House Sports & Co-Curricular",
      desc: "Students participating in track sprint practice, football tournaments, and athletics.",
      tag: "Student Life",
    },
  ];

  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? galleryItems : galleryItems.filter((item) => item.tag === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Banner */}
      <div className="bg-navy-deep text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-block text-xs uppercase tracking-widest text-gold font-bold bg-white/10 px-3 py-1 rounded">
            Visual Tour
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white">
            Campus Life in Pictures
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Take a glimpse into the everyday moments of learning, faith, discovery, and friendship
            across our Lugbe, Abuja campus.
          </p>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {["All", "Campus", "Academics", "Tahfiz", "Student Life"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                filter === cat
                  ? "bg-navy text-gold shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(item)}
              className="group cursor-pointer bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all flex flex-col"
            >
              <div className="h-60 overflow-hidden relative">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-navy-deep/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 bg-white/90 text-navy-deep font-semibold text-xs px-3 py-1.5 rounded-full shadow">
                    <ZoomIn className="w-3.5 h-3.5" />
                    Enlarge Photo
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-navy-deep/80 backdrop-blur-sm text-gold px-2.5 py-0.5 rounded text-[11px] font-semibold">
                  {item.tag}
                </div>
              </div>

              <div className="p-4 space-y-1 flex-1">
                <h3 className="font-display font-bold text-sm text-navy-deep group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="bg-card max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl border border-border animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={activeImage.src}
                alt={activeImage.title}
                className="w-full max-h-[70vh] object-cover"
              />
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-navy-deep/80 text-white flex items-center justify-center hover:bg-navy transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-2">
              <div className="text-xs font-bold text-emerald uppercase tracking-wider">
                {activeImage.tag}
              </div>
              <h3 className="font-display font-bold text-xl text-navy-deep">{activeImage.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {activeImage.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
