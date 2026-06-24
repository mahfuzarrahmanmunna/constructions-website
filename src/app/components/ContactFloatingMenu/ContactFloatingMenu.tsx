"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  MessageSquare,
  Headphones,
  Wrench,
  ChevronUp,
  Mail,
  Share2,
} from "lucide-react";

// --- Color Palette Constants ---
const COLORS = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

// --- SUB-COMPONENTS ---

// Social Button for Modal
const SocialButton = ({
  icon: Icon,
  label,
  color,
}: {
  icon: React.ElementType;
  label: string;
  color: string;
  hoverColor?: string;
  onClick?: () => void;
}) => (
  <button
    className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white/50 border border-white/60 hover:bg-white/80 hover:border-white/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm active:scale-95"
    onClick={() => {}}
  >
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-transform duration-300"
      style={{ backgroundColor: color }}
    >
      <Icon size={14} />
    </div>
    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-wider">
      {label}
    </span>
  </button>
);

// Individual Menu Item
const MenuItem = ({
  icon,
  label,
  isHighlight = false,
  onMouseEnter,
  onMouseLeave,
  hasNotification = false,
}: {
  icon: React.ReactNode;
  label: string;
  isHighlight?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  hasNotification?: boolean;
}) => {
  return (
    <button
      className="relative flex flex-col items-center justify-center gap-1.5 py-2.5 w-full transition-all duration-300 ease-out group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Icon Container */}
      <div
        className={`
          relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
          ${
            isHighlight
              ? "bg-gradient-to-br from-[#E55503] to-[#FF8B28] text-white shadow-md shadow-orange-500/20"
              : "bg-white/30 text-gray-500 backdrop-blur-sm border border-white/40 group-hover:bg-white/60 group-hover:text-[#E55503] group-hover:shadow-sm"
          }
        `}
      >
        {icon}
        {/* Notification Dot - Subtle pulse instead of bounce */}
        {hasNotification && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#E55503] border border-white rounded-full" />
        )}
      </div>

      {/* Label Text */}
      <span
        className={`
          relative z-10 text-[9px] font-semibold tracking-wide transition-colors duration-300 whitespace-nowrap
          ${isHighlight ? "text-[#E55503]" : "text-gray-500 group-hover:text-[#002253]"}
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

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) setShowModal(false);
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex items-center justify-end">
      {/* --- LEFT SIDE FROSTED MODAL (Talk To Us) --- */}
      {/* Using opacity and translate for smooth enter/exit animations */}
      <div
        className={`mr-3 w-52 bg-white/60 backdrop-blur-2xl p-4 rounded-2xl shadow-[0_8px_32px_rgba(0,34,83,0.1)] border border-white/50 transition-all duration-300 ease-out origin-right ${
          showModal && isExpanded
            ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-x-4 scale-95 pointer-events-none"
        }`}
        onMouseEnter={() => setShowModal(true)}
        onMouseLeave={() => setShowModal(false)}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#002253] to-[#224B88]">
            Talk To Us
          </h3>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
        </div>

        {/* Social Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <SocialButton
            icon={() => <span className="font-bold text-[8px]">LINE</span>}
            label="LINE"
            color="#06C755"
            hoverColor="#06C755"
          />
          <SocialButton
            icon={Share2}
            label="Social"
            color="#224B88"
            hoverColor="#224B88"
          />
        </div>

        {/* Email Section */}
        <button className="w-full py-2.5 px-3 bg-white/40 rounded-xl border border-white/60 flex items-center gap-2.5 hover:bg-white/70 hover:border-white/90 transition-all duration-300 group active:scale-95">
          <div className="w-7 h-7 rounded-full bg-orange-100/80 flex items-center justify-center text-[#E55503] group-hover:bg-[#E55503] group-hover:text-white transition-colors duration-300">
            <Mail size={14} />
          </div>
          <div className="text-left">
            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">
              E-Mail
            </p>
            <p className="text-[11px] font-bold text-gray-800 group-hover:text-[#E55503] transition-colors">
              Support
            </p>
          </div>
        </button>
      </div>

      {/* --- RIGHT SIDE MENU CARD --- */}
      <div className="transition-all duration-500 ease-out">
        {isExpanded ? (
          // === EXPANDED STATE ===
          <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[1.5rem] shadow-[0_8px_32px_rgba(0,34,83,0.08)] flex flex-col items-center py-4 w-[68px] hover:shadow-[0_12px_40px_rgba(0,34,83,0.12)] transition-all duration-300">
            {/* Header: Inquiry with Gradient */}
            <div className="w-full px-3 mb-3">
              <div className="w-full h-1 rounded-full bg-white/30 mb-3 overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-[#E55503] to-[#FF8B28] rounded-full"></div>
              </div>
              <div className="text-center bg-gradient-to-br from-[#002253] to-[#224B88] py-1.5 rounded-xl shadow-md shadow-blue-900/10">
                <span className="text-white font-bold text-[8px] uppercase tracking-[0.15em]">
                  Inquiry
                </span>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col w-full space-y-0.5 px-1">
              <MenuItem icon={<MessageCircle size={16} />} label="WhatsApp" />
              <MenuItem
                icon={<MessageSquare size={16} />}
                label="Chat"
                hasNotification
              />

              {/* Trigger Item */}
              <MenuItem
                icon={<Headphones size={16} />}
                label="Pre-Sales"
                isHighlight
                onMouseEnter={() => setShowModal(true)}
                onMouseLeave={() => setShowModal(false)}
              />

              <MenuItem icon={<Wrench size={16} />} label="Support" />
            </div>

            {/* Fold Up Button */}
            <div
              onClick={handleToggle}
              className="mt-3 w-full flex flex-col items-center justify-center cursor-pointer group py-1"
            >
              <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center group-hover:bg-white/80 group-hover:shadow-sm transition-all duration-300">
                <ChevronUp
                  className="text-[#002253] group-hover:-translate-y-0.5 transition-transform"
                  size={14}
                />
              </div>
              <span className="text-[7px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 group-hover:text-[#E55503] transition-colors">
                Close
              </span>
            </div>
          </div>
        ) : (
          // === COLLAPSED STATE (Magnetic Orb) ===
          <button
            onClick={handleToggle}
            className="relative w-14 h-14 bg-gradient-to-br from-[#E55503] to-[#FF8B28] rounded-2xl shadow-[0_8px_24px_rgba(229,85,3,0.3)] flex items-center justify-center text-white hover:scale-105 hover:rounded-xl transition-all duration-500 ease-out group overflow-hidden"
          >
            {/* Inner Glow */}
            <div className="absolute inset-0 rounded-2xl bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Icon */}
            <MessageCircle
              size={24}
              strokeWidth={2}
              className="relative z-10"
            />

            {/* Shimmer */}
            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:animate-shine" />
          </button>
        )}
      </div>

      <style jsx global>{`
        @keyframes shine {
          100% {
            left: 200%;
          }
        }
        .animate-shine {
          animation: shine 1.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ContactFloatingMenu;
