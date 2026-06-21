"use client";

import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";

// --- Types ---
interface Category {
  name: string;
  image: string;
}

// --- Data ---
const categories: Category[] = [
  { name: "Concrete Machinery", image: "/category/1st.png" },
  { name: "Excavator", image: "/category/2nd.png" },
  { name: "Crane", image: "/category/3rd.png" },
  { name: "Port Machinery", image: "/category/4th.png" },
  { name: "Road Machinery", image: "/category/5th.png" },
  { name: "Mining & Tunneling", image: "/category/6th.png" },
  { name: "Truck", image: "/category/7th.png" },
  { name: "Piling Machinery", image: "/category/8th.png" },
  { name: "Fire-fighting Equipment", image: "/category/9th.png" },
  { name: "Mobile Crusher", image: "/category/10th.png" },
  { name: "Hydrogen Energy", image: "/category/11th.png" },
  { name: "Petroleum Equipment", image: "/category/12th.png" },
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

  // --- Mobile chunking ---
  const chunkSize = 4;
  const mobileChunks: Category[][] = [];
  for (let i = 0; i < displayCategories.length; i += chunkSize) {
    mobileChunks.push(displayCategories.slice(i, i + chunkSize));
  }

  // ═══ Mobile interaction states ═══
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [touchedCard, setTouchedCard] = useState<string | null>(null);
  const [centeredCard, setCenteredCard] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = mobileChunks.length;

  // --- Detect which card is closest to viewport center during scroll ---
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let raf: number;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        let closest: string | null = null;
        let minDist = Infinity;
        cardRefs.current.forEach((card, name) => {
          const cr = card.getBoundingClientRect();
          const d = Math.abs(cr.left + cr.width / 2 - cx);
          if (d < minDist) {
            minDist = d;
            closest = name;
          }
        });
        setCenteredCard(closest);
        setCurrentSlide(Math.round(el.scrollLeft / el.offsetWidth));
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    // Initial detection after layout
    requestAnimationFrame(() => requestAnimationFrame(onScroll));

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  // --- Mobile card visual helpers ---
  const getMobileCardStyle = (name: string): React.CSSProperties => {
    if (touchedCard === name) {
      return {
        backgroundColor: "#E55503",
        borderColor: "#E55503",
        boxShadow: "0 8px 25px -5px rgba(229,85,3,0.35)",
      };
    }
    if (centeredCard === name) {
      return {
        backgroundColor: "#f0f0f0",
        borderColor: "rgba(229,85,3,0.35)",
        boxShadow: "0 4px 15px -3px rgba(229,85,3,0.15)",
      };
    }
    return {
      backgroundColor: "#f0f0f0",
      borderColor: "transparent",
      boxShadow: "none",
    };
  };

  const getMobileImageClass = (name: string): string => {
    if (touchedCard === name) {
      return "w-[70%] h-[70%] object-contain transition-all duration-300 ease-out scale-110 drop-shadow-lg";
    }
    if (centeredCard === name) {
      return "w-[70%] h-[70%] object-contain transition-all duration-400 ease-out scale-105 drop-shadow-sm";
    }
    return "w-[70%] h-[70%] object-contain transition-all duration-500 ease-out";
  };

  const getMobileTextClass = (name: string): string => {
    const isActive = touchedCard === name;
    const isCentered = centeredCard === name && !touchedCard;
    return `text-[11px] font-bold uppercase tracking-wide leading-tight h-9 flex items-center justify-center mt-2.5 px-1 transition-colors duration-300 ${
      isActive || isCentered ? "text-[#E55503]" : "text-[#002253]"
    }`;
  };

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
        {/* ═══ Section Header ═══ */}
        <div className="flex flex-col justify-between items-center mb-10 md:mb-14 gap-4">
          <div className="flex flex-col justify-center text-center items-center">
            <p
              className="text-xs sm:text-sm font-bold text-[#E55503] uppercase tracking-widest"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Equipment
            </p>
            <div className="h-[3px] w-10 bg-[#E55503] mt-1.5 mb-2" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002253] leading-tight">
              Sale and Rental
            </h2>
          </div>

          {/* View All — desktop only, right side */}
          <Link
            href="/categories"
            className="hidden md:flex group items-center gap-2 text-[#002253] font-bold text-sm uppercase tracking-wider hover:text-[#E55503] transition-colors duration-300 shrink-0"
          >
            View All
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRightIcon />
            </span>
          </Link>
        </div>

        {/* 
           ═══ MOBILE VIEW (Horizontal Scroll with touch/scroll interaction) ═══
        */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar md:hidden -mx-4 px-4"
        >
          {mobileChunks.map((chunk, chunkIndex) => (
            <div
              key={chunkIndex}
              className="min-w-full grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-8 snap-start px-2"
            >
              {chunk.map((cat) => (
                <Link
                  key={cat.name}
                  href="/details"
                  className="flex flex-col items-center text-center"
                  onTouchStart={() => setTouchedCard(cat.name)}
                  onTouchEnd={() => {
                    // Small delay so the orange flash is visible before navigation
                    setTimeout(() => setTouchedCard(null), 120);
                  }}
                  onTouchCancel={() => setTouchedCard(null)}
                >
                  {/* Image Container — ref for scroll-center detection */}
                  <div
                    ref={(el) => {
                      if (el) cardRefs.current.set(cat.name, el);
                      else cardRefs.current.delete(cat.name);
                    }}
                    className="relative w-full aspect-[4/3] rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 border-2"
                    style={getMobileCardStyle(cat.name)}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className={getMobileImageClass(cat.name)}
                      loading="lazy"
                      draggable={false}
                    />
                  </div>

                  {/* Text Label */}
                  <h3 className={getMobileTextClass(cat.name)}>{cat.name}</h3>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* ═══ Mobile slide indicator dots ═══ */}
        <div className="flex items-center justify-center gap-2 mt-6 md:hidden">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all duration-400 ease-out"
              style={{
                width: currentSlide === i ? "22px" : "6px",
                height: "6px",
                backgroundColor: currentSlide === i ? "#E55503" : "#d4d4d4",
              }}
            />
          ))}
        </div>

        {/* 
           ═══ DESKTOP VIEW (6-col Grid — unchanged hover behavior) ═══
        */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-x-5 lg:gap-x-6 gap-y-10">
          {displayCategories.map((cat, index) => (
            <Link
              key={index}
              href="/details"
              className="group flex flex-col items-center text-center"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 bg-[#f0f0f0] border-2 border-transparent group-hover:bg-[#E55503] group-hover:border-[#E55503] group-hover:shadow-lg group-hover:shadow-[#E55503]/20">
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

        {/* ═══ Mobile View All — below dots ═══ */}
        <div className="flex md:hidden justify-center mt-5">
          <Link
            href="/categories"
            className="group flex items-center gap-2 text-[#002253] font-bold text-sm uppercase tracking-wider hover:text-[#E55503] transition-colors duration-300"
          >
            View All
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRightIcon />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
