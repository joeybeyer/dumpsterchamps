/**
 * Regenerate how-to-rent-dumpster-hero.jpg with Dumpster Champs branding
 */

import * as dotenv from 'dotenv';
dotenv.config();

import * as fs from 'fs/promises';
import * as path from 'path';

interface FalResponse {
  images: { url: string }[];
}

async function generateImage(prompt: string): Promise<string> {
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
      image_size: { width: 1200, height: 630 },
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

async function main() {
  console.log('Regenerating how-to-rent-dumpster-hero.jpg with Dumpster Champs branding...\n');

  const prompt = `Professional photograph of a dumpster delivery scene at a suburban home. A friendly delivery driver wearing an orange safety vest with "DUMPSTER CHAMPS" text on the back is handing paperwork to a smiling female homeowner in her 30s. Bright orange roll-off dumpster with "Dumpster Champs" branding visible in driveway background. Sunny day, green lawn, nice suburban house. Professional editorial photography. Warm customer service interaction.`;

  try {
    const url = await generateImage(prompt);
    const localPath = path.join(process.cwd(), 'public', 'images', 'blog', 'how-to-rent-dumpster-hero.jpg');
    await downloadImage(url, localPath);
    console.log(`✓ Saved to ${localPath}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
