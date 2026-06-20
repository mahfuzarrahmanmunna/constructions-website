"use client";

import React, { useState } from "react";
import { FileText, MessageCircle } from "lucide-react";
import RequestQuoteModal from "../RequestQuoteForm/RequestQuoteForm";

export default function CtaSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* =========================
          CTA SECTION
          ========================= */}
      <section className="w-full bg-white py-4 px-4 md:px-8 select-none ">
        <div className="max-w-7xl mx-auto bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left Column: Icon + Text Container */}
            <div className="flex flex-col sm:flex-row items-center md:items-center gap-5 w-full md:w-auto text-center sm:text-left">
              {/* Image Dynamic Left Document Icon */}
              <div className="shrink-0">
                <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-sm">
                  <FileText className="text-[#F97316]" size={36} strokeWidth={1.5} />
                </div>
              </div>

              {/* Title & Paragraph Header Line */}
              <div className="space-y-1.5">
                <h2 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">
                  Ready To Start Your Project?
                </h2>
                <p className="text-sm md:text-sm text-slate-700 font-medium max-w-lg">
                  Get your free estimate today. Our team will contact you within 24 hours.
                </p>
              </div>
            </div>

            {/* Right Column: Actions Action Buttons Block */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 justify-center">
              {/* Button 1: Get Free Estimate */}
              <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-3.5 bg-[#F97316] text-white font-bold text-sm rounded-xl transition-all duration-200 active:scale-[0.98] shadow-sm hover:bg-orange-600"
              >
                Get Free Estimate
              </button>

              {/* Button 2: WhatsApp Us */}
              <button
                onClick={() => window.open("https://wa.me/1234567890", "_blank")}
                className="px-6 py-3.5 bg-white text-[#F97316] border border-[#F97316] font-bold text-sm rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 hover:bg-orange-50/40"
              >
                <MessageCircle size={18} className="fill-[#F97316] text-[#F97316]" />
                <span>WhatsApp Us</span>
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