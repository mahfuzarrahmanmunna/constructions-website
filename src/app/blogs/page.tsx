"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Calendar, User, ArrowRight, Filter } from "lucide-react";
import Link from "next/link";

// --- Color Palette Constants ---
const PALETTE = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
  grayBg: "#F8FAFC",
};

// --- DUMMY DATA (Slugs are CRITICAL here) ---
const blogPosts = [
  {
    id: 1,
    slug: "modern-road-construction-techniques-2024", // <--- ADDED THIS
    title: "Modern Road Construction Techniques in 2024",
    excerpt: "Exploring the latest asphalt technologies and compaction methods that ensure durability on Bangladesh's highways.",
    date: "Oct 24, 2023",
    author: "Md. Azizur Rahman",
    category: "Roads",
    image: "https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    slug: "future-of-eco-friendly-infrastructure", // <--- ADDED THIS
    title: "The Future of Eco-Friendly Infrastructure",
    excerpt: "How CPL is integrating sustainable materials and green building practices into large-scale industrial projects.",
    date: "Oct 18, 2023",
    author: "Engr. Rafiqul Ali",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    slug: "rooppur-nuclear-power-plant-case-study", // <--- ADDED THIS
    title: "Rooppur Nuclear Power Plant: A Case Study",
    excerpt: "An in-depth look at the logistical challenges and engineering triumphs of supplying materials to the Rooppur site.",
    date: "Sep 10, 2023",
    author: "CPL Team",
    category: "Case Study",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    slug: "heavy-equipment-maintenance-101", // <--- ADDED THIS
    title: "Heavy Equipment Maintenance 101",
    excerpt: "Why regular maintenance of excavators and cranes is crucial for safety and cost-efficiency on long-term projects.",
    date: "Aug 05, 2023",
    author: "Maintenance Dept.",
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    slug: "water-drainage-systems-monsoon-ready-cities", // <--- ADDED THIS
    title: "Water Drainage Systems for Monsoon Ready Cities",
    excerpt: "Designing culverts and drainage channels that can withstand the heaviest monsoon rains in Bangladesh.",
    date: "Jul 22, 2023",
    author: "Civil Dept.",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    slug: "effective-site-safety-management", // <--- ADDED THIS
    title: "Effective Site Safety Management",
    excerpt: "Best practices for maintaining zero-accident records on major construction sites using modern safety gear.",
    date: "Jun 15, 2023",
    author: "Safety Officer",
    category: "Safety",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
  },
];

const categories = [
  "All Posts",
  "Roads",
  "Infrastructure",
  "Equipment",
  "Sustainability",
  "Case Studies",
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* ── HERO SECTION ── */}
      <section className="bg-[#002253] py-20 px-4 md:px-8 text-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-[#FF8B28] font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
            Insights & Updates
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Engineering the Future
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Expert articles, project updates, and industry insights from the team at Constructive Partners Limited.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ── LEFT COLUMN: BLOG POSTS (Span 2) ── */}
        <div className="lg:col-span-2">
          {/* Filter Bar (Desktop) */}
          <div className="hidden md:flex items-center justify-between mb-8 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-[#002253] font-bold">
              <Filter size={20} className="text-[#E55503]" />
              <span>Showing {blogPosts.length} articles</span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#002253] text-white rounded-lg text-sm font-medium hover:bg-[#224B88] transition-colors">
                Newest
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Popular
              </button>
            </div>
          </div>

          {/* Blog Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#E55503] uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {post.author}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#002253] mb-3 leading-snug group-hover:text-[#E55503] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                    <Link
                      href={`/blogs/${post.slug}`} 
                      className="text-[#E55503] text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      Read Article
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center gap-2">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all ${
                  num === 1
                    ? "bg-[#E55503] text-white shadow-lg"
                    : "bg-white text-gray-500 hover:bg-[#002253] hover:text-white"
                }`}
              >
                {num}
              </button>
            ))}
            <button className="w-10 h-10 rounded-lg flex items-center justify-center font-bold bg-white text-gray-500 hover:bg-[#002253] hover:text-white transition-all">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* ── RIGHT COLUMN: SIDEBAR (Span 1) ── */}
        <aside className="lg:col-span-1 space-y-8">
          
          {/* Search Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
          >
            <h3 className="text-xl font-bold text-[#002253] mb-4">Search</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E55503] focus:ring-1 focus:ring-[#E55503]/20 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </motion.div>

          {/* Categories Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
          >
            <h3 className="text-xl font-bold text-[#002253] mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`block px-4 py-3 rounded-xl flex items-center justify-between group transition-all ${
                      index === 0 ? "bg-[#002253] text-white" : "bg-gray-50 text-gray-600 hover:bg-[#002253] hover:text-white"
                    }`}
                  >
                    <span className="text-sm font-medium">{cat}</span>
                    <span className={`text-xs px-2 py-1 rounded-md ${
                      index === 0 ? "bg-white/20" : "bg-gray-200 group-hover:bg-white/20"
                    }`}>
                      {index === 0 ? blogPosts.length : Math.floor(Math.random() * 5)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Popular Posts Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
          >
            <h3 className="text-xl font-bold text-[#002253] mb-4">Popular Posts</h3>
            <div className="space-y-4">
              {[blogPosts[0], blogPosts[2], blogPosts[4]].map((post) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className="flex gap-4 group"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#E55503] uppercase tracking-wider mb-1 block">
                      {post.category}
                    </span>
                    <h4 className="text-sm font-bold text-[#002253] leading-snug group-hover:text-[#224B88] transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Calendar size={12} /> {post.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* CTA Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-[#002253] to-[#224B88] p-8 rounded-2xl text-center text-white shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
            <h3 className="text-xl font-bold mb-2">Have a Project?</h3>
            <p className="text-white/70 text-sm mb-6">Get a free quote for your next construction need.</p>
            <button className="bg-[#E55503] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#FF8B28] transition-all shadow-lg">
              Get a Quote
            </button>
          </motion.div>

        </aside>

      </div>
    </div>
  );
}