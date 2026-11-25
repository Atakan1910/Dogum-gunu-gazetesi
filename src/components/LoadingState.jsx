import { Printer } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="max-w-5xl mx-auto my-8 px-4">
      <div className="paper-texture paper-aged bg-[#f3ebd8] text-[#1e1b18] border-4 border-double border-[#3b2f24] p-12 sm:p-20 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 border-2 border-[#3b2f24] mb-5 animate-pulse">
          <Printer className="w-7 h-7" />
        </div>
        <h2 className="font-headline text-2xl sm:text-3xl font-bold tracking-wide mb-2">
          Matbaa Çalışıyor…
        </h2>
        <p className="font-body italic text-sm text-[#5c4a38] max-w-sm mx-auto">
          Tarih arşivleri taranıyor, kurşun harfler diziliyor ve mürekkep tazeleniyor.
        </p>
        <div className="mt-8 max-w-xs mx-auto h-1 bg-[#3b2f24]/15 overflow-hidden">
          <div className="h-full w-1/2 bg-[#1e1b18] animate-[pulse_1.2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
