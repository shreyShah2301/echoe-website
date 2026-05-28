import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import fs from 'node:fs';
import { resolve } from 'node:path';

const cwd = process.cwd();

// SSR build — pure file I/O, no HTTP listener, no WebSocket port.
// Works in Vercel's build sandbox unlike createServer/ssrLoadModule.
await build({
  configFile: false,
  plugins: [react()],
  build: {
    ssr: true,
    outDir: 'dist-ssr',
    emptyOutDir: true,
    rollupOptions: {
      input: { 'ssr-entry': resolve(cwd, 'src/ssr-entry.jsx') },
      output: { format: 'esm' },
    },
  },
  logLevel: 'warn',
});

const { App, PrivacyPage } = await import(resolve(cwd, 'dist-ssr/ssr-entry.js'));

const appHtml = renderToString(createElement(App));
const privacyHtml = renderToString(createElement(PrivacyPage));

let indexHtml = fs.readFileSync('dist/index.html', 'utf-8');
indexHtml = indexHtml.replace('<div id="app"></div>', `<div id="app">${appHtml}</div>`);
fs.writeFileSync('dist/index.html', indexHtml);

let privacyHtmlFile = fs.readFileSync('dist/privacy.html', 'utf-8');
privacyHtmlFile = privacyHtmlFile.replace('<div id="app"></div>', `<div id="app">${privacyHtml}</div>`);
fs.writeFileSync('dist/privacy.html', privacyHtmlFile);

const verification = fs.readFileSync('dist/index.html', 'utf-8');
if (!verification.includes('Download')) {
  console.error('PRERENDER FAILED: dist/index.html missing expected content');
  process.exit(1);
}
console.log('Prerender verified: content present in dist/index.html');
