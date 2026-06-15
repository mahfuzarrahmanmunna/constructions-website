"use client";

import { useState } from "react";

import { Menu } from "lucide-react";

import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isOpen, setIsOpen] = useState(false);

  console.log("Layout state:", isOpen);

  return (

    <div className="min-h-screen bg-slate-100">

      {/* Mobile Header */}

      <div
        className="
        md:hidden

        flex
        items-center
        justify-between

        bg-white

        px-4
        py-4

        shadow-sm
        border-b
        "
      >

        <button
          onClick={() => {
            console.log("CLICKED");
            setIsOpen(true);
          }}
          className="
          relative
          z-[9999]
          p-2
          bg-blue-500
          text-white
          rounded
          "
        >
          <Menu size={24} />
        </button>

        <h1
          className="
          font-bold
          text-lg
          text-blue-700
          "
        >
          CPL Admin
        </h1>

      </div>

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <main
        className="
        md:ml-72
        p-4
        md:p-6
        overflow-x-hidden
        "
      >
        {children}
    
      </main>
      

    </div>

  );
}