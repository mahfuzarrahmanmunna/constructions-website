import Link from "next/link";
import React from "react";

const PALETTE = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

const businessCategories = [
  {
    title: "Civil Constructions",
    description:
      "We deliver end-to-end building and engineering services, safely constructing heavy-duty roads, bridges, factories, and public infrastructure that drive the rapid growth of our nation.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="6" width="22" height="16" rx="2" />
        <path d="M1 10h22" />
        <path d="M9 6V2" />
        <path d="M15 6V2" />
        <path d="M5 6v4" />
        <path d="M19 6v4" />
      </svg>
    ),
  },
  {
    title: "Construction Materials Supply",
    description:
      "We provide a reliable bulk supply of premium building materials, sand, stone aggregates, and safety tools directly to your site to eliminate project delays entirely.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "Construction Equipment Services",
    description:
      "We offer flexible rentals for a high-performance fleet of earthmovers, heavy cranes, and specialized tools, all maintained for maximum uptime and operated by certified professionals.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4" />
        <path d="M12 19v4" />
        <path d="M1 12h4" />
        <path d="M19 12h4" />
        <path d="M4.22 4.22l2.83 2.83" />
        <path d="M16.95 16.95l2.83 2.83" />
        <path d="M4.22 19.78l2.83-2.83" />
        <path d="M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
];

export default function BusinessCategorySection() {
  return (
    <section className="w-full bg-[#002253] py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
            Our Business Category
          </h2>
          <div className="w-20 h-1 bg-[#E55503] mx-auto rounded-full"></div>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {businessCategories.map((item, index) => (
            <Link
              key={index}
              href="/soluations-for-cpl"
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10 transition-all duration-500 hover:bg-white/10 hover:border-[#E55503]/30 hover:shadow-[0_10px_40px_-10px_rgba(229,85,3,0.2)]"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-[#E55503]/10 border border-[#E55503]/20 flex items-center justify-center text-[#FF8B28] mb-6 transition-all duration-500 group-hover:bg-[#E55503] group-hover:text-white group-hover:scale-110">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Learn More Link */}
              <div className="flex items-center gap-2 text-[#FF8B28] text-sm font-bold uppercase tracking-wider opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>

              {/* Accent Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[80px] border-t-[#E55503]/10 border-l-[80px] border-l-transparent transition-all duration-500 group-hover:border-t-[#E55503]/20"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
