"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Service,
  primaryServices,
  secondaryServices,
} from "@/app/service/servicesData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Reusable Card Component — Glassmorphism
const ServiceCard = ({ title, description, image }: Service) => {
  return (
    <div className="group h-full rounded-2xl border border-white/60 bg-white/40 backdrop-blur-xl p-3 transition-all duration-300 hover:shadow-xl hover:bg-white/60">
      <div className="relative h-52 overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="pt-5">
        <h3 className="mb-2 text-xl font-semibold text-[#1F2937]">{title}</h3>

        <p className="mb-6 text-sm leading-relaxed text-slate-500">
          {description}
        </p>

        <button className="flex items-center gap-2 text-sm font-medium text-[#E55503]">
          Learn More
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const primaryHeaderRef = useRef<HTMLDivElement>(null);
  const secondaryHeaderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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

      const headers = [
        primaryHeaderRef.current,
        secondaryHeaderRef.current,
      ].filter(Boolean);

      if (headers.length) {
        gsap.from(headers, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-24 text-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <div
          ref={primaryHeaderRef}
          className="relative mb-14 flex flex-col items-center text-center"
        >
          <Link
            href="/services"
            className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-2 rounded-lg border border-gray-200 px-5 py-2 text-sm font-medium text-slate-500 transition-colors hover:border-[#E55503] hover:text-[#E55503] md:flex"
          >
            View All
            <ArrowRight className="text-orange-400" size={16} />
          </Link>

          <span className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#E55503]">
            Our Service
          </span>

          <h2 className="mb-4 text-4xl font-bold text-black md:text-5xl">
            What We Do
          </h2>

          <p className="max-w-md text-slate-500">
            We offer a wide range of construction services tailored to your
            needs.
          </p>
        </div>

        {/* Primary Services Grid */}
        <div className="relative mb-24 primary-grid">
          <button className="services-prev absolute -left-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-md lg:flex">
            <ChevronLeft className="text-[#E55503]" size={20} />
          </button>

          <button className="services-next absolute -right-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-md lg:flex">
            <ChevronRight className="text-[#E55503]" size={20} />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".services-prev",
              nextEl: ".services-next",
            }}
            spaceBetween={24}
            slidesPerView={1.2}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {primaryServices.map((service) => (
              <SwiperSlide key={service.id}>
                <ServiceCard {...service} />
              </SwiperSlide>
            ))}
          </Swiper>
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

          <div className="relative">
            <button className="services-prev absolute -left-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-md lg:flex">
              <ChevronLeft className="text-[#E55503]" size={20} />
            </button>

            <button className="services-next absolute -right-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-md lg:flex">
              <ChevronRight className="text-[#E55503]" size={20} />
            </button>

            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".services-prev",
                nextEl: ".services-next",
              }}
              spaceBetween={24}
              slidesPerView={1.2}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {primaryServices.map((service) => (
                <SwiperSlide key={service.id}>
                  <ServiceCard {...service} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
