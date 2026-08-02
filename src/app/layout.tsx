import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jasa Buang Puing Bintaro & Jakarta Murah | Jasa Buang Puing Ammar Endung",
  description: "Jasa Buang Puing Ammar Endung melayani pembuangan puing proyek bangunan, jasa angkut barang pindahan, dan angkut tanah urugan murah, cepat, dan bersih 24 jam di Jakarta, Bintaro, dan sekitarnya.",
  keywords: [
    "Jasa buang puing Bintaro",
    "Jasa buang puing Jakarta",
    "jasa buang puing murah",
    "jasa angkut barang jakarta",
    "jasa angkut barang bintaro",
    "jasa buang sampah proyek",
    "jasa angkut tanah merah",
    "jasa urugan tanah",
    "jasa bongkar bangunan",
    "Ammar Endung buang puing"
  ],
  authors: [{ name: "Jasa Buang Puing Ammar Endung" }],
  robots: "index, follow",
  openGraph: {
    title: "Jasa Buang Puing Bintaro & Jakarta Murah - Ammar Endung",
    description: "Hubungi Jasa Buang Puing Ammar Endung untuk pembuangan puing sisa bangunan, angkut barang, angkut tanah merah urugan murah & cepat 24 jam di area Jakarta & Bintaro.",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // LocalBusiness Structured Data JSON-LD for local SEO boost
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Jasa Buang Puing Ammar Endung",
    "description": "Jasa Pembuangan Puing Proyek, Angkut Barang Pindahan, dan Jasa Angkut Tanah Urugan Murah dan Cepat 24 Jam di Jakarta dan Bintaro.",
    "telephone": "+6288985185962",
    "priceRange": "Rp",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Masjid Al Muflihun, RT.4/RW.10, Bintaro, Pesanggrahan",
      "addressLocality": "Jakarta Selatan",
      "addressRegion": "DKI Jakarta",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.2625,
      "longitude": 106.7594
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Bintaro" },
      { "@type": "AdministrativeArea", "name": "Jakarta" },
      { "@type": "AdministrativeArea", "name": "Tangerang Selatan" },
      { "@type": "AdministrativeArea", "name": "Depok" }
    ]
  };

  return (
    <html lang="id" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-neutral-800 bg-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
