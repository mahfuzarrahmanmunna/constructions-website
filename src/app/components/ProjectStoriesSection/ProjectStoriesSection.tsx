"use client";

import React, { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import {
  ArrowRight,
  MapPin,
  Calendar,
  TrendingUp,
  Award,
  Users,
} from "lucide-react";
import { caseStudies } from "@/app/ourWorks/casesData";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";

const COLORS = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

export default function RecentProjectsSection() {
  const swiperRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All Projects");

  /* ── Dynamically build categories from actual data ── */
  const categories = useMemo(() => {
    const unique = Array.from(new Set(caseStudies.map((p) => p.category)));
    return ["All Projects", ...unique];
  }, []);

  /* ── Featured project ── */
  const featured = caseStudies.find((p) => p.isFeatured) || caseStudies[0];

  /* ── Filtered projects (exclude featured) ── */
  const filteredProjects = useMemo(() => {
    const list =
      activeFilter === "All Projects"
        ? caseStudies
        : caseStudies.filter((p) => p.category === activeFilter);
    return list.filter((p) => p.id !== featured.id);
  }, [activeFilter, featured.id]);

  /* ── Stats ── */
  const stats = [
    { value: "50+", label: "Projects Completed", Icon: TrendingUp },
    { value: "৳300+", label: "Crore Delivered", Icon: Award },
    { value: "98%", label: "Client Satisfaction", Icon: Users },
  ];

  return (
    <section className="relative overflow-hidden bg-[#ffffff] pt-16 sm:pt-24 pb-16 sm:pb-24">
      {/* Decorative accents */}
      <div
        className="absolute -top-60 -left-60 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.04]"
        style={{
          background: `radial-gradient(circle, ${COLORS.navy}, transparent 70%)`,
        }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.03]"
        style={{
          background: `radial-gradient(circle, ${COLORS.orange}, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        {/* ══════════════════════════════════════
            1. HEADER + STATS
            ══════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <span
              className="text-[11px] font-bold tracking-[0.3em] uppercase mb-3 block"
              style={{ color: COLORS.orange }}
            >
              Portfolio
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-[1.1]"
              style={{ color: COLORS.navy }}
            >
              Recent Projects
            </h2>
          </div>

          <div className="flex items-center gap-5 sm:gap-8 flex-wrap">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${COLORS.orange}15` }}
                >
                  <s.Icon size={19} style={{ color: COLORS.orange }} />
                </div>
                <div>
                  <p
                    className="text-lg sm:text-2xl font-extrabold leading-none"
                    style={{ color: COLORS.navy }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-tight">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            2. FEATURED PROJECT CARD
            ══════════════════════════════════════ */}
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-xl border border-slate-200/80 mb-12 md:mb-16">
          <div className="grid lg:grid-cols-[1.65fr_1fr] min-h-[440px] lg:min-h-[500px]">
            {/* Image */}
            <div className="relative h-[260px] sm:h-[360px] lg:h-auto">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              <div className="absolute top-5 left-5 z-10">
                <span
                  className="rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] shadow-lg"
                  style={{ backgroundColor: COLORS.orange, color: "#fff" }}
                >
                  Featured Project
                </span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {featured.youtubeUrl && (
                <a
                  href={featured.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-5 left-5 z-10 flex items-center gap-3 rounded-full bg-black/50 backdrop-blur-sm px-4 py-2 text-white hover:bg-[#E55503] transition-colors duration-300"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/80 text-xs">
                    ▶
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">
                    Watch Project Story
                  </span>
                </a>
              )}
            </div>

            {/* Content */}
            <div
              className="flex flex-col justify-between p-6 sm:p-8 lg:p-10"
              style={{ backgroundColor: COLORS.navy }}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF8B28]">
                  {featured.category}
                </span>

                <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl lg:text-[28px] font-bold leading-tight text-white">
                  {featured.title}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-slate-300 text-sm">
                  <MapPin size={14} />
                  {featured.location}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#FF8B28]">
                      Client
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-snug">
                      {featured.client}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#FF8B28]">
                      Duration
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300">
                      {featured.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#FF8B28]">
                      Equipment
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300 line-clamp-2 leading-snug">
                      {featured.equipment}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#FF8B28]">
                      Result
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300">
                      {featured.stats}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <Link
                  href={`/ourWorks/${featured.id}`}
                  className="inline-flex w-fit items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
                  style={{ backgroundColor: COLORS.orange }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#c94700")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = COLORS.orange)
                  }
                >
                  View Project
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            3. EXPLORE MORE — HEADING + FILTERS + ARROWS
            ══════════════════════════════════════ */}
        <div className="flex max-w-7xl  mx-auto overflow-hidden flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
          <h3
            className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight"
            style={{ color: COLORS.navy }}
          >
            Explore More Projects
          </h3>

          <div className="flex items-center gap-3">
            {/* Filter tabs */}
            <div className="relative hidden md:block">
              <div className="flex items-center gap-2">
                {categories.map((cat) => {
                  const isActive = activeFilter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className="whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-semibold transition-all duration-300 active:scale-[0.97]"
                      style={{
                        backgroundColor: isActive ? COLORS.orange : "#eef0f4",
                        color: isActive ? "#ffffff" : "#6b7280",
                        boxShadow: isActive
                          ? "0 4px 14px rgba(229,85,3,0.3)"
                          : "none",
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* View All + Nav Arrows */}
            <Link
              href="/ourWorks"
              className="hidden max-w-7xl  mx-auto overflow-hidden lg:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 mr-1"
              style={{ color: COLORS.navy }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = COLORS.orange)
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.navy)}
            >
              View All
              <ArrowRight size={14} />
            </Link>

            <div className="flex items-center gap-2">
              <div
                ref={prevRef}
                className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300"
                style={{
                  border: "1.5px solid #e5e7eb",
                  color: COLORS.navy,
                  backgroundColor: "#f9fafb",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.navy;
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = COLORS.navy;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.color = COLORS.navy;
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </div>

              <div
                ref={nextRef}
                className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300"
                style={{
                  border: "1.5px solid #e5e7eb",
                  color: "#ffffff",
                  backgroundColor: COLORS.navy,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.orange;
                  e.currentTarget.style.borderColor = COLORS.orange;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.navy;
                  e.currentTarget.style.borderColor = COLORS.navy;
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile filter tabs */}
        <div className="relative mb-6 md:hidden">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-semibold transition-all duration-300 active:scale-[0.97]"
                  style={{
                    backgroundColor: isActive ? COLORS.orange : "#eef0f4",
                    color: isActive ? "#ffffff" : "#6b7280",
                    boxShadow: isActive
                      ? "0 4px 14px rgba(229,85,3,0.3)"
                      : "none",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <div className="absolute top-0 right-0 w-10 h-full bg-gradient-to-l from-[#f8f9fb] to-transparent pointer-events-none z-10" />
        </div>

        {/* ══════════════════════════════════════
            4. SINGLE-ROW SWIPER CAROUSEL
            ══════════════════════════════════════ */}
        <div ref={swiperRef} className="relative z-10">
          <Swiper
            key={activeFilter}
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.15}
            onBeforeInit={(swiper) => {
              const nav = swiper.params.navigation as {
                prevEl?: HTMLElement | null;
                nextEl?: HTMLElement | null;
              };
              nav.prevEl = prevRef.current;
              nav.nextEl = nextRef.current;
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 14 },
              768: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 4, spaceBetween: 18 },
              1280: { slidesPerView: 5, spaceBetween: 20 },
            }}
            className="!overflow-visible"
          >
            {filteredProjects.map((project) => (
              <SwiperSlide key={project.id} className="!h-auto">
                <Link
                  href={`/ourWorks/${project.id}`}
                  className="group block rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-slate-100 transition-all duration-400 h-full"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(229,85,3,0.35)";
                    e.currentTarget.style.boxShadow =
                      "0 16px 40px -10px rgba(0,0,0,0.12)";
                    e.currentTarget.style.transform = "translateY(-6px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#f1f2f4";
                    e.currentTarget.style.boxShadow =
                      "0 1px 3px rgba(0,0,0,0.04)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 480px) 42vw, (max-width: 768px) 30vw, (max-width: 1024px) 23vw, (max-width: 1280px) 23vw, 18vw"
                    />

                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
                      <span
                        className="px-2 py-1 sm:px-2.5 sm:py-1 rounded-md text-[7px] sm:text-[9px] font-bold uppercase tracking-wider leading-tight backdrop-blur-md"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.92)",
                          color: COLORS.orange,
                        }}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-3.5 md:p-4">
                    <h4
                      className="text-[11px] sm:text-[12px] md:text-[13px] font-bold leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-[#E55503]"
                      style={{ color: COLORS.navy }}
                    >
                      {project.title}
                    </h4>

                    <div className="mt-2 flex items-center gap-1.5 text-slate-400">
                      <MapPin
                        size={10}
                        strokeWidth={2.5}
                        style={{ color: COLORS.orange, flexShrink: 0 }}
                      />
                      <span className="text-[8px] sm:text-[10px] font-medium truncate">
                        {project.location}
                      </span>
                    </div>

                    <div className="mt-1.5 flex items-center gap-1.5 text-slate-400">
                      <Calendar
                        size={10}
                        strokeWidth={2.5}
                        style={{ color: COLORS.orange, flexShrink: 0 }}
                      />
                      <span className="text-[8px] sm:text-[10px] font-medium">
                        {project.duration}
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Mobile View All Button */}
        <div className="flex sm:hidden justify-center mt-8">
          <Link
            href="/ourWorks"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300"
            style={{
              border: `1.5px solid ${COLORS.orange}`,
              color: COLORS.orange,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.orange;
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = COLORS.orange;
            }}
          >
            View All Projects
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Scrollbar hide utility */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
