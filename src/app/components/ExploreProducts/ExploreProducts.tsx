"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// --- Color Palette Constants ---
const COLORS = {
  // Pantone 2768 C (Dark Navy Blue)
  blueDark: "#002253",
  // Pantone 2154 C (Royal Blue)
  blueMedium: "#224B88",
  // Pantone 1655 C (Deep Orange)
  orangeDark: "#E55503",
  // Pantone 1495 C (Bright Orange)
  orangeLight: "#FF8B28",
};

// --- Types ---

interface ProductSpec {
  label: string;
  value: string;
}

interface Product {
  id: number;
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  isHot?: boolean;
  specs: ProductSpec[];
  badge?: string;
}

// --- Mock Data ---

const productsData: Product[] = [
  {
    id: 1,
    title: "22 - 35T Medium Excavator",
    subtitle: "Premium Productivity With Lower Consumption",
    description:
      "Engineered for heavy-duty tasks while maintaining fuel efficiency. Ideal for construction and mining sites requiring reliable power.",
    image:
      "https://www.deere.co.uk/resource/image/511068/landscape_ratio2x1/1600/800/52c2d634d68e963f3f1f02209950edf8/51236DAE861D84993970A5555937D8CA/tractor-banner-new-jpg.webp",
    isHot: true,
    specs: [
      { label: "Bucket Capacity", value: "1.3 - 1.7 m³" },
      { label: "Engine Power", value: "122 - 212 kW" },
      { label: "Operating Weight", value: "22 - 35 T" },
    ],
  },
  {
    id: 2,
    title: "50T Large Mining Excavator",
    subtitle: "Unmatched Power for Extreme Conditions",
    description:
      "Designed for the toughest mining operations. Features advanced hydraulic systems and a reinforced structure for maximum durability.",
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?q=80&w=2070&auto=format&fit=crop",
    badge: "NEW",
    specs: [
      { label: "Bucket Capacity", value: "2.8 - 3.5 m³" },
      { label: "Engine Power", value: "300 - 350 kW" },
      { label: "Operating Weight", value: "48 - 52 T" },
    ],
  },
  {
    id: 3,
    title: "8T Compact Excavator",
    subtitle: "Versatility for Urban Projects",
    description:
      "Compact and agile, perfect for tight spaces and urban construction. Offers high performance in a small footprint.",
    image:
      "https://images.unsplash.com/photo-1621922688758-359fc864071e?q=80&w=1974&auto=format&fit=crop",
    isHot: true,
    specs: [
      { label: "Bucket Capacity", value: "0.3 - 0.4 m³" },
      { label: "Engine Power", value: "45 - 55 kW" },
      { label: "Operating Weight", value: "7.5 - 8.5 T" },
    ],
  },
];

// --- Sub-components ---

const Badge: React.FC<{ type: "hot" | "new" }> = ({ type }) => {
  // Using Orange Dark for Hot, Blue Medium for New to differentiate,
  // or strictly follow the palette. Let's use Orange Dark for Hot as primary.
  const isHot = type === "hot";
  const style = isHot
    ? `bg-[${COLORS.orangeDark}] text-white`
    : `bg-[${COLORS.blueMedium}] text-white`;

  return (
    <span
      className={`absolute top-4 left-4 z-10 px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-sm shadow-lg ${style}`}
    >
      {type === "hot" ? "HOT" : "NEW"}
    </span>
  );
};

const ProductCard: React.FC<{ product: Product; isReverse: boolean }> = ({
  product,
  isReverse,
}) => {
  return (
    <div
      className={`flex flex-col ${isReverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-stretch bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 min-h-[500px] transition-all duration-300 hover:shadow-2xl`}
    >
      {/* Image Section */}
      <div className="relative w-full lg:w-1/2 h-64 lg:h-auto overflow-hidden group bg-gray-100">
        {product.isHot && <Badge type="hot" />}
        {product.badge === "NEW" && <Badge type="new" />}

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 lg:p-12 bg-white">
        {/* Title: Blue Dark */}
        <h2 className="text-3xl lg:text-4xl font-bold text-[#002253] mb-3 font-sans">
          {product.title}
        </h2>

        {/* Subtitle: Blue Medium */}
        <p className="text-lg text-[#224B88] font-semibold mb-6">
          {product.subtitle}
        </p>

        {product.description && (
          <p className="text-gray-600 mb-8 leading-relaxed border-l-4 border-[#E55503] pl-4">
            {product.description}
          </p>
        )}

        {/* Specifications List */}
        <ul className="space-y-4 mb-10">
          {product.specs.map((spec, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-3 last:border-0"
            >
              <span className="text-[#002253] font-medium text-sm uppercase tracking-wide opacity-80">
                {spec.label}
              </span>
              {/* Value: Blue Medium */}
              <span className="font-bold text-[#224B88] text-xl mt-1 sm:mt-0">
                {spec.value}
              </span>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
          {/* Primary Button: Orange Dark -> Light on Hover */}
          <button className="px-8 py-3 bg-[#E55503] hover:bg-[#FF8B28] text-white font-semibold rounded shadow-md transition-colors duration-300 text-center">
            Inquiry
          </button>

          {/* Secondary Button: Blue Dark Border -> Fill on Hover */}
          <button className="px-8 py-3 bg-transparent border-2 border-[#002253] text-[#002253] hover:bg-[#002253] hover:text-white font-semibold rounded transition-all duration-300 text-center">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const ExploreProducts = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002253] mb-4">
            Explore Our Products
          </h2>
          {/* Decorative Line: Orange Dark */}
          <div className="w-20 h-1 bg-[#E55503] mx-auto rounded-full"></div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="pb-16 explore-swiper"
          style={
            {
              // Swiper Theme Colors
              "--swiper-navigation-color": COLORS.orangeDark,
              "--swiper-pagination-bullet-inactive-color": "#CBD5E1",
              "--swiper-pagination-color": COLORS.orangeDark,
            } as React.CSSProperties
          }
        >
          {productsData.map((product, index) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                // Alternate layout: Index 0 (Normal), Index 1 (Reverse), etc.
                isReverse={index % 2 !== 0}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ExploreProducts;
