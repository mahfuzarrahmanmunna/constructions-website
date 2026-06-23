"use client";

import React from "react";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

const MapContent = dynamic(() => import("./MapContent"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-[500px] rounded-2xl flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,34,83,0.03)" }}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: COLORS.orange, borderTopColor: "transparent" }}
        />
        <p
          className="text-sm font-medium"
          style={{ color: "rgba(0,34,83,0.4)" }}
        >
          Loading Map...
        </p>
      </div>
    </div>
  ),
});

const COLORS = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

const stats = [
  { value: "8", label: "Divisions Covered" },
  { value: "64", label: "Districts Reached" },
  { value: "150+", label: "Active Project Sites" },
  { value: "24/7", label: "Support Available" },
];

export default function BangladeshMapSection() {
  return (
    <section
      className="relative w-full px-4 md:px-8"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* subtle top border accent */}

      <div className="max-w-7xl mx-auto">
        {/* ═══ HEADER ═══ */}
        <div className=" md:mb-16 text-center">
          <div className="max-w-2xl mx-auto">
            <span
              className="inline-block text-[11px] font-bold tracking-[0.3em] uppercase mb-4"
              style={{ color: COLORS.orange }}
            >
              Coverage Map
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-tight mb-4"
              style={{ color: COLORS.navy }}
            >
              Our Presence Across
              <br />
              Bangladesh
            </h2>
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: "rgba(0,34,83,0.5)" }}
            >
              We provide nationwide service and support. Explore our operational
              bases across all major divisions and districts.
            </p>
          </div>
        </div>

        {/* ═══ MAP CONTAINER ═══ */}
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(0,34,83,0.08)",
          }}
        >
          <MapContent />
        </div>

        {/* ═══ STATS ROW ═══ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-0">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center py-6 md:py-8 text-center transition-colors duration-300"
              style={{
                borderRight:
                  i < stats.length - 1
                    ? "1px solid rgba(0,34,83,0.06)"
                    : "none",
                borderBottom: "1px solid rgba(0,34,83,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(229,85,3,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span
                className="text-2xl md:text-3xl font-extrabold mb-1"
                style={{ color: COLORS.orange }}
              >
                {stat.value}
              </span>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{ color: "rgba(0,34,83,0.45)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
