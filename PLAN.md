# Plan: Generate Product-Focused Hero Image

## Problem
The current hero image shows a person in an orange shirt but **doesn't show the product** — a roll-off dumpster being delivered. This is a missed opportunity for conversion since visitors need to immediately understand what they're buying.

## Current State
- **Desktop**: `hero-homeowner-desktop.jpg` - Person in orange shirt, gaze directed left
- **Mobile**: `hero-homeowner-mobile.jpg` - Portrait version
- Current prompts mention "dumpster visible" but the focus is on the person

## Recommended Approach
Create a new hero image that prominently features **the product in action**:
- A roll-off dumpster truck delivering/placing a dumpster in a residential driveway
- The dumpster should be the focal point
- Keep the orange brand color in the truck or dumpster branding
- Sunny day, clean suburban setting
- Professional photography style

## Implementation Steps

### Step 1: Update Image Generation Prompts
Modify `prisma/generate-hero-images.ts` with new product-focused prompts:

**Desktop (1280x720) - Dumpster in motion:**
```
Professional photograph of a roll-off dumpster truck actively unloading an orange dumpster onto a suburban home driveway. The truck's hydraulic arm is tilted, dumpster sliding off the back - caught in the moment of delivery. Sunny day, well-maintained residential neighborhood with green lawn. Action shot showing the service in progress. High quality commercial photography, bright natural lighting, dynamic composition.
```

**Mobile (800x600) - Dumpster in motion:**
```
Professional photograph of a roll-off dumpster truck delivering an orange dumpster to a residential driveway. The truck bed is tilted at an angle, dumpster being placed - action shot mid-delivery. Sunny day, clean suburban setting. Commercial photography style, bright natural lighting, shows the delivery process.
```

### Step 2: Generate New Images
```bash
npx tsx prisma/generate-hero-images.ts
```

### Step 3: Update Alt Text
Update the image alt text in `src/app/page.tsx` to describe the product:
- From: "Satisfied homeowner with dumpster rental"
- To: "Roll-off dumpster delivery to residential driveway"

### Step 4: Deploy
- Rebuild and deploy to production
- Test on both desktop and mobile

## Alternative: Split Test
Keep both versions and A/B test:
1. **Version A (Current)**: Person-focused (emotional connection)
2. **Version B (New)**: Product-focused (immediate clarity)

Track which converts better using GTM events.

## Files to Modify
1. `prisma/generate-hero-images.ts` - Update prompts
2. `src/app/page.tsx` - Update alt text
3. `public/images/hero/` - New generated images
