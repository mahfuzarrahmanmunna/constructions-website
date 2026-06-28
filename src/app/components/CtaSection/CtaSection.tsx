"use client";

import React, { useState } from "react";
import { MessageCircle, ArrowRight, Building2 } from "lucide-react";
import RequestQuoteModal from "../RequestQuoteForm/RequestQuoteForm";

const COLORS = {
  navy: "#002253",
  navyDark: "#00122e",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

export default function CtaSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* =========================
          CTA SECTION
          ========================= */}
      <section className="w-full py-0 px-4 md:px-8 select-none md:h-[180px] items-center justify-center flex ">
        <div
          className="max-w-7xl mx-auto rounded-2xl overflow-hidden relative"
          style={{ minHeight: "120px" }}
        >
          {/* ── background image ── */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('/cta.PNG')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* ── gradient overlay for readability ── */}
          {/* <div
            className="absolute inset-0 z-1"
            style={{
              background: `linear-gradient(
                105deg,
                rgba(30, 34, 83, 0.94) 10%,
                rgba(34, 75, 136, 0.88) 45%,
                rgba(34, 75, 136, 0.55) 75%,
                rgba(34, 75, 136, 0.3) 100%
              )`,
            }}
          /> */}

          {/* ── subtle decorative elements ── */}
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full z-[2] blur-3xl opacity-20"
            style={{ backgroundColor: COLORS.orangeLight }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full z-[2] blur-3xl opacity-10"
            style={{ backgroundColor: "#ffffff" }}
          />

          {/* ── content ── */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 p-8 md:p-12 lg:p-14">
            {/* Left Column */}
            <div className="flex flex-col sm:flex-row items-center md:items-center gap-5 w-full md:w-auto text-center sm:text-left">
              {/* Icon Badge */}
              <div className="shrink-0">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})`,
                    boxShadow: `0 8px 24px rgba(229, 85, 3, 0.35)`,
                  }}
                >
                  <Building2
                    className="text-white"
                    size={30}
                    strokeWidth={1.8}
                  />
                </div>
              </div>

              {/* Text */}
              <div className="space-y-2">
                <h2
                  className="text-2xl md:text-3xl lg:text-[2rem] font-extrabold tracking-tight leading-tight"
                  style={{ color: COLORS.navy }}
                >
                  Ready To Start Your{" "}
                  <span
                    className="relative inline-block"
                    style={{ color: COLORS.orangeLight }}
                  >
                    Project
                    <span
                      className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                      style={{
                        background: `linear-gradient(to right, ${COLORS.orange}, transparent)`,
                      }}
                    />
                  </span>
                  ?
                </h2>
                <p
                  className="text-sm md:text-[0.9rem] font-medium max-w-lg leading-relaxed"
                  style={{ color: COLORS.blue }}
                >
                  Get your free estimate today. Our team will contact you within
                  24 hours.
                </p>
              </div>
            </div>

            {/* Right Column: Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 justify-center">
              {/* Button 1: Get Free Estimate */}
              <button
                onClick={() => setIsOpen(true)}
                className="group px-7 py-3.5 text-white font-bold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:gap-3 active:scale-[0.97]"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})`,
                  boxShadow: `0 4px 16px rgba(229, 85, 3, 0.35)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 6px 28px rgba(229, 85, 3, 0.5)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(229, 85, 3, 0.35)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span>Get Free Estimate</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </button>

              {/* Button 2: WhatsApp Us */}
              <button
                onClick={() =>
                  window.open("https://wa.me/1234567890", "_blank")
                }
                className="group px-7 py-3.5 font-bold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.97]"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.4)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <MessageCircle
                  size={18}
                  className="transition-colors duration-300"
                  style={{ fill: "#25D366", color: "#25D366" }}
                />
                <span style={{color: COLORS.blue}}>WhatsApp Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          RENDER MODAL
          ========================= */}
      <RequestQuoteModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
