export const MONTHS_TR = [
  { value: 1, label: "Ocak", days: 31 },
  { value: 2, label: "Şubat", days: 29 },
  { value: 3, label: "Mart", days: 31 },
  { value: 4, label: "Nisan", days: 30 },
  { value: 5, label: "Mayıs", days: 31 },
  { value: 6, label: "Haziran", days: 30 },
  { value: 7, label: "Temmuz", days: 31 },
  { value: 8, label: "Ağustos", days: 31 },
  { value: 9, label: "Eylül", days: 30 },
  { value: 10, label: "Ekim", days: 31 },
  { value: 11, label: "Kasım", days: 30 },
  { value: 12, label: "Aralık", days: 31 },
];

export const PAPER_PRESETS = [
  "Tarihin Sesi",
  "Zamanın Aynası",
  "Günün Arşivi",
  "Vakit Gazetesi",
  "Cihan Postası",
];

export const THEMES = {
  sepia: {
    id: "sepia",
    name: "1920'ler Sepya",
    paperBg: "bg-[#f4ecd8]",
    text: "text-[#2b2118]",
    mutedText: "text-[#5c4a38]",
    border: "border-[#3b2f24]",
    subtleBorder: "border-[#3b2f24]/30",
    boxBg: "bg-[#ebe0c5]/75",
    accentBg: "bg-[#3b2f24]/10",
    imgFilter: "sepia-[.65] contrast-125 brightness-95",
    badgeBg: "bg-[#2b2118] text-[#f4ecd8]",
    stampBorder: "border-[#7c2d12] text-[#7c2d12]",
    exportBg: "#f4ecd8",
  },
  classic: {
    id: "classic",
    name: "Klasik Siyah-Beyaz",
    paperBg: "bg-[#f0efe9]",
    text: "text-[#1a1a1a]",
    mutedText: "text-[#4a4a4a]",
    border: "border-[#1a1a1a]",
    subtleBorder: "border-[#1a1a1a]/30",
    boxBg: "bg-[#e5e3da]/75",
    accentBg: "bg-black/5",
    imgFilter: "grayscale contrast-125",
    badgeBg: "bg-[#1a1a1a] text-[#f0efe9]",
    stampBorder: "border-[#1a1a1a] text-[#1a1a1a]",
    exportBg: "#f0efe9",
  },
  sixties: {
    id: "sixties",
    name: "1960'lar Matbaa",
    paperBg: "bg-[#e8e6df]",
    text: "text-[#1f2421]",
    mutedText: "text-[#49524c]",
    border: "border-[#25302a]",
    subtleBorder: "border-[#25302a]/30",
    boxBg: "bg-[#dcd9cf]/80",
    accentBg: "bg-[#25302a]/10",
    imgFilter: "grayscale-[.7] contrast-115 sepia-[.15]",
    badgeBg: "bg-[#25302a] text-[#e8e6df]",
    stampBorder: "border-[#25302a] text-[#25302a]",
    exportBg: "#e8e6df",
  },
  modern: {
    id: "modern",
    name: "Modern Baskı",
    paperBg: "bg-[#fcfcfa]",
    text: "text-slate-900",
    mutedText: "text-slate-600",
    border: "border-slate-900",
    subtleBorder: "border-slate-300",
    boxBg: "bg-slate-100/80",
    accentBg: "bg-slate-900/5",
    imgFilter: "contrast-105 saturate-90",
    badgeBg: "bg-slate-900 text-white",
    stampBorder: "border-rose-800 text-rose-800",
    exportBg: "#fcfcfa",
  },
};

/**
 * Gün ve aya göre burç ve element bilgisi döndürür.
 */
export function getZodiacSign(month, day) {
  const signs = [
    { name: "Oğlak", element: "Toprak", endDay: 19 },
    { name: "Kova", element: "Hava", endDay: 18 },
    { name: "Balık", element: "Su", endDay: 20 },
    { name: "Koç", element: "Ateş", endDay: 19 },
    { name: "Boğa", element: "Toprak", endDay: 20 },
    { name: "İkizler", element: "Hava", endDay: 20 },
    { name: "Yengeç", element: "Su", endDay: 22 },
    { name: "Aslan", element: "Ateş", endDay: 22 },
    { name: "Başak", element: "Toprak", endDay: 22 },
    { name: "Terazi", element: "Hava", endDay: 22 },
    { name: "Akrep", element: "Su", endDay: 21 },
    { name: "Yay", element: "Ateş", endDay: 21 },
    { name: "Oğlak", element: "Toprak", endDay: 31 },
  ];

  const current = signs[month - 1];
  return day <= current.endDay ? current : signs[month];
}

/**
 * Doğum yılı girildiyse haftanın gününü, yaşı ve geçerliliği hesaplar.
 */
export function getBirthDayInfo(yearStr, month, day) {
  const year = Number(yearStr);
  const currentYear = new Date().getFullYear();

  if (!yearStr || Number.isNaN(year) || year < 1800 || year > currentYear) {
    return null;
  }

  const dateObj = new Date(year, month - 1, day);
  // Artık yıl kontrolü (örn: 29 Şubat 1995 gibi geçersiz tarihler için)
  if (dateObj.getMonth() !== month - 1 || dateObj.getDate() !== day) {
    return { year, weekday: null, age: currentYear - year, isInvalidLeap: true };
  }

  const weekdays = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];

  return {
    year,
    weekday: weekdays[dateObj.getDay()],
    age: currentYear - year,
    isInvalidLeap: false,
  };
}

const NOSTALGIA_ADS = [
  {
    tag: "TİCARİ İLAN",
    title: "Kraliyet Dolma Kalem Tamirhanesi",
    body: "Altın uçlu kalemleriniz itina ile onarılır, en halis çini mürekkepleri bulunur. Babıali Yokuşu No: 14.",
    price: "Muayene Ücretsizdir",
  },
  {
    tag: "DUYURU",
    title: "Şark Kıraathanesi & Okuma Salonu",
    body: "Her sabah taze çekilmiş kahve eşliğinde memleketin ve Avrupa'nın en yeni mecmuaları hizmetinizdedir.",
    price: "Sabah 06.00'dan İtibaren",
  },
  {
    tag: "FOTOĞRAFHANE",
    title: "Fevkalade Portre & Aile Hatırası",
    body: "En son sistem körüklü makinelerle solmayan sepya kartpostallar aynı gün teslim edilir.",
    price: "Düzinesi 25 Kuruş",
  },
  {
    tag: "MATBAA İLANI",
    title: "Özel Kartvizit & Davetiye Basımı",
    body: "Düğün, cemiyet ve hususi merasimler için kabartmalı yaldızlı baskılar özenle hazırlanır.",
    price: "Peşin Ödemede İndirim",
  },
  {
    tag: "SAATÇİ USTASI",
    title: "İsviçre Cep Saatleri Tamiratı",
    body: "Zemberek değişimi, kasa parlatma ve hassas ayar işleri garantili olarak yapılır.",
    price: "40 Yıllık Tecrübe",
  },
];

export function getNostalgiaAd(month, day) {
  const index = (month * 31 + day) % NOSTALGIA_ADS.length;
  return NOSTALGIA_ADS[index];
}
