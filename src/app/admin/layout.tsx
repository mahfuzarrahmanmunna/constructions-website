"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import Sidebar from "@/components/admin/Sidebar";

const ADMIN_EMAIL = "azizurseu@gmail.com";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user || user.email !== ADMIN_EMAIL) {
          await signOut(auth);
          router.replace("/login");
          return;
        }

        setLoading(false);
      }
    );

    return unsubscribe;
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
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
          onClick={() => setIsOpen(true)}
          className="
            p-2
            bg-blue-500
            text-white
            rounded
          "
        >
          <Menu size={24} />
        </button>

        <h1 className="font-bold text-lg text-blue-700">
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