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
  {
    name: "Concrete Machinery",
    image: "/category/1st.png",
  },
  {
    name: "Excavator",
    image: "/category/2nd.png",
  },
  {
    name: "Crane",
    image: "/category/3rd.png",
  },
  {
    name: "Port Machinery",
    image: "/category/4th.png",
  },
  {
    name: "Road Machinery",
    image: "/category/5th.png",
  },
  {
    name: "Mining & Tunneling",
    image: "/category/6th.png",
  },
  {
    name: "Truck",
    image: "/category/7th.png",
  },
  {
    name: "Piling Machinery",
    image: "/category/8th.png",
  },
  {
    name: "Fire-fighting Equipment",
    image: "/category/9th.png",
  },
  {
    name: "Mobile Crusher",
    image: "/category/10th.png",
  },
  {
    name: "Hydrogen Energy",
    image: "/category/11th.png",
  },
  {
    name: "Petroleum Equipment",
    image: "/category/12th.png",
  },
];

// --- Arrow Icon Component ---
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default function CategorySection() {
  const displayCategories = categories.slice(0, 12);

  // --- Mobile Logic: Chunk data into groups of 4 (2 cols x 2 rows) ---
  const chunkSize = 4;
  const mobileChunks = [];
  for (let i = 0; i < displayCategories.length; i += chunkSize) {
    mobileChunks.push(displayCategories.slice(i, i + chunkSize));
  }

  return (
    <section className="w-full py-20 md:py-24 bg-white px-4 md:px-8">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* ═══ Section Header — matches screenshot ═══ */}
        <div className="flex flex-col  justify-between items-center mb-10 md:mb-14 gap-4">
          <div className="flex flex-col justify-center text-center items-center ">
            <p
              className="text-xs sm:text-sm font-bold text-[#E55503] uppercase tracking-widest"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Equipment
            </p>
            {/* Orange accent line */}
            <div className="h-[3px] w-10 bg-[#E55503] mt-1.5 mb-2" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002253] leading-tight">
              Sale and Rental
            </h2>
          </div>
          {/* View All — vertically centered on right */}
          {/* <Link
            href="/categories"
            className="group text-end flex items-center justify-end gap-2 text-[#002253] font-bold text-sm uppercase tracking-wider hover:text-[#E55503] transition-colors duration-300 shrink-0"
          >
            View All
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRightIcon />
            </span>
          </Link> */}
        </div>

        {/* 
           ═══ MOBILE VIEW (Horizontal Scroll) ═══
        */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar md:hidden -mx-4 px-4">
          {mobileChunks.map((chunk, chunkIndex) => (
            <div
              key={chunkIndex}
              className="min-w-full grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-8 snap-start px-2"
            >
              {chunk.map((cat, index) => (
                <Link
                  key={`${chunkIndex}-${index}`}
                  href="/details"
                  className="group flex flex-col items-center text-center"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden flex items-center justify-center transition-colors duration-300 bg-[#f0f0f0] group-hover:bg-[#E55503]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-[70%] h-[70%] object-contain transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-lg"
                      loading="lazy"
                    />
                  </div>

                  {/* Text Label */}
                  <h3 className="text-[11px] font-bold text-[#002253] group-hover:text-[#E55503] transition-colors duration-300 uppercase tracking-wide leading-tight h-9 flex items-center justify-center mt-2 px-1">
                    {cat.name}
                  </h3>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* 
           ═══ DESKTOP VIEW (6-col Grid) ═══
        */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-x-5 lg:gap-x-6 gap-y-10">
          {displayCategories.map((cat, index) => (
            <Link
              key={index}
              href="/details"
              className="group flex flex-col items-center text-center"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden flex items-center justify-center transition-colors duration-300 bg-[#f0f0f0] group-hover:bg-[#E55503]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-[70%] h-[70%] object-contain transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-lg"
                  loading="lazy"
                />
              </div>

              {/* Text Label */}
              <h3 className="text-xs lg:text-[13px] font-bold text-[#002253] group-hover:text-[#E55503] transition-colors duration-300 uppercase tracking-wide leading-tight h-10 flex items-center justify-center px-1">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
