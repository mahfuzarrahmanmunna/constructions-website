"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Send,
  ArrowRight,
} from "lucide-react";
import { FaYoutube, FaXTwitter, FaFacebook, FaLinkedin } from "react-icons/fa6";
import toast from "react-hot-toast";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Color Palette ---
const COLORS = {
  navy: "#002253", // Pantone 2768 C
  blue: "#224B88", // Pantone 2154 C
  orange: "#E55503", // Pantone 1655 C
  orangeLight: "#FF8B28", // Pantone 1495 C
};

// Same interactive Bangladesh map (8 division markers) used on the home page.
// Loaded client-side only because Leaflet needs the browser `window`.
const MapContent = dynamic(
  () => import("@/app/components/BangladeshMapSection/MapContent"),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-[500px] w-full items-center justify-center rounded-2xl"
        style={{ backgroundColor: "rgba(0,34,83,0.03)" }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
            style={{
              borderColor: COLORS.orange,
              borderTopColor: "transparent",
            }}
          />
          <p
            className="text-sm font-medium"
            style={{ color: "rgba(0,34,83,0.4)" }}
          >
            Loading Map...
          </p>
        </div>
      </div>
    ),
  },
);

// --- Mock Data ---
const hotlines = [
  { country: "RUSSIA", number: "800-2508-157" },
  { country: "INDONESIA", number: "0800-1-157-157" },
  { country: "UAE", number: "800-9666-5466" },
  { country: "VIETNAM", number: "0888-000-157" },
  { country: "MALAYSIA", number: "6012-398-0157" },
];

const contactDetails = {
  headquarters: {
    title: "Headquarters",
    address: "Bangladesh",
    phone: "+88 01922 588445 ",
    email: "azizurseu@gmail.com",
    hours: "Sat-Thu: 8:00 AM - 6:00 PM",
  },
  social: [
    {
      platform: "LinkedIn",
      link: "https://linkedin.com/company/your-company",
    },
    {
      platform: "Facebook",
      link: "https://facebook.com/your-page",
    },
    {
      platform: "YouTube",
      link: "https://youtube.com/@your-channel",
    },
    {
      platform: "Twitter",
      link: "https://twitter.com/your-handle",
    },
  ],
};

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // --- Home-page style scroll entrance animations ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".info-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-grid", start: "top 85%" },
      });

      gsap.from(".form-reveal", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-grid", start: "top 85%" },
      });

      gsap.from(".map-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".map-reveal", start: "top 90%" },
      });
    }, sectionRef);

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
        headers: {
          "Content-Type": "application/json",
        },
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
        // Surface validation / server failures instead of silently ignoring them.
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to send message");
    }
  };

  return (
    <div ref={sectionRef} className="bg-white">
      {/* --- HERO SECTION (photo background, home-page accents) --- */}
      <section className="relative flex h-[450px] items-center justify-center overflow-hidden md:h-[550px]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop)",
          }}
        />
        {/* Navy gradient overlay — image visible up top, fading to the
            white page background at the bottom for a soft fade-out effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#002253]/80 via-[#002253]/55 to-white" />

        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 text-center md:px-8 lg:px-10">
          <span className="hero-reveal mb-3 inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#FF8B28]">
            Contact Us
          </span>

          <h1 className="hero-reveal mx-auto mb-6 max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white md:text-6xl">
            Get In Touch
          </h1>

          {/* Orange divider accent */}
          <span
            className="hero-reveal mx-auto mb-6 block h-1 w-20 rounded-full"
            style={{ backgroundColor: COLORS.orange }}
          />

          <p className="hero-reveal mx-auto max-w-2xl text-lg leading-relaxed text-gray-200 md:text-xl">
            We are here to help you with your heavy machinery needs. Reach out to
            our global team today.
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT SECTION --- */}
      <div className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <div className="contact-grid grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT COLUMN: Contact Info (4 Cols) */}
          <div className="space-y-6 lg:col-span-4">
            {/* Headquarters Card */}
            <div className="info-card group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              {/* Decorative corner accents (home-page motif) */}
              <span
                className="pointer-events-none absolute -bottom-1 -right-1 h-20 w-20 rounded-tl-3xl opacity-90"
                style={{ backgroundColor: "rgba(229,85,3,0.08)" }}
              />
              <span
                className="pointer-events-none absolute -top-1 -left-1 h-16 w-16 rounded-br-3xl border-2"
                style={{ borderColor: COLORS.orange, opacity: 0.25 }}
              />

              <h3 className="relative mb-6 flex items-center gap-2 text-xl font-bold text-[#002253]">
                <Globe className="text-[#E55503]" size={24} />
                Headquarters
              </h3>
              <div className="relative space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#224B88]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-bold uppercase tracking-wider text-gray-500">
                      Address
                    </p>
                    <p className="font-medium leading-relaxed text-gray-800">
                      {contactDetails.headquarters.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#224B88]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-bold uppercase tracking-wider text-gray-500">
                      Phone
                    </p>
                    <p className="cursor-pointer font-medium text-gray-800 transition-colors hover:text-[#E55503]">
                      {contactDetails.headquarters.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#224B88]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-bold uppercase tracking-wider text-gray-500">
                      Email
                    </p>
                    <p className="cursor-pointer font-medium text-gray-800 transition-colors hover:text-[#E55503]">
                      {contactDetails.headquarters.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#224B88]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-bold uppercase tracking-wider text-gray-500">
                      Working Hours
                    </p>
                    <p className="font-medium text-gray-800">
                      {contactDetails.headquarters.hours}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mt-6 flex gap-4 border-t border-gray-100 pt-6">
                <a
                  href="https://linkedin.com/company/your-company"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0077B5] text-white transition-all hover:scale-110"
                >
                  <FaLinkedin size={20} />
                </a>

                <a
                  href="https://facebook.com/your-page"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] text-white transition-all hover:scale-110"
                >
                  <FaFacebook size={20} />
                </a>

                <a
                  href="https://youtube.com/@your-channel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF0000] text-white transition-all hover:scale-110"
                >
                  <FaYoutube size={20} />
                </a>
                <a
                  href="https://twitter.com/your-handle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1DA1F2] text-white transition-all hover:scale-110"
                >
                  <FaXTwitter size={20} />
                </a>
              </div>
            </div>

            {/* Global Hotlines Card */}
            <div
              className="info-card relative overflow-hidden rounded-2xl p-8 text-white shadow-lg"
              style={{ backgroundColor: COLORS.navy }}
            >
              {/* Decorative corner accent */}
              <span
                className="pointer-events-none absolute -bottom-1 -right-1 h-20 w-20 rounded-tl-3xl"
                style={{ backgroundColor: "rgba(229,85,3,0.25)" }}
              />

              <h3 className="relative mb-4 flex items-center gap-2 text-lg font-bold text-[#FF8B28]">
                <Phone size={20} />
                Global Hotlines
              </h3>
              <div className="relative space-y-3">
                {hotlines.map((line, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b border-white/10 pb-2 last:border-0"
                  >
                    <span className="text-sm font-medium text-gray-300">
                      {line.country}
                    </span>
                    <span className="font-bold tracking-wide text-[#FF8B28]">
                      {line.number}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href="#"
                className="relative mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                View All Regions <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form (8 Cols) */}
          <div className="lg:col-span-8">
            <div className="form-reveal relative h-full overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-lg md:p-10">
              {/* Decorative corner accent */}
              <span
                className="pointer-events-none absolute -top-1 -right-1 h-24 w-24 rounded-bl-3xl border-2"
                style={{ borderColor: COLORS.orange, opacity: 0.2 }}
              />

              <span className="mb-3 inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#E55503]">
                Send a Message
              </span>
              <h2 className="mb-2 text-3xl font-bold text-[#002253]">
                Send us a message
              </h2>
              <p className="mb-8 text-slate-500">
                Fill out the form and we&lsquo;ll get back to you within 24
                hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Name */}
                  <div className="space-y-2 text-black">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-[#E55503] focus:ring-2 focus:ring-[#E55503]/20"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2 text-black">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-[#E55503] focus:ring-2 focus:ring-[#E55503]/20"
                      placeholder="john@company.com"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2 text-black">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-500 outline-none transition-all focus:border-[#E55503] focus:ring-2 focus:ring-[#E55503]/20"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2 text-black">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-[#E55503] focus:ring-2 focus:ring-[#E55503]/20"
                    >
                      <option className="text-gray-500" value="" disabled>
                        Select a topic
                      </option>
                      <option className="text-gray-500" value="sales">
                        Sales Inquiry
                      </option>
                      <option className="text-gray-500" value="support">
                        Technical Support
                      </option>
                      <option className="text-gray-500" value="partnership">
                        Partnership
                      </option>
                      <option className="text-gray-500" value="other">
                        Other
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2 text-black">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-[#E55503] focus:ring-2 focus:ring-[#E55503]/20"
                    placeholder="How can we help you?"
                  />
                </div>

                {/* Submit Button — home-page shimmer style */}
                <div className="flex items-center justify-end pt-4">
                  <button
                    type="submit"
                    className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-8 py-3.5 font-bold text-white transition-colors duration-300"
                    style={{ backgroundColor: COLORS.orange }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        COLORS.orangeLight)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = COLORS.orange)
                    }
                  >
                    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                      <span
                        className="absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                        }}
                      />
                    </span>
                    <span className="relative z-10">Send Message</span>
                    <Send
                      size={18}
                      className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAP SECTION --- */}
      <div className="map-reveal mx-auto max-w-7xl px-4 pb-24 md:px-8">
        {/* Section header — home-page style */}
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#E55503]">
            Find Us
          </span>
          <h2 className="mb-4 text-4xl font-bold text-[#002253] md:text-5xl">
            Visit Our Location
          </h2>
          <p className="max-w-md text-slate-500">
            Drop by our headquarters or reach out — we are always ready to help.
          </p>
        </div>

        {/* Same interactive map as the home page — 8 division markers */}
        <div
          className="w-full overflow-hidden rounded-2xl"
          style={{ border: "1px solid rgba(0,34,83,0.08)" }}
        >
          <MapContent />
        </div>
      </div>
    </div>
  );
}
