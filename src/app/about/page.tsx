"use client";

import React from "react";

const COLORS = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

const stats = [
  { number: "15+", label: "Years of Experience" },
  { number: "500+", label: "Projects Completed" },
  { number: "50+", label: "Expert Engineers" },
  { number: "100%", label: "Client Satisfaction" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO SECTION ── */}
      <div className="relative h-[400px] md:h-[550px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/background/about.jpg)",
          }}
        />
        {/* <div className="absolute inset-0 bg-gradient-to-b from via-[#002253]/80 to-white" /> */}

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF8B28]/30 bg-[#FF8B28]/10 px-4 py-2 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF8B28] animate-pulse"></span>
            <span className="text-xs font-bold text-[#FF8B28] uppercase tracking-widest">
              About Us
            </span>
          </div>
          <h1 className="text-4xl text-[#002253] md:text-6xl  font-bold  mb-6 tracking-tight leading-tight bg-clip-text">
            Stronger Together: <br />{" "}
            <span className="text-[#FF8B28]"> The Story of CPL</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
            Constructive Partners Limited (CPL) is Bangladesh&apos;s trusted
            one-stop solution for civil construction, materials supply, and
            equipment services.
          </p>
        </div>
      </div>

      {/* ── COMPANY OVERVIEW ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image Collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg h-48 md:h-64">
                  <img
                    src="/images/cases-photos/case-foundation.webp"
                    alt="Foundation work"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-32 md:h-40">
                  <img
                    src="/images/cases-photos/case-infrastructure.webp"
                    alt="Infrastructure project"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-lg h-32 md:h-40">
                  <img
                    src="/images/cases-photos/case-rio.webp"
                    alt="Construction site"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-48 md:h-64">
                  <img
                    src="/images/cases-photos/case-maldives.webp"
                    alt="Marine project"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-4 md:right-4 bg-[#E55503] text-white rounded-2xl px-6 py-4 shadow-xl">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm font-medium">Years of Excellence</div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E55503]/20 bg-[#E55503]/5 px-4 py-2 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E55503]"></span>
              <span className="text-xs font-bold text-[#E55503] uppercase tracking-widest">
                Who We Are
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#002253] mb-6 leading-tight">
              A Legacy of Trust and{" "}
              <span className="text-[#E55503]">Excellence</span>
            </h2>

            <div className="w-16 h-1 bg-[#E55503] rounded-full mb-8"></div>

            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Based in Dhaka, Constructive Partners Limited (CPL) was created by
              bringing specialized engineering, rental, and logistics teams
              together under one strong name. We chose this brand name because
              we want to build a construction community for complete
              construction solutions.
            </p>

            <p className="text-gray-600 text-base leading-relaxed mb-8">
              We act as a reliable partner for private factory developers,
              commercial businesses, and major government projects. Led by our
              Director of Finance, Md Azizur Rahman, we combine modern building
              methods with honest business practices to help Bangladesh grow.
              Our long term goal is to create reliable &amp; professional
              construction solutions.
            </p>

            {/* Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "End-to-End Solutions",
                "Certified Professionals",
                "International Standards",
                "On-Time Delivery",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#E55503]/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#E55503"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-[#002253]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS SECTION ── */}
      <div className="w-full bg-white py-16 border-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold  text-[#FF8B28] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-[#002253] uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MISSION & VISION ── */}
      <div className="w-full bg-gray-50 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-xl bg-[#E55503]/10 flex items-center justify-center text-[#E55503] mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#002253] mb-4">
                Our Mission
              </h3>
              <div className="w-12 h-1 bg-[#E55503] rounded-full mb-6"></div>
              <p className="text-gray-600 leading-relaxed">
                We deliver top-tier building projects, flexible machinery
                leasing, and punctual supply logistics through unified teamwork
                and forward-thinking ideas.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-xl bg-[#002253]/10 flex items-center justify-center text-[#002253] mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#002253] mb-4">
                Our Vision
              </h3>
              <div className="w-12 h-1 bg-[#002253] rounded-full mb-6"></div>
              <p className="text-gray-600 leading-relaxed">
                To build a lasting global footprint by uniting diverse teams
                under one powerful banner to advance the construction sector.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── VALUE PROPOSITION, TARGET AUDIENCE & CORE VALUES ── */}
      <div className="w-full bg-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Unique Value Proposition */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E55503]/20 bg-[#E55503]/5 px-4 py-2 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E55503]"></span>
                <span className="text-xs font-bold text-[#E55503] uppercase tracking-widest">
                  What Sets Us Apart
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#002253] mb-4 uppercase tracking-wide">
                Our Unique Value Proposition
              </h2>
              <div className="w-20 h-1 bg-[#E55503] mx-auto rounded-full"></div>
            </div>
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-2xl p-10 md:p-12 border border-gray-100">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed text-center">
                At CPL, we believe that true development goes beyond just mixing
                concrete and renting trucks. Our unique value proposition is
                driving the rapid growth of infrastructure across Bangladesh. By
                bringing building materials, heavy machinery, and master
                engineering under one single contract, we remove the usual
                multi-vendor delays that slow down massive industrial projects.
                We do not just build structures; we create the strong foundation
                that powers our nation&rsquo;s future.
              </p>
            </div>
          </div>

          {/* Target Audience */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#002253]/10 bg-[#002253]/5 px-4 py-2 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#002253]"></span>
                <span className="text-xs font-bold text-[#002253] uppercase tracking-widest">
                  Who We Serve
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#002253] mb-4 uppercase tracking-wide">
                Our Target Audience
              </h2>
              <div className="w-20 h-1 bg-[#002253] mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {[
                "Government Bodies",
                "Semi-Government Organizations",
                "Autonomous Bodies",
                "Defense Forces",
                "Private Enterprises",
                "Local Companies",
                "Foreign Organizations",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl px-6 py-4 border border-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-[#002253] flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-[#002253]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E55503]/20 bg-[#E55503]/5 px-4 py-2 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E55503]"></span>
                <span className="text-xs font-bold text-[#E55503] uppercase tracking-widest">
                  Our Foundation
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#002253] mb-4 uppercase tracking-wide">
                Our Core Values
              </h2>
              <div className="w-20 h-1 bg-[#E55503] mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Trust",
                  description:
                    "Providing dependable services with clear, honest communication to build lasting corporate relationships.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  ),
                },
                {
                  title: "Quality",
                  description:
                    "Delivering exceptional engineering and premium materials to ensure every structure is durable and safe.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ),
                },
                {
                  title: "Teamwork",
                  description:
                    "Working closely alongside our clients, partners, and units to achieve seamless success on every project.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="group text-center p-8 rounded-2xl border border-gray-100 hover:border-[#E55503]/20 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(0,34,83,0.1)]"
                >
                  <div className="w-16 h-16 rounded-full bg-[#002253]/5 flex items-center justify-center text-[#002253] mx-auto mb-6 transition-all duration-500 group-hover:bg-[#E55503] group-hover:text-white group-hover:scale-110">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#002253] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── OUR WORKS ── */}
      <div className="w-full bg-gray-50 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E55503]/20 bg-[#E55503]/5 px-4 py-2 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E55503]"></span>
              <span className="text-xs font-bold text-[#E55503] uppercase tracking-widest">
                Track Record
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#002253] mb-4 uppercase tracking-wide">
              Our Works
            </h2>
            <div className="w-20 h-1 bg-[#E55503] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Previous Clients & Projects */}
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#E55503]/10 flex items-center justify-center text-[#E55503]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#002253]">
                    Previous Clients and Projects
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    project: "Nuclear Power Plant Project",
                    client: "Russian Government Companies",
                  },
                  {
                    project: "Railway station and Railway Dormitory",
                    client: "Chinese Company",
                  },
                  {
                    project: "Fertilizer Factory Project",
                    client: "Chinese Company",
                  },
                  {
                    project: "Bridge Project",
                    client: "Japanese Company",
                  },
                  {
                    project: "Road Project",
                    client: "Bangladesh Army",
                  },
                  {
                    project: "Others Civil Constructions",
                    client: "Bangladesh Government Ministry and organizations",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#E55503] mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-bold text-[#002253]">
                        {item.project}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.client}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Existing Clients & Projects */}
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#002253]/10 flex items-center justify-center text-[#002253]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#002253]">
                    Existing Clients and Projects
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    project: "Road Constructions project",
                    client: "Bangladesh Army, ECB-34",
                  },
                  {
                    project: "RCC Road & Drain Project",
                    client: "Bangladesh Army, ECB-34",
                  },
                  {
                    project:
                      "Boundary wall, Road, Drain & others infrastructure projects",
                    client: "Dhaka South City Corporation",
                  },
                  {
                    project:
                      "Supply of different types of materials and Equipments to Rooppur Nuclear Power Plant Project",
                    client: "Russian Government Company",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-[#002253]/[0.03] border border-[#002253]/10"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#002253] mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-bold text-[#002253]">
                        {item.project}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.client}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BUSINESS PROCUREMENT PROCESS ── */}
      <div className="w-full bg-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E55503]/20 bg-[#E55503]/5 px-4 py-2 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E55503]"></span>
              <span className="text-xs font-bold text-[#E55503] uppercase tracking-widest">
                How We Work
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#002253] mb-4 uppercase tracking-wide">
              Our Business Procurement Process
            </h2>
            <div className="w-20 h-1 bg-[#E55503] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Searching Goods and Services",
                description:
                  "We actively scout and source the finest raw construction materials and high-specification machinery from trusted global and local manufacturers.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Selection of Qualified Contractors",
                description:
                  "We enforce a strict vetting process to partner only with highly skilled, certified subcontractors and technicians who meet our premium engineering standards.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <polyline points="17 11 19 13 23 9" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Order and Receive Goods and Services",
                description:
                  "We precisely coordinate the delivery of materials and equipment to ensure they arrive on site safely, smoothly, and exactly when your project needs them.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                ),
              },
              {
                step: "04",
                title: "Payment Disbursement",
                description:
                  "We manage all financial transactions and vendor payouts with absolute transparency and speed through secure corporate channels to maintain strong market trust.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                ),
              },
              {
                step: "05",
                title: "Quality Works and Services",
                description:
                  "We conduct rigorous field inspections on every phase of development to guarantee that the final infrastructure is durable, safe, and built to last.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(0,34,83,0.1)] hover:border-[#E55503]/20 hover:-translate-y-1"
              >
                {/* Step Number */}
                <div className="absolute top-6 right-6 text-5xl font-black text-[#002253]/[0.04] select-none">
                  {item.step}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#002253]/5 flex items-center justify-center text-[#002253] mb-6 transition-all duration-500 group-hover:bg-[#E55503] group-hover:text-white group-hover:scale-110">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#002253] mb-3 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#E55503] to-[#FF8B28] rounded-b-2xl transition-all duration-500 group-hover:w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── OUR BUSINESS PARTNERS ── */}
      <div className="w-full bg-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF8B28]/20 bg-[#FF8B28]/10 px-4 py-2 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF8B28]"></span>
              <span className="text-xs font-bold text-[#FF8B28] uppercase tracking-widest">
                Our Network
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#002253] mb-4 uppercase tracking-wide">
              Our Business Partners
            </h2>
            <div className="w-20 h-1 bg-[#E55503] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 text-[#002253] md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Construction Material Manufacturers",
                description:
                  "We partner directly with premium cement factories, steel mills, and aggregate plants to secure bulk building materials at the best prices for our clients.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                ),
              },
              {
                title: "Heavy Equipment Dealers",
                description:
                  "We collaborate with top international machinery brands to ensure our rental fleet always features modern, high-performance excavators and industrial cranes.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4" />
                    <path d="M12 19v4" />
                    <path d="M1 12h4" />
                    <path d="M19 12h4" />
                    <path d="M4.22 4.22l2.83 2.83" />
                    <path d="M16.95 16.95l2.83 2.83" />
                    <path d="M4.22 19.78l2.83-2.83" />
                    <path d="M16.95 7.05l2.83-2.83" />
                  </svg>
                ),
              },
              {
                title: "Architectural & Design Firms",
                description:
                  "We work hand-in-hand with leading blueprint designers and structural engineers to turn creative concepts into safe, buildable realities.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                ),
              },
              {
                title: "Specialized Subcontractors",
                description:
                  "We team up with certified electrical, plumbing, and deep-piling specialists to maintain flawless technical standards across all project phases.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                ),
              },
              {
                title: "Logistics & Transport Networks",
                description:
                  "We maintain strong alliances with heavy freight and shipping companies to guarantee your materials arrive on site on time, every time.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative text-[#002253] bg-white/5 backdrop-blur-sm border border-[#FF8B28]/40 rounded-2xl p-8 transition-all duration-500 hover:bg-white/10 hover:border-[#E55503]/30 hover:shadow-[0_10px_40px_-10px_rgba(229,85,3,0.2)]"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-[#FF8B28] mb-6 transition-all duration-500 group-hover:bg-[#E55503] group-hover:text-white group-hover:scale-110">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#002253] mb-3 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[#002253] text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#E55503] to-[#FF8B28] rounded-b-2xl transition-all duration-500 group-hover:w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MARKET ANALYSIS ── */}
      <div className="w-full bg-gray-50 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E55503]/20 bg-[#E55503]/5 px-4 py-2 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E55503]"></span>
              <span className="text-xs font-bold text-[#E55503] uppercase tracking-widest">
                Strategic Insights
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#002253] mb-4 uppercase tracking-wide">
              Our Market Analysis
            </h2>
            <div className="w-20 h-1 bg-[#E55503] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Mega-Project Government Alignment",
                description:
                  "We align our civil divisions with Bangladesh's national development plans to actively support high-stakes public contracts like airports, rail networks, and deep sea ports.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 21h18" />
                    <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
                    <path d="M9 21v-4h6v4" />
                    <path d="M10 7h4" />
                    <path d="M10 11h4" />
                  </svg>
                ),
              },
              {
                title: "Supply Chain Risk Management",
                description:
                  "We study raw material market shifts and price volatility to build bulk sourcing strategies that save our clients from sudden, unexpected construction cost increases.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                ),
              },
              {
                title: "Eco-Friendly Construction Demand",
                description:
                  "We analyze the growing market preference for green building practices, allowing us to offer sustainable materials and energy-efficient building blueprints.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 18" />
                    <path d="M17 8c3 0 7-1 7-1s-1 4-1 7c0 2-1 3-2 4" />
                    <path d="M17 8C10 10 8.5 15 7 21" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 md:p-10 border border-gray-100 transition-all duration-500 hover:shadow-[0_15px_50px_-10px_rgba(0,34,83,0.12)] hover:border-[#E55503]/20 hover:-translate-y-2"
              >
                {/* Top Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E55503] to-[#FF8B28] rounded-t-2xl opacity-0 transition-all duration-500 group-hover:opacity-100"></div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-[#002253]/5 flex items-center justify-center text-[#002253] mb-6 transition-all duration-500 group-hover:bg-[#E55503] group-hover:text-white group-hover:scale-110">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#002253] mb-4 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MANAGEMENT BODY HIERARCHY ── */}
      <div className="w-full bg-white py-14 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E55503]/20 bg-[#E55503]/5 px-4 py-1.5 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E55503]"></span>
              <span className="text-xs font-bold text-[#E55503] uppercase tracking-widest">
                Leadership
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#002253] mb-3 uppercase tracking-wide">
              Management Body Hierarchy
            </h2>
            <div className="w-16 h-1 bg-[#E55503] mx-auto rounded-full"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Chairman */}
            <div className="flex flex-col items-center mb-4">
              <div className="bg-[#002253] text-white rounded-xl px-6 py-4 text-center shadow-md w-full max-w-sm">
                <div className="text-[10px] font-bold text-[#FF8B28] uppercase tracking-widest mb-1">
                  Chairman
                </div>
                <h3 className="text-base font-bold mb-0.5">
                  Mr. Kazi Ahsanullah
                </h3>
                <p className="text-white/50 text-xs">
                  Head of Corporate Vision
                </p>
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <div className="w-px h-5 bg-[#E55503]/30"></div>
            </div>

            {/* Board of Directors */}
            <div className="flex flex-col items-center mb-4">
              <div className="bg-white border border-[#E55503]/20 rounded-xl px-5 py-4 text-center w-full max-w-lg">
                <div className="text-[10px] font-bold text-[#E55503] uppercase tracking-widest mb-2">
                  Board of Directors
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    {
                      name: "Ms. Farhana Chowdhury",
                      role: "Strategic Advisor",
                    },
                    {
                      name: "Mr. Asif Anam",
                      role: "Infrastructure Specialist",
                    },
                    { name: "Mr. Tariqul Islam", role: "Public Policy Expert" },
                  ].map((member, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg px-2 py-2">
                      <p className="text-xs font-bold text-[#002253] leading-tight">
                        {member.name}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <div className="w-px h-5 bg-[#E55503]/30"></div>
            </div>

            {/* Managing Director */}
            <div className="flex flex-col items-center mb-4">
              <div className="bg-[#002253] text-white rounded-xl px-6 py-4 text-center shadow-md w-full max-w-sm">
                <div className="text-[10px] font-bold text-[#FF8B28] uppercase tracking-widest mb-1">
                  Managing Director
                </div>
                <h3 className="text-sm font-bold mb-0.5">
                  Mr. Syed Kamal Ahmed
                </h3>
                <p className="text-white/50 text-xs">
                  Chief Executive Operations
                </p>
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <div className="w-px h-5 bg-[#E55503]/30"></div>
            </div>

            {/* Top Management */}
            <div className="flex flex-col items-center mb-4">
              <div className="bg-white border border-[#002253]/10 rounded-xl px-5 py-4 text-center w-full max-w-lg">
                <div className="text-[10px] font-bold text-[#002253] uppercase tracking-widest mb-2">
                  Top Management
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <div className="text-[10px] font-bold text-[#E55503] uppercase tracking-widest mb-0.5">
                      Finance Division
                    </div>
                    <p className="text-xs font-bold text-[#002253]">
                      Md. Azizur Rahman
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Director Finance
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <div className="text-[10px] font-bold text-[#E55503] uppercase tracking-widest mb-0.5">
                      Operations Division
                    </div>
                    <p className="text-xs font-bold text-[#002253]">
                      Engr. Rafiqul Ali
                    </p>
                    <p className="text-[10px] text-gray-500">Director Works</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <div className="w-px h-5 bg-[#E55503]/30"></div>
            </div>

            {/* Project Teams */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-center w-full max-w-lg">
                <div className="text-[10px] font-bold text-[#002253] uppercase tracking-widest mb-2">
                  Project Teams
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    "Site Engineers & Certified Equipment Operators",
                    "Procurement Officers & Logistics Coordinators",
                    "Skilled Labor Supervisors & Field Technicians",
                  ].map((team, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg px-2 py-2 border border-gray-100"
                    >
                      <p className="text-[10px] font-semibold text-[#002253] leading-tight">
                        {team}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA SECTION ── */}
      <div className="w-full bg-white py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002253] mb-6 leading-tight">
            Ready to Start Your Next Project?
          </h2>
          <div className="w-20 h-1 bg-[#E55503] mx-auto rounded-full mb-8"></div>
          <p className="text-[#002253]/60 text-lg mb-10 max-w-2xl mx-auto">
            Partner with CPL for comprehensive construction solutions. Let's
            build something extraordinary together.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <a
              href="/contact"
              className="group relative overflow-hidden rounded-full px-10 py-4 text-sm font-bold text-white bg-[#E55503] transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_-10px_rgba(229,85,3,0.5)]"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#002253]/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              Get In Touch
            </a>
            <a
              href="/cases"
              className="rounded-full border border-[#E55503] bg-white/5 px-10 py-4 text-sm font-semibold text-[#E55503] backdrop-blur-md transition-all duration-300 hover:bg-[#E55503] hover:text-white"
            >
              View Our Projects
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
}
