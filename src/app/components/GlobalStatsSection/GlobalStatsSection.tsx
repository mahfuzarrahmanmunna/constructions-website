"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Trophy,
  Briefcase,
  Users,
  ShieldCheck,
  LucideProps,
} from "lucide-react";

// Register ScrollTrigger only on the client side to avoid SSR issues
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Type definition for the stats data
type Stat = {
  value?: number; // Optional for non-numeric stats
  label: string;
  suffix?: string;
  isStatic?: boolean; // Flag for "Government Approved" card
  icon: React.ComponentType<LucideProps>; // Lucide icon component
};

const stats: Stat[] = [
  { value: 10, label: "Years Experience", suffix: "+", icon: Trophy },
  { value: 50, label: "Projects Completed", suffix: "+", icon: Briefcase },
  { value: 100, label: "Skilled Workers", suffix: "+", icon: Users },
  { isStatic: true, label: "Government Approved", icon: ShieldCheck },
];

export default function StatCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state for cards (hidden and pushed down)
      gsap.set(".stat-card", {
        opacity: 0,
        y: 60,
      });

      // Animate cards fading in
      gsap.to(".stat-card", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Animate numbers (Skip the last one if it is static)
      numbersRef.current.forEach((ref) => {
        if (!ref) return;

        const targetValue = Number(ref.getAttribute("data-target") || "0");
        if (targetValue === 0) return; // Skip animation for 0/static values

        gsap.fromTo(
          ref,
          {
            innerText: 0,
          },
          {
            innerText: targetValue,
            duration: 2.5,
            snap: { innerText: 1 },
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate bg-slate-50 text-[#002253] py-20 overflow-hidden"
    >
      {/* Background World Map (Subtle) */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.03]">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Abstract Map Shapes */}
          <path
            d="M150,100 Q180,80 220,120 T250,180 Q280,220 240,260 T160,240 Q120,200 150,100 Z"
            fill="#002253"
          />
          <path
            d="M550,100 Q600,80 650,120 T700,200 Q750,250 700,300 T600,320 Q550,300 550,100 Z"
            fill="#002253"
          />
          <path
            d="M580,350 Q620,320 660,360 T700,420 Q650,480 600,440 T580,350 Z"
            fill="#002253"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20">
        {/* --- Header Removed Here --- */}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isLastItem = index === stats.length - 1; // Government Approved

            return (
              <div
                key={index}
                className="
                  stat-card
                  relative
                  z-20
                  bg-white
                  rounded-2xl
                  p-8
                  shadow-md
                  border
                  border-slate-200
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  min-h-[240px]
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                "
              >
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#E55503] rounded-tl-lg" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#E55503] rounded-br-lg" />

                {/* Icon Container */}
                <div className="mb-4 p-3 bg-[#E55503]/10 rounded-full">
                  <Icon className="text-[#E55503]" size={40} />
                </div>

                {/* Number or Static Content */}
                {!isLastItem ? (
                  <div className="flex items-start justify-center mb-2">
                    <span
                      ref={(el) => {
                        numbersRef.current[index] = el;
                      }}
                      data-target={stat.value}
                      className="
                        text-5xl
                        md:text-6xl
                        font-black
                        text-[#002253]
                        leading-none
                      "
                    >
                      0
                    </span>

                    {stat.suffix && (
                      <span className="text-4xl font-black text-[#E55503] ml-1">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                ) : (
                  // Special handling for "Government Approved"
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-green-600 flex items-center gap-2">
                      <ShieldCheck
                        size={28}
                        fill="currentColor"
                        className="text-green-600"
                      />
                      Verified
                    </span>
                  </div>
                )}

                {/* Label */}
                <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#002253] leading-relaxed">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
