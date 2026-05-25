"use client";

import React from "react";

// --- Color Palette ---
const COLORS = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

// --- Data with Unique Individual Images ---
const categories = [
  // Row 1
  {
    name: "Concrete Machinery",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Excavator",
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Crane",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Port Machinery",
    image:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Road Machinery",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Mining & Tunneling",
    image:
      "https://images.unsplash.com/photo-1590644365607-1c5e12459345?q=80&w=600&auto=format&fit=crop",
  },
  // Row 2
  {
    name: "Truck",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Piling Machinery",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Fire-fighting Equipment",
    image:
      "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Mobile Crusher",
    image:
      "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Hydrogen Energy",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Petroleum Equipment",
    image:
      "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=600&auto=format&fit=crop",
  },
  // Row 3
  {
    name: "Photovoltaics",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Generator Set",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Wind Turbine",
    image:
      "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Electric Forklift",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Sanitation Equipment",
    image:
      "https://images.unsplash.com/photo-1591160690555-5debfba0c36a?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Aerial Work Platform",
    image:
      "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?q=80&w=600&auto=format&fit=crop",
  },
];

export default function CategorySection() {
  return (
    <section className="w-full bg-gray-50 py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002253] mb-4 tracking-tight">
            Product Categories
          </h2>
          <div className="w-20 h-1 bg-[#E55503] mx-auto rounded-full mb-4"></div>
          <p className="text-[#224B88] max-w-2xl mx-auto text-sm md:text-base">
            Explore our comprehensive range of heavy machinery and equipment
            designed for every industrial need.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {categories.map((cat, index) => (
            <a
              key={index}
              href="#"
              className="group flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-transparent hover:border-[#E55503]/20 shadow-sm hover:shadow-xl hover:shadow-[#E55503]/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-gray-100">
                {/* 
                  Standard Image Tag instead of Sprite Sheet
                  Default: Grayscale + slightly transparent
                  Hover: Full Color + slight zoom
                */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                  style={{
                    filter: "grayscale(100%) opacity(0.7)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = "grayscale(0%) opacity(1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter =
                      "grayscale(100%) opacity(0.7)";
                  }}
                  loading="lazy" // Good for SEO and performance
                />
              </div>

              {/* Text Label */}
              <h3 className="text-sm font-bold text-[#002253] group-hover:text-[#E55503] transition-colors duration-300 leading-tight min-h-[40px] flex items-center">
                {cat.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
