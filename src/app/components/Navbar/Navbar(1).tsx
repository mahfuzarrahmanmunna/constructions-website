"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, X, Menu } from "lucide-react";
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

        // Direct DOM manipulation for best performance (no re-renders)
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
          className={`w-full border-b transition-all duration-300 ${
            isScrolled
              ? "bg-white border-slate-200 shadow-sm"
              : "bg-white/95 border-transparent backdrop-blur-md"
          }`}
        >
          {/* Content Container (Matches site max-width) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <figure className="w-20 lg:w-24">
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
            <nav className="hidden lg:flex items-center gap-8">
              {mainLinks.map((link) => {
                const href = getLinkHref(link);
                const active = isActive(href);
                return (
                  <Link
                    key={link}
                    href={href}
                    className={`relative text-sm font-medium transition-colors duration-200 pb-1 ${
                      active
                        ? "text-[#224B88]"
                        : "text-slate-600 hover:text-[#002253]"
                    }`}
                  >
                    {link}
                    {/* Active Indicator */}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#224B88] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-lg bg-[#F97316] text-sm font-semibold text-white hover:bg-[#EA580C] transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Login
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden text-slate-700 hover:text-[#002253] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      <div
        className={`lg:hidden fixed top-[72px] left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-lg transition-all duration-300 overflow-hidden ${
          mobileOpen
            ? "max-h-[calc(100vh-72px)] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="overflow-y-auto max-h-[calc(100vh-140px)]">
          {mainLinks.map((link) => {
            const href = getLinkHref(link);
            const active = isActive(href);
            return (
              <Link
                key={link}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-6 py-4 text-base font-medium border-b border-slate-100 transition-colors ${
                  active
                    ? "text-[#224B88] bg-blue-50/50"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{link}</span>
                {active && (
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#224B88]/60">
                    Active
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 space-y-2 bg-slate-50 border-t border-slate-200">
          <Link
            href="/inquiry"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center py-3 rounded-lg border-2 border-[#002253] text-[#002253] font-bold hover:bg-[#002253] hover:text-white transition-all"
          >
            Inquiry
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center py-3 rounded-lg bg-[#E55503] text-white font-bold hover:bg-[#FF8B28] transition-all"
          >
            Online Consultation
          </Link>
        </div>
      </div>

      {/* ── SEARCH MODAL ── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-[#002253] rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearch}>
              <div className="flex items-center gap-4 p-5 border-b border-white/10">
                <Search className="text-white/50" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, projects, services..."
                  className="flex-1 text-lg outline-none text-white placeholder:text-white/30 bg-transparent"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-white/50 hover:text-red-400 transition-colors"
                  aria-label="Close"
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>
              <div className="p-3 bg-[#001a40] flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#F97316] text-white rounded-lg hover:bg-[#EA580C] transition-colors text-sm font-medium"
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
