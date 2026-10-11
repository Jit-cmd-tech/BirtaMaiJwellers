import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { getSettings } from "@/lib/db";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://birtamaijewellers.com"),
  title: "Birta Mai Jewellers | Luxury Gold, Diamond & Silver Jewelry in Birgunj, Nepal",
  description:
    "Birta Mai Jewellers offers heirloom 24K and 22K gold jewelry, certified bridal sets, diamond rings, and handcrafted silver artifacts located at Birta Mai Mandir, Birgunj, Nepal.",
  keywords: [
    "Birta Mai Jewellers",
    "Birgunj Jewelry Store",
    "Gold jewelry Birgunj",
    "Birta Mai Mandir Birgunj",
    "Bridal jewelry Nepal",
    "24K Gold necklace Nepal",
    "Gold rate Birgunj",
    "Silver artifacts Birgunj",
    "Diamond rings Nepal",
  ],
  authors: [{ name: "Birta Mai Jewellers" }],
  openGraph: {
    title: "Birta Mai Jewellers | Luxury Jewelry in Birgunj, Nepal",
    description:
      "Handcrafted 24K and 22K gold, certified diamonds, and sterling silver heirlooms in Birta Mai Mandir, Birgunj. WhatsApp Concierge +977 9845033095.",
    url: "https://birtamaijewellers.com",
    siteName: "Birta Mai Jewellers",
    images: [
      {
        url: "/images/hero_bridal.jpg",
        width: 1200,
        height: 630,
        alt: "Birta Mai Jewellers Royal Bridal Gold Collection",
      },
    ],
    locale: "en_NP",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings;
  try {
    settings = await getSettings();
  } catch {
    settings = {
      announcementText: "Festive & Bridal Showcase • Visit our Atelier at Birta Mandir, Birgunj or Enquire via WhatsApp",
      announcementActive: true,
    };
  }

  // LocalBusiness structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    "name": "Birta Mai Jewellers",
    "image": "https://birtamaijewellers.com/images/hero_bridal.jpg",
    "telephone": "+9779845033095",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Birta Mai Mandir",
      "addressLocality": "Birgunj",
      "addressRegion": "Madhesh Province",
      "addressCountry": "NP",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "27.0134",
      "longitude": "84.8772",
    },
    "url": "https://birtamaijewellers.com",
    "priceRange": "NPR",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "19:30",
      },
    ],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF7F0] text-[#171717] antialiased selection:bg-[#D4AF37] selection:text-[#111111]">
        <AnnouncementBar
          announcementText={settings.announcementText}
          active={settings.announcementActive}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
