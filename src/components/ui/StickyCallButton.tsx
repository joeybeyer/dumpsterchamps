'use client';

import { useState, useEffect } from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';

interface StickyCallButtonProps {
  phone?: string;
  showAfterScroll?: number; // pixels to scroll before showing
}

export function StickyCallButton({
  phone = '(888) 860-0710',
  showAfterScroll = 300,
}: StickyCallButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNearForm, setIsNearForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfterScroll);

      // Check if near a form to avoid overlap
      const forms = document.querySelectorAll('form');
      let nearForm = false;
      forms.forEach((form) => {
        const rect = form.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // If form is in bottom 200px of viewport, hide mobile bar
        if (rect.bottom > viewportHeight - 200 && rect.top < viewportHeight) {
          nearForm = true;
        }
      });
      setIsNearForm(nearForm);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showAfterScroll]);

  if (!isVisible) return null;

  const phoneDigits = phone.replace(/\D/g, '');

  return (
    <>
      {/* Mobile: Bottom sticky bar - hides when near forms to avoid overlap */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-inset-bottom transition-transform duration-300 ${
          isNearForm ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <a
          href={`tel:${phoneDigits}`}
          className="flex items-center justify-center gap-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 px-6 shadow-2xl min-h-[64px] touch-manipulation"
        >
          <div className="relative">
            <Phone className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full" />
          </div>
          <div className="text-left">
            <div className="text-xs font-medium text-primary-100">Tap to Call Now</div>
            <div className="text-lg font-bold tracking-wide">{phone}</div>
          </div>
          <div className="ml-auto bg-white/20 rounded-full px-3 py-1.5 text-sm font-semibold">
            Free Quote
          </div>
        </a>
      </div>

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
                    <div className="text-sm font-medium text-primary-100">Ready to help!</div>
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
                Call Now
              </a>
              <div className="text-center text-sm text-secondary-500">
                Same-day delivery available
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
                  Call for Free Quote
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

      {/* Add padding to body for mobile sticky bar */}
      <style jsx global>{`
        @media (max-width: 767px) {
          body {
            padding-bottom: 72px;
          }
        }
      `}</style>
    </>
  );
}
