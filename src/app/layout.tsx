import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Display, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ToastProvider from "./components/ToastProvider";
import LayoutWrapper from "./provider/LayoutWrapper";
// REMOVE direct imports of Navbar and Footer here

// ... (Keep all your font configurations the same) ...
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// ... (Keep all your metadata the same) ...
export const metadata: Metadata = {
  // ... (Your existing metadata) ...
  metadataBase: new URL("https://www.your-website-domain.com"),
  title: {
    default: "TitanMachinery | Premium Excavators & Heavy Equipment",
    template: "%s | TitanMachinery",
  },
  // ... rest of metadata
};

// ... (Keep jsonLd the same) ...
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  // ...
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dmSerifDisplay.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Use the wrapper here instead of individual Nav/Footer tags */}
        <LayoutWrapper>{children}</LayoutWrapper>

        <ToastProvider />
      </body>
    </html>
  );
}
