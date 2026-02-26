'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Phone, X } from 'lucide-react';

interface StickyCallButtonProps {
  phone?: string;
  showAfterScroll?: number; // pixels to scroll before showing
}

export function StickyCallButton({
  phone = '(888) 860-0710',
  showAfterScroll = 300,
}: StickyCallButtonProps) {
  const t = useTranslations('stickyCall');
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNearForm, setIsNearForm] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Use IntersectionObserver for scroll-based visibility (avoids forced reflow)
  useEffect(() => {
    // Create a sentinel element at the scroll threshold
    const sentinel = document.createElement('div');
    sentinel.style.cssText = `position:absolute;top:${showAfterScroll}px;left:0;height:1px;width:1px;pointer-events:none;`;
    document.body.appendChild(sentinel);
    sentinelRef.current = sentinel;

    const scrollObserver = new IntersectionObserver(
      ([entry]) => {
        // When sentinel is not visible (scrolled past), show button
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    scrollObserver.observe(sentinel);

    return () => {
      scrollObserver.disconnect();
      if (sentinelRef.current) {
        sentinelRef.current.remove();
      }
    };
  }, [showAfterScroll]);

  // Use IntersectionObserver for form proximity (avoids getBoundingClientRect in scroll handler)
  useEffect(() => {
    const forms = document.querySelectorAll('form');
    if (forms.length === 0) return;

    const formObserver = new IntersectionObserver(
      (entries) => {
        // Check if any observed form is intersecting near viewport bottom
        const nearForm = entries.some((entry) => entry.isIntersecting);
        setIsNearForm(nearForm);
      },
      { 
        threshold: 0,
        rootMargin: '0px 0px -200px 0px' // Trigger when form enters bottom 200px of viewport
      }
    );

    forms.forEach((form) => formObserver.observe(form));

    return () => formObserver.disconnect();
  }, []);

  if (!isVisible) return null;

  const phoneDigits = phone.replace(/\D/g, '');

  return (
    <>
      {/* Mobile: Replaced by StickyMobileFooter component for dual Call/Quote CTAs */}

      {/* Desktop: Floating button */}
      <div className="hidden md:block fixed bottom-8 right-8 z-50">
        {/* Expanded state */}
        {isExpanded ? (
          <div className="bg-white rounded-2xl shadow-2xl border border-secondary-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-primary-100">{t('readyToHelp')}</div>
                    <div className="text-lg font-bold">{phone}</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <a
                href={`tel:${phoneDigits}`}
                className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors w-full"
              >
                <Phone className="h-5 w-5" />
                {t('callNow')}
              </a>
              <div className="text-center text-sm text-secondary-500">
                {t('sameDayAvailable')}
              </div>
            </div>
          </div>
        ) : (
          /* Collapsed floating button */
          <button
            onClick={() => setIsExpanded(true)}
            className="group relative bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 animate-champ-pulse"
          >
            {/* Pulse ring effect */}
            <span className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-25" />

            {/* Button content */}
            <div className="relative flex items-center gap-3 py-4 px-6">
              <div className="relative">
                <Phone className="h-6 w-6" />
                {/* Online indicator */}
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div className="text-left pr-2">
                <div className="text-xs font-medium text-primary-100 group-hover:text-white transition-colors">
                  {t('callForFreeQuote')}
                </div>
                <div className="text-base font-bold tracking-wide">
                  {phone}
                </div>
              </div>
            </div>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute inset-0 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </button>
        )}
      </div>

      {/* Mobile padding handled by layout pb-20 class */}
    </>
  );
}
