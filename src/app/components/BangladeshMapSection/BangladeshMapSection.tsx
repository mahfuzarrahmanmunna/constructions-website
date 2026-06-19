"use client";

import React from "react";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

// Dynamic Import with SSR disabled (Fixes the 'window is not defined' error)
const MapContent = dynamic(() => import("./MapContent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 rounded-2xl flex items-center justify-center">
      <p className="text-gray-500 animate-pulse">Loading Map...</p>
    </div>
  ),
});

// --- Color Palette Constants ---
const COLORS = {
  navy: "#002253",
  orange: "#E55503",
};

export default function BangladeshMapSection() {
  return (
    <section className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-[#E55503] font-bold tracking-[0.2em] uppercase text-sm mb-2 block">
            Coverage Map
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#002253] tracking-tight mb-4">
            Our Presence Across Bangladesh
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide nationwide service and support. Explore our operational
            bases in all major divisions.
          </p>
        </div>

        {/* The Map (Rendered Dynamically) */}
        <MapContent />

        {/* Legend/Info */}
        <div className="mt-6 flex justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#E55503]"></div>
            <span>Active Division</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#002253] border-2 border-white"></div>
            <span>Regional Office</span>
          </div>
        </div>
      </div>
    </section>
  );
}
