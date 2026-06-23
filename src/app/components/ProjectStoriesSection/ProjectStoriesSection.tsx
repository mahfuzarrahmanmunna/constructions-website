"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowRight, MapPin, Banknote, Calendar } from "lucide-react";
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

const categories = [
  "All Projects",
  "Residential",
  "Commercial",
  "Infrastructure",
  "Marine",
  "Industrial",
];

export default function RecentProjectsSection() {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const featuredProjects =
    caseStudies.filter((project) => project.isFeatured);

  const displayProjects =
    featuredProjects.length > 0
      ? featuredProjects
      : caseStudies.slice(0, 3);

    // Filter logic
  const filteredProjects =
    activeFilter === "All Projects"
      ? caseStudies
      : caseStudies.filter((p) => p.category === activeFilter);


  return (
    <section className="relative overflow-hidden bg-white pb-16 sm:pb-24">
      {/* Subtle corner accent */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.03]"
        style={{
          background: `radial-gradient(circle, ${COLORS.orange}, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        {/* ═══ HEADER ROW ═══ */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
          <div>
            <span
              className="text-[11px] font-bold tracking-[0.3em] uppercase mb-3 block"
              style={{ color: COLORS.orange }}
            >
              Portfolio
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight"
              style={{ color: COLORS.navy }}
            >
              Explore More Projects
            </h2>
          </div>

          {/* Navigation Arrows + View All */}
          <div className="flex items-center gap-4">
            <a
              href="/ourWorks"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors duration-300 mr-2"
              style={{ color: COLORS.navy }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = COLORS.orange)
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.navy)}
            >
              View All
              <ArrowRight size={16} />
            </a>

            <div className="flex items-center gap-2">
              <div
                ref={prevRef}
                className="w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300"
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
                  width="18"
                  height="18"
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
                className="w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300"
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
                  width="18"
                  height="18"
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

        {/* ═══ FILTER TABS ═══ */}
        <div className="relative mb-8 md:mb-10">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-3 sm:pb-0 scrollbar-hide">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="whitespace-nowrap px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 active:scale-[0.97]"
                  style={{
                    backgroundColor: isActive ? COLORS.orange : "#f3f4f6",
                    color: isActive ? "#ffffff" : "#6b7280",
                    boxShadow: isActive
                      ? "0 4px 12px rgba(229,85,3,0.25)"
                      : "none",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          {/* Bottom fade for mobile scroll hint */}
          <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-white to-transparent pointer-events-none sm:hidden z-10" />
        </div>
      </div>
                {/* Featured Projects Slider */}
          <div className="mx-auto mb-20 max-w-6xl">
            <Swiper
              modules={[Autoplay]}
              loop
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className="rounded-3xl overflow-hidden"
            >
              {displayProjects.map((project) => (
                <SwiperSlide key={project.id}>
                  <div className="overflow-hidden rounded-3xl bg-white shadow-xl border border-slate-200">

                    <div className="grid lg:grid-cols-[1.7fr_1fr] min-h-[550px]">

                      {/* Image */}
                    <div className="relative h-[320px] md:h-[450px] lg:h-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />

                      {/* Featured Tag */}
                      <div className="absolute top-6 left-6 z-10">
                        <span className="rounded-md bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#E55503] shadow">
                          Featured Project
                        </span>
                      </div>

                      {/* Dark Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                      {/* Watch Story Button */}
                      {project.youtubeUrl && (
                        <a
                          href={project.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-6 left-6 z-10 flex items-center gap-3 rounded-full bg-black/50 backdrop-blur-sm px-4 py-2 text-white hover:bg-[#E55503] transition"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white">
                            ▶
                          </div>

                          <span className="text-sm font-medium">
                            Watch Project Story
                          </span>
                        </a>
                      )}
                    </div>

                      {/* Content */}
                      <div className="flex h-full flex-col bg-[#002253] p-8 lg:p-10 text-white">

                        <span className="text-sm font-semibold uppercase tracking-wider text-[#E55503]">
                          {project.category}
                        </span>

                        <h2 className="mt-4 text-3xl lg:text-2xl font-bold leading-tight">
                          {project.title}
                        </h2>

                        <div className="mt-1 flex items-center gap-2 text-slate-300">
                          <MapPin size={16} />
                          {project.location}
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-5 border-t border-white/10 pt-6">
                          <div>
                            <p className="text-xs uppercase text-[#E55503]">
                              Client
                            </p>
                            <p className="mt-1 text-sm">
                              {project.client}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs uppercase text-[#E55503]">
                              Duration
                            </p>
                            <p className="mt-1 text-sm">
                              {project.duration}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs uppercase text-[#E55503]">
                              Equipment
                            </p>
                            <p className="mt-1 text-sm line-clamp-3 text-slate-300">
                              {project.equipment}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs uppercase text-[#E55503]">
                              Result
                            </p>
                            <p className="mt-1 text-sm">
                              {project.stats}
                            </p>
                          </div>
                        </div>

                        <div className=" pt-8">
                          <Link
                            href={`/ourWorks/${project.id}`}
                            className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#E55503] px-6 py-3 font-semibold text-white transition hover:bg-[#c94700]"
                          >
                            View Project
                            <ArrowRight size={18} />
                          </Link>
                        </div>

                      </div>
                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
      {/* ═══ SWIPER CAROUSEL ═══ */}
      <div className="w-full max-w-7xl overflow-hidden mx-auto px-5 md:px-8 relative z-10">
        <Swiper
          key={activeFilter} // Re-render swiper to fix layout on filter change
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1.1}
          onBeforeInit={(swiper) => {
            const nav = swiper.params.navigation as {
              prevEl?: HTMLElement | null;
              nextEl?: HTMLElement | null;
            };
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2.2, spaceBetween: 24 },
            1024: { slidesPerView: 3.2, spaceBetween: 24 },
          }}
          className="!overflow-visible"
        >
          {filteredProjects.map((project) => (
            <SwiperSlide key={project.id} className="!h-auto">
              <div
                className="group rounded-2xl overflow-hidden bg-white border border-gray-100 transition-all duration-500 cursor-pointer h-full flex flex-col"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(229,85,3,0.3)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px -12px rgba(0,0,0,0.1)";
                  e.currentTarget.style.transform = "translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#f3f4f6";
                  e.currentTarget.style.boxShadow =
                    "0 1px 3px rgba(0,0,0,0.04)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* ── Image Area ── */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 30vw"
                  />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.9)",
                        color: COLORS.orange,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* ── Content Area ── */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  {/* Title */}
                  <h3
                    className="text-[17px] font-bold mb-4 leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-[#E55503]"
                    style={{ color: COLORS.navy }}
                  >
                    {project.title}
                  </h3>

                  {/* Meta Info Row - Matching the image exactly */}
                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin
                        size={14}
                        strokeWidth={2}
                        style={{ color: COLORS.orange }}
                      />
                      <span className="text-xs font-medium">
                        {project.location}
                      </span>
                    </div>

                    {project.stats && (
                      <div className="flex items-center gap-1.5">
                        <Banknote
                          size={14}
                          strokeWidth={2}
                          style={{ color: COLORS.orange }}
                        />
                        <span className="text-xs font-medium">
                          {project.stats}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5">
                      <Calendar
                        size={14}
                        strokeWidth={2}
                        style={{ color: COLORS.orange }}
                      />
                      {/* Fixed: Removed project.year to resolve TS error. 
                          To use dynamic years, add `year?: string;` to your CaseStudy type in casesData.ts */}
                      <span className="text-xs font-medium">2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile View All Button */}
        <div className="flex sm:hidden justify-center mt-10">
          <a
            href="/ourWorks"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300"
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
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Hide scrollbar utility for tabs */}
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
