/**
 * Generate dumpster images for each size using Fal.ai
 * Run with: npx tsx prisma/generate-dumpster-images.ts
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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

const DUMPSTER_SIZES = [
  { size: 10, dimensions: "12' × 8' × 3.5'", capacity: "2-3 pickup truck loads" },
  { size: 15, dimensions: "14' × 8' × 4'", capacity: "4-5 pickup truck loads" },
  { size: 20, dimensions: "22' × 8' × 4.5'", capacity: "6-8 pickup truck loads" },
  { size: 30, dimensions: "22' × 8' × 6'", capacity: "9-12 pickup truck loads" },
  { size: 40, dimensions: "22' × 8' × 8'", capacity: "12-16 pickup truck loads" },
];

async function generateImage(prompt: string): Promise<string> {
  const apiKey = process.env.FAL_KEY;

  if (!apiKey) {
    throw new Error('FAL_KEY not set in environment');
  }

  console.log('Generating image...');

  const response = await fetch('https://fal.run/fal-ai/flux/dev', {
    method: 'POST',
    headers: {
      'Authorization': `Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      image_size: {
        width: 800,
        height: 600,
      },
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
  console.log(`Downloading to ${localPath}...`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  await fs.writeFile(localPath, Buffer.from(buffer));
}

async function ensureDirectory(dirPath: string): Promise<void> {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function main() {
  console.log('=== Generating Dumpster Images ===\n');

  // Ensure output directory exists
  const outputDir = path.join(process.cwd(), 'public', 'images', 'dumpsters');
  await ensureDirectory(outputDir);

  for (const dumpster of DUMPSTER_SIZES) {
    console.log(`\n--- ${dumpster.size} Yard Dumpster ---`);

    const prompt = `Professional product photograph of a ${dumpster.size}-yard roll-off dumpster on a clean residential driveway. The dumpster is bright orange/yellow construction color with visible size marking "${dumpster.size} YD". Dimensions approximately ${dumpster.dimensions}. Clean, sunny day, professional commercial photography style. The dumpster is the main focus, photographed at a 3/4 angle showing both the front and side. White background fading to light gray. High quality, sharp, well-lit product photography. No text overlays.`;

    try {
      const imageUrl = await generateImage(prompt);
      console.log(`Generated: ${imageUrl.substring(0, 50)}...`);

      const filename = `${dumpster.size}-yard.webp`;
      const localPath = path.join(outputDir, filename);

      await downloadImage(imageUrl, localPath);
      console.log(`Saved: ${filename}`);

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Failed for ${dumpster.size} yard:`, error);
    }
  }

  console.log('\n=== Done! ===');
  console.log(`Images saved to: ${outputDir}`);
}

main().catch(console.error);
