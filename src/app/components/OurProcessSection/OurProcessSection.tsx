"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FileText,
  MapPin,
  Calculator,
  HardHat,
  KeyRound,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin"; // ← ADD THIS

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin); // ← REGISTER BOTH

const COLORS = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

const steps = [
  { icon: FileText,    title: "Request Quote", description: "Share your project requirements for initial assessment." },
  { icon: MapPin,      title: "Site Survey",   description: "Analyze site conditions and prepare detailed reports." },
  { icon: Calculator,  title: "Estimation",    description: "Create cost estimation and project timeline." },
  { icon: HardHat,     title: "Execution",     description: "Execute project with quality standards." },
  { icon: KeyRound,    title: "Handover",      description: "Deliver completed project with documentation." },
];

export default function OurProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGGElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── HEADER ── use fromTo so opacity:1 is guaranteed as the end state
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // ── TRACK PATH ──
      const trackPath = sectionRef.current?.querySelector(".base-track");
      if (trackPath) {
        gsap.fromTo(
          trackPath,
          { strokeDashoffset: 2000 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              end: "bottom 65%",
              scrub: 1,
            },
          }
        );
      }

      // ── PROGRESS PATH ──
      gsap.fromTo(
        progressPathRef.current,
        { strokeDashoffset: 2000 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 65%",
            scrub: 1,
          },
        }
      );

      // ── MARKER on path ──
      const path = progressPathRef.current;
      if (path && markerRef.current) {
        gsap.set(markerRef.current, {
          opacity: 1,
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
        });

        gsap.to(markerRef.current, {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            end: 1,
          },
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 65%",
            scrub: 0.5,
          },
        });
      }

      // ── NODES ── fromTo guarantees final state
      gsap.fromTo(
        nodeRefs.current.filter(Boolean),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(2.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // ── CARDS ── fromTo guarantees final state
      gsap.fromTo(
        cardRefs.current.filter(Boolean),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // ── CRITICAL: recalculate all trigger positions after setup ──
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 md:py-36 px-4 md:px-8"
      style={{ backgroundColor: COLORS.navy }}
    >
      {/* background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${COLORS.blue} 0%, transparent 70%)`,
          opacity: 0.08,
        }}
      />

      {/* noise */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ═══ HEADER ═══ */}
        <div ref={headerRef} className="text-center mb-24 md:mb-28">
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-7"
            style={{
              backgroundColor: "rgba(229,85,3,0.08)",
              border: "1px solid rgba(229,85,3,0.2)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: COLORS.orange }}
            />
            <span
              className="text-[11px] font-bold tracking-[0.25em] uppercase"
              style={{ color: COLORS.orange }}
            >
              How It Works
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.15] mb-5"
            style={{ color: "#ffffff" }}
          >
            Our Simple{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})`,
              }}
            >
              Process
            </span>
          </h2>

          <p
            className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            From initial consultation to final handover, we follow a streamlined
            five-step approach for every project.
          </p>
        </div>

        {/* ═══ TIMELINE ═══ */}
        <div className="relative">
          {/* SVG lines */}
          <div className="hidden md:block absolute top-[36px] left-0 w-full z-0 px-[10%]">
            <svg
              className="w-full h-[72px] overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 1000 72"
            >
              <defs>
                <linearGradient id="pgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={COLORS.navy} />
                  <stop offset="100%" stopColor={COLORS.orange} />
                </linearGradient>
                <filter
                  id="dotGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                className="base-track"
                d="M0,36 H1000"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="2"
                style={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
              />

              <path
                ref={progressPathRef}
                d="M0,36 H1000"
                fill="none"
                stroke="url(#pgGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
              />

              <g ref={markerRef} style={{ opacity: 0 }}>
                <circle r="5" fill={COLORS.orange} filter="url(#dotGlow)" />
                <circle
                  r="10"
                  fill="none"
                  stroke={COLORS.orange}
                  strokeWidth="1"
                  opacity="0.4"
                >
                  <animate
                    attributeName="r"
                    from="5"
                    to="22"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.6"
                    to="0"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </svg>
          </div>

          {/* ═══ STEPS ═══ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-3 xl:gap-5 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isHovered = hoveredStep === index;

              return (
                <div
                  key={index}
                  className="relative flex flex-col items-center text-center pt-16 md:pt-20 min-w-0"
                >
                  {/* node */}
                  <div
                    ref={(el) => {
                      nodeRefs.current[index] = el;
                    }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
                    onMouseEnter={() => setHoveredStep(index)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    <div
                      className="w-[68px] h-[68px] lg:w-[72px] lg:h-[72px] rounded-full flex items-center justify-center transition-all duration-500"
                      style={{
                        backgroundColor: isHovered ? COLORS.orange : "#ffffff",
                        boxShadow: isHovered
                          ? `0 0 30px rgba(229,85,3,0.4)`
                          : "0 4px 20px rgba(0,0,0,0.15)",
                        transform: isHovered ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      <Icon
                        size={26}
                        strokeWidth={1.8}
                        style={{
                          color: isHovered ? "#ffffff" : COLORS.orange,
                          transition: "color 0.3s",
                        }}
                      />
                    </div>

                    <span
                      className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold"
                      style={{
                        backgroundColor: isHovered
                          ? COLORS.orangeLight
                          : COLORS.orange,
                        color: "#ffffff",
                        boxShadow: "0 2px 8px rgba(229,85,3,0.3)",
                      }}
                    >
                      {index + 1}
                    </span>
                  </div>

                  {/* card */}
                  <div
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    onMouseEnter={() => setHoveredStep(index)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className="w-full rounded-2xl px-5 py-7 lg:px-4 xl:px-5 lg:py-8 transition-all duration-300 min-w-0"
                    style={{
                      backgroundColor: isHovered
                        ? "rgba(34,75,136,0.15)"
                        : "rgba(34,75,136,0.08)",
                      border: isHovered
                        ? `1px solid rgba(229,85,3,0.25)`
                        : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span
                      className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase mb-3"
                      style={{ color: COLORS.orange }}
                    >
                      Step 0{index + 1}
                    </span>

                    <h3
                      className="text-[17px] lg:text-lg font-bold mb-3 leading-snug transition-colors duration-300"
                      style={{
                        color: isHovered ? COLORS.orangeLight : "#ffffff",
                      }}
                    >
                      {step.title}
                    </h3>

                    <p
                      className="text-[13px] lg:text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      {step.description}
                    </p>

                    {index !== steps.length - 1 && (
                      <div
                        className="mt-5 lg:hidden flex items-center justify-center"
                        style={{ color: "rgba(255,255,255,0.2)" }}
                      >
                        <ArrowRight size={18} className="rotate-90" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${COLORS.navy}, transparent)`,
        }}
      />
    </section>
  );
}