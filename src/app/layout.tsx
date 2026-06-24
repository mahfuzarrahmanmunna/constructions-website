import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, DM_Serif_Display, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ToastProvider from "./components/ToastProvider";
import LayoutWrapper from "./provider/LayoutWrapper";

// ─── Font Configurations ───
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

// ─── Technical SEO & Metadata ───
export const metadata: Metadata = {
  metadataBase: new URL("https://constructions-beta.vercel.app"),

  // Title Configuration
  title: {
    default: "TitanMachinery | Premium Excavators & Heavy Equipment",
    template: "%s | TitanMachinery",
  },

  // Core SEO Description (Keep under 160 characters for best Google snippet display)
  description:
    "Leading global manufacturer of heavy machinery and construction equipment. Explore premium excavators, cranes, and concrete machinery. Engineering excellence for a sustainable future.",

  // Keywords (Optional but good for internal site search / legacy systems)
  keywords: [
    "heavy machinery",
    "construction equipment",
    "excavators",
    "mobile cranes",
    "concrete machinery",
    "CPL heavy industry",
    "TitanMachinery",
    "industrial equipment",
    "earthmoving machinery",
  ],

  // Authors & Creators
  authors: [{ name: "TitanMachinery" }],
  creator: "TitanMachinery",
  publisher: "TitanMachinery",

  // Favicon & App Icons (Pointing to your logo)
  icons: {
    icon: "/finallogo.png",
    shortcut: "/finallogo.png",
    apple: "/finallogo.png",
  },

  // Robots Directives (Tell search engine crawlers how to behave)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph (Crucial for Facebook, LinkedIn, WhatsApp link previews)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://constructions-beta.vercel.app",
    siteName: "TitanMachinery",
    title: "TitanMachinery | Premium Excavators & Heavy Equipment",
    description:
      "Leading global manufacturer of heavy machinery and construction equipment. Engineering excellence for a sustainable future.",
    images: [
      {
        url: "/finallogo.png", // Tip: Create a 1200x630px image named og-image.png for best results
        width: 150,
        height: 50,
        alt: "TitanMachinery Logo",
      },
    ],
  },

  // Twitter Card (Crucial for Twitter/X link previews)
  twitter: {
    card: "summary_large_image",
    title: "TitanMachinery | Premium Excavators & Heavy Equipment",
    description:
      "Leading global manufacturer of heavy machinery and construction equipment.",
    images: ["/finallogo.png"],
  },

  // Canonical URL (Prevents duplicate content issues)
  alternates: {
    canonical: "/",
  },
};

// Viewport configuration (Separated in Next.js 14+)
export const viewport: Viewport = {
  themeColor: "#002253", // Matches your navy color for mobile browser status bars
  width: "device-width",
  initialScale: 1,
};

// ─── Structured Data (JSON-LD) ───
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TitanMachinery",
  url: "https://constructions-beta.vercel.app",
  logo: "https://constructions-beta.vercel.app/finallogo.png",
  description:
    "Leading global manufacturer of heavy machinery and construction equipment.",
  sameAs: [
    "https://www.facebook.com/yourprofile",
    "https://www.linkedin.com/company/yourprofile",
    "https://www.youtube.com/yourprofile",
    "https://twitter.com/yourprofile",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+88 01922 588445",
    contactType: "customer service",
    areaServed: "BD",
    availableLanguage: ["English"],
  },
};

// ─── Root Layout Component ───
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
      <body className="min-h-full flex flex-col bg-white">
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
