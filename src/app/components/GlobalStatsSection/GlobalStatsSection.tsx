"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Stat = {
  value: number;
  label: string;
  suffix?: string;
};

const stats: Stat[] = [
  { value: 16, label: "Overseas Industrial Bases" },
  { value: 7, label: "Industrial Clusters (China)" },
  { value: 47, label: "Global Lighthouse Factories" },
  { value: 912, label: "Overseas Parts Warehouses" },
  { value: 5, label: "Global R&D Centers" },
  { value: 900, label: "Overseas Service Stations", suffix: "+" },
  { value: 89, label: "Employee Localization Rate", suffix: "%" },
];

export default function GlobalStatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the section entrance (SANY slide up style)
      gsap.from(".stat-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Loop through each counter element
      numbersRef.current.forEach((ref) => {
        if (!ref) return;

        // Get the target number from the data attribute
        const targetValue = parseFloat(ref.getAttribute("data-target") || "0");

        // GSAP Animation Logic
        gsap.to(ref, {
          innerText: targetValue,
          duration: 2.5,
          snap: { innerText: 1 }, // Snap to whole numbers
          repeat: -1, // Loop forever
          yoyo: true, // Reset and play again
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", // Start when visible
            toggleActions: "play pause resume pause",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-slate-50 text-[#002253] py-20 overflow-hidden font-sans"
    >
      {/* Background World Map */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full object-cover stroke-[#002253] fill-transparent"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Abstract World Map Paths */}
          <path
            d="M150,100 Q180,80 220,120 T250,180 Q280,220 240,260 T160,240 Q120,200 150,100 Z"
            fill="currentColor"
          />
          <path
            d="M550,100 Q600,80 650,120 T700,200 Q750,250 700,300 T600,320 Q550,300 550,100 Z"
            fill="currentColor"
          />
          <path
            d="M580,350 Q620,320 660,360 T700,420 Q650,480 600,440 T580,350 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20">
        {/* SANY-Style Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#E55503] mb-3 block">
            Global Presence
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider text-[#002253]">
            Quality Changes the World
          </h2>
          <div className="h-1.5 w-24 bg-[#E55503] mx-auto mt-6 rounded-full" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card group relative bg-white border border-slate-200/50 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full"
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#E55503] rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#E55503] rounded-br-2xl" />

              {/* Animated Number */}
              <div className="mb-2 relative">
                <span
                  ref={(el) => (numbersRef.current[index] = el)}
                  data-target={stat.value}
                  data-suffix={stat.suffix}
                  className="text-5xl md:text-6xl font-black text-[#E55503] font-mono tracking-tighter block"
                >
                  0
                </span>
                {stat.suffix && (
                  <span className="text-4xl font-black text-[#E55503] ml-1">
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#002253] leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
