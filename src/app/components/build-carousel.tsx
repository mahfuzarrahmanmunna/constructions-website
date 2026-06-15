"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { buildSlides } from "@/lib/case-data";
import { cn } from "@/lib/utils";

export function BuildCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  function move(direction: -1 | 1) {
    setActiveIndex((current) => (current + direction + buildSlides.length) % buildSlides.length);
  }

  return (
    <div>
      <div className="mb-[var(--space-7)] flex items-end justify-between gap-[var(--space-6)]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--color-accent-light)]">Build With CPL</p>
          <h2 className="mt-[var(--space-3)] text-[clamp(2rem,4vw,4.2rem)] font-black leading-none tracking-[-0.055em]">
            Built for unforgiving jobsites
          </h2>
        </div>
        <div className="hidden gap-[var(--space-3)] sm:flex">
          <button
            type="button"
            onClick={() => move(-1)}
            className="grid size-11 place-items-center rounded-full border border-white/24 text-white transition-[background-color,border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Previous build case"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            className="grid size-11 place-items-center rounded-full border border-white/24 text-white transition-[background-color,border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Next build case"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <div className="relative -mx-[var(--space-4)] overflow-hidden px-[var(--space-4)] sm:-mx-[var(--space-6)] sm:px-[var(--space-6)] xl:-mx-0 xl:px-0">
        <div className="flex gap-[var(--space-5)] overflow-x-auto scroll-smooth pb-[var(--space-2)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
          {buildSlides.map((slide, index) => (
            <article
              key={slide.title}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              className={cn(
                "motion-card group relative min-h-[22rem] shrink-0 overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/5 shadow-[var(--shadow-dark)] snap-center",
                "basis-full md:basis-[calc(50%-0.625rem)]",
                index === 0 && "md:min-h-[26rem]",
              )}
              aria-current={index === activeIndex}
            >
              <div className="relative h-full min-h-[inherit]">
                <Image
                  src={slide.image}
                  alt={`${slide.title} project`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,20,0.02),rgba(5,13,20,0.86))]" />
                <div className="motion-panel absolute inset-x-0 bottom-0 z-[3] p-[var(--space-7)] md:p-[var(--space-8)]">
                  <p className="mb-[var(--space-2)] text-xs font-black uppercase tracking-[0.24em] text-[var(--color-accent-light)]">
                    {slide.eyebrow}
                  </p>
                  <h3 className="text-2xl font-black tracking-[-0.04em] md:text-4xl">{slide.title}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-[var(--space-6)] flex items-center gap-[var(--space-2)]">
        {buildSlides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "h-2 rounded-full bg-white/32 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
              index === activeIndex ? "w-8 bg-[var(--color-accent)]" : "w-2 hover:bg-white/60",
            )}
            aria-label={`Go to ${slide.title}`}
          />
        ))}
      </div>

      <div className="mt-[var(--space-8)] flex justify-center">
        <Button variant="ghost" className="group text-white hover:bg-white/10 hover:text-white">
          View All <ChevronRight className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}
