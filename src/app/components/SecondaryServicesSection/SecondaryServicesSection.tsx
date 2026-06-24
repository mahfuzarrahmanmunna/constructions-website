import React from "react";

const secondaryServices = [
  {
    title: "Construction material supply",
    description:
      "Comprehensive supply of all construction-related materials, including aggregates/stone, sand, power tools, machinery, safety kits, lifting equipment, electrical items, spare parts, metal products, shuttering, and scaffolding systems.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "Equipment rental services",
    description:
      "Reliable machinery and tools to support every stage of construction. Our rental fleet covers earthmoving equipment, material handling equipment, roadwork equipment, demolition equipment, concrete/foundation equipment, and other specialized machinery.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
  {
    title: "Consultancy services",
    description:
      "End-to-end support including skilled, unskilled, and professional manpower supply, engineering drawing and design, sourcing solutions, and import services tailored to client needs.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function SecondaryServicesSection() {
  return (
    <section className="w-full bg-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E55503]/20 bg-[#E55503]/5 px-4 py-2 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E55503]"></span>
            <span className="text-xs font-bold text-[#E55503] uppercase tracking-widest">
              Beyond Construction
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#002253] mb-4 uppercase tracking-wide">
            Our Secondary Services
          </h2>
          <div className="w-20 h-1 bg-[#E55503] mx-auto rounded-full"></div>
        </div>

        {/* 3 Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {secondaryServices.map((service, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-10 border border-gray-100 transition-all duration-500 hover:shadow-[0_15px_50px_-10px_rgba(0,34,83,0.12)] hover:border-[#E55503]/20 hover:-translate-y-2"
            >
              {/* Top Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E55503] to-[#FF8B28] rounded-t-2xl opacity-0 transition-all duration-500 group-hover:opacity-100"></div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-[#002253]/5 flex items-center justify-center text-[#002253] mb-6 transition-all duration-500 group-hover:bg-[#002253] group-hover:text-white group-hover:scale-110 group-hover:rotate-3">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-[#002253] mb-4 leading-snug">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Bottom Number */}
              <div className="absolute bottom-6 right-8 text-6xl font-black text-[#002253]/[0.03] select-none">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
