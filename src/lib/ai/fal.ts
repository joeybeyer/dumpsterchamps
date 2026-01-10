/**
 * Fal.ai Image Generation Client
 * Generates unique images for city pages, neighborhoods, and blog posts
 */

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

type ImageModel = 'flux-pro' | 'flux-dev' | 'sdxl' | 'nano-banana-pro';

interface GenerateImageOptions {
  model?: ImageModel;
  width?: number;
  height?: number;
  numImages?: number;
}

const MODEL_ENDPOINTS: Record<ImageModel, string> = {
  'flux-pro': 'fal-ai/flux-pro',
  'flux-dev': 'fal-ai/flux/dev',
  'sdxl': 'fal-ai/stable-diffusion-xl',
  'nano-banana-pro': 'fal-ai/nano-banana-pro',
};

/**
 * Generate an image using Fal.ai
 */
export async function generateImage(
  prompt: string,
  options: GenerateImageOptions = {}
): Promise<string> {
  const {
    model = 'flux-dev',
    width = 1280,
    height = 720,
    numImages = 1,
  } = options;

  const apiKey = process.env.FAL_KEY;

  if (!apiKey) {
    console.warn('FAL_KEY not set - skipping image generation');
    return '';
  }

  const endpoint = MODEL_ENDPOINTS[model];

  const response = await fetch(`https://fal.run/${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      image_size: {
        width,
        height,
      },
      num_images: numImages,
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

/**
 * Generate a city hero image
 */
export async function generateCityHeroImage(
  cityName: string,
  stateName: string
): Promise<string> {
  const prompt = `Professional photograph of a clean orange roll-off dumpster in front of a typical ${cityName}, ${stateName} residential home. Sunny day, well-maintained lawn, driveway visible. The dumpster has "DUMPSTER CHAMPS" branding. Realistic, high quality, commercial photography style.`;

  return generateImage(prompt, {
    model: 'flux-pro',
    width: 1200,
    height: 630, // OG image dimensions
  });
}

/**
 * Generate a neighborhood context image
 */
export async function generateNeighborhoodImage(
  neighborhoodName: string,
  cityName: string,
  description?: string
): Promise<string> {
  const contextHint = description ? ` The area features ${description}.` : '';

  const prompt = `Professional photograph showing a roll-off dumpster being used for a home renovation project in the ${neighborhoodName} neighborhood of ${cityName}.${contextHint} Workers are loading debris. Daytime, realistic, documentary style photography.`;

  return generateImage(prompt, {
    model: 'flux-dev',
    width: 800,
    height: 600,
  });
}

/**
 * Generate a blog post header image
 */
export async function generateBlogImage(
  topic: string,
  cityName: string
): Promise<string> {
  // Map topics to appropriate visual prompts
  const topicPrompts: Record<string, string> = {
    sizing: `Comparison of different sized roll-off dumpsters (10, 20, 30, 40 yard) lined up in a row at a ${cityName} construction site. Clear size differences visible. Professional commercial photography.`,
    pricing: `A homeowner in ${cityName} reviewing a dumpster rental invoice on a clipboard with a contractor, standing next to an orange dumpster. Friendly, professional interaction.`,
    permits: `${cityName} city hall building exterior with a dumpster permit document visible in the foreground. Official, professional setting.`,
    climate: `Dumpster rental in progress during typical ${cityName} weather conditions. Practical outdoor work scene.`,
    roofing: `Roofing contractors loading old shingles into a large roll-off dumpster at a ${cityName} home. Active work scene, sunny day.`,
    renovation: `Home renovation project in ${cityName} with workers carrying debris to a dumpster. Interior demolition visible through doorway.`,
    cleanout: `Estate cleanout in progress - furniture and household items being loaded into a dumpster at a ${cityName} residential property.`,
    construction: `Active construction site in ${cityName} with multiple roll-off dumpsters for different waste types. Professional jobsite.`,
  };

  const prompt = topicPrompts[topic] ||
    `Professional dumpster rental service in action at a ${cityName} property. Clean, well-organized work scene.`;

  return generateImage(prompt, {
    model: 'sdxl', // Cheaper for blog images
    width: 1200,
    height: 675, // 16:9 aspect ratio
  });
}

/**
 * Download and save image locally
 */
export async function downloadImage(
  url: string,
  localPath: string
): Promise<void> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  const fs = await import('fs/promises');
  await fs.writeFile(localPath, Buffer.from(buffer));
}
