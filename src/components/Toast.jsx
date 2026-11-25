import { CheckCircle2, X } from "lucide-react";

export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="no-print fixed bottom-5 right-5 z-50">
      <div className="flex items-center gap-3 bg-[#2a2621] border border-[#5c5347] text-[#d4c9b8] px-4 py-3 text-sm font-body">
        <CheckCircle2 className="w-4 h-4 text-[#a09080] shrink-0" />
        <span>{message}</span>
        <button
          type="button"
          onClick={onClose}
          className="text-[#6b6050] hover:text-[#d4c9b8] ml-1"
          aria-label="Bildirimi kapat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
