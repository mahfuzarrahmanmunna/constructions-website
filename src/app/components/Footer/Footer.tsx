"use client";

import React, { useState } from "react";
import { Send, MapPin, Phone, Mail, Globe } from "lucide-react";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

// --- Color Palette ---
const COLORS = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

// --- Mock Data ---
const productLinks = [
  "Earthmoving Machinery",
  "Mobile Crane Machinery",
  "Concrete Machinery",
  "Agricultural Machinery",
  "Construction Hoisting",
  "MEWPs",
];

const companyLinks = [
  "About CPL",
  "News & Events",
  "Investor Relations",
  "Careers",
  "Contact Us",
  "Sustainability",
];

const socialLinks = [
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="relative bg-[#00122e] text-white overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-1/3 h-1/2 bg-[#E55503] opacity-[0.03] blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-1/3 h-1/2 bg-[#224B88] opacity-[0.05] blur-[120px] pointer-events-none"></div>

      {/* Sleek Top Gradient Line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E55503] to-transparent opacity-80"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-10">
        {/* Main Grid Layout - 4/2/2/4 split for better balance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Column 1: Brand & Info */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-[0.15em] uppercase mb-1">
                CPL
              </h2>
              <div className="w-10 h-0.5 bg-gradient-to-r from-[#E55503] to-[#FF8B28] rounded-full"></div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Leading global manufacturer of heavy machinery and construction
              equipment. Engineering excellence for a sustainable future.
            </p>

            {/* Contact Info - Cleaner layout */}
            <div className="space-y-4 pt-2">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group"
              >
                <div className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-[#E55503]/10 group-hover:border-[#E55503]/30 transition-all duration-300">
                  <Phone
                    size={14}
                    className="text-[#E55503] transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="text-sm font-medium">+1 (800) 250-8157</span>
              </a>
              <a
                href="mailto:info@CPL.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group"
              >
                <div className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-[#E55503]/10 group-hover:border-[#E55503]/30 transition-all duration-300">
                  <Mail
                    size={14}
                    className="text-[#E55503] transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="text-sm font-medium">info@CPL.com</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <div className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <MapPin size={14} className="text-[#E55503]" />
                </div>
                <span className="text-sm font-medium leading-relaxed">
                  918 Yinpen Road, Changsha, <br /> Hunan, China
                </span>
              </div>
            </div>

            {/* Social Icons - Circular & Smooth */}
            <div className="flex gap-3 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-gray-500 hover:bg-[#E55503] hover:border-[#E55503] hover:text-white hover:scale-110 transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E55503]"></span>
              Products
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="block text-gray-400 text-sm py-1 pl-3 border-l-2 border-transparent hover:border-[#E55503] hover:text-white hover:pl-4 transition-all duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E55503]"></span>
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="block text-gray-400 text-sm py-1 pl-3 border-l-2 border-transparent hover:border-[#E55503] hover:text-white hover:pl-4 transition-all duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Glass Card */}
          <div className="lg:col-span-4">
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 h-full flex flex-col justify-between shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] relative overflow-hidden">
              {/* Inner ambient light */}
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#E55503] opacity-[0.03] blur-[80px] pointer-events-none"></div>

              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-8">
                  Subscribe to our newsletter for the latest news, product
                  launches, and industry insights.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-3">
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E55503]/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#E55503]/20 transition-all duration-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#E55503] to-[#FF8B28] text-white font-semibold text-sm py-3 rounded-xl shadow-lg shadow-[#E55503]/10 hover:shadow-[#E55503]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Subscribe
                  <Send
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="border-t border-white/[0.05] pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-600 text-xs text-center md:text-left">
              © {new Date().getFullYear()} CPL Heavy Industry Science &
              Technology Co., Ltd. All rights reserved.
            </p>

            {/* Bottom Links */}
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-gray-600 text-xs hover:text-gray-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <span className="text-gray-800">•</span>
              <a
                href="#"
                className="text-gray-600 text-xs hover:text-gray-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <span className="text-gray-800">•</span>
              <a
                href="#"
                className="text-gray-600 text-xs hover:text-gray-400 transition-colors duration-300"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
