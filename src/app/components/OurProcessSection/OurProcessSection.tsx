"use client";

import React, { useEffect, useRef } from "react";
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

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- Color Palette Constants ---
const COLORS = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

export default function OurProcessSection() {
  const steps = [
    {
      icon: FileText,
      title: "Request Quote",
      description: "Tell us about your project",
    },
    {
      icon: MapPin,
      title: "Site Visit & Planning",
      description: "Visit site & create plan",
    },
    {
      icon: Calculator,
      title: "Cost Estimation",
      description: "Transparent cost estimation",
    },
    {
      icon: HardHat,
      title: "Construction",
      description: "Quality on-time construction",
    },
    {
      icon: KeyRound,
      title: "Handover",
      description: "Project completion & handover",
    },
  ];

  // Refs for GSAP animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null); // The fill line
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate Header
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // 2. Scrub Animation for Progress Line (Scroll Linked)
      // This makes the line fill up as you scroll
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none", // Important for smooth scrub
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 1, // 1 second smooth catch-up
          },
        },
      );

      // 3. Staggered Animation for Steps
      gsap.from(stepRefs.current, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-24 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-50 via-white to-white" />

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#002253 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-[#E55503]/10 text-[#E55503] font-bold tracking-[0.2em] uppercase text-xs mb-4 border border-[#E55503]/20">
            Workflow
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#002253] tracking-tight mb-4">
            Our Simple Process
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We streamline construction into a transparent, step-by-step journey.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative py-12">
          {/* --- DESKTOP LINE (Horizontal) --- */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 rounded-full transform -translate-y-1/2 hidden md:block z-0" />
          {/* Progress Fill Line */}
          <div
            ref={progressRef}
            className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-[#002253] to-[#E55503] rounded-full transform -translate-y-1/2 hidden md:block z-0 shadow-[0_0_15px_rgba(229,85,3,0.3)]"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (stepRefs.current[index] = el)}
                  className="group flex flex-col items-center text-center relative"
                >
                  {/* Icon Container */}
                  <div className="relative mb-8 transition-all duration-500 hover:scale-110">
                    {/* Rotating Ring Animation */}
                    <div className="absolute inset-0 w-full h-full border-2 border-dashed border-[#E55503] rounded-full animate-[spin_10s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Main Circle */}
                    <div className="relative w-28 h-28 rounded-full bg-white border-4 border-gray-50 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center z-10 transition-colors duration-300 group-hover:border-white group-hover:shadow-2xl">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
                        <Icon
                          size={36}
                          className="text-[#224B88] group-hover:text-[#E55503] transition-colors duration-300"
                        />
                      </div>
                    </div>

                    {/* Number Badge */}
                    <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-[#002253] text-white flex items-center justify-center font-bold text-sm shadow-lg z-20 ring-4 ring-white group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#002253] leading-tight group-hover:text-[#E55503] transition-colors">
                      {step.title}
                    </h3>
                    <div className="w-8 h-0.5 bg-gray-200 mx-auto group-hover:bg-[#E55503] transition-colors duration-300" />
                    <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-[140px] mx-auto">
                      {step.description}
                    </p>
                  </div>

                  {/* Mobile Connector Arrow */}
                  {index !== steps.length - 1 && (
                    <div className="mt-6 md:hidden flex justify-center text-gray-300">
                      <ArrowRight size={24} strokeWidth={2} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
