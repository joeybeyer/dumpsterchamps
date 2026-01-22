/**
 * Generate ALL Site Images using Fal.ai nano-banana-pro
 *
 * Run with: npx tsx prisma/generate-all-images.ts
 *
 * This script regenerates all images on the site:
 * - Hero images (homepage)
 * - Service page images
 * - Dumpster size images
 * - Blog post images
 */

import * as dotenv from 'dotenv';
dotenv.config();

import * as fs from 'fs/promises';
import * as path from 'path';

const MODEL = 'fal-ai/nano-banana-pro';

interface FalImageResult {
  url: string;
  width: number;
  height: number;
  content_type: string;
}

interface FalResponse {
  images: FalImageResult[];
  seed: number;
  has_nsfw_concepts: boolean[];
}

async function generateImage(
  prompt: string,
  width: number = 1280,
  height: number = 720
): Promise<string> {
  const apiKey = process.env.FAL_KEY;

  if (!apiKey) {
    throw new Error('FAL_KEY not set in environment');
  }

  console.log(`  Calling ${MODEL}...`);

  const response = await fetch(`https://fal.run/${MODEL}`, {
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
    throw new Error(`Fal.ai API error: ${response.status} - ${error}`);
  }

  const data: FalResponse = await response.json();
  if (!data.images?.[0]?.url) {
    throw new Error('No image URL in Fal.ai response');
  }

  return data.images[0].url;
}

async function downloadImage(url: string, localPath: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`);
  }
  const buffer = await response.arrayBuffer();
  await fs.writeFile(localPath, Buffer.from(buffer));
}

async function ensureDir(dirPath: string) {
  await fs.mkdir(dirPath, { recursive: true });
}

// ============ IMAGE DEFINITIONS ============

const HERO_IMAGES = [
  {
    name: 'hero-homeowner-desktop.jpg',
    prompt: 'Professional photograph of a roll-off dumpster truck actively unloading an orange dumpster onto a suburban home driveway. The truck hydraulic arm is tilted, dumpster sliding off the back - caught in the moment of delivery. Sunny day, well-maintained residential neighborhood with green lawn. Action shot showing the service in progress. High quality commercial photography, bright natural lighting, dynamic composition.',
    width: 800,
    height: 1000,
  },
  {
    name: 'hero-homeowner-mobile.jpg',
    prompt: 'Professional photograph of a roll-off dumpster truck delivering an orange dumpster to a residential driveway. The truck bed is tilted at an angle, dumpster being placed - action shot mid-delivery. Sunny day, clean suburban setting. Commercial photography style, bright natural lighting, shows the delivery process.',
    width: 800,
    height: 600,
  },
  {
    name: 'hero-contractor-desktop.jpg',
    prompt: 'Professional photograph of a roll-off dumpster truck delivering an orange dumpster to an active construction site. The truck is in motion, hydraulic arm tilted, placing the dumpster. Construction workers visible in background. Action shot, dynamic composition. High quality commercial photography, bright daylight.',
    width: 800,
    height: 1000,
  },
];

const SERVICE_IMAGES = [
  {
    name: 'roll-off-dumpster-rental.jpg',
    prompt: 'Professional photograph of a clean orange roll-off dumpster being delivered to a residential driveway by a flatbed truck. Sunny suburban neighborhood, green lawns, the truck hydraulic system lowering the dumpster. Commercial photography style, high quality, shows the full roll-off rental service.',
    width: 1200,
    height: 800,
  },
  {
    name: 'construction-dumpsters.jpg',
    prompt: 'Professional photograph of multiple large orange roll-off dumpsters at an active commercial construction site. Construction workers, building materials, heavy equipment visible. Busy worksite atmosphere. High quality commercial photography, bright daylight.',
    width: 1200,
    height: 800,
  },
  {
    name: 'residential-dumpsters.jpg',
    prompt: 'Professional photograph of a medium-sized orange roll-off dumpster in a residential driveway during a home cleanout project. Homeowner loading boxes and household items. Neat suburban home, green lawn, sunny day. Friendly, approachable scene. Commercial photography style.',
    width: 1200,
    height: 800,
  },
];

const DUMPSTER_SIZE_IMAGES = [
  {
    name: '10-yard.jpg',
    prompt: 'Professional photograph of a small 10-yard plain orange roll-off dumpster in a residential driveway. Compact size, about 12 feet long. No logos, no text, no branding, completely unbranded solid orange container. Single-car garage visible for scale. Clean, sunny day. Commercial product photography style.',
    width: 800,
    height: 600,
  },
  {
    name: '15-yard.jpg',
    prompt: 'Professional photograph of a 15-yard plain orange roll-off dumpster in a residential driveway. Medium-small size, good for bathroom renovation debris. No logos, no text, no branding, completely unbranded solid orange container. House and lawn visible for scale. Clean, sunny suburban setting. Commercial product photography.',
    width: 800,
    height: 600,
  },
  {
    name: '20-yard.jpg',
    prompt: 'Professional photograph of a 20-yard plain orange roll-off dumpster at a home renovation site. Medium size, most popular for home projects. No logos, no text, no branding, completely unbranded solid orange container. Construction debris visible inside. Suburban home background. Bright daylight, commercial photography style.',
    width: 800,
    height: 600,
  },
  {
    name: '30-yard.jpg',
    prompt: 'Professional photograph of a large 30-yard plain orange roll-off dumpster at a major home renovation or small construction site. Larger size with high walls. No logos, no text, no branding, completely unbranded solid orange container. Roofing shingles and construction debris inside. Commercial photography, bright day.',
    width: 800,
    height: 600,
  },
  {
    name: '40-yard.jpg',
    prompt: 'Professional photograph of an extra-large 40-yard plain orange roll-off dumpster at a commercial construction site. Largest size available, very tall walls. No logos, no text, no branding, completely unbranded solid orange container. Major demolition debris inside. Industrial setting. Professional commercial photography.',
    width: 800,
    height: 600,
  },
];

const BLOG_IMAGES = [
  {
    name: 'dumpster-sizes-guide-hero.jpg',
    prompt: 'Professional photograph showing multiple dumpster sizes lined up side by side for comparison - 10, 20, 30, and 40 yard orange roll-off dumpsters. Clear size differences visible. Industrial yard or delivery lot setting. Educational comparison shot. Commercial photography.',
    width: 1200,
    height: 675,
  },
  {
    name: 'dumpster-pricing-guide-hero.jpg',
    prompt: 'Professional photograph of a contractor and homeowner shaking hands in front of an orange roll-off dumpster. Clipboard with paperwork visible. Friendly business transaction. Sunny residential driveway. Trust and professionalism. Commercial photography style.',
    width: 1200,
    height: 675,
  },
  {
    name: 'what-can-go-in-dumpster-hero.jpg',
    prompt: 'Professional photograph of an orange roll-off dumpster filled with acceptable waste - construction debris, old furniture, wood, cardboard boxes, renovation materials. Shows variety of items. Residential setting. Educational content. Commercial photography.',
    width: 1200,
    height: 675,
  },
  {
    name: 'how-to-rent-dumpster-hero.jpg',
    prompt: 'Professional photograph of a dumpster delivery truck arriving at a suburban home. Driver stepping out of cab, homeowner waving from driveway. Welcoming, easy process depicted. Sunny day, friendly interaction. Commercial photography style.',
    width: 1200,
    height: 675,
  },
  {
    name: 'dumpster-sizes-comparison.jpg',
    prompt: 'Infographic-style professional photograph of different dumpster sizes with a person standing next to each for scale reference. 10-yard, 20-yard, 30-yard dumpsters in a row. Clean industrial background. Size comparison educational image.',
    width: 1200,
    height: 675,
  },
];

// ============ MAIN EXECUTION ============

async function generateAllImages() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║       GENERATING ALL SITE IMAGES WITH NANO-BANANA-PRO      ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const baseDir = path.join(process.cwd(), 'public', 'images');

  // 1. Hero Images
  console.log('\n📸 HERO IMAGES (Homepage)\n' + '─'.repeat(40));
  const heroDir = path.join(baseDir, 'hero');
  await ensureDir(heroDir);

  for (const img of HERO_IMAGES) {
    console.log(`\n→ ${img.name}`);
    try {
      const url = await generateImage(img.prompt, img.width, img.height);
      const localPath = path.join(heroDir, img.name);
      await downloadImage(url, localPath);
      console.log(`  ✅ Saved to ${localPath}`);
    } catch (error) {
      console.error(`  ❌ Error:`, error);
    }
  }

  // 2. Service Images
  console.log('\n\n📸 SERVICE IMAGES\n' + '─'.repeat(40));
  const servicesDir = path.join(baseDir, 'services');
  await ensureDir(servicesDir);

  for (const img of SERVICE_IMAGES) {
    console.log(`\n→ ${img.name}`);
    try {
      const url = await generateImage(img.prompt, img.width, img.height);
      const localPath = path.join(servicesDir, img.name);
      await downloadImage(url, localPath);
      console.log(`  ✅ Saved to ${localPath}`);
    } catch (error) {
      console.error(`  ❌ Error:`, error);
    }
  }

  // 3. Dumpster Size Images
  console.log('\n\n📸 DUMPSTER SIZE IMAGES\n' + '─'.repeat(40));
  const dumpstersDir = path.join(baseDir, 'dumpsters');
  await ensureDir(dumpstersDir);

  for (const img of DUMPSTER_SIZE_IMAGES) {
    console.log(`\n→ ${img.name}`);
    try {
      const url = await generateImage(img.prompt, img.width, img.height);
      const localPath = path.join(dumpstersDir, img.name);
      await downloadImage(url, localPath);
      console.log(`  ✅ Saved to ${localPath}`);
    } catch (error) {
      console.error(`  ❌ Error:`, error);
    }
  }

  // 4. Blog Images
  console.log('\n\n📸 BLOG IMAGES\n' + '─'.repeat(40));
  const blogDir = path.join(baseDir, 'blog');
  await ensureDir(blogDir);

  for (const img of BLOG_IMAGES) {
    console.log(`\n→ ${img.name}`);
    try {
      const url = await generateImage(img.prompt, img.width, img.height);
      const localPath = path.join(blogDir, img.name);
      await downloadImage(url, localPath);
      console.log(`  ✅ Saved to ${localPath}`);
    } catch (error) {
      console.error(`  ❌ Error:`, error);
    }
  }

  console.log('\n\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                    ALL IMAGES COMPLETE!                     ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const totalImages = HERO_IMAGES.length + SERVICE_IMAGES.length + DUMPSTER_SIZE_IMAGES.length + BLOG_IMAGES.length;
  console.log(`Total images generated: ${totalImages}`);
  console.log('\nNext steps:');
  console.log('1. Review images in public/images/');
  console.log('2. npm run build');
  console.log('3. Deploy to server');
}

generateAllImages().catch(console.error);
