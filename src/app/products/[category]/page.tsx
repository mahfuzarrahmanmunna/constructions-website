"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getCategoryInfo } from "@/lib/categoryData";
import { notFound } from "next/navigation";

// ─── Helper: product name → URL slug ─────────────────────────────────────────
// "Concrete Pump Truck" → "Concrete-Pump-Truck"
export function nameToSlug(name: string): string {
  return name.trim().replace(/\s+/g, "-");
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  const categoryInfo = getCategoryInfo(category);
  if (!categoryInfo) notFound();

  return (
    <main className="min-h-screen bg-[#f8f9fb] font-sans">

      {/* ── Hero Banner ────────────────────────────────────────────────── */}
      <section className="bg-[#002253] text-white py-14 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 uppercase tracking-wider flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
            <span>/</span>
            <span className="text-[#FF8B28]">{categoryInfo.label}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-[#E55503] font-bold text-xs uppercase tracking-widest mb-2">
                Sale & Rental
              </p>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-3">
                {categoryInfo.label}
              </h1>
              <p className="text-gray-300 text-base md:text-lg max-w-2xl">
                {categoryInfo.description}
              </p>
            </div>

            <div className="flex-shrink-0 bg-white/10 backdrop-blur rounded-2xl px-6 py-4 text-center border border-white/20">
              <p className="text-3xl font-extrabold text-[#FF8B28]">
                {categoryInfo.products.length}
              </p>
              <p className="text-xs text-gray-300 uppercase tracking-wider mt-1">
                Models Available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Back link ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <Link href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#002253] hover:text-[#E55503] transition-colors">
          ← Back to Categories
        </Link>
      </div>

      {/* ── Product Grid ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-extrabold text-[#002253]">
            All {categoryInfo.label} Models
          </h2>
          <span className="text-sm text-gray-500">
            {categoryInfo.products.filter((p) => p.available).length} in stock
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryInfo.products.map((product) => (
            <Link
              key={product.id}
              // ✅ Route: /products/concrete-machinery/Concrete-Pump-Truck/1
              href={`/products/${category}/${nameToSlug(product.name)}/${product.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#E55503]/30 hover:shadow-xl hover:shadow-[#E55503]/10 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative bg-[#f0f0f0] h-52 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[70%] h-[70%] object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                  product.condition === "New"
                    ? "bg-green-100 text-green-700"
                    : product.condition === "Used"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                }`}>
                  {product.condition}
                </span>
                {!product.available && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                    <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs text-[#E55503] font-bold uppercase tracking-widest mb-1">
                  {product.model} · {product.year}
                </p>
                <h3 className="text-base font-extrabold text-[#002253] mb-2 group-hover:text-[#E55503] transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 flex-1 leading-relaxed">
                  {product.description}
                </p>

                {/* Key Specs */}
                <div className="space-y-1.5 mb-4">
                  {product.specs.slice(0, 2).map((spec) => (
                    <div key={spec.label} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-gray-500">
                        <span className="text-[#E55503]"><CheckIcon /></span>
                        {spec.label}
                      </span>
                      <span className="font-bold text-[#002253]">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                  <p className="text-lg font-extrabold text-[#002253]">{product.price}</p>
                  <span className="flex items-center gap-1.5 text-[#E55503] text-sm font-bold group-hover:gap-2.5 transition-all duration-300">
                    View Details <ArrowRightIcon />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────── */}
      <section className="bg-[#E55503] py-12 mt-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-white text-center md:text-left">
          <div>
            <h3 className="text-2xl font-extrabold mb-1">Need a Custom Quote?</h3>
            <p className="text-white/80 text-sm">
              Our team is ready to help you find the right {categoryInfo.label.toLowerCase()} for your project.
            </p>
          </div>
          <Link href="/contact" className="bg-white text-[#E55503] px-8 py-3 rounded-full font-extrabold text-sm uppercase tracking-wider hover:bg-[#002253] hover:text-white transition-colors duration-300 shrink-0">
            Contact Us
          </Link>
        </div>
      </section>

    </main>
  );
}