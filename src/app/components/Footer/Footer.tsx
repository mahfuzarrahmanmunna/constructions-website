"use client";

import Image from "next/image";
import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const COLORS = {
  navy: "#002253",
  navyDark: "#00122e",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
  textMuted: "#5a6a80",
  borderLight: "rgba(0, 34, 83, 0.1)",
  borderHover: "rgba(0, 34, 83, 0.2)",
};

const socialLinks = [
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer
      className="relative bg-white pt-12 overflow-hidden"
      style={{ color: COLORS.navyDark }}
    >
      <div className="absolute bottom-0 left-0 w-full h-auto pointer-events-none z-0">
        <img
          src="/footer/footer.png"
          alt=""
          className="w-full h-52 object-bottom"
        />
      </div>

      {/* top orange line */}
      <div
        className="h-px w-full opacity-80 relative z-10"
        style={{
          background: `linear-gradient(to right, transparent, ${COLORS.orange}, transparent)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* ═══ DESKTOP: full 4-column footer ═══ */}
        <div className="hidden md:block pt-16 pb-8">
          <div className="grid grid-cols-4 gap-8 mb-14">
            {/* brand */}
            <div>
              <figure className="w-24">
                <Image
                  src="/finallogo.png"
                  alt="CPL LOGO"
                  width={150}
                  height={50}
                />
              </figure>
              <div
                className="w-10 h-0.5 rounded-full mb-5"
                style={{
                  background: `linear-gradient(to right, ${COLORS.orange}, ${COLORS.orangeLight})`,
                }}
              />
              <p
                className="text-sm leading-relaxed max-w-xs"
                style={{ color: COLORS.textMuted }}
              >
                Leading global manufacturer of heavy machinery and construction
                equipment. Engineering excellence for a sustainable future.
              </p>
            </div>

            {/* products */}
            <div>
              <h3
                className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2"
                style={{ color: COLORS.navy }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: COLORS.orange }}
                />
                Products
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Earthmoving Machinery",
                  "Mobile Crane Machinery",
                  "Concrete Machinery",
                  "Agricultural Machinery",
                  "Construction Hoisting",
                  "MEWPs",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="block text-sm py-0.5 pl-3 border-l-2 border-transparent transition-all duration-300"
                      style={{ color: COLORS.textMuted }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = COLORS.orange;
                        e.currentTarget.style.borderLeftColor = COLORS.orange;
                        e.currentTarget.style.paddingLeft = "1rem";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = COLORS.textMuted;
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

            {/* company */}
            <div>
              <h3
                className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2"
                style={{ color: COLORS.navy }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: COLORS.orange }}
                />
                Company
              </h3>
              <ul className="space-y-2.5">
                {[
                  "About CPL",
                  "News & Events",
                  "Investor Relations",
                  "Careers",
                  "Contact Us",
                  "Sustainability",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="block text-sm py-0.5 pl-3 border-l-2 border-transparent transition-all duration-300"
                      style={{ color: COLORS.textMuted }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = COLORS.orange;
                        e.currentTarget.style.borderLeftColor = COLORS.orange;
                        e.currentTarget.style.paddingLeft = "1rem";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = COLORS.textMuted;
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

            {/* help */}
            <div>
              <h3
                className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2"
                style={{ color: COLORS.navy }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: COLORS.orange }}
                />
                Help
              </h3>
              <ul className="space-y-2.5">
                {[
                  "FAQ",
                  "Contact Us",
                  "Terms & Conditions",
                  "Privacy Policy",
                  "Sitemap",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="block text-sm py-0.5 pl-3 border-l-2 border-transparent transition-all duration-300"
                      style={{ color: COLORS.textMuted }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = COLORS.orange;
                        e.currentTarget.style.borderLeftColor = COLORS.orange;
                        e.currentTarget.style.paddingLeft = "1rem";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = COLORS.textMuted;
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

          {/* desktop bottom bar */}
          <div
            className="pt-6 flex items-center justify-between"
            style={{ borderTop: `1px solid ${COLORS.borderLight}` }}
          >
            <p className="text-xs" style={{ color: COLORS.textMuted }}>
              © {new Date().getFullYear()} CPL Heavy Industry Science &
              Technology Co., Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: "transparent",
                    border: `1px solid ${COLORS.borderLight}`,
                    color: COLORS.textMuted,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.orange;
                    e.currentTarget.style.borderColor = COLORS.orange;
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = COLORS.borderLight;
                    e.currentTarget.style.color = COLORS.textMuted;
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ MOBILE: logo + socials + copyright ═══ */}
        <div className="md:hidden py-10 flex flex-col items-center text-center gap-6">
          {/* logo */}
          <div>
            <h2
              className="text-2xl font-bold tracking-[0.15em] uppercase mb-1.5"
              style={{ color: COLORS.navy }}
            >
              CPL
            </h2>
            <div
              className="w-8 h-0.5 rounded-full mx-auto"
              style={{
                background: `linear-gradient(to right, ${COLORS.orange}, ${COLORS.orangeLight})`,
              }}
            />
          </div>

          {/* social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: "transparent",
                  border: `1px solid ${COLORS.borderLight}`,
                  color: COLORS.textMuted,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.orange;
                  e.currentTarget.style.borderColor = COLORS.orange;
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = COLORS.borderLight;
                  e.currentTarget.style.color = COLORS.textMuted;
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* copyright */}
          <p
            className="text-[11px] leading-relaxed max-w-[280px]"
            style={{ color: COLORS.textMuted }}
          >
            © {new Date().getFullYear()} CPL Heavy Industry Science & Technology
            Co., Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
