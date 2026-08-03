import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jasabuangpuingbintaro.com/"),
  title: "Jasa Buang Puing Bintaro, Tangerang & Jakarta Murah | Ammar Endung",
  description: "Jasa Buang Puing Ammar Endung melayani pembuangan puing proyek bangunan, angkut barang pindahan, bongkar bangunan, dan tanah urugan murah & bersih 24 jam di Jakarta, Bintaro, Tangerang, dan sekitarnya.",
  keywords: [
    "Jasa buang puing Bintaro",
    "Jasa buang puing Jakarta",
    "Jasa buang puing Tangerang",
    "Jasa buang puing murah",
    "Jasa angkut barang jakarta",
    "Jasa angkut barang bintaro",
    "Jasa buang sampah proyek",
    "Jasa angkut tanah merah",
    "Jasa urugan tanah",
    "Jasa bongkar bangunan",
    "Ammar Endung buang puing Bintaro"
  ],
  authors: [{ name: "Jasa Buang Puing Ammar Endung" }],
  alternates: {
    canonical: "https://www.jasabuangpuingbintaro.com/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Jasa Buang Puing Bintaro, Tangerang & Jakarta Murah - Ammar Endung",
    description: "Hubungi Jasa Buang Puing Ammar Endung untuk pembuangan puing sisa bangunan, angkut barang, angkut tanah merah urugan murah & cepat 24 jam di Jakarta, Bintaro & Tangerang.",
    url: "https://www.jasabuangpuingbintaro.com/",
    siteName: "Jasa Buang Puing Ammar Endung",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "Jasa Buang Puing Ammar Endung Bintaro Tangerang Jakarta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasa Buang Puing Bintaro, Tangerang & Jakarta Murah - Ammar Endung",
    description: "Hubungi Jasa Buang Puing Ammar Endung untuk pembuangan puing sisa bangunan, angkut barang, angkut tanah merah urugan murah & cepat 24 jam di Jakarta, Bintaro & Tangerang.",
    images: ["/hero.webp"],
  },
  verification: {
    google: "isi-dengan-kode-verifikasi-google-anda",
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
    "url": "https://www.jasabuangpuingbintaro.com/",
    "logo": "https://www.jasabuangpuingbintaro.com/logo.svg",
    "image": "https://www.jasabuangpuingbintaro.com/hero.webp",
    "description": "Jasa Pembuangan Puing Proyek, Angkut Barang Pindahan, Bongkar Bangunan, dan Jasa Angkut Tanah Urugan Murah dan Cepat 24 Jam di Jakarta, Bintaro, Tangerang, dan sekitarnya.",
    "telephone": "+6288985185962",
    "email": "jasabuangpuingammarendung@gmail.com",
    "priceRange": "Rp",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Masjid Al Muflihun, RT.4/RW.10, Bintaro, Pesanggrahan",
      "addressLocality": "Jakarta Selatan",
      "addressRegion": "DKI Jakarta",
      "addressCountry": "ID",
      "postalCode": "12330"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.2553564,
      "longitude": 106.767471
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
      { "@type": "AdministrativeArea", "name": "Tangerang" },
      { "@type": "AdministrativeArea", "name": "Tangerang Selatan" },
      { "@type": "AdministrativeArea", "name": "Depok" },
      { "@type": "AdministrativeArea", "name": "Bekasi" },
      { "@type": "AdministrativeArea", "name": "Bogor" }
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
