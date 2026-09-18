import express from 'express';
import env from '../config/env.js';

const router = express.Router();

const routes = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/services', changefreq: 'weekly', priority: '0.9' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/portfolio', changefreq: 'weekly', priority: '0.8' },
  { path: '/corporate', changefreq: 'monthly', priority: '0.8' },
  { path: '/institute', changefreq: 'monthly', priority: '0.8' },
  { path: '/school', changefreq: 'monthly', priority: '0.8' },
  { path: '/consultation', changefreq: 'monthly', priority: '0.8' },
  { path: '/hellogini', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
];

router.get('/sitemap.xml', (req, res) => {
  const host = req.get('host');
  const protocol = req.protocol || 'https';
  // Use frontend URL if configured and not wildcard, otherwise construct from request or fallback
  let baseUrl = 'https://aixpertslabs.com';
  if (env.frontendUrl && env.frontendUrl !== '*' && !env.frontendUrl.includes('localhost')) {
    baseUrl = env.frontendUrl.split(',')[0].trim();
  } else if (process.env.SITE_URL) {
    baseUrl = process.env.SITE_URL;
  }
  baseUrl = baseUrl.replace(/\/+$/, '');

  const currentDate = new Date().toISOString().split('T')[0];

  const urlsXml = routes
    .map((r) => {
      const fullUrl = `${baseUrl}${r.path === '/' ? '' : r.path}`;
      return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlsXml}
</urlset>`;

  res.header('Content-Type', 'application/xml; charset=utf-8');
  res.header('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
  res.send(xml);
});

router.get('/robots.txt', (req, res) => {
  let baseUrl = 'https://aixpertslabs.com';
  if (env.frontendUrl && env.frontendUrl !== '*' && !env.frontendUrl.includes('localhost')) {
    baseUrl = env.frontendUrl.split(',')[0].trim();
  } else if (process.env.SITE_URL) {
    baseUrl = process.env.SITE_URL;
  }
  baseUrl = baseUrl.replace(/\/+$/, '');

  const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap Index
Sitemap: ${baseUrl}/sitemap.xml
`;

  res.header('Content-Type', 'text/plain; charset=utf-8');
  res.header('Cache-Control', 'public, max-age=86400');
  res.send(robots);
});

export default router;
