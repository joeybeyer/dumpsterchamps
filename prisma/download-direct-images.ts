/**
 * Download images from direct URLs
 */

import * as fs from 'fs/promises';
import * as path from 'path';

async function downloadImage(url: string, localPath: string): Promise<void> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  await fs.writeFile(localPath, Buffer.from(buffer));
  console.log(`Downloaded: ${localPath}`);
}

async function main() {
  const images = [
    {
      url: 'https://tempfile.aiquickdraw.com/image-format-converter/1768159105790-kp7edmskdwa.jpeg',
      path: 'public/images/hero/hero-homeowner-desktop.jpg'
    },
    {
      url: 'https://tempfile.aiquickdraw.com/image-format-converter/1768159129220-m1tvwki5fz.jpeg',
      path: 'public/images/hero/hero-homeowner-desktop-v2.jpg'
    },
    {
      url: 'https://tempfile.aiquickdraw.com/image-format-converter/1768159237668-q9cnqkafjjk.jpeg',
      path: 'public/images/hero/hero-homeowner-desktop-v3.jpg'
    },
    {
      url: 'https://tempfile.aiquickdraw.com/image-format-converter/1768159919062-cj78v3m2tif.jpeg',
      path: 'public/images/hero/hero-homeowner-desktop-v4.jpg'
    },
  ];

  for (const img of images) {
    const localPath = path.join(process.cwd(), img.path);
    await downloadImage(img.url, localPath);
  }

  console.log('\nDone! Check the images and choose the best one.');
}

main();
