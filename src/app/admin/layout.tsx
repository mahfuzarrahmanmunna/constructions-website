"use client";

import { useEffect, useState } from "react";
import { Menu, Bell, Search } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Sidebar from "@/components/admin/Sidebar";
import AdminProfile from "@/components/admin/AdminProfile";

const ADMIN_EMAIL = "azizurseu@gmail.com";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  // Format the current route name
  const getPageTitle = () => {
    if (pathname === "/admin/dashboard") return "Dashboard";
    if (pathname === "/admin/projects") return "Projects";
    if (pathname === "/admin/inquiries") return "Inquiries";
    if (pathname === "/admin/users") return "Users";
    return "Admin";
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user || user.email !== ADMIN_EMAIL) {
        await signOut(auth);
        router.replace("/login");
        return;
      }
      setUserEmail(user.email);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin" />
          <p className="text-slate-500 font-medium text-sm">
            Securing session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow-sm border-b border-slate-200 sticky top-0 z-20">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">{getPageTitle()}</h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content Area */}
      <div className="md:ml-72 min-h-screen flex flex-col">
        {/* Desktop Top Header */}
        <header className="hidden md:flex items-center justify-between h-20 bg-white border-b border-slate-200 px-8 sticky top-0 z-20 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {getPageTitle()}
            </h2>
            <p className="text-sm text-slate-500">
              Welcome back, {userEmail?.split("@")[0]}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden lg:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all w-64"
              />
            </div>

            {/* Notification Bell */}
            <button className="relative p-2.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Avatar */}
            <div className="w-10 h-10 rounded-xl e-500 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/20 cursor-pointer">
              <AdminProfile/>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
