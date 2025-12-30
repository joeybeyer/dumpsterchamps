/**
 * Generate Service Page Images
 *
 * Creates relevant hero images for each service page
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

async function generateServiceImages() {
  console.log('Generating service page images...\n');

  // Ensure directory exists
  const servicesDir = path.join(process.cwd(), 'public', 'images', 'services');
  await fs.mkdir(servicesDir, { recursive: true });

  const services = [
    {
      name: 'roll-off-dumpster-rental.jpg',
      prompt: `Professional photograph of a bright orange roll-off dumpster being delivered to a suburban home driveway by a roll-off truck. The homeowner is standing nearby looking satisfied. Sunny day, well-maintained residential neighborhood. Clean, professional waste management service in action. High quality, commercial photography style.`,
      width: 800,
      height: 600,
    },
    {
      name: 'construction-dumpsters.jpg',
      prompt: `Professional photograph of a large construction dumpster at an active commercial construction site. Workers in hard hats and safety vests visible. The dumpster is filled with construction debris - lumber, drywall, materials. Modern construction project, professional job site. High quality, commercial photography.`,
      width: 800,
      height: 600,
    },
    {
      name: 'residential-dumpsters.jpg',
      prompt: `Professional photograph of a compact residential dumpster in a suburban driveway. A family is doing a garage cleanout, loading boxes and old items into the dumpster. Clean residential setting, sunny weekend project. Friendly, approachable home improvement scene. High quality photography.`,
      width: 800,
      height: 600,
    },
  ];

  for (const img of services) {
    console.log(`Generating ${img.name}...`);
    try {
      const url = await generateImage(img.prompt, {
        model: 'flux-pro',
        width: img.width,
        height: img.height,
      });

      if (url) {
        const localPath = path.join(servicesDir, img.name);
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

generateServiceImages().catch(console.error);
