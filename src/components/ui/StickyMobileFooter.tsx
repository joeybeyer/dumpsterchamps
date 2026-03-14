"use client";

import { Phone, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQuoteFormContext } from "@/context/QuoteFormContext";

export function StickyMobileFooter() {
  const t = useTranslations("stickyFooter");
  const common = useTranslations("common");
  const { formState } = useQuoteFormContext();

  // Hide when the quote form is on its final contact/submit step so the
  // footer's orange CTA doesn't compete with the form's own submit button.
  if (formState.formStep >= 3) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-secondary-200 shadow-lg p-3 flex gap-2 lg:hidden z-50">
      <a
        href={`tel:${common("phone").replace(/[^0-9]/g, "")}`}
        className="flex-[1.2] flex items-center justify-center gap-2 bg-primary-600 text-white py-3.5 rounded-lg font-semibold hover:bg-primary-700 transition-colors min-h-[48px] touch-manipulation active:scale-[0.98]"
      >
        <Phone className="h-5 w-5" />
        <div className="flex flex-col items-start leading-tight">
          <span className="text-sm font-bold">{t("callNow")}</span>
          <span className="text-xs opacity-90">{t("instantQuote")}</span>
        </div>
      </a>
      <a
        href="#quote-form"
        className="flex-1 flex items-center justify-center gap-2 border-2 border-primary-600 text-primary-600 py-3.5 rounded-lg font-semibold hover:bg-primary-50 transition-colors min-h-[48px] touch-manipulation active:scale-[0.98]"
      >
        <FileText className="h-5 w-5" />
        <span className="text-sm">{t("getQuote")}</span>
      </a>
    </div>
  );
}
