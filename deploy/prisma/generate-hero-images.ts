/**
 * Generate Hero Images for Homepage
 *
 * Following CRO playbook principles:
 * - Person looking RIGHT toward CTA (gaze principle)
 * - Orange/coral shirt to match CTA color (#f97316)
 * - Homeowner or contractor persona
 * - Satisfied, confident expression
 * - Context: near dumpster or renovation scene
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

async function generateHeroImages() {
  console.log('Generating hero images for homepage...\n');

  // Ensure directory exists
  const heroDir = path.join(process.cwd(), 'public', 'images', 'hero');
  await fs.mkdir(heroDir, { recursive: true });

  // Desktop hero image - Dumpster in motion, being delivered
  // Shows the actual product/service in action for immediate clarity
  const desktopPrompt = `Professional photograph of a roll-off dumpster truck actively unloading an orange dumpster onto a suburban home driveway. The truck's hydraulic arm is tilted, dumpster sliding off the back - caught in the moment of delivery. Sunny day, well-maintained residential neighborhood with green lawn. Action shot showing the service in progress. High quality commercial photography, bright natural lighting, dynamic composition.`;

  // Mobile hero image - Dumpster delivery in action
  const mobilePrompt = `Professional photograph of a roll-off dumpster truck delivering an orange dumpster to a residential driveway. The truck bed is tilted at an angle, dumpster being placed - action shot mid-delivery. Sunny day, clean suburban setting. Commercial photography style, bright natural lighting, shows the delivery process.`;

  // Contractor variant for A/B testing - dumpster at construction site
  const contractorPrompt = `Professional photograph of a roll-off dumpster truck delivering an orange dumpster to an active construction site. The truck is in motion, hydraulic arm tilted, placing the dumpster. Construction workers visible in background. Action shot, dynamic composition. High quality commercial photography, bright daylight.`;

  const images = [
    {
      name: 'hero-homeowner-desktop.jpg',
      prompt: desktopPrompt,
      width: 800,
      height: 1000,  // Portrait orientation for left column
    },
    {
      name: 'hero-homeowner-mobile.jpg',
      prompt: mobilePrompt,
      width: 800,
      height: 600,
    },
    {
      name: 'hero-contractor-desktop.jpg',
      prompt: contractorPrompt,
      width: 800,
      height: 1000,
    },
  ];

  for (const img of images) {
    console.log(`Generating ${img.name}...`);
    try {
      const url = await generateImage(img.prompt, {
        model: 'flux-pro',
        width: img.width,
        height: img.height,
      });

      if (url) {
        const localPath = path.join(heroDir, img.name);
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

generateHeroImages().catch(console.error);
