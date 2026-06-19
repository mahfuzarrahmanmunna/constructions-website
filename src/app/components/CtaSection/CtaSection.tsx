"use client";

import React, { useState } from "react";
import { FileText, MessageCircle } from "lucide-react";
import RequestQuoteModal from "../RequestQuoteForm/RequestQuoteForm";

export default function CtaSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* =========================
          CTA SECTION (Compact & Professional)
          ========================= */}
      <section className="w-full bg-[#002253] py-10 md:py-12 px-4 relative overflow-hidden border-t border-white/5">
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#E55503]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Side: Content (Span 7 cols) */}
            <div className="md:col-span-7 flex flex-col md:flex-row items-start md:items-center gap-6 text-center md:text-left">
              <div className="shrink-0">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <FileText className="text-[#E55503]" size={32} />
                </div>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                  Ready To Start Your Project?
                </h2>
                <p className="text-sm md:text-base text-gray-400 font-medium max-w-md mx-auto md:mx-0">
                  Get your free estimate today. Our team will contact you within
                  24 hours.
                </p>
              </div>
            </div>

            {/* Right Side: Buttons (Span 5 cols) */}
            <div className="md:col-span-5 flex flex-col sm:flex-row gap-3 justify-center md:justify-end w-full">
              {/* Button 1: Get Free Estimate */}
              <button
                onClick={() => setIsOpen(true)}
                className="group px-6 py-3 bg-[#E55503] text-white font-bold text-sm md:text-base rounded-lg shadow-[0_4px_15px_rgba(229,85,3,0.3)] hover:shadow-[0_6px_20px_rgba(229,85,3,0.5)] transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">Get Free Estimate</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#E55503] to-[#FF8B28] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              {/* Button 2: WhatsApp Us */}
              <button
                onClick={() =>
                  window.open("https://wa.me/1234567890", "_blank")
                }
                className="px-6 py-3 bg-white text-[#002253] font-bold text-sm md:text-base rounded-lg shadow-md hover:bg-gray-50 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 border border-gray-100"
              >
                <MessageCircle className="text-[#25D366]" size={20} />
                <span className="hidden sm:inline">WhatsApp Us</span>
                <span className="sm:hidden">Chat</span>
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
