/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import { primaryServices } from "./servicesData";

const PALETTE = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
  white: "#FFFFFF",
  grayBg: "#F8FAFC",
};
export default function ServicePage() {


  return (
    <div>
      <section
        className="relative w-full h-[45vh] min-h-[350px] mt-20 flex flex-col justify-center items-center overflow-hidden bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2000&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-[#002253]/85 z-[1]" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-[0.25em] uppercase mb-4 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full inline-block"
            style={{ color: PALETTE.orangeLight }}
          >
            CPL SERVICES
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-wider mb-4 leading-tight"
          >
            Integrated Infrastructure &
            Construction Solutions
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl md:text-2xl font-bold tracking-wide uppercase" style={{ color: PALETTE.orangeLight }}>
                We stop vendor confusion by handling materials,
                machinery and engineering under one roof.
              </span>
            </div>
            <div
              className="w-24 h-1.5 mt-4 rounded-full"
              style={{ backgroundColor: PALETTE.orange }}
            ></div>
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-4xl font-black text-center text-[#002253]">
            At CPL, our primary focus is driving the
            sustainable growth of infrastructure across Bangladesh.
            </h2>

            <p className="mt-6 text-center text-slate-600 leading-relaxed">
            We combine top-tier engineering talent with our own
            heavy equipment to deliver massive structural projects
            from the ground up.
            </p>

        </div>
        </section>
        <section className="py-20 bg-slate-50">

            <div className="max-w-7xl mx-auto px-6">

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {primaryServices.map((service) => (

            <div
            key={service.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >

            <img
            src={service.image}
            alt={service.title}
            className="w-full h-64 object-cover"
            />

            <div className="p-8">

            <span className="text-[#E55503] font-bold text-sm">
            Service {service.id}
            </span>

            <h3 className="text-2xl font-black text-[#002253] mt-3">
            {service.title}
            </h3>

            <p className="mt-4 text-slate-600">
            {service.description}
            </p>

            </div>

            </div>

            ))}

            </div>

            </div>

            </section>
            <section className="bg-[#002253] py-20">

            <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-white text-5xl font-black text-center">
            Support Services
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mt-16">

            <div className="bg-white rounded-2xl p-8">
                <img
                src="/services/material.jpg"
                alt="Construction Material Supply"
                className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-2xl font-black text-[#002253]">
                Construction Material Supply
                </h3>

                <p className="mt-4 text-slate-600">
                We supply aggregates, stone, sand, cement, steel,
                scaffolding systems, safety equipment, electrical
                items and construction accessories directly to site.
                </p>
            </div>

            <div className="bg-white rounded-2xl p-8">
                <img
                src="/services/equipment.jpg"
                alt="Equipment Rental Services"
                className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-2xl font-black text-[#002253]">
                Equipment Rental Services
                </h3>

                <p className="mt-4 text-slate-600">
                Access excavators, cranes, road rollers,
                bulldozers, concrete machinery and demolition
                equipment with certified operators.
                </p>
            </div>

            <div className="bg-white rounded-2xl p-8">
                <img
                src="/services/consultancy.jpg"
                alt="Consultancy Services"
                className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-2xl font-black text-[#002253]">
                Consultancy Services
                </h3>

                <p className="mt-4 text-slate-600">
                Engineering design, manpower supply,
                sourcing solutions, logistics support,
                maintenance planning and project consulting.
                </p>
            </div>

            </div>

            </div>

            </section>
    </div>
  );
};