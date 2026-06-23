"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  FileText,
  MapPin,
  Calculator,
  HardHat,
  KeyRound,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

const steps = [
  {
    icon: FileText,
    title: "Request Quote",
    description:
      "Share your project requirements and vision for an initial feasibility assessment.",
  },
  {
    icon: MapPin,
    title: "Site Survey",
    description:
      "Our experts conduct thorough on-site analysis to evaluate conditions and constraints.",
  },
  {
    icon: Calculator,
    title: "Estimation",
    description:
      "Receive a detailed cost breakdown, resource plan, and realistic project timeline.",
  },
  {
    icon: HardHat,
    title: "Execution",
    description:
      "Skilled teams bring your project to life with strict quality and safety standards.",
  },
  {
    icon: KeyRound,
    title: "Handover",
    description:
      "Complete delivery with full documentation, warranties, and post-completion support.",
  },
];

export default function OurProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const hLineRef = useRef<HTMLDivElement>(null);
  const hFillRef = useRef<HTMLDivElement>(null);
  const hDotRef = useRef<HTMLDivElement>(null);
  const hIconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hArrowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const vLineRef = useRef<HTMLDivElement>(null);
  const vFillRef = useRef<HTMLDivElement>(null);
  const vItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [spotlight, setSpotlight] = useState<{
    x: number;
    y: number;
    idx: number;
  } | null>(null);

  const onCardEnter = useCallback((idx: number) => setActiveStep(idx), []);

  const onCardMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
      const card = hCardRefs.current[idx];
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      setSpotlight({ x, y, idx });
      gsap.to(card, {
        rotateX: ((y - cy) / cy) * -5,
        rotateY: ((x - cx) / cx) * 5,
        duration: 0.35,
        ease: "power2.out",
        transformPerspective: 800,
      });
    },
    [],
  );

  const onCardLeave = useCallback((idx: number) => {
    setActiveStep(null);
    setSpotlight(null);
    const card = hCardRefs.current[idx];
    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.55,
        ease: "power3.out",
      });
    }
  }, []);

  /* ══════════════ GSAP ══════════════ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* floating orbs */
      if (orb1Ref.current && orb2Ref.current) {
        gsap.to(orb1Ref.current, {
          x: 50,
          y: -35,
          duration: 9,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to(orb2Ref.current, {
          x: -40,
          y: 30,
          duration: 11,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      /* header */
      const hEls = headerRef.current?.querySelectorAll(".ha") || [];
      if (hEls.length) {
        gsap.fromTo(
          hEls,
          { y: 52, opacity: 0, rotateX: -12 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.14,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 86%",
            },
          },
        );
      }

      /* ═══ DESKTOP ═══ */
      if (desktopRef.current) {
        /* base line */
        if (hLineRef.current) {
          gsap.fromTo(
            hLineRef.current,
            { opacity: 0, scaleX: 0 },
            {
              opacity: 1,
              scaleX: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: desktopRef.current,
                start: "top 84%",
              },
            },
          );
        }

        /* scroll-scrubbed fill + traveling dot */
        if (hFillRef.current && hDotRef.current) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: desktopRef.current,
              start: "top 80%",
              end: "bottom 28%",
              scrub: 0.5,
            },
          });
          tl.fromTo(
            hFillRef.current,
            { scaleX: 0 },
            { scaleX: 1, ease: "none" },
            0,
          ).fromTo(
            hDotRef.current,
            { left: "0%", opacity: 1 },
            { left: "100%", opacity: 1, ease: "none" },
            0,
          );
        }

        /* icons */
        const validIcons = hIconRefs.current.filter(Boolean);
        if (validIcons.length) {
          gsap.fromTo(
            validIcons,
            { scale: 0, opacity: 0, rotation: -60 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.7,
              stagger: 0.14,
              ease: "back.out(2.4)",
              scrollTrigger: {
                trigger: desktopRef.current,
                start: "top 78%",
              },
            },
          );
        }

        /* arrows */
        const validArrows = hArrowRefs.current.filter(Boolean);
        if (validArrows.length) {
          gsap.fromTo(
            validArrows,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.55,
              stagger: 0.13,
              ease: "elastic.out(1,0.5)",
              scrollTrigger: {
                trigger: desktopRef.current,
                start: "top 76%",
              },
            },
          );
        }

        /* cards 3D rise */
        const validCards = hCardRefs.current.filter(Boolean);
        if (validCards.length) {
          gsap.fromTo(
            validCards,
            { y: 60, opacity: 0, rotateX: 10 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.85,
              stagger: 0.12,
              ease: "power3.out",
              transformPerspective: 800,
              scrollTrigger: {
                trigger: desktopRef.current,
                start: "top 74%",
              },
            },
          );
        }
      }

      /* ═══ MOBILE ═══ */
      if (mobileRef.current) {
        if (vLineRef.current) {
          gsap.fromTo(
            vLineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: mobileRef.current,
                start: "top 86%",
              },
            },
          );
        }

        if (vFillRef.current) {
          gsap.fromTo(
            vFillRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: mobileRef.current,
                start: "top 82%",
                end: "bottom 38%",
                scrub: 0.5,
              },
            },
          );
        }

        vItemRefs.current.filter(Boolean).forEach((item) => {
          gsap.fromTo(
            item,
            { x: -36, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.65,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 88%" },
            },
          );
        });
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ══════════════ RENDER ══════════════ */
  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 px-4 md:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* background layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          ref={orb1Ref}
          className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(229,85,3,0.055) 0%, transparent 65%)",
            filter: "blur(44px)",
          }}
        />
        <div
          ref={orb2Ref}
          className="absolute -bottom-44 -right-44 w-[620px] h-[620px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,34,83,0.04) 0%, transparent 65%)",
            filter: "blur(52px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${COLORS.navy} 0.6px, transparent 0.6px)`,
            backgroundSize: "32px 32px",
            opacity: 0.02,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ══════════ HEADER ══════════ */}
        <div
          ref={headerRef}
          className="text-center mb-20 md:mb-24 lg:mb-28"
          style={{ perspective: "600px" }}
        >
          <p
            className="text-xs sm:text-sm font-bold text-[#E55503] uppercase tracking-widest"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Equipment
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002253] leading-tight">
            Our Streamlined{" "}
            <span
              className="relative inline-block"
              style={{ color: COLORS.orange }}
            >
              Process
              {/* <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M1 5.5C40 2 80 1 100 3C120 5 160 6 199 2"
                  stroke={COLORS.orangeLight}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg> */}
            </span>
          </h2>

          <p
            className="ha text-sm md:text-[15px] max-w-lg mx-auto leading-[1.8]"
            style={{ color: "#6b7280" }}
          >
            From initial consultation to final handover, we follow a proven
            five-step methodology ensuring quality and on-time delivery.
          </p>
        </div>

        {/* ══════════ DESKTOP HORIZONTAL ══════════ */}
        <div ref={desktopRef} className="hidden lg:block relative">
          {/* ── Connector line: absolutely positioned at icon center ── */}
          {/* Icon height = 78px → center at 39px. xl: 84px → center at 42px */}
          <div
            className="absolute left-0 right-0 z-0 pointer-events-none"
            style={{ top: "39px" }}
          >
            {/* base gray line */}
            <div
              ref={hLineRef}
              className="w-full h-[2px] origin-left rounded-full"
              style={{ backgroundColor: "#e2e5ea" }}
            />

            {/* orange fill that scrubs with scroll */}
            <div
              ref={hFillRef}
              className="absolute top-0 left-0 w-full h-[2px] origin-left rounded-full"
              style={{
                background: `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.orangeLight})`,
                transform: "scaleX(0)",
              }}
            />

            {/* traveling glow dot */}
            <div
              ref={hDotRef}
              className="absolute top-1/2 w-3.5 h-3.5 rounded-full opacity-0 pointer-events-none"
              style={{
                left: "0%",
                background: COLORS.orange,
                boxShadow: `0 0 10px ${COLORS.orange}, 0 0 22px rgba(229,85,3,0.35)`,
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>

          {/* xl override: icon center at 42px */}
          <style>{`
            @media (min-width: 1280px) {
              .connector-line-layer {
                top: 42px !important;
              }
            }
          `}</style>

          {/* ── 9-column grid: icon / arrow / icon / arrow / … ── */}
          <div
            className="grid items-start relative z-10"
            style={{
              gridTemplateColumns: "1fr 28px 1fr 28px 1fr 28px 1fr 28px 1fr",
            }}
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              const on = activeStep === i;
              const sp = spotlight?.idx === i ? spotlight : null;

              return (
                <React.Fragment key={i}>
                  {/* ── step column ── */}
                  <div className="flex flex-col items-center text-center">
                    {/* icon circle */}
                    <div
                      ref={(el) => {
                        hIconRefs.current[i] = el;
                      }}
                      className="relative z-10 mb-6 cursor-pointer"
                      onMouseEnter={() => onCardEnter(i)}
                      onMouseLeave={() => onCardLeave(i)}
                    >
                      {/* hover glow ring */}
                      <div
                        className="absolute inset-[-12px] rounded-full transition-all duration-500"
                        style={{
                          background: on
                            ? "radial-gradient(circle, rgba(229,85,3,0.12) 0%, transparent 70%)"
                            : "transparent",
                        }}
                      />
                      {/* circle */}
                      <div
                        className="w-[78px] h-[78px] xl:w-[84px] xl:h-[84px] rounded-full flex items-center justify-center relative"
                        style={{
                          background: on
                            ? `linear-gradient(145deg, ${COLORS.orange}, ${COLORS.orangeLight})`
                            : "linear-gradient(145deg, #ffffff, #f8f9fb)",
                          border: on ? "none" : "2px solid rgba(229,85,3,0.14)",
                          boxShadow: on
                            ? "0 10px 36px rgba(229,85,3,0.35), inset 0 1px 0 rgba(255,255,255,0.2)"
                            : "0 4px 20px rgba(0,34,83,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
                          transform: on ? "scale(1.08)" : "scale(1)",
                          transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
                        }}
                      >
                        <Icon
                          size={28}
                          strokeWidth={1.7}
                          style={{
                            color: on ? "#ffffff" : COLORS.orange,
                            transition: "color 0.4s",
                            filter: on
                              ? "drop-shadow(0 1px 2px rgba(0,0,0,0.15))"
                              : "none",
                          }}
                        />
                      </div>
                      {/* step number badge */}
                      <span
                        className="absolute -bottom-2.5 left-1/2 w-[26px] h-[26px] rounded-full flex items-center justify-center text-[11px] font-extrabold z-20"
                        style={{
                          background: on
                            ? `linear-gradient(145deg, ${COLORS.orangeLight}, ${COLORS.orange})`
                            : COLORS.orange,
                          color: "#ffffff",
                          boxShadow: "0 3px 14px rgba(229,85,3,0.4)",
                          transform: on
                            ? "translateX(-50%) scale(1.2)"
                            : "translateX(-50%) scale(1)",
                          transition: "all 0.45s cubic-bezier(0.4,0,0.2,1)",
                        }}
                      >
                        {i + 1}
                      </span>
                    </div>

                    {/* card */}
                    <div
                      ref={(el) => {
                        hCardRefs.current[i] = el;
                      }}
                      className="w-full rounded-2xl px-3 xl:px-5 py-5 xl:py-6 min-w-0 cursor-pointer relative overflow-hidden"
                      style={{
                        backgroundColor: on ? "#ffffff" : "#f4f5f7",
                        border: on
                          ? "1px solid rgba(229,85,3,0.18)"
                          : "1px solid transparent",
                        boxShadow: on
                          ? "0 24px 48px -14px rgba(229,85,3,0.14), 0 0 0 1px rgba(229,85,3,0.04)"
                          : "0 1px 3px rgba(0,0,0,0.02)",
                        transformStyle: "preserve-3d",
                        transition:
                          "background-color 0.4s, border-color 0.4s, box-shadow 0.4s",
                      }}
                      onMouseEnter={() => onCardEnter(i)}
                      onMouseLeave={() => onCardLeave(i)}
                      onMouseMove={(e) => onCardMove(e, i)}
                    >
                      {/* mouse spotlight */}
                      {sp && (
                        <div
                          className="absolute inset-0 pointer-events-none rounded-2xl"
                          style={{
                            background: `radial-gradient(260px circle at ${sp.x}px ${sp.y}px, rgba(229,85,3,0.055), transparent 60%)`,
                          }}
                        />
                      )}
                      {/* top edge highlight */}
                      <div
                        className="absolute top-0 left-4 right-4 h-px"
                        style={{
                          background: on
                            ? "linear-gradient(90deg, transparent, rgba(229,85,3,0.14), transparent)"
                            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
                          transition: "background 0.4s",
                        }}
                      />

                      <span
                        className="relative inline-block text-[9.5px] font-bold tracking-[0.2em] uppercase mb-2.5"
                        style={{
                          color: COLORS.orange,
                          opacity: on ? 1 : 0.45,
                          transition: "opacity 0.3s",
                        }}
                      >
                        Step 0{i + 1}
                      </span>
                      <h3
                        className="relative text-[14px] xl:text-[15px] font-bold mb-2 leading-snug"
                        style={{
                          color: on ? COLORS.orange : COLORS.navy,
                          transition: "color 0.35s",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="relative text-[12px] xl:text-[12.5px] leading-[1.8]"
                        style={{ color: "#6b7280" }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* ── arrow connector ── */}
                  {i < steps.length - 1 && (
                    <div
                      ref={(el) => {
                        hArrowRefs.current[i] = el;
                      }}
                      className="flex items-center justify-center"
                      style={{ paddingTop: "25px" }}
                    >
                      <div
                        className="w-7 h-7 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: "rgba(229,85,3,0.055)",
                          border: "1px solid rgba(229,85,3,0.1)",
                        }}
                      >
                        <ChevronRight
                          size={12}
                          strokeWidth={2.5}
                          style={{
                            color: COLORS.orange,
                            opacity: 0.65,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* ══════════ MOBILE VERTICAL ══════════ */}
        <div
          ref={mobileRef}
          className="lg:hidden relative"
          style={{ paddingLeft: "48px" }}
        >
          {/* vertical line */}
          <div
            className="absolute top-0 bottom-0 w-[2px]"
            style={{ left: "19px" }}
          >
            <div
              ref={vLineRef}
              className="w-full h-full origin-top rounded-full"
              style={{ backgroundColor: "#e2e5ea" }}
            />
            <div
              ref={vFillRef}
              className="absolute top-0 left-0 w-full h-full origin-top rounded-full"
              style={{
                background: `linear-gradient(180deg, ${COLORS.orange}, ${COLORS.orangeLight})`,
                transform: "scaleY(0)",
              }}
            />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            const on = activeStep === i;

            return (
              <div
                key={i}
                ref={(el) => {
                  vItemRefs.current[i] = el;
                }}
                className="relative mb-5 last:mb-0"
                onMouseEnter={() => setActiveStep(i)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* icon */}
                <div
                  className="absolute -left-[35px] top-[5px] w-10 h-10 rounded-full flex items-center justify-center z-10 cursor-pointer"
                  style={{
                    background: on
                      ? `linear-gradient(145deg, ${COLORS.orange}, ${COLORS.orangeLight})`
                      : "#ffffff",
                    border: on ? "none" : "2px solid rgba(229,85,3,0.18)",
                    boxShadow: on
                      ? "0 6px 20px rgba(229,85,3,0.3)"
                      : "0 3px 12px rgba(0,34,83,0.06)",
                    transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.8}
                    style={{
                      color: on ? "#ffffff" : COLORS.orange,
                      transition: "color 0.35s",
                    }}
                  />
                </div>

                {/* card */}
                <div
                  className="rounded-xl p-4 sm:p-5 cursor-pointer relative overflow-hidden"
                  style={{
                    backgroundColor: on ? "#ffffff" : "#f4f5f7",
                    border: on
                      ? "1px solid rgba(229,85,3,0.14)"
                      : "1px solid #e9eaed",
                    boxShadow: on
                      ? "0 14px 34px -10px rgba(229,85,3,0.1)"
                      : "0 1px 3px rgba(0,0,0,0.02)",
                    transform: on ? "translateX(5px)" : "translateX(0)",
                    transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <div
                    className="absolute top-0 left-4 right-4 h-px"
                    style={{
                      background: on
                        ? "linear-gradient(90deg, transparent, rgba(229,85,3,0.12), transparent)"
                        : "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                      transition: "background 0.4s",
                    }}
                  />
                  <div className="flex items-center gap-2.5 mb-2.5 relative">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0"
                      style={{
                        background: COLORS.orange,
                        color: "#ffffff",
                        boxShadow: "0 2px 8px rgba(229,85,3,0.3)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      className="text-[9.5px] font-bold tracking-[0.18em] uppercase"
                      style={{
                        color: COLORS.orange,
                        opacity: on ? 1 : 0.45,
                        transition: "opacity 0.3s",
                      }}
                    >
                      Step 0{i + 1}
                    </span>
                  </div>
                  <h3
                    className="relative text-[15px] sm:text-base font-bold mb-1.5 leading-snug"
                    style={{
                      color: on ? COLORS.orange : COLORS.navy,
                      transition: "color 0.35s",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="relative text-[12.5px] sm:text-[13px] leading-[1.8]"
                    style={{ color: "#6b7280" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-120%); }
          55%, 100% { transform: translateX(220%); }
        }
      `}</style>
    </section>
  );
}
