"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Send,
  ArrowRight,
} from "lucide-react";
import { FaYoutube, FaXTwitter, FaFacebook,
  FaLinkedin,} from "react-icons/fa6";
import toast from "react-hot-toast";

// --- Color Palette ---
const COLORS = {
  navy: "#002253", // Pantone 2768 C
  blue: "#224B88", // Pantone 2154 C
  orange: "#E55503", // Pantone 1655 C
  orangeLight: "#FF8B28", // Pantone 1495 C
};

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            formData
          ),
        }
      );

      const data =
        await res.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to send message");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop)",
          }}
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#002253]/90 via-[#002253]/80 to-gray-50" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Get In Touch
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
            We are here to help you with your heavy machinery needs. Reach out
            to our global team today.
          </p>
        </div>
      </div>

      {/* --- MAIN CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Contact Info (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Headquarters Card */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,34,83,0.1)] transition-shadow duration-300">
              <h3 className="text-xl font-bold text-[#002253] mb-6 flex items-center gap-2">
                <Globe className="text-[#E55503]" size={24} />
                Headquarters
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-[#224B88]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Address
                    </p>
                    <p className="text-gray-800 font-medium leading-relaxed">
                      {contactDetails.headquarters.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-[#224B88]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Phone
                    </p>
                    <p className="text-gray-800 font-medium hover:text-[#E55503] cursor-pointer transition-colors">
                      {contactDetails.headquarters.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-[#224B88]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <p className="text-gray-800 font-medium hover:text-[#E55503] cursor-pointer transition-colors">
                      {contactDetails.headquarters.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-[#224B88]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Working Hours
                    </p>
                    <p className="text-gray-800 font-medium">
                      {contactDetails.headquarters.hours}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex gap-4">
                <a
                  href="https://linkedin.com/company/your-company"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#0077B5] text-white flex items-center justify-center hover:scale-110 transition-all"
                >
                  <FaLinkedin size={20} />
                </a>

                <a
                  href="https://facebook.com/your-page"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-all"
                >
                  <FaFacebook size={20} />
                </a>

                <a
                  href="https://youtube.com/@your-channel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 transition-all"
                >
                  <FaYoutube size={20} />
                </a>
                <a
                  href="https://twitter.com/your-handle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:scale-110 transition-all"
                >
                  <FaXTwitter size={20} />
                </a>
              </div>
            </div>

            {/* Global Hotlines Card */}
            <div className="bg-[#002253] p-8 rounded-3xl shadow-xl text-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#FF8B28]">
                <Phone size={20} />
                Global Hotlines
              </h3>
              <div className="space-y-3">
                {hotlines.map((line, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b border-white/10 pb-2 last:border-0"
                  >
                    <span className="text-gray-300 text-sm font-medium">
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
                className="inline-block mt-6 text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2 font-medium"
              >
                View All Regions <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form (8 Cols) */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 h-full">
              <h2 className="text-3xl font-bold text-[#002253] mb-2">
                Send us a message
              </h2>
              <p className="text-gray-500 mb-8">
                Fill out the form and we&lsquo;ll get back to you within 24
                hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2 text-black">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E55503] focus:ring-2 focus:ring-[#E55503]/20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2 text-black">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E55503] focus:ring-2 focus:ring-[#E55503]/20 outline-none transition-all"
                      placeholder="john@company.com"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2 text-black">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full text-gray-500 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E55503] focus:ring-2 focus:ring-[#E55503]/20 outline-none transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2 text-black">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E55503] focus:ring-2 focus:ring-[#E55503]/20 outline-none transition-all bg-white"
                    >
                      <option className="text-gray-500"
                      value="" disabled>
                        Select a topic
                      </option>
                      <option className="text-gray-500" value="sales">Sales Inquiry</option>
                      <option className="text-gray-500" value="support">Technical Support</option>
                      <option className="text-gray-500" value="partnership">Partnership</option>
                      <option className="text-gray-500" value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2 text-black">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#E55503] focus:ring-2 focus:ring-[#E55503]/20 outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end pt-4">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-gradient-to-r from-[#E55503] to-[#FF8B28] text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                  >
                    Send Message
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAP SECTION --- */}
      <div className="w-full h-[400px] mt-20 bg-gray-200 relative">
        {/* 
           Note: In a real app, replace this iframe with your Google Maps Embed API key.
           Using a placeholder image for the demo to ensure it looks good immediately.
        */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2070&auto=format&fit=crop)",
          }}
        >
          {/* Dark Overlay to match theme slightly */}
          <div className="absolute inset-0 bg-[#002253]/10"></div>
        </div>

        {/* Optional: If you have a Google Maps API Key, uncomment below */}
        
        <iframe 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          loading="lazy" 
          allowFullScreen 
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.2345789012345!2d112.9456789!3d28.2345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDE0JzA0LjUiTiAxMTLCsUUnNzYuNSJF!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
        ></iframe> 
       
      </div>
    </div>
  );
}
