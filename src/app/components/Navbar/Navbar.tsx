"use client";

import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Top Bar Links (Use)
const useLinks = [
  { name: "Projects", href: "/ourWorks" },
  { name: "Solutions", href: "/solutions" },
  { name: "Process", href: "/process" },
  { name: "Coverage", href: "/coverage" },
  { name: "Insights", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

// Main Navigation Links (Home)
const mainLinks = ["Home", "About", "Services", "Projects", "Blog", "Contact"];

// Keep Categories for Mega Menu (if used, e.g., under Solutions or Projects)
const categories = [
  {
    name: "Earthmoving Machinery",
    image: "/images/Nav-Photos/p1.png",
    slug: "earthmoving",
  },
  { name: "MEWPs", image: "/images/Nav-Photos/p2.png", slug: "mewps" },
  {
    name: "Mobile Crane Machinery",
    image: "/images/Nav-Photos/p3.png",
    slug: "mobile-crane",
  },
  {
    name: "Construction Hoisting Machinery",
    image: "/images/Nav-Photos/p4.png",
    slug: "hoisting",
  },
  {
    name: "Concrete Machinery",
    image: "/images/Nav-Photos/p5.png",
    slug: "concrete",
  },
  {
    name: "Agricultural Machinery",
    image: "/images/Nav-Photos/p6.png",
    slug: "agricultural",
  },
];

const hotlines = [
  { country: "RUSSIA", number: "800-2508-157" },
  { country: "INDONESIA", number: "0800-1-157-157" },
  { country: "UAE", number: "800-9666-5466" },
  { country: "VIETNAM", number: "0888-000-157" },
  { country: "MALAYSIA", number: "6012-398-0157" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);

  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0].name);
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

  // Unified active state for background changes
  const hasActiveState = isScrolled || megaOpen;

  // Debounce close logic
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startClose = () => {
    closeTimer.current = setTimeout(() => {
      setMegaOpen(false);
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

  // Determine link styling
  const getLinkClass = (isActive: boolean) => {
    return [
      "text-base font-medium tracking-wide whitespace-nowrap transition-colors duration-300 relative",
      hasActiveState
        ? "text-[#002253] hover:text-[#E55503]"
        : "text-white/90 hover:text-[#FF8B28]",
    ].join(" ");
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out"
      onMouseLeave={startClose}
      onMouseEnter={cancelClose}
    >
      {/* ── TOP UTILITY BAR (Use) ──────────────────────────────── */}
      <div className="bg-[#002253] text-slate-300 text-[11px] uppercase tracking-widest py-2 px-4 lg:px-20 flex justify-between items-center border-b border-white/10">
        <div className="hidden md:flex items-center gap-4">
          <span className="text-[#E55503] font-bold">USE:</span>
          {useLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4 text-[10px]">
          <span>© 2024 CPL Group</span>
          <span className="w-px h-3 bg-white/20"></span>
          <span>Privacy Policy</span>
        </div>
      </div>

      {/* ── Header bar ────────────────────────────────── */}
      <header
        className={[
          "flex items-center justify-between px-6 py-4 lg:px-20 transition-all duration-500 ease-in-out",
          hasActiveState
            ? "bg-white/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,34,83,0.08)] border-b border-white/20"
            : "bg-transparent",
        ].join(" ")}
      >
        {/* Logo */}
        <Link
          href="/"
          className={[
            "text-2xl font-bold tracking-[0.2em] uppercase select-none transition-colors duration-300",
            hasActiveState
              ? "text-secondary"
              : "text-white hover:text-secondary",
          ].join(" ")}
        >
          CPL
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-8">
          {mainLinks.map((link) => {
            const handleEnter = () => {
              // In this new structure, we might map "Projects" or "Services" to the Mega Menu
              // Or just keep them as simple links as per the request.
              // For now, we will keep them as simple links unless you want the Mega Menu back.
              // If you hover "Solutions" or "Projects", let's trigger the Mega Menu.
              if (link === "Projects" || link === "Services") {
                setMegaOpen(true);
              } else {
                setMegaOpen(false);
              }
            };

            // Map "Projects" to Construction Cases if needed
            let linkHref = "/";
            if (link === "Home") linkHref = "/";
            if (link === "About") linkHref = "/about";
            if (link === "Services") linkHref = "/solutions"; // Or /service
            if (link === "Projects") linkHref = "/ourWorks";
            if (link === "Blog") linkHref = "/blog";
            if (link === "Contact") linkHref = "/contact";

            return (
              <Link
                key={link}
                href={linkHref}
                onMouseEnter={handleEnter}
                className={getLinkClass(
                  megaOpen && (link === "Projects" || link === "Services"),
                )}
              >
                {link}
              </Link>
            );
          })}
        </nav>

        {/* Desktop right icons */}
        <div
          className={[
            "hidden lg:flex items-center gap-5 transition-colors duration-300",
            hasActiveState
              ? "text-secondary"
              : "text-white hover:text-secondary",
          ].join(" ")}
        >
          <Link
            href="/search"
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
          </Link>
          <span
            className={[
              "w-px h-5 transition-colors duration-300",
              hasActiveState ? "bg-gray-300" : "bg-white/30",
            ].join(" ")}
          />
          <Link
            href="/global-network"
            className="text-sm font-medium tracking-wide hover:text-[#E55503] transition-colors"
          >
            Global
          </Link>

          <Link
            href="/sitemap"
            aria-label="Menu grid"
            className="hover:text-[#E55503] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </Link>
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

      {/* ── Desktop mega menu (Reused for Projects/Solutions) ───────────────── */}
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
                  <Link
                    key={cat.name}
                    href={`/products/${cat.slug}`}
                    onMouseEnter={() => setActiveCategory(cat.name)}
                    className={[
                      "flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors duration-150 rounded-sm",
                      isActivecat ? "bg-primary" : "hover:bg-gray-50",
                    ].join(" ")}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-10 w-auto object-contain flex-shrink-0"
                    />
                    <span
                      className={[
                        "text-sm font-medium leading-tight",
                        isActivecat ? "text-white" : "text-secondary",
                      ].join(" ")}
                    >
                      {cat.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Right column — service panel */}
            <div className="flex-1 flex flex-col justify-between py-8 px-12">
              <div className="flex gap-20">
                <div>
                  <p className="text-sm font-bold tracking-[0.18em] text-secondary-light uppercase mb-3">
                    Service Support
                  </p>
                  <ul className="space-y-2">
                    {[
                      { name: "CPL Services", href: "/solutions/services" },
                      { name: "Service Network", href: "/solutions/network" },
                    ].map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-base text-secondary-light hover:text-primary transition-colors duration-150 font-medium"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-bold tracking-[0.18em] text-secondary-light uppercase mb-3">
                    Service Hotline
                  </p>
                  <ul className="space-y-2">
                    {hotlines.map(({ country, number }) => (
                      <li key={country} className="flex items-center gap-3">
                        <span className="w-24 text-sm font-semibold tracking-wide text-secondary-light">
                          {country}
                        </span>
                        <a
                          href={`tel:${number}`}
                          className="text-base text-secondary font-medium tabular-nums hover:text-primary"
                        >
                          {number}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <div className="inline-flex items-center bg-primary px-4 py-2">
                  <span className="text-white text-xs font-bold tracking-[0.25em] uppercase">
                    CPL
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom action buttons */}
          <div className="flex items-center gap-3 border-t border-gray-100 py-5">
            <Link
              href="/inquiry"
              className="px-6 py-2.5 rounded-full bg-secondary/5 text-secondary text-sm font-medium hover:bg-secondary/10 transition-colors duration-200"
            >
              Inquiry
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors duration-200"
            >
              Online consultation
            </Link>
          </div>
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
        {/* Mobile Top Bar Links */}
        <div className="px-6 py-4 bg-[#002253] text-white">
          <p className="text-xs font-bold tracking-widest text-[#E55503] mb-2">
            USE
          </p>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-wider text-slate-300">
            {useLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMobile}
                className="hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Main Links */}
        {mainLinks.map((link) => {
          let mobileLinkHref = "/";
          if (link === "Home") mobileLinkHref = "/";
          if (link === "About") mobileLinkHref = "/about";
          if (link === "Services") mobileLinkHref = "/solutions";
          if (link === "Projects") mobileLinkHref = "/ourWorks";
          if (link === "Blog") mobileLinkHref = "/blog";
          if (link === "Contact") mobileLinkHref = "/contact";

          return (
            <Link
              key={link}
              href={mobileLinkHref}
              onClick={closeMobile}
              className="block px-6 py-4 text-secondary font-medium border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              {link}
            </Link>
          );
        })}

        {/* Mobile Buttons */}
        <div className="p-6 space-y-3">
          <Link
            href="/inquiry"
            className="block w-full text-center py-3 rounded-full border-2 border-[#002253] text-[#002253] font-bold hover:bg-[#002253] hover:text-white transition-all"
          >
            Inquiry
          </Link>
          <Link
            href="/contact"
            className="block w-full text-center py-3 rounded-full bg-[#E55503] text-white font-bold hover:bg-[#FF8B28] shadow-lg shadow-[#E55503]/30 transition-all"
          >
            Online consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
