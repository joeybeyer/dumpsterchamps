# PageSpeed Optimization Report: Dumpster Champs

**Site:** https://www.dumpsterchamps.com  
**Current Score:** 79 Performance (Mobile)  
**Target Score:** 90+  
**Generated:** 2025-02-15

---

## Executive Summary

The site has solid foundations (Next.js 15, Tailwind 4, next/image for hero) but has 5 optimization opportunities that collectively could add 10-15+ points to the mobile performance score:

| Issue | Est. Impact | Effort |
|-------|-------------|--------|
| Render-blocking CSS | 410ms → ~50ms | Medium |
| Forced reflow in StickyCallButton | 99ms → 0ms | Easy |
| Cache headers | 146 KiB savings | Easy |
| Blog images not optimized | 21+ KiB savings | Easy |
| Legacy JavaScript | 24 KiB savings | Easy |

---

## Issue 1: Render-Blocking CSS (410ms savings)

### Root Cause

Tailwind CSS 4 with the new `@import "tailwindcss"` syntax creates a single render-blocking stylesheet. Next.js 15 doesn't automatically extract critical CSS for Tailwind 4.

**Current `globals.css`:**
```css
@import "tailwindcss";

@theme {
  --color-primary-50: #fef7ee;
  /* ... 150+ lines of theme + custom CSS ... */
}
```

This entire file (12.9 KiB) blocks rendering for 660ms.

### Fixes

#### Option A: Inline Critical CSS (Recommended)

Create a critical CSS subset and inline it in the `<head>`:

**1. Create `src/app/critical.css`:**
```css
/* Only above-the-fold styles - approx 2KB */
@import "tailwindcss/preflight";

/* Critical theme tokens */
:root {
  --color-primary-600: #df5f12;
  --color-secondary-800: #3b4452;
  --color-secondary-900: #343b46;
  --font-sans: var(--font-inter), system-ui, sans-serif;
}

/* Critical layout */
body { font-family: var(--font-sans); }
.container { max-width: 80rem; margin: 0 auto; padding: 0 1rem; }

/* Hero section critical styles */
.bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
.from-secondary-900 { --tw-gradient-from: #343b46; }
.to-secondary-800 { --tw-gradient-to: #3b4452; }
```

**2. Update `src/app/[locale]/layout.tsx`:**
```tsx
import criticalCSS from './critical.css?inline';

// In the <head>:
<style dangerouslySetInnerHTML={{ __html: criticalCSS }} />

// Defer non-critical CSS:
<link 
  rel="preload" 
  href="/_next/static/css/[hash].css" 
  as="style" 
  onLoad="this.onload=null;this.rel='stylesheet'" 
/>
<noscript>
  <link rel="stylesheet" href="/_next/static/css/[hash].css" />
</noscript>
```

#### Option B: Use `critters` Plugin (Simpler)

Add automatic critical CSS extraction:

```bash
npm install critters --save-dev
```

**Update `next.config.ts`:**
```ts
const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true, // Enable CSS optimization
  },
  // ... rest of config
};
```

**Note:** As of Next.js 15, `optimizeCss` uses `critters` under the hood when available.

### Impact
- **Before:** 660ms blocking time
- **After:** ~50ms (only critical inlined CSS)
- **Savings:** ~610ms improvement to FCP/LCP

---

## Issue 2: Forced Reflow (99ms savings)

### Root Cause

`StickyCallButton.tsx` queries `getBoundingClientRect()` inside a scroll handler without throttling or IntersectionObserver:

```tsx
// src/components/ui/StickyCallButton.tsx (lines 25-33)
useEffect(() => {
  const handleScroll = () => {
    setIsVisible(window.scrollY > showAfterScroll);

    // THIS CAUSES FORCED REFLOW
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
      const rect = form.getBoundingClientRect(); // ← Forces layout recalc
      // ...
    });
  };

  window.addEventListener('scroll', handleScroll);
  // ...
}, [showAfterScroll]);
```

Every scroll event triggers:
1. Style recalculation
2. Layout calculation (expensive)
3. Reading `rect.bottom`, `rect.top`

### Fix

Replace with `IntersectionObserver`:

```tsx
// src/components/ui/StickyCallButton.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Phone, X } from 'lucide-react';

interface StickyCallButtonProps {
  phone?: string;
  showAfterScroll?: number;
}

export function StickyCallButton({
  phone = '(888) 860-0710',
  showAfterScroll = 300,
}: StickyCallButtonProps) {
  const t = useTranslations('stickyCall');
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNearForm, setIsNearForm] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Use IntersectionObserver for scroll-based visibility
  useEffect(() => {
    // Create a sentinel element at the scroll threshold
    const sentinel = document.createElement('div');
    sentinel.style.cssText = `position:absolute;top:${showAfterScroll}px;height:1px;pointer-events:none;`;
    document.body.appendChild(sentinel);

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
      sentinel.remove();
    };
  }, [showAfterScroll]);

  // Use IntersectionObserver for form proximity
  useEffect(() => {
    const forms = document.querySelectorAll('form');
    if (forms.length === 0) return;

    const formObserver = new IntersectionObserver(
      (entries) => {
        // Check if any form is in the bottom 200px of viewport
        const nearForm = entries.some((entry) => {
          if (!entry.isIntersecting) return false;
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;
          return rect.bottom > viewportHeight - 200 && rect.top < viewportHeight;
        });
        setIsNearForm(nearForm);
      },
      { 
        threshold: 0,
        rootMargin: '0px 0px -200px 0px' // Trigger when form enters bottom 200px
      }
    );

    forms.forEach((form) => formObserver.observe(form));

    return () => formObserver.disconnect();
  }, []);

  if (!isVisible) return null;

  // ... rest of component unchanged
}
```

### Impact
- **Before:** 99ms forced reflow
- **After:** 0ms (no synchronous layout)
- **Bonus:** Better battery life on mobile

---

## Issue 3: Cache Lifetimes (146 KiB savings)

### Root Cause

`vercel.json` is minimal and missing cache headers:

```json
{
  "installCommand": "npm install --legacy-peer-deps",
  "buildCommand": "npm run build"
}
```

While `next.config.ts` has headers, Vercel ignores them for certain asset types. External resources (fonts, GTM) aren't covered.

### Fix

**Update `vercel.json`:**
```json
{
  "installCommand": "npm install --legacy-peer-deps",
  "buildCommand": "npm run build",
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/_next/static/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)\\.woff2",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### Additional: Preconnect to External Resources

Already good in layout.tsx, but add Google Analytics preconnect:

```tsx
// In layout.tsx <head>:
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://www.google-analytics.com" />
```

### Impact
- **Savings:** 146 KiB on repeat visits
- Better Time to Interactive (TTI) on subsequent navigations

---

## Issue 4: Blog Images Not Optimized (21+ KiB savings)

### Root Cause

Blog images are 1.5-2MB unoptimized JPEGs:

| Image | Size | Should Be |
|-------|------|-----------|
| dumpster-sizes-guide-hero.jpg | 1.6 MB | ~100 KB |
| roll-off-vs-front-load.jpg | 1.8 MB | ~100 KB |
| what-can-go-in-dumpster-hero.jpg | 1.7 MB | ~100 KB |

The homepage hero images correctly use `next/image` with `priority`, but blog images may not.

### Fix

**1. Check all blog pages use `next/image`:**

```tsx
// Instead of:
<img src="/images/blog/dumpster-sizes-guide-hero.jpg" />

// Use:
import Image from 'next/image';

<Image
  src="/images/blog/dumpster-sizes-guide-hero.jpg"
  alt="Dumpster sizes comparison guide"
  width={1200}
  height={630}
  className="rounded-xl"
  sizes="(max-width: 768px) 100vw, 800px"
/>
```

**2. Optimize source images:**

Run this script to optimize all blog images:

```bash
# Install sharp-cli
npm install -g sharp-cli

# Optimize all blog images
for f in public/images/blog/*.jpg; do
  sharp resize 1200 --withoutEnlargement --quality 80 "$f" -o "${f%.jpg}-opt.jpg"
done
```

Or use a build-time plugin:

```bash
npm install next-optimized-images --save-dev
```

**3. Add WebP versions for dumpster images (already have them!):**

The `/images/dumpsters/` folder already has WebP versions. Ensure they're being used:

```tsx
<Image
  src="/images/dumpsters/20-yard.webp" // Use WebP
  alt="20 yard dumpster"
  width={400}
  height={300}
/>
```

### Impact
- **Before:** 1.5-2MB per blog hero image
- **After:** ~100KB (WebP via next/image)
- **PageSpeed savings:** 21+ KiB

---

## Issue 5: Legacy JavaScript (24 KiB savings)

### Root Cause

Next.js may be shipping polyfills for older browsers that aren't needed. The default browserslist may be too conservative.

### Fix

**Create `.browserslistrc` in project root:**

```
# Modern browsers only (covers 95%+ of users)
last 2 Chrome versions
last 2 Firefox versions
last 2 Safari versions
last 2 Edge versions
not IE 11
not dead
not op_mini all
```

**Or add to `package.json`:**
```json
{
  "browserslist": [
    "last 2 Chrome versions",
    "last 2 Firefox versions",
    "last 2 Safari versions",
    "last 2 Edge versions"
  ]
}
```

This tells Next.js to skip legacy polyfills for:
- `Promise.finally`
- `Array.includes`
- `Object.assign`
- etc.

### Impact
- **Savings:** 24 KiB JavaScript
- Faster parse/compile time on mobile

---

## Bonus Optimizations

### 1. Defer GTM Further

Currently using `lazyOnload`, but can delay even more:

```tsx
// In layout.tsx, add a delay:
<Script
  id="gtm-script"
  strategy="lazyOnload"
  dangerouslySetInnerHTML={{
    __html: `
      setTimeout(function() {
        (function(w,d,s,l,i){/* GTM code */})(window,document,'script','dataLayer','${GTM_ID}');
      }, 3000); // 3 second delay
    `,
  }}
/>
```

### 2. Remove Unused CSS

Check for unused Tailwind classes with PurgeCSS:

```bash
npx purgecss --css .next/static/css/*.css --content ./src/**/*.tsx --output purged.css
```

Compare sizes to identify bloat.

### 3. Font Display Swap

Already using `display: "swap"` in Inter font config ✅

### 4. Preload LCP Image

Already doing this in layout.tsx ✅

```tsx
<link
  rel="preload"
  href="/images/hero/hero-homeowner-desktop.jpg"
  as="image"
  type="image/jpeg"
  media="(min-width: 1024px)"
/>
```

---

## Implementation Priority

| # | Fix | Effort | Impact | Do First |
|---|-----|--------|--------|----------|
| 1 | StickyCallButton IntersectionObserver | 30 min | Medium | ✅ |
| 2 | Update vercel.json cache headers | 5 min | Medium | ✅ |
| 3 | Add browserslist | 5 min | Low-Med | ✅ |
| 4 | Optimize blog images with next/image | 1 hr | Medium | ✅ |
| 5 | Critical CSS extraction | 2-4 hrs | High | Next sprint |

---

## Expected Results

After implementing fixes 1-4 (quick wins):
- **Mobile Score:** 79 → 85-88
- **FCP:** Improved by ~100ms
- **LCP:** Improved by ~200ms

After implementing critical CSS (fix 5):
- **Mobile Score:** 88 → 92-95
- **FCP:** Improved by ~400ms
- **LCP:** Improved by ~300ms

---

## Files to Modify

1. `src/components/ui/StickyCallButton.tsx` - Replace scroll handler with IntersectionObserver
2. `vercel.json` - Add cache headers
3. `package.json` or `.browserslistrc` - Add modern browserslist
4. Blog page components - Ensure using `next/image`
5. `src/app/[locale]/layout.tsx` - (Later) Add critical CSS inlining

---

*Report generated for Joey. DO NOT push to production without review.*
