/**
 * Generate Dumpster Size Page Images
 *
 * Creates relevant images for each dumpster size page
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
  options: { model?: string; width?: number; height?: number } = {}
): Promise<string> {
  const { model = 'flux-pro', width = 1280, height = 720 } = options;
  const apiKey = process.env.FAL_KEY;

  if (!apiKey) {
    throw new Error('FAL_KEY not set in environment');
  }

  console.log(`Using FAL_KEY: ${apiKey.substring(0, 10)}...`);

  const endpoint = model === 'flux-pro' ? 'fal-ai/flux-pro' : 'fal-ai/flux/dev';

  const response = await fetch(`https://fal.run/${endpoint}`, {
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

async function generateSizeImages() {
  console.log('Generating dumpster size page images...\n');

  // Ensure directory exists
  const sizesDir = path.join(process.cwd(), 'public', 'images', 'dumpsters');
  await fs.mkdir(sizesDir, { recursive: true });

  const sizes = [
    {
      name: '10-yard.jpg',
      prompt: `Professional photograph of a small 10 yard orange roll-off dumpster in a suburban residential driveway. The dumpster is compact, about 12 feet long and 3.5 feet tall. A homeowner is loading bathroom renovation debris. Clean, well-maintained home in background. Sunny day, professional commercial photography.`,
      width: 800,
      height: 600,
    },
    {
      name: '15-yard.jpg',
      prompt: `Professional photograph of a medium 15 yard orange roll-off dumpster in a residential driveway. The dumpster is about 16 feet long and 4 feet tall. Being used for a medium home renovation project with drywall and flooring debris visible. Suburban home setting, sunny day. Professional commercial photography.`,
      width: 800,
      height: 600,
    },
    {
      name: '20-yard.jpg',
      prompt: `Professional photograph of a 20 yard orange roll-off dumpster, the most popular size, in a driveway. About 22 feet long and 4.5 feet tall. Being used for a roofing project with shingles visible inside. Workers on roof in background. Sunny day, professional commercial photography style.`,
      width: 800,
      height: 600,
    },
    {
      name: '30-yard.jpg',
      prompt: `Professional photograph of a large 30 yard orange roll-off dumpster at a home renovation site. About 22 feet long and 6 feet tall. Major home remodel in progress with construction debris. Large suburban home, professional contractors visible. Professional commercial photography.`,
      width: 800,
      height: 600,
    },
    {
      name: '40-yard.jpg',
      prompt: `Professional photograph of an extra large 40 yard orange roll-off dumpster at a commercial construction site. About 22 feet long and 8 feet tall - the largest size available. Commercial building renovation with significant debris. Professional job site with workers. Commercial photography style.`,
      width: 800,
      height: 600,
    },
  ];

  for (const img of sizes) {
    console.log(`Generating ${img.name}...`);
    try {
      const url = await generateImage(img.prompt, {
        model: 'flux-pro',
        width: img.width,
        height: img.height,
      });

      if (url) {
        const localPath = path.join(sizesDir, img.name);
        await downloadImage(url, localPath);
        console.log(`✓ Saved to ${localPath}`);
      } else {
        console.log(`✗ Failed to generate ${img.name} - no URL returned`);
      }
    } catch (error) {
      console.error(`✗ Error generating ${img.name}:`, error);
    }
    console.log('');
  }

  console.log('Done!');
}

generateSizeImages().catch(console.error);
