"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getCategoryInfo, getProduct } from "@/lib/categoryData";
import { notFound } from "next/navigation";
import { useState } from "react";

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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductDetailPage() {
  const params = useParams();
  const category    = params.category as string;
  // productName param is in the URL for readability but we fetch by id
  const id          = Number(params.id);

  const categoryInfo = getCategoryInfo(category);
  const product      = getProduct(category, id);

  if (!categoryInfo || !product) notFound();

  const [inquiryOpen, setInquiryOpen] = useState(false);

  // Related products (exclude current)
  const relatedProducts = categoryInfo.products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  // Helper for related product links
  const nameToSlug = (name: string) => name.trim().replace(/\s+/g, "-");

  return (
    <main className="min-h-screen bg-[#f8f9fb] font-sans">

      {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
      <div className="bg-[#002253] text-white py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
            <span>/</span>
            <Link href={`/products/${category}`}
              className="hover:text-white transition-colors">{categoryInfo.label}</Link>
            <span>/</span>
            <span className="text-[#FF8B28]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* Back link */}
        <Link href={`/products/${category}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#002253] hover:text-[#E55503] transition-colors mb-8">
          ← Back to {categoryInfo.label}
        </Link>

        {/* ── Main Product Panel ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          {/* Left — Image */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="relative bg-[#f0f0f0] h-72 md:h-96 flex items-center justify-center p-8">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              <span className={`absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${
                product.condition === "New"
                  ? "bg-green-100 text-green-700"
                  : product.condition === "Used"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-blue-700"
              }`}>
                {product.condition}
              </span>
            </div>
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                Model: <span className="text-[#002253]">{product.model}</span>
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                Year: <span className="text-[#002253]">{product.year}</span>
              </span>
              <span className={`text-xs font-bold uppercase ${product.available ? "text-green-600" : "text-red-500"}`}>
                {product.available ? "● In Stock" : "● Out of Stock"}
              </span>
            </div>
          </div>

          {/* Right — Details */}
          <div className="flex flex-col">
            <p className="text-xs text-[#E55503] font-bold uppercase tracking-widest mb-2">
              {categoryInfo.label}
            </p>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#002253] mb-3 leading-tight">
              {product.name}
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{product.description}</p>

            {/* Price */}
            <div className="bg-[#002253] rounded-xl px-6 py-4 mb-6 flex items-center justify-between">
              <span className="text-gray-300 text-sm font-semibold">Starting Price</span>
              <span className="text-2xl font-extrabold text-white">{product.price}</span>
            </div>

            {/* Specs */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
              <h3 className="text-xs font-bold text-[#002253] uppercase tracking-widest mb-4">
                Key Specifications
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {product.specs.map((spec) => (
                  <div key={spec.label}
                    className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
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
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <button
                onClick={() => setInquiryOpen(true)}
                className="flex-1 bg-[#E55503] hover:bg-[#FF8B28] text-white py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-colors duration-300 flex items-center justify-center gap-2">
                <MailIcon /> Get a Quote
              </button>
              <a href="tel:+8801700000000"
                className="flex-1 border-2 border-[#002253] text-[#002253] hover:bg-[#002253] hover:text-white py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2">
                <PhoneIcon /> Call Now
              </a>
            </div>
          </div>
        </div>

        {/* ── Related Products ─────────────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-5 w-1 bg-[#E55503] rounded-full" />
              <h2 className="text-xl font-extrabold text-[#002253]">
                Other {categoryInfo.label} Models
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedProducts.map((rel) => (
                <Link key={rel.id}
                  // ✅ Route: /products/concrete-machinery/Concrete-Pump-Truck/1
                  href={`/products/${category}/${nameToSlug(rel.name)}/${rel.id}`}
                  className="group bg-white rounded-xl border border-gray-100 hover:border-[#E55503]/30 hover:shadow-lg transition-all duration-300 flex gap-4 p-4 items-center">
                  <div className="w-20 h-20 bg-[#f0f0f0] rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                    <img src={rel.image} alt={rel.name}
                      className="w-[80%] h-[80%] object-contain group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-[#E55503] font-bold uppercase tracking-wider mb-0.5">{rel.model}</p>
                    <h4 className="text-sm font-extrabold text-[#002253] group-hover:text-[#E55503] transition-colors leading-tight mb-1 truncate">
                      {rel.name}
                    </h4>
                    <p className="text-sm font-bold text-[#002253]">{rel.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Inquiry Modal ───────────────────────────────────────────────────── */}
      {inquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setInquiryOpen(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-extrabold text-[#002253] mb-1">Request a Quote</h3>
            <p className="text-xs text-gray-400 mb-5">
              {product.name} ({product.model})
            </p>
            <div className="space-y-3">
              <input type="text" placeholder="Your Name"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E55503] transition-colors" />
              <input type="email" placeholder="Email Address"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E55503] transition-colors" />
              <input type="tel" placeholder="Phone Number"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E55503] transition-colors" />
              <textarea placeholder="Additional requirements..."
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E55503] transition-colors resize-none" />
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setInquiryOpen(false)}
                className="flex-1 border border-gray-200 text-gray-500 py-3 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button className="flex-1 bg-[#E55503] text-white py-3 rounded-xl text-sm font-extrabold uppercase tracking-wider hover:bg-[#FF8B28] transition-colors">
                Send Inquiry
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}