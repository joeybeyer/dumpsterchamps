/**
 * Regenerate service page images - NO BRANDING
 * Run with: npx tsx prisma/generate-service-images.ts
 */

import * as dotenv from 'dotenv';
dotenv.config();

import * as fs from 'fs/promises';
import * as path from 'path';

const MODEL = 'fal-ai/nano-banana-pro';

interface FalResponse {
  images: { url: string }[];
}

async function generateImage(prompt: string, width: number, height: number): Promise<string> {
  const apiKey = process.env.FAL_KEY;
  if (!apiKey) throw new Error('FAL_KEY not set');

  console.log('  Generating...');
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

  if (!response.ok) throw new Error('API error: ' + response.status);
  const data: FalResponse = await response.json();
  return data.images[0].url;
}

async function downloadImage(url: string, localPath: string): Promise<void> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  await fs.writeFile(localPath, Buffer.from(buffer));
}

const SERVICE_IMAGES = [
  {
    name: 'roll-off-dumpster-rental.jpg',
    prompt: 'Professional photograph of a plain orange roll-off dumpster sitting in a suburban residential driveway. No truck visible, just the dumpster container alone. No logos, no text, no branding, no company names anywhere. Completely clean unbranded solid orange metal container. Green lawn, nice house in background. Sunny day. High quality commercial photography.',
  },
  {
    name: 'construction-dumpsters.jpg',
    prompt: 'Professional photograph of a large plain orange roll-off dumpster at a construction site filled with construction debris. No truck visible, just the dumpster container alone. No logos, no text, no branding, no company names anywhere. Completely clean unbranded solid orange metal container. Construction workers in background. Bright daylight. Commercial photography.',
  },
  {
    name: 'residential-dumpsters.jpg',
    prompt: 'Professional photograph of a medium plain orange roll-off dumpster in a residential driveway during a home cleanout. Person loading boxes. No truck visible, just the dumpster container alone. No logos, no text, no branding, no company names anywhere. Completely clean unbranded solid orange metal container. Nice suburban home, green lawn. Sunny day. Commercial photography.',
  },
];

async function main() {
  console.log('Regenerating 3 service images (NO BRANDING)...\n');
  const servicesDir = path.join(process.cwd(), 'public', 'images', 'services');

  for (const img of SERVICE_IMAGES) {
    console.log('\n-> ' + img.name);
    try {
      const url = await generateImage(img.prompt, 1200, 800);
      const localPath = path.join(servicesDir, img.name);
      await downloadImage(url, localPath);
      console.log('  Saved!');
    } catch (error) {
      console.error('  Error:', error);
    }
  }
  console.log('\n\nDone! Service images regenerated without any branding.');
}

main().catch(console.error);
