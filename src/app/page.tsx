"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ─── CONFIG ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "6288985185962";
const BUSINESS_NAME = "Ammar Endung";

// ─── ICONS ─────────────────────────────────────────────────────────────────
const icons = {
  trash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  chevronDown: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  ),
  arrowRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  ),
  dollar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 014 13V6l7-3 7 3v7a7 7 0 01-7 7z" /><path d="M11 20v-9" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  ),
};

// ─── WHATSAPP HELPERS ───────────────────────────────────────────────────────
const openWA = (service: string) => {
  const text = `Halo ${BUSINESS_NAME}, saya tertarik dengan layanan *${service}*. Bisa infokan harganya?`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
};

// ─── SERVICES DATA ──────────────────────────────────────────────────────────
const services = [
  {
    id: "buang-puing",
    icon: icons.trash,
    color: "#F62440",
    title: "Buang Puing",
    subtitle: "Renovasi & Bongkaran",
    price: "Rp 250rb / rit",
    tags: ["Bata & Beton", "Genteng & Kayu", "Sisa Aspal"],
    desc: "Sisa material renovasi—pecahan bata, beton, genteng lama—kami angkut sampai bersih dari lokasi Anda.",
  },
  {
    id: "angkut-barang",
    icon: icons.truck,
    color: "#222222",
    title: "Angkut Barang",
    subtitle: "Pindahan & Logistik",
    price: "Harga Nego",
    tags: ["Pindahan Rumah", "Mebel & Elektronik", "Logistik Kantor"],
    desc: "Layanan pindahan rumah, kos-kosan, ruko & kantor. Helper terlatih siap angkut barang Anda dengan aman.",
  },
  {
    id: "tanah-urugan",
    icon: icons.layers,
    color: "#d61c35",
    title: "Urugan Tanah",
    subtitle: "Merah & Subur",
    price: "Harga Borongan",
    tags: ["Tanah Merah", "Puing Urug", "Angkut Galian"],
    desc: "Tanah merah, tanah subur & puing bersih untuk urugan lahan, pondasi, atau jalan becek.",
  },
  {
    id: "bongkar-bangunan",
    icon: icons.building,
    color: "#555555",
    title: "Bongkar Bangunan",
    subtitle: "Dinding & Renovasi",
    price: "Estimasi Gratis",
    tags: ["Sekat Dinding", "Keramik & Plafon", "Bongkar Total"],
    desc: "Pembongkaran dinding, keramik, atap, sekat partisi, hingga total bongkar rumah lama.",
  },
];

// ─── STATS DATA ──────────────────────────────────────────────────────────────
const stats = [
  { num: "5+", label: "Tahun Exp" },
  { num: "10+", label: "Armada" },
  { num: "24/7", label: "Siaga" },
  { num: "100%", label: "Puas" },
];

// ─── FEATURES DATA ──────────────────────────────────────────────────────────
const features = [
  { icon: icons.dollar, title: "Harga Transparan", desc: "Tanpa biaya tersembunyi. Per rit atau borongan sesuai kebutuhan Anda." },
  { icon: icons.bolt, title: "Respon Kilat 24/7", desc: "Chat & telepon aktif kapanpun. Pengerjaan malam hari tersedia." },
  { icon: icons.truck, title: "Armada Sendiri", desc: "Bukan perantara. Truk engkel & dobel siap jalan setiap saat." },
  { icon: icons.users, title: "Pekerja Terlatih", desc: "Tim gesit, jujur & selalu bersihkan lokasi setelah selesai." },
  { icon: icons.map, title: "Jangkauan Luas", desc: "Seluruh Bintaro, Tangerang Selatan & semua penjuru Jakarta." },
  { icon: icons.leaf, title: "Legal & Aman", desc: "Puing dibuang ke TPA resmi. Aman bagi lingkungan sekitar." },
];

// ─── AREAS DATA ─────────────────────────────────────────────────────────────
const areas = [
  {
    title: "Bintaro & Tangsel",
    color: "#F62440",
    areas: ["Bintaro Sektor 1-9", "Graha Raya", "Ciledug", "Ciputat", "Pamulang", "Pondok Aren", "Serpong", "BSD City"],
  },
  {
    title: "Jakarta Selatan",
    color: "#222222",
    areas: ["Kebayoran Baru/Lama", "Pesanggrahan", "Cilandak", "Pasar Minggu", "Jagakarsa", "Mampang", "Tebet"],
  },
  {
    title: "Jakarta Barat & Pusat",
    color: "#d61c35",
    areas: ["Kembangan", "Kebon Jeruk", "Palmerah", "Grogol", "Cengkareng", "Tanah Abang", "Menteng"],
  },
  {
    title: "Jakarta Timur & Utara",
    color: "#555555",
    areas: ["Duren Sawit", "Jatinegara", "Kramat Jati", "Cakung", "Kelapa Gading", "Tanjung Priok", "Pluit"],
  },
];

// ─── FAQ DATA ─────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Bagaimana cara menentukan harga pembuangan puing?",
    a: "Harga berdasarkan volume puing dan akses jalan proyek. Cukup kirim foto tumpukan puing ke WhatsApp kami, dan kami langsung berikan estimasi harga terbaik."
  },
  {
    q: "Armada apa saja yang tersedia?",
    a: "Pick Up (gang sempit), Truk Engkel 4 roda (sedang), Truk Double 6 roda (besar). Semua dilengkapi tenaga angkut manual siap muat."
  },
  {
    q: "Apakah harga sudah termasuk kuli angkut?",
    a: "Ya! Estimasi harga kami sudah mencakup: armada, bensin, sopir, kuli angkut yang menaikkan puing ke truk, hingga biaya buang ke TPA resmi."
  },
  {
    q: "Apakah melayani pekerjaan malam hari?",
    a: "Ya, kami operasi 24 jam. Banyak ruko pusat kota wajib buang puing malam hari agar tidak ganggu lalu lintas—kami siap kapanpun."
  },
  {
    q: "Apakah melayani jasa urugan tanah juga?",
    a: "Ya. Kami sediakan tanah merah murni, puing bersih untuk urugan jalan becek, dan tanah subur untuk taman."
  }
];

// ─── REVIEWS ─────────────────────────────────────────────────────────────
const reviews = [
  { name: "Rafka jayamandiri", loc: "Pesanggrahan, Jakarta", text: "mantap pak, kerjanya sitset terimakasih, sangat membantu 👍", stars: 5 },
  { name: "Rizky Shandi", loc: "Jakarta Selatan", text: "Profesional tukang y ..kerja y juga rapih", stars: 5 },
  { name: "Adrian Suryana", loc: "Bintaro, Jakarta", text: "Terimakasih", stars: 5 },
];

// ─── COMPONENT: SERVICE CARD ─────────────────────────────────────────────
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  return (
    <div
      className="service-card relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => openWA(service.title)}
    >
      {/* Card BG */}
      <div className="absolute inset-0 rounded-2xl" style={{
        background: `linear-gradient(135deg, rgba(${service.color === '#F62440' ? '246,36,64' : service.color === '#222222' ? '34,34,34' : service.color === '#d61c35' ? '214,28,53' : '85,85,85'},0.06) 0%, white 70%)`,
        border: `1px solid rgba(${service.color === '#F62440' ? '246,36,64' : service.color === '#222222' ? '34,34,34' : service.color === '#d61c35' ? '214,28,53' : '85,85,85'},0.15)`,
      }} />
      
      <div className="relative p-5">
        {/* Icon + Badge row */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white"
            style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}99)`, boxShadow: `0 4px 16px ${service.color}33` }}>
            <div className="w-5 h-5">{service.icon}</div>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: `${service.color}18`, color: service.color, border: `1px solid ${service.color}30` }}>
            {service.price}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-extrabold text-slate-900 mb-0.5">{service.title}</h3>
        <p className="text-xs font-semibold mb-3" style={{ color: '#F62440' }}>{service.subtitle}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {service.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-slate-500"
              style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Desc */}
        <p className="text-xs text-slate-500 leading-relaxed mb-4">{service.desc}</p>

        {/* CTA */}
        <div className="flex items-center gap-2 text-xs font-bold" style={{ color: service.color }}>
          <div className="w-4 h-4">{icons.whatsapp}</div>
          <span>Chat Sekarang</span>
          <div className="w-3.5 h-3.5 ml-auto opacity-60">{icons.arrowRight}</div>
        </div>
      </div>
    </div>
  );
}

// ─── COMPONENT: REVIEW CARD ──────────────────────────────────────────────
function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="min-w-[280px] rounded-2xl p-5 flex-shrink-0"
      style={{ background: 'white', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: review.stars }).map((_, i) => (
          <div key={i} className="w-3.5 h-3.5 text-yellow-400">{icons.star}</div>
        ))}
      </div>
      <p className="text-sm text-slate-600 leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: 'linear-gradient(135deg, #007DCC, #0068b5)' }}>
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="text-xs font-bold text-slate-800">{review.name}</p>
          <p className="text-[10px] text-slate-400">{review.loc}</p>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ nama: "", lokasi: "", layanan: "Buang Puing Proyek", pesan: "" });
  const [scrolled, setScrolled] = useState(false);
  const [modalType, setModalType] = useState<"terms" | "privacy" | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const servicesOptions = [
    { value: "Buang Puing Proyek", label: "Jasa Buang Puing" },
    { value: "Angkut Barang & Pindahan", label: "Jasa Angkut Barang / Pindahan" },
    { value: "Angkut Tanah & Urugan", label: "Jasa Urugan & Angkut Tanah" },
    { value: "Bongkar Bangunan", label: "Jasa Pembongkaran Bangunan" },
    { value: "Lainnya", label: "Layanan Lainnya" }
  ];
  const selectedOption = servicesOptions.find(o => o.value === formData.layanan) || servicesOptions[0];

  // ── Scroll listener for navbar glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Click outside listener to close custom select dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-60px 0px -10px 0px", threshold: 0.05 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo ${BUSINESS_NAME}, saya ingin memesan layanan.\n\n*Nama:* ${formData.nama}\n*Lokasi:* ${formData.lokasi}\n*Layanan:* ${formData.layanan}\n*Catatan:* ${formData.pesan || "-"}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const scrollReviews = (dir: "left" | "right") => {
    if (reviewsRef.current) {
      reviewsRef.current.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
    }
  };

  return (
    <div id="beranda" className="relative min-h-screen text-slate-800 pb-24 md:pb-0" style={{ background: '#f8fafc' }}>

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full animate-orb"
          style={{ background: 'radial-gradient(circle, rgba(246,36,64,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full animate-orb"
          style={{ background: 'radial-gradient(circle, rgba(34,34,34,0.03) 0%, transparent 70%)', animationDelay: '3s' }} />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full animate-orb"
          style={{ background: 'radial-gradient(circle, rgba(246,36,64,0.03) 0%, transparent 70%)', animationDelay: '6s' }} />
      </div>

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2 md:py-3.5' : 'py-4 md:py-6'}`}>
        <div className={`rounded-2xl px-5 py-2.5 md:py-3 flex items-center justify-center md:justify-between transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 shadow-md shadow-slate-200/30 backdrop-blur-xl border border-slate-200/50 w-fit mx-auto md:w-full md:max-w-6xl'
            : 'bg-transparent border-transparent shadow-none w-auto mx-4 md:mx-auto md:max-w-6xl'
        }`}>
          <a href="#beranda" className="flex items-center cursor-pointer mx-auto md:mx-0">
            <Image
              src="/logo.svg"
              alt={`${BUSINESS_NAME} - Jasa Buang Puing`}
              width={130}
              height={36}
              priority
              className="h-8 w-auto object-contain md:h-[36px]"
            />
          </a>

          <nav className="hidden md:flex items-center gap-10 text-[11px] md:text-[12px] font-black uppercase tracking-wider">
            {["Layanan", "Keunggulan", "Area", "FAQ"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="transition-colors duration-200 text-slate-600 hover:text-red-500">
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2.5">
            <a href={`tel:+${WHATSAPP_NUMBER}`}
              className="hidden sm:flex w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl items-center justify-center transition-colors"
              style={{
                background: 'rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
              <div className="w-4 h-4 text-slate-500">{icons.phone}</div>
            </a>
            <button
              onClick={() => openWA("Tanya Layanan")}
              className="h-9 md:h-11 px-5 md:px-6 rounded-xl md:rounded-2xl font-black text-[11px] md:text-[12px] uppercase tracking-wider hidden md:flex items-center justify-center gap-1.5 transition-all duration-300 text-white cursor-pointer"
              style={{
                background: scrolled ? '#F62440' : '#222222',
                boxShadow: scrolled ? '0 4px 12px rgba(246,36,64,0.12)' : '0 4px 12px rgba(34,34,34,0.12)'
              }}>
              <div className="w-3.5 h-3.5">{icons.whatsapp}</div>
              Chat WA
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION & APP DASHBOARD CARD ── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-12 px-4 overflow-hidden md:py-40 md:pb-28 md:min-h-screen">
        {/* Hero image full-cover dengan light cinematic overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/hero.webp')", opacity: 0.75 }} />
          {/* Light cinematic gradient overlay */}
          <div className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(248,250,252,0.95) 0%, rgba(248,250,252,0.85) 50%, rgba(248,250,252,0.2) 100%)'
            }} />
          <div className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 60%, #f8fafc 100%)'
            }} />
        </div>

        <div className="relative z-10 mx-auto w-full md:max-w-6xl md:grid md:grid-cols-12 md:gap-16 md:items-center">
          {/* Left Column (Text & Stats) - Centered on Mobile */}
          <div className="w-full max-w-lg mx-auto md:max-w-none md:col-span-7 py-6 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Status badge */}
            <div data-reveal="fade" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-[10px] font-bold"
              style={{ background: 'rgba(246,36,64,0.1)', border: '1px solid rgba(246,36,64,0.25)', color: '#F62440' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: '#F62440' }} />
              Siap Beroperasi Sekarang · Jakarta & Bintaro
            </div>

            {/* Headline — merah tebal cinematic */}
            <h1 data-reveal="up" className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4 text-[#222222]" style={{ color: '#222222' }}>
              Jasa Buang Puing<br />
              <span className="text-[#F62440]" style={{ color: '#F62440' }}>Bintaro & Jakarta</span><br />
              <span style={{ color: '#222222' }}>Murah & Cepat</span>
            </h1>

            <p data-reveal="up" className="delay-1 text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0 text-[#222222]" style={{ color: '#222222' }}>
              Bereskan puing sisa bangunan, urugan tanah merah, hingga angkut barang pindahan.
              Armada prima, harga bersahabat, dan bisa <strong className="text-[#222222] font-black">pesan 24 jam!</strong>
            </p>

            {/* Stats chips ── glassmorphism */}
            <div data-reveal="up" className="delay-2 flex gap-2 flex-wrap justify-center md:justify-start">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center px-4 py-2.5 rounded-xl"
                  style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <span className="text-base font-black leading-none" style={{ color: '#F62440' }}>{s.num}</span>
                  <span className="text-[9px] font-bold mt-0.5" style={{ color: '#222222' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (App Dashboard Card) - Desktop Only */}
          <div data-reveal="scale" className="slow hidden md:block md:col-span-5 w-full">
            <div className="rounded-3xl overflow-hidden p-4 sm:p-5"
              style={{ background: 'white', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#16a34a' }} />
                  <span className="text-[11px] font-bold text-slate-400">Admin Online</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ef4444' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#f59e0b' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#22c55e' }} />
                </div>
              </div>

              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Layanan Tersedia</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {services.map((s) => (
                  <button key={s.id} onClick={() => openWA(s.title)}
                    className="flex items-center gap-2.5 p-3 rounded-xl text-left transition-all active:scale-95 hover:shadow-sm"
                    style={{ background: `${s.color}07`, border: `1px solid ${s.color}18` }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${s.color}15` }}>
                      <div className="w-4 h-4" style={{ color: s.color }}>{s.icon}</div>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-800 leading-none">{s.title}</p>
                      <p className="text-[9px] text-slate-400 mt-0.5">{s.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>

              <button onClick={() => openWA("Tanya Layanan")}
                className="w-full py-3 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2"
                style={{ background: '#F62440' }}>
                <div className="w-4 h-4">{icons.bolt}</div>
                Hubungi Admin Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Desktop Only */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-slate-400 opacity-60 hover:opacity-100 transition-opacity duration-300 z-20">
          <span className="text-[9px] font-black uppercase tracking-widest text-[#222222]/50">Scroll Down</span>
          <div className="w-[20px] h-[32px] rounded-full border-2 border-[#222222]/20 flex justify-center p-1">
            <div className="w-[3px] h-[6px] bg-[#222222]/50 rounded-full animate-scroll-dot" />
          </div>
        </div>

        {/* Gradient fade ke light section di bawah */}
        <div className="absolute bottom-0 left-0 right-0 h-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #f8fafc)' }} />
      </section>

      {/* ── APP DASHBOARD CARD — Mobile Only ── */}
      <section className="relative px-4 py-12 md:hidden" style={{ background: '#f8fafc' }}>
        <div data-reveal="scale" className="slow relative z-10 max-w-lg mx-auto">
          <div className="rounded-3xl overflow-hidden p-4 sm:p-5"
            style={{ background: 'white', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#16a34a' }} />
                <span className="text-[11px] font-bold text-slate-400">Admin Online</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ef4444' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#f59e0b' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#22c55e' }} />
              </div>
            </div>

            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Layanan Tersedia</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {services.map((s) => (
                <button key={s.id} onClick={() => openWA(s.title)}
                  className="flex items-center gap-2.5 p-3 rounded-xl text-left transition-all active:scale-95 hover:shadow-sm"
                  style={{ background: `${s.color}07`, border: `1px solid ${s.color}18` }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${s.color}15` }}>
                    <div className="w-4 h-4" style={{ color: s.color }}>{s.icon}</div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-800 leading-none">{s.title}</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">{s.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>

            <button onClick={() => openWA("Tanya Layanan")}
              className="w-full py-3 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2"
              style={{ background: '#F62440' }}>
              <div className="w-4 h-4">{icons.bolt}</div>
              Hubungi Admin Sekarang
            </button>
          </div>
        </div>
      </section>

      <section id="layanan" className="py-20 px-4 scroll-mt-20" style={{ background: '#f1f5f9' }}>
        <div className="max-w-lg mx-auto md:max-w-5xl">
          <div data-reveal="up" className="mb-10 md:mb-16 md:text-center">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F62440' }}>Layanan Kami</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1 text-slate-900 leading-tight md:text-4xl">
              Solusi Lengkap untuk Segala Kebutuhan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <div key={service.id} data-reveal="up" className={`delay-${i + 1}`}>
                <ServiceCard service={service} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="form-pesan" className="py-20 px-4 scroll-mt-20 relative" style={{ background: 'white' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(246,36,64,0.05) 0%, transparent 60%)' }} />

        <div className="relative max-w-lg mx-auto md:max-w-5xl md:grid md:grid-cols-12 md:gap-12 md:items-center">
          <div data-reveal="up" className="mb-8 md:mb-0 md:col-span-6 md:pr-6">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F62440' }}>Pesan Layanan</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1 text-slate-900 leading-tight md:text-4xl">
              Minta Penawaran<br />Harga Gratis
            </h2>
            <p className="text-sm text-slate-500 mt-3 mb-6">Isi form di samping, pesan langsung terkirim ke WhatsApp kami.</p>
            
            {/* Trust factors for desktop only */}
            <div className="hidden md:block space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-[#F62440] flex-shrink-0">
                  {icons.check}
                </div>
                <span className="text-xs font-bold text-slate-700">Respon cepat kurang dari 5 menit</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-[#F62440] flex-shrink-0">
                  {icons.check}
                </div>
                <span className="text-xs font-bold text-slate-700">Estimasi harga transparan & bersahabat</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-[#F62440] flex-shrink-0">
                  {icons.check}
                </div>
                <span className="text-xs font-bold text-slate-700">Armada sendiri, bukan perantara / calo</span>
              </div>
            </div>
          </div>

          <div data-reveal="scale" className="rounded-3xl p-5 sm:p-6 md:col-span-6"
            style={{ background: 'white', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Nama Lengkap</label>
                <input type="text" name="nama" required value={formData.nama} onChange={handleInputChange}
                  placeholder="Contoh: Hendra Wijaya"
                  className="w-full px-4 py-3.5 rounded-xl text-sm text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#F62440] focus:bg-white focus:ring-4 focus:ring-[#F62440]/5 transition-all duration-200" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Alamat / Lokasi Proyek</label>
                <input type="text" name="lokasi" required value={formData.lokasi} onChange={handleInputChange}
                  placeholder="Contoh: Bintaro Sektor 9 / Jaksel"
                  className="w-full px-4 py-3.5 rounded-xl text-sm text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#F62440] focus:bg-white focus:ring-4 focus:ring-[#F62440]/5 transition-all duration-200" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Pilih Layanan</label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full px-4 py-3.5 pr-10 rounded-xl text-sm text-slate-800 bg-slate-50 border text-left flex items-center justify-between cursor-pointer transition-all duration-200 focus:outline-none ${
                      isDropdownOpen
                        ? 'border-[#F62440] bg-white ring-4 ring-[#F62440]/5'
                        : 'border-slate-200'
                    }`}
                  >
                    <span className="font-bold">{selectedOption.label}</span>
                    <div className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                      {icons.chevronDown}
                    </div>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-50 left-0 right-0 mt-2 rounded-2xl bg-white border border-slate-200/80 shadow-xl py-2 overflow-hidden animate-scale-up">
                      {servicesOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, layanan: opt.value }));
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-xs md:text-sm transition-colors flex items-center justify-between cursor-pointer font-bold ${
                            formData.layanan === opt.value
                              ? 'bg-red-50 text-[#F62440]'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-[#F62440]'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {formData.layanan === opt.value && (
                            <div className="w-4 h-4 text-[#F62440] flex items-center justify-center">
                              {icons.check}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Catatan (Opsional)</label>
                <textarea name="pesan" rows={3} value={formData.pesan} onChange={handleInputChange}
                  placeholder="Contoh: Butuh truk dobel, malam hari..."
                  className="w-full px-4 py-3.5 rounded-xl text-sm text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 resize-none focus:outline-none focus:border-[#F62440] focus:bg-white focus:ring-4 focus:ring-[#F62440]/5 transition-all duration-200" />
              </div>
              <button type="submit"
                className="w-full py-4 rounded-2xl text-white font-extrabold text-sm flex items-center justify-center gap-2.5" style={{ background: '#F62440' }}>
                <div className="w-5 h-5">{icons.whatsapp}</div>
                Kirim ke WhatsApp Sekarang
              </button>
            </form>
          </div>
        </div>
      </section>

      <section id="keunggulan" className="py-20 px-4 scroll-mt-20 relative" style={{ background: 'white' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom left, rgba(246,36,64,0.04) 0%, transparent 60%)' }} />
        
        <div className="relative max-w-lg mx-auto md:max-w-5xl">
          <div data-reveal="up" className="mb-10 md:mb-16 md:text-center">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F62440' }}>Keunggulan</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1 text-slate-900 leading-tight md:text-4xl">
              Kenapa Pilih Ammar Endung?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={i} data-reveal="up" className={`delay-${i + 1} flex items-start gap-4 p-4 rounded-2xl bg-slate-50 transition-all hover:bg-slate-100`}
                style={{ border: '1px solid rgba(0,0,0,0.04)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                   style={{ background: '#fff0f2', color: '#F62440' }}>
                  <div className="w-5 h-5">{f.icon}</div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1">{f.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 relative" style={{ background: '#f1f5f9' }}>
        <div className="max-w-lg mx-auto md:max-w-5xl">
          <div data-reveal="up" className="mb-10 md:mb-16 md:text-center">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F62440' }}>Cara Pemesanan</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1 text-slate-900 leading-tight md:text-4xl">
              4 Langkah Mudah Pesan Layanan Kami
            </h2>
          </div>

          <div className="space-y-0 md:space-y-0 md:grid md:grid-cols-4 md:gap-6">
            {[
              { step: "01", title: "Hubungi Admin Kami", desc: "Chat WhatsApp atau telepon langsung. Jelaskan kebutuhan Anda.", delay: "delay-1" },
              { step: "02", title: "Kirim Foto & Estimasi", desc: "Foto puing/barang dikirim ke WA, kami langsung beri estimasi harga.", delay: "delay-2" },
              { step: "03", title: "Armada Langsung Meluncur", desc: "Setelah sepakat harga & jadwal, tim dan armada segera berangkat.", delay: "delay-3" },
              { step: "04", title: "Beres, Baru Bayar", desc: "Selesai angkut, lokasi rapi. Pembayaran dilakukan setelah pekerjaan tuntas.", delay: "delay-4" },
            ].map((item, idx, arr) => (
              <div key={idx} data-reveal="up" className={item.delay + " flex gap-4 md:flex-col md:gap-3 relative"}>
                {/* Vertical connector line (mobile) */}
                {idx < arr.length - 1 && (
                  <div className="absolute left-[19px] top-10 bottom-0 w-px bg-slate-200 md:hidden" />
                )}
                {/* Horizontal connector line (desktop) */}
                {idx < arr.length - 1 && (
                  <div className="hidden md:block absolute left-10 right-[-24px] top-5 h-px bg-slate-300 z-0" />
                )}
                
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0 z-10"
                  style={{ background: '#F62440' }}>
                  {item.step}
                </div>
                <div className="pb-8 md:pb-0">
                  <h3 className="text-sm font-bold text-slate-800 mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => openWA("Pesan Layanan")}
            className="w-full py-4 rounded-2xl text-white font-extrabold text-sm flex items-center justify-center gap-2.5 mt-8 md:mt-12" style={{ background: '#F62440' }}>
            <div className="w-5 h-5">{icons.whatsapp}</div>
            Mulai Pesan Sekarang
          </button>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden" style={{ background: 'white' }}>
        <div className="px-4 max-w-lg mx-auto mb-8 md:max-w-5xl md:mb-12">
          <span data-reveal="up" className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F62440' }}>Testimoni</span>
          <div className="flex items-end justify-between mt-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight md:text-4xl">
              Kata Pelanggan Kami
            </h2>
            <div className="flex gap-2 md:hidden">
              <button onClick={() => scrollReviews("left")} className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100">
                <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button onClick={() => scrollReviews("right")} className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100">
                <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div ref={reviewsRef} className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-3 md:max-w-5xl md:mx-auto md:overflow-visible">
          {reviews.map((r, i) => (
            <div key={i} data-reveal="up" className={`delay-${i + 1} snap-start flex-shrink-0 md:snap-none md:w-full`}>
              <ReviewCard review={r} />
            </div>
          ))}
        </div>
      </section>

      <section id="area" className="py-20 px-4 scroll-mt-20" style={{ background: '#f1f5f9' }}>
        <div className="max-w-lg mx-auto md:max-w-5xl">
          <div data-reveal="up" className="mb-10 md:mb-16 md:text-center">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F62440' }}>Cakupan Wilayah</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1 text-slate-900 leading-tight md:text-4xl">
              Melayani Seluruh Jabodetabek
            </h2>
            <p className="text-xs text-slate-500 mt-2">Standby di beberapa pos agar cepat sampai lokasi Anda.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {areas.map((area, i) => (
              <div key={i} data-reveal="scale" className={`delay-${i + 1} rounded-2xl p-5 transition-all duration-300`}
                style={{ background: 'white', border: `1px solid ${area.color}10`, boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: `${area.color}10` }}>
                    <div className="w-4 h-4" style={{ color: area.color }}>{icons.map}</div>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-800">{area.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {area.areas.map((a) => (
                    <span key={a} className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-slate-500 bg-slate-100">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOKASI UTAMA & GOOGLE MAPS ── */}
      <section id="lokasi" className="py-20 px-4 scroll-mt-20 relative" style={{ background: 'white' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom right, rgba(246,36,64,0.03) 0%, transparent 60%)' }} />

        <div className="relative max-w-lg mx-auto md:max-w-6xl md:grid md:grid-cols-12 md:gap-12 md:items-center">
          {/* Left Column: Alamat */}
          <div data-reveal="up" className="mb-8 md:mb-0 md:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F62440' }}>Lokasi Kami</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1 text-slate-900 leading-tight md:text-4xl">
              Pool Armada &<br />Alamat Utama
            </h2>
            <p className="text-sm text-slate-500 mt-4 leading-relaxed">
              Kami berpusat di Bintaro, Pesanggrahan, Jakarta Selatan. Lokasi strategis kami memudahkan armada meluncur cepat ke seluruh area Jakarta Barat, Jakarta Selatan, Tangerang, dan sekitarnya.
            </p>
            
            <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4" style={{ borderColor: 'rgba(0,0,0,0.03)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#fff0f2', color: '#F62440' }}>
                <div className="w-5 h-5">{icons.map}</div>
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Alamat Pool</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-bold">
                  Jl. Masjid Al Muflihun, RT.4/RW.10, Bintaro, Kec. Pesanggrahan, Kota Jakarta Selatan, Jakarta 12330
                </p>
              </div>
            </div>

            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Jasa+Buang+Puing+Ammar+Endung,+Bintaro,+Pesanggrahan,+South+Jakarta"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              style={{ background: '#222222' }}>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
              Petunjuk Arah (Google Maps)
            </a>
          </div>

          {/* Right Column: Google Maps Iframe */}
          <div data-reveal="scale" className="slow md:col-span-7 rounded-3xl overflow-hidden shadow-lg border border-slate-200/60 h-[320px] md:h-[400px] w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d63398.85726856982!2d107.03339519999999!3d-6.71744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x2e69f1005f19c769%3A0x266458439b9232d0!2sJasa%20Buang%20Puing%20Ammar%20Endung%2C%20PQV8%2BRXG%2C%20Jl.%20Masjid%20Al%20Muflihun%2C%20RT.4%2FRW.10%2C%20Bintaro%2C%20Pesanggrahan%2C%20South%20Jakarta%20City%2C%20Jakarta%2012330!3m2!1d-6.2553564!2d106.767471!5e0!3m2!1sid!2sid!4v1785635422017!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4 scroll-mt-20" style={{ background: 'white' }}>
        <div className="max-w-lg mx-auto md:max-w-5xl md:grid md:grid-cols-12 md:gap-12 md:items-start">
          <div data-reveal="up" className="mb-8 md:mb-0 md:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#F62440' }}>FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1 text-slate-900 leading-tight md:text-4xl">
              Pertanyaan yang<br />Sering Diajukan
            </h2>
            <p className="text-sm text-slate-500 mt-4 hidden md:block leading-relaxed">
              Punya pertanyaan lain seputar layanan kami? Hubungi kami langsung di WhatsApp untuk respons cepat 24 jam.
            </p>
          </div>

          <div className="space-y-2 md:col-span-7">
            {faqs.map((faq, i) => (
              <div key={i} data-reveal="up" className={`delay-${i + 1} rounded-2xl overflow-hidden`}
                style={{
                  background: activeFaq === i ? '#fff0f2' : '#f8fafc',
                  border: activeFaq === i ? '1px solid #ffd1d6' : '1px solid rgba(0,0,0,0.05)'
                }}>
                <button className="w-full px-5 py-4 flex items-center justify-between text-left gap-3"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span className="text-sm font-bold text-slate-800 leading-tight">{faq.q}</span>
                  <div className={`w-5 h-5 flex-shrink-0 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} style={{ color: '#F62440' }}>
                    {icons.chevronDown}
                  </div>
                </button>
                {activeFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-xs text-slate-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 relative overflow-hidden" style={{ background: '#F62440' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(255,255,255,0.12) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.08), transparent)' }} />
        
        <div className="relative max-w-lg mx-auto text-center md:max-w-3xl">
          <div data-reveal="scale" className="slow inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}>
            <div className="w-8 h-8 text-white">{icons.bolt}</div>
          </div>

          <h2 data-reveal="up" className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight mb-4 text-white">
            Puing Menumpuk Bikin Pusing?
          </h2>
          <p data-reveal="up" className="delay-1 text-sm leading-relaxed mb-8 max-w-sm mx-auto text-blue-500" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Biar Ammar Endung yang bereskan! Harga terjangkau, pengerjaan cepat & rapi bersih 100%.
          </p>

          <div data-reveal="up" className="delay-2 flex flex-col sm:flex-row gap-3 max-w-sm sm:max-w-md md:max-w-lg mx-auto">
            <button onClick={() => openWA("Kontak Cepat CTA")}
              className="flex-1 py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2.5 cursor-pointer"
              style={{ background: 'white', color: '#F62440' }}>
              <div className="w-5 h-5">{icons.whatsapp}</div>
              Hubungi Admin (24 Jam)
            </button>
            <a href={`tel:+${WHATSAPP_NUMBER}`}
              className="flex-1 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
              style={{ background: '#222222', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div className="w-4 h-4">{icons.phone}</div>
              Telepon Langsung
            </a>
          </div>
        </div>
      </section>

      <footer className="py-16 px-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#222222' }}>
        <div className="max-w-lg mx-auto md:max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            {/* Column 1: Logo & About */}
            <div className="md:col-span-4">
              <div className="mb-6">
                <Image
                  src="/logo.svg"
                  alt={`${BUSINESS_NAME} - Jasa Buang Puing`}
                  width={120}
                  height={35}
                  priority
                  className="h-8 w-auto object-contain brightness-0 invert"
                />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Spesialis pembuangan puing renovasi, jasa pindahan, dan angkut tanah merah murah di Bintaro, Tangsel & Jakarta.
              </p>
            </div>

            {/* Column 2: Layanan */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">Layanan</h4>
              <ul className="space-y-2">
                {["Buang Puing", "Angkut Barang", "Urugan Tanah", "Bongkar Bangunan"].map((s) => (
                  <li key={s}>
                    <button onClick={() => openWA(s)} className="text-xs text-slate-400 hover:text-red-500 transition-colors text-left cursor-pointer">{s}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Area Utama */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">Area Utama</h4>
              <ul className="space-y-2">
                {["Bintaro Sektor 1-9", "Tangerang Selatan", "Jakarta Selatan", "Jabodetabek"].map((a) => (
                  <li key={a}><span className="text-xs text-slate-500">{a}</span></li>
                ))}
              </ul>
            </div>

            {/* Column 4: Hubungi Kami */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4">Hubungi Kami</h4>
              <ul className="space-y-3">
                <li>
                  <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1.5 font-bold">
                    <div className="w-3.5 h-3.5">{icons.phone}</div>
                    0889-8518-5962
                  </a>
                </li>
                <li>
                  <button onClick={() => openWA("Footer WA")} className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1.5 font-bold text-left cursor-pointer">
                    <div className="w-3.5 h-3.5">{icons.whatsapp}</div>
                    Chat Admin 24 Jam
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <p className="text-[10px] text-slate-500">© {new Date().getFullYear()} {BUSINESS_NAME}. All Rights Reserved.</p>
            <div className="flex gap-4">
              <button onClick={() => setModalType("terms")} className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">Syarat & Ketentuan</button>
              <button onClick={() => setModalType("privacy")} className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">Kebijakan Privasi</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WA BUTTON (Desktop) ──────────────────── */}
      <button
        onClick={() => openWA("WA Float Desktop")}
        className="hidden md:flex fixed bottom-8 right-8 z-50 w-14 h-14 rounded-2xl items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #F62440, #d61c35)',
          boxShadow: '0 0 16px rgba(246,36,64,0.5)', }}
        aria-label="Chat WhatsApp">
        <div className="w-7 h-7">{icons.whatsapp}</div>
      </button>

      {/* ── MOBILE BOTTOM TAB BAR ─────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-4 pt-2">
        <div className="rounded-2xl flex items-center justify-around py-2.5 px-2"
          style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 -2px 20px rgba(0,0,0,0.08)' }}>
          
          {/* Home */}
          <a href="#beranda" onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${activeTab === "home" ? "tab-active" : "text-slate-400"}`}>
            <div className="w-5 h-5">{icons.home}</div>
            <span className="text-[9px] font-bold">Home</span>
          </a>

          {/* Layanan */}
          <a href="#layanan" onClick={() => setActiveTab("layanan")}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${activeTab === "layanan" ? "tab-active" : "text-slate-400"}`}>
            <div className="w-5 h-5">{icons.grid}</div>
            <span className="text-[9px] font-bold">Layanan</span>
          </a>

          {/* WA Center Button */}
          <button onClick={() => openWA("Tab WA")}
            className="relative -top-4 flex flex-col items-center justify-center w-14 h-14 rounded-2xl text-white transition-all active:scale-95 glow-ring"
            style={{ background: 'linear-gradient(135deg, #F62440, #d61c35)', boxShadow: '0 4px 24px rgba(246,36,64,0.5)' }}>
            <div className="w-6 h-6">{icons.whatsapp}</div>
          </button>

          {/* Area */}
          <a href="#area" onClick={() => setActiveTab("area")}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${activeTab === "area" ? "tab-active" : "text-slate-400"}`}>
            <div className="w-5 h-5">{icons.map}</div>
            <span className="text-[9px] font-bold">Area</span>
          </a>

          {/* FAQ */}
          <a href="#faq" onClick={() => setActiveTab("faq")}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${activeTab === "faq" ? "tab-active" : "text-slate-400"}`}>
            <div className="w-5 h-5">{icons.shield}</div>
            <span className="text-[9px] font-bold">FAQ</span>
          </a>

        </div>
      </div>

      {/* ── TERMS & PRIVACY MODAL ─────────────────────────── */}
      {modalType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all"
          onClick={() => setModalType(null)}>
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b pb-4 mb-4" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                {modalType === "terms" ? "Syarat & Ketentuan" : "Kebijakan Privasi"}
              </h3>
              <button onClick={() => setModalType(null)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            
            <div className="text-xs text-slate-600 space-y-4 leading-relaxed">
              {modalType === "terms" ? (
                <>
                  <p>Selamat datang di <strong>{BUSINESS_NAME}</strong>. Dengan menggunakan layanan pengangkutan kami, Anda menyetujui ketentuan berikut:</p>
                  
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">1. Ruang Lingkup Layanan</h4>
                    <p>Layanan kami mencakup pembuangan puing sisa konstruksi/renovasi bangunan, pengangkutan tanah merah/urugan, pembersihan lahan, angkut barang pindahan, serta jasa bongkar bangunan ringan.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">2. Sistem Pembayaran</h4>
                    <p>Sistem pembayaran kami menggunakan prinsip "Beres, Baru Bayar". Pelanggan wajib menyelesaikan pembayaran segera setelah pekerjaan pembersihan/pengangkutan di lokasi selesai secara tuntas, kecuali disepakati lain sebelumnya.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">3. Keabsahan Material</h4>
                    <p>Pelanggan wajib memastikan bahwa semua material yang diangkut bebas dari bahan berbahaya/beracun (B3), benda tajam ekstrim ilegal, atau limbah berbahaya lainnya yang melanggar hukum.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">4. Pembatalan Jadwal</h4>
                    <p>Pembatalan penugasan armada wajib diinformasikan minimal 3 jam sebelum waktu kedatangan yang telah disepakati untuk menghindari biaya operasional armada kosong.</p>
                  </div>
                </>
              ) : (
                <>
                  <p>Kami di <strong>{BUSINESS_NAME}</strong> berkomitmen penuh untuk menjaga kerahasiaan dan privasi data pribadi Anda:</p>
                  
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">1. Pengumpulan Informasi</h4>
                    <p>Kami hanya mengumpulkan data yang dikirimkan secara sukarela melalui formulir pemesanan, seperti Nama, Alamat/Lokasi Proyek, Jenis Layanan, serta nomor telepon/WhatsApp Anda.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">2. Penggunaan Informasi</h4>
                    <p>Informasi yang Anda berikan digunakan murni untuk memproses penawaran estimasi harga secara akurat, menghubungi Anda kembali, serta mengoordinasikan pengiriman armada menuju lokasi proyek Anda.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">3. Kerahasiaan Data</h4>
                    <p>Kami menjamin bahwa data pribadi Anda tidak akan pernah dijual, disewakan, atau dibagikan kepada pihak ketiga mana pun di luar kebutuhan operasional pengangkutan kami.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">4. Hak Akses Data</h4>
                    <p>Anda berhak meminta perubahan atau penghapusan data kontak Anda dari catatan administrasi kami kapan saja dengan menghubungi kami via WhatsApp.</p>
                  </div>
                </>
              )}
            </div>
            
            <button onClick={() => setModalType(null)} className="w-full mt-6 py-3 rounded-xl text-white font-extrabold text-[10px] uppercase tracking-wider transition-all cursor-pointer" style={{ background: '#F62440' }}>
              Saya Mengerti & Setuju
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
