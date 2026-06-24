"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, X, Menu, ArrowRight } from "lucide-react";
import Image from "next/image";

const mainLinks = [
  "Home",
  "Products",
  "Projects",
  "Services",
  "About",
  "Contact",
];

const getLinkHref = (link: string) => {
  switch (link) {
    case "Home":
      return "/";
    case "Products":
      return "/products";
    case "About":
      return "/about";
    case "Services":
      return "/service";
    case "Projects":
      return "/ourWorks";
    case "Blog":
      return "/blogs";
    case "Contact":
      return "/contact";
    default:
      return "/";
  }
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Active route check
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Scroll Logic: Hide on Down, Show on Up
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        setIsScrolled(currentY > 50);

        // Direct DOM manipulation for buttery smooth performance (no React re-renders)
        if (headerRef.current) {
          if (currentY > lastY && currentY > 80) {
            headerRef.current.style.transform = "translateY(-100%)";
          } else {
            headerRef.current.style.transform = "translateY(0)";
          }
        }
        lastY = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* ── FULL WIDTH HEADER ── */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
      >
        {/* Background & Border Layer */}
        <div
          className={`w-full border-b transition-all duration-500 ease-out ${
            isScrolled
              ? "bg-white/45 backdrop-blur-xl border-slate-100 shadow-[0_4px_30px_rgba(0,34,83,0.06)]"
              : "bg-white/40 border-transparent backdrop-blur-md"
          }`}
        >
          {/* Content Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[76px]">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 relative group">
              <figure className="w-20 lg:w-24 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/finallogo.png"
                  alt="CPL LOGO"
                  width={150}
                  height={50}
                  className="object-contain"
                  priority
                />
              </figure>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainLinks.map((link) => {
                const href = getLinkHref(link);
                const active = isActive(href);
                return (
                  <Link
                    key={link}
                    href={href}
                    className={`relative px-4 py-2 text-[13px] font-semibold tracking-[0.03em] uppercase transition-colors duration-300 group ${
                      active
                        ? "text-[#224B88]"
                        : "text-slate-600 hover:text-[#002253]"
                    }`}
                  >
                    {link}
                    {/* Premium Underline Indicator */}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] rounded-full transition-all duration-300 ease-out ${
                        active
                          ? "w-6 bg-[#224B88]"
                          : "w-0 bg-[#002253]/30 group-hover:w-4"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className="group relative px-6 py-2.5 rounded-lg text-[13px] font-bold tracking-wide text-white overflow-hidden transition-all duration-300 shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-px"
                style={{
                  background:
                    "linear-gradient(135deg, #E55503 0%, #FF8B28 100%)",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>

              <div className="w-px h-6 bg-slate-200 mx-1" />

              <Link
                href="/login"
                className="px-5 py-2.5 rounded-lg border border-slate-200 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-[#002253] transition-all duration-300"
              >
                Login
              </Link>
            </div>

            {/* Mobile Right Side Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Open Search"
              >
                <Search size={20} strokeWidth={2} />
              </button>

              <button
                className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`block h-[2px] w-full bg-current rounded-full transition-all origin-center duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                  />
                  <span
                    className={`block h-[2px] w-full bg-current rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`}
                  />
                  <span
                    className={`block h-[2px] w-full bg-current rounded-full transition-all origin-center duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      <div
        className={`lg:hidden fixed top-[76px] left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${
          mobileOpen
            ? "max-h-[calc(100vh-76px)] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none border-transparent shadow-none"
        }`}
      >
        <nav className="overflow-y-auto max-h-[calc(100vh-200px)] py-2">
          {mainLinks.map((link, index) => {
            const href = getLinkHref(link);
            const active = isActive(href);
            return (
              <div
                key={link}
                className="relative overflow-hidden"
                style={{
                  transitionDelay: mobileOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-4 px-6 py-4 text-[15px] font-medium transition-all duration-300 border-l-2 ${
                    active
                      ? "text-[#224B88] bg-blue-50/50 border-l-[#224B88]"
                      : "text-slate-600 border-l-transparent hover:text-[#002253] hover:bg-slate-50 hover:border-l-slate-300"
                  }`}
                >
                  <span
                    className={`transition-transform duration-300 ${active ? "translate-x-0" : "-translate-x-2 opacity-0"}`}
                  >
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </span>
                  {link}
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="p-5 space-y-3 bg-slate-50/80 border-t border-slate-100">
          <Link
            href="/inquiry"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center py-3.5 rounded-lg border-2 border-[#002253] text-[#002253] font-bold text-sm tracking-wide hover:bg-[#002253] hover:text-white transition-all duration-300"
          >
            Inquiry
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center py-3.5 rounded-lg text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-md shadow-orange-500/20"
            style={{
              background: "linear-gradient(135deg, #E55503 0%, #FF8B28 100%)",
            }}
          >
            Online Consultation
          </Link>
        </div>
      </div>

      {/* ── SEARCH MODAL ── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-24 sm:pt-32 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-[#002253] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearch}>
              <div className="flex items-center gap-4 p-6 border-b border-white/10">
                <Search className="text-white/40" size={22} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, projects, services..."
                  className="flex-1 text-lg outline-none text-white placeholder:text-white/30 bg-transparent font-medium"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-red-400 hover:bg-white/10 transition-all duration-200"
                  aria-label="Close"
                >
                  <X size={18} strokeWidth={2} />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#00122e]">
                <span className="text-xs text-white/25 hidden sm:block">
                  Press{" "}
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/40 text-[10px] font-mono mx-1">
                    ESC
                  </kbd>{" "}
                  to close
                </span>
                <button
                  type="submit"
                  className="ml-auto px-6 py-2.5 text-white rounded-lg text-sm font-bold transition-all duration-300 shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-px"
                  style={{
                    background:
                      "linear-gradient(135deg, #E55503 0%, #FF8B28 100%)",
                  }}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
