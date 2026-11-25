import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import { AlertTriangle, RefreshCw, Globe } from "lucide-react";

import Header from "./components/Header";
import Controls from "./components/Controls";
import LoadingState from "./components/LoadingState";
import NewspaperPage from "./components/NewspaperPage";
import StoryModal from "./components/StoryModal";
import Toast from "./components/Toast";

import { fetchOnThisDay } from "./utils/wikimedia";
import { MONTHS_TR, THEMES } from "./utils/vintageHelpers";

function getInitialParams() {
  const params = new URLSearchParams(window.location.search);
  const today = new Date();

  const rawMonth = Number(params.get("month"));
  const month = rawMonth >= 1 && rawMonth <= 12 ? rawMonth : today.getMonth() + 1;
  const maxDay = MONTHS_TR.find((m) => m.value === month)?.days || 31;

  const rawDay = Number(params.get("day"));
  const day = rawDay >= 1 && rawDay <= maxDay ? rawDay : today.getDate();

  const rawTheme = params.get("theme");
  const theme = rawTheme && THEMES[rawTheme] ? rawTheme : "sepia";

  const rawLang = params.get("lang");
  const lang = rawLang === "en" ? "en" : "tr";

  return {
    month,
    day,
    theme,
    lang,
    birthYear: params.get("year") || "",
    personName: params.get("name") || "",
    paperTitle: params.get("title") || "Tarihin Sesi",
  };
}

export default function App() {
  const initial = getInitialParams();

  const [month, setMonth] = useState(initial.month);
  const [day, setDay] = useState(initial.day);
  const [theme, setTheme] = useState(initial.theme);
  const [lang, setLang] = useState(initial.lang);
  const [agingEffect, setAgingEffect] = useState(true);

  const [personName, setPersonName] = useState(initial.personName);
  const [birthYear, setBirthYear] = useState(initial.birthYear);
  const [paperTitle, setPaperTitle] = useState(initial.paperTitle);
  const [customPhoto, setCustomPhoto] = useState(null);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const [selectedStory, setSelectedStory] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const newspaperRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3200);
  };

  const loadNewspaperData = async (targetMonth, targetDay, targetLang) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchOnThisDay(targetMonth, targetDay, targetLang);
      setData(result);
    } catch (err) {
      setError(err.message || "Gazete verileri alınırken beklenmeyen bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNewspaperData(month, day, lang);
  }, [month, day, lang]);

  const handleMonthChange = (newMonth) => {
    const maxDays = MONTHS_TR.find((m) => m.value === newMonth)?.days || 31;
    setMonth(newMonth);
    if (day > maxDays) setDay(maxDays);
  };

  const handleRandomDate = () => {
    const randomMonthObj = MONTHS_TR[Math.floor(Math.random() * MONTHS_TR.length)];
    const randomDay = Math.floor(Math.random() * randomMonthObj.days) + 1;
    setMonth(randomMonthObj.value);
    setDay(randomDay);
  };

  // Seçilen alt haberi ana manşet ile yer değiştir
  const handleMakeHeadline = (storyId) => {
    if (!data?.secondaryStories) return;
    const targetStory = data.secondaryStories.find((s) => s.id === storyId);
    if (!targetStory) return;

    const updatedSecondary = data.secondaryStories.map((s) =>
      s.id === storyId ? data.headline : s
    );

    setData({
      ...data,
      headline: targetStory,
      secondaryStories: updatedSecondary.filter(Boolean),
    });
    showToast("Ana manşet başarıyla güncellendi!");
  };

  // Paylaşılabilir URL kopyala
  const handleCopyShareLink = async () => {
    const params = new URLSearchParams();
    params.set("day", String(day));
    params.set("month", String(month));
    params.set("theme", theme);
    params.set("lang", lang);
    if (birthYear.trim()) params.set("year", birthYear.trim());
    if (personName.trim()) params.set("name", personName.trim());
    if (paperTitle.trim() && paperTitle !== "Tarihin Sesi") {
      params.set("title", paperTitle.trim());
    }

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast("Özel gazete bağlantısı panoya kopyalandı!");
    } catch {
      showToast("Bağlantı kopyalanamadı, adres çubuğunu kullanabilirsiniz.");
    }
  };

  // Yüksek kaliteli PNG indir
  const handleDownload = async () => {
    if (!newspaperRef.current) return;
    setIsDownloading(true);
    try {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      const canvas = await html2canvas(newspaperRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: THEMES[theme]?.exportBg || "#f4ecd8",
      });

      const link = document.createElement("a");
      const mm = String(month).padStart(2, "0");
      const dd = String(day).padStart(2, "0");
      const safeName = personName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
      const fileName = safeName
        ? `${safeName}-gazetesi-${dd}-${mm}.png`
        : `tarihin-sesi-${dd}-${mm}-${theme}.png`;

      link.download = fileName;
      link.href = canvas.toDataURL("image/png");
      link.click();
      showToast("Gazeteniz yüksek kalitede PNG olarak indirildi!");
    } catch (err) {
      console.error("PNG dışa aktarma hatası:", err);
      showToast("Görsel dışa aktarılırken bir hata oluştu.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const showEnSuggestion =
    !isLoading &&
    !error &&
    data &&
    lang === "tr" &&
    (!data.hasHeadlineImage || data.totalCount < 5);

  return (
    <div className="min-h-screen desk-surface text-[#e8e0d0] flex flex-col">
      <Header onCopyShareLink={handleCopyShareLink} />

      <main className="flex-1">
        <Controls
          month={month}
          day={day}
          onMonthChange={handleMonthChange}
          onDayChange={setDay}
          onRandomDate={handleRandomDate}
          theme={theme}
          onThemeChange={setTheme}
          lang={lang}
          onLangChange={setLang}
          agingEffect={agingEffect}
          onAgingToggle={() => setAgingEffect((prev) => !prev)}
          personName={personName}
          onPersonNameChange={setPersonName}
          birthYear={birthYear}
          onBirthYearChange={setBirthYear}
          paperTitle={paperTitle}
          onPaperTitleChange={setPaperTitle}
          customPhoto={customPhoto}
          onPhotoUpload={setCustomPhoto}
          onPhotoRemove={() => setCustomPhoto(null)}
          onDownload={handleDownload}
          onPrint={handlePrint}
          isDownloading={isDownloading}
          isLoading={isLoading}
        />

        {showEnSuggestion && (
          <div className="no-print max-w-5xl mx-auto px-4 mb-4">
            <div className="bg-[#2a2621] border border-[#5c5347] px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-sm text-[#c4b8a4]">
              <span>
                Bu tarihte Türkçe arşivde görsel veya haber sayısı sınırlı görünüyor. Daha zengin bir baskı için İngilizce kaynağa geçebilirsiniz.
              </span>
              <button
                type="button"
                onClick={() => setLang("en")}
                className="btn-vintage btn-vintage-primary inline-flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5" />
                İngilizce (EN) Arşive Geç
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <div className="max-w-3xl mx-auto my-10 px-4">
            <div className="bg-[#f3ebd8] text-[#1e1b18] border-4 border-double border-[#3b2f24] p-8 text-center">
              <AlertTriangle className="w-10 h-10 mx-auto mb-3 text-red-800" />
              <h2 className="font-headline text-2xl font-bold mb-2">
                Telgraf Hattı Kesildi — Baskı Yapılamadı
              </h2>
              <p className="font-body text-sm text-[#5c4a38] mb-6">{error}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => loadNewspaperData(month, day, lang)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e1b18] text-[#f3ebd8] text-sm font-medium border-2 border-[#1e1b18] hover:opacity-90 transition"
                >
                  <RefreshCw className="w-4 h-4" />
                  Tekrar Dene
                </button>
                {lang === "tr" && (
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#1e1b18] text-[#1e1b18] text-sm font-medium hover:bg-[#1e1b18]/10 transition"
                  >
                    <Globe className="w-4 h-4" />
                    İngilizce Kaynağı Dene
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          data && (
            <NewspaperPage
              ref={newspaperRef}
              data={data}
              month={month}
              day={day}
              birthYear={birthYear}
              personName={personName}
              paperTitle={paperTitle}
              customPhoto={customPhoto}
              themeKey={theme}
              lang={lang}
              agingEffect={agingEffect}
              onSelectStory={setSelectedStory}
              onMakeHeadline={handleMakeHeadline}
            />
          )
        )}
      </main>

      <StoryModal
        story={selectedStory}
        themeKey={theme}
        onClose={() => setSelectedStory(null)}
        onMakeHeadline={handleMakeHeadline}
        isCurrentHeadline={selectedStory?.id === data?.headline?.id}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </div>
  );
}
