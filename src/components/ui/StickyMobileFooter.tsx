"use client";

import { Phone, FileText } from "lucide-react";
import { useTranslations } from "next-intl";

export function StickyMobileFooter() {
  const t = useTranslations("stickyFooter");
  const common = useTranslations("common");

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-secondary-200 shadow-lg p-3 flex gap-2 lg:hidden z-50">
      <a
        href={`tel:${common("phone").replace(/[^0-9]/g, "")}`}
        className="flex-1 flex items-center justify-center gap-2 bg-secondary-800 text-white py-3.5 rounded-lg font-semibold hover:bg-secondary-900 transition-colors min-h-[48px] touch-manipulation active:scale-[0.98]"
      >
        <Phone className="h-5 w-5" />
        <span>{t("callNow")}</span>
      </a>
      <a
        href="#quote-form"
        className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white py-3.5 rounded-lg font-semibold hover:bg-primary-700 transition-colors min-h-[48px] touch-manipulation active:scale-[0.98]"
      >
        <FileText className="h-5 w-5" />
        <span>{t("getQuote")}</span>
      </a>
    </div>
  );
}
