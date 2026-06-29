"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  MessageSquare,
  Headphones,
  Wrench,
  ChevronRight,
  Mail,
  Share2,
  Phone,
} from "lucide-react";

// --- Color Palette ---
const COLORS = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
  dark: "#0A1628",
};

// --- SUB-COMPONENTS ---

const SocialButton = ({
  icon: Icon,
  label,
  color,
  sublabel,
}: {
  icon: React.ElementType;
  label: string;
  color: string;
  sublabel?: string;
  hoverColor?: string;
  onClick?: () => void;
}) => (
  <button
    className="group flex items-center gap-3 p-2.5 rounded-xl bg-white/40 border border-white/50 hover:bg-white/80 hover:border-white/90 transition-all duration-300 active:scale-[0.98]"
    onClick={() => {}}
  >
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center text-white transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-105"
      style={{ backgroundColor: color }}
    >
      <Icon size={15} />
    </div>
    <div className="text-left">
      <p className="text-xs font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
        {label}
      </p>
      {sublabel && (
        <p className="text-[10px] text-gray-400 font-medium">{sublabel}</p>
      )}
    </div>
  </button>
);

const MenuItem = ({
  icon,
  label,
  isHighlight = false,
  onClick,
  hasNotification = false,
  index = 0,
}: {
  icon: React.ReactNode;
  label: string;
  isHighlight?: boolean;
  onClick?: () => void; // ✅ Added onClick prop
  hasNotification?: boolean;
  index?: number;
}) => {
  return (
    <button
      className="relative flex flex-col items-center justify-center gap-1 py-3 w-full transition-all duration-300 ease-out group"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={onClick} // ✅ Applied onClick to button
    >
      {/* Hover Background */}
      <div className="absolute inset-x-2 inset-y-1 rounded-xl bg-white/0 group-hover:bg-white/40 transition-all duration-300" />

      {/* Icon Container */}
      <div
        className={`
          relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
          ${
            isHighlight
              ? "bg-gradient-to-br from-[#E55503] to-[#FF8B28] text-white shadow-lg shadow-orange-500/25"
              : "text-gray-500 group-hover:text-[#E55503]"
          }
        `}
      >
        {icon}
        {hasNotification && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E55503] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E55503] border-2 border-white" />
          </span>
        )}
      </div>

      {/* Label */}
      <span
        className={`
          relative z-10 text-[9px] font-semibold tracking-wide transition-all duration-300 whitespace-nowrap
          ${isHighlight ? "text-[#E55503]" : "text-gray-400 group-hover:text-[#002253]"}
        `}
      >
        {label}
      </span>
    </button>
  );
};

// --- MAIN COMPONENT ---

const ContactFloatingMenu = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setShowModal(false); // Close modal if minimizing
    }
  };

  // ✅ Click Outside Listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If the click is outside the containerRef (which wraps both menu & modal)
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };

    // Only add listener if modal is open to save performance
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <>
      {/* HIDDEN ON MOBILE/TABLET - ONLY DESKTOP (lg and above) */}
      <div
        ref={containerRef} // ✅ Ref wraps everything
        className="hidden lg:block fixed right-0 top-1/2 -translate-y-1/2 z-[100]"
      >
        {/* --- MODAL PANEL --- */}
        <div
          className={`
            absolute 
            right-full 
            top-1/2 
            -translate-y-1/2 
            mr-4 
            w-64 
            transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
            origin-right
            ${
              showModal && isExpanded
                ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
                : "opacity-0 translate-x-6 scale-[0.95] pointer-events-none"
            }
          `}
          // ❌ Removed onMouseEnter/Leave from here so you can interact with modal buttons safely
        >
          {/* Glass Card */}
          <div className="relative bg-white/70 backdrop-blur-2xl p-5 rounded-2xl shadow-[0_20px_60px_rgba(0,34,83,0.12)] border border-white/60 overflow-hidden">
            {/* Decorative Gradient Orb */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#E55503]/10 to-[#FF8B28]/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-[#002253]/10 to-[#224B88]/5 rounded-full blur-2xl" />

            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-bold text-[#002253] tracking-tight">
                    Get in Touch
                  </h3>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                    We typically reply in minutes
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className="text-[10px] font-semibold text-emerald-600">
                    Online
                  </span>
                </div>
              </div>

              {/* Contact Options */}
              <div className="space-y-2 mb-4">
                <SocialButton
                  icon={MessageCircle}
                  label="WhatsApp"
                  sublabel="Chat with us instantly"
                  color="#25D366"
                />
                <SocialButton
                  icon={Phone}
                  label="Phone Call"
                  sublabel="Mon - Fri, 9am - 6pm"
                  color="#224B88"
                />
                <SocialButton
                  icon={Share2}
                  label="Social Media"
                  sublabel="Follow for updates"
                  color="#8B5CF6"
                />
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />

              {/* Email Section */}
              <button className="w-full py-3 px-4 bg-gradient-to-r from-[#002253] to-[#224B88] rounded-xl flex items-center gap-3 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300 group active:scale-[0.98]">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white group-hover:bg-white/20 transition-colors duration-300">
                  <Mail size={15} />
                </div>
                <div className="text-left flex-1">
                  <p className="text-[10px] text-blue-200 font-medium uppercase tracking-wider">
                    Email Us
                  </p>
                  <p className="text-xs font-bold text-white">
                    support@company.com
                  </p>
                </div>
                <ChevronRight
                  size={14}
                  className="text-white/50 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                />
              </button>
            </div>
          </div>
        </div>

        {/* --- MAIN MENU CARD --- */}
        <div className="inline-block transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          {isExpanded ? (
            // === EXPANDED STATE ===
            <div className="relative bg-white/50 backdrop-blur-2xl border border-white/60 rounded-[1.75rem] shadow-[0_8px_40px_rgba(0,34,83,0.08)] flex flex-col items-center py-5 w-[76px] hover:shadow-[0_16px_50px_rgba(0,34,83,0.12)] transition-all duration-300 overflow-hidden">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#E55503]/40 to-transparent" />

              {/* Header Badge */}
              <div className="w-full px-3.5 mb-4">
                <div className="relative text-center bg-gradient-to-br from-[#002253] to-[#1a3a6e] py-2 rounded-xl shadow-lg shadow-blue-900/15 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  <span className="relative text-white font-bold text-[8px] uppercase tracking-[0.2em]">
                    Contact
                  </span>
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col w-full space-y-0.5 px-1">
                <MenuItem
                  icon={<MessageCircle size={17} strokeWidth={1.8} />}
                  label="WhatsApp"
                  index={0}
                />
                <MenuItem
                  icon={<MessageSquare size={17} strokeWidth={1.8} />}
                  label="Live Chat"
                  hasNotification
                  index={1}
                />

                {/* Trigger Item - Pre-Sales */}
                <MenuItem
                  icon={<Headphones size={17} strokeWidth={1.8} />}
                  label="Pre-Sales"
                  isHighlight
                  onClick={() => setShowModal((prev) => !prev)} // ✅ Toggle modal on click
                  index={2}
                />

                <MenuItem
                  icon={<Wrench size={17} strokeWidth={1.8} />}
                  label="Support"
                  index={3}
                />
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent" />

              {/* Collapse Button */}
              <div
                onClick={handleToggle}
                className="mt-4 w-full flex flex-col items-center justify-center cursor-pointer group py-1"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100/80 flex items-center justify-center group-hover:bg-gray-200/80 group-hover:shadow-sm transition-all duration-300">
                  <ChevronRight
                    className="text-[#002253] rotate-180 group-hover:-translate-y-0.5 transition-all"
                    size={14}
                  />
                </div>
                <span className="text-[7px] text-gray-300 font-bold uppercase tracking-[0.15em] mt-1 group-hover:text-[#E55503] transition-colors">
                  Minimize
                </span>
              </div>
            </div>
          ) : (
            // === COLLAPSED STATE ===
            <button onClick={handleToggle} className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-[#E55503] to-[#FF8B28] rounded-[1.25rem] opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-500" />

              {/* Main Button */}
              <div className="relative w-14 h-14 bg-gradient-to-br from-[#E55503] to-[#FF8B28] rounded-2xl shadow-xl shadow-orange-500/25 flex items-center justify-center text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-2xl group-hover:shadow-orange-500/30 group-hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                <MessageCircle
                  size={24}
                  strokeWidth={2}
                  className="relative z-10 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shine" />
                <div className="absolute inset-0 rounded-2xl border border-white/20 animate-pulse-ring" />
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes shine {
          100% {
            left: 200%;
          }
        }
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.15);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        .animate-shine {
          animation: shine 1s ease-in-out;
        }
        .animate-pulse-ring {
          animation: pulse-ring 2.5s ease-out infinite;
        }
      `}</style>
    </>
  );
};

export default ContactFloatingMenu;
