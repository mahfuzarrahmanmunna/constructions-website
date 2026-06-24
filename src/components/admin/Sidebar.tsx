"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Boxes,
  ClipboardList,
  MessageSquare,
  Tags,
  FileText,
  Settings,
  Users,
  BarChart3,
  Wrench,
  X,
} from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

// Navigation structure grouped by category
const navSections = [
  {
    title: "OVERVIEW",
    links: [
      { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "MANAGEMENT",
    links: [
      { name: "Projects", href: "/admin/projects", icon: FolderKanban },
      { name: "Product Management", href: "/admin/products", icon: Boxes },
      { name: "Service Management", href: "/admin/services", icon: Wrench }, // Added from your old code
      {
        name: "Inquiries & Leads",
        href: "/admin/inquiries",
        icon: ClipboardList,
      },
      {
        name: "Contact Messages",
        href: "/admin/messages",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "CONFIGURATION",
    links: [
      { name: "Categories", href: "/admin/categories", icon: Tags }, // Fixed icon (was Users)
      { name: "Estimates", href: "/admin/manage-estimates", icon: FileText }, // Fixed icon (was Users)
      { name: "Site Content", href: "/admin/settings", icon: Settings },
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3 }, // Fixed icon (was LineChart)
    ],
  },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 z-50 w-72 h-screen
          bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900
          text-slate-300 shadow-2xl
          transition-transform duration-300 ease-in-out
          flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 font-bold text-white text-lg">
              C
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                CPL Admin
              </h2>
              <p className="text-[0.65rem] text-blue-300/70 uppercase tracking-widest font-medium">
                Management Portal
              </p>
            </div>
          </div>

          {/* Close Button (Mobile Only) */}
          <button
            onClick={closeSidebar}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors md:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 scrollbar-thin">
          {navSections.map((section) => (
            <div key={section.title} className="mb-6 last:mb-0">
              {/* Section Title */}
              <p className="px-3 mb-2 text-[0.65rem] font-bold text-slate-500 uppercase tracking-[0.15em]">
                {section.title}
              </p>

              {/* Section Links */}
              <div className="space-y-1">
                {section.links.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeSidebar}
                      className={`
                        group flex items-center gap-3 px-3 py-2.5 rounded-lg
                        text-sm font-medium transition-all duration-200
                        ${
                          isActive
                            ? "bg-blue-600/20 text-white border-l-[3px] border-blue-400 pl-[9px] shadow-sm shadow-blue-500/10"
                            : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border-l-[3px] border-transparent pl-[9px]"
                        }
                      `}
                    >
                      <Icon
                        size={19}
                        className={`transition-colors duration-200 ${
                          isActive
                            ? "text-blue-400"
                            : "text-slate-500 group-hover:text-slate-300"
                        }`}
                      />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer / Bottom Info */}
        <div className="p-4 border-t border-white/5 shrink-0">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-300 font-medium">Need Help?</p>
            <p className="text-[0.7rem] text-blue-400/60 mt-1">
              Contact IT Support
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
