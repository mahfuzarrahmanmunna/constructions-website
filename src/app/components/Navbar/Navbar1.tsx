"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Menu } from "lucide-react"; // Added icons

// Top Bar Links (Use)
const useLinks = [
  { name: "Projects", href: "/ourWorks" },
  { name: "Solutions", href: "/solutions" },
  { name: "Process", href: "/process" },
  { name: "Coverage", href: "/coverage" },
  { name: "Insights", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

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
      return "/blog";
    case "Contact":
      return "/contact";
    default:
      return "/";
  }
};
// Main Navigation Links (Home)
const mainLinks = ["Home", "About", "Services", "Projects", "Blog", "Contact"];

// Keep Categories for Mega Menu (if used, e.g., under Solutions or Projects

export default function Navbar() {
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // --- Search Modal States ---
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div
      className="relative transition-all duration-500 ease-out"
    >

      {/* ── Header bar ────────────────────────────────── */}
        <header className="fixed top-0 left-0 z-50 w-full px-4 py-4 lg:top-2 lg:left-1/2 lg:w-[92%] lg:max-w-7xl lg:-translate-x-1/2">
          <div
            className={`flex items-center justify-between transition-all duration-300
              ${
                isScrolled
                  ? "border-b border-white/20 bg-white/5 backdrop-blur-lg"
                  : "bg-transparent text-[#002253]"
              }
              lg:rounded-full lg:px-8 lg:py-4 lg:border text-[#002253]
              ${
                isScrolled
                  ? "lg:border-white/20 lg:bg-white/10 lg:backdrop-blur-lg lg:shadow-lg lg:shadow-black/5"
                  : "lg:border-transparent "
              }
            `}
          >
            {/* Logo */}
            <Link
              href="/"
              className={`font-bold uppercase tracking-[0.4em] transition-colors
                ${
                  isScrolled ? "text-[#002253]" : "text-white"
                }
                text-lg lg:text-3xl
              `}
            >
              CPL
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {mainLinks.map((link) => (
                <Link
                  key={link}
                  href={getLinkHref(link)}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isScrolled
                      ? "text-[#002253] hover:text-[#E55503]"
                      : "text-white hover:text-[#FF8B28]"
                  }`}
                                  >
                  {link}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <Link
              href="/contact"
              className="hidden lg:flex items-center rounded-xl bg-[#F97316] px-6 py-3 text-sm font-semibold text-white hover:bg-[#EA580C] transition"
            >
              Get Started
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden text-white"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </header>

      {/* ── Mobile menu ──────────────────────────────────────── */}
        <div
          className={`lg:hidden fixed top-[64px] left-0 right-0 z-40
            bg-black/70 backdrop-blur-xl
            transition-all duration-300 overflow-hidden
            ${
              mobileOpen
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0 pointer-events-none"
            }
          `}
        >

        {/* Mobile Main Links */}
        {mainLinks.map((link) => {
          let mobileLinkHref = "/";
          if (link === "Home") mobileLinkHref = "/";
          if (link === "About") mobileLinkHref = "/about";
          if (link === "Services") mobileLinkHref = "/solutions";
          if (link === "Projects") mobileLinkHref = "/ourWorks";
          if (link === "Blog") mobileLinkHref = "/blogs";
          if (link === "Contact") mobileLinkHref = "/contact";

          return (
            <Link
              key={link}
              href={mobileLinkHref}
              className="block px-6 py-4 text-[#002253] font-medium border-b border-gray-100 hover:bg-gray-50 transition-colors"
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
              {/* Optional: Suggestion area could go here */}
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
