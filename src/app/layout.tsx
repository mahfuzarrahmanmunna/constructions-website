import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Display, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // Imported to inject JSON-LD
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

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

export const metadata: Metadata = {
  // Set your production domain here to help with relative URLs
  metadataBase: new URL("https://www.your-website-domain.com"),

  title: {
    default: "TitanMachinery | Premium Excavators & Heavy Equipment",
    template: "%s | TitanMachinery", // Appends brand name to page titles
  },
  description:
    "Discover high-performance 22-35T Medium Excavators and construction machinery. Superior productivity, lower fuel consumption, and durable designs for mining and construction sites.",
  keywords: [
    "Excavator",
    "Heavy Machinery",
    "Construction Equipment",
    "22-35T Excavator",
    "Mining Equipment",
    "Premium Productivity",
    "Titan Machinery",
  ],
  authors: [{ name: "Titan Machinery Team" }],
  creator: "Titan Machinery",
  publisher: "Titan Machinery",

  // Robots (Crawling instructions)
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

  // Open Graph (Facebook, LinkedIn sharing)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.your-website-domain.com",
    title: "TitanMachinery | Premium Excavators & Heavy Equipment",
    description:
      "Explore our range of 22-35T Medium Excavators. Engineered for power and efficiency.",
    siteName: "TitanMachinery",
    images: [
      {
        url: "/opengraph-image.jpg", // Ensure you add this image to your 'public' folder
        width: 1200,
        height: 630,
        alt: "Titan Machinery Excavator",
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "TitanMachinery | Premium Excavators & Heavy Equipment",
    description:
      "Discover high-performance excavators and construction machinery.",
    images: ["/opengraph-image.jpg"], // Ensure this image exists in 'public'
    creator: "@titanmachinery", // Replace with your actual Twitter handle
  },

  // Icons and Manifest
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

// --- 2. JSON-LD STRUCTURED DATA (Schema.org) ---
// This helps Google understand your business better (Rich Snippets)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TitanMachinery",
  url: "https://www.your-website-domain.com",
  logo: "https://www.your-website-domain.com/logo.png",
  description:
    "Leading supplier of premium excavators and heavy construction machinery.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-555-123-4567", // Replace with your real phone number
    contactType: "Customer Service",
    areaServed: "US",
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.facebook.com/titanmachinery", // Replace with real links
    "https://www.linkedin.com/company/titanmachinery",
  ],
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
        {/* Injecting Structured Data for Search Engines */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
