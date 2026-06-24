/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Building2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { FaYoutube } from "react-icons/fa";

const PALETTE = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
  white: "#FFFFFF",
  grayBg: "#F8FAFC",
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 15,
      mass: 0.8,
    },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export default function CaseStudyDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [study, setStudy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects?status=published")
      .then((res) => res.json())
      .then((data) => {
        const items = data.projects || [];
        const found = items.find((p: any) => p._id === id);
        setStudy(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-[#E55503] rounded-full animate-spin"></div>
      </main>
    );

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
        <div className="text-center">
          <h1 className="text-6xl font-black text-slate-200 mb-4">404</h1>
          <p className="text-slate-500 font-medium mb-6">
            Case study not found.
          </p>
          <Link
            href="/ourWorks"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#E55503] hover:text-[#002253] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(study.youtubeUrl);

  return (
    <main className="w-full font-sans text-[#002253] bg-slate-50 min-h-screen pb-20">
      <section className="relative w-full h-[55vh] min-h-[450px] flex flex-col justify-end overflow-hidden">
        <Image
          src={study.image}
          alt={study.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00122e] via-[#002253]/70 to-transparent z-[1]" />
        <div
          className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/ourWorks"
              className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white/70 hover:text-white transition-colors border border-white/20 px-4 py-2 rounded-sm backdrop-blur-sm hover:bg-white/10"
            >
              <ArrowLeft size={14} />
              Back to Projects
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm text-white shadow-lg"
                style={{ backgroundColor: PALETTE.orange }}
              >
                {study.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/15">
                <MapPin className="w-3.5 h-3.5 text-[#FF8B28]" />
                {study.location}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/15">
                <Calendar className="w-3.5 h-3.5 text-[#FF8B28]" />
                {study.duration}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-wide text-white leading-[1.1] max-w-5xl">
              {study.title}
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-8 relative z-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12"
        >
          <div className="space-y-8">
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-8 md:p-10"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-1 h-5 rounded-full"
                  style={{ backgroundColor: PALETTE.orange }}
                />
                <h2 className="text-sm font-extrabold uppercase tracking-widest text-[#002253]">
                  Project Overview
                </h2>
              </div>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {study.description}
              </p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-8 md:p-10"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h2 className="text-sm font-extrabold uppercase tracking-widest text-[#002253]">
                  The Challenge
                </h2>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-xl">
                <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                  {study.challenge}
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-8 md:p-10"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <ShieldCheck className="w-5 h-5 text-[#224B88]" />
                <h2 className="text-sm font-extrabold uppercase tracking-widest text-[#002253]">
                  CPL Engineering Solution
                </h2>
              </div>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                By deploying high-capacity {study.category.toLowerCase()}{" "}
                configured specifically for localized load cycles, the project
                teams maintained operating parameters. CPL&apos;s advanced
                hydraulics and robust structural engineering mitigated downtime
                caused by environmental stressors. Our on-ground technical
                supervisors implemented continuous load-balancing algorithms,
                ensuring zero structural compromise while accelerating the
                projected timeline by 15%.
              </p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="rounded-2xl p-8 md:p-10 text-white shadow-lg"
              style={{ backgroundColor: PALETTE.navy }}
            >
              <h2 className="text-sm font-extrabold uppercase tracking-widest text-[#FF8B28] mb-4">
                Machinery & Equipment Deployed
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                {study.equipment}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-2 text-[11px] font-bold uppercase bg-white/10 px-3.5 py-2 rounded border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-[#FF8B28]" />
                  Certified Operators
                </span>
                <span className="flex items-center gap-2 text-[11px] font-bold uppercase bg-white/10 px-3.5 py-2 rounded border border-white/10">
                  <TrendingUp className="w-4 h-4 text-[#FF8B28]" />
                  24/7 Maintenance
                </span>
              </div>
            </motion.div>
            {embedUrl && (
              <motion.div
                variants={fadeUp}
                className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-8 md:p-10"
              >
                <div className="flex items-center gap-2.5 mb-6">
                  <FaYoutube className="w-5 h-5 text-red-600" />
                  <h2 className="text-sm font-extrabold uppercase tracking-widest text-[#002253]">
                    Project Video Walkthrough
                  </h2>
                </div>
                <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-xl bg-slate-900 shadow-inner">
                  <iframe
                    src={embedUrl}
                    title="Project Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden"
            >
              <div
                className="p-6 text-white text-center"
                style={{
                  background: `linear-gradient(135deg, ${PALETTE.orange} 0%, ${PALETTE.orangeLight} 100%)`,
                }}
              >
                <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <span className="block text-[10px] font-bold uppercase tracking-widest opacity-80">
                  Key Performance Metric
                </span>
                <span className="block text-3xl font-black mt-1.5 tracking-wide">
                  {study.stats}
                </span>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 border border-slate-100">
                    <MapPin className="w-4 h-4 text-[#E55503]" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Location
                    </span>
                    <span className="text-sm font-bold text-[#002253]">
                      {study.location}
                    </span>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-5 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 border border-slate-100">
                    <Building2 className="w-4 h-4 text-[#E55503]" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Client Entity
                    </span>
                    <span className="text-sm font-bold text-[#002253]">
                      {study.client}
                    </span>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-5 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 border border-slate-100">
                    <Calendar className="w-4 h-4 text-[#E55503]" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Project Duration
                    </span>
                    <span className="text-sm font-bold text-[#002253]">
                      {study.duration}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="rounded-2xl p-6 text-white text-center shadow-lg"
              style={{ backgroundColor: PALETTE.navy }}
            >
              <h3 className="text-sm font-bold mb-2">
                Need similar project capabilities?
              </h3>
              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                Contact our engineering team to discuss your specific heavy
                machinery requirements.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold transition-all duration-300 shadow-md hover:-translate-y-px"
                style={{
                  backgroundColor: PALETTE.orange,
                  boxShadow: `0 6px 20px ${PALETTE.orange}35`,
                }}
              >
                Start a Project <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <div className="lg:hidden">
              <Link
                href="/ourWorks"
                className="w-full flex items-center justify-center gap-2 py-4 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors bg-white"
              >
                <ArrowLeft className="w-4 h-4" />
                View All Projects
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
