"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowRight } from "lucide-react";
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
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: COLORS.navy }}
    >
      {/* ── background texture ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* ═══ HEADER ROW ═══ */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 md:mb-16">
          <div>
            <span
              className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4 block"
              style={{ color: COLORS.orange }}
            >
              Our Projects
            </span>
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{ color: "#ffffff" }}
            >
              Recent Projects
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex items-center gap-3 mt-8 md:mt-0">
            <div
              ref={prevRef}
              className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#ffffff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </div>

            <div
              ref={nextRef}
              className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#ffffff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ SWIPER CAROUSEL ═══ */}
      <div className="w-full relative z-10">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
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
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="!overflow-hidden"
        >
          {caseStudies.map((project) => (
            <SwiperSlide key={project.id} className="!h-auto">
              <div
                className="group rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-500 cursor-pointer"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px -10px rgba(0,0,0,0.3)";
                  e.currentTarget.style.transform = "translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* ── Image Area ── */}
                <div className="relative h-[240px] md:h-[260px] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* category tag over image */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm"
                      style={{
                        backgroundColor: "rgba(0,34,83,0.8)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: COLORS.orange,
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* hover overlay */}
                  <div
                    className="absolute inset-0 z-[1] transition-colors duration-500"
                    style={{ backgroundColor: "rgba(0,0,0,0)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "rgba(0,0,0,0.2)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0)")
                    }
                  />
                </div>

                {/* ── Content Area ── */}
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  {/* location */}
                  <span
                    className="text-xs font-medium mb-2 block"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {project.location}
                  </span>

                  {/* title */}
                  <h3
                    className="text-lg font-bold mb-4 leading-snug line-clamp-2"
                    style={{ color: "#ffffff" }}
                  >
                    {project.title}
                  </h3>

                  {/* stats pill */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg self-start mb-5"
                    style={{
                      backgroundColor: "rgba(229,85,3,0.08)",
                      border: "1px solid rgba(229,85,3,0.15)",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: COLORS.orange }}
                    />
                    <span
                      className="text-xs font-semibold"
                      style={{ color: COLORS.orange }}
                    >
                      {project.stats}
                    </span>
                  </div>

                  {/* push link to bottom */}
                  <div className="mt-auto">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/link"
                      style={{ color: COLORS.orange }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = COLORS.orangeLight)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = COLORS.orange)
                      }
                    >
                      Learn More
                      <ArrowRight
                        size={16}
                        className="group-hover/link:translate-x-1 transition-transform duration-300"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
