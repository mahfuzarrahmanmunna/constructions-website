import React from "react";

const PALETTE = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

const services = [
  {
    title: "Road construction",
    description: "Building durable highways, streets, and transport networks.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19L8 5" />
        <path d="M16 5L20 19" />
        <path d="M2 12h20" />
        <path d="M6 12l2-4" />
        <path d="M16 8l2 4" />
      </svg>
    ),
  },
  {
    title: "Bridge construction",
    description: "Delivering safe, innovative, and long-lasting structures.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h16" />
        <path d="M4 20V8l4-4h8l4 4v12" />
        <path d="M8 20v-6h8v6" />
        <path d="M12 4v4" />
      </svg>
    ),
  },
  {
    title: "Drain & Culvert construction",
    description: "Ensuring efficient water flow and drainage solutions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v6" />
        <path d="M8 6c0 2.2 1.8 4 4 4s4-1.8 4-4" />
        <path d="M6 14c0 3.3 2.7 6 6 6s6-2.7 6-6" />
        <path d="M4 20h16" />
      </svg>
    ),
  },
  {
    title: "Residential buildings",
    description: "Creating modern homes designed for comfort and sustainability.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: "Commercial buildings",
    description: "Developing smart, functional spaces where businesses thrive.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
      </svg>
    ),
  },
  {
    title: "Factory buildings and Special Buildings",
    description: "Constructing industrial facilities tailored to operational needs.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20" />
        <path d="M5 20V8l5-6v18" />
        <path d="M13 20V4l6 6v10" />
        <path d="M9 12h.01" />
        <path d="M9 16h.01" />
      </svg>
    ),
  },
  {
    title: "Land development",
    description: "Transforming raw land into valuable, functional property.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Piling works",
    description: "Specialized piling, soil compaction, and embankment works.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M12 3v18" />
        <path d="M3 12h18" />
      </svg>
    ),
  },
  {
    title: "Public infrastructure",
    description: "Comprehensive projects including railway stations, mosques, tourism facilities, club buildings, airports, land ports, sea ports, and river ports with terminals.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
        <path d="M9 21v-4h6v4" />
        <path d="M10 7h4" />
        <path d="M10 11h4" />
      </svg>
    ),
  },
];

export default function CoreServicesSection() {
  return (
    <section className="w-full bg-[#002253] py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E55503]/20 bg-[#E55503]/5 px-4 py-2 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E55503]"></span>
            <span className="text-xs font-bold text-[#E55503] uppercase tracking-widest">
              What We Do
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 uppercase tracking-wide">
            Our Core Services
          </h2>
          <div className="w-20 h-1 bg-[#E55503] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
            Civil Construction
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(229,85,3,0.2)] hover:border-[#E55503]/30 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-[#FF8B28] mb-5 transition-all duration-500 group-hover:bg-[#E55503] group-hover:text-white group-hover:scale-110">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-3 leading-snug">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Hover Accent Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#E55503] to-[#FF8B28] rounded-b-xl transition-all duration-500 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
