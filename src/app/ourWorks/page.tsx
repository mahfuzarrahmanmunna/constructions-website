/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { caseStudies, CaseStudy } from "./casesData";
import {
  MapPin,
  Calendar,
  Building2,
  ArrowRight,
  X,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Colors match globals.css / color.md
const PALETTE = {
  navy: "#002253", // Pantone 2768 C
  blue: "#224B88", // Pantone 2154 C
  orange: "#E55503", // Pantone 1655 C
  orangeLight: "#FF8B28", // Pantone 1495 C
  white: "#FFFFFF",
  grayBg: "#F8FAFC",
};

const categories = [
  "Civil Constructions",
  "Construction Materials Supply",
  "Construction Equipment Services",
];

// Animation Variants for Scroll Trigger
const slideUpVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 15,
      mass: 0.8,
    },
  },
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const gridRightVariants = {
  hidden: { opacity: 0, x: 65, scale: 0.98 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 15,
    },
  },
};

export default function OurWorksPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Civil Constructions");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  // Filter case studies by selected category
  const filteredCases = caseStudies.filter(
    (c) => c.category === activeCategory
  );

  // Manage body overflow with useEffect instead of direct event modification to comply with react-hooks/immutability
  useEffect(() => {
    if (selectedCase) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCase]);

  const handleOpenModal = (study: CaseStudy) => {
    setSelectedCase(study);
  };

  const handleCloseModal = () => {
    setSelectedCase(null);
  };

  return (
    <main className="w-full font-sans text-[#002253] bg-slate-50 min-h-screen pb-20">
      {/* ── SANY-STYLE HERO BANNER (case-section-0) ── */}
      <section
        className="relative w-full h-[45vh] min-h-[520px] flex flex-col justify-center items-center overflow-hidden bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2000&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-[#002253]/85 z-[1]" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-[0.25em] uppercase mb-4 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full inline-block"
            style={{ color: PALETTE.orangeLight }}
          >
            CPL Project Portfolios
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-wider mb-4 leading-tight"
          >
            Construction Cases
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl md:text-2xl font-bold tracking-wide uppercase" style={{ color: PALETTE.orangeLight }}>
                {activeCategory}
              </span>
            </div>
            <div
              className="w-24 h-1.5 mt-4 rounded-full"
              style={{ backgroundColor: PALETTE.orange }}
            ></div>
          </motion.div>
        </div>
      </section>

      {/* ── SANY-STYLE PRODUCT CHOOSE BAR ── */}
      <div className="bg-white border-b border-slate-200/80 py-5 px-6 md:px-12 sticky top-[118px] z-30 shadow-[0_2px_15px_rgba(0,34,83,0.04)]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-sm font-extrabold uppercase tracking-widest text-[#002253] flex items-center gap-2">
            <span className="w-2.5 h-4 bg-[#E55503] block rounded-sm"></span>
            Please Choose Business Division
          </div>
          
          <div className="flex overflow-x-auto whitespace-nowrap gap-2 w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none justify-start lg:justify-end">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm border cursor-pointer relative overflow-hidden"
                  style={{
                    borderColor: isActive ? "#E55503" : "#E2E8F0",
                    color: isActive ? "#FFFFFF" : "#002253",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBackground"
                      className="absolute inset-0 bg-[#E55503] z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── ALTERNATING PROJECTS SECTION ── */}
      <section className="w-full py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-16"
            >
              {filteredCases.length === 0 ? (
                <div className="w-full py-20 text-center bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-slate-500 font-medium">No project cases catalogued for this category yet.</p>
                </div>
              ) : (
                filteredCases.map((study, index) => {
                  
                  // 1. FULL WIDTH BLOCK (Sany index 0, index 4 style)
                  if (index === 0 || index === 4) {
                    const textLeft = index === 0;
                    return (
                      <motion.div
                        key={study.id}
                        variants={slideUpVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        whileHover={{ y: -6 }}
                        onClick={() => handleOpenModal(study)}
                        className="group relative h-[450px] md:h-[520px] rounded-2xl overflow-hidden shadow-lg cursor-pointer border border-slate-200/50 transition-all duration-300 hover:shadow-2xl bg-white"
                      >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                          <img
                            src={study.image}
                            alt={study.title}
                            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                          />
                          {/* Dark overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#002253]/95 via-[#002253]/45 to-transparent z-[1]" />
                        </div>

                        {/* Floating Info Box inside Banner */}
                        <div
                          className={[
                            "absolute bottom-0 p-6 md:p-12 w-full md:max-w-2xl text-white z-10 transition-transform duration-300 group-hover:-translate-y-1.5",
                            textLeft ? "left-0" : "right-0 text-right md:items-end md:flex md:flex-col",
                          ].join(" ")}
                        >
                          <div className={[
                            "flex items-center gap-3.5 mb-4",
                            textLeft ? "justify-start" : "justify-end",
                          ].join(" ")}>
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF8B28] bg-white/10 backdrop-blur-md px-2.5 py-1 border border-white/10 rounded-sm">
                              {study.category}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                              <MapPin className="h-3.5 w-3.5 text-[#FF8B28]" />
                              {study.location}
                            </div>
                          </div>

                          <h2 className="text-2xl md:text-4xl font-black uppercase mb-4 leading-tight tracking-wide group-hover:text-[#FF8B28] transition-colors duration-300">
                            {study.title}
                          </h2>
                          
                          <div className="w-16 h-1 mb-5 rounded-full bg-[#E55503] transition-all duration-300 group-hover:w-full" />

                          <p className={[
                            "text-slate-300 text-xs md:text-sm font-light leading-relaxed mb-6 line-clamp-2 max-w-xl",
                            textLeft ? "text-left" : "text-right",
                          ].join(" ")}>
                            {study.description}
                          </p>

                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-[#E55503] text-white px-3.5 py-2 rounded-sm shadow-md">
                              {study.stats}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest border border-white/30 text-slate-100 px-3.5 py-2 rounded-sm backdrop-blur-sm">
                              {study.duration}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  }

                  // 2. SPLIT PANEL BLOCK (Sany index 3 / four-box style)
                  // 2. SPLIT PANEL BLOCK (Sany index 3 / four-box style)
                  if (index === 3) {
                    return (
                      <motion.div
                        key={study.id}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        whileHover={{ y: -6 }}
                        onClick={() => handleOpenModal(study)}
                        className="group bg-white rounded-2xl border border-slate-200/70 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-[1.2fr_1.1fr] min-h-[440px] cursor-pointer hover:shadow-2xl transition-all duration-500"
                      >
                        {/* Left side Image with Zoom (slides from left) */}
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, x: -75 },
                            show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
                          }}
                          className="relative h-64 lg:h-full min-h-[300px] overflow-hidden w-full"
                        >
                          <img
                            src={study.image}
                            alt={study.title}
                            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                          />
                          <div className="absolute inset-0 bg-[#002253]/10 group-hover:bg-transparent transition-colors duration-300" />
                        </motion.div>

                        {/* Right side colored panel (slides from right) */}
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, x: 75 },
                            show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
                          }}
                          className="p-8 lg:p-12 bg-[#002253] text-white flex flex-col justify-between items-start w-full h-full"
                        >
                          <div className="w-full">
                            <div className="flex items-center gap-3.5 mb-4">
                              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF8B28]">
                                {study.category}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-300 flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5 text-[#FF8B28]" />
                                {study.location}
                              </span>
                            </div>
                            
                            <h2 className="text-2xl md:text-3xl font-black uppercase mb-4 leading-tight tracking-wide group-hover:text-[#FF8B28] transition-colors duration-300">
                              {study.title}
                            </h2>

                            <div className="w-16 h-1 mb-6 rounded-full bg-[#E55503] transition-all duration-350 group-hover:w-full" />

                            <p className="text-slate-300 text-sm font-light leading-relaxed mb-8">
                              {study.description}
                            </p>

                            <div className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-wrap gap-4 justify-between items-center w-full">
                              <div>
                                <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Project Metric</span>
                                <span className="text-lg font-black text-[#FF8B28] mt-1 block">{study.stats}</span>
                              </div>
                              <div>
                                <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Duration</span>
                                <span className="text-lg font-black text-white mt-1 block">{study.duration}</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-8 text-xs font-bold uppercase tracking-wider text-[#FF8B28] flex items-center gap-2">
                            View Project Details
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  }

                  // 3. TWO-COLUMN GRID CARDS (Sany index 1, 2, 5, 6 / both-one style)
                  if (index === 2 || index === 6) {
                    return null;
                  }

                  const nextStudy = filteredCases[index + 1];
                  return (
                    <motion.div
                      key={study.id}
                      variants={gridContainerVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.15 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                      {/* Card 1 */}
                      <motion.div
                        variants={slideUpVariants}
                        whileHover={{ y: -6 }}
                        onClick={() => handleOpenModal(study)}
                        className="group bg-white rounded-2xl border border-slate-200/50 shadow-md overflow-hidden flex flex-col justify-between h-full hover:shadow-xl transition-all duration-[400ms] ease-out cursor-pointer"
                      >
                        <div>
                          <div className="relative h-[250px] overflow-hidden">
                            <img
                              src={study.image}
                              alt={study.title}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs text-white font-medium">
                              <MapPin className="h-3 w-3 text-[#FF8B28]" />
                              {study.location}
                            </div>
                          </div>

                          <div className="p-6 md:p-8">
                            <span className="text-[10px] font-bold uppercase tracking-wider block mb-2" style={{ color: PALETTE.orange }}>
                              {study.category}
                            </span>
                            <h4 className="text-lg md:text-xl font-bold mb-4 uppercase tracking-wide leading-snug group-hover:text-[#E55503] transition-colors" style={{ color: PALETTE.navy }}>
                              {study.title}
                            </h4>
                            <div className="w-10 h-0.5 mb-5 bg-[#E55503] group-hover:w-full transition-all duration-500 ease-out" />
                            
                            {/* Improved Middle Section details: Added Client & Stats badges directly to card */}
                            <div className="flex flex-wrap gap-2 mb-4 mt-2">
                              <span className="bg-slate-50 border border-slate-100 text-[#002253] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                                {study.client.length > 25 ? study.client.substring(0, 25) + "..." : study.client}
                              </span>
                              <span className="bg-[#E55503]/5 text-[#E55503] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                                {study.stats}
                              </span>
                            </div>

                            <p className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-3">
                              {study.description}
                            </p>
                          </div>
                        </div>

                        <div className="px-6 md:px-8 pb-6 md:pb-8">
                          <div className="w-full inline-flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold uppercase tracking-wider text-[#002253] group-hover:text-[#E55503] transition-all">
                            <span>Explore Case Study</span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                          </div>
                        </div>
                      </motion.div>

                      {/* Card 2 (if it exists) */}
                      {nextStudy && (
                        <motion.div
                          variants={index === 1 ? gridRightVariants : slideUpVariants}
                          whileHover={{ y: -6 }}
                          onClick={() => handleOpenModal(nextStudy)}
                          className="group bg-white rounded-2xl border border-slate-200/50 shadow-md overflow-hidden flex flex-col justify-between h-full hover:shadow-xl transition-all duration-[400ms] ease-out cursor-pointer"
                        >
                          <div>
                            <div className="relative h-[250px] overflow-hidden">
                              <img
                                src={nextStudy.image}
                                alt={nextStudy.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs text-white font-medium">
                                <MapPin className="h-3 w-3 text-[#FF8B28]" />
                                {nextStudy.location}
                              </div>
                            </div>

                            <div className="p-6 md:p-8">
                              <span className="text-[10px] font-bold uppercase tracking-wider block mb-2" style={{ color: PALETTE.orange }}>
                                {nextStudy.category}
                              </span>
                              <h4 className="text-lg md:text-xl font-bold mb-4 uppercase tracking-wide leading-snug group-hover:text-[#E55503] transition-colors" style={{ color: PALETTE.navy }}>
                                {nextStudy.title}
                              </h4>
                              <div className="w-10 h-0.5 mb-5 bg-[#E55503] group-hover:w-full transition-all duration-500 ease-out" />
                              
                              {/* Improved Middle Section details: Added Client & Stats badges directly to card */}
                              <div className="flex flex-wrap gap-2 mb-4 mt-2">
                                <span className="bg-slate-50 border border-slate-100 text-[#002253] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                                  {nextStudy.client.length > 25 ? nextStudy.client.substring(0, 25) + "..." : nextStudy.client}
                                </span>
                                <span className="bg-[#E55503]/5 text-[#E55503] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                                  {nextStudy.stats}
                                </span>
                              </div>

                              <p className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-3">
                                {nextStudy.description}
                              </p>
                            </div>
                          </div>

                          <div className="px-6 md:px-8 pb-6 md:pb-8">
                            <div className="w-full inline-flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold uppercase tracking-wider text-[#002253] group-hover:text-[#E55503] transition-all">
                              <span>Explore Case Study</span>
                              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── INTERACTIVE CASE DETAILS MODAL ── */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with Fade In */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Container with Spring Scale Up */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              {/* Header Image Header */}
              <div className="relative h-48 md:h-[280px] w-full overflow-hidden flex-shrink-0">
                <img
                  src={selectedCase.image}
                  alt={selectedCase.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-950/40 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/85 text-white border border-white/15 transition-all cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] bg-[#E55503] px-2.5 py-1 rounded-sm">
                    {selectedCase.category}
                  </span>
                  <h3 className="text-xl md:text-3xl font-extrabold uppercase mt-3 tracking-wide leading-tight">
                    {selectedCase.title}
                  </h3>
                </div>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 md:p-10 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-8">
                
                {/* Left Column: Descriptions */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs uppercase font-extrabold text-[#E55503] tracking-widest mb-2">
                      Project Overview
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {selectedCase.description}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="text-xs uppercase font-extrabold text-[#002253] tracking-widest mb-3">
                      Project Challenge
                    </h4>
                    <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-red-500 text-slate-600 text-sm leading-relaxed">
                      {selectedCase.challenge}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="text-xs uppercase font-extrabold text-[#002253] tracking-widest mb-3">
                      CPL Engineering Solution
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      By deploying high-capacity {selectedCase.category.toLowerCase()} configured specifically for localized load cycles, the project teams maintained operating parameters. CPL&apos;s advanced hydraulics and robust structural engineering mitigated downtime caused by environmental stressors.
                    </p>
                  </div>
                </div>

                {/* Right Column: Specifications & Stats */}
                <div className="space-y-6 md:border-l md:border-slate-100 md:pl-8">
                  
                  {/* Meta details */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-[#E55503] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Location
                        </span>
                        <span className="text-sm font-bold text-[#002253]">
                          {selectedCase.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-[#E55503] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Client Entity
                        </span>
                        <span className="text-sm font-bold text-[#002253]">
                          {selectedCase.client}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-[#E55503] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Duration
                        </span>
                        <span className="text-sm font-bold text-[#002253]">
                          {selectedCase.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Machine Fleet */}
                  <div className="bg-[#002253] text-white p-5 rounded-2xl">
                    <h5 className="text-[10px] uppercase font-extrabold text-[#FF8B28] tracking-widest mb-3">
                      Machinery Config
                    </h5>
                    <p className="text-xs font-semibold text-slate-200 leading-relaxed mb-4">
                      {selectedCase.equipment}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase bg-white/10 px-2.5 py-1.5 rounded border border-white/10">
                      <ShieldCheck className="h-4 w-4 text-[#FF8B28]" />
                      Full Maintenance Support
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
                    <TrendingUp className="h-6 w-6 text-[#E55503] mx-auto mb-2" />
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Key Performance metric
                    </span>
                    <span className="block text-2xl font-black text-[#E55503] mt-1">
                      {selectedCase.stats}
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
