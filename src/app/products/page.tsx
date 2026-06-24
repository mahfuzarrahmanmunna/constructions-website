"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

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

interface CategoryGroup {
  name: string;
  slug: string;
  count: number;
  image: string; // We'll just grab the first product's image for the card
  description: string;
}

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.products || [];

        // Dynamically group products by category
        const map = new Map<string, CategoryGroup>();
        items.forEach((p: any) => {
          const catName = p.category || "Uncategorized";
          const slug = catName.trim().replace(/\s+/g, "-").toLowerCase();
          if (!map.has(catName)) {
            map.set(catName, {
              name: catName,
              slug,
              count: 0,
              image: p.image || "",
              description: p.subTitle || `Browse our ${catName} inventory`,
            });
          }
          map.get(catName)!.count++;
        });

        setCategories(Array.from(map.values()));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-white">
      <div className="relative h-[45vh] min-h-[520px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/background/products.jpg)" }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-[#002253] mb-6 tracking-tight leading-tight">
            Sale and Rental <span className="text-[#E55503]">Equipment</span>
          </h1>
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
            {filtered.length} categories
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex flex-col rounded-2xl border border-slate-100 overflow-hidden"
              >
                <div className="w-full aspect-[4/3] bg-slate-200" />
                <div className="p-5 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#002253]/60 text-lg">
              No equipment categories match &ldquo;{query}&rdquo;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {filtered.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-100 bg-white shadow-[0_4px_25px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                <div className="relative w-full aspect-[4/3] flex items-center justify-center bg-[#f0f0f0] transition-colors duration-300 group-hover:bg-[#E55503]">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-[68%] h-[68%] object-contain transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-lg"
                      loading="lazy"
                    />
                  ) : (
                    <div className="text-gray-400 text-4xl">🔧</div>
                  )}
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-sm md:text-base font-bold text-[#002253] uppercase tracking-wide leading-tight mb-2 group-hover:text-[#E55503] transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-xs md:text-sm text-[#002253]/60 leading-relaxed line-clamp-2 mb-4 flex-1">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#002253]/60">
                      {cat.count} Items
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002253] uppercase tracking-wider group-hover:text-[#E55503] transition-colors duration-300">
                      View{" "}
                      <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRightIcon />
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
