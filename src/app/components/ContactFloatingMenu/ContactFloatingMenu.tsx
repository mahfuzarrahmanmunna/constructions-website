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
  blueDark: "#002253",
  blueMedium: "#224B88",
  orangeDark: "#E55503",
  orangeLight: "#FF8B28",
  white: "#FFFFFF",
};

const ContactFloatingMenu = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) setShowModal(false);
  };

  // Handlers specifically for the Modal
  const handleModalEnter = () => setShowModal(true);
  const handleModalLeave = () => setShowModal(false);

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[100] flex items-center justify-end">
      {/* --- LEFT SIDE FROSTED MODAL --- */}
      {/* Only visible if menu is expanded AND showModal is true (triggered by Pre-sales hover) */}
      {isExpanded && showModal && (
        <div
          className="mr-4 bg-white/70 backdrop-blur-2xl p-6 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/60 w-64 animate-fade-in origin-right transition-all duration-300"
          onMouseEnter={handleModalEnter}
          onMouseLeave={handleModalLeave}
        >
          <h3 className="text-xl font-bold text-[#002253] mb-4 border-b border-gray-200/60 pb-2">
            Talk To Us
          </h3>
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-wider">
                Social Media
              </p>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full border border-gray-200/50 flex items-center justify-center hover:bg-[#00B900] hover:text-white hover:border-[#00B900] hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 text-[#002253]">
                  <span className="font-bold text-xs">LINE</span>
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-200/50 flex items-center justify-center hover:bg-[#224B88] hover:text-white hover:border-[#224B88] hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 text-[#002253]">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-wider">
                E - Mail
              </p>
              <button className="w-full py-2.5 px-4 border border-[#E55503] text-[#E55503] font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#E55503] hover:text-white hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300">
                <Mail size={18} />
                <span>E - Mail</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- RIGHT SIDE MENU CARD --- */}
      {/* Removed onMouseEnter/Leave from this container */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_32px_rgba(0,34,83,0.10)] border border-white/60 overflow-hidden flex flex-col items-center transition-all duration-500 w-24 hover:shadow-[0_8px_32px_rgba(229,85,3,0.15)]">
        {isExpanded ? (
          <>
            {/* Header */}
            <div className="w-full bg-[#E55503] py-5 text-center rounded-t-[2rem] shadow-sm mb-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
              <span className="text-white font-bold text-xs uppercase tracking-widest relative z-10 block">
                Inquiry
              </span>
            </div>

            {/* Body */}
            <div className="flex flex-col w-full bg-transparent pb-2">
              <MenuItem icon={<MessageCircle size={24} />} label="WhatsApp" />
              <MenuItem icon={<MessageSquare size={24} />} label="Chat" />

              {/* PRE-SALES ITEM: Triggers the Modal */}
              <MenuItem
                icon={<Headphones size={24} />}
                label="Pre - sales"
                isHighlight
                onMouseEnter={handleModalEnter}
                onMouseLeave={handleModalLeave}
              />

              <MenuItem icon={<Wrench size={24} />} label="After - sales" />
            </div>

            {/* Footer */}
            <div
              onClick={handleToggle}
              className="w-full py-3 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50/50 transition-all duration-300 group mb-1"
            >
              <ChevronUp
                className="text-[#002253] mb-1 group-hover:-translate-y-0.5 transition-transform"
                size={18}
              />
              <span className="text-[9px] text-[#002253] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-[#E55503]">
                Fold Up
              </span>
            </div>
          </>
        ) : (
          // Collapsed State
          <button
            onClick={handleToggle}
            className="w-16 h-20 bg-[#E55503] text-white rounded-[2rem] shadow-lg shadow-orange-500/30 flex items-center justify-center hover:bg-[#FF8B28] hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <MessageCircle size={32} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
};

// --- Sub-component ---
// Accepts onMouseEnter and onMouseLeave props to trigger the modal
const MenuItem = ({
  icon,
  label,
  isHighlight = false,
  onMouseEnter,
  onMouseLeave,
}: {
  icon: React.ReactNode;
  label: string;
  isHighlight?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => {
  return (
    <button
      className={`
        flex flex-col items-center justify-center gap-1.5 py-3 w-full text-[#002253] 
        transition-all duration-300 relative group
        ${isHighlight ? "bg-orange-50/50" : "hover:bg-gray-50/50"}
      `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Icon Container */}
      <div
        className={`
          p-2 rounded-2xl transition-all duration-300
          ${isHighlight ? "bg-[#E55503] text-white shadow-md shadow-orange-500/20" : "text-gray-400 group-hover:text-[#E55503] group-hover:bg-white group-hover:shadow-sm"}
        `}
      >
        {icon}
      </div>

      {/* Label Text */}
      <span
        className={`
          text-[10px] font-medium leading-tight text-center transition-colors
          ${isHighlight ? "text-[#E55503] font-bold" : "group-hover:text-[#002253]"}
        `}
      >
        {label}
      </span>
    </button>
  );
};

export default ContactFloatingMenu;
