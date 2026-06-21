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
import { Autoplay, Pagination } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Reusable Card Component
const ServiceCard = ({
  title,
  description,
  image,
  large = false,
}: Service & { large?: boolean }) => {
  return (
    <div className="group h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`relative w-full overflow-hidden ${
          large ? "h-72 lg:h-80" : "h-52"
        }`}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3
          className={`mb-3 font-bold text-[#002253] ${
            large ? "text-2xl" : "text-xl"
          }`}
        >
          {title}
        </h3>

        <p className="mb-6 text-sm leading-relaxed text-slate-500 line-clamp-3">
          {description}
        </p>

        <button className="inline-flex items-center gap-2 rounded-full border border-[#E55503] px-5 py-2 text-sm font-medium text-[#E55503] transition-colors hover:bg-[#E55503] hover:text-white">
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
            We offer a wide range of construction services tailored to your needs.
          </p>
        </div>
        {/* Primary Services Grid */}
       
        <div className="primary-grid">
       <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop
        spaceBetween={24}
        slidesPerView={1.1}
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
            <ServiceCard {...service} large />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
              

        {/* Secondary Services Section */}
        <div className="">
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-3"
          >
          </div>

          <div className="relative">
            <button className="services-prev absolute -left-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-md lg:flex">
    
            </button>

            <button className="services-next absolute -right-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-md lg:flex">
       
            </button>
           <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            loop
            spaceBetween={24}
            slidesPerView={1.2}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
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
