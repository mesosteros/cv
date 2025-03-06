import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './src/main.server';
import xmlbuilder from 'xmlbuilder';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  const routes = [
    '/',
    '/skills',
    '/professional',
    '/academic',
    '/training',
    '/hobbies',
  ];

  server.get('/sitemap.xml', (req, res) => {
    const root = xmlbuilder.create('urlset', {
      version: '1.0',
      encoding: 'UTF-8',
    });
    root.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

    routes.forEach((route) => {
      const url = root.ele('url');
      url.ele('loc', `https://www.carlosesantos.com${route}`);
    });

    res.header('Content-Type', 'application/xml');
    res.send(root.end({ pretty: true }));
  });

  server.use((req, res, next) => {
    res.setHeader('X-Robots-Tag', 'all');
    next();
  });

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from /browser
  server.get(
    '**',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: 'index.html',
    })
  );

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;
    const canonicalUrl = `${protocol}://${headers.host}${originalUrl}`;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => {
        const modifiedHtml = html.replace(
          '<head>',
          `<head><link rel="canonical" href="${canonicalUrl}" />`
        );
        return res.send(modifiedHtml);
      })
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
