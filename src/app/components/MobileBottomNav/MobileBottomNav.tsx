"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, LayoutGrid, Briefcase, Phone, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY.current && current > 80) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Updated with your exact route paths
  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: LayoutGrid },
    { name: "Services", href: "/service", icon: Briefcase, isMain: true }, // Center main button
    { name: "Contact", href: "/contact", icon: Phone },
    { name: "Menu", href: "#", icon: Menu }, // Can be used to open a sidebar for About, Projects, Blog
  ];

  const isActive = (href: string) => {
    if (href === "#") return false;
    return pathname === href;
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0B1120]/95 backdrop-blur-xl border-t border-white/10 pb-5 pt-3 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]
        transition-transform duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{
        transform: navVisible ? "translateY(0)" : "translateY(100%)",
      }}
    >
      <div className="flex items-center justify-around px-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                group relative flex flex-col items-center justify-center w-16 transition-all duration-300
                ${item.isMain ? "-mt-8" : "mt-0"}
              `}
            >
              {item.isMain ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-primary blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300 rounded-full" />
                  <div
                    className={`
                      relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300
                      ${active ? "bg-primary scale-110 shadow-[0_0_20px_rgba(229,85,3,0.4)]" : "bg-secondary border-2 border-primary/30 group-hover:border-primary"}
                    `}
                  >
                    <Icon
                      className={`w-6 h-6 transition-colors ${active ? "text-white" : "text-primary group-hover:text-primary-light"}`}
                    />
                  </div>
                  <span
                    className={`absolute -bottom-6 text-[10px] font-bold tracking-wider transition-colors ${active ? "text-primary" : "text-slate-400 group-hover:text-slate-200"}`}
                  >
                    {item.name}
                  </span>
                </div>
              ) : (
                <>
                  <div
                    className={`
                      mb-1 p-1.5 rounded-xl transition-all duration-300
                      ${active ? "bg-white/10" : "group-hover:bg-white/5"}
                    `}
                  >
                    <Icon
                      className={`
                        w-6 h-6 transition-colors duration-300
                        ${active ? "text-primary" : "text-slate-400 group-hover:text-slate-200"}
                      `}
                    />
                  </div>
                  <span
                    className={`
                      w-1 h-1 rounded-full transition-all duration-300
                      ${active ? "bg-primary scale-125" : "bg-transparent"}
                    `}
                  />
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
