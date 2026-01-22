import sharp from 'sharp';
import * as fs from 'fs/promises';

const inputPath = 'public/images/hero/hero-homeowner-desktop.jpg';
const outputPath = 'deploy/public/images/hero/hero-homeowner-desktop.jpg';

const stats = await fs.stat(inputPath);
console.log('Original size:', Math.round(stats.size / 1024), 'KB');

const buffer = await sharp(inputPath)
  .jpeg({ quality: 82, mozjpeg: true })
  .toBuffer();

await fs.writeFile(outputPath, buffer);

const newStats = await fs.stat(outputPath);
console.log('Optimized size:', Math.round(newStats.size / 1024), 'KB');
console.log('Savings:', Math.round((1 - newStats.size / stats.size) * 100), '%');
