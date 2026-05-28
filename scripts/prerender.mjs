import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import fs from 'node:fs';

const vite = await createServer({
  configFile: false,
  server: { middlewareMode: true },
  appType: 'custom',
  plugins: [react()],
});

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
  const appHtml = renderToString(createElement(App));

  const { default: PrivacyPage } = await vite.ssrLoadModule('/src/components/Privacy.jsx');
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
} finally {
  await vite.close();
}
