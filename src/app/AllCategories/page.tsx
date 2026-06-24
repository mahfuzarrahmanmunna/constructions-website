// src/app/categories/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
  icon: string | null;
  slug: string;
  order: number;
}

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data); // ✅ কোনো slice নেই — সব দেখাবে
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f9fb]">

      {/* ── Hero ── */}
      <section className="bg-[#002253] text-white py-14 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 uppercase tracking-wider">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#FF8B28]">All Categories</span>
          </nav>
          <p className="text-[#E55503] font-bold text-xs uppercase tracking-widest mb-2">Equipment</p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-3">
            All Categories
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl">
            Browse our complete range of heavy machinery — available for sale and rental.
          </p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">

        {loading ? (
          // Skeleton
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-full aspect-[4/3] rounded-xl bg-gray-200 animate-pulse" />
                <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-8">
              Showing <span className="font-bold text-[#002253]">{categories.length}</span> categories
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/products/${cat.slug}`}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 bg-[#f0f0f0] border-2 border-transparent group-hover:bg-[#E55503] group-hover:border-[#E55503] group-hover:shadow-lg group-hover:shadow-[#E55503]/20">
                    {cat.icon ? (
                      <img
                        src={cat.icon}
                        alt={cat.name}
                        className="w-[70%] h-[70%] object-contain transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-lg"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-gray-400 text-4xl">🔧</div>
                    )}
                  </div>
                  <h3 className="text-xs lg:text-[13px] font-bold text-[#002253] group-hover:text-[#E55503] transition-colors duration-300 uppercase tracking-wide leading-tight h-10 flex items-center justify-center px-1 mt-2">
                    {cat.name}
                  </h3>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#E55503] py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-white text-center md:text-left">
          <div>
            <h3 className="text-2xl font-extrabold mb-1">Need a Custom Quote?</h3>
            <p className="text-white/80 text-sm">
              Our team is ready to help you find the right machinery for your project.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-white text-[#E55503] px-8 py-3 rounded-full font-extrabold text-sm uppercase tracking-wider hover:bg-[#002253] hover:text-white transition-colors duration-300 shrink-0"
          >
            Contact Us
          </Link>
        </div>
      </section>

    </main>
  );
}