import React from "react";
import { Product } from "./types";
import ProductCard from "./ProductCard";

// Icons (Lucide-React or Heroicons would be used in a real project, using SVG here for standalone example)
const TruckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
);

const ArrowRight = () => (
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
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const CheckIcon = () => (
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
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// --- Data ---
const products: Product[] = [
  {
    id: "below-45",
    title: "Below 45T",
    description: "Compact and efficient for urban environments.",
    image: "https://picsum.photos/seed/cpl1/600/400.jpg",
    specs: [
      { label: "Max Lifting Capacity", value: "25T - 45T" },
      { label: "Max Boom Length", value: "38m - 44m" },
    ],
    models: ["CPL-200", "CPL-250", "CPL-400"],
  },
  {
    id: "mid-range",
    title: "50 - 90T",
    description: "The perfect balance of power and versatility.",
    image: "https://picsum.photos/seed/cpl2/600/400.jpg",
    specs: [
      { label: "Max Lifting Capacity", value: "50T - 90T" },
      { label: "Max Boom Length", value: "48m - 62m" },
    ],
    models: ["CPL-500", "CPL-800", "CPL-900"],
  },
  {
    id: "over-90",
    title: "Over 90T",
    description: "Heavy-duty performance for major projects.",
    image: "https://picsum.photos/seed/cpl3/600/400.jpg",
    specs: [
      { label: "Max Lifting Capacity", value: "100T - 130T" },
      { label: "Max Boom Length", value: "70m - 80m" },
    ],
    models: ["CPL-1000", "CPL-1200", "CPL-1300"],
  },
];

const services = [
  "Service Support",
  "Spare Parts",
  "Maintenance",
  "Technical Training",
  "Remote Diagnostics",
];

const ProductsPage = () => {
  return (
    <main className="min-h-screen font-sans bg-slate-50">
      {/* 1. Hero Section */}
      <section className="bg-[#002253] text-white py-20 lg:py-28 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <span className="text-[#FF8B28] font-semibold tracking-wider uppercase mb-4 text-sm">
            Heavy Machinery Excellence
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-5xl">
            CPL Crane Trucks: Power, Precision & Reliability on Every Job
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-3xl">
            Engineered for the toughest conditions. CPL truck cranes deliver
            superior lifting capacity and advanced control systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#E55503] hover:bg-[#FF8B28] text-white px-8 py-4 rounded font-semibold transition-all duration-300 flex items-center justify-center gap-2">
              Find Your Dealer <ArrowRight />
            </button>
            <button className="border border-white hover:bg-white hover:text-[#002253] text-white px-8 py-4 rounded font-semibold transition-all duration-300">
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      {/* 2. Category Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-8 py-4 no-scrollbar">
            {[
              { name: "Truck Cranes", active: true },
              { name: "All Terrain", active: false },
              { name: "Rough Terrain", active: false },
            ].map((tab, idx) => (
              <button
                key={idx}
                className={`flex items-center gap-3 whitespace-nowrap pb-2 border-b-2 transition-colors duration-200 ${
                  tab.active
                    ? "border-[#E55503] text-[#002253] font-bold"
                    : "border-transparent text-gray-500 hover:text-[#224B88]"
                }`}
              >
                <span
                  className={`p-2 rounded-full ${tab.active ? "bg-[#E55503]/10 text-[#E55503]" : "bg-gray-100 text-gray-400"}`}
                >
                  <TruckIcon />
                </span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Product Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-[#002253]">
            Truck Crane Series
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Service Section */}
      <section className="bg-[#002253] text-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-bold mb-4">Service & Support</h2>
              <p className="text-gray-400 mb-6">
                We provide global support for all CPL equipment. Our team is
                dedicated to keeping your operations running smoothly.
              </p>
              <a
                href="#"
                className="text-[#FF8B28] font-bold flex items-center gap-2 group hover:gap-3 transition-all"
              >
                Contact Support <ArrowRight />
              </a>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-[#002a66] hover:bg-[#003380] transition-colors cursor-pointer"
                >
                  <div className="mt-1 text-[#E55503]">
                    <CheckIcon />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{service}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
