"use client";

import { useEffect, useRef, useState } from "react";

type SectionId = "features" | "compare" | "gallery" | "quote";

type SectionLink = {
  id: SectionId;
  label: string;
  cta?: boolean;
};

const sections: readonly SectionLink[] = [
  { id: "features", label: "Features" },
  { id: "compare", label: "Scope & Compare" },
  { id: "gallery", label: "Gallery" },
  { id: "quote", label: "Request a Quote", cta: true },
];

const contentMaxClass = "mx-auto w-full max-w-[1040px]";
const focusRingClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
const tabLinkClass = `${focusRingClass} flex min-h-11 shrink-0 items-center border-b-2 px-1 whitespace-nowrap transition-colors hover:border-primary hover:text-primary`;
const activeTabClass = "border-primary text-primary";
const inactiveTabClass = "border-transparent text-secondary-light";
const smallButtonClass = `${focusRingClass} inline-flex min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap border border-transparent bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(229,85,3,0.28)] transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary-light`;

function getActivationOffset() {
  if (window.innerWidth >= 768) {
    return 220;
  }

  return 300;
}

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState<SectionId>("features");
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<SectionId, HTMLAnchorElement | null>>({
    features: null,
    compare: null,
    gallery: null,
    quote: null,
  });
  const lastUpdateSource = useRef<"init" | "scroll" | "click">("init");

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        const activationOffset = getActivationOffset();
        let nextSection: SectionId = "features";

        for (const section of sections) {
          const element = document.getElementById(section.id);

          if (element && element.getBoundingClientRect().top <= activationOffset) {
            nextSection = section.id;
          }
        }

        const nearPageEnd =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 8;

        lastUpdateSource.current = "scroll";
        setActiveSection(nearPageEnd ? "quote" : nextSection);
        frame = 0;
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const activeLink = linkRefs.current[activeSection];

    if (!scroller || !activeLink || scroller.scrollWidth <= scroller.clientWidth) {
      return;
    }

    const scrollerRect = scroller.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const alreadyVisible =
      linkRect.left >= scrollerRect.left + 12 &&
      linkRect.right <= scrollerRect.right - 12;

    if (alreadyVisible) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const behavior =
      lastUpdateSource.current === "click" && !prefersReducedMotion
        ? "smooth"
        : "auto";

    activeLink.scrollIntoView({
      behavior,
      block: "nearest",
      inline: "center",
    });

    lastUpdateSource.current = "init";
  }, [activeSection]);

  return (
    <nav
      className="sticky top-0 z-20 border-y border-secondary-light/20 bg-white"
      aria-label="Page sections"
    >
      <div
        ref={scrollerRef}
        className={`${contentMaxClass} flex items-center gap-2 overflow-x-auto px-4 py-2 text-xs font-bold text-secondary-light [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:overflow-visible md:px-0 md:py-0 md:justify-between`}
      >
        {sections.map((section) => {
          const isActive = activeSection === section.id;

          if (section.cta) {
            return (
              <a
                key={section.id}
                className={`${smallButtonClass} ${
                  isActive ? "ring-2 ring-primary/30 ring-offset-2" : ""
                }`}
                href={`#${section.id}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => {
                  lastUpdateSource.current = "click";
                  setActiveSection(section.id);
                }}
                ref={(node) => {
                  linkRefs.current[section.id] = node;
                }}
              >
                {section.label}
              </a>
            );
          }

          return (
            <a
              key={section.id}
              className={`${tabLinkClass} justify-center md:justify-start ${
                isActive ? activeTabClass : inactiveTabClass
              }`}
              href={`#${section.id}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                lastUpdateSource.current = "click";
                setActiveSection(section.id);
              }}
              ref={(node) => {
                linkRefs.current[section.id] = node;
              }}
            >
              {section.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
