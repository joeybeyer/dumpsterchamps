"use client";

import { useState, useEffect } from "react";
import { Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuoteFormContext } from "@/context/QuoteFormContext";

interface FloatingTrustBadgeProps {
  /** City name from page context (for city landing pages) */
  pageCityName?: string;
  className?: string;
}

/**
 * Floating trust badge for mobile showing Google rating.
 * - Small enough to not obstruct form fields
 * - Visible in peripheral vision
 * - Dynamic city: "4.9 Rating in [City]" on city-specific pages
 * - Positioned to not conflict with sticky scarcity banner
 */
export function FloatingTrustBadge({ pageCityName, className }: FloatingTrustBadgeProps) {
  const [dismissed, setDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Get form state from context (in case user entered a zip)
  const { formState } = useQuoteFormContext();
  
  // Priority: page city prop > context pageCity > form city > generic
  const cityName = pageCityName || formState.pageCity || formState.city;

  // Show badge after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-dismiss after 15 seconds to not be annoying
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setDismissed(true);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (dismissed || !isVisible) return null;

  return (
    <div
      className={cn(
        // Positioned in lower-left corner, above the scarcity banner
        "fixed bottom-16 left-3 z-[55] lg:hidden",
        "transition-all duration-300 transform",
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0",
        className
      )}
    >
      <div className="bg-white rounded-full shadow-lg border border-secondary-200 px-3 py-1.5 flex items-center gap-1.5">
        {/* Star icon */}
        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />
        
        {/* Rating text */}
        <span className="text-xs font-semibold text-secondary-800 whitespace-nowrap">
          4.9{cityName ? ` in ${cityName}` : " Rating"}
        </span>
        
        {/* Dismiss button - very subtle */}
        <button
          onClick={() => setDismissed(true)}
          className="ml-1 p-0.5 hover:bg-secondary-100 rounded-full transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-3 w-3 text-secondary-400" />
        </button>
      </div>
    </div>
  );
}
