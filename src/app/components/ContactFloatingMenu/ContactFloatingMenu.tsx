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
  ArrowLeft,
} from "lucide-react";

// --- Color Palette Constants ---
const COLORS = {
  navy: "#002253", // Pantone 2768 C
  blue: "#224B88", // Pantone 2154 C
  orange: "#E55503", // Pantone 1655 C
  orangeLight: "#FF8B28", // Pantone 1495 C
};

// --- SUB-COMPONENTS ---

// Social Button for Modal
const SocialButton = ({
  icon: Icon,
  label,
  color,
  hoverColor,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  color: string;
  hoverColor: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="relative group flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-white/50 border border-white/60 hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
  >
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors duration-300`}
      style={{ backgroundColor: color }}
    >
      <Icon size={20} />
    </div>
    <span className="text-[10px] font-bold text-gray-500 group-hover:text-gray-800 uppercase tracking-wider">
      {label}
    </span>
    {/* Glow effect on hover */}
    <div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ boxShadow: `0 0 20px ${hoverColor}40` }}
    ></div>
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
      className={`
        relative flex flex-col items-center justify-center gap-2 py-4 w-full 
        transition-all duration-300 ease-out group
      `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Active Background Indicator */}
      {isHighlight && (
        <div className="absolute inset-x-2 bottom-0 top-0 rounded-2xl bg-gradient-to-t from-orange-50 to-transparent opacity-100 transition-opacity duration-300" />
      )}

      {/* Icon Container */}
      <div
        className={`
          relative z-10 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
          ${
            isHighlight
              ? "bg-gradient-to-br from-[#E55503] to-[#FF8B28] text-white shadow-lg shadow-orange-500/30 scale-110"
              : "text-gray-400 bg-white/40 group-hover:text-[#E55503] group-hover:bg-white group-hover:shadow-md group-hover:scale-105 border border-transparent group-hover:border-gray-100"
          }
        `}
      >
        {icon}
        {/* Pulse for highlighted item */}
        {isHighlight && (
          <span className="absolute inset-0 rounded-xl animate-ping bg-[#E55503] opacity-20"></span>
        )}
        {/* Notification Dot */}
        {hasNotification && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-[#E55503] border-2 border-white rounded-full animate-bounce" />
        )}
      </div>

      {/* Label Text */}
      <span
        className={`
          relative z-10 text-[11px] font-bold tracking-wide transition-colors duration-300
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

  const handleModalEnter = () => setShowModal(true);
  const handleModalLeave = () => setShowModal(false);

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex items-center justify-end pointer-events-none">
      {/* --- LEFT SIDE FROSTED MODAL (Talk To Us) --- */}
      {isExpanded && showModal && (
        <div
          className="pointer-events-auto mr-4 bg-white/90 backdrop-blur-3xl p-6 rounded-3xl shadow-[0_20px_60px_rgba(0,34,83,0.15)] border border-white/60 w-72 origin-right transition-all duration-300 transform"
          style={{ animation: "fadeIn 0.3s ease-out forwards" }}
          onMouseEnter={handleModalEnter}
          onMouseLeave={handleModalLeave}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#002253] to-[#224B88]">
              Talk To Us
            </h3>
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
          </div>

          {/* Social Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <SocialButton
              icon={() => <span className="font-bold text-[10px]">LINE</span>}
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
          <div className="relative group">
            <button className="w-full py-3.5 px-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-3 shadow-sm hover:shadow-md hover:border-[#E55503]/30 transition-all duration-300 group-hover:bg-orange-50/50">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#E55503] group-hover:bg-[#E55503] group-hover:text-white transition-colors duration-300">
                <Mail size={18} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  E - Mail
                </p>
                <p className="text-sm font-bold text-gray-800 group-hover:text-[#E55503] transition-colors">
                  Support
                </p>
              </div>
            </button>
          </div>

          {/* Connector Line (Visual Decor) */}
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-8 bg-gradient-to-l from-transparent to-white/80 rounded-l-lg border-l border-t border-b border-white/60"></div>
        </div>
      )}

      {/* --- RIGHT SIDE MENU CARD --- */}
      <div className="pointer-events-auto transition-all duration-500 ease-out">
        {isExpanded ? (
          // === EXPANDED STATE ===
          <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,34,83,0.10)] flex flex-col items-center py-6 overflow-hidden w-28 hover:shadow-[0_25px_60px_rgba(0,34,83,0.15)] hover:border-white/80 transition-all duration-300">
            {/* Header: Inquiry with Gradient */}
            <div className="w-full px-4 mb-4">
              <div className="w-full h-1.5 rounded-full bg-gray-200 mb-4 overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-[#E55503] to-[#FF8B28] rounded-full"></div>
              </div>
              <div className="text-center bg-gradient-to-br from-[#002253] to-[#224B88] py-3 rounded-2xl shadow-lg shadow-blue-900/20">
                <span className="text-white font-bold text-[10px] uppercase tracking-[0.2em]">
                  Inquiry
                </span>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col w-full space-y-1 px-2">
              <MenuItem
                icon={<MessageCircle size={22} />}
                label="WhatsApp"
                hasNotification={false}
              />
              <MenuItem
                icon={<MessageSquare size={22} />}
                label="Chat"
                hasNotification={true}
              />

              {/* Trigger Item */}
              <MenuItem
                icon={<Headphones size={22} />}
                label="Pre - Sales"
                isHighlight
                onMouseEnter={handleModalEnter}
                onMouseLeave={handleModalLeave}
              />

              <MenuItem icon={<Wrench size={22} />} label="Support" />
            </div>

            {/* Fold Up Button */}
            <div
              onClick={handleToggle}
              className="mt-4 w-full flex flex-col items-center justify-center cursor-pointer group py-2"
            >
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                <ChevronUp
                  className="text-[#002253] group-hover:-translate-y-0.5 transition-transform"
                  size={18}
                />
              </div>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1 group-hover:text-[#E55503] transition-colors">
                Close
              </span>
            </div>
          </div>
        ) : (
          // === COLLAPSED STATE (Magnetic Orb) ===
          <button
            onClick={handleToggle}
            className="relative w-20 h-20 bg-gradient-to-br from-[#E55503] to-[#FF8B28] rounded-[2.5rem] shadow-[0_10px_40px_rgba(229,85,3,0.4)] flex items-center justify-center text-white hover:scale-110 hover:rotate-3 transition-all duration-500 ease-out group overflow-hidden"
          >
            {/* Inner Glow */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Icon */}
            <MessageCircle
              size={36}
              strokeWidth={2}
              className="relative z-10 group-hover:animate-pulse"
            />

            {/* Shimmer */}
            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:animate-shine" />
          </button>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes shine {
          100% {
            left: 200%;
          }
        }
        .animate-shine {
          animation: shine 1.5s;
        }
      `}</style>
    </div>
  );
};

export default ContactFloatingMenu;
