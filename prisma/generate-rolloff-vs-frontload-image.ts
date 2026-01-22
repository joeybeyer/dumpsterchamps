/**
 * Generate Roll-Off vs Front-Load Comparison Image
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
  const { model = 'flux-pro', width = 1200, height = 630 } = options;
  const apiKey = process.env.FAL_KEY;

  if (!apiKey) {
    throw new Error('FAL_KEY not set in environment');
  }

  console.log(`Using FAL_KEY: ${apiKey.substring(0, 10)}...`);

  const endpoint = 'fal-ai/nano-banana-pro';

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

async function generateRolloffVsFrontloadImage() {
  console.log('Generating roll-off vs front-load comparison image...\n');

  const blogDir = path.join(process.cwd(), 'public', 'images', 'blog');
  await fs.mkdir(blogDir, { recursive: true });

  const img = {
    name: 'roll-off-vs-front-load.jpg',
    prompt: `Professional split-screen comparison photograph showing two types of dumpsters side by side. On the left: a roll-off dumpster (rectangular, open-top container with wheels, typically used for construction and renovation projects, being delivered by a truck with hydraulic lift). On the right: a front-load dumpster (smaller, enclosed commercial dumpster with slanted lids, typically seen behind businesses and emptied by garbage trucks). Both dumpsters are clean, orange/rust colored. Clear industrial setting with blue sky. Professional photography, educational comparison shot, high detail, excellent lighting. Labels or visual indicators showing "ROLL-OFF" and "FRONT-LOAD" distinction.`,
    width: 1200,
    height: 630,
  };

  console.log(`Generating ${img.name}...`);
  try {
    const url = await generateImage(img.prompt, {
      model: 'flux-pro',
      width: img.width,
      height: img.height,
    });

    if (url) {
      const localPath = path.join(blogDir, img.name);
      await downloadImage(url, localPath);
      console.log(`✓ Saved to ${localPath}`);
    } else {
      console.log(`✗ Failed to generate ${img.name} - no URL returned`);
    }
  } catch (error) {
    console.error(`✗ Error generating ${img.name}:`, error);
  }

  console.log('\nDone!');
}

generateRolloffVsFrontloadImage().catch(console.error);
