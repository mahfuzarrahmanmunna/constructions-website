"use client";

import { useState, useRef, useEffect } from "react";

// --- Color Palette Constants ---
const COLORS = {
  blueDark: "#002253", // Pantone 2768 C
  blueMedium: "#224B88", // Pantone 2154 C
  orangeDark: "#E55503", // Pantone 1655 C
  orangeLight: "#FF8B28", // Pantone 1495 C
};

const navLinks = [
  "Products",
  "Service",
  "Construction Cases",
  "Investor",
  "News",
  "About ",
  "Contact",
];

const categories = [
  { name: "Earthmoving Machinery", image: "/images/Nav-Photos/p1.png" },
  { name: "MEWPs", image: "/images/Nav-Photos/p2.png" },
  { name: "Mobile Crane Machinery", image: "/images/Nav-Photos/p3.png" },
  {
    name: "Construction Hoisting Machinery",
    image: "/images/Nav-Photos/p4.png",
  },
  { name: "Concrete Machinery", image: "/images/Nav-Photos/p5.png" },
  { name: "Agricultural Machinery", image: "/images/Nav-Photos/p6.png" },
];

const hotlines = [
  { country: "RUSSIA", number: "800-2508-157" },
  { country: "INDONESIA", number: "0800-1-157-157" },
  { country: "UAE", number: "800-9666-5466" },
  { country: "VIETNAM", number: "0888-000-157" },
  { country: "MALAYSIA", number: "6012-398-0157" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0].name);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [investorOpen, setInvestorOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProdOpen, setMobileProdOpen] = useState(false);

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Unified active state for background changes (Dropdowns Open OR Scrolled)
  const hasActiveState =
    megaOpen ||
    serviceOpen ||
    investorOpen ||
    newsOpen ||
    aboutOpen ||
    contactOpen ||
    isScrolled;

  // Debounce close logic
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startClose = () => {
    closeTimer.current = setTimeout(() => {
      setMegaOpen(false);
      setServiceOpen(false);
      setInvestorOpen(false);
      setNewsOpen(false);
      setAboutOpen(false);
      setContactOpen(false);
    }, 150);
  };
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileProdOpen(false);
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out"
      onMouseLeave={startClose}
      onMouseEnter={cancelClose}
    >
      {/* ── Header bar ────────────────────────────────── */}
      {/* 
         Logic: 
         - If scrolled OR dropdown open: White Frosted Background
         - Else: Transparent Background (Assuming Hero Image is behind)
      */}
      <header
        className={[
          "flex items-center justify-between px-6 py-5 lg:px-20 lg:py-6 transition-all duration-500 ease-in-out",
          hasActiveState
            ? "bg-white/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,34,83,0.08)] border-b border-white/20"
            : "bg-transparent",
        ].join(" ")}
      >
        {/* Logo */}
        <div
          className={[
            "text-2xl font-bold tracking-[0.2em] uppercase select-none transition-colors duration-300",
            hasActiveState ? "text-[#002253]" : "text-white",
          ].join(" ")}
        >
          CPL
        </div>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isCurrent =
              (megaOpen && link === "Products") ||
              (serviceOpen && link === "Service") ||
              (investorOpen && link === "Investor") ||
              (newsOpen && link === "News") ||
              (aboutOpen && link === "About ") ||
              (contactOpen && link === "Contact");

            return (
              <button
                key={link}
                onMouseEnter={() => {
                  if (link === "Products") {
                    setMegaOpen(true);
                    setServiceOpen(false);
                    setInvestorOpen(false);
                    setNewsOpen(false);
                    setAboutOpen(false);
                    setContactOpen(false);
                  } else if (link === "Service") {
                    setServiceOpen(true);
                    setMegaOpen(false);
                    setInvestorOpen(false);
                    setNewsOpen(false);
                    setAboutOpen(false);
                    setContactOpen(false);
                  } else if (link === "Investor") {
                    setInvestorOpen(true);
                    setMegaOpen(false);
                    setServiceOpen(false);
                    setNewsOpen(false);
                    setAboutOpen(false);
                    setContactOpen(false);
                  } else if (link === "News") {
                    setNewsOpen(true);
                    setMegaOpen(false);
                    setServiceOpen(false);
                    setInvestorOpen(false);
                    setAboutOpen(false);
                    setContactOpen(false);
                  } else if (link === "About ") {
                    setAboutOpen(true);
                    setMegaOpen(false);
                    setServiceOpen(false);
                    setInvestorOpen(false);
                    setNewsOpen(false);
                    setContactOpen(false);
                  } else if (link === "Contact") {
                    setContactOpen(true);
                    setMegaOpen(false);
                    setServiceOpen(false);
                    setInvestorOpen(false);
                    setNewsOpen(false);
                    setAboutOpen(false);
                  } else {
                    setMegaOpen(false);
                    setServiceOpen(false);
                    setInvestorOpen(false);
                    setNewsOpen(false);
                    setAboutOpen(false);
                    setContactOpen(false);
                  }
                }}
                className={[
                  "text-base font-medium tracking-wide whitespace-nowrap transition-colors duration-300 relative",
                  hasActiveState
                    ? isCurrent
                      ? "text-[#E55503]"
                      : "text-[#002253] hover:text-[#E55503]"
                    : isCurrent
                      ? "text-[#FF8B28]"
                      : "text-white/90 hover:text-[#FF8B28]",
                ].join(" ")}
              >
                {link}
                {/* Underline Indicator for Active State */}
                {isCurrent && (
                  <span className="absolute -bottom-[22px] left-0 right-0 h-[3px] bg-[#E55503] rounded-t-full shadow-[0_2px_10px_rgba(229,85,3,0.4)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop right icons */}
        <div
          className={[
            "hidden lg:flex items-center gap-5 transition-colors duration-300",
            hasActiveState ? "text-[#002253]" : "text-white",
          ].join(" ")}
        >
          <button
            aria-label="Search"
            className="hover:text-[#E55503] transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <span
            className={[
              "w-px h-5 transition-colors duration-300",
              hasActiveState ? "bg-gray-300" : "bg-white/30",
            ].join(" ")}
          />
          <button className="text-sm font-medium tracking-wide hover:text-[#E55503] transition-colors">
            Global
          </button>
          <button
            aria-label="Menu grid"
            className="hover:text-[#E55503] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={[
            "lg:hidden transition-colors duration-300",
            hasActiveState ? "text-[#002253]" : "text-white",
          ].join(" ")}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </header>

      {/* ── Desktop mega menu (Frosted) ───────────────── */}
      <div
        className={[
          "hidden lg:block w-full overflow-hidden transition-all duration-[400ms] ease-out backdrop-blur-xl",
          megaOpen
            ? "max-h-[700px] bg-white/95 border-b border-gray-100 shadow-[0_10px_40px_rgba(0,34,83,0.08)]"
            : "max-h-0 pointer-events-none",
        ].join(" ")}
      >
        <div
          className={[
            "flex flex-col min-h-[360px] mx-auto max-w-7xl px-10 lg:px-20 transition-[opacity,transform] duration-[400ms] ease-out",
            megaOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
          ].join(" ")}
        >
          <div className="flex flex-1">
            {/* Left column — categories */}
            <div className="w-72 flex-shrink-0 border-r border-gray-100 py-6 bg-white/50 rounded-r-2xl my-2">
              {categories.map((cat) => {
                const isActivecat = activeCategory === cat.name;
                return (
                  <div
                    key={cat.name}
                    onMouseEnter={() => setActiveCategory(cat.name)}
                    className={[
                      "flex items-center gap-3 px-5 py-3 cursor-pointer transition-all duration-200 rounded-l-lg border-l-4",
                      isActivecat
                        ? "bg-gradient-to-r from-[#E55503]/5 to-transparent border-[#E55503] text-[#002253]"
                        : "hover:bg-gray-50 border-transparent text-[#224B88]",
                    ].join(" ")}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-10 w-auto object-contain flex-shrink-0 opacity-80 group-hover:opacity-100"
                    />
                    <span
                      className={[
                        "text-sm font-semibold leading-tight",
                        isActivecat ? "text-[#E55503]" : "text-gray-600",
                      ].join(" ")}
                    >
                      {cat.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Right column — service panel */}
            <div className="flex-1 flex flex-col justify-between py-8 px-12">
              <div className="flex gap-20">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
                    Service Support
                  </p>
                  <ul className="space-y-3">
                    {[" Services", "Service Network"].map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-base text-[#002253] hover:text-[#E55503] transition-colors duration-200 font-medium group flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#E55503] transition-colors"></span>
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
                    Service Hotline
                  </p>
                  <ul className="space-y-3">
                    {hotlines.map(({ country, number }) => (
                      <li
                        key={country}
                        className="flex items-center gap-4 group cursor-pointer"
                      >
                        <span className="w-24 text-xs font-bold text-gray-400 group-hover:text-[#224B88] transition-colors">
                          {country}
                        </span>
                        <span className="text-base text-[#002253] font-semibold tabular-nums group-hover:text-[#E55503] transition-colors">
                          {number}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end">
                <div className="inline-flex items-center bg-[#002253] px-5 py-2.5 rounded-full shadow-lg shadow-[#002253]/20">
                  <span className="text-white text-xs font-bold tracking-[0.25em] uppercase">
                    
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom action buttons */}
          <div className="flex items-center gap-4 border-t border-gray-100 py-6 bg-white/30 backdrop-blur-sm rounded-b-2xl mb-2">
            <button className="px-8 py-3 rounded-full border border-[#002253] text-[#002253] text-sm font-bold hover:bg-[#002253] hover:text-white transition-all duration-300 shadow-sm">
              Inquiry
            </button>
            <button className="px-8 py-3 rounded-full bg-[#E55503] text-white text-sm font-bold hover:bg-[#FF8B28] transition-all duration-300 shadow-md shadow-[#E55503]/30">
              Online consultation
            </button>
          </div>
        </div>
      </div>

      {/* ── Service subnav (Frosted Full-width) ─────────────── */}
      <div
        className={[
          "hidden lg:block w-full overflow-hidden transition-all duration-[350ms] ease-out backdrop-blur-xl",
          serviceOpen
            ? "max-h-[80px] bg-white/95 border-b border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            : "max-h-0 pointer-events-none",
        ].join(" ")}
      >
        <div
          className={[
            "flex items-center gap-10 px-20 h-[70px] transition-[opacity,transform] duration-[350ms] ease-out",
            serviceOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-3",
          ].join(" ")}
        >
          <span className="text-lg font-bold text-[#002253] whitespace-nowrap">
            Service
          </span>
          <span className="w-px h-6 bg-gray-300 flex-shrink-0" />
          {[
            " Services",
            "Services Offered",
            "Service Network",
            "Parts Network",
          ].map((item) => (
            <a
              key={item}
              href="#"
              className="text-base text-[#224B88] hover:text-[#E55503] transition-colors duration-200 whitespace-nowrap font-medium"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* ── Investor subnav (Frosted Full-width) ─────────────── */}
      <div
        className={[
          "hidden lg:block w-full overflow-hidden transition-all duration-[350ms] ease-out backdrop-blur-xl",
          investorOpen
            ? "max-h-[80px] bg-white/95 border-b border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            : "max-h-0 pointer-events-none",
        ].join(" ")}
      >
        <div
          className={[
            "flex items-center gap-10 px-20 h-[70px] transition-[opacity,transform] duration-[350ms] ease-out",
            investorOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-3",
          ].join(" ")}
        >
          <span className="text-lg font-bold text-[#002253] whitespace-nowrap">
            Investor
          </span>
          <span className="w-px h-6 bg-gray-300 flex-shrink-0" />
          {["Stock Chart", "Announcements", "Financial Reports"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-base text-[#224B88] hover:text-[#E55503] transition-colors duration-200 whitespace-nowrap font-medium"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* ── News subnav (Frosted Full-width) ─────────────────── */}
      <div
        className={[
          "hidden lg:block w-full overflow-hidden transition-all duration-[350ms] ease-out backdrop-blur-xl",
          newsOpen
            ? "max-h-[80px] bg-white/95 border-b border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            : "max-h-0 pointer-events-none",
        ].join(" ")}
      >
        <div
          className={[
            "flex items-center gap-10 px-20 h-[70px] transition-[opacity,transform] duration-[350ms] ease-out",
            newsOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3",
          ].join(" ")}
        >
          <span className="text-lg font-bold text-[#002253] whitespace-nowrap">
            News
          </span>
          <span className="w-px h-6 bg-gray-300 flex-shrink-0" />
          {["Press Release", "Events", "Video"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-base text-[#224B88] hover:text-[#E55503] transition-colors duration-200 whitespace-nowrap font-medium"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* ── About  subnav (Frosted Full-width) ──────── */}
      <div
        className={[
          "hidden lg:block w-full overflow-hidden transition-all duration-[350ms] ease-out backdrop-blur-xl",
          aboutOpen
            ? "max-h-[80px] bg-white/95 border-b border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            : "max-h-0 pointer-events-none",
        ].join(" ")}
      >
        <div
          className={[
            "flex items-center gap-10 px-20 h-[70px] transition-[opacity,transform] duration-[350ms] ease-out",
            aboutOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-3",
          ].join(" ")}
        >
          <span className="text-lg font-bold text-[#002253] whitespace-nowrap">
            About 
          </span>
          <span className="w-px h-6 bg-gray-300 flex-shrink-0" />
          {[
            "Company Profile",
            "Technology & Innovation",
            "Social Responsibility",
            "Career",
          ].map((item) => (
            <a
              key={item}
              href="#"
              className="text-base text-[#224B88] hover:text-[#E55503] transition-colors duration-200 whitespace-nowrap font-medium"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* ── Contact subnav (Frosted Full-width) ─────────────── */}
      <div
        className={[
          "hidden lg:block w-full overflow-hidden transition-all duration-[350ms] ease-out backdrop-blur-xl",
          contactOpen
            ? "max-h-[80px] bg-white/95 border-b border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            : "max-h-0 pointer-events-none",
        ].join(" ")}
      >
        <div
          className={[
            "flex items-center gap-10 px-20 h-[70px] transition-[opacity,transform] duration-[350ms] ease-out",
            contactOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-3",
          ].join(" ")}
        >
          <span className="text-lg font-bold text-[#002253] whitespace-nowrap">
            Contact
          </span>
          <span className="w-px h-6 bg-gray-300 flex-shrink-0" />
          {["Contact Us"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-base text-[#224B88] hover:text-[#E55503] transition-colors duration-200 whitespace-nowrap font-medium"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* ── Mobile menu ──────────────────────────────────────── */}
      <div
        className={[
          "lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-y-auto transition-all duration-300 ease-in-out",
          mobileOpen
            ? "max-h-[calc(100vh-80px)] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        {navLinks.map((link) =>
          link === "Products" ? (
            <div key={link}>
              <button
                onClick={() => setMobileProdOpen((v) => !v)}
                className="w-full flex items-center justify-between px-6 py-4 text-[#002253] font-semibold border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <span>Products</span>
                <svg
                  className={[
                    "transition-transform duration-200 text-[#E55503]",
                    mobileProdOpen ? "rotate-180" : "",
                  ].join(" ")}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Categories accordion */}
              <div
                className={[
                  "overflow-hidden transition-all duration-300 ease-in-out bg-gray-50/50",
                  mobileProdOpen ? "max-h-[500px]" : "max-h-0",
                ].join(" ")}
              >
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex items-center gap-3 px-8 py-4 border-b border-gray-100 hover:bg-white transition-colors cursor-pointer group"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-8 w-auto object-contain flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="text-sm text-[#224B88] font-medium group-hover:text-[#E55503] transition-colors">
                      {cat.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <a
              key={link}
              href="#"
              onClick={closeMobile}
              className="block px-6 py-4 text-[#002253] font-semibold border-b border-gray-100 hover:bg-gray-50 hover:text-[#E55503] transition-colors"
            >
              {link}
            </a>
          ),
        )}

        {/* Mobile Buttons */}
        <div className="p-6 space-y-3">
          <button className="w-full py-3 rounded-full border-2 border-[#002253] text-[#002253] font-bold hover:bg-[#002253] hover:text-white transition-all">
            Inquiry
          </button>
          <button className="w-full py-3 rounded-full bg-[#E55503] text-white font-bold hover:bg-[#FF8B28] shadow-lg shadow-[#E55503]/30 transition-all">
            Online consultation
          </button>
        </div>
      </div>
    </div>
  );
}
