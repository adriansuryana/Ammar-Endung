import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18368160825";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jasabuangpuingbintaro.com/"),
  title: "Jasa Buang Puing Bintaro, Tangerang & Jakarta - Ammar Endung | Rp 300rb/Rit 24 Jam",
  description: "Jasa Buang Puing Bintaro, Tangerang Selatan & Jakarta murah Rp 300.000/rit All-In terima bersih. Spesialis buang puing renovasi bangunan, sisa tanah urug & sisa bongkaran 24 jam tanpa DP. Truk Colt Diesel siap meluncur!",
  keywords: [
    "jasa buang puing",
    "jasa buang puing bintaro",
    "jasa buang puing tangerang",
    "jasa buang puing tangerang selatan",
    "jasa buang puing jakarta",
    "jasa buang puing jakarta selatan",
    "jasa buang puing terdekat",
    "jasa buang puing murah",
    "buang puing bintaro",
    "buang puing tangerang",
    "buang puing jakarta",
    "buang puing terdekat",
    "jasa buang puing bangunan",
    "jasa angkut puing renovasi",
    "jasa buang tanah urug",
    "jasa angkut puing bintaro",
    "ongkos buang puing per rit",
    "truk buang puing colt diesel",
    "ammar endung buang puing"
  ],
  authors: [{ name: "Ammar Endung - Jasa Buang Puing Bintaro, Tangerang & Jakarta" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
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
    title: "Jasa Buang Puing Bintaro, Tangerang & Jakarta - Ammar Endung",
    description: "Layanan jasa buang puing terpercaya Rp 300.000/rit all-in terima bersih 24 jam di Bintaro, Tangerang Selatan & Jakarta. Tanpa DP, armada Truk Colt Diesel siap meluncur!",
    url: "https://www.jasabuangpuingbintaro.com/",
    siteName: "Ammar Endung - Jasa Buang Puing",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "Jasa Buang Puing Bintaro Tangerang Jakarta - Ammar Endung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasa Buang Puing Bintaro, Tangerang & Jakarta - Ammar Endung",
    description: "Tarif flat Rp 300.000/rit all-in terima bersih di Bintaro, Tangerang & Jakarta. Hubungi Ammar Endung 24 jam nonstop!",
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
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "name": "Jasa Buang Puing Bintaro, Tangerang & Jakarta - Ammar Endung",
    "alternateName": "Ammar Endung Buang Puing",
    "url": "https://www.jasabuangpuingbintaro.com/",
    "hasMap": "https://share.google/FEfspn46RoCJHJGy8",
    "sameAs": ["https://share.google/FEfspn46RoCJHJGy8"],
    "logo": "https://www.jasabuangpuingbintaro.com/logo.svg",
    "image": "https://www.jasabuangpuingbintaro.com/hero.webp",
    "description": "Jasa Pembuangan Puing Proyek Renovasi Bangunan, Angkut Tanah Urugan, Sisa Bongkaran Dinding & Cor Beton, Tarif Flat Rp 300.000/rit All-In 24 Jam di Bintaro, Tangerang Selatan, dan Jakarta.",
    "telephone": "+6288985185962",
    "email": "info@jasabuangpuingbintaro.com",
    "priceRange": "Rp 300.000",
    "currenciesAccepted": "IDR",
    "paymentAccepted": "Cash, Bank Transfer",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "18",
      "bestRating": "5",
      "worstRating": "1"
    },
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
      { "@type": "AdministrativeArea", "name": "Bintaro Sektor 1 - 9" },
      { "@type": "AdministrativeArea", "name": "Pesanggrahan" },
      { "@type": "AdministrativeArea", "name": "Jakarta" },
      { "@type": "AdministrativeArea", "name": "Jakarta Selatan" },
      { "@type": "AdministrativeArea", "name": "Tangerang" },
      { "@type": "AdministrativeArea", "name": "Tangerang Selatan" },
      { "@type": "AdministrativeArea", "name": "BSD City Serpong" },
      { "@type": "AdministrativeArea", "name": "Ciputat" },
      { "@type": "AdministrativeArea", "name": "Pamulang" },
      { "@type": "AdministrativeArea", "name": "Ciledug" },
      { "@type": "AdministrativeArea", "name": "Kebayoran Lama" },
      { "@type": "AdministrativeArea", "name": "Kebayoran Baru" },
      { "@type": "AdministrativeArea", "name": "Depok" },
      { "@type": "AdministrativeArea", "name": "Jabodetabek" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Layanan Jasa Buang Puing & Angkut Material",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Jasa Buang Puing Renovasi Bangunan",
            "description": "Pembuangan sisa puing bata, beton, semen, keramik pecahan renovasi rumah dan gedung."
          },
          "price": "300000",
          "priceCurrency": "IDR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Jasa Angkut Sisa Tanah Urugan",
            "description": "Pengangkutan sisa galian tanah merah, tanah urug, dan perataan lahan proyek."
          },
          "price": "300000",
          "priceCurrency": "IDR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Jasa Buang Sisa Bongkaran Bangunan",
            "description": "Pembersihan material sisa bongkaran dinding, atap genteng, kayu kusen, dan cor dak."
          },
          "price": "300000",
          "priceCurrency": "IDR"
        }
      ]
    }
  };

  // FAQ Structured Data JSON-LD for Rich Snippets on Google Search
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Berapa tarif jasa buang puing di Bintaro, Tangerang, dan Jakarta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tarif jasa buang puing Ammar Endung adalah flat all-in Rp 300.000 per rit menggunakan armada Truk Colt Diesel. Biaya sudah termasuk armada, bahan bakar, sopir, tenaga muat (kuli angkut), biaya pembuangan ke lokasi resmi, serta penyapuan lokasi hingga bersih tuntas tanpa biaya tersembunyi."
        }
      },
      {
        "@type": "Question",
        "name": "Bagaimana cara menentukan harga pembuangan puing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sistem kami sangat mudah dan transparan. Anda cukup kirimkan foto atau video tumpukan puing/material ke WhatsApp kami. Kami langsung berikan estimasi pasti di muka tanpa biaya tersembunyi. Untuk proyek besar, kami siap survei gratis ke lokasi Anda."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah harga sudah termasuk kuli angkut dan biaya pembuangan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya, 100% All-In! Harga yang kami sepakati sudah mencakup armada truk, bensin, sopir, tenaga kuli angkut yang menaikkan puing ke bak, penyapuan lokasi setelah tuntas, hingga biaya pembuangan ke lokasi lahan urugan resmi."
        }
      },
      {
        "@type": "Question",
        "name": "Kapan pembayaran dilakukan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kami menerapkan prinsip 'Beres, Baru Bayar'. Anda tidak perlu membayar uang muka (DP) untuk pekerjaan reguler. Pembayaran dilakukan secara tunai atau transfer setelah puing selesai dimuat dan lokasi rapi bersih."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah melayani pekerjaan di malam hari atau hari libur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tentu saja! Kami beroperasi 24 jam sehari, 7 hari seminggu. Kami sering menangani pembuangan puing proyek toko mall, ruko jalan protokol, dan kantor yang wajib dikerjakan pada malam atau dini hari agar tidak mengganggu operasional."
        }
      },
      {
        "@type": "Question",
        "name": "Ke mana puing bangunan ini dibuang?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Puing dan material bangunan disalurkan langsung ke lokasi lahan pembuangan dan pemadatan urugan tanah resmi yang aman di wilayah Jabodetabek. Bebas dari risiko buang liar di pinggir jalan, aman bagi lingkungan, dan lokasi kerja Anda kami sapu bersih tuntas."
        }
      },
      {
        "@type": "Question",
        "name": "Armada apa yang digunakan untuk pengangkutan puing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kami mengoperasikan 100% armada Truk Colt Diesel (Mitsubishi Canter) berkapasitas optimal. Truk ini sangat ideal dan lincah bermanuver di jalan lingkungan perumahan warga maupun jalan utama perkotaan di Bintaro, Tangerang, dan Jakarta."
        }
      }
    ]
  };

  return (
    <html lang="id" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        />
        <Script
          id="google-ads-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ADS_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* LocalBusiness Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {/* FAQ Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-neutral-800 bg-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
