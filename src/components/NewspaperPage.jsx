import { forwardRef } from "react";
import { ArrowUpCircle, BookOpen } from "lucide-react";
import {
  MONTHS_TR,
  THEMES,
  getZodiacSign,
  getBirthDayInfo,
  getNostalgiaAd,
} from "../utils/vintageHelpers";

const NewspaperPage = forwardRef(function NewspaperPage(
  {
    data,
    month,
    day,
    birthYear,
    personName,
    paperTitle,
    customPhoto,
    themeKey,
    lang,
    agingEffect,
    onSelectStory,
    onMakeHeadline,
  },
  ref
) {
  const theme = THEMES[themeKey] || THEMES.sepia;
  const monthLabel = MONTHS_TR.find((m) => m.value === month)?.label || "";
  const formattedDate = birthYear
    ? `${day} ${monthLabel.toUpperCase()} ${birthYear}`
    : `${day} ${monthLabel.toUpperCase()}`;

  const zodiac = getZodiacSign(month, day);
  const birthInfo = getBirthDayInfo(birthYear, month, day);
  const nostalgiaAd = getNostalgiaAd(month, day);
  const issueNumber = (Number(birthYear) || 1900) + month * 10 + day;

  const { headline, secondaryStories, births, deaths, holidays } = data;
  const colOneStories = secondaryStories.slice(0, 3);
  const colTwoStories = secondaryStories.slice(3, 6);

  const isExactBirthYear = (storyYear) =>
    birthInfo && Number(storyYear) === birthInfo.year;

  return (
    <div className="print-container max-w-5xl mx-auto px-4 pb-16">
      <article
        ref={ref}
        className={`print-newspaper paper-texture ${agingEffect ? "paper-aged" : ""} ${
          theme.paperBg
        } ${theme.text} border-4 border-double ${theme.border} p-5 sm:p-8 md:p-10 transition-colors duration-300`}
      >
        {/* ════════════ MASTHEAD ════════════ */}
        <header className="relative z-10 text-center">
          {/* Kişiselleştirilmiş Doğum Günü Bandı */}
          {personName.trim() && (
            <div
              className={`mb-3 py-1.5 px-3 ${theme.badgeBg} font-headline text-xs sm:text-sm uppercase tracking-[0.22em] font-bold`}
            >
              ★ {personName.trim().toUpperCase()} — DOĞUM GÜNÜ ÖZEL BASKISI ★
            </div>
          )}

          {/* Üst Meta Çizgisi */}
          <div
            className={`flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] font-body uppercase tracking-[0.18em] pb-2 border-b ${theme.subtleBorder}`}
          >
            <span>SAYI: NO. {issueNumber}</span>
            <span className="font-semibold">
              {holidays.length > 0 ? holidays[0] : "ÖZEL ARŞİV BASKISI"}
            </span>
            <span>FİYATI: 5 KURUŞ</span>
          </div>

          {/* Kulakçıklı Ana Başlık Alanı */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-3 py-4">
            {/* Sol Kulakçık */}
            <div
              className={`hidden md:flex flex-col justify-center md:col-span-3 border-[3px] border-double ${theme.border} p-2.5 text-center ${theme.accentBg}`}
            >
              <span className="font-headline text-[9px] uppercase tracking-[0.2em] font-bold">
                TAKVİM & BURÇ
              </span>
              <span className="font-body text-xs font-bold mt-0.5">
                {zodiac.name} Burcu
              </span>
              <span className={`font-body text-[10px] italic ${theme.mutedText} mt-0.5`}>
                {birthInfo?.weekday
                  ? `Doğum Günü: ${birthInfo.weekday}`
                  : `Element: ${zodiac.element}`}
              </span>
            </div>

            {/* Gotik Gazete Adı */}
            <div className="md:col-span-6">
              <h1 className="font-gothic text-5xl sm:text-6xl md:text-7xl tracking-wide leading-none">
                {paperTitle.trim() || "Tarihin Sesi"}
              </h1>
            </div>

            {/* Sağ Kulakçık */}
            <div
              className={`hidden md:flex flex-col justify-center md:col-span-3 border-[3px] border-double ${theme.border} p-2.5 text-center ${theme.accentBg}`}
            >
              <span className="font-headline text-[9px] uppercase tracking-[0.2em] font-bold">
                HAVA DURUMU
              </span>
              <span className="font-body text-xs font-bold mt-0.5">
                {birthInfo && birthInfo.age >= 0
                  ? `${birthInfo.age}. Yıl Hatırası`
                  : "Nadir Koleksiyon"}
              </span>
              <span className={`font-body text-[10px] italic ${theme.mutedText} mt-0.5`}>
                Tarih Kokuyor ☁
              </span>
            </div>
          </div>

          {/* Tarih ve Motto Şeridi */}
          <div
            className={`flex flex-wrap items-center justify-between gap-2 py-2 border-t-4 border-b-4 border-double ${theme.border} font-body text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em]`}
          >
            <span>
              {birthInfo?.weekday ? `${birthInfo.weekday.toUpperCase()} BASKISI` : "GÜNÜN ARŞİVİ"}
            </span>
            <span className="text-sm sm:text-base font-bold tracking-wider">{formattedDate}</span>
            <span>"GEÇMİŞİN İZİNDE, BUGÜNÜN BASKISI"</span>
          </div>
        </header>

        {/* ════════════ ŞEREF KONUĞU KUTUSU ════════════ */}
        {(personName.trim() || customPhoto) && (
          <section
            className={`relative z-10 mt-5 border-[3px] border-double ${theme.border} ${theme.boxBg} p-4 flex flex-col sm:flex-row items-center gap-4`}
          >
            {customPhoto && (
              <div className={`border-2 ${theme.border} p-1 bg-black/5 shrink-0`}>
                <img
                  src={customPhoto}
                  alt={personName || "Şeref konuğu"}
                  className={`w-24 h-28 sm:w-28 sm:h-32 object-cover ${theme.imgFilter}`}
                />
              </div>
            )}
            <div className="text-center sm:text-left">
              <span className="font-body text-[9px] uppercase tracking-[0.3em] font-bold block">
                GÜNÜN ŞEREF KONUĞU & KUTLAMA
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl font-bold mt-0.5">
                {personName.trim()
                  ? `Hoş Geldin ${personName.trim()}!`
                  : "Günün Özel Hatıra Portresi"}
              </h2>
              <p className={`font-body text-sm mt-1 leading-relaxed ${theme.mutedText}`}>
                {formattedDate} tarihinin iz bırakan olayları, manşetleri ve unutulmaz
                isimleri bu özel nüshada bir araya getirildi.
                {birthInfo?.weekday &&
                  ` Takvimler bir ${birthInfo.weekday} gününü gösterirken dünya tarihinde neler yaşandığını keşfedin.`}
              </p>
            </div>
          </section>
        )}

        {/* ════════════ ANA MANŞET ════════════ */}
        {headline && (
          <section className={`relative z-10 py-6 border-b-2 ${theme.border}`}>
            <div className="text-center mb-5">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span
                  className={`font-body text-[10px] uppercase tracking-[0.25em] ${theme.mutedText}`}
                >
                  {headline.year
                    ? `${headline.year} YILINDA BUGÜN — ANA MANŞET`
                    : "GÜNÜN MANŞETİ"}
                </span>
                {isExactBirthYear(headline.year) && (
                  <span
                    className={`border-2 ${theme.stampBorder} px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest`}
                  >
                    Doğum Yılınızda!
                  </span>
                )}
              </div>

              <h2
                onClick={() => onSelectStory(headline)}
                className="font-headline text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight cursor-pointer hover:underline decoration-1 underline-offset-4"
              >
                {headline.title || `${headline.year}: Tarihe Geçen Büyük Olay`}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {headline.image && (
                <figure className="md:col-span-7">
                  <div className={`border-2 ${theme.border} p-1 bg-black/5`}>
                    <img
                      src={headline.image}
                      alt={headline.title || "Ana manşet görseli"}
                      crossOrigin="anonymous"
                      className={`w-full max-h-[380px] object-cover ${theme.imgFilter}`}
                    />
                  </div>
                  {headline.title && (
                    <figcaption
                      className={`mt-1.5 text-[10px] font-body italic ${theme.mutedText} text-right`}
                    >
                      Arşiv Fotoğrafı — {headline.title}, {headline.year}
                    </figcaption>
                  )}
                </figure>
              )}

              <div className={headline.image ? "md:col-span-5" : "md:col-span-12"}>
                <p className="font-body text-base sm:text-lg leading-relaxed text-justify drop-cap">
                  {headline.text}
                </p>
                {headline.extract && (
                  <p
                    className={`mt-4 pt-3 border-t ${theme.subtleBorder} font-body text-sm leading-relaxed text-justify ${theme.mutedText}`}
                  >
                    {headline.extract}
                  </p>
                )}

                <button
                  type="button"
                  data-html2canvas-ignore="true"
                  onClick={() => onSelectStory(headline)}
                  className="no-print mt-4 inline-flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-wider underline underline-offset-4 hover:opacity-75"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Detayları ve Vikipedi Kaynağını Gör</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ════════════ 3 SÜTUNLU KLASİK GAZETE IZGARASI ════════════ */}
        <section
          className={`relative z-10 pt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 lg:divide-x ${theme.subtleBorder}`}
        >
          {/* Sütun 1 */}
          <div className="lg:pr-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-5">
              <h3
                className={`font-headline text-base font-bold uppercase tracking-wider pb-1.5 border-b-4 border-double ${theme.border}`}
              >
                Dünyadan & Tarihten
              </h3>

              {colOneStories.length > 0 ? (
                colOneStories.map((story) => (
                  <article
                    key={story.id}
                    className={`group pb-4 border-b last:border-b-0 ${theme.subtleBorder}`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-baseline gap-2 min-w-0">
                        <span className="font-headline font-bold text-lg shrink-0">
                          {story.year}
                        </span>
                        {story.title && (
                          <span
                            className={`font-body text-[10px] uppercase tracking-wider ${theme.mutedText} truncate`}
                          >
                            — {story.title}
                          </span>
                        )}
                      </div>
                      {isExactBirthYear(story.year) && (
                        <span
                          className={`border ${theme.stampBorder} px-1 py-0.5 text-[8px] font-bold uppercase shrink-0`}
                        >
                          Doğum Yılı!
                        </span>
                      )}
                    </div>

                    <p
                      onClick={() => onSelectStory(story)}
                      className="font-body text-sm leading-relaxed text-justify cursor-pointer hover:opacity-80"
                    >
                      {story.text}
                    </p>

                    <div
                      data-html2canvas-ignore="true"
                      className="no-print mt-2 flex items-center gap-3 opacity-60 group-hover:opacity-100 transition"
                    >
                      <button
                        type="button"
                        onClick={() => onMakeHeadline(story.id)}
                        className="inline-flex items-center gap-1 text-[10px] font-body font-semibold underline underline-offset-2 hover:opacity-70"
                      >
                        <ArrowUpCircle className="w-3 h-3" />
                        Manşet Yap
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectStory(story)}
                        className="text-[10px] font-body underline underline-offset-2 hover:opacity-70"
                      >
                        Oku
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <p className={`font-body text-sm italic ${theme.mutedText}`}>
                  Bu sütun için ek arşiv kaydı bulunamadı.
                </p>
              )}
            </div>

            {/* Nostalji İlanı */}
            <div
              className={`mt-4 border-2 border-dashed ${theme.border} ${theme.accentBg} p-3 text-center`}
            >
              <span className="font-body text-[8px] uppercase tracking-[0.35em] block">
                — {nostalgiaAd.tag} —
              </span>
              <h4 className="font-headline font-bold text-sm mt-1">
                {nostalgiaAd.title}
              </h4>
              <p className={`font-body text-[11px] mt-1 leading-snug ${theme.mutedText}`}>
                {nostalgiaAd.body}
              </p>
              <span className="inline-block mt-2 font-headline text-[10px] font-bold uppercase tracking-wider border-t border-current pt-1">
                {nostalgiaAd.price}
              </span>
            </div>
          </div>

          {/* Sütun 2 */}
          <div className="lg:px-6 space-y-5">
            <h3
              className={`font-headline text-base font-bold uppercase tracking-wider pb-1.5 border-b-4 border-double ${theme.border}`}
            >
              Arşivden Kısa Haberler
            </h3>

            {colTwoStories.length > 0 ? (
              colTwoStories.map((story, idx) => (
                <article
                  key={story.id}
                  className={`group pb-4 border-b last:border-b-0 ${theme.subtleBorder}`}
                >
                  {idx === 0 && story.image && (
                    <div className={`mb-3 border-2 ${theme.border} p-1 bg-black/5`}>
                      <img
                        src={story.image}
                        alt={story.title || "Haber görseli"}
                        crossOrigin="anonymous"
                        className={`w-full h-36 object-cover ${theme.imgFilter}`}
                      />
                      <p className={`mt-1 text-[9px] italic ${theme.mutedText} text-right`}>
                        Arşiv fotoğrafı
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-baseline gap-2 min-w-0">
                      <span className="font-headline font-bold text-lg shrink-0">
                        {story.year}
                      </span>
                      {story.title && (
                        <span
                          className={`font-body text-[10px] uppercase tracking-wider ${theme.mutedText} truncate`}
                        >
                          — {story.title}
                        </span>
                      )}
                    </div>
                  </div>

                  <p
                    onClick={() => onSelectStory(story)}
                    className="font-body text-sm leading-relaxed text-justify cursor-pointer hover:opacity-80"
                  >
                    {story.text}
                  </p>

                  <div
                    data-html2canvas-ignore="true"
                    className="no-print mt-2 flex items-center gap-3 opacity-60 group-hover:opacity-100 transition"
                  >
                    <button
                      type="button"
                      onClick={() => onMakeHeadline(story.id)}
                      className="inline-flex items-center gap-1 text-[10px] font-body font-semibold underline underline-offset-2 hover:opacity-70"
                    >
                      <ArrowUpCircle className="w-3 h-3" />
                      Manşet Yap
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectStory(story)}
                      className="text-[10px] font-body underline underline-offset-2 hover:opacity-70"
                    >
                      Oku
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p className={`font-body text-sm italic ${theme.mutedText}`}>
                Daha fazla haber için İngilizce (EN) arşive geçiş yapabilirsiniz.
              </p>
            )}

            {/* Anma Köşesi */}
            {deaths.length > 0 && (
              <div className={`pt-3 border-t-2 border-double ${theme.border}`}>
                <h4 className="font-headline text-xs font-bold uppercase tracking-wider mb-2">
                  Anma Köşesi (Vefatlar)
                </h4>
                <ul className="space-y-2">
                  {deaths.map((person) => (
                    <li
                      key={person.id}
                      className={`font-body text-[11px] leading-snug ${theme.mutedText}`}
                    >
                      <span className={`font-headline font-bold ${theme.text} mr-1`}>
                        {person.year} •
                      </span>
                      <span>{person.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sütun 3 */}
          <aside className="lg:pl-6">
            <div className={`border-[3px] border-double ${theme.border} ${theme.boxBg} p-4 h-full flex flex-col`}>
              <div className={`text-center pb-3 mb-4 border-b-2 border-double ${theme.border}`}>
                <span className="font-body text-[9px] uppercase tracking-[0.3em] block">
                  KUTLAMA & HATIRLATMA
                </span>
                <h3 className="font-headline text-lg font-black uppercase tracking-wide mt-0.5">
                  Bu Tarihte Doğanlar
                </h3>
              </div>

              {births.length > 0 ? (
                <ul className="space-y-3 flex-1">
                  {births.map((person) => (
                    <li
                      key={person.id}
                      className={`pb-2.5 border-b last:border-b-0 ${theme.subtleBorder} font-body text-sm leading-snug`}
                    >
                      <span className="font-headline font-bold mr-1.5">
                        {person.year} •
                      </span>
                      <span>{person.text}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={`font-body text-sm italic text-center ${theme.mutedText}`}>
                  Bu tarih için doğum kaydı bulunamadı.
                </p>
              )}

              {/* Günün Özel Günleri */}
              {holidays.length > 0 && (
                <div className={`mt-5 pt-3 border-t-2 border-double ${theme.border} text-center`}>
                  <span className="font-headline text-[10px] font-bold uppercase tracking-widest block mb-1">
                    Günün Anlamı
                  </span>
                  <p className={`font-body text-[11px] italic ${theme.mutedText}`}>
                    {holidays.join(" • ")}
                  </p>
                </div>
              )}
            </div>
          </aside>
        </section>

        {/* ════════════ ALT BİLGİ ════════════ */}
        <footer
          className={`relative z-10 mt-8 pt-3 border-t-4 border-double ${theme.border} flex flex-wrap items-center justify-between gap-2 text-[10px] font-body uppercase tracking-[0.18em] ${theme.mutedText}`}
        >
          <span>{(paperTitle.trim() || "TARİHİN SESİ").toUpperCase()} MATBAASI</span>
          <span>{formattedDate} ÖZEL ARŞİV SAYISI</span>
          <span>KAYNAK: WIKIMEDIA</span>
        </footer>
      </article>
    </div>
  );
});

export default NewspaperPage;
