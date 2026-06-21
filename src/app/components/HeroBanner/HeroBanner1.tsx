"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RequestQuoteModal from "../RequestQuoteForm/RequestQuoteForm";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    value: "10+",
    label: "Years Experience",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    value: "50+",
    label: "Projects Completed",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    value: "100+",
    label: "Skilled Workers",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    value: "100%",
    label: "Government Approved",
  },
];

const AVATAR_COLORS = [
  "#E55503",
  "#224B88",
  "#FF8B28",
  "#002253",
];

function generateParticles(count: number) {
  return Array.from({ length: count }, () => ({
    size: Math.random() * 6 + 3,
    top: Math.random() * 100,
    left: Math.random() * 100,
  }));
}

export default function HeroBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const trustCardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bgShapeRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const particles = useMemo(() => generateParticles(8), []);

  /* ── main entrance timeline ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        bgShapeRef.current,
        { x: 300, opacity: 0, scale: 1.2 },
        { x: 0, opacity: 1, scale: 1, duration: 1.4 },
        0,
      );

      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".word");
        tl.fromTo(
          words,
          { y: 80, opacity: 0, rotateX: -40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "back.out(1.7)",
          },
          0.3,
        );
      }

      tl.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.9,
      );

      if (btnsRef.current) {
        tl.fromTo(
          btnsRef.current.children,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(2)",
          },
          1.15,
        );
      }

      if (trustCardRef.current) {
        tl.fromTo(
          trustCardRef.current,
          { y: 25, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.5)" },
          1.45,
        );
      }

      if (trustCardRef.current) {
        const avatars = trustCardRef.current.querySelectorAll(".avatar-circle");
        tl.fromTo(
          avatars,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: "back.out(2.5)",
          },
          1.75,
        );
      }

      if (statsRef.current) {
        tl.fromTo(
          statsRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          2.0,
        );
      }

      tl.fromTo(
        imageRef.current,
        { x: 100, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        0.8,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── counter trigger ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      STATS.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: statsRef.current?.children[i],
          start: "top 90%",
          once: true,
          onEnter: () =>
            setCounters((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            }),
        });
      });
    }, sectionRef);
  }, []);

  /* ── floating particles ── */
  useEffect(() => {
    if (!particlesRef.current) return;
    Array.from(particlesRef.current.children).forEach((p, i) => {
      gsap.to(p, {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        delay: i * 0.3,
        ease: "sine.inOut",
      });
    });
  }, []);

  const splitWords = (text: string) =>
    text.split(" ").map((w, i) => (
      <span
        key={i}
        className="word inline-block"
        style={{ perspective: "600px" }}
      >
        {w}&nbsp;
      </span>
    ));

  const AnimatedNumber = ({
    target,
    suffix = "",
    active,
  }: {
    target: number;
    suffix?: string;
    active: boolean;
  }) => {
    const [val, setVal] = useState(0);
    useEffect(() => {
      if (!active) return;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => setVal(Math.round(obj.v)),
      });
    }, [active, target]);
    return (
      <span>
        {val}
        {suffix}
      </span>
    );
  };

  const magneticHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.3 });
  };
  const magneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1,0.4)",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen pt-32 overflow-hidden flex items-center py-24 "
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* ═══ MAIN GRID ═══ */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-5 md:px-8 lg:px-10 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 ">
          {/* ── LEFT COLUMN ── */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1
              ref={headingRef}
              className="text-[2rem] sm:text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] font-extrabold leading-[1.12] tracking-tight mb-5 lg:mb-6"
              style={{ color: COLORS.navy }}
            >
              {splitWords("We Build Strong Foundation For Better Future")}
            </h1>

            <p
              ref={descRef}
              className="text-sm text-gray-600 sm:text-base md:text-lg leading-relaxed mb-7 lg:mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Providing quality construction services for all types of projects
              across Bangladesh — from residential buildings to large-scale
              commercial and government infrastructure.
            </p>

            {/* ── buttons ── */}
            <div
              ref={btnsRef}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-7 lg:mb-8 max-w-md mx-auto lg:mx-0"
            >
              {/* Orange primary button */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-md font-bold text-sm sm:text-base text-white transition-colors duration-300 group w-full sm:w-auto"
                style={{ backgroundColor: COLORS.orange }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = COLORS.orangeLight)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = COLORS.orange)
                }
              >
                <span className="absolute inset-0 rounded-md overflow-hidden pointer-events-none">
                  <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                    }}
                  />
                </span>
                <span className="relative z-10">Get Free Estimate</span>
                <svg
                  className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>

              {/* White outline button */}
              <a
                href="tel:+8801000000000"
                onMouseMove={magneticHover}
                onMouseLeave={(e) => {
                  magneticLeave(e);
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#E55503";
                  e.currentTarget.style.borderColor = "#E55503";
                }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 rounded-md font-bold text-sm sm:text-base border-2 duration-300 group sm:w-auto"
                style={{
                  borderColor: "#E55503",
                  color: COLORS.orange,
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#E55503";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = "#E55503";
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>Call Now</span>
              </a>
            </div>

            {/* ═══ HAPPY CLIENTS CARD ═══ */}
            <div
              ref={trustCardRef}
              className="inline-flex flex-wrap items-center gap-4 sm:gap-5 px-5 py-4 rounded-xl transition-all duration-300 justify-center"
              style={{
                backgroundColor: "#f7f7f8",
                border: "1px solid #e5e5e5",
              }}
            >
              {/* overlapping avatar circles */}
              <div
                className="relative flex items-center"
                style={{ marginLeft: "2px" }}
              >
                {AVATAR_COLORS.map((color, i) => (
                  <span
                    key={i}
                    className="avatar-circle absolute flex items-center justify-center rounded-full text-[10px] font-bold text-white select-none"
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: color,
                      border: `2px solid #f7f7f8`,
                      left: `${i * 18}px`,
                      zIndex: AVATAR_COLORS.length - i,
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                ))}
                <span
                  className="avatar-circle absolute flex items-center justify-center rounded-full text-[8px] font-bold select-none"
                  style={{
                    width: "30px",
                    height: "30px",
                    left: `${AVATAR_COLORS.length * 18}px`,
                    backgroundColor: "rgba(229,85,3,0.15)",
                    border: `2px solid #f7f7f8`,
                    color: COLORS.orange,
                    zIndex: 0,
                  }}
                >
                  +46
                </span>
                <span
                  style={{
                    width: `${(AVATAR_COLORS.length + 1) * 18 + 30}px`,
                    height: "30px",
                  }}
                />
              </div>

              {/* divider */}
              <span
                className="hidden sm:block w-px self-stretch"
                style={{ backgroundColor: "#d4d4d4" }}
              />

              {/* text content */}
              <div className="flex flex-col gap-0.5">
                <span
                  className="text-sm sm:text-base font-bold"
                  style={{ color: COLORS.navy }}
                >
                  50+ Happy Clients
                </span>
                <div className="flex text-gray-500 items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
                    style={{ color: "#FBBF24" }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-xs sm:text-sm font-bold">4.8</span>
                  <span className="text-xs sm:text-sm">(120+ Reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT — Image: hidden on mobile, visible on lg+ ── */}
          <div ref={imageRef} className="order-1 lg:order-2 hidden lg:block">
            <div
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
              style={{ backgroundColor: "#e8e8e8" }}
            >
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/banner.avif"
                  alt="Hero Construction Image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-24 h-24 rounded-tl-3xl"
                style={{ backgroundColor: COLORS.orange }}
              />
              <div
                className="absolute -top-1 -left-1 w-24 h-24 rounded-br-3xl border-2"
                style={{ borderColor: COLORS.orange, opacity: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div ref={statsRef} className="mt-12 lg:mt-16 xl:mt-20">
          <div
            className="flex flex-col sm:flex-row items-stretch overflow-hidden rounded-lg"
            style={{
              backgroundColor: "#ffffff",
              borderTop: "1px solid #E55503",
              borderBottom: "1px solid #E55503",
              borderLeft: "1px solid #E55503",
              borderRight: "1px solid #E55503",
            }}
          >
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="flex-1 flex items-center justify-center gap-3 sm:gap-4 py-6 px-5 sm:px-6 relative"
              >
                {/* Vertical divider — not on first item, hidden on mobile except between rows */}
                {i > 0 && (
                  <span
                    className="hidden sm:block absolute left-0 top-[15%] h-[70%] w-px"
                    style={{ backgroundColor: "#d4d4d4" }}
                  />
                )}

                {/* Mobile row divider */}
                {i === 2 && (
                  <span
                    className="sm:hidden absolute top-0 left-[10%] right-[10%] h-px"
                    style={{ backgroundColor: "#d4d4d4" }}
                  />
                )}

                {/* Icon */}
                <span
                  className="flex items-center justify-center rounded-full shrink-0 w-11 h-11 sm:w-12 sm:h-12"
                  style={{
                    backgroundColor: "rgba(229,85,3,0.1)",
                    color: COLORS.orange,
                  }}
                >
                  {stat.icon}
                </span>

                {/* Text */}
                <div className="flex flex-col">
                  <span
                    className="text-xl sm:text-2xl lg:text-2xl xl:text-[1.7rem] font-extrabold leading-none mb-0.5"
                    style={{ color: COLORS.orange }}
                  >
                    <AnimatedNumber
                      target={parseInt(stat.value)}
                      suffix={stat.value.replace(/[0-9]/g, "")}
                      active={counters[i]}
                    />
                  </span>
                  <span
                    className="text-[11px] sm:text-xs font-semibold leading-tight"
                    style={{ color: COLORS.navy }}
                  >
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <RequestQuoteModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}
