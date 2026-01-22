# Dumpster Champs Development Workflow

## Deployment Process
1. Make changes to source files in the main project folder
2. Create a zip of source files: `dumpsterchamps-source.zip`
   ```
   powershell -Command "Compress-Archive -Path 'src', 'prisma', 'public', 'package.json', 'package-lock.json', 'next.config.ts', 'tsconfig.json', 'postcss.config.mjs' -DestinationPath 'dumpsterchamps-source.zip' -Force"
   ```
3. **User uploads zip to server manually**
4. Server builds and deploys

## Files to Include in Source Zip
- `src/` - All source code
- `prisma/` - Database schema and migrations
- `public/` - Static assets (images, etc.)
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `postcss.config.mjs`
- `.env` (if needed on server)

## Image Generation
- Using KIE.AI API (cheaper than FAL.AI)
- API Key in `.env` as `KIE_KEY`
- Model: `nano-banana-pro`
- Async API: POST to `/api/v1/jobs/createTask`, poll `/api/v1/jobs/recordInfo?taskId=X`
- Tasks take 3.5-4 minutes to complete

## Branding
- Brand name: "DUMPSTER CHAMPS"
- Logo text: White on orange dumpsters for contrast
- No icons or symbols, just text

## Current Pricing (as of Jan 2026)
| Size | Price | Weight Included |
|------|-------|-----------------|
| 10 yard | $495 | 1 ton |
| 15 yard | $550 | 1 ton |
| 20 yard | $595 | 2 tons |
| 30 yard | $695 | 3 tons |
| 40 yard | $795 | 4 tons |

## Key Files for Pricing Updates
- `src/data/pricing.ts` - Central pricing config
- `src/app/dumpster-rental-prices/page.tsx`
- `src/app/residential-dumpster-rental/page.tsx`
- `src/app/construction-dumpster-rental/page.tsx`
- `src/app/what-size-dumpster-do-i-need/page.tsx`
- `src/app/blog/dumpster-sizes-guide/page.tsx`
- `src/app/blog/dumpster-rental-cost-guide/page.tsx`
- `src/app/blog/cheapest-way-to-rent-dumpster/page.tsx`
- `src/app/blog/20-yard-dumpster-capacity/page.tsx`
- `src/app/blog/dumpster-rental-hidden-fees/page.tsx`
