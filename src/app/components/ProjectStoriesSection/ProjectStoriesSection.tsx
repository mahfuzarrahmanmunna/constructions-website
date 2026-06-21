"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowRight, MapPin } from "lucide-react";
import { caseStudies } from "@/app/ourWorks/casesData";

import "swiper/css";
import "swiper/css/navigation";

const COLORS = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

export default function RecentProjectsSection() {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* Subtle corner accent */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.03]"
        style={{
          background: `radial-gradient(circle, ${COLORS.orange}, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        {/* ═══ HEADER ROW ═══ */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <div>
            <span
              className="text-[11px] font-bold tracking-[0.3em] uppercase mb-3 block"
              style={{ color: COLORS.orange }}
            >
              Our Projects
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight"
              style={{ color: COLORS.navy }}
            >
              Recent Projects
            </h2>
            {/* Accent line */}
            <div
              className="h-1 w-12 rounded-full mt-4"
              style={{ backgroundColor: COLORS.orange }}
            />
          </div>

          {/* Navigation Arrows + View All */}
          <div className="flex items-center gap-4 mt-8 md:mt-0">
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
      </div>

      {/* ═══ SWIPER CAROUSEL ═══ */}
      <div className="w-full max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
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
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="!overflow-visible"
        >
          {caseStudies.map((project, idx) => (
            <SwiperSlide key={project.id} className="!h-auto">
              <div
                className="group rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-500 cursor-pointer bg-white"
                style={{
                  border: "1px solid #f0f0f0",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = COLORS.orange;
                  e.currentTarget.style.boxShadow =
                    "0 25px 50px -12px rgba(229,85,3,0.15)";
                  e.currentTarget.style.transform = "translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#f0f0f0";
                  e.currentTarget.style.boxShadow =
                    "0 1px 3px rgba(0,0,0,0.04)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* ── Image Area ── */}
                <div className="relative h-[220px] md:h-[240px] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Category tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.92)",
                        color: COLORS.orange,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Slide number */}
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-extrabold backdrop-blur-md"
                      style={{
                        backgroundColor: "rgba(0,34,83,0.85)",
                        color: "#ffffff",
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Bottom gradient on image */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent z-[1]" />

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 z-[2] transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100"
                    style={{ backgroundColor: "rgba(0,34,83,0.4)" }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 scale-75 group-hover:scale-100"
                      style={{
                        backgroundColor: COLORS.orange,
                        boxShadow: "0 8px 24px rgba(229,85,3,0.4)",
                      }}
                    >
                      <ArrowRight size={20} color="#ffffff" />
                    </div>
                  </div>
                </div>

                {/* ── Content Area ── */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Location */}
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <MapPin size={13} style={{ color: COLORS.orange }} />
                    <span
                      className="text-xs font-medium"
                      style={{ color: "#9ca3af" }}
                    >
                      {project.location}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-base font-bold mb-4 leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-[#E55503]"
                    style={{ color: COLORS.navy }}
                  >
                    {project.title}
                  </h3>

                  {/* Stats pill */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg self-start mb-5"
                    style={{
                      backgroundColor: "rgba(229,85,3,0.06)",
                      border: "1px solid rgba(229,85,3,0.12)",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: COLORS.orange }}
                    />
                    <span
                      className="text-[11px] font-bold"
                      style={{ color: COLORS.orange }}
                    >
                      {project.stats}
                    </span>
                  </div>

                  {/* Push link to bottom */}
                  <div className="mt-auto pt-2">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-300 group/link"
                      style={{ color: COLORS.navy }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = COLORS.orange)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = COLORS.navy)
                      }
                    >
                      Learn More
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover/link:translate-x-1.5"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile View All */}
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
    </section>
  );
}
