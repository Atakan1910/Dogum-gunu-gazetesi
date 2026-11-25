import { X, ExternalLink, ArrowUpCircle } from "lucide-react";
import { THEMES } from "../utils/vintageHelpers";

export default function StoryModal({
  story,
  themeKey,
  onClose,
  onMakeHeadline,
  isCurrentHeadline,
}) {
  if (!story) return null;

  const theme = THEMES[themeKey] || THEMES.sepia;

  return (
    <div
      className="no-print fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`paper-texture ${theme.paperBg} ${theme.text} border-4 border-double ${theme.border} max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-3 right-3 p-1 border ${theme.subtleBorder} hover:opacity-75 transition`}
          aria-label="Kapat"
        >
          <X className="w-4 h-4" />
        </button>

        <span
          className={`font-body text-[10px] uppercase tracking-[0.25em] ${theme.mutedText} block mb-1`}
        >
          {story.year ? `${story.year} ARŞİV KAYDI` : "ARŞİV KAYDI"}
        </span>

        <h3 className="font-headline text-2xl sm:text-3xl font-bold leading-snug pr-8 mb-4">
          {story.title || `${story.year} Yılında Yaşanan Olay`}
        </h3>

        {story.image && (
          <div className={`mb-5 border-2 ${theme.border} p-1 bg-black/5`}>
            <img
              src={story.image}
              alt={story.title || "Arşiv görseli"}
              className={`w-full max-h-72 object-cover ${theme.imgFilter}`}
            />
            <p className={`mt-1.5 text-[10px] italic ${theme.mutedText} text-right pr-1`}>
              Arşiv fotoğrafı — {story.year || "tarih bilinmiyor"}
            </p>
          </div>
        )}

        <p className="font-body text-base leading-relaxed mb-4 text-justify">
          {story.text}
        </p>

        {story.extract && (
          <p
            className={`font-body text-sm leading-relaxed pt-4 border-t ${theme.subtleBorder} ${theme.mutedText} text-justify`}
          >
            {story.extract}
          </p>
        )}

        <div
          className={`mt-6 pt-4 border-t-2 border-double ${theme.border} flex flex-wrap items-center justify-between gap-3`}
        >
          {!isCurrentHeadline ? (
            <button
              type="button"
              onClick={() => {
                onMakeHeadline(story.id);
                onClose();
              }}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider border-2 ${theme.border} hover:opacity-80 transition`}
            >
              <ArrowUpCircle className="w-3.5 h-3.5" />
              Ana Manşet Yap
            </button>
          ) : (
            <span className={`font-body text-xs italic ${theme.mutedText}`}>
              Şu anda gazetenin ana manşetinde.
            </span>
          )}

          {story.wikiUrl && (
            <a
              href={story.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider underline underline-offset-4 hover:opacity-75"
            >
              <span>Vikipedi'de Oku</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
