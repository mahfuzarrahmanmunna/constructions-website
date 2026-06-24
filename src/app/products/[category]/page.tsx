"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const nameToSlug = (name: string) => name.trim().replace(/\s+/g, "-");

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
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const pageRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.products || [];
        // Find products matching the URL slug
        const filtered = items.filter(
          (p: any) =>
            (p.category || "uncategorized")
              .trim()
              .replace(/\s+/g, "-")
              .toLowerCase() === categorySlug,
        );

        if (filtered.length > 0) {
          setProducts(filtered);
          setCategoryName(filtered[0].category);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categorySlug]);

  useEffect(() => {
    if (loading || products.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.from(".product-card", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".product-grid",
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
  }, [loading, products]);

  if (!loading && products.length === 0) notFound();

  return (
    <main ref={pageRef} className="min-h-screen bg-[#f8f9fb] font-sans">
      <section className="relative flex min-h-[420px] items-center overflow-hidden md:min-h-[480px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#002253]/95 via-[#002253]/85 to-[#f8f9fb]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="hero-reveal mb-3 inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#FF8B28]">
                Sale &amp; Rental
              </span>
              <h1 className="hero-reveal mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                {categoryName}
              </h1>
              <span className="hero-reveal mb-5 block h-1 w-20 rounded-full bg-[#E55503]" />
              <p className="hero-reveal max-w-2xl text-base leading-relaxed text-gray-200 md:text-lg">
                Browse our available models for {categoryName}. High-quality
                equipment available for sale and rent.
              </p>
            </div>
            <div className="hero-reveal flex-shrink-0 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-center backdrop-blur">
              <p className="text-3xl font-extrabold text-[#FF8B28]">
                {products.length}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-gray-200">
                Models Available
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="block text-sm font-bold uppercase tracking-widest text-[#E55503]">
              Available Models
            </span>
            <span className="mb-2 mt-1.5 block h-[3px] w-10 rounded-full bg-[#E55503]" />
            <h2 className="text-2xl font-extrabold tracking-tight text-[#002253] md:text-3xl">
              All {categoryName} Models
            </h2>
          </div>
        </div>

        <div className="product-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${categorySlug}/${nameToSlug(product.title)}/${product._id}`}
              className="product-card group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E55503] hover:shadow-xl hover:shadow-[#E55503]/10"
            >
              <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[#f0f0f0]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {product.subTitle && (
                  <span className="absolute right-3 top-3 rounded-full bg-[#002253] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    {product.subTitle}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                {product.machineType && (
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#E55503]">
                    {product.machineType}
                  </p>
                )}
                <h3 className="mb-2 text-base font-extrabold text-[#002253] transition-colors duration-300 group-hover:text-[#E55503]">
                  {product.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500 line-clamp-2">
                  {product.description || "No description available."}
                </p>

                {/* Price + CTA */}
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                  <p className="text-lg font-extrabold text-[#002253]">
                    {product.price
                      ? `Tk ${product.price.toLocaleString()}`
                      : "Request Price"}
                  </p>
                  <span className="flex items-center gap-1.5 text-sm font-bold text-[#E55503] transition-all duration-300 group-hover:gap-2.5">
                    View Details <ArrowRightIcon />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
