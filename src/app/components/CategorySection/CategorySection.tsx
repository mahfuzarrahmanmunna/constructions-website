"use client";

import Link from "next/link";
import React from "react";

// --- Types ---
interface Category {
  name: string;
  image: string;
}

// --- Data ---
const categories: Category[] = [
  // Row 1
  {
    name: "Concrete Machinery",
    image:
      "/category/1st.png",
  },
  {
    name: "Excavator",
    image:
      "/category/2nd.png",
  },
  {
    name: "Crane",
    image:
      "/category/3rd.png",
  },
  {
    name: "Port Machinery",
    image:
      "/category/4th.png",
  },
  {
    name: "Road Machinery",
    image:
      "/category/5th.png",
  },
  {
    name: "Mining & Tunneling",
    image:
      "/category/6th.png",
  },
  // Row 2
  {
    name: "Truck",
    image:
      "/category/7th.png",
  },
  {
    name: "Piling Machinery",
    image:
      "/category/8th.png",
  },
  {
    name: "Fire-fighting Equipment",
    image:
      "/category/9th.png",
  },
  {
    name: "Mobile Crusher",
    image:
      "/category/10th.png",
  },
  {
    name: "Hydrogen Energy",
    image:
      "/category/11th.png",
  },
  {
    name: "Petroleum Equipment",
    image:
      "/category/12th.png",
  },
];

// --- Arrow Icon Component ---
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
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
);

export default function CategorySection() {
  // Slice to first 12 items to match the 2-row layout
  const displayCategories = categories.slice(0, 12);

  return (
    <section className="w-full bg-white py-16 px-4 md:px-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-12">
          <div>
            <h2 className="text-3xl font-bold text-[#002253] mb-2 uppercase tracking-wide">
              Product Categories
            </h2>
            <div className="h-1 w-16 bg-[#E55503]"></div>
          </div>

          <div className="hidden md:block text-[#224B88] text-sm font-medium mt-4 md:mt-0">
            Explore our full range of industrial solutions
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
          {displayCategories.map((cat, index) => (
            <Link
              key={index}
              href="/details"
              className="group flex flex-col items-center text-center"
            >
              {/* 
                Image Container 
                1. bg-gray-100: Initial Gray Background
                2. group-hover:bg-[#E55503]: Changes to Orange on hover
                3. Flex/Center: Centers the image like an icon
              */}
              <div className="relative w-full aspect-[4/3]  rounded-lg overflow-hidden flex items-center justify-center transition-colors duration-300 ">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-[75%] h-[75%] object-contain transition-all duration-500 ease-out mix-blend-multiply grayscale opacity-80 group-hover:mix-blend-normal group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100 group-hover:drop-shadow-2xl"
                  loading="lazy"
                />
              </div>

              {/* Text Label */}
              <h3 className="text-xs md:text-sm font-bold text-[#002253] group-hover:text-[#E55503] transition-colors duration-300 uppercase tracking-wide leading-tight h-10 flex items-center justify-center">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>

        {/* Bottom Navigation / View All Button */}
        <div className="flex justify-end mt-12">
          <button className="group flex items-center gap-2 text-[#002253] font-bold text-sm uppercase tracking-wider hover:text-[#E55503] transition-colors duration-300">
            View All Categories
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRightIcon />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
