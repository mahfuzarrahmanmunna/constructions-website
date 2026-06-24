"use client";

import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";

interface Product {
  _id: string;
  title: string;
  subTitle?: string;
  image: string;
  machineType?: string;
  category?: string;
  price?: number;
}

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
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// Helper to create URL slugs
const nameToSlug = (name: string) => name.trim().replace(/\s+/g, "-");
const catToSlug = (cat: string) =>
  cat ? cat.trim().replace(/\s+/g, "-").toLowerCase() : "uncategorized";

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.products || [];
        setProducts(items.slice(0, 12));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const chunkSize = 4;
  const mobileChunks: Product[][] = [];
  for (let i = 0; i < products.length; i += chunkSize) {
    mobileChunks.push(products.slice(i, i + chunkSize));
  }

  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [touchedCard, setTouchedCard] = useState<string | null>(null);
  const [centeredCard, setCenteredCard] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = mobileChunks.length;

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
        cardRefs.current.forEach((card, id) => {
          const cr = card.getBoundingClientRect();
          const d = Math.abs(cr.left + cr.width / 2 - cx);
          if (d < minDist) {
            minDist = d;
            closest = id;
          }
        });
        setCenteredCard(closest);
        setCurrentSlide(Math.round(el.scrollLeft / el.offsetWidth));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(() => requestAnimationFrame(onScroll));
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, [products]);

  const getMobileCardStyle = (id: string): React.CSSProperties => {
    if (touchedCard === id)
      return {
        backgroundColor: "#E55503",
        borderColor: "#E55503",
        boxShadow: "0 8px 25px -5px rgba(229,85,3,0.35)",
      };
    if (centeredCard === id)
      return {
        backgroundColor: "#f0f0f0",
        borderColor: "rgba(229,85,3,0.35)",
        boxShadow: "0 4px 15px -3px rgba(229,85,3,0.15)",
      };
    return {
      backgroundColor: "#f0f0f0",
      borderColor: "transparent",
      boxShadow: "none",
    };
  };

  const getMobileImageClass = (id: string) => {
    if (touchedCard === id)
      return "w-[70%] h-[70%] object-contain transition-all duration-300 ease-out scale-110 drop-shadow-lg";
    if (centeredCard === id)
      return "w-[70%] h-[70%] object-contain transition-all duration-400 ease-out scale-105 drop-shadow-sm";
    return "w-[70%] h-[70%] object-contain transition-all duration-500 ease-out";
  };

  const getMobileTextClass = (id: string) => {
    const isActive = touchedCard === id;
    const isCentered = centeredCard === id && !touchedCard;
    return `text-[11px] font-bold uppercase tracking-wide leading-tight h-9 flex items-center justify-center mt-2.5 px-1 transition-colors duration-300 ${isActive || isCentered ? "text-[#E55503]" : "text-[#002253]"}`;
  };

  if (loading) {
    return (
      <section className="w-full py-20 md:py-24 bg-white px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-10 gap-4">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-full aspect-[4/3] rounded-xl bg-gray-200 animate-pulse" />
                <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
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
        <div className="flex flex-col justify-between items-center mb-10 md:mb-14 gap-4">
          <div className="flex flex-col justify-center text-center items-center">
            <p
              className="text-xs sm:text-sm font-bold text-[#E55503] uppercase tracking-widest"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Equipment
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002253] leading-tight">
              Sale and Rental
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden md:flex group items-center gap-2 text-[#002253] font-bold text-sm uppercase tracking-wider hover:text-[#E55503] transition-colors duration-300 shrink-0"
          >
            View All{" "}
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRightIcon />
            </span>
          </Link>
        </div>

        {/* MOBILE VIEW */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar md:hidden -mx-4 px-4"
        >
          {mobileChunks.map((chunk, chunkIndex) => (
            <div
              key={chunkIndex}
              className="min-w-full grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-8 snap-start px-2"
            >
              {chunk.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${catToSlug(product.category || "")}/${nameToSlug(product.title)}/${product._id}`}
                  className="flex flex-col items-center text-center"
                  onTouchStart={() => setTouchedCard(product._id)}
                  onTouchEnd={() => setTimeout(() => setTouchedCard(null), 120)}
                  onTouchCancel={() => setTouchedCard(null)}
                >
                  <div
                    ref={(el) => {
                      if (el) cardRefs.current.set(product._id, el);
                      else cardRefs.current.delete(product._id);
                    }}
                    className="relative w-full aspect-[4/3] rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 border-2"
                    style={getMobileCardStyle(product._id)}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.title}
                        className={getMobileImageClass(product._id)}
                        loading="lazy"
                        draggable={false}
                      />
                    ) : (
                      <div className="w-[70%] h-[70%] flex items-center justify-center text-gray-400 text-4xl">
                        🔧
                      </div>
                    )}
                  </div>
                  <h3 className={getMobileTextClass(product._id)}>
                    {product.title}
                  </h3>
                </Link>
              ))}
            </div>
          ))}
        </div>

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

        {/* DESKTOP VIEW */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-x-5 lg:gap-x-6 gap-y-10">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${catToSlug(product.category || "")}/${nameToSlug(product.title)}/${product._id}`}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 bg-[#f0f0f0] border-2 border-transparent group-hover:bg-[#E55503] group-hover:border-[#E55503] group-hover:shadow-lg group-hover:shadow-[#E55503]/20">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-[70%] h-[70%] object-contain transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-lg"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-gray-400 text-4xl">🔧</div>
                )}
              </div>
              <h3 className="text-xs lg:text-[13px] font-bold text-[#002253] group-hover:text-[#E55503] transition-colors duration-300 uppercase tracking-wide leading-tight h-10 flex items-center justify-center px-1">
                {product.title}
              </h3>
            </Link>
          ))}
        </div>

        <div className="flex md:hidden justify-center mt-5">
          <Link
            href="/products"
            className="group flex items-center gap-2 text-[#002253] font-bold text-sm uppercase tracking-wider hover:text-[#E55503] transition-colors duration-300"
          >
            View All{" "}
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRightIcon />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
