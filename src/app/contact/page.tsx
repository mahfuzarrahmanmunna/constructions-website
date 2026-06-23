"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from "lucide-react";
import { FaYoutube, FaXTwitter, FaFacebook, FaLinkedin } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Color Palette ---
const COLORS = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
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
    address: "Bangladesh",
    phone: "+88 01922 588445 ",
    email: "azizurseu@gmail.com",
    hours: "Sat-Thu: 8:00 AM - 6:00 PM",
  },
  social: [
    { platform: "LinkedIn", link: "#", icon: FaLinkedin },
    { platform: "Facebook", link: "#", icon: FaFacebook },
    { platform: "YouTube", link: "#", icon: FaYoutube },
    { platform: "Twitter", link: "#", icon: FaXTwitter },
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

  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Info cards stagger
      gsap.from(".info-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".info-grid",
          start: "top 85%",
        },
      });

      // Form fields stagger
      gsap.from(".form-field", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 85%",
        },
      });

      // Map section
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
    <div ref={pageRef} className="min-h-screen bg-[#f8f9fb]">
      {/* =========================
          HERO SECTION
          ========================= */}
      <div className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop"
          alt="Contact Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#002253]/90 via-[#002253]/80 to-[#f8f9fb]" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-4 text-[#FF8B28]">
            Contact Us
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Get In Touch
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We are here to help you with your heavy machinery needs. Reach out
            to our global team today.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-28 -mt-16 relative z-20">
        <div className="info-grid grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* Headquarters Card */}
            <div className="info-card bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#E55503]/10 flex items-center justify-center">
                  <MapPin className="text-[#E55503]" size={20} />
                </div>
                <h3 className="text-lg font-bold text-[#002253]">
                  Headquarters
                </h3>
              </div>

              <div className="space-y-6">
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
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: contactDetails.headquarters.email,
                  },
                  {
                    icon: Clock,
                    label: "Working Hours",
                    value: contactDetails.headquarters.hours,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-slate-50 group-hover:bg-[#E55503]/10 flex items-center justify-center flex-shrink-0 text-slate-400 group-hover:text-[#E55503] transition-colors duration-300">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-[#002253] leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="pt-8 mt-8 border-t border-slate-100">
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
                      className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-[#E55503] hover:border-[#E55503] hover:text-white hover:scale-110 transition-all duration-300"
                    >
                      <social.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Global Hotlines Card */}
            <div className="info-card bg-[#002253] p-6 sm:p-8 rounded-2xl shadow-sm text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Phone className="text-[#FF8B28]" size={18} />
                </div>
                <h3 className="text-lg font-bold">Global Hotlines</h3>
              </div>

              <div className="space-y-0">
                {hotlines.map((line, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-3 border-b border-white/10 last:border-0"
                  >
                    <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                      {line.country}
                    </span>
                    <span className="font-bold tracking-wide text-[#FF8B28] text-sm">
                      {line.number}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 mt-6 text-sm text-gray-300 hover:text-white transition-colors font-medium group"
              >
                View All Regions
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>

          {/* --- RIGHT COLUMN: FORM --- */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="contact-form bg-white p-6 sm:p-8 lg:p-10 rounded-2xl border border-slate-100 shadow-sm h-full">
              <div className="mb-8">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#E55503]">
                  Send a message
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002253] mt-2 mb-2 tracking-tight">
                  We&apos;d love to hear from you
                </h2>
                <p className="text-sm text-slate-500 max-w-md">
                  Fill out the form and our team will get back to you within 24
                  hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="form-field space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-[#002253] placeholder-slate-300 focus:border-[#E55503] focus:ring-4 focus:ring-[#E55503]/10 outline-none transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div className="form-field space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-[#002253] placeholder-slate-300 focus:border-[#E55503] focus:ring-4 focus:ring-[#E55503]/10 outline-none transition-all duration-300"
                      placeholder="john@company.com"
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-field space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-[#002253] placeholder-slate-300 focus:border-[#E55503] focus:ring-4 focus:ring-[#E55503]/10 outline-none transition-all duration-300"
                      placeholder="+880 1XXX-XXXXXX"
                    />
                  </div>

                  {/* Subject */}
                  <div className="form-field space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-[#002253] focus:border-[#E55503] focus:ring-4 focus:ring-[#E55503]/10 outline-none transition-all duration-300 appearance-none"
                    >
                      <option value="" disabled className="text-slate-300">
                        Select a topic
                      </option>
                      <option value="sales" className="text-slate-700">
                        Sales Inquiry
                      </option>
                      <option value="support" className="text-slate-700">
                        Technical Support
                      </option>
                      <option value="partnership" className="text-slate-700">
                        Partnership
                      </option>
                      <option value="other" className="text-slate-700">
                        Other
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="form-field space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-[#002253] placeholder-slate-300 focus:border-[#E55503] focus:ring-4 focus:ring-[#E55503]/10 outline-none transition-all duration-300 resize-none"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end pt-2">
                  <button
                    type="submit"
                    className="group px-8 py-3.5 bg-[#E55503] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#E55503]/25 hover:bg-[#cc4a03] hover:shadow-xl hover:shadow-[#E55503]/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center gap-2.5"
                  >
                    Send Message
                    <Send
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </form>
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
          <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 rounded-full bg-[#E55503]" />
              <h3 className="text-base font-bold text-[#002253]">
                Our Location
              </h3>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-slate-400 hover:text-[#E55503] transition-colors uppercase tracking-wider flex items-center gap-1.5"
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
