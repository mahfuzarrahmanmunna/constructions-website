"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapPin, Clock, BarChart3, ArrowUpRight, Filter } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { caseStudies, CaseStudy } from "@/app/ourWorks/casesData";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectStoriesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const sectionRef = useRef<HTMLDivElement>(null); // Added: Main container ref
  const gridRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Extract unique categories
  const categories = [
    "All",
    ...Array.from(new Set(caseStudies.map((s) => s.category))),
  ];

  // Filter Data
  const featuredProjects = caseStudies.filter((s) => s.isFeatured);
  const gridProjects = caseStudies.filter((s) => !s.isFeatured);

  const filteredProjects =
    activeCategory === "All"
      ? gridProjects
      : gridProjects.filter((s) => s.category === activeCategory);

  // --- Animations ---
  useEffect(() => {
    const ctx = gsap.context(
      () => {
        // 1. Animate Featured Section
        gsap.from(".featured-item", {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 80%",
          },
        });

        // 2. Animate Grid Items
        gsap.fromTo(
          ".project-card",
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
            },
          },
        );
      },
      sectionRef, // FIXED: Pass only the single sectionRef
    );

    return () => ctx.revert();
  }, [filteredProjects]);

  // Handle Tab Switch Animation
  const handleTabChange = (category: string) => {
    setActiveCategory(category);

    // Animate old grid out quickly
    gsap.to(".project-card", {
      opacity: 0,
      y: 20,
      duration: 0.2,
      onComplete: () => {
        // GSAP useEffect above handles the re-entry animation automatically
      },
    });
  };

  return (
    <section
      ref={sectionRef} // Added: Bind sectionRef to the main container
      className="relative bg-[#0f172a] text-white py-24 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#002253] to-[#0f172a] z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
          <div className="max-w-2xl">
            <span className="text-[#E55503] font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Our <span className="text-white/50">Project</span> Stories
            </h2>
            <p className="text-slate-400">
              Engineering excellence delivered across Bangladesh's most critical
              infrastructure milestones.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span>{caseStudies.length} Projects Completed</span>
              <div className="w-2 h-2 rounded-full bg-[#E55503]" />
              <span>100% Safety Record</span>
            </div>
          </div>
        </div>

        {/* --- Featured Projects (Large Layout) --- */}
        {featuredProjects.length > 0 && (
          <div
            ref={featuredRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24"
          >
            {featuredProjects.map((project) => (
              <FeaturedCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* --- Filter Tabs --- */}
        <div
          className="flex flex-wrap gap-4 mb-12 relative z-20"
          ref={featuredRef} // Note: This ref is used inside the GSAP trigger, but sectionRef handles the context
        >
          <button className="p-2 text-slate-500 hover:text-white transition-colors">
            <Filter size={20} />
          </button>
          {categories.map((cat, index) => (
            <button
              key={cat}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => handleTabChange(cat)}
              className={`
                relative px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border
                ${
                  activeCategory === cat
                    ? "bg-[#E55503] border-[#E55503] text-white shadow-[0_0_15px_rgba(229,85,3,0.4)]"
                    : "bg-transparent border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- Project Grid --- */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
}

// --- Sub-Component: Featured Large Card ---
function FeaturedCard({ project }: { project: CaseStudy }) {
  return (
    <div className="featured-item group relative h-[500px] rounded-3xl overflow-hidden border border-white/10 cursor-pointer">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-wider text-white border border-white/20">
            {project.category}
          </span>
          <span className="text-[#E55503] font-bold text-sm flex items-center gap-1 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Case Study <ArrowUpRight size={16} />
          </span>
        </div>

        <h3 className="text-3xl font-bold mb-3 leading-tight group-hover:text-[#E55503] transition-colors">
          {project.title}
        </h3>

        <div className="flex items-center gap-4 text-slate-300 text-sm mb-4">
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {project.location}
          </span>
          <span className="w-1 h-1 bg-slate-500 rounded-full" />
          <span>{project.client}</span>
        </div>

        <p className="text-slate-400 text-sm line-clamp-2 mb-6 max-w-xl">
          {project.description}
        </p>

        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold mb-1">
              Duration
            </p>
            <p className="text-white font-medium flex items-center gap-2">
              <Clock size={14} className="text-[#E55503]" /> {project.duration}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold mb-1">
              Key Stat
            </p>
            <p className="text-white font-medium flex items-center gap-2">
              <BarChart3 size={14} className="text-[#E55503]" /> {project.stats}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-Component: Standard Project Card ---
function ProjectCard({ project }: { project: CaseStudy }) {
  return (
    <div className="project-card group relative h-[420px] rounded-2xl overflow-hidden border border-white/10 cursor-pointer bg-[#1e293b]">
      {/* Image Area (Top Half) */}
      <div className="relative h-1/2 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1e293b]" />

        {/* Category Tag */}
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 bg-[#002253]/80 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider rounded border border-white/10">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content Area (Bottom Half) */}
      <div className="p-6 relative flex flex-col h-1/2 justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-[#E55503] transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4">
            {project.description}
          </p>
        </div>

        {/* Meta Footer */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPin size={12} />
            {project.location}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-1 text-xs font-bold text-slate-300">
              <Clock size={12} className="text-[#E55503]" />
              {project.duration}
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#E55503] transition-colors">
              <ArrowUpRight size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
