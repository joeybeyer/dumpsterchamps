/**
 * Download completed KIE.AI images
 */

import * as dotenv from 'dotenv';
dotenv.config();

import * as fs from 'fs/promises';
import * as path from 'path';

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

  if (data.data?.state === 'success') {
    try {
      const resultJson = JSON.parse(data.data.resultJson);
      const imageUrl = resultJson.resultUrls?.[0];
      return { status: 'completed', imageUrl };
    } catch {
      return { status: 'completed' };
    }
  }

  return { status: data.data?.state || 'unknown' };
}

async function downloadImage(url: string, localPath: string): Promise<void> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  await fs.writeFile(localPath, Buffer.from(buffer));
}

async function main() {
  // Task IDs from KIE.AI logs
  const tasks = [
    { taskId: '4ab5c3aac327386b739dec81e4a7ddb4', filename: 'hero-homeowner-desktop.jpg' },
    { taskId: 'cee5e65beb5cb8894b5ecd1dfa478c36', filename: 'hero-homeowner-desktop-2.jpg' },
  ];

  for (const task of tasks) {
    console.log(`\nQuerying task ${task.taskId}...`);
    try {
      const result = await queryTask(task.taskId);
      console.log(`Status: ${result.status}`);

      if (result.imageUrl) {
        const localPath = path.join(process.cwd(), 'public', 'images', 'hero', task.filename);
        console.log(`Downloading to ${localPath}...`);
        await downloadImage(result.imageUrl, localPath);
        console.log('Done!');
      } else {
        console.log('No image URL found');
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }
}

main();
