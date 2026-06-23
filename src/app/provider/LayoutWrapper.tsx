"use client";

import { usePathname } from "next/navigation";
import Footer from "../components/Footer/Footer";
import MobileBottomNav from "../components/MobileBottomNav/MobileBottomNav";
import Navbar1 from "../components/Navbar/Navbar1";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If it is /admin or /login, only render the children (no nav, footer, or bottom bar)
  const isHiddenLayoutRoute =
    pathname?.startsWith("/admin") || pathname === "/login";

  if (isHiddenLayoutRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar1 />
      {children}
      <Footer />
      <MobileBottomNav />
    </>
  );
}
