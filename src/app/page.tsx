"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { trackWhatsAppClick, trackCallClick } from "@/lib/gtag";

// ─── CONFIGURATION ───────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "6288985185962";
const BUSINESS_NAME = "Ammar Endung";
const FULL_BUSINESS_NAME = "Jasa Buang Puing Bintaro dan Sekitarnya - Ammar Endung";
const PHONE_DISPLAY = "0889-8518-5962";
const GOOGLE_MAPS_LINK = "https://share.google/FEfspn46RoCJHJGy8";

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────
const openWA = (message: string, source: string = "whatsapp_click") => {
  trackWhatsAppClick(source, message);
  const text = `Halo ${BUSINESS_NAME}, ${message}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
};

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const icons = {
  google: (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
    </svg>
  ),
  calculator: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="16" y1="14" x2="16" y2="18" />
      <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
    </svg>
  ),
  mapPin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="4" y="2" width="16" height="20" rx="2" /><line x1="9" y1="22" x2="9" y2="22.01" /><line x1="15" y1="22" x2="15" y2="22.01" />
      <line x1="9" y1="6" x2="9" y2="6.01" /><line x1="15" y1="6" x2="15" y2="6.01" /><line x1="9" y1="10" x2="9" y2="10.01" />
      <line x1="15" y1="10" x2="15" y2="10.01" /><line x1="9" y1="14" x2="9" y2="14.01" /><line x1="15" y1="14" x2="15" y2="14.01" />
      <line x1="9" y1="18" x2="9" y2="18.01" /><line x1="15" y1="18" x2="15" y2="18.01" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  chevronUp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  ),
  chevronDown: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  arrowRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M11 20A7 7 0 014 13V6l7-3 7 3v7a7 7 0 01-7 7z" /><path d="M11 20v-9" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  ),
  pointer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="M13 13l6 6" />
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  smile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  megaphone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  speedClock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
      <path d="M3 9h2M2 13h3M3 17h2" />
    </svg>
  ),
};

// ─── SERVICES CATEGORIES (FOKUS: APA SAJA DIANGKUT KECUALI SAMPAH BASAH) ──────
const categories = [
  {
    id: "puing-bata-beton",
    title: "Puing Beton, Bata & Keramik",
    subtitle: "Puing Keras Sisa Renovasi Bangunan",
    image: "/kerja2.webp",
    tag: "Tarif Promo Flat",
    items: [
      "Pecahan tembok bata merah & hebel",
      "Bongkaran coran semen & dak beton",
      "Pecahan lantai keramik & granit",
      "Genteng, asbes & sisa plesteran semen",
    ],
    price: "Cuma Rp 300rb / Rit",
    isPromo: true,
  },
  {
    id: "kayu-plafon-gypsum",
    title: "Kayu, Plafon & Rangka Material",
    subtitle: "Limbah Kayu & Rangka Proyek",
    image: "/kerja1.webp",
    tag: "Terima Beres",
    items: [
      "Kayu bekas bekisting cor & kaso proyek",
      "Triplek, sisa kusen & daun pintu lapuk",
      "Reruntuhan plafon gypsum & rangka hollow",
      "Potongan seng, asbes & baja ringan",
    ],
    price: "Ritase / Borongan",
    isPromo: false,
  },
  {
    id: "tanah-urug-galian",
    title: "Tanah Galian & Tanah Urug",
    subtitle: "Sisa Galian Pondasi & Urugan",
    image: "/kerja3.webp",
    tag: "Armada Dump",
    items: [
      "Pembuangan sisa galian pondasi & parit",
      "Tanah galian septic tank & sumur resapan",
      "Pengadaan tanah merah padat & urugan",
      "Tanah campur bebatuan & puing jalan",
    ],
    price: "Ritase / Borongan",
    isPromo: false,
  },
  {
    id: "bongkar-bobok-sekat",
    title: "Bongkar Sekat & Rongsok Proyek",
    subtitle: "Tenaga Bobok + Angkut Bersih",
    image: "/kerja5.webp",
    tag: "Bobok + Angkut",
    items: [
      "Jasa tukang bobok sekat dinding bata",
      "Bongkar partisi, dak meja cor & atap",
      "Kloset lama, wastafel & pipa bekas",
      "Besi tua sisa proyek & perabot rusak",
    ],
    price: "Estimasi & Nego",
    isPromo: false,
  },
];

// ─── TRUCK CAPACITIES (CALCULATOR MODEL) ──────────────────────────────────────
const truckLoads = [
  {
    key: "quarter",
    title: "1/4 Bak Truk Colt Diesel",
    subtitle: "Muatan Ringan / Beberapa Karung",
    capacity: "10 - 25 Karung Puing",
    volume: "± 1.2 - 1.8 m³",
    percent: 25,
    truckType: "Truk Colt Diesel Standby",
    estimatePrice: "Rp 250rb - 350rb",
    idealFor: "Sisa renovasi kecil, ganti keramik toilet, atau 1-2 perabot lama.",
  },
  {
    key: "half",
    title: "1/2 Bak Truk Colt Diesel",
    subtitle: "Muatan Sedang / 1 Ruangan",
    capacity: "30 - 55 Karung Puing",
    volume: "± 2.5 - 3.5 m³",
    percent: 50,
    truckType: "Truk Colt Diesel Engkel",
    estimatePrice: "Rp 300rb - 450rb",
    idealFor: "Renovasi 1 kamar tidur/dapur, bongkar 1 dinding sekat, sisa material.",
  },
  {
    key: "threequarter",
    title: "3/4 Bak Truk Colt Diesel",
    subtitle: "Muatan Padat / Renovasi Rumah",
    capacity: "60 - 85 Karung Puing",
    volume: "± 4.0 - 5.0 m³",
    percent: 75,
    truckType: "Truk Colt Diesel Kapasitas Tinggi",
    estimatePrice: "Rp 500rb - 650rb",
    idealFor: "Bongkaran dinding ganda, perombakan atap & dak semen, urugan sedang.",
  },
  {
    key: "full",
    title: "Full 1 Bak Truk Colt Diesel",
    subtitle: "Kapasitas Penuh / Curah Penuh",
    capacity: "90 - 120+ Karung / Curah",
    volume: "± 6.0 - 7.5 m³",
    percent: 100,
    truckType: "Truk Colt Diesel (Canter Dump)",
    estimatePrice: "Harga Promo / Borongan",
    idealFor: "Proyek renovasi rumah total, bongkar sekat ruko, galian tanah pondasi.",
  },
];

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Bagaimana cara menentukan harga pembuangan puing?",
    a: "Sistem kami sangat mudah dan transparan ala 1-800-GOT-JUNK. Anda cukup kirimkan foto atau video tumpukan puing/barang ke WhatsApp kami. Kami langsung berikan estimasi harga pasti di muka tanpa biaya tersembunyi. Untuk proyek besar, kami siap survei gratis ke lokasi Anda.",
  },
  {
    q: "Apakah harga sudah termasuk kuli angkut dan biaya pembuangan?",
    a: "Ya, 100% All-In! Harga yang kami sepakati sudah mencakup armada truk, bensin, sopir, tenaga kuli angkut yang menaikkan puing ke bak, penyapuan lokasi setelah tuntas, hingga biaya pembuangan ke lokasi lahan urugan.",
  },
  {
    q: "Kapan pembayaran dilakukan?",
    a: "Kami menerapkan prinsip 'Beres, Baru Bayar'. Anda tidak perlu membayar uang muka (DP) untuk pekerjaan reguler. Pembayaran dilakukan secara tunai atau transfer setelah puing selesai dimuat dan lokasi rapi bersih.",
  },
  {
    q: "Apakah melayani pekerjaan di malam hari atau hari libur?",
    a: "Tentu saja! Kami beroperasi 24 jam sehari, 7 hari seminggu. Kami sering menangani pembuangan puing proyek toko mall, ruko jalan protokol, dan kantor yang wajib dikerjakan pada malam atau dini hari agar tidak mengganggu operasional.",
  },
  {
    q: "Ke mana puing bangunan ini dibuang?",
    a: "Puing dan material bangunan disalurkan langsung ke lokasi lahan pembuangan dan pemadatan urugan tanah yang aman di wilayah Jabodetabek. Bebas dari risiko buang liar di pinggir jalan, aman bagi lingkungan, dan lokasi kerja Anda kami sapu bersih tuntas.",
  },
  {
    q: "Armada jenis apa yang digunakan untuk mengangkut puing?",
    a: "Seluruh armada operasional kami menggunakan Truk Colt Diesel (Mitsubishi Canter). Ukuran armada ini sangat ideal dan lincah untuk masuk ke area perumahan, komplek pemukiman padat Jabodetabek, dan jalan lingkungan tanpa terkendala izin atau jalan sempit.",
  },
];

// ─── REVIEWS DATA (REAL DARI GOOGLE MAPS AMMAR ENDUNG) ─────────────────────────
const reviews = [
  {
    name: "Rafka jayamandiri",
    role: "Pelanggan Terverifikasi",
    loc: "Pesanggrahan, Jakarta",
    stars: 5,
    text: "Mantap pak, kerjanya sitset terimakasih, sangat membantu 👍",
    date: "Ulasan Google Maps",
  },
  {
    name: "Rizky Shandi",
    role: "Pelanggan Terverifikasi",
    loc: "Jakarta Selatan",
    stars: 5,
    text: "Profesional tukang y ..kerja y juga rapih",
    date: "Ulasan Google Maps",
  },
  {
    name: "Adrian Suryana",
    role: "Pelanggan Terverifikasi",
    loc: "Bintaro, Jakarta",
    stars: 5,
    text: "Terimakasih banyak Pak Ammar, pengerjaan cepat dan lokasi langsung disapu bersih tuntas. Sangat direkomendasikan untuk buang puing di area Bintaro.",
    date: "Ulasan Google Maps",
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedLoad, setSelectedLoad] = useState<string>("half");
  const [locationInput, setLocationInput] = useState("");
  const [selectedService, setSelectedService] = useState("Puing Renovasi Bangunan");
  const [availabilityResult, setAvailabilityResult] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"terms" | "privacy" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState<number>(0);

  // Rotating Material Words in Title (Symmetrical 10-13 chars each, zero "sampah")
  const rotatingMaterials = [
    "Puing Proyek",
    "Tanah Urug",
    "Bongkaran",
    "Keramik Pecah",
    "Limbah Cor",
    "Sisa Renovasi",
  ];
  const [materialIndex, setMaterialIndex] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    nama: "",
    lokasi: "",
    layanan: "Buang Puing Renovasi",
    perkiraanVolume: "1 Truk Colt Diesel",
    catatan: "",
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero Image Carousel Interval (Smooth alternating between hero.webp & hero2.webp)
  useEffect(() => {
    const heroTimer = setInterval(() => {
      setHeroSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(heroTimer);
  }, []);

  // Material Word Rotating Interval (Scroll up setiap 2.4 detik)
  useEffect(() => {
    const materialTimer = setInterval(() => {
      setMaterialIndex((prev) => (prev + 1) % rotatingMaterials.length);
    }, 2400);
    return () => clearInterval(materialTimer);
  }, [rotatingMaterials.length]);

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    const loc = locationInput.trim() || "Area Jabodetabek";
    setAvailabilityResult(`Armada Siap Meluncur ke ${loc}!`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo ${BUSINESS_NAME}, saya ingin memesan layanan pembuangan puing / angkut:\n\n*Nama:* ${formData.nama}\n*Lokasi Proyek:* ${formData.lokasi}\n*Layanan:* ${formData.layanan}\n*Perkiraan Volume:* ${formData.perkiraanVolume}\n*Catatan:* ${formData.catatan || "-"}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const currentLoadObj = truckLoads.find((l) => l.key === selectedLoad) || truckLoads[1];

  return (
    <div id="beranda" className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-[#02599c] selection:text-white">
      {/* ── MAIN FIXED STICKY NAVBAR ── */}
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? "bg-white/95 backdrop-blur-xl shadow-[0_4px_25px_-5px_rgba(35,31,32,0.08)] py-2.5 sm:py-3.5 border-b border-slate-200/90 text-slate-900"
            : "bg-black/30 backdrop-blur-md py-3.5 sm:py-4 border-b border-white/15 text-white"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-12 flex items-center justify-between">

          {/* Logo & Tagline */}
          <a href="#beranda" className="flex items-center gap-3.5 sm:gap-4 group flex-shrink-0">
            <Image
              src="/logo.svg"
              alt={`${BUSINESS_NAME} - Jasa Buang Puing`}
              width={180}
              height={56}
              priority
              className={`h-10 sm:h-12 md:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-[1.02] ${
                !scrolled && !mobileMenuOpen ? "brightness-0 invert" : ""
              }`}
            />
            <div
              className={`hidden sm:inline-flex flex-col border-l-2 pl-3.5 sm:pl-4 justify-center transition-colors duration-300 ${
                scrolled || mobileMenuOpen ? "border-slate-200/90" : "border-white/30"
              }`}
            >
              <span
                className={`text-lg sm:text-xl md:text-2xl font-black tracking-tight uppercase leading-none whitespace-nowrap transition-colors duration-300 ${
                  scrolled || mobileMenuOpen ? "text-[#02599c]" : "text-white"
                }`}
              >
                Ammar Endung
              </span>
              <span
                className={`text-[10px] sm:text-[11px] md:text-[11.8px] font-normal leading-none whitespace-nowrap mt-1 block tracking-[-0.01em] transition-colors duration-300 ${
                  scrolled || mobileMenuOpen ? "text-slate-500" : "text-slate-200"
                }`}
              >
                Jasa Angkut dan Buang Puing
              </span>
            </div>
          </a>

          {/* Nav links (Desktop: visible on lg and above) */}
          <nav
            className={`hidden lg:flex items-center gap-1.5 xl:gap-2.5 text-sm lg:text-[15px] font-bold transition-colors duration-300 ${
              scrolled ? "text-slate-700" : "text-white/90"
            }`}
          >
            <a
              href="#layanan"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                scrolled ? "hover:text-[#02599c] hover:bg-slate-100/80" : "hover:text-[#06D001] hover:bg-white/10"
              }`}
            >
              Layanan
            </a>
            <a
              href="#kalkulator"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                scrolled ? "hover:text-[#02599c] hover:bg-slate-100/80" : "hover:text-[#06D001] hover:bg-white/10"
              }`}
            >
              Estimasi Biaya
            </a>
            <a
              href="#cara-kerja"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                scrolled ? "hover:text-[#02599c] hover:bg-slate-100/80" : "hover:text-[#06D001] hover:bg-white/10"
              }`}
            >
              Cara Kerja
            </a>
            <a
              href="#galeri"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                scrolled ? "hover:text-[#02599c] hover:bg-slate-100/80" : "hover:text-[#06D001] hover:bg-white/10"
              }`}
            >
              Bukti Kerja
            </a>
            <a
              href="#faq"
              className={`px-3.5 py-2 rounded-xl transition-all ${
                scrolled ? "hover:text-[#02599c] hover:bg-slate-100/80" : "hover:text-[#06D001] hover:bg-white/10"
              }`}
            >
              FAQ
            </a>
          </nav>

          {/* Desktop Navbar Quick Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              onClick={() => trackCallClick("navbar_phone_desktop")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                scrolled
                  ? "text-[#02599c] hover:bg-blue-50 border border-blue-200"
                  : "text-white hover:bg-white/10 border border-white/20"
              }`}
            >
              <div className="w-3.5 h-3.5 text-[#06D001]">{icons.phone}</div>
              <span>{PHONE_DISPLAY}</span>
            </a>
            <button
              type="button"
              onClick={() => openWA("Halo Ammar Endung, saya ingin tanya jasa buang puing dari website.", "navbar_wa_desktop")}
              className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-[#231f20] bg-[#06D001] hover:bg-[#05b201] shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
            >
              <div className="w-3.5 h-3.5">{icons.whatsapp}</div>
              <span>Chat WA</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger Toggle (Visible only on mobile/tablet) */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center active:scale-95 transition-all cursor-pointer ${
                scrolled || mobileMenuOpen
                  ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200"
                  : "bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-md"
              }`}
              aria-label={mobileMenuOpen ? "Tutup Menu" : "Buka Menu"}
            >
              <div className="w-6 h-6">{mobileMenuOpen ? icons.close : icons.menu}</div>
            </button>
          </div>

        </div>

        {/* ── MOBILE MENU ACCORDION / DRAWER ── */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-2xl border-t border-slate-200/90 px-4 sm:px-6 py-5 shadow-2xl animate-slide-up max-h-[calc(100vh-75px)] overflow-y-auto">
            {/* Navigation Card Items */}
            <div className="flex flex-col space-y-2 text-slate-800">
              {/* Item 1: Layanan */}
              <a
                href="#layanan"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-[#02599c] flex items-center justify-center p-2.5 shrink-0 group-hover:scale-105 transition-transform">
                    {icons.truck}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#02599c] transition-colors">
                      Layanan Buang Puing
                    </div>
                    <div className="text-xs text-slate-500">
                      Puing renovasi, tanah urug &amp; bongkaran
                    </div>
                  </div>
                </div>
                <div className="w-5 h-5 text-slate-400 group-hover:text-[#02599c] group-hover:translate-x-0.5 transition-all">
                  {icons.arrowRight}
                </div>
              </a>

              {/* Item 2: Estimasi Ritase */}
              <a
                href="#kalkulator"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl border border-emerald-100/80 bg-emerald-50/30 hover:bg-emerald-50/80 hover:border-emerald-300 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-[#06D001] flex items-center justify-center p-2.5 shrink-0 group-hover:scale-105 transition-transform">
                    {icons.calculator}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#02599c] transition-colors">
                        Estimasi Biaya Ritase
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Simulasi muatan Truk Colt Diesel
                    </div>
                  </div>
                </div>
                <span className="text-[11px] bg-[#06D001] text-[#231f20] px-2.5 py-1 rounded-full font-black tracking-tight shadow-sm shrink-0">
                  Cuma 300rb
                </span>
              </a>

              {/* Item 3: Cara Kerja */}
              <a
                href="#cara-kerja"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-[#02599c] flex items-center justify-center p-2.5 shrink-0 group-hover:scale-105 transition-transform">
                    {icons.shield}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#02599c] transition-colors">
                      Cara Kerja (Tanpa DP)
                    </div>
                    <div className="text-xs text-slate-500">
                      Armada meluncur, beres baru bayar
                    </div>
                  </div>
                </div>
                <div className="w-5 h-5 text-slate-400 group-hover:text-[#02599c] group-hover:translate-x-0.5 transition-all">
                  {icons.arrowRight}
                </div>
              </a>

              {/* Item 4: Galeri & Review */}
              <a
                href="#galeri"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-amber-50/50 hover:border-amber-200 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-amber-500 flex items-center justify-center p-2.5 shrink-0 group-hover:scale-105 transition-transform">
                    {icons.star}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#02599c] transition-colors">
                      Bukti Lapangan &amp; Review
                    </div>
                    <div className="text-xs text-slate-500">
                      Foto dokumentasi asli &amp; ulasan Google
                    </div>
                  </div>
                </div>
                <span className="text-[11px] bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold shrink-0">
                  5.0 ★
                </span>
              </a>

              {/* Item 5: FAQ & Jangkauan */}
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-[#02599c] flex items-center justify-center p-2.5 shrink-0 group-hover:scale-105 transition-transform">
                    {icons.mapPin}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#02599c] transition-colors">
                      Area Jangkauan &amp; FAQ
                    </div>
                    <div className="text-xs text-slate-500">
                      Bintaro, Jaksel, Tangsel, &amp; Jabodetabek
                    </div>
                  </div>
                </div>
                <div className="w-5 h-5 text-slate-400 group-hover:text-[#02599c] group-hover:translate-x-0.5 transition-all">
                  {icons.arrowRight}
                </div>
              </a>
            </div>

            {/* Quick Contact & Pool details in Drawer */}
            <div className="mt-4 pt-4 border-t border-slate-200/90 flex flex-col gap-2.5">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 py-1.5 px-3 rounded-lg border border-emerald-200/70">
                <span className="w-2 h-2 rounded-full bg-[#06D001] animate-pulse" />
                <span>Standby Buka 24 Jam Nonstop</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  openWA("Halo Ammar Endung, saya butuh jasa buang puing dari menu website.", "mobile_drawer_wa");
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 rounded-xl bg-[#06D001] hover:bg-[#05b201] text-[#231f20] font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md shadow-[#06D001]/20 cursor-pointer active:scale-95 transition-all"
              >
                <div className="w-5 h-5">{icons.whatsapp}</div>
                <span>Chat WhatsApp Admin</span>
              </button>

              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                onClick={() => {
                  trackCallClick("mobile_drawer_call");
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl border border-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <div className="w-4 h-4 text-[#02599c]">{icons.phone}</div>
                <span>Telepon: {PHONE_DISPLAY}</span>
              </a>

              <div className="pt-1 text-center">
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 font-bold hover:text-[#02599c] transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="w-3.5 h-3.5 text-[#02599c]">{icons.mapPin}</span>
                  <span>Pool: Jl. Masjid Al Muflihun, Bintaro ↗</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO SECTION: FULL-WIDTH CLEAN HERO WITH hero.webp ── */}
      <section className="relative w-full overflow-hidden min-h-[90vh] lg:min-h-screen flex flex-col justify-center pt-24 sm:pt-32 md:pt-36 pb-24 sm:pb-20 border-b border-slate-800">
        {/* Full-width Background Carousel (Crossfade tanpa efek zoom) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Slide 0: hero.webp */}
          <div
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              heroSlide === 0 ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
            }`}
          >
            <Image
              src="/hero.webp"
              alt="Jasa Buang Puing dan Angkut Sampah Bangunan Ammar Endung Bintaro Jabodetabek"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Slide 1: hero2.webp */}
          <div
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              heroSlide === 1 ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
            }`}
          >
            <Image
              src="/hero2.webp"
              alt="Armada Truk Buang Puing Ammar Endung Bintaro"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Multi-layer contrast overlay: Dark gradient on left for crystal-clear readability, transitioning to reveal the photo */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#171415]/95 via-[#231f20]/85 to-[#231f20]/50 lg:to-[#231f20]/35 z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-[#171415]/90 z-[1]" />
          {/* Subtle brand ambient accents */}
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#02599c]/20 rounded-full blur-3xl pointer-events-none z-[1]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#06D001]/15 rounded-full blur-3xl pointer-events-none z-[1]" />

          {/* Slide / Scroll Indicator Pills (Centered at bottom, above mobile sticky bar) */}
          <div className="absolute bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-lg">
            <button
              onClick={() => setHeroSlide(0)}
              className={`transition-all rounded-full cursor-pointer ${
                heroSlide === 0 ? "w-6 h-2 bg-[#06D001]" : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label="Foto Dokumentasi 1"
            />
            <button
              onClick={() => setHeroSlide(1)}
              className={`transition-all rounded-full cursor-pointer ${
                heroSlide === 1 ? "w-6 h-2 bg-[#06D001]" : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label="Foto Dokumentasi 2 (Armada Truk)"
            />
          </div>
        </div>

        {/* Hero Content (Harmonious vertical rhythm & structured flow) */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-12 relative z-10 w-full py-4 sm:py-6">
          <div className="max-w-3xl space-y-5 sm:space-y-7">

            {/* Badges: Buka 24 Jam & Google Rating */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 backdrop-blur-xl text-white font-bold text-xs shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Standby Buka 24 Jam</span>
              </div>
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl text-xs font-semibold text-white transition-all group cursor-pointer shadow-sm"
              >
                <span className="w-3.5 h-3.5">{icons.google}</span>
                <span className="text-amber-400 font-bold">5.0 ★</span>
                <span className="text-slate-300 group-hover:text-white">Bintaro ↗</span>
              </a>
            </div>

            {/* Headline & Description Block (Natural 2-line flow, anti-cut on mobile) */}
            <div className="space-y-3.5 sm:space-y-4">
              <h1 className="text-[25px] sm:text-3xl md:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.2]">
                <span className="block">Kami Siap Bantu Anda</span>
                <span className="mt-1 sm:mt-1.5 flex flex-wrap items-baseline gap-x-2 sm:gap-x-2.5">
                  <span className="text-white shrink-0">Angkut Sisa</span>
                  <span className="inline-block overflow-hidden align-bottom">
                    <span
                      key={materialIndex}
                      className="text-[#06D001] animate-slide-up-word inline-block"
                    >
                      {rotatingMaterials[materialIndex]}.
                    </span>
                  </span>
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-[17px] text-slate-200 leading-relaxed max-w-xl font-normal pt-0.5">
                Jangan biarkan puing menghambat kelancaran proyek Anda. Gunakan jasa pembersihan profesional untuk memastikan area kerja yang bersih, aman, dan bebas dari kendala.
              </p>
            </div>

            {/* ── HARGA FLAT: 300RB ALL-IN (COMPACT & PAS DI MOBILE) ── */}
            <div className="pt-1 sm:pt-2">
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-black/60 border border-[#06D001]/60 backdrop-blur-md shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#06D001] animate-pulse" />
                <span className="text-lg sm:text-xl font-black text-[#06D001] tracking-tight">
                  Rp 300.000 / Rit
                </span>
                <span className="text-white/40">•</span>
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                  All-In Terima Bersih
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: HIGH-CONVERTING VALUE & ESTIMATOR (ANTI-GETOK HARGA & ESTIMASI RITASE) ── */}
      <section id="kalkulator" className="bg-white py-14 sm:py-20 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-12 space-y-12 sm:space-y-16">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#06D001]/15 border border-[#06D001]/30 text-[#231f20] text-xs font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#06D001]" />
              <span>Standar Bersih Bebas Was-was</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#231f20] tracking-tight">
              Kenapa 1.500+ Pemilik Rumah & Mandor Memilih Ammar Endung?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Hindari risiko tukang puing liar yang sering getok harga dan buang sembarangan. Kami hadir dengan transparansi harga, legalitas resmi, dan jaminan lokasi bersih tuntas.
            </p>
          </div>

          {/* Part 1: Comparison Cards (Tukang Liar vs Ammar Endung) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Card Negatif: Tukang Puing Liar (Warna Biru Lembut) */}
            <div className="bg-blue-50/40 rounded-2xl p-6 sm:p-7 border border-blue-200/80 space-y-5 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-[#02599c] uppercase tracking-wider">Risiko Cara Lama</span>
                  <h3 className="text-lg font-black text-[#231f20]">Tukang Puing Liar / Asal-Asalan</h3>
                </div>
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#02599c] flex items-center justify-center font-black text-sm">
                  ✕
                </div>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-blue-100 text-[#02599c] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                  <span><strong>Biaya Siluman di Lokasi:</strong> Di awal janjian murah, pas sampai lokasi dipalak uang rokok kuli, uang bongkar, dan uang terpal.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-blue-100 text-[#02599c] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                  <span><strong>Dibuang Liar Sembarangan:</strong> Dibuang di pinggir jalan tol atau kali. Pemilik rumah berisiko kena teguran & denda Satpol PP.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-blue-100 text-[#02599c] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                  <span><strong>Ditinggal Berantakan:</strong> Sisa kerikil dan debu dibiarkan mengotori jalan komplek, berujung komplain dari tetangga.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-blue-100 text-[#02599c] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                  <span><strong>Wajib DP Duluan:</strong> Minta transfer uang muka, tapi armada sering molor berjam-jam tanpa kepastian kabar.</span>
                </li>
              </ul>
            </div>

            {/* Card Positif: Standar Ammar Endung (Warna Biru Brand) */}
            <div className="bg-gradient-to-br from-[#013760] via-[#02599c] to-[#02599c] text-white rounded-2xl p-6 sm:p-7 border border-blue-400/30 space-y-5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#06D001]/15 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between pb-3 border-b border-white/15 relative z-10">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-[#06D001] uppercase tracking-wider">Standar Resmi</span>
                  <h3 className="text-lg font-black text-white">Jasa Buang Puing Ammar Endung</h3>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#06D001] text-[#231f20] flex items-center justify-center font-black text-sm">
                  ✓
                </div>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-100 relative z-10">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-[#06D001]/25 text-[#06D001] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 bg-white/10">✓</span>
                  <span><strong className="text-white">Tarif Pasti Cuma Rp 300rb/Rit:</strong> All-in termasuk armada truk, sopir, tenaga kuli angkut sampai tuntas tanpa biaya tersembunyi.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-[#06D001]/25 text-[#06D001] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 bg-white/10">✓</span>
                  <span><strong className="text-white">Dibuang ke TPA Legal Berizin:</strong> Puing disalurkan langsung ke lokasi urugan resmi Jabodetabek, 100% aman secara hukum.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-[#06D001]/25 text-[#06D001] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 bg-white/10">✓</span>
                  <span><strong className="text-white">Disapu Bersih Sampai Kinclong:</strong> Area bekas muatan disapu tuntas hingga bersih, tetangga senang dan jalan komplek rapi.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-[#06D001]/25 text-[#06D001] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 bg-white/10">✓</span>
                  <span><strong className="text-white">Tanpa DP (Beres Baru Bayar):</strong> Nol risiko untuk Anda. Selesai diangkut dan Anda cek langsung, baru lakukan pembayaran.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Part 2: Visual Estimator Ritase (Berapa Rit Puing Anda?) */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/90 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#02599c] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#02599c]" />
                <span>Panduan Cepat Estimasi Biaya</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#231f20] tracking-tight">
                Berapa Rit Puing yang Anda Butuhkan?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Pilih gambaran renovasi yang paling sesuai dengan kondisi rumah atau proyek Anda:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Estimator Card 1: Renovasi Ringan */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">Skala Kecil</span>
                    <span className="text-xs font-bold text-slate-500">± 10 - 25 Karung</span>
                  </div>
                  <h4 className="text-lg font-black text-[#231f20]">Renovasi Spot / Toilet</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sisa bongkar keramik kamar mandi, ganti closet, pembongkaran 1 meja cor semen, atau perabot rusak.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="text-xs text-slate-500">Rekomendasi Armada:</div>
                  <div className="text-sm font-black text-[#02599c]">1/2 Rit Truk Colt Diesel (Muatan Sebagian)</div>
                </div>
              </div>

              {/* Estimator Card 2: 1 Ruangan / Dapur (BEST SELLER - Royal Blue Card) */}
              <div className="bg-gradient-to-br from-[#013760] via-[#02599c] to-[#02599c] text-white rounded-2xl p-6 border-2 border-[#06D001] shadow-xl space-y-4 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#06D001] text-[#231f20] text-[10px] font-black uppercase tracking-wider shadow-sm">
                  Paling Banyak Dipilih
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-white/15 text-[#06D001] text-[11px] font-bold">Skala Sedang</span>
                    <span className="text-xs font-semibold text-blue-100">± 30 - 55 Karung</span>
                  </div>
                  <h4 className="text-lg font-black text-white">Renovasi 1 Kamar / Dapur</h4>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    Bongkar 1 sekat dinding bata/hebel, renovasi dapur, plafon roboh, atau sisa urugan tanah halaman.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/15 space-y-1">
                  <div className="text-xs text-blue-200 font-medium">Tarif Promo Flat:</div>
                  <div className="text-base font-black text-[#06D001]">1 Rit Truk Colt Diesel (Cuma Rp 300.000)</div>
                  <div className="text-[11px] text-blue-200">All-in bersih termasuk kuli angkut</div>
                </div>
              </div>

              {/* Estimator Card 3: Renovasi Total / Ruko */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">Skala Besar</span>
                    <span className="text-xs font-bold text-slate-500">60 - 150+ Karung</span>
                  </div>
                  <h4 className="text-lg font-black text-[#231f20]">Renovasi Rumah / Ruko</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Bongkar dinding banyak ruangan, dak cor lantai 2, pembersihan puing toko, atau galian tanah pondasi.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="text-xs text-slate-500">Rekomendasi Armada:</div>
                  <div className="text-sm font-black text-[#02599c]">2 - 4+ Rit Truk Colt Diesel (Paket Borongan)</div>
                </div>
              </div>
            </div>

            {/* Micro Action Trigger Callout */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3.5 text-center sm:text-left">
                <div className="w-11 h-11 rounded-xl bg-[#06D001]/20 text-[#231f20] flex items-center justify-center shrink-0 font-black text-xl">
                  📸
                </div>
                <div>
                  <h5 className="text-sm sm:text-base font-black text-[#231f20]">Masih Bingung Berapa Rit Puing Anda?</h5>
                  <p className="text-xs text-slate-500">Cukup foto tumpukan puing Anda, kirim ke WhatsApp — tim kami hitungkan estimasi gratis dalam 2 menit!</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openWA("Halo Pak Ammar, saya ingin estimasi puing bangunan. Ini foto tumpukan puing di lokasi saya, kira-kira butuh berapa rit ya?", "estimator_section_wa")}
                className="w-full sm:w-auto px-6 py-3 rounded-lg font-black text-xs uppercase tracking-wider text-[#231f20] bg-[#06D001] hover:bg-[#05b201] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-95"
              >
                <div className="w-4 h-4">{icons.whatsapp}</div>
                <span>Kirim Foto via WhatsApp</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 3: POKOKNYA APA SAJA DIANGKUT KECUALI SAMPAH ── */}
      <section id="layanan" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-12 space-y-10 sm:space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#06D001]/15 border border-[#06D001]/30 text-[#231f20] text-xs font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#06D001]" />
              <span>Pokoknya Apa Saja Diangkut Kecuali Sampah</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#231f20] tracking-tight">
              Pokoknya Apa Saja Diangkut, <span className="text-[#02599c]">Kecuali Sampah Rumah Tangga!</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Puing coran beton, batu bata, keramik, kaso kayu, triplek, rangka baja, plafon roboh, tanah galian, pipa, kloset bekas, hingga perabot rusak sisa renovasi — semua kami angkut dan lokasi disapu bersih tuntas. Anda cukup tunjuk!
            </p>
          </div>

          {/* 4 Focused Service Cards Grid (Simpel, Terarah & Tanpa Layanan Berlebihan) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => openWA(`Halo Pak Ammar, saya butuh informasi dan pemesanan armada untuk layanan *${cat.title}*.`)}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#06D001] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1.5"
              >
                {/* Category Photo */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  
                  {/* Top Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/95 text-[#02599c] shadow-sm">
                      {cat.tag}
                    </span>
                  </div>

                  {/* Price Tag Bottom */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    {cat.isPromo ? (
                      <span className="px-2.5 py-1 rounded-md bg-[#06D001] text-[#231f20] font-black text-xs shadow-md">
                        {cat.price}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-amber-300 font-bold text-xs border border-white/10">
                        {cat.price}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div>
                      <h3 className="text-base font-black text-[#231f20] group-hover:text-[#02599c] transition-colors leading-snug">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{cat.subtitle}</p>
                    </div>

                    <ul className="space-y-1.5 pt-1">
                      {cat.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                          <span className="w-3.5 h-3.5 text-[#06D001] shrink-0 mt-0.5">{icons.check}</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Bottom CTA Button */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="w-full py-2.5 px-3.5 rounded-lg bg-[#02599c] hover:bg-[#01477d] group-hover:bg-[#02599c] text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-between shadow-sm">
                      <span className="flex items-center gap-1.5">
                        <div className="w-3.5 h-3.5 text-[#06D001]">{icons.whatsapp}</div>
                        <span>Pesan Layanan</span>
                      </span>
                      <div className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform">
                        {icons.arrowRight}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Panduan Transparansi Material: Apa yang Diangkut & Apa yang Tidak Diterima */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#06D001]/20 text-[#06D001] flex items-center justify-center font-black text-xs">✓</span>
                <h4 className="text-sm font-black text-[#231f20] uppercase tracking-wider">100% Siap Kami Angkut:</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-8">
                Puing bata merah &amp; hebel, bongkaran dak cor beton, pecahan keramik/granit, genteng, kayu kaso &amp; triplek bekisting, plafon gypsum hancur, rangka hollow &amp; baja ringan, seng, tanah sisa galian parit/pondasi, kloset bekas, wastafel, besi tua, serta barang rongsokan sisa renovasi.
              </p>
            </div>

            <div className="space-y-2.5 md:border-l md:border-slate-200 md:pl-6">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#02599c]/15 text-[#02599c] flex items-center justify-center font-black text-xs">✕</span>
                <h4 className="text-sm font-black text-[#02599c] uppercase tracking-wider">Kecuali (Tidak Kami Layani):</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-8">
                Sampah basah rumah tangga (sisa makanan/dapur harian berbau busuk), bangkai hewan, dan limbah medis atau bahan kimia berbahaya beracun (B3).
              </p>
            </div>
          </div>

          {/* Bottom Trust Micro-Bar */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#231f20]">
              <span className="text-base sm:text-lg">🚛</span>
              <span>Armada Ready 24 Jam</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#231f20]">
              <span className="text-base sm:text-lg">⏱️</span>
              <span>Respons Cepat &lt; 5 Menit</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#231f20]">
              <span className="text-base sm:text-lg">🧹</span>
              <span>Sapu Bersih 100% Tuntas</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#231f20]">
              <span className="text-base sm:text-lg">💳</span>
              <span>Tanpa DP — Beres Baru Bayar</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 4: 3 LANGKAH MUDAH (CARA PESAN & ALUR KERJA) ── */}
      <section id="cara-kerja" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-12 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#02599c]/10 border border-[#02599c]/20 text-[#02599c] text-xs font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#02599c]" />
              <span>Alur Praktis Tanpa Ribet</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#231f20] tracking-tight">
              3 Langkah Praktis: Anda Cukup Tunjuk, Kami yang Angkut &amp; Sapu Bersih
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Tidak perlu buang tenaga bantu angkat karung. Tim tenaga kuli kami yang mengurus semuanya dari awal hingga lokasi Anda rapi kinclong.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-[#02599c] transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-[#06D001]/20 text-[#231f20] font-black text-sm flex items-center justify-center">
                    01
                  </span>
                  <span className="text-2xl">📸</span>
                </div>
                <h3 className="text-lg font-black text-[#231f20] group-hover:text-[#02599c] transition-colors">
                  Kirim Foto via WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Cukup foto atau video tumpukan puing di lokasi Anda. Tim admin kami segera menghitung estimasi jumlah ritase dan harga pasti di muka tanpa biaya tersembunyi.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/80 text-[11px] font-bold text-[#02599c] flex items-center gap-1.5">
                <span>✓ Estimasi instan &lt; 5 menit</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-[#02599c] transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-[#02599c]/15 text-[#02599c] font-black text-sm flex items-center justify-center">
                    02
                  </span>
                  <span className="text-2xl">🚛</span>
                </div>
                <h3 className="text-lg font-black text-[#231f20] group-hover:text-[#02599c] transition-colors">
                  Armada &amp; Kuli Meluncur
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Armada truk Colt Diesel tiba di lokasi Anda tepat waktu lengkap dengan kuli angkut. Anda santai saja, biar tim kami yang menaikkan seluruh puing ke bak.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/80 text-[11px] font-bold text-[#02599c] flex items-center gap-1.5">
                <span>✓ Anda cukup tunjuk lokasi puing</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-[#06D001] transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-[#06D001] text-[#231f20] font-black text-sm flex items-center justify-center">
                    03
                  </span>
                  <span className="text-2xl">🧹</span>
                </div>
                <h3 className="text-lg font-black text-[#231f20] group-hover:text-[#02599c] transition-colors">
                  Disapu Bersih, Baru Bayar!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Setelah bak truk penuh, lokasi muatan disapu tuntas hingga bersih dari ceceran kerikil dan debu. Anda cek langsung di tempat, puas, baru lakukan pembayaran.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/80 text-[11px] font-bold text-[#06D001] flex items-center gap-1.5">
                <span>✓ 100% Tanpa DP · Bebas was-was</span>
              </div>
            </div>
          </div>

          {/* Quick CTA Banner in Step Section */}
          <div className="bg-gradient-to-r from-[#013760] via-[#02599c] to-[#013760] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-5 max-w-5xl mx-auto shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-black text-white">Butuh Armada Buang Puing Hari Ini?</h4>
              <p className="text-xs sm:text-sm text-blue-100">Armada kami standby 24 jam di sekitar Bintaro, Pesanggrahan, dan Jabodetabek.</p>
            </div>
            <button
              type="button"
              onClick={() => openWA("Halo Pak Ammar, saya ingin konsultasi pembuangan puing di lokasi saya.", "cara_kerja_cta_wa")}
              className="px-6 py-3 rounded-lg font-black text-xs uppercase tracking-wider text-[#231f20] bg-[#06D001] hover:bg-[#05b201] transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0 active:scale-95"
            >
              <div className="w-4 h-4">{icons.whatsapp}</div>
              <span>Konsultasi Sekarang</span>
            </button>
          </div>

        </div>
      </section>

      {/* ── SECTION 5: BUKTI NYATA & ULASAN GOOGLE MAPS 5.0 ★ ── */}
      <section id="galeri" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-12 space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-800 text-xs font-black uppercase tracking-wider">
              <span className="w-3.5 h-3.5 text-amber-500">{icons.star}</span>
              <span>Ulasan Asli Google Maps 5.0 ★</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#231f20] tracking-tight">
              Kepercayaan Warga Bintaro &amp; Sekitarnya
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Bukan janji manis, ini ulasan nyata dari pelanggan yang telah merasakan kecepatan, kejujuran harga, dan kerapian kerja Ammar Endung.
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Rating Stars & Google Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-amber-400 gap-0.5">
                      {[...Array(rev.stars)].map((_, i) => (
                        <span key={i} className="w-4 h-4">{icons.star}</span>
                      ))}
                    </div>
                    <div className="w-4 h-4">{icons.google}</div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-black text-[#231f20]">{rev.name}</h4>
                    <span className="text-[11px] text-slate-400">{rev.loc}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Terverifikasi
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Real Work Gallery Showcase */}
          <div className="max-w-5xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-[#02599c] uppercase tracking-wider">Dokumentasi Kerja Lapangan</span>
                <h3 className="text-lg font-black text-[#231f20]">Proses Muat Armada &amp; Hasil Bersih</h3>
              </div>
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#02599c] hover:underline flex items-center gap-1"
              >
                <span>Lihat di Google Maps</span>
                <span className="w-3.5 h-3.5">{icons.arrowRight}</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                <Image
                  src="/kerja4.webp"
                  alt="Proses Tenaga Kuli Muat Bongkaran Cor Beton ke Truk"
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="text-xs font-bold text-white">Tenaga Kuli Kuat &amp; Cekatan</span>
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                <Image
                  src="/kerja3.webp"
                  alt="Truk Dump Buang Puing dan Tanah Urugan di Lokasi Resmi"
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="text-xs font-bold text-white">Truk Dump &amp; Pembuangan Resmi</span>
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                <Image
                  src="/kerja5.webp"
                  alt="Pembersihan dan Pengangkutan Puing Proyek Bangunan"
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="text-xs font-bold text-white">Proyek Hunian, Ruko &amp; Gedung</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 6: AREA JANGKAUAN, FAQ & CLOSING CTA ── */}
      <section id="faq" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-12 space-y-14">
          
          {/* Part 1: Area Jangkauan Siaga */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/90 space-y-6 max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#02599c] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#06D001]" />
                <span>Radius Cepat Pool Bintaro</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#231f20] tracking-tight">
                Wilayah Jangkauan Armada Siaga 24 Jam
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Pangkalan armada berlokasi di Bintaro &amp; Pesanggrahan, melayani pengangkutan kilat ke seluruh pelosok Jabodetabek:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs font-bold text-slate-700">
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                <span className="text-[#06D001]">📍</span> Bintaro Sektor 1 - 9
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                <span className="text-[#06D001]">📍</span> Pesanggrahan (Jaksel)
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                <span className="text-[#06D001]">📍</span> Rempoa &amp; Ciputat
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                <span className="text-[#06D001]">📍</span> BSD City &amp; Serpong
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                <span className="text-[#06D001]">📍</span> Pamulang &amp; Tangsel
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                <span className="text-[#06D001]">📍</span> Ciledug &amp; Tangerang
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                <span className="text-[#06D001]">📍</span> Jakarta Selatan
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                <span className="text-[#06D001]">📍</span> Seluruh Jabodetabek
              </div>
            </div>
          </div>

          {/* Part 2: Interactive FAQ Accordion */}
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-[#02599c] uppercase tracking-wider">Tanya Jawab Populer</span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#231f20] tracking-tight">
                Pertanyaan yang Sering Diajukan
              </h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-white transition-all shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full p-4 sm:p-5 text-left font-black text-sm sm:text-base text-[#231f20] flex items-center justify-between gap-4 cursor-pointer hover:text-[#02599c] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <span
                        className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#02599c]" : ""
                        }`}
                      >
                        {icons.chevronDown}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ── CORPORATE FOOTER WITH BRAND GREEN ACCENTS (#06D001) ── */}
      <footer className="bg-gradient-to-b from-[#131b14] via-[#0d120e] to-[#070908] text-slate-300 pt-16 pb-28 sm:pb-16 border-t-2 border-[#06D001]/30 text-xs relative overflow-hidden">
        {/* Ambient Top Green Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-[#06D001]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-12 relative z-10">

          {/* Pre-Footer Action Banner (Biru Royal dengan Aksen Hijau #06D001) */}
          <div className="mb-14 bg-gradient-to-r from-[#013760] via-[#02599c] to-[#013760] rounded-2xl p-6 sm:p-8 border border-[#06D001]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#06D001]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-1.5 text-center md:text-left z-10">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#06D001]/20 border border-[#06D001]/40 text-[#06D001] text-[11px] font-black uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#06D001] animate-pulse" />
                <span>Siaga 24 Jam Nonstop Jabodetabek</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Puing Menumpuk Bikin Risih? Hubungi Ammar Endung Sekarang!
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
                Kirim foto lokasi Anda, armada langsung meluncur hari ini juga. Cukup tunjuk — kami yang angkut, sapu bersih, baru Anda bayar.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 z-10 shrink-0">
              <button
                type="button"
                onClick={() => openWA("Halo Ammar Endung, saya ingin pesan jasa buang puing tarif Rp 300rb/rit.", "footer_pre_cta_wa")}
                className="px-6 py-3.5 rounded-lg font-black text-xs uppercase tracking-wider text-[#231f20] bg-[#06D001] hover:bg-[#05b201] transition-all shadow-lg shadow-[#06D001]/25 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <div className="w-4 h-4">{icons.whatsapp}</div>
                <span>Chat WhatsApp 24 Jam</span>
              </button>
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                onClick={() => trackCallClick("footer_pre_cta_phone")}
                className="px-5 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <div className="w-4 h-4 text-[#06D001]">{icons.phone}</div>
                <span>{PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 mb-12">

            {/* Col 1: Brand & Identity */}
            <div className="md:col-span-4 space-y-4">
              <Image
                src="/logo.svg"
                alt={BUSINESS_NAME}
                width={140}
                height={40}
                className="h-8 w-auto brightness-0 invert"
              />
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
                <strong className="text-white">{BUSINESS_NAME}</strong> adalah spesialis jasa buang puing bangunan, bongkaran dinding, pengangkutan tanah urug, dan sisa renovasi terpercaya nomor 1 di Bintaro, Pesanggrahan, Tangerang Selatan, dan seluruh wilayah Jabodetabek.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#06D001]/10 border border-[#06D001]/30 text-[#06D001] font-bold text-xs">
                <span className="w-2 h-2 rounded-full bg-[#06D001]" />
                <span>Beres Baru Bayar · Bebas DP · Sapu Bersih</span>
              </div>
            </div>

            {/* Col 2: Layanan Utama (Fokus 4 Layanan) */}
            <div className="md:col-span-3 space-y-3.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06D001]" />
                <span>Layanan Utama</span>
              </h4>
              <ul className="space-y-2 text-slate-300 font-medium">
                <li>
                  <button onClick={() => openWA("Tanya Buang Puing Beton, Bata & Keramik")} className="hover:text-[#06D001] transition-colors cursor-pointer text-left flex items-center gap-1.5">
                    <span className="text-[#06D001] text-xs">›</span> Puing Beton, Bata &amp; Keramik (300rb)
                  </button>
                </li>
                <li>
                  <button onClick={() => openWA("Tanya Kayu, Plafon & Rangka Material")} className="hover:text-[#06D001] transition-colors cursor-pointer text-left flex items-center gap-1.5">
                    <span className="text-[#06D001] text-xs">›</span> Kayu, Plafon &amp; Rangka Proyek
                  </button>
                </li>
                <li>
                  <button onClick={() => openWA("Tanya Tanah Galian & Tanah Urug")} className="hover:text-[#06D001] transition-colors cursor-pointer text-left flex items-center gap-1.5">
                    <span className="text-[#06D001] text-xs">›</span> Tanah Galian &amp; Tanah Urug
                  </button>
                </li>
                <li>
                  <button onClick={() => openWA("Tanya Bongkar Sekat & Rongsok Renovasi")} className="hover:text-[#06D001] transition-colors cursor-pointer text-left flex items-center gap-1.5">
                    <span className="text-[#06D001] text-xs">›</span> Bongkar Sekat &amp; Rongsok Renovasi
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Area Jangkauan */}
            <div className="md:col-span-3 space-y-3.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06D001]" />
                <span>Area Siaga Armada</span>
              </h4>
              <ul className="space-y-2 text-slate-300 font-medium">
                <li className="flex items-center gap-1.5">
                  <span className="text-[#06D001]">📍</span> Bintaro Jaya Sektor 1 - 9
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#06D001]">📍</span> Pesanggrahan & Cilandak (Jaksel)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#06D001]">📍</span> BSD City, Serpong & Pamulang
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#06D001]">📍</span> Ciledug, Ciputat & Tangsel
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#06D001]">📍</span> Jakarta Barat & Jakarta Pusat
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#06D001]">📍</span> Jakarta Timur & Seluruh Depok
                </li>
              </ul>
            </div>

            {/* Col 4: Kontak & Pool */}
            <div className="md:col-span-2 space-y-3.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06D001]" />
                <span>Kontak & Pool</span>
              </h4>
              <ul className="space-y-2.5 font-medium">
                <li>
                  <a
                    href={`tel:+${WHATSAPP_NUMBER}`}
                    onClick={() => trackCallClick("footer_phone_link")}
                    className="flex items-center gap-2 hover:text-[#06D001] transition-colors font-bold text-white"
                  >
                    <span className="w-3.5 h-3.5 text-[#06D001]">{icons.phone}</span>
                    <span>{PHONE_DISPLAY}</span>
                  </a>
                </li>
                <li>
                  <button onClick={() => openWA("Konsultasi via Footer", "footer_whatsapp_link")} className="flex items-center gap-2 hover:underline transition-colors font-bold text-[#06D001] cursor-pointer">
                    <span className="w-3.5 h-3.5">{icons.whatsapp}</span>
                    <span>Chat WhatsApp 24 Jam</span>
                  </button>
                </li>
                <li>
                  <a
                    href={GOOGLE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#06D001] transition-colors text-slate-300"
                  >
                    <span className="w-3.5 h-3.5 text-amber-400">{icons.mapPin}</span>
                    <span>Pool: Bintaro, Jaksel ↗</span>
                  </a>
                </li>
                <li className="pt-1 border-t border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#06D001] animate-ping" />
                    <span className="text-[#06D001] font-bold text-xs">Standby Buka 24 Jam</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Senin - Minggu (Termasuk Libur)</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & Legal Links */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <p>© {new Date().getFullYear()} <strong className="text-white">{BUSINESS_NAME}</strong>. Jasa Buang Puing Bintaro &amp; Jabodetabek. Semua hak cipta dilindungi.</p>
            <div className="flex items-center gap-4 text-slate-400">
              <button onClick={() => setModalType("terms")} className="hover:text-[#06D001] transition-colors cursor-pointer">Syarat &amp; Ketentuan</button>
              <span>•</span>
              <button onClick={() => setModalType("privacy")} className="hover:text-[#06D001] transition-colors cursor-pointer">Kebijakan Privasi</button>
            </div>
          </div>

        </div>
      </footer>

      {/* ── FLOATING QUICK ACTION DOCK (ROOT BRAND GREEN: #06D001 - DESKTOP ONLY) ── */}
      <aside
        aria-label="Aksi Cepat & Kontak Siaga Ammar Endung"
        className="hidden md:flex fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 flex-col gap-2.5 sm:gap-3"
      >
        {/* 1. Rating Langsung di Google Maps (Icon Smiley Face sesuai foto referensi) */}
        <a
          href={GOOGLE_MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#06D001] hover:bg-[#05b201] text-[#231f20] shadow-lg shadow-[#06D001]/25 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group relative cursor-pointer"
          aria-label="Beri Rating Google Maps 5.0 Bintang"
        >
          <div className="w-5 h-5 sm:w-5.5 sm:h-5.5">{icons.smile}</div>
          <span className="hidden sm:block absolute right-14 sm:right-15 px-3 py-1.5 rounded-lg bg-slate-900/95 backdrop-blur-md text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none border border-slate-700/60">
            Rating Google Maps 5.0 ★
          </span>
        </a>

        {/* 2. Chat WhatsApp Admin 24 Jam */}
        <button
          onClick={() => openWA("Halo Ammar Endung, saya butuh penawaran buang puing tarif Rp 300rb/rit.", "floating_dock_wa")}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#06D001] hover:bg-[#05b201] text-[#231f20] shadow-lg shadow-[#06D001]/25 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group relative cursor-pointer"
          aria-label="Chat WhatsApp Admin 24 Jam"
        >
          <div className="w-5 h-5 sm:w-5.5 sm:h-5.5">{icons.whatsapp}</div>
          <span className="hidden sm:block absolute right-14 sm:right-15 px-3 py-1.5 rounded-lg bg-slate-900/95 backdrop-blur-md text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none border border-slate-700/60">
            Chat WhatsApp 24 Jam
          </span>
        </button>

        {/* 3. Social Media (Instagram Resmi) */}
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#06D001] hover:bg-[#05b201] text-[#231f20] shadow-lg shadow-[#06D001]/25 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group relative cursor-pointer"
          aria-label="Instagram Resmi Ammar Endung"
        >
          <div className="w-5 h-5 sm:w-5.5 sm:h-5.5">{icons.instagram}</div>
          <span className="hidden sm:block absolute right-14 sm:right-15 px-3 py-1.5 rounded-lg bg-slate-900/95 backdrop-blur-md text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none border border-slate-700/60">
            Instagram &amp; Media Sosial
          </span>
        </a>

        {/* 4. Siaga 24 Jam / Telepon Cepat (Icon Speed Clock sesuai foto referensi) */}
        <a
          href={`tel:+${WHATSAPP_NUMBER}`}
          onClick={() => trackCallClick("floating_dock_call")}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#06D001] hover:bg-[#05b201] text-[#231f20] shadow-lg shadow-[#06D001]/25 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group relative cursor-pointer"
          aria-label="Telepon Armada Buka 24 Jam"
        >
          <div className="w-5 h-5 sm:w-5.5 sm:h-5.5">{icons.speedClock}</div>
          <span className="hidden sm:block absolute right-14 sm:right-15 px-3 py-1.5 rounded-lg bg-slate-900/95 backdrop-blur-md text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none border border-slate-700/60">
            Siaga 24 Jam: {PHONE_DISPLAY}
          </span>
        </a>
      </aside>

      {/* ── FLOATING BACK TO TOP BUTTON ── */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Kembali ke atas"
        className={`fixed right-3 sm:right-5 bottom-16 sm:bottom-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#02599c] hover:bg-[#01477d] text-white shadow-xl shadow-[#02599c]/35 border border-white/20 flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90 group ${
          scrolled ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform">
          {icons.chevronUp}
        </div>
        <span className="hidden sm:block absolute right-14 sm:right-15 px-3 py-1.5 rounded-lg bg-slate-900/95 backdrop-blur-md text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none border border-slate-700/60">
          Kembali ke Atas
        </span>
      </button>

      {/* ── MOBILE BOTTOM STICKY BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200 p-2.5 px-4 flex items-center justify-between shadow-2xl">
        <a
          href={`tel:+${WHATSAPP_NUMBER}`}
          onClick={() => trackCallClick("mobile_sticky_call_button")}
          className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 text-slate-800 font-extrabold text-xs flex items-center justify-center gap-1.5 mr-2"
        >
          <div className="w-3.5 h-3.5 text-[#02599c]">{icons.phone}</div>
          <span>Telepon</span>
        </a>
        <button
          onClick={() => openWA("Halo Ammar Endung, saya ingin tanya jasa buang puing.", "mobile_sticky_wa_button")}
          className="flex-1 py-2.5 px-3 rounded-xl text-[#231f20] font-extrabold text-xs flex items-center justify-center gap-1.5 bg-[#06D001] hover:bg-[#05b201] shadow-md cursor-pointer"
        >
          <div className="w-4 h-4">{icons.whatsapp}</div>
          <span>Chat WhatsApp</span>
        </button>
      </div>

      {/* ── LEGAL MODALS (TERMS & PRIVACY) ── */}
      {modalType && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setModalType(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                {modalType === "terms" ? "Syarat & Ketentuan Layanan" : "Kebijakan Privasi"}
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-4 leading-relaxed">
              {modalType === "terms" ? (
                <>
                  <p>Selamat datang di <strong>{BUSINESS_NAME}</strong>. Dengan menggunakan layanan pengangkutan kami, Anda menyetujui ketentuan berikut:</p>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">1. Ruang Lingkup Layanan</h4>
                    <p>Layanan mencakup pembuangan puing renovasi, pembongkaran dinding, pengangkutan tanah merah urugan, dan pembersihan decluttering hunian maupun komersil.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">2. Ketentuan Pembayaran</h4>
                    <p>Prinsip kerja kami adalah 'Beres, Baru Bayar'. Pembayaran diselesaikan setelah pekerjaan pengangkutan selesai dan lokasi telah dibersihkan secara tuntas.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">3. Pembuangan Bertanggung Jawab</h4>
                    <p>Seluruh puing bangunan diangkut dan disalurkan ke lokasi pembuangan dan pemadatan urugan lahan di Jabodetabek secara tertib dan aman.</p>
                  </div>
                </>
              ) : (
                <>
                  <p>Kami di <strong>{BUSINESS_NAME}</strong> berkomitmen penuh untuk menjaga kerahasiaan dan privasi data pribadi Anda:</p>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">1. Pengumpulan Data</h4>
                    <p>Data kontak dan alamat yang Anda kirimkan murni digunakan untuk koordinasi estimasi biaya dan penugasan armada ke lokasi proyek Anda.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">2. Keamanan & Kerahasiaan</h4>
                    <p>Kami tidak pernah membagikan atau menjual data pribadi Anda kepada pihak ketiga mana pun.</p>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setModalType(null)}
              className="w-full mt-6 py-3 rounded-xl text-white font-extrabold text-xs uppercase tracking-wider bg-[#02599c] transition-all cursor-pointer"
            >
              Saya Mengerti & Setuju
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

