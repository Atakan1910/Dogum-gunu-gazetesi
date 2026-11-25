import { Newspaper, Share2 } from "lucide-react";

export default function Header({ onCopyShareLink }) {
  return (
    <header className="no-print border-b border-[#3a3530]/80 bg-[#2a2621] sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Newspaper className="w-5 h-5 text-[#a09080]" />
          <div>
            <h1 className="font-headline text-base sm:text-lg font-bold tracking-tight text-[#e0d8c8]">
              Doğum Gününün Gazetesi
            </h1>
            <p className="text-[10px] tracking-widest uppercase text-[#6b6050]">
              Kişiselleştirilebilir Vintage Tarih Arşivi
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCopyShareLink}
          className="btn-vintage inline-flex items-center gap-1.5"
        >
          <Share2 className="w-3 h-3" />
          <span className="hidden sm:inline">Paylaş</span>
        </button>
      </div>
    </header>
  );
}
