"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRef, useEffect } from "react";
import { getCategoryInfo } from "@/lib/categoryData";
import { notFound } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Color Palette (shared with home & contact pages) ---
const COLORS = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

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
  const pageRef = useRef<HTMLDivElement>(null);

  const categoryInfo = getCategoryInfo(category);

  useEffect(() => {
    if (!categoryInfo) return;
    const ctx = gsap.context(() => {
      // Hero content
      gsap.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Product cards stagger on scroll. "top bottom-=80" fires as soon as the
      // grid enters from the bottom, so cards are never left stuck invisible —
      // even when already in view on load.
      gsap.from(".product-card", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        // Strip inline styles once revealed so every card returns to its clean
        // CSS state — identical position AND full opacity (otherwise an
        // interrupted stagger can freeze later cards at partial opacity).
        clearProps: "all",
        scrollTrigger: {
          trigger: ".product-grid",
          start: "top bottom-=80",
          once: true,
        },
      });

      // CTA banner
      gsap.from(".cta-reveal", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-reveal",
          start: "top bottom-=80",
          once: true,
        },
      });
    }, pageRef);

    // The hero uses next/image with `fill`, which can shift layout after mount.
    // Refresh AFTER the reveal has finished (not mid-stagger) so corrected
    // positions don't freeze the running animation at partial opacity.
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 1200);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [categoryInfo, category]);

  if (!categoryInfo) notFound();

  const inStock = categoryInfo.products.filter((p) => p.available).length;

  return (
    <main ref={pageRef} className="min-h-screen bg-[#f8f9fb] font-sans">

      {/* ── Hero Banner ────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[420px] items-center overflow-hidden md:min-h-[480px]">
        <Image
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop"
          alt={categoryInfo.label}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#002253]/95 via-[#002253]/85 to-[#f8f9fb]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="hero-reveal mb-3 inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#FF8B28]">
                Sale &amp; Rental
              </span>
              <h1 className="hero-reveal mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                {categoryInfo.label}
              </h1>
              <span
                className="hero-reveal mb-5 block h-1 w-20 rounded-full"
                style={{ backgroundColor: COLORS.orange }}
              />
              <p className="hero-reveal max-w-2xl text-base leading-relaxed text-gray-200 md:text-lg">
                {categoryInfo.description}
              </p>
            </div>

            <div className="hero-reveal flex-shrink-0 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-center backdrop-blur">
              <p className="text-3xl font-extrabold text-[#FF8B28]">
                {categoryInfo.products.length}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-gray-200">
                Models Available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Grid ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="block text-sm font-bold uppercase tracking-widest text-[#E55503]">
              Available Models
            </span>
            <span className="mb-2 mt-1.5 block h-[3px] w-10 rounded-full bg-[#E55503]" />
            <h2 className="text-2xl font-extrabold tracking-tight text-[#002253] md:text-3xl">
              All {categoryInfo.label} Models
            </h2>
          </div>
          <span className="text-sm font-medium text-slate-500">
            {inStock} in stock
          </span>
        </div>

        <div className="product-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryInfo.products.map((product) => (
            <Link
              key={product.id}
              // ✅ Route: /products/concrete-machinery/Concrete-Pump-Truck/1
              href={`/products/${category}/${nameToSlug(product.name)}/${product.id}`}
              className="product-card group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E55503] hover:shadow-xl hover:shadow-[#E55503]/10"
            >
              {/* Image */}
              <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[#f0f0f0]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute right-3 top-3 rounded-full bg-[#002253] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  {product.condition}
                </span>
                {!product.available && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                    <span className="rounded-full bg-gray-800 px-3 py-1 text-xs font-bold text-white">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#E55503]">
                  {product.model} · {product.year}
                </p>
                <h3 className="mb-2 text-base font-extrabold text-[#002253] transition-colors duration-300 group-hover:text-[#E55503]">
                  {product.name}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500">
                  {product.description}
                </p>

                {/* Key Specs */}
                <div className="mb-4 space-y-1.5">
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
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                  <p className="text-lg font-extrabold text-[#002253]">{product.price}</p>
                  <span className="flex items-center gap-1.5 text-sm font-bold text-[#E55503] transition-all duration-300 group-hover:gap-2.5">
                    View Details <ArrowRightIcon />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8 md:pb-20">
        <div className="cta-reveal relative overflow-hidden rounded-2xl bg-[#002253] px-6 py-12 md:px-12">
          {/* Decorative accent */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#E55503]/20 blur-3xl" />
          <div className="relative flex flex-col items-center justify-between gap-6 text-center text-white md:flex-row md:text-left">
            <div>
              <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#FF8B28]">
                Get Started
              </span>
              <h3 className="mb-2 text-2xl font-extrabold tracking-tight md:text-3xl">
                Need a Custom Quote?
              </h3>
              <p className="max-w-xl text-sm text-gray-300 md:text-base">
                Our team is ready to help you find the right{" "}
                {categoryInfo.label.toLowerCase()} for your project.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-xl bg-[#E55503] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#E55503]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#cc4a03] hover:shadow-xl hover:shadow-[#E55503]/30"
            >
              Contact Us
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRightIcon />
              </span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
