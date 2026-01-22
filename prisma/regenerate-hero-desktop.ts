/**
 * Regenerate hero-homeowner-desktop.jpg with correct branding
 * Using KIE.AI nano-banana-pro (async API with polling)
 */

import * as dotenv from 'dotenv';
dotenv.config();

import * as fs from 'fs/promises';
import * as path from 'path';

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function createTask(prompt: string, aspectRatio: string, resolution: string): Promise<string> {
  const apiKey = process.env.KIE_KEY;
  if (!apiKey) throw new Error('KIE_KEY not set');

  const response = await fetch('https://api.kie.ai/api/v1/jobs/createTask', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'nano-banana-pro',
      input: {
        prompt,
        aspect_ratio: aspectRatio,
        resolution,
        output_format: 'jpg',
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Create task error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  if (data.code !== 200 || !data.data?.taskId) {
    throw new Error(`API error: ${JSON.stringify(data)}`);
  }

  return data.data.taskId;
}

async function queryTask(taskId: string): Promise<{ status: string; imageUrl?: string }> {
  const apiKey = process.env.KIE_KEY;
  if (!apiKey) throw new Error('KIE_KEY not set');

  const response = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Query task error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  console.log('Query response:', JSON.stringify(data, null, 2));

  // Check for completion - state is "success"
  if (data.data?.state === 'success') {
    // Parse resultJson to get the image URL
    try {
      const resultJson = JSON.parse(data.data.resultJson);
      const imageUrl = resultJson.resultUrls?.[0];
      return { status: 'completed', imageUrl };
    } catch {
      return { status: 'completed' };
    }
  } else if (data.data?.state === 'failed') {
    return { status: 'failed' };
  }

  return { status: data.data?.state || 'pending' };
}

async function generateImage(prompt: string, width: number, height: number): Promise<string> {
  // Determine aspect ratio based on dimensions
  let aspectRatio = '16:9';
  if (width === height) aspectRatio = '1:1';
  else if (height > width) aspectRatio = '9:16';

  const resolution = width > 1500 ? '2K' : '1K';

  console.log(`Creating task with aspect ratio: ${aspectRatio}, resolution: ${resolution}`);

  // Create the task
  const taskId = await createTask(prompt, aspectRatio, resolution);
  console.log(`Task created: ${taskId}`);

  // Poll for completion
  const maxAttempts = 60; // 2 minutes max
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(2000); // Wait 2 seconds between polls
    console.log(`Polling attempt ${i + 1}...`);

    const result = await queryTask(taskId);

    if (result.status === 'completed' && result.imageUrl) {
      return result.imageUrl;
    } else if (result.status === 'failed' || result.status === 'error') {
      throw new Error(`Task failed: ${result.status}`);
    }
  }

  throw new Error('Task timed out');
}

async function downloadImage(url: string, localPath: string): Promise<void> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  await fs.writeFile(localPath, Buffer.from(buffer));
}

async function main() {
  console.log('Regenerating hero-homeowner-desktop.jpg using KIE.AI...\n');

  const prompt = `Professional wide-angle photograph of a large standard roll-off dumpster (rectangular open-top container, approximately 20 yards, 8 feet wide by 20 feet long) in a suburban driveway. The dumpster is bright orange with white text "DUMPSTER CHAMPS" spelled correctly on the side. A homeowner couple in their 30s-40s happily loading old furniture and renovation debris into the dumpster. Beautiful sunny day, blue sky, well-maintained home with green lawn and landscaping. Professional commercial photography, high quality, sharp detail, realistic.`;

  try {
    const url = await generateImage(prompt, 1920, 1080);
    const localPath = path.join(process.cwd(), 'public', 'images', 'hero', 'hero-homeowner-desktop.jpg');
    await downloadImage(url, localPath);
    console.log(`✓ Saved to ${localPath}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
