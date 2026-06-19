"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FileText,
  MapPin,
  Calculator,
  HardHat,
  KeyRound,
  ChevronRight,
  MoveDown,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register Plugins
gsap.registerPlugin(ScrollTrigger);

// --- Data ---
const steps = [
  {
    icon: FileText,
    title: "Request Quote",
    description:
      "Submit your project requirements for initial feasibility assessment.",
  },
  {
    icon: MapPin,
    title: "Site Survey",
    description:
      "Technical team conducts comprehensive site analysis and topography survey.",
  },
  {
    icon: Calculator,
    title: "Estimation",
    description:
      "Detailed BOQ and transparent cost breakdown presented for approval.",
  },
  {
    icon: HardHat,
    title: "Execution",
    description:
      "Mobilization of resources with strict quality control and safety protocols.",
  },
  {
    icon: KeyRound,
    title: "Handover",
    description:
      "Final inspection, documentation, and seamless project transition.",
  },
];

export default function OurProcessSection() {
  // Refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineSvgRef = useRef<SVGSVGElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGGElement>(null); // The traveling dot
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 3D Tilt State
  const [tiltStyles, setTiltStyles] = useState<{ [key: number]: any }>({});

  // --- GSAP Animations ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Reveal (Split Text style simulation)
      gsap.from(headerRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });

      // 2. SVG Path Drawing Animation
      // We animate strokeDashoffset to "draw" the line
      gsap.fromTo(
        progressPathRef.current,
        { strokeDashoffset: 1000 }, // Adjust based on path length approx
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1,
          },
        },
      );

      // 3. The Traveling Marker (The Dot)
      // We calculate the total length and move the dot along the path
      const path = progressPathRef.current;
      if (path) {
        const length = path.getTotalLength();

        // Set path for the marker to follow
        gsap.set(markerRef.current, {
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
            start: "top 60%",
            end: "bottom 60%",
            scrub: 0.5, // Different scrub speed for the marker
          },
        });
      }

      // 4. Staggered Card Entry
      gsap.from(cardRefs.current, {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // --- 3D Tilt Logic (Vanilla JS) ---
  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5; // Max rotation deg
    const rotateY = ((x - centerX) / centerX) * 5;

    setTiltStyles((prev) => ({
      ...prev,
      [index]: {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      },
    }));
  };

  const handleMouseLeave = (index: number) => {
    setTiltStyles((prev) => ({
      ...prev,
      [index]: {
        transform: "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)",
      },
    }));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0f172a] text-white py-32 px-4 md:px-8 overflow-hidden"
    >
      {/* --- Noise Texture Overlay --- */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* --- Background Glow --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#002253] rounded-full blur-[120px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- Header --- */}
        <div ref={headerRef} className="text-center mb-32">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <div className="w-2 h-2 rounded-full bg-[#E55503] animate-ping" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-slate-300">
              Operational Workflow
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            <span className="text-white">Precision</span> at{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E55503] to-[#FF8B28]">
              Every Step
            </span>
          </h2>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Our engineering methodology is built on five decades of structural
            integrity and project excellence.
          </p>
        </div>

        {/* --- Timeline Layout --- */}
        <div className="relative py-12">
          {/* SVG Timeline Layer (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full -translate-y-1/2 z-0">
            <svg
              ref={timelineSvgRef}
              className="w-full h-20 overflow-visible"
              preserveAspectRatio="none"
            >
              {/* The Base Gray Track */}
              <path
                d="M0,40 H1920" // Simple horizontal line
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />

              {/* The Progress Fill (Orange Gradient) */}
              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#002253" />
                  <stop offset="100%" stopColor="#E55503" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                ref={progressPathRef}
                d="M0,40 H1920"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ strokeDasharray: 2000, strokeDashoffset: 2000 }} // Start hidden
              />

              {/* The Traveling Marker (Dot + Pulse) */}
              <g ref={markerRef} className="opacity-0">
                <circle r="6" fill="#E55503" filter="url(#glow)" />
                <circle
                  r="12"
                  fill="none"
                  stroke="#E55503"
                  strokeWidth="1"
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    from="6"
                    to="20"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.8"
                    to="0"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </svg>
          </div>

          {/* --- Steps Grid --- */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  // FIX: Changed from concise arrow function to block body to satisfy TypeScript
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  className="group relative pt-10"
                  style={
                    tiltStyles[index] || {
                      transition: "transform 0.1s ease-out",
                    }
                  } // Apply tilt styles
                >
                  {/* --- The Glass Card --- */}
                  <div className="relative h-full bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center transition-colors duration-300 group-hover:bg-white/10 group-hover:border-[#E55503]/30 overflow-hidden">
                    {/* Hover Gradient Blob */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#E55503]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Number Watermark */}
                    <span className="absolute top-2 right-4 text-[5rem] font-bold text-white/5 leading-none select-none">
                      0{index + 1}
                    </span>

                    {/* Icon Container */}
                    <div className="relative w-16 h-16 mb-6 bg-white rounded-xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 z-10">
                      <Icon
                        size={28}
                        className="text-[#002253] group-hover:text-[#E55503] transition-colors"
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed relative z-10">
                      {step.description}
                    </p>

                    {/* Mobile Arrow */}
                    {index !== steps.length - 1 && (
                      <div className="mt-6 md:hidden flex items-center justify-center text-slate-600">
                        <MoveDown size={20} />
                      </div>
                    )}
                  </div>

                  {/* Desktop Connector Node (Visual Anchor) */}
                  <div className="hidden md:block absolute -top-10 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0f172a] border-2 border-[#E55503] rounded-full z-20" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
