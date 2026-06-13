"use client";

import Link from "next/link";

import {
  Home,
  Boxes,
  ClipboardList,
  Users,
  LineChart,
  X,
} from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function Sidebar({
  isOpen,
  setIsOpen,
}: SidebarProps) {

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}

      {isOpen && (

        <div
          className="
          fixed
          inset-0
          bg-black/50
          backdrop-blur-sm
          z-40
          md:hidden
          "
          onClick={closeSidebar}
        />

      )}

      {/* Sidebar */}

      <aside
        className={`
        fixed
        top-0
        left-0
        z-50
        w-72
        h-screen
        bg-gradient-to-b
        from-blue-700
        via-blue-800
        to-slate-900
        text-white
        shadow-2xl
        transition-transform
        duration-300

        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        md:translate-x-0
        `}
      >

        {/* Mobile Header */}

        <div
          className="
          flex
          items-center
          justify-between

          p-6

          md:hidden

          border-b
          border-white/10
          "
        >

          <div>

            <h2 className="text-xl font-bold">
              CPL Admin
            </h2>

            <p className="text-xs text-blue-200">
              Management System
            </p>

          </div>

          <button
            onClick={closeSidebar}
            className="
            p-2
            rounded-lg
            hover:bg-white/10
            "
          >
            <X size={22} />
          </button>

        </div>

        {/* Desktop Header */}

        <div
          className="
          hidden
          md:block

          p-6

          border-b
          border-white/10
          "
        >

          <h2
            className="
            text-2xl
            font-bold
            "
          >
            CPL Admin
          </h2>

          <p
            className="
            text-sm
            text-blue-200
            mt-1
            "
          >
            Management System
          </p>

        </div>

        {/* Navigation */}

        <nav className="p-4 space-y-2">

          <Link
            href="/admin/dashboard"
            onClick={closeSidebar}
            className="
            flex
            items-center
            gap-3

            px-4
            py-3

            rounded-xl

            hover:bg-white/10

            transition-all
            "
          >
            <Home size={20} />
            Dashboard
          </Link>

          <Link
            href="/admin/products"
            onClick={closeSidebar}
            className="
            flex
            items-center
            gap-3

            px-4
            py-3

            rounded-xl

            hover:bg-white/10

            transition-all
            "
          >
            <Boxes size={20} />
            Products
          </Link>

          <Link
            href="/admin/inquiries"
            onClick={closeSidebar}
            className="
            flex
            items-center
            gap-3

            px-4
            py-3

            rounded-xl

            hover:bg-white/10

            transition-all
            "
          >
            <ClipboardList size={20} />
            Inquiries
          </Link>

          <Link
            href="/admin/users"
            onClick={closeSidebar}
            className="
            flex
            items-center
            gap-3

            px-4
            py-3

            rounded-xl

            hover:bg-white/10

            transition-all
            "
          >
            <Users size={20} />
            Users
          </Link>

          <Link
            href="/admin/analytics"
            onClick={closeSidebar}
            className="
            flex
            items-center
            gap-3

            px-4
            py-3

            rounded-xl

            hover:bg-white/10

            transition-all
            "
          >
            <LineChart size={20} />
            Analytics
          </Link>

        </nav>

      </aside>
    </>
  );
}