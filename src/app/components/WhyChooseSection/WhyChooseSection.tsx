"use client";

import React from "react";

const reasons = [
  {
    title: "Experience & Expertise",
    description: "Proven track record across diverse projects.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Quality Assurance",
    description: "Commitment to international standards and safety.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Timely Delivery",
    description: "Efficient project management ensures deadlines are met.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Client-Centric Approach",
    description: "Tailored solutions for government, private, and foreign clients.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function WhyChooseSection() {
  return (
    <section className="w-full bg-[#002253] py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF8B28]/20 bg-[#FF8B28]/10 px-4 py-2 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF8B28]"></span>
            <span className="text-xs font-bold text-[#FF8B28] uppercase tracking-widest">
              Why CPL
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 uppercase tracking-wide">
            Why Choose CPL
          </h2>
          <div className="w-20 h-1 bg-[#E55503] mx-auto rounded-full"></div>
        </div>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative text-center"
            >
              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:bg-white/10 hover:border-[#E55503]/30 hover:shadow-[0_10px_40px_-10px_rgba(229,85,3,0.2)]">
                {/* Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#E55503] flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-[#E55503]/30">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-[#FF8B28] mx-auto mb-6 transition-all duration-500 group-hover:bg-[#E55503] group-hover:text-white group-hover:scale-110">
                  {reason.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3 leading-snug">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <button className="group relative overflow-hidden rounded-full px-10 py-4 text-sm font-bold text-white bg-[#E55503] transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_-10px_rgba(229,85,3,0.5)]">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            Partner With Us
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </section>
  );
}
