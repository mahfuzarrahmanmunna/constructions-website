"use client";

import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Play, Quote, Star, ArrowRight, X, MapPin } from "lucide-react";

// --- Mock Data ---
const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Project Director",
    company: "Dhaka Metro Rail Ltd.",
    videoId: "LXb3EKWsInQ",
    rating: 5,
    quote:
      "CPL's ability to mobilize heavy machinery within 48 hours was the turning point for our Phase 2 launch.",
  },
  {
    id: 2,
    name: "Rahim Uddin",
    role: "Chief Engineer",
    company: "Bangladesh Bridge Authority",
    videoId: "ysz5S6PUM-U",
    rating: 5,
    quote:
      "The precision of their piling rigs in soft soil conditions was engineering excellence at its finest.",
  },
  {
    id: 3,
    name: "David Chen",
    role: "Site Manager",
    company: "Obayashi JV",
    videoId: "JGwWNGJdvx8",
    rating: 5,
    quote:
      "Safety protocols were strictly followed. Zero accidents in 18 months of high-altitude steel work.",
  },
  {
    id: 4,
    name: "Fatima Rahman",
    role: "Procurement Head",
    company: "Sumitomo Corp",
    videoId: "aircAruvnKk",
    rating: 5,
    quote:
      "Material supply logistics were seamless. We never faced a single day of downtime due to shortage.",
  },
];

export default function TestimonialsShortsSection() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // FIX: Cast ReactPlayer to 'any' to bypass the HTMLVideoElement type error in Next.js 16/Turbopack
  const Player = ReactPlayer as any;

  const handlePlay = (id: number) => {
    if (playingId === testimonials[id - 1].videoId) {
      setPlayingId(null);
    } else {
      setPlayingId(testimonials[id - 1].videoId);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative bg-[#F8FAFC] py-24 overflow-hidden">
      {/* Background Pattern - Subtle Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="inline-block px-3 py-1 bg-[#E55503]/10 text-[#E55503] font-bold tracking-widest uppercase text-xs rounded-full mb-4 border border-[#E55503]/20">
              Client Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#002253] mb-4 tracking-tight">
              Voices from the <br className="hidden md:block" />
              <span className="text-[#E55503]">Field</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl">
              Hear directly from our partners about the impact of our
              engineering solutions.
            </p>
          </div>

          {/* Navigation Buttons (Desktop) */}
          <div className="flex gap-4 bg-white p-2 rounded-2xl shadow-lg border border-slate-100">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-[#002253] hover:bg-[#002253] hover:text-white transition-all flex items-center justify-center shadow-sm"
            >
              <ArrowRight size={20} className="rotate-180" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-xl bg-[#E55503] text-white hover:bg-[#002253] transition-all flex items-center justify-center shadow-md shadow-orange-500/30"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* --- Horizontal Scroll Container --- */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-16 scrollbar-hide scroll-smooth px-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="snap-center shrink-0 w-[300px] md:w-[340px] relative rounded-[2rem] bg-white border border-slate-200 shadow-xl overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* --- Video Container (Top 2/3) --- */}
              <div className="relative h-[480px] bg-slate-900 w-full">
                {/* Play Button Overlay */}
                {!playingId && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/10 backdrop-blur-[2px] group-hover:bg-slate-900/20 transition-all">
                    <button
                      onClick={() => handlePlay(item.id)}
                      className="w-20 h-20 rounded-full bg-white text-[#002253] flex items-center justify-center shadow-xl hover:bg-[#E55503] hover:text-white hover:scale-110 transition-all duration-300"
                    >
                      <Play size={32} className="fill-current ml-1" />
                    </button>
                  </div>
                )}

                {/* React Player */}
                <Player
                  url={`https://www.youtube.com/watch?v=${item.videoId}`}
                  width="100%"
                  height="100%"
                  playing={playingId === item.videoId}
                  controls={true}
                  muted={false}
                  loop={true}
                  config={{
                    youtube: {
                      playerVars: {
                        showinfo: 0,
                        modestbranding: 1,
                        rel: 0,
                        playsinline: 1,
                      },
                      embedOptions: {
                        host: "https://www.youtube-nocookie.com",
                      },
                    },
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    objectFit: "cover",
                  }}
                  className="react-player"
                />

                {/* Close Button (Visible when playing) */}
                {playingId === item.videoId && (
                  <button
                    onClick={() => setPlayingId(null)}
                    className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/90 text-[#002253] flex items-center justify-center hover:bg-red-500 hover:text-white shadow-lg transition-all"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* --- Content Info (Bottom 1/3) --- */}
              <div className="relative p-6 bg-white z-30">
                {/* Top Floating Stats */}
                <div className="absolute -top-6 left-6 right-6 flex justify-between items-start">
                  <div className="bg-white px-4 py-2 rounded-full shadow-md border border-slate-100 flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className="fill-[#E55503] text-[#E55503]"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-700 ml-1">
                      {item.rating}.0
                    </span>
                  </div>
                  <Quote size={24} className="text-slate-200 rotate-180" />
                </div>

                {/* Text Content */}
                <div className="mt-4">
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                    `{item.quote}`
                  </p>

                  {/* Author Profile */}
                  <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                    <div className="w-12 h-12 rounded-full bg-[#002253] text-white flex items-center justify-center text-sm font-bold tracking-wider shadow-md">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[#002253] text-sm font-bold leading-tight">
                        {item.name}
                      </p>
                      <p className="text-[#E55503] text-xs font-semibold uppercase tracking-wide">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Scroll Hint */}
        <div className="md:hidden flex justify-center mt-2 gap-1">
          <div className="w-2 h-2 rounded-full bg-slate-300" />
          <div className="w-2 h-2 rounded-full bg-[#E55503]" />
          <div className="w-2 h-2 rounded-full bg-slate-300" />
        </div>
      </div>
    </section>
  );
}
