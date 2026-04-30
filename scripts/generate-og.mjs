// Convert public/og-image.svg → public/og-image.png (1200x630).
// Run with `npm run og` after editing the SVG.

import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const svgPath = join(root, 'public', 'og-image.svg');
const pngPath = join(root, 'public', 'og-image.png');

const svg = readFileSync(svgPath);
const png = await sharp(svg, { density: 144 })
  .resize(1200, 630, { fit: 'contain', background: '#F5F1E8' })
  .png({ quality: 95 })
  .toBuffer();

writeFileSync(pngPath, png);
console.log(`Wrote ${pngPath} (${png.length} bytes)`);
