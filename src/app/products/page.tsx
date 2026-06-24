/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { categoryData } from "@/lib/categoryData";

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
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

export default function ProductsPage() {
  const [query, setQuery] = useState("");

  const filtered = categoryData.filter((cat) =>
    cat.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO SECTION ── */}
      <div className="relative h-[45vh] min-h-[520px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/background/products.jpg)" }}
        />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-[#002253]/90 via-[#002253]/75 to-white" /> */}

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-[#002253] mb-6 tracking-tight leading-tight">
            Sale and Rental <span className="text-[#E55503]">Equipment</span>
          </h1>
          <p className="text-black hidden text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Browse our full range of heavy machinery and equipment categories
            available for sale and rental across Bangladesh.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#002253]/40"
              size={18}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search equipment categories..."
              className="w-full rounded-full bg-white/95 backdrop-blur-md border border-white/40 py-3.5 pl-12 pr-4 text-sm text-[#002253] placeholder:text-[#002253]/40 shadow-lg outline-none focus:ring-2 focus:ring-[#E55503]/50 transition"
            />
          </div>
        </div>
      </div>

      {/* ── CATEGORY GRID ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p
              className="text-xs sm:text-sm font-bold text-[#E55503] uppercase tracking-widest"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Equipment
            </p>
            <div className="h-[3px] w-10 bg-[#E55503] mt-1.5 mb-2" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002253] leading-tight">
              All Product Categories
            </h2>
          </div>
          <p className="text-sm text-[#002253]/60 font-medium">
            {filtered.length} of {categoryData.length} categories
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#002253]/60 text-lg">
              No equipment categories match &ldquo;{query}&rdquo;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {filtered.map((cat) => (
              <Link
                key={cat.category}
                href={`/products/${cat.category}`}
                className="group flex flex-col rounded-2xl border border-slate-100 bg-white shadow-[0_4px_25px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                <div className="relative w-full aspect-[4/3] flex items-center justify-center bg-[#f0f0f0] transition-colors duration-300 group-hover:bg-[#E55503]">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-[68%] h-[68%] object-contain transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-lg"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-sm md:text-base font-bold text-[#002253] uppercase tracking-wide leading-tight mb-2 group-hover:text-[#E55503] transition-colors duration-300">
                    {cat.label}
                  </h3>
                  <p className="text-xs md:text-sm text-[#002253]/60 leading-relaxed line-clamp-2 mb-4 flex-1">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002253] uppercase tracking-wider group-hover:text-[#E55503] transition-colors duration-300">
                    View Products
                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRightIcon />
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── CTA SECTION ── */}
      <div className="w-full bg-[#f8f9fb] py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002253] mb-6 leading-tight">
            Can&apos;t Find What You Need?
          </h2>
          <div className="w-20 h-1 bg-[#E55503] mx-auto rounded-full mb-8"></div>
          <p className="text-[#002253]/60 text-lg mb-10 max-w-2xl mx-auto">
            Our team can source the right machine for your project and arrange
            sale or rental terms that work for you.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/contact"
              className="group relative overflow-hidden rounded-full px-10 py-4 text-sm font-bold text-white bg-[#E55503] transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_-10px_rgba(229,85,3,0.5)]"
            >
              Request a Quote
            </Link>
            <Link
              href="/service"
              className="rounded-full border border-[#E55503] bg-white/5 px-10 py-4 text-sm font-semibold text-[#E55503] backdrop-blur-md transition-all duration-300 hover:bg-[#E55503] hover:text-white"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
