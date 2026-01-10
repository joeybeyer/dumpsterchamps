/**
 * Regenerate just the 5 dumpster size images
 * Run with: npx tsx prisma/generate-size-images.ts
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
  width: number = 800,
  height: number = 600
): Promise<string> {
  const apiKey = process.env.FAL_KEY;

  if (!apiKey) {
    throw new Error('FAL_KEY not set in environment');
  }

  console.log('  Calling ' + MODEL + '...');

  const response = await fetch('https://fal.run/' + MODEL, {
    method: 'POST',
    headers: {
      'Authorization': 'Key ' + apiKey,
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
    throw new Error('Fal.ai API error: ' + response.status + ' - ' + error);
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
    throw new Error('Failed to download image: ' + response.status);
  }
  const buffer = await response.arrayBuffer();
  await fs.writeFile(localPath, Buffer.from(buffer));
}

const DUMPSTER_SIZE_IMAGES = [
  {
    name: '10-yard.jpg',
    prompt: 'Professional photograph of a small 10-yard plain yellow roll-off dumpster in a residential driveway. Compact size, about 12 feet long. No logos, no text, no branding, completely unbranded solid yellow container. Single-car garage visible for scale. Clean, sunny day. Commercial product photography style.',
  },
  {
    name: '15-yard.jpg',
    prompt: 'Professional photograph of a 15-yard plain yellow roll-off dumpster in a residential driveway. Medium-small size, good for bathroom renovation debris. No logos, no text, no branding, completely unbranded solid yellow container. House and lawn visible for scale. Clean, sunny suburban setting. Commercial product photography.',
  },
  {
    name: '20-yard.jpg',
    prompt: 'Professional photograph of a 20-yard plain yellow roll-off dumpster at a home renovation site. Medium size, most popular for home projects. No logos, no text, no branding, completely unbranded solid yellow container. Construction debris visible inside. Suburban home background. Bright daylight, commercial photography style.',
  },
  {
    name: '30-yard.jpg',
    prompt: 'Professional photograph of a large 30-yard plain yellow roll-off dumpster at a major home renovation or small construction site. Larger size with high walls. No logos, no text, no branding, completely unbranded solid yellow container. Roofing shingles and construction debris inside. Commercial photography, bright day.',
  },
  {
    name: '40-yard.jpg',
    prompt: 'Professional photograph of an extra-large 40-yard plain yellow roll-off dumpster at a commercial construction site. Largest size available, very tall walls. No logos, no text, no branding, completely unbranded solid yellow container. Major demolition debris inside. Industrial setting. Professional commercial photography.',
  },
];

async function generateSizeImages() {
  console.log('Regenerating 5 dumpster size images (unbranded yellow)...\n');

  const dumpstersDir = path.join(process.cwd(), 'public', 'images', 'dumpsters');

  for (const img of DUMPSTER_SIZE_IMAGES) {
    console.log('\n-> ' + img.name);
    try {
      const url = await generateImage(img.prompt, 800, 600);
      const localPath = path.join(dumpstersDir, img.name);
      await downloadImage(url, localPath);
      console.log('  Saved to ' + localPath);
    } catch (error) {
      console.error('  Error:', error);
    }
  }

  console.log('\n\nAll 5 dumpster size images regenerated!');
}

generateSizeImages().catch(console.error);
