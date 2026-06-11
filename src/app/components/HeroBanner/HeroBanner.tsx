"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCreative,
  Parallax,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

// --- Color Palette ---
const COLORS = {
  navy: "#002253", // Pantone 2768 C
  blue: "#224B88", // Pantone 2154 C
  orange: "#E55503", // Pantone 1655 C (Primary Action)
  orangeLight: "#FF8B28", // Pantone 1495 C (Hover State)
};

const slides = [
  {
    badge: "Premium Construction",
    title: "Building Tomorrow's\nSkylines Today",
    subtitle:
      'World-class construction solutions with unmatched quality and precision — turning architectural visions into lasting realities.',
    primaryCta: 'Get a Free Quote',
    secondaryCta: 'Our Projects',
    accent: '#E55503',
    image: '/images/image1.png',
  },
  {
    badge: "Expert Renovation",
    title: "Transforming Spaces,\nElevating Lives",
    subtitle:
      'Our expert renovation teams breathe new life into existing structures — restoring beauty, improving function, and adding lasting value.',
    primaryCta: 'Explore Projects',
    secondaryCta: 'Learn More',
    accent: '#FF8B28',
    image: '/images/image2.png',
  },
  {
    badge: "Infrastructure Excellence",
    title: "Strong Foundations,\nGreater Futures",
    subtitle:
      'From highways to high-rises, we engineer infrastructure that communities depend on — built to last for generations.',
    primaryCta: 'View Our Work',
    secondaryCta: 'Contact Us',
    accent: '#224B88',
    image: '/images/image3.png',
  },
];

export default function HeroBanner() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#002253]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCreative, Parallax]}
        effect="creative"
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
            opacity: 0, // Fade out previous slide slightly more
          },
          next: {
            translate: ["100%", 0, 0],
            opacity: 1,
          },
        }}
        parallax={true}
        speed={1200} // Slower, smoother transition
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet", // Default class
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        className="h-full w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="relative overflow-hidden">
            {/* Parallax Background Image */}
            {/* Added scale-105 to ensure coverage during parallax shift */}
            <div
              className="absolute top-0 left-[-15%] w-[130%] h-full bg-cover bg-center will-change-transform scale-105"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
              data-swiper-parallax="-23%"
            />

            {/* Dark gradient shader overlay */}
            <div
              className="absolute inset-0 z-[1]"
              style={{
                background: 'linear-gradient(to right, rgba(0,34,83,0.84) 0%, rgba(0,34,83,0.58) 55%, rgba(0,34,83,0.18) 100%)',
              }}
            />

            {/* Content Layer */}
            <div className="relative z-[2] flex h-full items-center">
              <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
                <div className="max-w-3xl space-y-6">
                  {/* Badge with Parallax */}
                  <div
                    className="inline-flex items-center gap-3 rounded-full border px-5 py-2 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:bg-white/5"
                    style={{
                      borderColor: `${COLORS.orange}40`,
                      backgroundColor: `${COLORS.orange}15`,
                      color: COLORS.orangeLight,
                      boxShadow: `0 0 15px ${COLORS.orange}10`,
                    }}
                    data-swiper-parallax="-400"
                  >
                    <span
                      className="h-2 w-2 rounded-full animate-pulse"
                      style={{ backgroundColor: COLORS.orangeLight }}
                    />
                    {slide.badge}
                  </div>

                  {/* Title with Parallax */}
                  <h1
                    className="mb-2 whitespace-pre-line text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl drop-shadow-lg"
                    data-swiper-parallax="-300"
                  >
                    {slide.title}
                  </h1>

                  {/* Decorative Line with Parallax */}
                  <div
                    className="h-[4px] w-24 rounded-full shadow-[0_0_10px_rgba(229,85,3,0.5)]"
                    style={{
                      background: `linear-gradient(to right, ${COLORS.orange}, ${COLORS.orangeLight})`,
                    }}
                    data-swiper-parallax="-250"
                  />

                  {/* Subtitle with Parallax */}
                  <p
                    className="mb-10 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl"
                    data-swiper-parallax="-200"
                  >
                    {slide.subtitle}
                  </p>

                  {/* Buttons with Parallax */}
                  <div
                    className="flex flex-wrap gap-5 pt-4"
                    data-swiper-parallax="-150"
                  >
                    {/* Primary Button */}
                    <button
                      className="group relative overflow-hidden rounded-full px-10 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_-10px_rgba(229,85,3,0.5)]"
                      style={{ background: COLORS.orange }}
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                      {slide.primaryCta}
                    </button>

                    {/* Secondary Button (Frosted) */}
                    <button className="group rounded-full border border-white/30 bg-white/5 px-10 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                      <span className="group-hover:text-[#FF8B28] transition-colors duration-300">
                        {slide.secondaryCta}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-next !text-white/70 hover:!text-[#FF8B28] transition-colors duration-300"></div>
        <div className="swiper-button-prev !text-white/70 hover:!text-[#FF8B28] transition-colors duration-300"></div>

        {/* Custom Pagination Styling */}
        <style jsx global>{`
          .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.5);
            opacity: 1;
            width: 12px;
            height: 12px;
            transition: all 0.3s ease;
          }
          .swiper-pagination-bullet-active {
            background: ${COLORS.orange};
            width: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px ${COLORS.orange}80;
          }
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
          .animate-shimmer {
            animation: shimmer 1.5s infinite;
          }
        `}</style>
      </Swiper>

      <div className="absolute bottom-10 right-6 z-20 text-xs font-medium tracking-widest text-primary-light/60 md:right-12">
        SCROLL TO EXPLORE
      </div>
    </section>
  );
}
