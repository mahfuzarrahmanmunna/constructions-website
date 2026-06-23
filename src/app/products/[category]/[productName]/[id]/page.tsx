"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getCategoryInfo, getProduct } from "@/lib/categoryData";
import { notFound } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RequestQuoteModal from "@/app/components/RequestQuoteForm/RequestQuoteForm";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductDetailPage() {
  const params = useParams();
  const category = params.category as string;
  // productName param is in the URL for readability but we fetch by id
  const id = Number(params.id);
  const pageRef = useRef<HTMLDivElement>(null);

  const categoryInfo = getCategoryInfo(category);
  const product = getProduct(category, id);

  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    if (!categoryInfo || !product) return;
    const ctx = gsap.context(() => {
      gsap.from(".detail-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "all",
      });

      gsap.from(".related-reveal", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".related-grid",
          start: "top bottom-=80",
          once: true,
        },
      });
    }, pageRef);

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 1200);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [categoryInfo, product, id]);

  if (!categoryInfo || !product) notFound();

  // Related products (exclude current)
  const relatedProducts = categoryInfo.products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  // Helper for related product links
  const nameToSlug = (name: string) => name.trim().replace(/\s+/g, "-");

  return (
    <main ref={pageRef} className="min-h-screen bg-[#f8f9fb] font-sans">

      {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
      <div className="bg-[#002253] px-4 py-4 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-gray-400">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/categories" className="transition-colors hover:text-white">Categories</Link>
            <span>/</span>
            <Link href={`/products/${category}`} className="transition-colors hover:text-white">
              {categoryInfo.label}
            </Link>
            <span>/</span>
            <span className="text-[#FF8B28]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">

        {/* Back link */}
        <Link href={`/products/${category}`}
          className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#002253] transition-colors hover:text-[#E55503]">
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Back to {categoryInfo.label}
        </Link>

        {/* ── Main Product Panel ────────────────────────────────────────── */}
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Left — Image */}
          <div className="detail-reveal overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#f0f0f0] p-8 md:h-96">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-[#002253] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                {product.condition}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Model: <span className="text-[#002253]">{product.model}</span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Year: <span className="text-[#002253]">{product.year}</span>
              </span>
              <span className={`text-xs font-bold uppercase ${product.available ? "text-green-600" : "text-red-500"}`}>
                {product.available ? "● In Stock" : "● Out of Stock"}
              </span>
            </div>
          </div>

          {/* Right — Details */}
          <div className="detail-reveal flex flex-col">
            <span className="text-sm font-bold uppercase tracking-widest text-[#E55503]">
              {categoryInfo.label}
            </span>
            <span className="mb-3 mt-1.5 block h-[3px] w-10 rounded-full bg-[#E55503]" />
            <h1 className="mb-3 text-2xl font-extrabold leading-tight tracking-tight text-[#002253] md:text-3xl">
              {product.name}
            </h1>
            <p className="mb-6 text-sm leading-relaxed text-gray-500">{product.description}</p>

            {/* Price */}
            <div className="relative mb-6 flex items-center justify-between overflow-hidden rounded-xl bg-[#002253] px-6 py-4">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#E55503]/20 blur-2xl" />
              <span className="relative text-sm font-semibold text-gray-300">Starting Price</span>
              <span className="relative text-2xl font-extrabold text-white">{product.price}</span>
            </div>

            {/* Specs */}
            <div className="mb-6 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#002253]">
                Key Specifications
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {product.specs.map((spec) => (
                  <div key={spec.label}
                    className="flex items-center justify-between border-b border-gray-50 py-2 last:border-0">
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="text-[#E55503]"><CheckIcon /></span>
                      {spec.label}
                    </span>
                    <span className="text-sm font-extrabold text-[#002253]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-auto flex flex-col gap-3 sm:flex-row">
              {/* Get a Quote — orange with shine sweep */}
              <button
                onClick={() => setInquiryOpen(true)}
                className="group relative flex-1 overflow-hidden rounded-xl bg-[#E55503] py-3.5 text-sm font-extrabold uppercase tracking-wider text-white shadow-lg shadow-[#E55503]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#cc4a03] hover:shadow-xl hover:shadow-[#E55503]/30">
                <span className="pointer-events-none absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%]" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <MailIcon /> Get a Quote
                </span>
              </button>

              {/* Call Now — outline that fills with a shine sweep */}
              <a href="tel:+8801700000000"
                className="group relative flex-1 overflow-hidden rounded-xl border-2 border-[#002253] py-3.5 text-sm font-extrabold uppercase tracking-wider text-[#002253] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#002253] hover:text-white">
                <span className="pointer-events-none absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%]" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <PhoneIcon /> Call Now
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Related Products ─────────────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="mb-6">
              <span className="text-sm font-bold uppercase tracking-widest text-[#E55503]">
                You may also like
              </span>
              <span className="mb-2 mt-1.5 block h-[3px] w-10 rounded-full bg-[#E55503]" />
              <h2 className="text-xl font-extrabold tracking-tight text-[#002253] md:text-2xl">
                Other {categoryInfo.label} Models
              </h2>
            </div>
            <div className="related-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rel) => (
                <Link key={rel.id}
                  // ✅ Route: /products/concrete-machinery/Concrete-Pump-Truck/1
                  href={`/products/${category}/${nameToSlug(rel.name)}/${rel.id}`}
                  className="related-reveal group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E55503] hover:shadow-xl hover:shadow-[#E55503]/10">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f0f0f0]">
                    <img src={rel.image} alt={rel.name}
                      className="h-[80%] w-[80%] object-contain transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="min-w-0">
                    <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-[#E55503]">{rel.model}</p>
                    <h4 className="mb-1 truncate text-sm font-extrabold leading-tight text-[#002253] transition-colors group-hover:text-[#E55503]">
                      {rel.name}
                    </h4>
                    <p className="flex items-center gap-1.5 text-sm font-bold text-[#002253]">
                      {rel.price}
                      <span className="text-[#E55503] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                        <ArrowRightIcon />
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Inquiry Modal — shared Request-a-Quote form ─────────────────────── */}
      <RequestQuoteModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />

    </main>
  );
}
