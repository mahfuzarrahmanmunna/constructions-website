/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";
import { primaryServices, secondaryServices } from "./servicesData";

const PALETTE = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
  white: "#FFFFFF",
  grayBg: "#F8FAFC",
};

// Animation Variants for Staggered Children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ServicePage() {
  return (
    <div>
      {/* HERO SECTION */}
      <section
        className="relative w-full h-[45vh] min-h-[450px] mt-40 flex flex-col justify-center items-center overflow-hidden bg-cover bg-center text-white"
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
            Integrated Infrastructure & Construction Solutions
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mt-2">
              <span
                className="text-xl md:text-2xl font-bold tracking-wide uppercase"
                style={{ color: PALETTE.orangeLight }}
              >
                We stop vendor confusion by handling materials, machinery and
                engineering under one roof.
              </span>
            </div>
            <div
              className="w-24 h-1.5 mt-4 rounded-full"
              style={{ backgroundColor: PALETTE.orange }}
            ></div>
          </motion.div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="py-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6"
        >
          <h2 className="text-4xl font-black text-center text-[#002253]">
            At CPL, our primary focus is driving the sustainable growth of
            infrastructure across Bangladesh.
          </h2>

          <p className="mt-6 text-center text-slate-600 leading-relaxed text-lg">
            We combine top-tier engineering talent with our own heavy equipment
            to deliver massive structural projects from the ground up.
          </p>
        </motion.div>
      </section>

      {/* PRIMARY SERVICES GRID */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {primaryServices.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg group"
              >
                {/* Image Wrapper with Hover Zoom */}
                <div className="overflow-hidden h-64">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-8">
                  <span className="text-[#E55503] font-bold text-sm">
                    Service {service.id}
                  </span>

                  <h3 className="text-2xl font-black text-[#002253] mt-3">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-slate-600">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECONDARY / SUPPORT SERVICES */}
      <section className="bg-[#002253] py-20 relative overflow-hidden">
        {/* Subtle pattern background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        ></div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          <h2 className="text-white text-4xl md:text-5xl font-black text-center mb-16 uppercase tracking-wide">
            Support Services
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {secondaryServices.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-[#E55503]"
              >
                <div className="overflow-hidden h-48 rounded-lg mb-6 group">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-2xl font-black text-[#002253]">
                  {service.title}
                </h3>

                <p className="mt-4 text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-6 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#E55503] w-0 group-hover:w-full transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
