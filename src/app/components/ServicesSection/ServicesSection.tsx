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

// Reusable Card Component — Glassmorphism
const ServiceCard = ({ title, description, image }: Service) => {
  return (
    <div className="group w-full rounded-3xl bg-white shadow-lg">
      <div className="relative aspect-[16/9] ">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h3 className="mb-2 text-2xl font-bold">
            {title}
          </h3>

          <p className="mb-4 max-w-md text-sm text-white/90">
            {description}
          </p>

          <button className="flex items-center gap-2 hover:bg-[#E55503] hover:text-white rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition">
            Learn More
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const SecondaryServiceCard = ({
  title,
  description,
  image,
}: Service) => {
  return (
    <div className="group h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-3 text-lg font-bold text-[#002253]">
          {title}
        </h3>


        <p className="mb-6 text-sm leading-relaxed text-slate-500 line-clamp-3">
          {description}
        </p>

          <button className="flex border-1 items-center gap-2 hover:bg-[#E55503] hover:text-white rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition">
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
    <section ref={sectionRef} className="bg-white text-slate-900">
      <div className="mx-auto w-full max-w-[1600px] px-4 lg:px-8">

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
       
        <div className="primary-grid">
        <Swiper
          modules={[Autoplay, Pagination]}
          centeredSlides
          loop
          grabCursor
          spaceBetween={12}
          slidesPerView={1.15}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: 1.4,
            },
            1024: {
              slidesPerView: 1.8,
            },
            1280: {
              slidesPerView: 2.3,
            },
          }}
          className="w-full"
        >
          {primaryServices.map((service) => (
            <SwiperSlide key={service.id}>
              <div className="transition-all duration-500 swiper-slide-content">
                <ServiceCard {...service} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
              

        {/* Secondary Services Section */}
        <div className="secondary-grid relative">
        <Swiper
          className="secondary-swiper"
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          spaceBetween={16}
          loop={secondaryServices.length > 4}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
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
          {secondaryServices.map((service) => (
            <SwiperSlide key={service.id}>
              <SecondaryServiceCard {...service} />
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </div>
    </section>
  );
}
