"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Share2,
  Clock,
  Printer,
} from "lucide-react";
import Link from "next/link";

// --- Color Palette ---
const PALETTE = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

// --- MOCK DATA ---
const blogPosts = [
  {
    id: 1,
    slug: "modern-road-construction-16-2024",
    title: "Modern Road Construction in 16",
    excerpt: "Exploring the latest asphalt technologies...",
    date: "Oct 24, 16",
    author: "Md. Azizur Rahman",
    authorRole: "Director of Finance",
    image:
      "https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=800&auto=format&fit=crop",
    category: "Roads",
    content: `
      <p class="mb-4">The construction industry in Bangladesh is evolving rapidly...</p>
      <h3 class="text-xl font-bold mt-6 mb-2 text-[#002253]">1. Advanced Asphalt Paving</h3>
      <p class="mb-4">Modern pavers now use computer-controlled sensors...</p>
    `,
  },
  {
    id: 2,
    slug: "future-of-eco-friendly-16",
    title: "The Future of Eco-Friendly Infrastructure",
    excerpt: "How CPL is integrating sustainable materials...",
    date: "Oct 18, 16",
    author: "Engr. Rafiqul Ali",
    authorRole: "Director of Finance",
    image: "https://shorturl.to/...",
    category: "Sustainability",
    content: `
      <p class="mb-4">Sustainability is a requirement.</p>
      <p class="mb-4">From using recycled steel to implementing solar...</p>
    `,
  },
  {
    id: 3,
    slug: "rooppur-nuclear-power-16",
    title: "Rooppur Nuclear Power Plant: A Case Study",
    excerpt: "An in-depth look at the logistical challenges...",
    date: "Sep 10, 16",
    author: "CPL Team",
    authorRole: "Project Management",
    image: "https://shorturl.to/...",
    category: "Case Study",
    content: `
      <p class="mb-4">The Rooppur project is a landmark achievement...</p>
      <p>Our role in supplying high-grade materials...</p>
    `,
  },
  {
    id: 4,
    slug: "heavy-equipment-maintenance-16",
    title: "Heavy Equipment Maintenance 101",
    excerpt: "Why regular maintenance of excavators is crucial...",
    date: "Aug 05, 16",
    author: "Maintenance Dept.",
    authorRole: "Safety Officer",
    image: "https://shorturl.to/...",
    category: "Equipment",
    content: `
      <p class="mb-4">Machinery downtime is the biggest killer of project timelines.</p>
      <p>We have established a preventive maintenance schedule...</p>
    `,
  },
  {
    id: 5,
    slug: "water-drainage-16",
    title: "Water Drainage Systems for Monsoon Ready Cities",
    excerpt: "Designing culverts and drainage channels...",
    date: "Jul 22, 16",
    author: "Civil Dept.",
    authorRole: "Chief Engineer",
    image: "https://shorturl.to/...",
    category: "Infrastructure",
    content: `
      <p class="mb-4">Flooding is a perennial issue...</p>
      <p>Our drainage solutions are engineered not just to carry water...</p>
    `,
  },
  {
    id: 6,
    slug: "effective-site-safety-16",
    title: "Effective Site Safety Management",
    excerpt: "Best practices for maintaining zero-accident records...",
    date: "Jun 15, 16",
    author: "Safety Officer",
    authorRole: "Safety Manager",
    image: "https://shorturl.to/...",
    category: "Safety",
    content: `
      <p class="mb-4">Safety is our priority.</p>
      <p>We employ rigorous training programs...</p>
    `,
  },
];

// --- HELPER FUNCTIONS ---

// Simulate fetching post by slug
function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

function getPreviousAndNextPost(currentId: number) {
  const currentIndex = blogPosts.findIndex((post) => post.id === currentId);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  return { prevPost, nextPost };
}

// --- COMPONENT ---

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const post = getPostBySlug(slug);

  // Handle 404 for non-existent posts
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 bg-gray-50">
        <div className="text-center px-8">
          <h1 className="text-2xl font-bold text-[#002253]">
            Blog post not found.
          </h1>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 bg-[#E55503] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#224B88] transition-colors"
          >
            <ArrowLeft size={20} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const { prevPost, nextPost } = getPreviousAndNextPost(post.id);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* BREADCRUMBS */}
      <nav className="bg-white border-b border-gray-200 py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-500">
          <Link
            href="/blog"
            className="hover:text-[#E55503] transition-colors flex items-center gap-1"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#002253] font-semibold truncate">
            {post.title}
          </span>
        </div>
      </nav>

      {/* HERO HEADER */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Main Image */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl group"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Right: Title & Info */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-block px-3 py-1 bg-[#E55503]/10 text-[#E55503] rounded-full text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#002253] leading-tight mb-6">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-col gap-4 mb-8 border-l-4 border-[#E55503] pl-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <Calendar size={16} className="text-[#E55503]" />
                    </div>
                    <span className="text-sm font-medium">{post.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <User size={16} className="text-[#002253]" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-[#002253]">
                        {post.author}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {post.authorRole}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-3 bg-[#002253] text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#224B88] transition-colors">
                    Share <Share2 size={16} />
                  </button>
                  <button className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                    Print
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Article Content */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100"
          >
            <div dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Tags */}
            <div className="pt-6 border-t border-gray-200 mt-8 flex flex-wrap gap-2">
              {[
                "Construction",
                "Infrastructure",
                "Safety",
                "Engineering",
                "Materials",
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-[#002253] text-xs font-bold rounded-full border border-gray-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Prev / Next Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-8 grid grid-cols-2 gap-4"
          >
            {prevPost && (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="p-6 bg-white rounded-xl border border-gray-200 hover:border-[#E55503] hover:shadow-md transition-all group flex items-center gap-4"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-500 group-hover:bg-[#E55503] group-hover:text-white transition-colors">
                  <ArrowLeft size={20} />
                </div>
                <div className="text-left">
                  <span className="text-xs text-gray-500 block mb-1">
                    Previous
                  </span>
                  <span className="text-sm font-bold text-[#002253] line-clamp-1">
                    {prevPost.title}
                  </span>
                </div>
              </Link>
            )}

            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="p-6 bg-white rounded-xl border border-gray-200 hover:border-[#E55503] hover:shadow-md transition-all group flex items-center justify-end gap-4 text-right"
              >
                <div className="text-left">
                  <span className="text-xs text-gray-500 block mb-1">Next</span>
                  <span className="text-sm font-bold text-[#002253] line-clamp-1">
                    {nextPost.title}
                  </span>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-500 group-hover:bg-[#E55503] group-hover:text-white transition-colors">
                  <ArrowRight size={20} />
                </div>
              </Link>
            )}
          </motion.div>
        </div>

        {/* Right Sidebar */}
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
                placeholder="Search blog..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus: outline-none focus:border-[#E55503] focus:ring-1 focus:ring-[#E55503]/20 transition-all"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </motion.div>

          {/* Categories Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
          >
            <h3 className="text-xl font-bold text-[#002253] mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {[
                "Roads",
                "Infrastructure",
                "Equipment",
                "Sustainability",
                "Safety",
                "Engineering",
                "Materials",
              ].map((cat) => (
                <li key={cat} className="block">
                  <a
                    href="#"
                    className="block px-4 py-3 rounded-xl flex items-center justify-between bg-gray-50 text-[#002253] font-medium hover:bg-[#002253] hover:text-white transition-colors"
                  >
                    {cat}
                    <span className="text-xs bg-white p-1 rounded-md shadow-sm">
                      3
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
            <h3 className="text-xl font-bold text-[#002253] mb-4">
              Popular Posts
            </h3>
            <div className="space-y-4">
              {[blogPosts[0], blogPosts[2], blogPosts[4]].map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
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
                      <Clock size={12} /> {post.date}
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
            <p className="text-white/70 text-sm mb-6">
              Get a free quote for your next construction need.
            </p>
            <button className="bg-[#E55503] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#FF8B28] transition-all shadow-lg">
              Get a Quote
            </button>
          </motion.div>
        </aside>
      </div>
    </div>
  );
}
