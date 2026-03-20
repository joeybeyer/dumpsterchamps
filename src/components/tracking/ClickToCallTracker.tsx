"use client";

import { useEffect } from "react";

export function ClickToCallTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (!link) return;

      // Fire Facebook Pixel event
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Contact", {
          content_name: "phone_call",
          content_category: "click_to_call",
          value: 15.0,
          currency: "USD",
        });
      }

      // Fire GTM dataLayer event
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "click_to_call",
          phone_number: link.href.replace("tel:", ""),
          page_url: window.location.href,
        });
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
