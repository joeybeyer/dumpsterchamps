/**
 * Optimize images for web - reduce file sizes while maintaining quality
 */

import sharp from 'sharp';
import * as fs from 'fs/promises';
import * as path from 'path';

async function optimizeImage(inputPath: string, quality: number = 80): Promise<void> {
  const stats = await fs.stat(inputPath);
  const originalSize = stats.size;

  // Read and optimize
  const buffer = await sharp(inputPath)
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();

  // Write back
  await fs.writeFile(inputPath, buffer);

  const newStats = await fs.stat(inputPath);
  const newSize = newStats.size;
  const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

  console.log(`${path.basename(inputPath)}: ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB (${savings}% smaller)`);
}

async function main() {
  console.log('Optimizing images for web...\n');

  const imagesToOptimize = [
    'deploy/public/images/hero/hero-homeowner-desktop.jpg',
    'deploy/public/images/hero/hero-homeowner-mobile.jpg',
    'deploy/public/images/hero/hero-contractor-desktop.jpg',
    'deploy/public/images/services/roll-off-dumpster-rental.jpg',
    'deploy/public/images/services/residential-dumpsters.jpg',
    'deploy/public/images/services/construction-dumpsters.jpg',
  ];

  for (const imgPath of imagesToOptimize) {
    const fullPath = path.join(process.cwd(), imgPath);
    try {
      await optimizeImage(fullPath, 82);
    } catch (error) {
      console.error(`Error optimizing ${imgPath}: ${error}`);
    }
  }

  console.log('\nDone!');
}

main();
