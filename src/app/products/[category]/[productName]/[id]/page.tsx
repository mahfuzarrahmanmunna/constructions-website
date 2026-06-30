// src/app/products/[category]/[productName]/[id]/page.tsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RequestQuoteModal from "@/app/components/RequestQuoteForm/RequestQuoteForm";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Consistent slug generator
const slugify = (text: string) =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const CheckIcon = () => (
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
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
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

// Helper for YouTube URLs
const getYouTubeEmbedUrl = (url: string) => {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const pageRef = useRef<HTMLDivElement>(null);

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.products || [];
        const current = items.find((p: any) => p._id === id);

        if (current) {
          setProduct(current);
          const related = items
            .filter((p: any) => p.category === current.category && p._id !== id)
            .slice(0, 3);
          setRelatedProducts(related);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (loading || !product) return;
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
  }, [loading, product]);

  if (!loading && !product) notFound();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fb]">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-[#E55503] rounded-full animate-spin"></div>
      </div>
    );

  return (
    <main ref={pageRef} className="min-h-screen bg-[#f8f9fb] font-sans">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-24 md:px-8 md:pb-12 md:pt-32">
        <Link
          href={`/products/${slugify(product.category)}`}
          className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#002253] transition-colors hover:text-[#E55503]"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>{" "}
          Back to {product.category}
        </Link>

        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left — Image */}
          <div className="detail-reveal overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#f0f0f0] p-8 md:h-96">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="text-gray-400 text-6xl">🔧</div>
              )}
              {product.machineType && (
                <span className="absolute left-4 top-4 rounded-full bg-[#002253] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  {product.machineType}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Type:{" "}
                <span className="text-[#002253]">
                  {product.machineType || "N/A"}
                </span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                ID:{" "}
                <span className="text-[#002253]">{product._id.slice(-6)}</span>
              </span>
            </div>
          </div>

          {/* Right — Details */}
          <div className="detail-reveal flex flex-col">
            <span className="text-sm font-bold uppercase tracking-widest text-[#E55503]">
              {product.category}
            </span>
            <span className="mb-3 mt-1.5 block h-[3px] w-10 rounded-full bg-[#E55503]" />
            <h1 className="mb-3 text-2xl font-extrabold leading-tight tracking-tight text-[#002253] md:text-3xl">
              {product.title}
            </h1>
            {product.subTitle && (
              <p className="mb-4 text-sm font-medium text-[#224B88]">
                {product.subTitle}
              </p>
            )}
            <p className="mb-6 text-sm leading-relaxed text-gray-500">
              {product.description ||
                "No detailed description provided for this product yet."}
            </p>

            {/* Price Banner */}
            <div className="relative mb-6 flex items-center justify-between overflow-hidden rounded-xl bg-[#002253] px-6 py-4">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#E55503]/20 blur-2xl" />
              <span className="relative text-sm font-semibold text-gray-300">
                Price
              </span>
              <span className="relative text-2xl font-extrabold text-white">
                {product.price
                  ? `Tk ${product.price.toLocaleString()}`
                  : "Call for Price"}
              </span>
            </div>

            {/* Dynamic Features Section */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#002253]">
                  Key Features
                </h3>
                <ul className="space-y-2.5">
                  {product.features.map((feat: any, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-gray-600"
                    >
                      <span className="mt-0.5 text-[#E55503]">
                        <CheckIcon />
                      </span>
                      <span>
                        {typeof feat === "string"
                          ? feat
                          : feat.text || feat.name || JSON.stringify(feat)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Dynamic Specs Section */}
            {product.specs && product.specs.length > 0 && (
              <div className="mb-6 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#002253]">
                  Key Specifications
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {product.specs.map((spec: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b border-gray-50 py-2 last:border-0"
                    >
                      <span className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="text-[#E55503]">
                          <CheckIcon />
                        </span>
                        {spec.label || spec.key}
                      </span>
                      <span className="text-sm font-extrabold text-[#002253]">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="mt-auto flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setInquiryOpen(true)}
                className="group relative flex-1 overflow-hidden rounded-xl bg-[#E55503] py-3.5 text-sm font-extrabold uppercase tracking-wider text-white shadow-lg shadow-[#E55503]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#cc4a03] hover:shadow-xl hover:shadow-[#E55503]/30"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%]" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <MailIcon /> Get a Quote
                </span>
              </button>
              <a
                href="tel:+8801700000000"
                className="group relative flex-1 overflow-hidden rounded-xl border-2 border-[#002253] py-3.5 text-sm font-extrabold uppercase tracking-wider text-[#002253] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#002253] hover:text-white"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%]" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <PhoneIcon /> Call Now
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic Gallery Images Section */}
        {product.galleryImages && product.galleryImages.length > 0 && (
          <div className="detail-reveal mb-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-[#002253]">
              Product Gallery
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {product.galleryImages.map((img: string, i: number) => (
                <div
                  key={i}
                  className="group/img relative aspect-square overflow-hidden rounded-xl bg-[#f0f0f0] border border-slate-50"
                >
                  <img
                    src={img}
                    alt={`${product.title} gallery ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Gallery Videos Section */}
        {product.galleryVideos && product.galleryVideos.length > 0 && (
          <div className="detail-reveal mb-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-[#002253]">
              Video Walkthrough
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.galleryVideos.map((vid: string, i: number) => {
                const embedUrl = getYouTubeEmbedUrl(vid);
                return embedUrl ? (
                  <div
                    key={i}
                    className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-xl bg-slate-900 shadow-inner"
                  >
                    <iframe
                      src={embedUrl}
                      title={`Video ${i + 1}`}
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Dynamic Brochure Download Section */}
        {product.brochure && (
          <div className="detail-reveal mb-10">
            <a
              href={product.brochure}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#224B88] bg-white py-5 text-sm font-bold uppercase tracking-wider text-[#224B88] transition-all duration-300 hover:bg-[#224B88] hover:text-white hover:shadow-lg"
            >
              <DownloadIcon /> Download Product Brochure (PDF)
            </a>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="mb-6">
              <span className="text-sm font-bold uppercase tracking-widest text-[#E55503]">
                You may also like
              </span>
              <span className="mb-2 mt-1.5 block h-[3px] w-10 rounded-full bg-[#E55503]" />
              <h2 className="text-xl font-extrabold tracking-tight text-[#002253] md:text-2xl">
                Other {product.category} Models
              </h2>
            </div>
            <div className="related-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/products/${slugify(rel.category)}/${slugify(rel.title)}/${rel._id}`}
                  className="related-reveal group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E55503] hover:shadow-xl hover:shadow-[#E55503]/10"
                >
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f0f0f0]">
                    {rel.image ? (
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="h-[80%] w-[80%] object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="text-gray-400 text-2xl">🔧</div>
                    )}
                  </div>
                  <div className="min-w-0">
                    {rel.machineType && (
                      <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-[#E55503]">
                        {rel.machineType}
                      </p>
                    )}
                    <h4 className="mb-1 truncate text-sm font-extrabold leading-tight text-[#002253] transition-colors group-hover:text-[#E55503]">
                      {rel.title}
                    </h4>
                    <p className="flex items-center gap-1.5 text-sm font-bold text-[#002253]">
                      {rel.price
                        ? `Tk ${rel.price.toLocaleString()}`
                        : "Call for Price"}
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

      <RequestQuoteModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />
    </main>
  );
}
