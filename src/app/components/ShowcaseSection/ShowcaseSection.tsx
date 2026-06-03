"use client";

import React from "react";

// --- Strict Color Palette (From your request) ---
const PALETTE = {
  navy: "#002253", // Pantone 2768 C
  blue: "#224B88", // Pantone 2154 C
  orange: "#E55503", // Pantone 1655 C
  orangeLight: "#FF8B28", // Pantone 1495 C
};

// --- Data: Matching the 4-item layout described ---
const showcaseItems = [
  {
    id: 1,
    title: "Mini Excavator",
    description: "Mini in Size, Multi in Use",
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?q=80&w=800&auto=format&fit=crop", // Yellow excavator reference
  },
  {
    id: 2,
    title: "Large Excavator",
    description: "Powerful, Speedy & Fuel Efficient",
    image:
      "https://images.unsplash.com/photo-1563199238-d50f86158e3c?q=80&w=800&auto=format&fit=crop", // Large excavator reference
  },
  {
    id: 3,
    title: "Truck Crane",
    description: "High Mobility & Precision Lifting",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop", // Crane reference
  },
  {
    id: 4,
    title: "All Terrain Crane",
    description: "Heavy Duty Operations",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop", // Construction site/Crane reference
  },
];

export default function ShowcaseSection() {
  return (
    <section className="w-full py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className=" mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide"
            style={{ color: PALETTE.navy }}
          >
            Featured Equipment
          </h2>
          <div
            className="w-20 h-1  rounded-full"
            style={{ backgroundColor: PALETTE.orange }}
          ></div>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showcaseItems.map((item) => (
            <div
              key={item.id}
              className="group relative h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-lg"
            >
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Dark Overlay Gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
              </div>

              {/* Content Overlay - Positioned Bottom */}
              <div className="absolute bottom-0 left-0 w-full p-8 transform transition-transform duration-300 group-hover:-translate-y-2">
                {/* Colored Accent Bar (Orange) */}
                <div
                  className="w-12 h-1 mb-4 rounded-full transition-all duration-300 w-12 group-hover:w-full"
                  style={{ backgroundColor: PALETTE.orangeLight }}
                ></div>

                {/* Text Content */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                  {item.title}
                </h3>

                <p
                  className="text-lg font-medium"
                  style={{ color: PALETTE.orangeLight }}
                >
                  {item.description}
                </p>

                {/* Hover Button (Optional) */}
                <div className="mt-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <button className="text-white cursor-pointer text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:text-[#FF8B28]">
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
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
