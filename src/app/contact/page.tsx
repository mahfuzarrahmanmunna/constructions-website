"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ArrowUpRight,
  Globe,
  ChevronDown,
  CheckCheck,
} from "lucide-react";
import { FaYoutube, FaXTwitter, FaFacebook, FaLinkedin } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast from "react-hot-toast";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const T = {
  ink: "#0C0E12",
  inkMid: "#141720",
  inkBorder: "#1F2330",
  steel: "#F4F5F7",
  steelMid: "#E8EAEF",
  steelBorder: "#D4D8E2",
  amber: "#E8A020",
  amberGlow: "#F5B942",
  amberDim: "#C4871A",
  navy: "#0D2D5E",
  navyMid: "#1A3A6B",
  slate: "#6B7A99",
  white: "#FFFFFF",
  textPrimary: "#FFFFFF",
  textMuted: "rgba(255,255,255,0.45)",
  textFaint: "rgba(255,255,255,0.2)",
};

const hotlines = [
  { country: "RUSSIA",    number: "800-2508-157",   flag: "🇷🇺" },
  { country: "INDONESIA", number: "0800-1-157-157", flag: "🇮🇩" },
  { country: "UAE",       number: "800-9666-5466",  flag: "🇦🇪" },
  { country: "VIETNAM",   number: "0888-000-157",   flag: "🇻🇳" },
  { country: "MALAYSIA",  number: "6012-398-0157",  flag: "🇲🇾" },
];

const stats = [
  { value: "50+",  label: "Countries Served"   },
  { value: "10K+", label: "Machines Delivered" },
  { value: "24/7", label: "Global Support"     },
  { value: "ISO",  label: "Certified Quality"  },
];

const subjects = [
  { value: "sales",       label: "Sales Inquiry"     },
  { value: "support",     label: "Technical Support" },
  { value: "partnership", label: "Partnership"       },
  { value: "quote",       label: "Request a Quote"   },
  { value: "other",       label: "Other"             },
];

const DEFAULT_HQ = {
  address: "House 45, Road 11, Banani, Dhaka 1213, Bangladesh",
  phone:   "+88 01922 588445",
  email:   "contact@cplmachinery.com",
  hours:   "Sat – Thu: 8:00 AM – 6:00 PM",
};

const DEFAULT_SOCIALS = {
  facebook: "#", twitter: "#", linkedin: "#", youtube: "#",
};

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  // ── Dynamic data from settings ──
  const [hq, setHq] = useState(DEFAULT_HQ);
  const [socialUrls, setSocialUrls] = useState(DEFAULT_SOCIALS);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Build socials array dynamically
  const socials = [
    { label: "LinkedIn", href: socialUrls.linkedin || "#", Icon: FaLinkedin },
    { label: "Facebook", href: socialUrls.facebook || "#", Icon: FaFacebook },
    { label: "YouTube",  href: socialUrls.youtube  || "#", Icon: FaYoutube  },
    { label: "Twitter",  href: socialUrls.twitter  || "#", Icon: FaXTwitter },
  ];

  // ── Fetch settings from DB ──
  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.contactInfo) {
          setHq({
            address: data.contactInfo.address || DEFAULT_HQ.address,
            phone:   data.contactInfo.phone   || DEFAULT_HQ.phone,
            email:   data.contactInfo.email   || DEFAULT_HQ.email,
            hours:   data.contactInfo.workingHours || DEFAULT_HQ.hours, 
          });
        }
        if (data.socialMedia) {
          setSocialUrls({
            facebook: data.socialMedia.facebook || "#",
            twitter:  data.socialMedia.twitter  || "#",
            linkedin: data.socialMedia.linkedin || "#",
            youtube:  data.socialMedia.youtube  || "#",
          });
        }
      })
      .catch(console.error)
      .finally(() => setSettingsLoaded(true));
  }, []);

  // ── GSAP ──
  useEffect(() => {
    if (!settingsLoaded) return;
    const ctx = gsap.context(() => {
      gsap.from(".anim-hero-eyebrow", { y: 24, opacity: 0, duration: 0.7, delay: 0.1, ease: "power3.out" });
      gsap.from(".anim-hero-h1",      { y: 48, opacity: 0, duration: 0.9, delay: 0.25, ease: "power3.out" });
      gsap.from(".anim-hero-sub",     { y: 32, opacity: 0, duration: 0.7, delay: 0.45, ease: "power3.out" });
      gsap.from(".anim-stat",         { y: 36, opacity: 0, duration: 0.6, stagger: 0.1, delay: 0.55, ease: "power3.out" });
      gsap.from(".anim-ticker",       { scaleX: 0, duration: 1.2, delay: 0.6, ease: "power4.inOut", transformOrigin: "left" });
      gsap.from(".anim-panel-left",   {
        x: -40, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".anim-panel-left", start: "top 88%" },
      });
      gsap.from(".anim-form-wrap",    {
        y: 50, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".anim-form-wrap", start: "top 90%" },
      });
      gsap.from(".anim-map",          {
        y: 60, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".anim-map", start: "top 92%" },
      });
    }, pageRef);
    return () => ctx.revert();
  }, [settingsLoaded]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res  = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch {
      toast.error("Failed to send message");
    }
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: `1.5px solid ${focused === field ? T.amber : T.steelBorder}`,
    backgroundColor: focused === field ? "#fff" : T.steel,
    color: T.navy,
    fontSize: "14px",
    fontWeight: 500,
    outline: "none",
    transition: "border-color 0.2s, background-color 0.2s, box-shadow 0.2s",
    boxShadow: focused === field ? `0 0 0 3px ${T.amber}22` : "none",
    fontFamily: "inherit",
  });

  return (
    <div ref={pageRef} style={{ backgroundColor: T.steel, fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ══ HERO ══ */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: T.ink, minHeight: "560px" }}
      >
        <div className="absolute inset-0">
          <Image
            src="/background/contact.jpg"
            alt="Heavy Machinery"
            fill
            className="object-cover"
            style={{ opacity: 0.12 }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 80% at 20% 60%, ${T.navyMid}55 0%, transparent 70%)`,
            }}
          />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, ${T.inkBorder} 0px, ${T.inkBorder} 1px, transparent 1px, transparent 64px)`,
            opacity: 0.6,
          }}
        />

        <div
          className="anim-ticker absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: `linear-gradient(to right, ${T.amber}, ${T.amberGlow}, transparent 60%)` }}
        />

        <div
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8"
          style={{ paddingTop: "96px", paddingBottom: "80px" }}
        >
          <div
            className="anim-hero-eyebrow inline-flex items-center gap-3 mb-8"
            style={{
              border: `1px solid ${T.inkBorder}`,
              borderLeft: `3px solid ${T.amber}`,
              padding: "6px 14px 6px 12px",
              borderRadius: "4px",
              backgroundColor: `${T.inkMid}`,
            }}
          >
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.amber }}>
              Global Operations Center
            </span>
            <span style={{ color: T.textFaint, fontSize: "10px" }}>CPL Machinery</span>
          </div>

          <h1
            className="anim-hero-h1"
            style={{
              fontSize: "clamp(42px, 6vw, 80px)",
              fontWeight: 900,
              color: T.white,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              maxWidth: "720px",
              marginBottom: "24px",
            }}
          >
            Get in&nbsp;
            <span style={{ color: "transparent", WebkitTextStroke: `1.5px ${T.amber}` }}>
              Contact
            </span>
          </h1>

          <p
            className="anim-hero-sub"
            style={{ color: T.textMuted, fontSize: "16px", lineHeight: 1.7, maxWidth: "520px", marginBottom: "56px" }}
          >
            Our global operations team is ready to assist with procurement,
            technical support, and partnership inquiries across 50+ countries.
          </p>

          <div className="flex flex-wrap gap-6 sm:gap-8">
            {stats.map((s, i) => (
              <div key={i} className="anim-stat" style={{ borderLeft: `2px solid ${T.inkBorder}`, paddingLeft: "16px" }}>
                <div style={{ fontSize: "28px", fontWeight: 800, color: T.amber, letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: T.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "4px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${T.steel}, transparent)` }}
        />
      </section>

      {/* ══ MAIN BODY ══ */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ paddingTop: "64px", paddingBottom: "64px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── LEFT PANEL ── */}
          <div className="anim-panel-left lg:col-span-4 flex flex-col gap-6">

            {/* HQ Card */}
            <div
              style={{
                backgroundColor: T.inkMid,
                border: `1px solid ${T.inkBorder}`,
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "20px 24px",
                  borderBottom: `1px solid ${T.inkBorder}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.amber, marginBottom: "4px" }}>
                    Headquarters
                  </div>
                  <div style={{ color: T.white, fontWeight: 700, fontSize: "16px" }}>
                    Dhaka, Bangladesh
                  </div>
                </div>
                <div
                  style={{
                    width: "36px", height: "36px", borderRadius: "8px",
                    backgroundColor: `${T.amber}18`, border: `1px solid ${T.amber}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <MapPin size={16} style={{ color: T.amber }} />
                </div>
              </div>

              <div style={{ padding: "8px 0" }}>
                {[
                  { Icon: MapPin, label: "Address", value: hq.address, href: undefined },
                  { Icon: Phone,  label: "Phone",   value: hq.phone,   href: `tel:${hq.phone}` },
                  { Icon: Mail,   label: "Email",   value: hq.email,   href: `mailto:${hq.email}` },
                  { Icon: Clock,  label: "Hours",   value: hq.hours,   href: undefined },
                ].map(({ Icon, label, value, href }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: "14px",
                      padding: "16px 24px", borderBottom: `1px solid ${T.inkBorder}`,
                    }}
                  >
                    <div
                      style={{
                        width: "32px", height: "32px", borderRadius: "6px",
                        backgroundColor: T.inkBorder, display: "flex",
                        alignItems: "center", justifyContent: "center",
                        flexShrink: 0, marginTop: "1px",
                      }}
                    >
                      <Icon size={14} style={{ color: T.slate }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.slate, marginBottom: "3px" }}>
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          style={{ color: T.white, fontSize: "13px", fontWeight: 500, lineHeight: 1.5, textDecoration: "none", transition: "color 0.2s" }}
                          onMouseEnter={e => (e.currentTarget.style.color = T.amberGlow)}
                          onMouseLeave={e => (e.currentTarget.style.color = T.white)}
                        >
                          {value}
                        </a>
                      ) : (
                        <p style={{ color: T.white, fontSize: "13px", fontWeight: 500, lineHeight: 1.5, margin: 0 }}>
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div style={{ padding: "20px 24px" }}>
                <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.slate, marginBottom: "12px" }}>
                  Follow Us
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {socials.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: "36px", height: "36px", borderRadius: "8px",
                        border: `1px solid ${T.inkBorder}`, backgroundColor: T.inkBorder,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: T.slate, textDecoration: "none", transition: "all 0.2s",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = T.amber;
                        e.currentTarget.style.borderColor = T.amber;
                        e.currentTarget.style.color = T.ink;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = T.inkBorder;
                        e.currentTarget.style.borderColor = T.inkBorder;
                        e.currentTarget.style.color = T.slate;
                      }}
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Hotlines Card */}
            <div
              style={{
                backgroundColor: T.inkMid,
                border: `1px solid ${T.inkBorder}`,
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "20px 24px", borderBottom: `1px solid ${T.inkBorder}`,
                  display: "flex", alignItems: "center", gap: "10px",
                }}
              >
                <Globe size={15} style={{ color: T.amber }} />
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.amber }}>
                  Regional Hotlines
                </div>
              </div>
              {hotlines.map((h, i) => (
                <div
                  key={h.country}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "13px 24px",
                    borderBottom: i < hotlines.length - 1 ? `1px solid ${T.inkBorder}` : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "18px", lineHeight: 1 }}>{h.flag}</span>
                    <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: T.slate, textTransform: "uppercase" }}>
                      {h.country}
                    </span>
                  </div>
                  <a
                    href={`tel:${h.number}`}
                    style={{
                      fontSize: "12px", fontWeight: 600, color: T.white,
                      textDecoration: "none", fontVariantNumeric: "tabular-nums",
                      letterSpacing: "0.02em", transition: "color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = T.amberGlow)}
                    onMouseLeave={e => (e.currentTarget.style.color = T.white)}
                  >
                    {h.number}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT PANEL: Form ── */}
          <div className="anim-form-wrap lg:col-span-8">
            <div
              style={{
                backgroundColor: T.white,
                border: `1px solid ${T.steelBorder}`,
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "clamp(20px, 4vw, 32px) clamp(20px, 5vw, 40px) 28px", borderBottom: `1px solid ${T.steelMid}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ width: "28px", height: "3px", backgroundColor: T.amber, borderRadius: "2px" }} />
                  <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: T.amber }}>
                    Send a Message
                  </span>
                </div>
                <h2 style={{ fontSize: "28px", fontWeight: 800, color: T.navy, letterSpacing: "-0.02em", marginBottom: "6px" }}>
                  We&apos;d love to hear from you
                </h2>
                <p style={{ fontSize: "14px", color: T.slate, lineHeight: 1.6, maxWidth: "420px" }}>
                  Fill in the details below and a member of our global team will respond within one business day.
                </p>
              </div>

              <div style={{ padding: "clamp(20px, 4vw, 36px) clamp(20px, 5vw, 40px) clamp(24px, 4vw, 40px)" }}>
                {submitted ? (
                  <div
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center",
                      justifyContent: "center", padding: "64px 40px", textAlign: "center", gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "64px", height: "64px", borderRadius: "50%",
                        backgroundColor: `${T.amber}18`, border: `2px solid ${T.amber}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <CheckCheck size={28} style={{ color: T.amber }} />
                    </div>
                    <h3 style={{ fontSize: "22px", fontWeight: 800, color: T.navy }}>Message Received</h3>
                    <p style={{ fontSize: "14px", color: T.slate, lineHeight: 1.6, maxWidth: "360px" }}>
                      Thank you for reaching out. Our team will review your inquiry and respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <FormField label="Full Name" required>
                        <input
                          type="text" name="name" required value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                          placeholder="John Smith" style={inputStyle("name")}
                        />
                      </FormField>
                      <FormField label="Email Address" required>
                        <input
                          type="email" name="email" required value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                          placeholder="john@company.com" style={inputStyle("email")}
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <FormField label="Phone Number">
                        <input
                          type="tel" name="phone" value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                          placeholder="+880 1XXX-XXXXXX" style={inputStyle("phone")}
                        />
                      </FormField>
                      <FormField label="Subject" required>
                        <div style={{ position: "relative" }}>
                          <select
                            name="subject" required value={formData.subject}
                            onChange={handleChange}
                            onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}
                            style={{ ...inputStyle("subject"), appearance: "none", cursor: "pointer", color: formData.subject ? T.navy : "#94A3B8" }}
                          >
                            <option value="" disabled>Select a topic</option>
                            {subjects.map(s => (
                              <option key={s.value} value={s.value} style={{ color: T.navy }}>{s.label}</option>
                            ))}
                          </select>
                          <ChevronDown size={15} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: T.slate, pointerEvents: "none" }} />
                        </div>
                      </FormField>
                    </div>

                    <div className="mb-7">
                      <FormField label="Message" required>
                        <textarea
                          name="message" rows={6} required value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                          placeholder="Describe your project requirements, machinery needs, or any questions..."
                          style={{ ...inputStyle("message"), resize: "vertical", minHeight: "140px" }}
                        />
                      </FormField>
                    </div>

                    <div
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      style={{ paddingTop: "20px", borderTop: `1px solid ${T.steelMid}` }}
                    >
                      <p style={{ fontSize: "12px", color: T.slate }}>
                        <span style={{ color: "#EF4444" }}>*</span> Required. Your data is kept confidential.
                      </p>
                      <button
                        type="submit"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "8px",
                          padding: "12px 28px", borderRadius: "8px",
                          background: `linear-gradient(135deg, ${T.amberDim}, ${T.amber})`,
                          color: T.ink, fontWeight: 700, fontSize: "14px",
                          border: "none", cursor: "pointer", letterSpacing: "0.02em",
                          boxShadow: `0 4px 16px ${T.amber}30`, transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = `0 8px 28px ${T.amber}45`;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = `0 4px 16px ${T.amber}30`;
                        }}
                      >
                        Send Message <Send size={14} />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ MAP ══ */}
      <div className="anim-map max-w-7xl mx-auto px-6 lg:px-8" style={{ paddingBottom: "80px" }}>
        <div
          style={{
            backgroundColor: T.white, border: `1px solid ${T.steelBorder}`,
            borderRadius: "12px", overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "20px 28px", borderBottom: `1px solid ${T.steelMid}`,
              backgroundColor: T.steel,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: T.amber }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: "14px", color: T.navy }}>Our Location</div>
                <div style={{ fontSize: "12px", color: T.slate, marginTop: "1px" }}>Dhaka, Bangladesh</div>
              </div>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                fontSize: "12px", fontWeight: 700, color: T.slate, textDecoration: "none",
                padding: "7px 14px", borderRadius: "6px", border: `1px solid ${T.steelBorder}`,
                backgroundColor: T.white, transition: "all 0.2s", letterSpacing: "0.06em", textTransform: "uppercase",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = T.amber; e.currentTarget.style.borderColor = T.amber; }}
              onMouseLeave={e => { e.currentTarget.style.color = T.slate; e.currentTarget.style.borderColor = T.steelBorder; }}
            >
              Open in Maps <ArrowUpRight size={12} />
            </a>
          </div>

          <div style={{ height: "420px", backgroundColor: T.steelMid }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703752325!2d90.27923991562868!3d23.780573258035916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563b5e21c8bda!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Company Location Map"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6B7A99", marginBottom: "8px" }}>
        {label}
        {required && <span style={{ color: "#EF4444", marginLeft: "3px" }}>*</span>}
      </label>
      {children}
    </div>
  );
}