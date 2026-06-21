"use client";

import React, { useEffect, useRef, useState } from "react";
import { FileText, MapPin, Calculator, HardHat, KeyRound } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

const steps = [
  {
    icon: FileText,
    title: "Request Quote",
    description: "Share your project requirements for initial assessment.",
  },
  {
    icon: MapPin,
    title: "Site Survey",
    description: "Analyze site conditions and prepare detailed reports.",
  },
  {
    icon: Calculator,
    title: "Estimation",
    description: "Create cost estimation and project timeline.",
  },
  {
    icon: HardHat,
    title: "Execution",
    description: "Execute project with quality standards.",
  },
  {
    icon: KeyRound,
    title: "Handover",
    description: "Deliver completed project with documentation.",
  },
];

export default function OurProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arrowRefs = useRef<(SVGElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── header stagger ── */
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
          },
        },
      );

      /* ── base line draw ── */
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      /* ── orange fill line draw ── */
      gsap.fromTo(
        lineFillRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        },
      );

      /* ── icons pop in ── */
      gsap.fromTo(
        iconRefs.current.filter(Boolean),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: "back.out(2.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        },
      );

      /* ── arrows draw in ── */
      gsap.fromTo(
        arrowRefs.current.filter(Boolean),
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );

      /* ── cards rise up ── */
      gsap.fromTo(
        cardRefs.current.filter(Boolean),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-20 lg:py-24 px-4 md:px-8 overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* ═══ HEADER ═══ */}
        <div ref={headerRef} className="text-center mb-14 md:mb-20">
          <span
            className="inline-block text-[11px] font-bold tracking-[0.3em] uppercase mb-4"
            style={{ color: COLORS.orange }}
          >
            How It Works
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-tight mb-4"
            style={{ color: COLORS.navy }}
          >
            Our Simple Process
          </h2>
          <p
            className="text-sm md:text-base max-w-lg mx-auto leading-relaxed"
            style={{ color: "#6b7280" }}
          >
            From initial consultation to final handover, we follow a streamlined
            five-step approach for every project.
          </p>
        </div>

        {/* ═══ PROCESS STEPS ═══ */}
        <div className="relative">
          {/* ── horizontal connector line (desktop) ── */}
          <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] z-0">
            {/* base gray line */}
            <div
              ref={lineRef}
              className="w-full h-px origin-left"
              style={{ backgroundColor: "#e5e7eb" }}
            />
            {/* orange fill line */}
            <div
              ref={lineFillRef}
              className="absolute top-0 left-0 w-full h-px origin-left"
              style={{
                background: `linear-gradient(to right, ${COLORS.orange}, ${COLORS.orangeLight})`,
              }}
            />
          </div>

          {/* ── steps grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-3 xl:gap-5 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isHovered = hoveredStep === index;

              return (
                <React.Fragment key={index}>
                  <div className="relative flex flex-col items-center text-center">
                    {/* ── icon circle ── */}
                    <div
                      ref={(el) => {
                        iconRefs.current[index] = el;
                      }}
                      className="relative z-10 mb-5 cursor-pointer"
                      onMouseEnter={() => setHoveredStep(index)}
                      onMouseLeave={() => setHoveredStep(null)}
                    >
                      <div
                        className="w-[72px] h-[72px] lg:w-[80px] lg:h-[80px] rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: isHovered
                            ? COLORS.orange
                            : "rgba(229,85,3,0.1)",
                          boxShadow: isHovered
                            ? `0 8px 30px rgba(229,85,3,0.3)`
                            : `0 4px 15px rgba(0,0,0,0.06)`,
                          transform: isHovered ? "scale(1.1)" : "scale(1)",
                          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                        }}
                      >
                        <Icon
                          size={30}
                          strokeWidth={1.8}
                          style={{
                            color: isHovered ? "#ffffff" : COLORS.orange,
                            transition: "color 0.4s",
                          }}
                        />
                      </div>

                      {/* number badge */}
                      <span
                        className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold"
                        style={{
                          backgroundColor: isHovered
                            ? COLORS.orangeLight
                            : COLORS.orange,
                          color: "#ffffff",
                          boxShadow: "0 2px 10px rgba(229,85,3,0.3)",
                          transform: isHovered ? "scale(1.15)" : "scale(1)",
                          transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                        }}
                      >
                        {index + 1}
                      </span>
                    </div>

                    {/* ── card body ── */}
                    <div
                      ref={(el) => {
                        cardRefs.current[index] = el;
                      }}
                      onMouseEnter={() => setHoveredStep(index)}
                      onMouseLeave={() => setHoveredStep(null)}
                      className="w-full rounded-2xl px-5 py-6 lg:px-4 xl:px-5 min-w-0"
                      style={{
                        backgroundColor: isHovered ? "#ffffff" : "#f9fafb",
                        border: isHovered
                          ? `1px solid rgba(229,85,3,0.3)`
                          : "1px solid #e5e7eb",
                        boxShadow: isHovered
                          ? "0 12px 35px -8px rgba(229,85,3,0.15)"
                          : "none",
                        transform: isHovered
                          ? "translateY(-6px)"
                          : "translateY(0)",
                        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    >
                      <span
                        className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase mb-2.5"
                        style={{ color: COLORS.orange }}
                      >
                        Step 0{index + 1}
                      </span>

                      <h3
                        className="text-base lg:text-[15px] font-bold mb-2.5 leading-snug"
                        style={{
                          color: isHovered ? COLORS.orange : COLORS.navy,
                          transition: "color 0.3s",
                        }}
                      >
                        {step.title}
                      </h3>

                      <p
                        className="text-[13px] lg:text-xs leading-relaxed"
                        style={{ color: "#6b7280" }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* ── arrow connector between steps (desktop only) ── */}
                  {index < steps.length - 1 && (
                    <div
                      className="hidden lg:flex absolute items-center justify-center pointer-events-none"
                      style={{
                        top: "40px",
                        left: `calc(${((index + 1) / steps.length) * 100}% - ${100 / steps.length / 2}px - 14px)`,
                        width: "28px",
                        height: "28px",
                        zIndex: 5,
                      }}
                    >
                      <svg
                        ref={(el) => {
                          arrowRefs.current[index] = el;
                        }}
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                      >
                        <circle
                          cx="14"
                          cy="14"
                          r="14"
                          fill={COLORS.orange}
                          opacity="0.1"
                        />
                        <circle
                          cx="14"
                          cy="14"
                          r="13"
                          stroke={COLORS.orange}
                          strokeWidth="1"
                          opacity="0.3"
                        />
                        <path
                          d="M12 10L16 14L12 18"
                          stroke={COLORS.orange}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* mobile step dots */}
          <div className="flex lg:hidden items-center justify-center gap-2 mt-8">
            {steps.map((_, index) => (
              <React.Fragment key={index}>
                <span
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      index === hoveredStep ? COLORS.orange : "#d1d5db",
                    transform:
                      index === hoveredStep ? "scale(1.3)" : "scale(1)",
                  }}
                />
                {index < steps.length - 1 && (
                  <div
                    className="w-6 h-px"
                    style={{ backgroundColor: "#e5e7eb" }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
