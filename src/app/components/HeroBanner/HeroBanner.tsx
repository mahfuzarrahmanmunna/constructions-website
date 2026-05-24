'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCreative, Parallax } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-creative'

const slides = [
  {
    badge: 'Premium Construction',
    title: "Building Tomorrow's\nSkylines Today",
    subtitle:
      'World-class construction solutions with unmatched quality and precision — turning architectural visions into lasting realities.',
    primaryCta: 'Get a Free Quote',
    secondaryCta: 'Our Projects',
    accent: '#f97316',
    image: '/images/image1.png',
  },
  {
    badge: 'Expert Renovation',
    title: 'Transforming Spaces,\nElevating Lives',
    subtitle:
      'Our expert renovation teams breathe new life into existing structures — restoring beauty, improving function, and adding lasting value.',
    primaryCta: 'Explore Projects',
    secondaryCta: 'Learn More',
    accent: '#f59e0b',
    image: '/images/image2.png',
  },
  {
    badge: 'Infrastructure Excellence',
    title: 'Strong Foundations,\nGreater Futures',
    subtitle:
      'From highways to high-rises, we engineer infrastructure that communities depend on — built to last for generations.',
    primaryCta: 'View Our Work',
    secondaryCta: 'Contact Us',
    accent: '#ea580c',
    image: '/images/image3.png',
  },
]

export default function HeroBanner() {
  return (
    <section className="relative h-screen overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCreative, Parallax]}
        effect="creative"
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        parallax={true}
        speed={1000}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        loop
        className="h-full w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="relative overflow-hidden">
            {/* Parallax background — oversized so image has room to shift */}
            <div
              className="absolute top-0 h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                left: '-15%',
                width: '130%',
              }}
              data-swiper-parallax="-20%"
            />

            {/* Dark gradient shader overlay */}
            <div
              className="absolute inset-0 z-[1]"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.15) 100%)',
              }}
            />

            {/* Slide content with staggered parallax */}
            <div className="relative z-[2] flex h-full items-center">
              <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
                <div className="max-w-3xl">

                  <div
                    className="mb-7 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-[0.15em] uppercase"
                    style={{
                      borderColor: `${slide.accent}50`,
                      backgroundColor: `${slide.accent}18`,
                      color: slide.accent,
                    }}
                    data-swiper-parallax="-400"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: slide.accent }}
                    />
                    {slide.badge}
                  </div>

                  <h1
                    className="mb-5 whitespace-pre-line text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
                    data-swiper-parallax="-300"
                  >
                    {slide.title}
                  </h1>

                  <div
                    className="mb-7 h-[3px] w-20 rounded-full"
                    style={{ background: `linear-gradient(to right, ${slide.accent}, transparent)` }}
                    data-swiper-parallax="-250"
                  />

                  <p
                    className="mb-10 max-w-xl text-lg leading-relaxed text-zinc-300 md:text-xl"
                    data-swiper-parallax="-200"
                  >
                    {slide.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-4" data-swiper-parallax="-150">
                    <button
                      className="rounded-full px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent}bb)`,
                        boxShadow: `0 6px 28px ${slide.accent}45`,
                      }}
                    >
                      {slide.primaryCta}
                    </button>
                    <button className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                      {slide.secondaryCta}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-10 right-6 z-20 text-xs font-medium tracking-widest text-white/40 md:right-12">
        SCROLL TO EXPLORE
      </div>
    </section>
  )
}
