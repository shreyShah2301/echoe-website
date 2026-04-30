// Generate raster image assets from source SVGs.
// Run with `npm run og` after editing the SVG sources.
//
// Outputs:
//   public/og-image.png         (1200x630, from public/og-image.svg)
//   public/apple-touch-icon.png (180x180, from public/echoe-icon-256.svg)

import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

async function renderPng({ srcSvg, outPng, width, height, density = 144, background = '#F5F1E8' }) {
  const svg = readFileSync(srcSvg);
  const png = await sharp(svg, { density })
    .resize(width, height, { fit: 'contain', background })
    .png({ quality: 95 })
    .toBuffer();
  writeFileSync(outPng, png);
  console.log(`Wrote ${outPng} (${png.length} bytes, ${width}x${height})`);
}

await renderPng({
  srcSvg: join(root, 'public', 'og-image.svg'),
  outPng: join(root, 'public', 'og-image.png'),
  width: 1200,
  height: 630,
});

await renderPng({
  srcSvg: join(root, 'public', 'echoe-icon-256.svg'),
  outPng: join(root, 'public', 'apple-touch-icon.png'),
  width: 180,
  height: 180,
  density: 384,
});
