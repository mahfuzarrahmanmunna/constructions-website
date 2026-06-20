"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import MobileBottomNav from "../components/MobileBottomNav/MobileBottomNav";
import Navbar1 from "../components/Navbar/Navbar1";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if the current path starts with /admin
  const isAdminRoute = pathname?.startsWith("/admin");

  // If it is /admin, only render the children. Otherwise, render Nav + Content + Footer.
  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar1 />
      {children}
      <Footer />
      <MobileBottomNav/>
    </>
  );
}
