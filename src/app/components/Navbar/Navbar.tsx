"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, X, Menu } from "lucide-react";

// Color constants
const COLORS = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

const getLinkHref = (link: string) => {
  switch (link) {
    case "Home":
      return "/";
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

const mainLinks = ["Home", "About", "Services", "Projects", "Blog", "Contact"];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Helper: check if a link is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Handle Search Redirect
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <div className="relative transition-all duration-500 ease-out">
      {/* ── Header bar ────────────────────────────────── */}
      <header className="fixed top-0 left-0 z-50 w-full lg:top-2 lg:left-1/2 lg:w-[92%] lg:max-w-7xl lg:-translate-x-1/2 lg:px-0">
        <div
          className={`flex items-center justify-between transition-all duration-300 px-5 py-4 ${
            isScrolled ? "bg-white border-b border-slate-200" : "bg-transparent"
          } lg:rounded-full lg:px-8 lg:py-4 lg:border ${
            isScrolled
              ? "lg:bg-white/10 lg:backdrop-blur-lg lg:border-white/20 lg:shadow-lg lg:shadow-black/5"
              : "lg:bg-transparent lg:border-transparent"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className={`font-bold uppercase tracking-[0.4em] transition-colors duration-300 text-lg lg:text-3xl ${
              isActive("/")
                ? "text-[#224B88]"
                : isScrolled
                  ? "text-[#F97316]"
                  : "text-white"
            }`}
          >
            CPL
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {mainLinks.map((link) => {
              const href = getLinkHref(link);
              const active = isActive(href);

              return (
                <Link
                  key={link}
                  href={href}
                  className={`relative text-sm font-medium transition-all duration-300 pb-0.5 ${
                    active
                      ? "text-[#224B88]"
                      : isScrolled
                        ? "text-slate-600 hover:text-[#002253]"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {link}

                  {/* Active underline indicator */}
                  <span
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2.5px] rounded-full transition-all duration-300 ${
                      active ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                    style={{
                      background: `linear-gradient(to right, ${COLORS.blue}, ${COLORS.orangeLight})`,
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden lg:flex items-center rounded-xl bg-[#F97316] px-6 py-3 text-sm font-semibold text-white hover:bg-[#EA580C] transition-all duration-300 hover:shadow-lg hover:shadow-[#F97316]/25"
          >
            Get Started
          </Link>

          {/* Mobile Hamburger */}
          <button
            className={`lg:hidden transition-colors duration-300 ${
              isScrolled ? "text-[#002253]" : "text-white"
            }`}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ── Mobile menu ──────────────────────────────────────── */}
      <div
        className={`lg:hidden fixed top-[64px] left-0 right-0 z-40 bg-black/70 backdrop-blur-xl duration-300 overflow-hidden ${
          mobileOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Mobile Main Links */}
        {mainLinks.map((link) => {
          const href = getLinkHref(link);
          const active = isActive(href);

          return (
            <Link
              key={link}
              href={href}
              className={`flex items-center justify-between px-6 py-4 font-medium border-b border-gray-100/50 transition-all duration-200 ${
                active
                  ? "bg-[#224B88]/[0.06] text-[#224B88]"
                  : "text-[#002253] hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center gap-3">
                {/* Active dot indicator */}
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    active
                      ? "bg-[#224B88] scale-100 opacity-100"
                      : "bg-transparent scale-0 opacity-0"
                  }`}
                />
                {link}
              </span>

              {/* Active arrow */}
              {active && (
                <span
                  className="text-xs font-bold tracking-wider uppercase opacity-60"
                  style={{ color: COLORS.blue }}
                >
                  Current
                </span>
              )}
            </Link>
          );
        })}

        {/* Mobile Buttons */}
        <div className="p-6 space-y-3 bg-white">
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

      {/* ── SEARCH MODAL ──────────────────────────────────────── */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 md:pt-32 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center gap-4 p-6 border-b border-gray-100">
                <Search className="text-gray-400" size={24} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for projects, services, or insights..."
                  className="flex-1 text-xl outline-none text-[#002253] placeholder:text-gray-400 bg-transparent"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Close"
                >
                  <X size={24} strokeWidth={2} />
                </button>
              </div>
              <div className="p-4 bg-gray-50 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#002253] text-white rounded-lg hover:bg-[#E55503] transition-colors font-medium"
                >
                  Go to Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
