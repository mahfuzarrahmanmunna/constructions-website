"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import {
  Service,
  primaryServices,
  secondaryServices,
} from "@/app/service/servicesData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Reusable Card Component
const ServiceCard = ({ title, description, image }: Service) => {
  return (
    <div className="service-card group relative h-full bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#002253]/10 group-hover:bg-transparent transition-colors z-10" />
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6 relative">
        {/* Orange Line Accent */}
        <div className="absolute top-0 left-6 w-10 h-1 bg-[#E55503] transform -translate-y-1/2 group-hover:w-20 transition-all duration-300" />

        <h3 className="text-xl font-bold text-[#002253] mb-3 group-hover:text-[#E55503] transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Hover Arrow */}
        <div className="flex items-center text-[#E55503] font-bold text-sm opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Learn More <ArrowRight size={16} className="ml-2" />
        </div>
      </div>
    </div>
  );
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const primaryHeaderRef = useRef<HTMLHeadingElement>(null);
  const secondaryHeaderRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Primary Cards
      gsap.from(".primary-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".primary-grid",
          start: "top 85%",
        },
      });

      // Animate Secondary Cards
      gsap.from(".secondary-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".secondary-grid",
          start: "top 85%",
        },
      });

      // Header Animations
      gsap.from([primaryHeaderRef.current, secondaryHeaderRef.current], {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-24 text-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <div
          className="text-center mb-16 max-w-3xl mx-auto"
          ref={primaryHeaderRef}
        >
          <span className="text-[#E55503] font-bold tracking-widest uppercase text-xs mb-2 block">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#002253] uppercase tracking-wide mb-4">
            Our Core Services
          </h2>
          <div className="h-1.5 w-24 bg-[#E55503] mx-auto rounded-full" />
        </div>

        {/* Primary Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 primary-grid">
          {primaryServices.map((service) => (
            <div
              key={service.id}
              className="primary-card service-card-container h-full"
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>

        {/* Secondary Services Section */}
        <div className="border-t border-slate-200 pt-20">
          <div
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
            ref={secondaryHeaderRef}
          >
            <div>
              <h3 className="text-3xl font-bold text-[#002253] uppercase">
                Support Services
              </h3>
              <p className="text-slate-500 mt-2 max-w-lg">
                Beyond construction, we provide comprehensive supply and
                logistical solutions to ensure project success.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 secondary-grid">
            {secondaryServices.map((service) => (
              <div
                key={service.id}
                className="secondary-card service-card-container h-full"
              >
                {/* Slightly different style for secondary cards - Full width image on top, dark accent */}
                <div className="group relative h-full bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:border-[#002253] transition-colors duration-300">
                  <div className="p-8">
                    <div className="w-12 h-12 bg-[#002253] rounded-lg flex items-center justify-center mb-6 text-white">
                      {/* Generic Icon placeholder using Lucide or SVG if you had specific icons, otherwise relying on image */}
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-[#002253] mb-3">
                      {service.title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Optional: Small thumbnail image at bottom for secondary services */}
                  <div className="h-32 w-full relative overflow-hidden mt-auto">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      sizes="100vw"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
