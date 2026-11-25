import { useState, useRef } from "react";
import {
  Calendar,
  Shuffle,
  Download,
  Printer,
  Palette,
  Globe,
  Loader2,
  Sparkles,
  User,
  ImagePlus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Layers,
} from "lucide-react";
import { MONTHS_TR, THEMES, PAPER_PRESETS } from "../utils/vintageHelpers";

export default function Controls({
  month,
  day,
  onMonthChange,
  onDayChange,
  onRandomDate,
  theme,
  onThemeChange,
  lang,
  onLangChange,
  agingEffect,
  onAgingToggle,
  personName,
  onPersonNameChange,
  birthYear,
  onBirthYearChange,
  paperTitle,
  onPaperTitleChange,
  customPhoto,
  onPhotoUpload,
  onPhotoRemove,
  onDownload,
  onPrint,
  isDownloading,
  isLoading,
}) {
  const [showPersonalize, setShowPersonalize] = useState(true);
  const fileInputRef = useRef(null);

  const currentMonthObj = MONTHS_TR.find((m) => m.value === month) || MONTHS_TR[0];
  const daysArray = Array.from({ length: currentMonthObj.days }, (_, i) => i + 1);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      onPhotoUpload(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="no-print max-w-5xl mx-auto px-4 pt-5 pb-3">
      <div className="border border-[#3a3530]/60 bg-[#2a2621]/80 p-4 space-y-3">
        {/* ── 1. SATIR: TARİH + RASTGELE + YAZDIR & İNDİR ── */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#8a7e6e] font-semibold mr-0.5">
              <Calendar className="w-3.5 h-3.5" />
              Tarih:
            </span>

            <select
              aria-label="Gün seçin"
              value={day}
              onChange={(e) => onDayChange(Number(e.target.value))}
              className="input-vintage w-16"
            >
              {daysArray.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select
              aria-label="Ay seçin"
              value={month}
              onChange={(e) => onMonthChange(Number(e.target.value))}
              className="input-vintage w-28"
            >
              {MONTHS_TR.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>

            <button
              type="button"
              onClick={onRandomDate}
              disabled={isLoading}
              className="btn-vintage inline-flex items-center gap-1.5"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Beni Şaşırt</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onPrint}
              disabled={isLoading}
              className="btn-vintage inline-flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Yazdır</span>
            </button>

            <button
              type="button"
              onClick={onDownload}
              disabled={isLoading || isDownloading}
              className="btn-vintage btn-vintage-primary inline-flex items-center gap-1.5"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Hazırlanıyor…</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>İndir (PNG)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── 2. SATIR: KİŞİSELLEŞTİRME STÜDYOSU ── */}
        <div className="border-t border-[#3a3530]/50 pt-3">
          <button
            type="button"
            onClick={() => setShowPersonalize((prev) => !prev)}
            className="flex items-center justify-between w-full text-left text-[10px] uppercase tracking-[0.2em] text-[#a09080] font-bold mb-2"
          >
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Kişiselleştirme Stüdyosu
            </span>
            {showPersonalize ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {showPersonalize && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              {/* Ad Soyad */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#6b6050] mb-1">
                  Doğum Günü Sahibi
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-[#5c5347] absolute left-2 top-2.5" />
                  <input
                    type="text"
                    value={personName}
                    onChange={(e) => onPersonNameChange(e.target.value)}
                    placeholder="Ahmet Yılmaz"
                    maxLength={40}
                    className="input-vintage w-full pl-7"
                  />
                </div>
              </div>

              {/* Doğum Yılı */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#6b6050] mb-1">
                  Doğum Yılı
                </label>
                <input
                  type="number"
                  min={1850}
                  max={new Date().getFullYear()}
                  value={birthYear}
                  onChange={(e) => onBirthYearChange(e.target.value)}
                  placeholder="1995"
                  className="input-vintage w-full"
                />
              </div>

              {/* Gazete Adı */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#6b6050] mb-1">
                  Gazete Adı
                </label>
                <input
                  type="text"
                  list="paper-presets"
                  value={paperTitle}
                  onChange={(e) => onPaperTitleChange(e.target.value)}
                  placeholder="Tarihin Sesi"
                  maxLength={30}
                  className="input-vintage w-full"
                />
                <datalist id="paper-presets">
                  {PAPER_PRESETS.map((preset) => (
                    <option key={preset} value={preset} />
                  ))}
                </datalist>
              </div>

              {/* Fotoğraf Yükleme */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#6b6050] mb-1">
                  Şeref Konuğu Fotoğrafı
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-vintage flex-1 inline-flex items-center justify-center gap-1.5"
                  >
                    <ImagePlus className="w-3.5 h-3.5" />
                    <span>{customPhoto ? "Değiştir" : "Fotoğraf Ekle"}</span>
                  </button>
                  {customPhoto && (
                    <button
                      type="button"
                      onClick={() => {
                        onPhotoRemove();
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="btn-vintage !border-red-900/50 !text-red-400 p-2"
                      title="Fotoğrafı kaldır"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── 3. SATIR: TEMA + ESKİTME + DİL ── */}
        <div className="border-t border-[#3a3530]/50 pt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-[#8a7e6e] font-semibold mr-1">
              <Palette className="w-3 h-3" />
              Baskı:
            </span>
            {Object.values(THEMES).map((t) => {
              const active = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onThemeChange(t.id)}
                  className={`btn-vintage !text-[10px] !py-1 !px-2.5 ${
                    active ? "btn-vintage-active" : ""
                  }`}
                >
                  {t.name}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Eskitme Efekti */}
            <button
              type="button"
              onClick={onAgingToggle}
              className={`btn-vintage !text-[10px] inline-flex items-center gap-1.5 ${
                agingEffect ? "btn-vintage-active" : ""
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Eskitme: {agingEffect ? "Açık" : "Kapalı"}</span>
            </button>

            {/* Dil Seçici */}
            <div className="flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-[#6b6050]" />
              <div className="inline-flex border border-[#4a4238] overflow-hidden">
                <button
                  type="button"
                  onClick={() => onLangChange("tr")}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition ${
                    lang === "tr"
                      ? "bg-[#d4c9b8] text-[#1e1b18]"
                      : "bg-transparent text-[#8a7e6e] hover:text-[#c4b8a4]"
                  }`}
                >
                  TR
                </button>
                <button
                  type="button"
                  onClick={() => onLangChange("en")}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition ${
                    lang === "en"
                      ? "bg-[#d4c9b8] text-[#1e1b18]"
                      : "bg-transparent text-[#8a7e6e] hover:text-[#c4b8a4]"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
