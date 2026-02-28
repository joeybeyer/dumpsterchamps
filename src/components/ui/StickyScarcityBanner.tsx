"use client";

import { useState, useEffect } from "react";
import { Truck, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuoteFormContext } from "@/context/QuoteFormContext";

interface StickyScarcityBannerProps {
  cityNameProp?: string;
  selectedDateProp?: string;
  className?: string;
}

/**
 * Sticky scarcity banner for mobile showing limited delivery slots.
 * - Appears after 3 seconds of scrolling
 * - Updates dynamically when user selects a date/city from the form
 * - Positioned at the bottom of the screen on mobile for better UX
 * - Uses real-time language for urgency
 */
export function StickyScarcityBanner({ cityNameProp, selectedDateProp, className }: StickyScarcityBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [slotsRemaining, setSlotsRemaining] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  // Get form state from context
  const { formState } = useQuoteFormContext();
  
  // Use context values if available, otherwise fall back to props
  // Priority: page city > prop > zip-derived city (page context is most reliable)
  const cityName = formState.pageCity || cityNameProp || formState.city;
  const selectedDate = formState.selectedDate || selectedDateProp;

  // Get current day name for messaging
  const getDayName = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  };

  // Get tomorrow's day name
  const getTomorrowName = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return days[tomorrow.getDay()];
  };

  // Generate realistic-looking slot count based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    // More slots in morning, fewer as day goes on
    const baseSlots = hour < 10 ? 7 : hour < 14 ? 5 : hour < 18 ? 3 : 2;
    // Add some randomness
    const variance = Math.floor(Math.random() * 2);
    setSlotsRemaining(baseSlots + variance);
    setLastUpdated(new Date());
  }, []);

  // Show banner after 3 seconds of scrolling
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 100) {
        setHasScrolled(true);
        // Wait 3 seconds after scroll starts
        scrollTimer = setTimeout(() => {
          setIsVisible(true);
        }, 3000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also show after 5 seconds even without scroll (for mobile users who don't scroll)
    const fallbackTimer = setTimeout(() => {
      if (!isVisible) {
        setIsVisible(true);
      }
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
      clearTimeout(fallbackTimer);
    };
  }, [hasScrolled, isVisible]);

  // Update slots when city changes (simulates checking inventory)
  useEffect(() => {
    if (cityName) {
      // Simulate inventory check with slight variation
      const hour = new Date().getHours();
      const baseSlots = hour < 10 ? 6 : hour < 14 ? 4 : hour < 18 ? 3 : 2;
      const cityVariance = cityName.length % 3; // Consistent per-city variation
      setSlotsRemaining(baseSlots + cityVariance);
      setLastUpdated(new Date());
    }
  }, [cityName]);

  if (dismissed || slotsRemaining === 0 || !isVisible) return null;

  // Format the selected date for display
  const getDateDisplay = () => {
    if (!selectedDate) return null;
    try {
      const date = new Date(selectedDate);
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    } catch {
      return null;
    }
  };

  const dayName = getDateDisplay();
  const isUrgent = slotsRemaining <= 3;
  const isLastSlot = slotsRemaining === 1;

  return (
    <div
      className={cn(
        // Positioned above the sticky mobile footer (68px) so it never covers the CTAs
        "fixed bottom-[68px] left-0 right-0 py-3 px-4 z-[60] lg:hidden",
        "transition-all duration-500 transform",
        isUrgent 
          ? "bg-gradient-to-r from-red-600 to-orange-500 text-white" 
          : "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          {/* Live indicator with pulse animation */}
          <div className="flex-shrink-0 flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
            </span>
            <Truck className="h-5 w-5" />
          </div>
          
          {/* Dynamic messaging */}
          <div className="min-w-0">
            <p className="text-sm font-medium leading-tight">
              {isLastSlot ? (
                // Last slot - maximum urgency
                cityName ? (
                  <>
                    <span className="font-bold text-yellow-200">Last Slot!</span>{" "}
                    Only 1 delivery left in <span className="font-bold">{cityName}</span> for {getTomorrowName()}
                  </>
                ) : (
                  <>
                    <span className="font-bold text-yellow-200">Last Slot!</span>{" "}
                    Only 1 delivery slot remains for {getTomorrowName()}
                  </>
                )
              ) : dayName && cityName ? (
                // User selected a date - show confirmation + scarcity
                <>
                  <span className="font-bold">{dayName}</span> available!{" "}
                  <span className="text-amber-100">Only {slotsRemaining} slots left in {cityName}</span>
                </>
              ) : cityName ? (
                // City known — credibility-first messaging
                <>
                  Upfront pricing in <span className="font-bold">{cityName}</span>.{" "}
                  <span className="text-amber-100">
                    Delivery as soon as {getTomorrowName()} • No hidden fees
                  </span>
                </>
              ) : (
                // Default - no location yet
                <>
                  <span className={isUrgent ? "text-yellow-200 font-semibold" : ""}>
                    Only {slotsRemaining} delivery slots
                  </span>{" "}
                  remain for {getDayName()}
                </>
              )}
            </p>
            {/* Subline */}
            <p className="text-[10px] text-white/70 mt-0.5">
              Upfront pricing • Fast delivery windows
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      {/* Safe area padding for phones with home indicators */}
      <div className="h-safe-area-inset-bottom" />
    </div>
  );
}
