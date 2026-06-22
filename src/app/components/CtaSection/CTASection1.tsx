"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#ffffff]">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8 pb-8">
        <div
          className="cta-content relative rounded-2xl bg-white border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden"
          style={{ height: "96px" }}
        >
          {/* Crane watermark — left side */}
          <div className="absolute bottom-0 left-0 w-[120px] sm:w-[160px] lg:w-[100px] opacity-[0.04] sm:opacity-[0.06] pointer-events-none select-none">
            <svg
              viewBox="0 0 400 350"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <rect x="170" y="280" width="60" height="70" fill="#002253" />
              <rect
                x="140"
                y="330"
                width="120"
                height="20"
                rx="4"
                fill="#002253"
              />
              <rect x="190" y="40" width="20" height="260" fill="#002253" />
              <rect
                x="175"
                y="30"
                width="50"
                height="35"
                rx="3"
                fill="#002253"
              />
              <rect
                x="180"
                y="38"
                width="16"
                height="14"
                rx="2"
                fill="#f8f9fb"
              />
              <line
                x1="200"
                y1="50"
                x2="380"
                y2="100"
                stroke="#002253"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <line
                x1="200"
                y1="50"
                x2="60"
                y2="100"
                stroke="#002253"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <rect
                x="30"
                y="95"
                width="40"
                height="25"
                rx="3"
                fill="#002253"
              />
              <line
                x1="375"
                y1="100"
                x2="375"
                y2="220"
                stroke="#002253"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
              <circle
                cx="375"
                cy="225"
                r="8"
                stroke="#002253"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M369 230 Q375 245 381 230"
                stroke="#002253"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <line
                x1="190"
                y1="80"
                x2="210"
                y2="120"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="210"
                y1="80"
                x2="190"
                y2="120"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="190"
                y1="130"
                x2="210"
                y2="170"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="210"
                y1="130"
                x2="190"
                y2="170"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="190"
                y1="180"
                x2="210"
                y2="220"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="210"
                y1="180"
                x2="190"
                y2="220"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="190"
                y1="230"
                x2="210"
                y2="270"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="210"
                y1="230"
                x2="190"
                y2="270"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="250"
                y1="62"
                x2="260"
                y2="78"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="260"
                y1="62"
                x2="250"
                y2="78"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="290"
                y1="72"
                x2="300"
                y2="88"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="300"
                y1="72"
                x2="290"
                y2="88"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="330"
                y1="82"
                x2="340"
                y2="98"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="340"
                y1="82"
                x2="330"
                y2="98"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="140"
                y1="62"
                x2="130"
                y2="78"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="130"
                y1="62"
                x2="140"
                y2="78"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="110"
                y1="72"
                x2="100"
                y2="88"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="100"
                y1="72"
                x2="110"
                y2="88"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="80"
                y1="82"
                x2="70"
                y2="98"
                stroke="#002253"
                strokeWidth="1.5"
              />
              <line
                x1="70"
                y1="82"
                x2="80"
                y2="98"
                stroke="#002253"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Content — single row, vertically centered */}
          <div className="relative z-10 flex items-center justify-between h-full px-6 sm:px-10 lg:px-14">
            {/* Left: Text block */}
            <div className="flex flex-col justify-center min-w-0 pl-0 sm:pl-[80px] lg:pl-[120px]">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#E55503] mb-0.5">
                More Projects
              </span>
              <h2 className="text-base sm:text-lg lg:text-xl font-extrabold text-[#002253] leading-tight truncate">
                We Have Completed <span className="text-[#E55503]">50+</span>{" "}
                Projects Across Bangladesh
              </h2>
            </div>

            {/* Right: Button */}
            <div className="shrink-0 ml-4 sm:ml-6">
              <Link
                href="/ourWorks"
                className="group inline-flex items-center gap-2 rounded-full bg-[#E55503] px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:bg-[#cc4a03] hover:gap-2.5 active:scale-[0.97] whitespace-nowrap"
              >
                View All Projects
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
