"use client";

import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { ChevronLeft, ChevronRight, Star, Play, X } from "lucide-react";

// --- Exact Mock Data from Image ---
const testimonials = [
  {
    id: 1,
    name: "Ahmed Sakib",
    role: "Home Owner, Dhaka",
    videoId: "https://youtu.be/lCxdVlDZPmo?si=Z3eM_FEOOIN3d4Hg",
    rating: 5,
    quote: "Excellent team, They build my dream home with great quality and on time. Highly recommended.",
  },
  {
    id: 2,
    name: "Ahmed Sakib",
    role: "Home Owner, Dhaka",
    videoId: "ysz5S6PUM-U",
    rating: 5,
    quote: "Excellent team, They build my dream home with great quality and on time. Highly recommended.",
  },
  {
    id: 3,
    name: "Ahmed Sakib",
    role: "Home Owner, Dhaka",
    videoId: "JGwWNGJdvx8",
    rating: 5,
    quote: "Excellent team, They build my dream home with great quality and on time. Highly recommended.",
  },
  {
    id: 4,
    name: "Ahmed Sakib",
    role: "Home Owner, Dhaka",
    videoId: "aircAruvnKk",
    rating: 5,
    quote: "Excellent team, They build my dream home with great quality and on time. Highly recommended.",
  },
];

export default function TestimonialsShortsSection() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Cast ReactPlayer to 'any' to bypass Next.js type issues
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
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full bg-white py-16 px-4 md:px-12 overflow-hidden select-none">
      {/* --- Main Header Container --- */}
      <div className="text-center mb-12">
        <span className="text-lg font-bold uppercase tracking-widest text-[#F97316]">
          Testimonials
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-black mt-2">
          What Our Client Say
        </h2>
      </div>

      {/* --- Slider Viewport Wrapper --- */}
      <div className="relative max-w-7xl mx-auto flex items-center">
        
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 md:-left-6 z-40 w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-orange-500 shadow-sm transition-all"
        >
          <ChevronLeft size={20} />
        </button>

        {/* --- Horizontal Scroll Container --- */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth w-full px-4 md:px-8 py-4 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="snap-start shrink-0 w-[280px] md:w-[300px] bg-white border border-slate-200 rounded-2xl shadow-sm p-4 flex flex-col justify-between"
            >
              {/* --- Video Thumbnail Box --- */}
              <div className="relative h-[280px] bg-[#D9D9D9] w-full rounded-lg overflow-hidden flex items-center justify-center mb-4">
                {!playingId || playingId !== item.videoId ? (
                  <button
                    onClick={() => handlePlay(item.id)}
                    className="w-14 h-14 rounded-full bg-white/80 text-slate-500 flex items-center justify-center shadow-md hover:bg-white hover:scale-105 transition-all z-20"
                  >
                    <Play size={24} className="fill-current ml-1 text-slate-400" />
                  </button>
                ) : null}

                {/* React Player Element */}
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
                        modestbranding: 1,
                        rel: 0,
                        playsinline: 1,
                      },
                    },
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    objectFit: "cover",
                  }}
                />

                {/* Floating Close Overlay Trigger */}
                {playingId === item.videoId && (
                  <button
                    onClick={() => setPlayingId(null)}
                    className="absolute top-2 right-2 z-30 w-8 h-8 rounded-full bg-white/90 text-slate-700 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* --- Meta Profile Info Block --- */}
              <div className="flex flex-col text-left">
                <h4 className="text-base font-bold text-slate-900 leading-tight">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-400 font-medium mt-0.5 mb-2">
                  {item.role}
                </p>

                {/* Exact Star Rating Group */}
                <div className="flex gap-1 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-[#F97316] text-[#F97316]"
                    />
                  ))}
                </div>

                {/* Testimonial Message Body */}
                <p className="text-xs text-slate-700 font-normal leading-relaxed line-clamp-3">
                  {item.quote}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 md:-right-6 z-40 w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-orange-500 shadow-sm transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}