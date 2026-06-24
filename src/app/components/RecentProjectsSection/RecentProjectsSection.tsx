"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Layers,
  IndianRupee,
} from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Data ───
const stats = [
  { value: "50+", label: "Projects Completed" },
  { value: "₹300+", label: "Crore Delivered" },
  { value: "98%", label: "Client Satisfaction" },
];

const featuredProject = {
  title: "Japanese JV Marine River Bridge",
  location: "Chattogram",
  specs: ["72 Deep Piles", "₹120 Crore", "2024"],
  image:
    "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&h=600&fit=crop",
  tag: "Featured",
};

const projects = [
  {
    id: 1,
    title: "Highway Overpass Construction",
    location: "Dhaka",
    image:
      "https://images.unsplash.com/photo-1590725121839-892b456a0c69?w=600&h=400&fit=crop",
    category: "Infrastructure",
  },
  {
    id: 2,
    title: "Commercial Tower Foundation",
    location: "Gulshan",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    category: "Commercial",
  },
  {
    id: 3,
    title: "Deep Pile Driving — Rail Bridge",
    location: "Sylhet",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&h=400&fit=crop",
    category: "Railway",
  },
  {
    id: 4,
    title: "Industrial Warehouse Complex",
    location: "Chattogram",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
    category: "Industrial",
  },
  {
    id: 5,
    title: "Residential High-Rise Piling",
    location: "Uttara",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop",
    category: "Residential",
  },
  {
    id: 6,
    title: "River Embankment & Protection",
    location: "Rajshahi",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop",
    category: "Marine",
  },
];

// ─── Stat Card ───
const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="group relative text-center">
    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E55503]/10 transition-colors duration-300 group-hover:bg-[#E55503]/20">
      <span className="text-xs font-bold text-[#E55503]">#</span>
    </div>
    <p className="text-3xl sm:text-4xl font-extrabold text-[#002253] leading-none">
      {value}
    </p>
    <p className="mt-1.5 text-xs sm:text-sm text-slate-500 font-medium">
      {label}
    </p>
  </div>
);

// ─── Project Thumbnail Card ───
const ProjectCard = ({
  title,
  location,
  image,
  category,
}: {
  id: number;
  title: string;
  location: string;
  image: string;
  category: string;
}) => (
  <Link href="/projects" className="group block">
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-slate-100">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 85vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category badge — always visible */}
        <div className="absolute top-3 left-3">
          <span className="inline-block rounded-md bg-[#E55503] px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">
            {category}
          </span>
        </div>

        {/* Hover content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <h4 className="text-sm sm:text-base font-bold text-white leading-snug mb-1">
            {title}
          </h4>
          <div className="flex items-center gap-1 text-white/70">
            <MapPin size={12} />
            <span className="text-xs">{location}</span>
          </div>
        </div>
      </div>

      {/* Mobile: always show title below image */}
      <div className="p-3 sm:hidden">
        <h4 className="text-sm font-bold text-[#002253] leading-snug">
          {title}
        </h4>
        <div className="flex items-center gap-1 text-slate-400 mt-1">
          <MapPin size={11} />
          <span className="text-xs">{location}</span>
        </div>
      </div>
    </div>
  </Link>
);

// ─── Main Section ───
export default function RecentProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Stats stagger
      gsap.from(".stat-item", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-row",
          start: "top 88%",
        },
      });

      // Featured project
      gsap.from(".featured-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".featured-card",
          start: "top 85%",
        },
      });

      // Project grid items
      gsap.from(".project-item", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 88%",
        },
      });

      // Section header
      gsap.from(".section-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f8f9fb] text-slate-900 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28">
        {/* ─── Header ─── */}
        <div className="section-header relative mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <span className="mb-3 inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#E55503]">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#002253] leading-tight">
              Recent Projects
            </h2>
          </div>

          <Link
            href="/projects"
            className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#002253] shadow-sm transition-all duration-300 hover:border-[#E55503] hover:text-[#E55503] hover:shadow-md active:scale-[0.97] shrink-0"
          >
            View All Projects
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ─── Stats Row ─── */}
        <div className="stats-row grid grid-cols-3 gap-4 sm:gap-8 mb-12 sm:mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item rounded-2xl bg-white p-5 sm:p-7 shadow-sm border border-slate-100"
            >
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        {/* ─── Featured Project ─── */}
        <div className="featured-card relative mb-12 sm:mb-16">
          <Link href="/projects" className="group block">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
              <div className="relative aspect-[16/8] sm:aspect-[16/7] lg:aspect-[16/6] w-full">
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 640px) 95vw, (max-width: 1024px) 90vw, 1400px"
                  priority
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

                {/* Featured badge */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E55503] px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    {featuredProject.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14">
                  <h3 className="mb-2 sm:mb-3 text-xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight max-w-xl">
                    {featuredProject.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-white/70 mb-5 sm:mb-6">
                    <MapPin size={14} />
                    <span className="text-sm">{featuredProject.location}</span>
                  </div>

                  {/* Spec pills */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                    {featuredProject.specs.map((spec) => (
                      <span
                        key={spec}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white/90"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-white font-semibold text-sm sm:text-base group-hover:gap-3 transition-all duration-300">
                    <span>View Project Details</span>
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* ─── Explore More Header ─── */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="h-8 w-1 rounded-full bg-[#E55503]" />
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#002253]">
              Explore More Projects
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Browse our diverse portfolio
            </p>
          </div>
        </div>

        {/* ─── Projects Grid ─── */}
        <div className="projects-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {projects.map((project) => (
            <div key={project.id} className="project-item">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
