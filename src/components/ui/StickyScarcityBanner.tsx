"use client";

import { useState, useEffect } from "react";
import { Clock, Truck, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuoteFormContext } from "@/context/QuoteFormContext";

interface StickyScarcityBannerProps {
  cityNameProp?: string;
  selectedDateProp?: string;
  className?: string;
}

/**
 * Sticky scarcity banner for mobile showing limited delivery slots.
 * Updates dynamically when user selects a date/city from the form.
 * Positioned at the bottom of the screen on mobile for better UX.
 */
export function StickyScarcityBanner({ cityNameProp, selectedDateProp, className }: StickyScarcityBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [slotsRemaining, setSlotsRemaining] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Get form state from context
  const { formState } = useQuoteFormContext();
  
  // Use context values if available, otherwise fall back to props
  const cityName = formState.city || cityNameProp;
  const selectedDate = formState.selectedDate || selectedDateProp;

  // Generate realistic-looking slot count based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    // More slots in morning, fewer as day goes on
    const baseSlots = hour < 10 ? 7 : hour < 14 ? 5 : hour < 18 ? 3 : 2;
    // Add some randomness
    const variance = Math.floor(Math.random() * 3);
    setSlotsRemaining(baseSlots + variance);
    
    // Show banner after a small delay for better UX
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Update slots when city changes (simulates checking inventory)
  useEffect(() => {
    if (cityName) {
      // Simulate inventory check with slight variation
      const hour = new Date().getHours();
      const baseSlots = hour < 10 ? 6 : hour < 14 ? 4 : hour < 18 ? 3 : 2;
      const cityVariance = cityName.length % 3; // Consistent per-city variation
      setSlotsRemaining(baseSlots + cityVariance);
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

  // Determine urgency level for styling
  const isUrgent = slotsRemaining <= 3;

  return (
    <div
      className={cn(
        // Fixed to BOTTOM on mobile for thumb-friendly dismissal, hidden on desktop
        "fixed bottom-0 left-0 right-0 py-3 px-4 z-[60] lg:hidden shadow-lg",
        "transition-all duration-300 transform",
        isUrgent 
          ? "bg-gradient-to-r from-red-500 to-orange-500 text-white" 
          : "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
        isVisible ? "translate-y-0" : "translate-y-full",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <div className="relative">
              <Truck className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
            </div>
          </div>
          <p className="text-sm font-medium">
            {dayName && cityName ? (
              // User selected a date - show confirmation + scarcity
              <>
                <span className="font-bold">{dayName}</span> available in{" "}
                <span className="font-bold">{cityName}</span>!{" "}
                <span className={cn(isUrgent ? "text-yellow-100 font-bold" : "text-amber-100")}>
                  Only {slotsRemaining} slots left
                </span>
              </>
            ) : cityName ? (
              // User entered zip, city detected
              <>
                Only <span className="font-bold">{slotsRemaining} delivery slots</span> left in{" "}
                <span className="font-bold">{cityName}</span> today
              </>
            ) : (
              // Default - no location yet
              <>
                <Clock className="inline h-3.5 w-3.5 mr-1" />
                Only <span className="font-bold">{slotsRemaining} delivery slots</span> left today
              </>
            )}
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 p-1.5 hover:bg-white/20 rounded-full transition-colors"
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
