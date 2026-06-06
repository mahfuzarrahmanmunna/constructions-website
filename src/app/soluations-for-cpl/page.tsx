"use client";

import React, { useState } from "react";
import RequestQuoteForm from "../components/RequestQuoteForm/RequestQuoteForm";

// --- 1. STRICT COLOR PALETTE (From your request) ---
const PALETTE = {
  navy: "#002253", // Pantone 2768 C (Primary Background)
  blue: "#224B88", // Pantone 2154 C (Secondary Background/Accents)
  orange: "#E55503", // Pantone 1655 C (Deep Accent)
  orangeLight: "#FF8B28", // Pantone 1495 C (Bright Call-to-Action)
  white: "#FFFFFF",
  gray: "#F3F4F6",
};

// --- 2. DATA CONTENT ---

// Product Data adapted to your 2x2 Grid Pattern
const showcaseItems = [
  {
    id: 1,
    title: "SY16C Mini Excavator",
    description: "Mini in Size, Multi in Use. Ideal for tight spaces.",
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "SY26U Ultra Short",
    description: "Zero Tail Swing. Powerful, Speedy & Fuel Efficient.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "SY35U Heavy Duty",
    description: "Compact structure with enhanced lifting capacity.",
    image:
      "https://images.unsplash.com/photo-1621922688758-359fc864071e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "CPL Full Range",
    description: "From Mini Excavators to Large Scale Machinery.",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=800&auto=format&fit=crop",
  },
];

const features = [
  {
    title: "Compact Design",
    text: "Engineered for narrow urban environments.",
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?q=80&w=600",
  },
  {
    title: "Fuel Efficiency",
    text: "Advanced hydraulics for lower consumption.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600",
  },
  {
    title: "Operator Comfort",
    text: "Spacious cabin with ergonomic controls.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600",
  },
];

// --- 3. MAIN COMPONENT ---

export default function CPLPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you! Your quote request has been received.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <main className="w-full font-sans text-slate-800 bg-white">
      {/* --- HERO SECTION (Navy Background + Overlay Style) --- */}
      <section
        className="relative w-full h-[85vh] flex items-center justify-center"
        style={{ backgroundColor: PALETTE.navy }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2000&auto=format&fit=crop"
            alt="CPL Excavator Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <h2
            className="text-lg md:text-xl font-bold tracking-[0.2em] mb-4 uppercase"
            style={{ color: PALETTE.orangeLight }}
          >
            CPL Heavy Industry
          </h2>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight uppercase">
            Mini Excavators
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
            Engineered for precision. Built to last.
          </p>

          <button
            className="uppercase font-bold py-4 px-10 rounded-sm transition duration-300 tracking-wider hover:brightness-110 shadow-lg"
            style={{
              backgroundColor: PALETTE.orangeLight,
              color: PALETTE.navy,
            }}
          >
            Request a Quote
          </button>
        </div>
      </section>

      {/* --- FEATURES SECTION (Using the Card Pattern) --- */}
      <section className="w-full py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide"
              style={{ color: PALETTE.navy }}
            >
              Why Choose CPL?
            </h2>
            <div
              className="w-20 h-1 rounded-full"
              style={{ backgroundColor: PALETTE.orange }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <div
                key={index}
                className="group relative h-[400px] rounded-xl overflow-hidden shadow-lg"
              >
                {/* Image + Dark Gradient */}
                <div className="absolute inset-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002253] via-[#002253]/80 to-transparent opacity-95" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 transform transition-transform duration-300 group-hover:-translate-y-2">
                  {/* Expanding Bar */}
                  <div
                    className="w-12 h-1 mb-4 rounded-full transition-all duration-300 w-12 group-hover:w-full"
                    style={{ backgroundColor: PALETTE.orangeLight }}
                  ></div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-lg font-medium">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SHOWCASE / PRODUCT RANGE (Your Provided Pattern) --- */}
      <section className="w-full py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide"
                style={{ color: PALETTE.navy }}
              >
                Featured Equipment
              </h2>
              <div
                className="w-20 h-1 rounded-full"
                style={{ backgroundColor: PALETTE.orange }}
              ></div>
            </div>
            <div className="hidden md:block text-right">
              <span
                className="text-sm font-bold uppercase tracking-wider"
                style={{ color: PALETTE.blue }}
              >
                Explore Full Catalog &rarr;
              </span>
            </div>
          </div>

          {/* 2x2 Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {showcaseItems.map((item) => (
              <div
                key={item.id}
                className="group relative h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-lg"
              >
                {/* Background Image with Zoom Effect */}
                <div className="absolute inset-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Dark Overlay Gradient for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002253] via-[#002253]/40 to-transparent opacity-90" />
                </div>

                {/* Content Overlay - Positioned Bottom */}
                <div className="absolute bottom-0 left-0 w-full p-8 transform transition-transform duration-300 group-hover:-translate-y-2">
                  {/* Colored Accent Bar (Orange) */}
                  <div
                    className="w-12 h-1 mb-4 rounded-full transition-all duration-300 w-12 group-hover:w-full"
                    style={{ backgroundColor: PALETTE.orangeLight }}
                  ></div>

                  {/* Text Content */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                    {item.title}
                  </h3>

                  <p
                    className="text-lg font-medium"
                    style={{ color: PALETTE.orangeLight }}
                  >
                    {item.description}
                  </p>

                  {/* Hover Button */}
                  <div className="mt-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <button className="text-white cursor-pointer text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:text-[#FF8B28] transition-colors">
                      View Specs
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
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* --- CONTACT FORM (Navy/Orange Theme) --- */}
      <section className="py-24 bg-white">
       <RequestQuoteForm/>
      </section>
    </main>
  );
}
