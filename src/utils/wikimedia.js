function extractBestMedia(item) {
  if (!item?.pages?.length) {
    return { image: null, title: null, extract: null, wikiUrl: null };
  }

  const pageWithImage = item.pages.find((p) => p?.thumbnail?.source);
  const fallbackPage = item.pages[0];
  const target = pageWithImage || fallbackPage;

  return {
    image: pageWithImage?.thumbnail?.source || null,
    title: target?.normalizedtitle || target?.title || null,
    extract: target?.extract || null,
    wikiUrl: target?.content_urls?.desktop?.page || null,
  };
}

function normalizeStory(item, idx, prefix) {
  const media = extractBestMedia(item);
  return {
    id: `${prefix}-${idx}-${item.year || "x"}`,
    year: item.year,
    text: item.text,
    image: media.image,
    title: media.title,
    extract: media.extract,
    wikiUrl: media.wikiUrl,
  };
}

export async function fetchOnThisDay(month, day, lang = "tr") {
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");

  const url = `https://api.wikimedia.org/feed/v1/wikipedia/${lang}/onthisday/all/${mm}/${dd}`;

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`API Hatası: ${response.status} — Arşiv verilerine ulaşılamadı.`);
  }

  const data = await response.json();

  const selected = Array.isArray(data.selected) ? data.selected : [];
  const events = Array.isArray(data.events) ? data.events : [];
  const births = Array.isArray(data.births) ? data.births : [];
  const deaths = Array.isArray(data.deaths) ? data.deaths : [];
  const holidays = Array.isArray(data.holidays) ? data.holidays : [];

  // Tekrarlanan metinleri temizleyerek havuzu oluştur
  const seenTexts = new Set();
  const combinedPool = [...selected, ...events].filter((item) => {
    if (!item?.text || seenTexts.has(item.text)) return false;
    seenTexts.add(item.text);
    return true;
  });

  // Görseli olan en önemli olayı ana manşet olarak seç
  let headlineIndex = combinedPool.findIndex((item) =>
    item?.pages?.some((p) => p?.thumbnail?.source)
  );
  if (headlineIndex === -1 && combinedPool.length > 0) {
    headlineIndex = 0;
  }

  const rawHeadline = headlineIndex >= 0 ? combinedPool[headlineIndex] : null;
  const headline = rawHeadline ? normalizeStory(rawHeadline, 0, "headline") : null;

  const secondaryStories = combinedPool
    .filter((_, idx) => idx !== headlineIndex)
    .slice(0, 8)
    .map((item, idx) => normalizeStory(item, idx, "story"));

  const notableBirths = births.slice(0, 6).map((item, idx) => ({
    id: `birth-${idx}`,
    year: item.year,
    text: item.text,
    wikiUrl: item?.pages?.[0]?.content_urls?.desktop?.page || null,
  }));

  const notableDeaths = deaths.slice(0, 4).map((item, idx) => ({
    id: `death-${idx}`,
    year: item.year,
    text: item.text,
    wikiUrl: item?.pages?.[0]?.content_urls?.desktop?.page || null,
  }));

  const specialHolidays = holidays.slice(0, 3).map((item) => item.text);

  return {
    headline,
    secondaryStories,
    births: notableBirths,
    deaths: notableDeaths,
    holidays: specialHolidays,
    totalCount: combinedPool.length,
    hasHeadlineImage: Boolean(headline?.image),
  };
}
