/**
 * Generate All Brand Images for Dumpster Champs
 * Using nano-banana-pro model with cohesive brand styling
 *
 * Brand Colors:
 * - Primary Orange: #ee7a1c (bright orange dumpsters)
 * - Dark Orange: #df5f12
 *
 * Style Guidelines:
 * - All dumpsters should be bright orange/rust colored
 * - Professional, clean photography style
 * - Sunny days with blue skies
 * - Workers in orange safety vests when present
 * - Residential and commercial settings
 */

import * as dotenv from 'dotenv';
dotenv.config();

import * as fs from 'fs/promises';
import * as path from 'path';

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
  options: { width?: number; height?: number } = {}
): Promise<string> {
  const { width = 1200, height = 800 } = options;
  const apiKey = process.env.FAL_KEY;

  if (!apiKey) {
    throw new Error('FAL_KEY not set in environment');
  }

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

// Brand style constants for consistent prompts
const BRAND_STYLE = `bright orange roll-off dumpster, professional commercial photography, sunny day with clear blue sky, high quality, sharp detail, realistic`;
const WORKER_STYLE = `worker wearing orange safety vest and hard hat`;

async function generateAllBrandImages() {
  console.log('🎨 Generating Dumpster Champs brand images with nano-banana-pro\n');

  const servicesDir = path.join(process.cwd(), 'public', 'images', 'services');
  const dumpstersDir = path.join(process.cwd(), 'public', 'images', 'dumpsters');
  const blogDir = path.join(process.cwd(), 'public', 'images', 'blog');

  await fs.mkdir(servicesDir, { recursive: true });
  await fs.mkdir(dumpstersDir, { recursive: true });
  await fs.mkdir(blogDir, { recursive: true });

  const images = [
    // Service Pages
    {
      name: 'roll-off-dumpster-rental.jpg',
      dir: servicesDir,
      prompt: `Professional photograph of a ${BRAND_STYLE}. A roll-off truck with hydraulic lift is delivering a large bright orange dumpster to a suburban driveway. ${WORKER_STYLE} guiding the placement. Beautiful suburban home in background. Action shot showing the dumpster being lowered. Wide angle composition.`,
      width: 1200,
      height: 800,
    },
    {
      name: 'residential-dumpsters.jpg',
      dir: servicesDir,
      prompt: `Professional photograph of a medium-sized ${BRAND_STYLE} in a residential driveway. Homeowner loading boxes and renovation debris. Well-maintained suburban home with green lawn. The dumpster is clean and positioned neatly. Warm afternoon lighting. Family-friendly scene showing ease of use.`,
      width: 1200,
      height: 800,
    },
    {
      name: 'construction-dumpsters.jpg',
      dir: servicesDir,
      prompt: `Professional photograph of a large ${BRAND_STYLE} at an active construction site. ${WORKER_STYLE} loading lumber and construction debris. Commercial building under construction in background. Multiple workers visible. Professional construction environment. Industrial feel with organized job site.`,
      width: 1200,
      height: 800,
    },

    // Size Pages - Each showing the specific size in context
    {
      name: '10-yard.jpg',
      dir: dumpstersDir,
      prompt: `Professional photograph of a compact 10-yard ${BRAND_STYLE} in a residential driveway. Small footprint, fits easily next to garage. Homeowner loading garage cleanout items - boxes, old furniture. Cozy suburban home setting. The dumpster appears appropriately small for residential use. Text "10 YD" visible on side.`,
      width: 1200,
      height: 800,
    },
    {
      name: '15-yard.jpg',
      dir: dumpstersDir,
      prompt: `Professional photograph of a 15-yard ${BRAND_STYLE} in a driveway. Medium-sized container being loaded with bathroom renovation debris - tile, drywall, fixtures. Suburban home renovation project. ${WORKER_STYLE} assisting homeowner. The dumpster shows moderate capacity. Text "15 YD" visible on side.`,
      width: 1200,
      height: 800,
    },
    {
      name: '20-yard.jpg',
      dir: dumpstersDir,
      prompt: `Professional photograph of a 20-yard ${BRAND_STYLE} - the most popular size. Large dumpster in a driveway with roofing shingles being loaded. Roofing crew on house in background. The dumpster is substantial but fits residential driveways. Text "20 YD" visible on side. Professional roofing job in progress.`,
      width: 1200,
      height: 800,
    },
    {
      name: '30-yard.jpg',
      dir: dumpstersDir,
      prompt: `Professional photograph of a large 30-yard ${BRAND_STYLE} at a major renovation site. Very large container filled with mixed construction debris. ${WORKER_STYLE} using wheelbarrow. Significant home addition or remodel project visible. The dumpster dominates the scene showing substantial capacity. Text "30 YD" visible.`,
      width: 1200,
      height: 800,
    },
    {
      name: '40-yard.jpg',
      dir: dumpstersDir,
      prompt: `Professional photograph of the largest 40-yard ${BRAND_STYLE} at a commercial construction site. Massive container with high walls. Construction crew loading demolition debris with equipment. Large commercial building project. Industrial scale waste removal. Text "40 YD" prominently visible. Professional construction environment.`,
      width: 1200,
      height: 800,
    },

    // Blog/Guide Images
    {
      name: 'dumpster-sizes-guide-hero.jpg',
      dir: blogDir,
      prompt: `Professional photograph showing multiple bright orange roll-off dumpsters lined up in a row for size comparison. From left to right: small 10-yard, medium 20-yard, and large 40-yard dumpsters. Clean commercial yard setting. Clear size progression visible. Blue sky background. Educational comparison shot showing the range of available sizes.`,
      width: 1200,
      height: 630,
    },
    {
      name: 'dumpster-pricing-guide-hero.jpg',
      dir: blogDir,
      prompt: `Professional photograph of a satisfied homeowner in their 40s reviewing paperwork at kitchen table. Calculator, laptop with pricing information visible. They look confident and happy about fair pricing. Modern bright kitchen with orange accent items. The scene conveys transparent, honest business. Professional editorial photography style.`,
      width: 1200,
      height: 630,
    },
    {
      name: 'how-to-rent-dumpster-hero.jpg',
      dir: blogDir,
      prompt: `Professional photograph of a delivery driver in orange vest and branded uniform handing paperwork to a smiling homeowner in their driveway. Bright orange roll-off dumpster just delivered in background. Friendly customer service interaction. Sunny suburban setting. Professional, trustworthy business transaction.`,
      width: 1200,
      height: 630,
    },
  ];

  let successCount = 0;
  let failCount = 0;

  for (const img of images) {
    console.log(`📸 Generating ${img.name}...`);
    try {
      const url = await generateImage(img.prompt, {
        width: img.width,
        height: img.height,
      });

      if (url) {
        const localPath = path.join(img.dir, img.name);
        await downloadImage(url, localPath);
        console.log(`   ✓ Saved to ${localPath}\n`);
        successCount++;
      } else {
        console.log(`   ✗ Failed - no URL returned\n`);
        failCount++;
      }
    } catch (error) {
      console.error(`   ✗ Error: ${error}\n`);
      failCount++;
    }

    // Small delay between requests to be nice to the API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log(`\n🎉 Done! Generated ${successCount}/${images.length} images`);
  if (failCount > 0) {
    console.log(`   ⚠️  ${failCount} images failed`);
  }
}

generateAllBrandImages().catch(console.error);
