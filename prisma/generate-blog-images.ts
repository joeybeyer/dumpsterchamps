/**
 * Generate Hero Images for Blog Pillar Pages
 *
 * Creates professional images for:
 * 1. Dumpster Sizes Guide - Multiple dumpster sizes comparison
 * 2. Pricing Guide - Person reviewing quotes/pricing
 * 3. Disposal Guide - What goes in dumpsters visual
 * 4. How to Rent Guide - Dumpster delivery scene
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

async function generateBlogImages() {
  console.log('Generating blog pillar page images...\n');

  // Ensure directory exists
  const blogDir = path.join(process.cwd(), 'public', 'images', 'blog');
  await fs.mkdir(blogDir, { recursive: true });

  const images = [
    {
      name: 'dumpster-sizes-guide-hero.jpg',
      prompt: `Professional photograph showing a row of different sized roll-off dumpsters in a clean commercial yard. From left to right: small 10-yard dumpster, medium 20-yard dumpster, and large 40-yard dumpster. Clear size progression visible. Clean orange/rust colored dumpsters against a clear blue sky. Industrial setting, professional photography, high detail, excellent lighting. The image clearly shows the size comparison between different dumpster sizes.`,
      width: 1200,
      height: 630,
    },
    {
      name: 'dumpster-pricing-guide-hero.jpg',
      prompt: `Professional photograph of a homeowner in their 40s sitting at a kitchen table reviewing dumpster rental quotes on paper. Calculator and laptop visible. They look satisfied and confident about pricing. Bright, well-lit modern kitchen. Orange accent items in scene. Professional photography, editorial style, shallow depth of field. The scene conveys transparent, honest pricing review.`,
      width: 1200,
      height: 630,
    },
    {
      name: 'what-can-go-in-dumpster-hero.jpg',
      prompt: `Professional photograph of a clean roll-off dumpster being filled with acceptable construction and renovation debris. Visible items include wood boards, drywall pieces, cardboard boxes, old furniture. Worker in orange safety vest organizing items. Sunny day, residential driveway setting. Professional photography showing organized, proper dumpster loading. High quality, editorial style.`,
      width: 1200,
      height: 630,
    },
    {
      name: 'how-to-rent-dumpster-hero.jpg',
      prompt: `Professional photograph of a delivery truck placing a clean orange roll-off dumpster in a suburban driveway. The homeowner stands nearby watching the delivery with a satisfied expression. Beautiful sunny day, well-maintained lawn and house visible. Professional photography capturing the moment of dumpster delivery. High quality, editorial style, action shot of the hydraulic lift lowering the dumpster.`,
      width: 1200,
      height: 630,
    },
    {
      name: 'dumpster-sizes-comparison.jpg',
      prompt: `Clean infographic-style photograph showing three roll-off dumpsters side by side for size comparison. 10-yard (small), 20-yard (medium), and 40-yard (large) dumpsters. Clean industrial background. Each dumpster is clearly labeled. Orange/rust colored dumpsters. Professional product photography with even lighting. Educational visual for size comparison.`,
      width: 1200,
      height: 600,
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
        const localPath = path.join(blogDir, img.name);
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

generateBlogImages().catch(console.error);
