"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminProfile() {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          h-11
          w-11
          rounded-full
          bg-[#002253]
          hover:bg-[#E55503]
          text-white
          flex
          items-center
          justify-center
          font-semibold
          shadow-md
          hover:scale-105
          transition
        "
      >
        {user?.displayName?.charAt(0) || "A"}
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-2
            w-48
            bg-white
            rounded-lg
            shadow-lg
            border
            z-50
          "
        >
          <div className="p-3 border-b">
            <p className="text-sm font-medium text-black">
              {user?.displayName || "Admin"}
            </p>

            <p className="text-xs text-gray-500">
              {user?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="
              w-full
              text-left
              px-4
              py-3
              text-red-600
              hover:bg-red-50
            "
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}