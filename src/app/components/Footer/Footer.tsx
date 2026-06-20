"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const COLORS = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

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

const helpLinks = [
  "FAQ",
  "Contact Us",
  "Terms & Conditions",
  "Privacy Policy",
  "Sitemap",
];

const socialLinks = [
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer
      className="relative text-white overflow-hidden "
      style={{ backgroundColor: "#00122e" }}
    >
      {/* ambient glows */}
      <div
        className="absolute top-0 left-1/4 w-1/3 h-1/2 pointer-events-none"
        style={{
          background: COLORS.orange,
          opacity: 0.03,
          filter: "blur(120px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-1/3 h-1/2 pointer-events-none"
        style={{
          background: COLORS.blue,
          opacity: 0.05,
          filter: "blur(120px)",
        }}
      />

      {/* top orange gradient line */}
      <div
        className="h-px w-full opacity-80"
        style={{
          background: `linear-gradient(to right, transparent, ${COLORS.orange}, transparent)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-10">
        {/* ═══ MAIN 4-COLUMN GRID ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* ── Column 1: Brand & Contact ── */}
          <div className="space-y-8">
            {/* logo */}
            <div>
              <h2 className="text-2xl font-bold tracking-[0.15em] uppercase mb-1">
                CPL
              </h2>
              <div
                className="w-10 h-0.5 rounded-full"
                style={{
                  background: `linear-gradient(to right, ${COLORS.orange}, ${COLORS.orangeLight})`,
                }}
              />
            </div>

            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Leading global manufacturer of heavy machinery and construction
              equipment. Engineering excellence for a sustainable future.
            </p>

            {/* contact rows */}
            <div className="space-y-4 pt-2">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 group transition-colors duration-300"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
                }
              >
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Phone
                    size={14}
                    style={{ color: COLORS.orange }}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </span>
                <span className="text-sm font-medium">+1 (800) 250-8157</span>
              </a>

              <a
                href="mailto:info@CPL.com"
                className="flex items-center gap-3 group transition-colors duration-300"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
                }
              >
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Mail
                    size={14}
                    style={{ color: COLORS.orange }}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </span>
                <span className="text-sm font-medium">info@CPL.com</span>
              </a>

              <div
                className="flex items-start gap-3"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <MapPin size={14} style={{ color: COLORS.orange }} />
                </span>
                <span className="text-sm font-medium leading-relaxed">
                  918 Yinpen Road, Changsha,
                  <br />
                  Hunan, China
                </span>
              </div>
            </div>
          </div>

          {/* ── Column 2: Products ── */}
          <div>
            <h3
              className="text-[11px] font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-2"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: COLORS.orange }}
              />
              Products
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="block text-sm py-1 pl-3 border-l-2 border-transparent transition-all duration-300"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.borderLeftColor = COLORS.orange;
                      e.currentTarget.style.paddingLeft = "1rem";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                      e.currentTarget.style.borderLeftColor = "transparent";
                      e.currentTarget.style.paddingLeft = "0.75rem";
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Company ── */}
          <div>
            <h3
              className="text-[11px] font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-2"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: COLORS.orange }}
              />
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="block text-sm py-1 pl-3 border-l-2 border-transparent transition-all duration-300"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.borderLeftColor = COLORS.orange;
                      e.currentTarget.style.paddingLeft = "1rem";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                      e.currentTarget.style.borderLeftColor = "transparent";
                      e.currentTarget.style.paddingLeft = "0.75rem";
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Help ── */}
          <div>
            <h3
              className="text-[11px] font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-2"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: COLORS.orange }}
              />
              Help
            </h3>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="block text-sm py-1 pl-3 border-l-2 border-transparent transition-all duration-300"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.borderLeftColor = COLORS.orange;
                      e.currentTarget.style.paddingLeft = "1rem";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                      e.currentTarget.style.borderLeftColor = "transparent";
                      e.currentTarget.style.paddingLeft = "0.75rem";
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ═══ BOTTOM BAR ═══ */}
        <div
          className="pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* copyright */}
            <p
              className="text-xs text-center md:text-left"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              © {new Date().getFullYear()} CPL Heavy Industry Science &
              Technology Co., Ltd. All rights reserved.
            </p>

            {/* social icons — in bottom bar, matching screenshot */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.orange;
                    e.currentTarget.style.borderColor = COLORS.orange;
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
