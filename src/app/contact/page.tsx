"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ArrowRight,
  Globe,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { FaYoutube, FaXTwitter, FaFacebook, FaLinkedin } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast from "react-hot-toast";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Color Palette ---
const COLORS = {
  navy: "#002253",
  navyMid: "#0a1e3d",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
};

// --- Mock Data ---
const hotlines = [
  { country: "RUSSIA", number: "800-2508-157", flag: "🇷🇺" },
  { country: "INDONESIA", number: "0800-1-157-157", flag: "🇮🇩" },
  { country: "UAE", number: "800-9666-5466", flag: "🇦🇪" },
  { country: "VIETNAM", number: "0888-000-157", flag: "🇻🇳" },
  { country: "MALAYSIA", number: "6012-398-0157", flag: "🇲🇾" },
];

const contactDetails = {
  headquarters: {
    address: "House 45, Road 11, Banani, Dhaka 1213, Bangladesh",
    phone: "+88 01922 588445",
    email: "azizurseu@gmail.com",
    hours: "Saturday – Thursday: 8:00 AM – 6:00 PM",
  },
  social: [
    { platform: "LinkedIn", link: "#", icon: FaLinkedin },
    { platform: "Facebook", link: "#", icon: FaFacebook },
    { platform: "YouTube", link: "#", icon: FaYoutube },
    { platform: "Twitter", link: "#", icon: FaXTwitter },
  ],
};

const trustBadges = [
  { label: "24/7 Support", sublabel: "Always available" },
  { label: "50+ Countries", sublabel: "Global presence" },
  { label: "10K+ Machines", sublabel: "Delivered worldwide" },
  { label: "ISO Certified", sublabel: "Quality guaranteed" },
];

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax elements
      gsap.from(".hero-badge", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".hero-subtitle", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.55,
        ease: "power3.out",
      });

      // Floating geometric shapes
      gsap.to(".geo-shape-1", {
        y: -20,
        rotation: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".geo-shape-2", {
        y: 15,
        rotation: -10,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      gsap.to(".geo-shape-3", {
        y: -12,
        x: 10,
        rotation: 8,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      // Trust badges
      gsap.from(".trust-badge", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".trust-grid",
          start: "top 88%",
        },
      });

      // Info cards
      gsap.from(".info-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".info-grid",
          start: "top 85%",
        },
      });

      // Form
      gsap.from(".form-header", {
        x: -30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 85%",
        },
      });

      gsap.from(".form-field", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 82%",
        },
      });

      // Map
      gsap.from(".map-section", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".map-section",
          start: "top 90%",
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div
      ref={pageRef}
      className="min-h-screen"
      style={{ backgroundColor: COLORS.slate[50] }}
    >
      {/* =========================
          HERO SECTION
          ========================= */}
      <div
        ref={heroRef}
        className="relative h-[52vh] min-h-[520px] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <Image
          src="/background/contact.jpg"
          alt="Contact Hero"
          fill
          className="object-cover scale-105"
          priority
        />

        {/* Decorative grid pattern */}
        {/* <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        /> */}

        {/* Floating geometric shapes */}
        <div
          className="geo-shape-1 absolute top-[15%] left-[8%] w-20 h-20 rounded-xl border border-white/10 rotate-12"
          style={{ backdropFilter: "blur(2px)" }}
        />
        <div className="geo-shape-2 absolute bottom-[25%] right-[10%] w-14 h-14 rounded-full border border-white/10" />
        <div
          className="geo-shape-3 absolute top-[30%] right-[20%] w-3 h-3 rounded-full"
          style={{ backgroundColor: COLORS.orangeLight, opacity: 0.6 }}
        />
        <div
          className="geo-shape-1 absolute bottom-[35%] left-[15%] w-2 h-2 rounded-full"
          style={{ backgroundColor: COLORS.orange, opacity: 0.5 }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div
            className="hero-badge inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/15 mb-7"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: COLORS.orangeLight }}
            />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-white/80">
              Contact Us
            </span>
          </div>

          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#002253] mb-6 tracking-tight leading-[1.08]">
            Get In{" "}
            <span
              className="relative inline-block"
              style={{ color: COLORS.orangeLight }}
            >
              Touch
              <span
                className="absolute -bottom-2 left-0 w-full h-1 rounded-full"
                style={{
                  background: `linear-gradient(to right, ${COLORS.orange}, transparent)`,
                }}
              />
            </span>
          </h1>

          <p className="hero-subtitle text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-[#ffffff] font-medium">
            We are here to help you with your heavy machinery needs. Reach out
            to our global team today.
          </p>
        </div>

        {/* Bottom fade edge */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 z-[5]"
          style={{
            background: `linear-gradient(to top, ${COLORS.slate[50]}, transparent)`,
          }}
        />
      </div>

      {/* =========================
          TRUST BADGES
          ========================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-16 md:mb-20">
        <div className="trust-grid grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="trust-badge group bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-400 text-center"
            >
              <div
                className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.navy}08, ${COLORS.navy}15)`,
                }}
              >
                <CheckCircle2
                  size={20}
                  style={{ color: COLORS.orange }}
                  strokeWidth={1.8}
                />
              </div>
              <p className="text-sm font-bold text-[#002253] leading-tight">
                {badge.label}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                {badge.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =========================
          MAIN CONTENT
          ========================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20 lg:pb-28">
        <div className="info-grid grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7">
          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* Headquarters Card */}
            <div className="info-card bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-400 overflow-hidden">
              {/* Card accent top bar */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(to right, ${COLORS.orange}, ${COLORS.orangeLight}, transparent)`,
                }}
              />

              <div className="p-7 sm:p-8">
                <div className="flex items-center gap-3.5 mb-8">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})`,
                      boxShadow: `0 6px 20px ${COLORS.orange}30`,
                    }}
                  >
                    <MapPin className="text-white" size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#002253] leading-tight">
                      Headquarters
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                      Main office location
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      icon: MapPin,
                      label: "Address",
                      value: contactDetails.headquarters.address,
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      value: contactDetails.headquarters.phone,
                      href: `tel:${contactDetails.headquarters.phone}`,
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      value: contactDetails.headquarters.email,
                      href: `mailto:${contactDetails.headquarters.email}`,
                    },
                    {
                      icon: Clock,
                      label: "Working Hours",
                      value: contactDetails.headquarters.hours,
                    },
                  ].map((item, idx) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-4 group cursor-default"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: COLORS.slate[50],
                          border: `1px solid ${COLORS.slate[200]}`,
                        }}
                      >
                        <item.icon
                          size={16}
                          className="text-slate-400 group-hover:text-[#E55503] transition-colors duration-300"
                          strokeWidth={1.8}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-medium text-[#002253] leading-relaxed hover:text-[#E55503] transition-colors duration-200 break-all"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-[#002253] leading-relaxed">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="pt-7 mt-7 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">
                    Follow Us
                  </p>
                  <div className="flex gap-2.5">
                    {contactDetails.social.map((social) => (
                      <a
                        key={social.platform}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                        className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                        style={
                          {
                            "--hover-bg": COLORS.orange,
                          } as React.CSSProperties
                        }
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = COLORS.orange;
                          e.currentTarget.style.borderColor = COLORS.orange;
                          e.currentTarget.style.boxShadow = `0 6px 20px ${COLORS.orange}35`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "white";
                          e.currentTarget.style.borderColor = COLORS.slate[200];
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <social.icon size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Global Hotlines Card */}
            <div
              className="info-card rounded-2xl shadow-sm overflow-hidden text-white"
              style={{
                background: `linear-gradient(145deg, ${COLORS.navy} 0%, ${COLORS.navyMid} 100%)`,
              }}
            >
              {/* Subtle pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                    radial-gradient(circle at 80% 20%, white 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px, 60px 60px",
                }}
              />
            </div>
          </div>

          {/* --- RIGHT COLUMN: FORM --- */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="contact-form bg-white rounded-2xl border border-slate-100 shadow-sm h-full overflow-hidden">
              {/* Form header accent */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(to right, ${COLORS.navy}, ${COLORS.blue}, transparent)`,
                }}
              />

              <div className="p-7 sm:p-8 lg:p-10">
                <div className="form-header mb-9">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-6 h-0.5 rounded-full"
                      style={{ backgroundColor: COLORS.orange }}
                    />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#E55503]">
                      Send a message
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002253] mb-2 tracking-tight leading-tight">
                    We&apos;d love to hear from you
                  </h2>
                  <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                    Fill out the form and our team will get back to you within
                    24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="form-field space-y-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        Full Name
                        <span className="text-red-400 text-xs">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3.5 rounded-xl border text-[#002253] placeholder-slate-300 outline-none transition-all duration-300 text-sm font-medium"
                          style={{
                            backgroundColor:
                              focusedField === "name"
                                ? "white"
                                : COLORS.slate[50],
                            borderColor:
                              focusedField === "name"
                                ? COLORS.orange
                                : COLORS.slate[200],
                            boxShadow:
                              focusedField === "name"
                                ? `0 0 0 4px ${COLORS.orange}12`
                                : "none",
                          }}
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="form-field space-y-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        Email Address
                        <span className="text-red-400 text-xs">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3.5 rounded-xl border text-[#002253] placeholder-slate-300 outline-none transition-all duration-300 text-sm font-medium"
                          style={{
                            backgroundColor:
                              focusedField === "email"
                                ? "white"
                                : COLORS.slate[50],
                            borderColor:
                              focusedField === "email"
                                ? COLORS.orange
                                : COLORS.slate[200],
                            boxShadow:
                              focusedField === "email"
                                ? `0 0 0 4px ${COLORS.orange}12`
                                : "none",
                          }}
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="form-field space-y-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3.5 rounded-xl border text-[#002253] placeholder-slate-300 outline-none transition-all duration-300 text-sm font-medium"
                          style={{
                            backgroundColor:
                              focusedField === "phone"
                                ? "white"
                                : COLORS.slate[50],
                            borderColor:
                              focusedField === "phone"
                                ? COLORS.orange
                                : COLORS.slate[200],
                            boxShadow:
                              focusedField === "phone"
                                ? `0 0 0 4px ${COLORS.orange}12`
                                : "none",
                          }}
                          placeholder="+880 1XXX-XXXXXX"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="form-field space-y-2 relative">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        Subject
                        <span className="text-red-400 text-xs">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("subject")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3.5 rounded-xl border text-sm font-medium outline-none transition-all duration-300 appearance-none cursor-pointer"
                          style={{
                            backgroundColor:
                              focusedField === "subject"
                                ? "white"
                                : COLORS.slate[50],
                            borderColor:
                              focusedField === "subject"
                                ? COLORS.orange
                                : COLORS.slate[200],
                            boxShadow:
                              focusedField === "subject"
                                ? `0 0 0 4px ${COLORS.orange}12`
                                : "none",
                            color: formData.subject
                              ? COLORS.navy
                              : COLORS.slate[300],
                          }}
                        >
                          <option value="" disabled>
                            Select a topic
                          </option>
                          <option value="sales">Sales Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="partnership">Partnership</option>
                          <option value="other">Other</option>
                        </select>
                        <ChevronDown
                          size={16}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-field space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      Message
                      <span className="text-red-400 text-xs">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3.5 rounded-xl border text-[#002253] placeholder-slate-300 outline-none transition-all duration-300 resize-none text-sm font-medium"
                      style={{
                        backgroundColor:
                          focusedField === "message"
                            ? "white"
                            : COLORS.slate[50],
                        borderColor:
                          focusedField === "message"
                            ? COLORS.orange
                            : COLORS.slate[200],
                        boxShadow:
                          focusedField === "message"
                            ? `0 0 0 4px ${COLORS.orange}12`
                            : "none",
                      }}
                      placeholder="Tell us about your project requirements..."
                    />
                  </div>

                  {/* Submit Area */}
                  <div className="flex items-center justify-between pt-3">
                    <p className="text-[11px] text-slate-400 hidden sm:block max-w-xs">
                      <span className="text-red-400">*</span> Required fields.
                      Your data is kept confidential.
                    </p>
                    <button
                      type="submit"
                      className="group ml-auto px-8 py-3.5 text-white font-bold text-sm rounded-xl flex items-center gap-2.5 transition-all duration-300 active:scale-[0.97]"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeLight})`,
                        boxShadow: `0 6px 24px ${COLORS.orange}30`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 8px 32px ${COLORS.orange}45`;
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = `0 6px 24px ${COLORS.orange}30`;
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      Send Message
                      <Send
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          MAP SECTION
          ========================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20 lg:pb-28">
        <div className="map-section bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Map Header Bar */}
          <div
            className="flex items-center justify-between px-7 sm:px-8 py-5 border-b border-slate-100"
            style={{ backgroundColor: COLORS.slate[50] }}
          >
            <div className="flex items-center gap-3.5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${COLORS.navy}10`,
                  border: `1px solid ${COLORS.navy}15`,
                }}
              >
                <MapPin
                  size={18}
                  style={{ color: COLORS.navy }}
                  strokeWidth={1.8}
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#002253]">
                  Our Location
                </h3>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-500 hover:text-[#E55503] hover:border-[#E55503]/30 hover:bg-[#E55503]/5 transition-all duration-300 uppercase tracking-wider"
            >
              Open in Maps <ArrowRight size={12} />
            </a>
          </div>

          {/* Map Iframe */}
          <div className="relative w-full h-[350px] sm:h-[450px] bg-slate-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703752325!2d90.27923991562868!3d23.780573258035916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563b5e21c8bda!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Company Location Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
