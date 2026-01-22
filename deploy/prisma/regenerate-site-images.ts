/**
 * Regenerate Site Images - Roll-off, Residential, and Hero images
 * Using nano-banana-pro with NO branding/logos
 */

import * as dotenv from 'dotenv';
dotenv.config();

import * as fs from 'fs/promises';
import * as path from 'path';

interface FalResponse {
  images: { url: string }[];
}

async function generateImage(prompt: string, width: number, height: number): Promise<string> {
  const apiKey = process.env.FAL_KEY;
  if (!apiKey) throw new Error('FAL_KEY not set');

  const response = await fetch('https://fal.run/fal-ai/nano-banana-pro', {
    method: 'POST',
    headers: {
      'Authorization': `Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      image_size: { width, height },
      num_images: 1,
      enable_safety_checker: true,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error: ${response.status} - ${error}`);
  }

  const data: FalResponse = await response.json();
  return data.images[0].url;
}

async function downloadImage(url: string, localPath: string): Promise<void> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  await fs.writeFile(localPath, Buffer.from(buffer));
}

// DUMPSTER CHAMPS branding - white text on orange dumpster for contrast
const BRAND_LOGO = `white text reading "DUMPSTER CHAMPS" in bold clean sans-serif font, no icons or symbols, just text`;
const BRAND_STYLE = `professional commercial photography, sunny day with clear blue sky, high quality, sharp detail, realistic`;

async function main() {
  console.log('Regenerating site images with Dumpster Champs branding...\n');

  const images = [
    // Services images
    {
      name: 'roll-off-dumpster-rental.jpg',
      dir: 'public/images/services',
      width: 1200,
      height: 800,
      prompt: `Professional photograph of a roll-off dumpster delivery scene. A hydraulic truck is lowering a large bright orange roll-off dumpster onto a suburban driveway. The dumpster has ${BRAND_LOGO} painted on the side. Worker in orange safety vest guiding the placement. Beautiful suburban home in background with green lawn. Action shot of delivery in progress. ${BRAND_STYLE}`,
    },
    {
      name: 'residential-dumpsters.jpg',
      dir: 'public/images/services',
      width: 1200,
      height: 800,
      prompt: `Professional photograph of a medium-sized bright orange roll-off dumpster in a residential driveway. The dumpster has ${BRAND_LOGO} painted on the side. Homeowner in casual clothes loading renovation debris - old cabinets and drywall. Well-maintained suburban home with green lawn visible. Clean, organized scene showing ease of use. Warm afternoon sunlight. ${BRAND_STYLE}`,
    },
    // Hero images
    {
      name: 'hero-homeowner-desktop.jpg',
      dir: 'public/images/hero',
      width: 1920,
      height: 1080,
      prompt: `Professional wide-angle photograph of a bright orange roll-off dumpster in a suburban driveway during a home renovation project. The dumpster has ${BRAND_LOGO} painted on the side. Homeowner couple in their 30s-40s happily loading old furniture and renovation debris. Beautiful sunny day, well-maintained home with landscaping. Aspirational, professional scene showing dumpster rental making home projects easy. ${BRAND_STYLE}`,
    },
    {
      name: 'hero-homeowner-mobile.jpg',
      dir: 'public/images/hero',
      width: 800,
      height: 1200,
      prompt: `Professional vertical photograph of a bright orange roll-off dumpster in a suburban driveway. The dumpster has ${BRAND_LOGO} painted on the side. Homeowner loading boxes into the dumpster. Beautiful sunny day, well-maintained home visible. Clean, professional scene. Mobile-optimized composition with dumpster as focal point. ${BRAND_STYLE}`,
    },
    {
      name: 'hero-contractor-desktop.jpg',
      dir: 'public/images/hero',
      width: 1920,
      height: 1080,
      prompt: `Professional wide-angle photograph of a large bright orange roll-off dumpster at a commercial construction site. The dumpster has ${BRAND_LOGO} painted on the side. Workers in orange safety vests loading construction debris. Professional job site with building under construction. Industrial feel, organized work environment. ${BRAND_STYLE}`,
    },
  ];

  for (const img of images) {
    console.log(`Generating ${img.name}...`);
    try {
      const url = await generateImage(img.prompt, img.width, img.height);
      const localPath = path.join(process.cwd(), img.dir, img.name);
      await downloadImage(url, localPath);
      console.log(`✓ Saved to ${localPath}\n`);
    } catch (error) {
      console.error(`✗ Error: ${error}\n`);
    }
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('Done!');
}

main();
