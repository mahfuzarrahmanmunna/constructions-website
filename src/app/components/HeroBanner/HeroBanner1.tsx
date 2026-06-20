"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        className="w-5 h-5"
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
    label: "Team Experience",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
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
        className="w-5 h-5"
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
    label: "Team Members",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
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

/* ── client avatar colors ── */
const AVATAR_COLORS = [
  "#E55503",
  "#224B88",
  "#FF8B28",
  "#002253",
  "#4a90d9",
  "#c44b00",
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

      /* trust card */
      if (trustCardRef.current) {
        tl.fromTo(
          trustCardRef.current,
          { y: 25, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.5)" },
          1.45,
        );
      }

      /* avatars inside card */
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
      className="relative min-h-screen overflow-hidden flex items-center py-24"
      style={{ backgroundColor: COLORS.navy }}
    >
      {/* background radial glow */}
      <div
        ref={bgShapeRef}
        className="absolute -top-32 -right-32 w-[800px] h-[800px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${COLORS.blue} 0%, transparent 70%)`,
        }}
      />

      {/* floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: COLORS.orange,
              opacity: 0.25,
              top: `${p.top}%`,
              left: `${p.left}%`,
            }}
          />
        ))}
      </div>

      {/* subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ═══ MAIN GRID ═══ */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-5 md:px-8 lg:px-10 py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── LEFT ── */}
          <div className="order-2 lg:order-1">
            <h1
              ref={headingRef}
              className="text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] font-extrabold leading-[1.1] tracking-tight mb-6"
              style={{ color: "#ffffff" }}
            >
              {splitWords("We Build Strong Foundation For Better Future")}
            </h1>

            <p
              ref={descRef}
              className="text-base md:text-lg leading-relaxed mb-8 max-w-xl"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Providing quality construction services for all types of projects
              across Bangladesh — from residential buildings to large-scale
              commercial and government infrastructure.
            </p>

            <div ref={btnsRef} className="flex flex-wrap gap-4 mb-8">
              {/* Orange primary button */}
              <a
                href="#contact"
                onMouseMove={magneticHover}
                onMouseLeave={(e) => {
                  magneticLeave(e);
                  e.currentTarget.style.backgroundColor = COLORS.orange;
                }}
                className="relative inline-flex items-center gap-2 px-8 py-4 rounded-md font-bold text-base transition-colors duration-300 group"
                style={{ backgroundColor: COLORS.orange, color: COLORS.blue }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = COLORS.orangeLight)
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
              </a>

              {/* White outline button */}
              <a
                href="tel:+8801000000000"
                onMouseMove={magneticHover}
                onMouseLeave={(e) => {
                  magneticLeave(e);
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
                }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-bold text-base border-2 transition-all duration-300 group"
                style={{
                  borderColor: "rgba(255,255,255,0.6)",
                  color: "#ffffff",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.color = COLORS.navy;
                  e.currentTarget.style.borderColor = "#ffffff";
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
              className="inline-flex flex-wrap items-center gap-4 sm:gap-5 px-5 py-4 rounded-xl transition-all duration-300"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
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
                      width: "34px",
                      height: "34px",
                      backgroundColor: color,
                      border: `2px solid ${COLORS.navy}`,
                      left: `${i * 22}px`,
                      zIndex: AVATAR_COLORS.length - i,
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                ))}
                {/* last "more" circle */}
                <span
                  className="avatar-circle absolute flex items-center justify-center rounded-full text-[9px] font-bold select-none"
                  style={{
                    width: "34px",
                    height: "34px",
                    left: `${AVATAR_COLORS.length * 22}px`,
                    backgroundColor: "rgba(229,85,3,0.2)",
                    border: `2px solid ${COLORS.navy}`,
                    color: COLORS.orange,
                    zIndex: 0,
                  }}
                >
                  +44
                </span>
                {/* spacer so parent has correct width */}
                <span
                  style={{
                    width: `${(AVATAR_COLORS.length + 1) * 22 + 34}px`,
                    height: "34px",
                  }}
                />
              </div>

              {/* divider */}
              <span
                className="hidden sm:block w-px self-stretch"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              />

              {/* text content */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span
                    className="text-base font-bold"
                    style={{ color: "#ffffff" }}
                  >
                    50+ Happy Clients
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {/* star */}
                  <svg
                    className="w-4 h-4 shrink-0"
                    style={{ color: "#FBBF24" }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                  </svg>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#ffffff" }}
                  >
                    4.8
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    (120+ Reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT — Image ── */}
          <div ref={imageRef} className="order-1 lg:order-2">
            <div
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/banner.avif"
                  alt="Hero Construction Image"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* decorative corner accents */}
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

        {/* ── STATS ROW WITH ICONS ── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-16 lg:mt-20"
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="relative group rounded-xl px-4 py-5 md:px-5 md:py-6 flex items-center gap-3.5 transition-all duration-300 cursor-default"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(229,85,3,0.1)";
                e.currentTarget.style.borderColor = COLORS.orange;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              {/* icon box */}
              <span
                className="flex items-center justify-center w-11 h-11 rounded-lg shrink-0 transition-colors duration-300"
                style={{
                  backgroundColor: "rgba(229,85,3,0.12)",
                  color: COLORS.orange,
                }}
              >
                {stat.icon}
              </span>

              {/* text */}
              <div className="flex flex-col">
                <span
                  className="text-xl md:text-2xl font-extrabold leading-none"
                  style={{ color: COLORS.orange }}
                >
                  <AnimatedNumber
                    target={parseInt(stat.value)}
                    suffix={stat.value.replace(/[0-9]/g, "")}
                    active={counters[i]}
                  />
                </span>
                <span
                  className="text-xs font-medium leading-tight mt-0.5"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {stat.label}
                </span>
              </div>

              {/* hover top accent line */}
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full transition-all duration-500 group-hover:w-10"
                style={{ backgroundColor: COLORS.orange }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${COLORS.navy}, transparent)`,
        }}
      />
    </section>
  );
}
