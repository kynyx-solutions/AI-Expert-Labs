import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base domain configuration - can be overridden via environment variables
const SITE_URL = process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://aixpertslabs.com';
const normalizedBaseUrl = SITE_URL.replace(/\/+$/, '');

// Define all routes with their SEO metadata, change frequency, and priority
const routes = [
  {
    path: '/',
    changefreq: 'daily',
    priority: '1.0',
    title: 'AIxperts Labs - Engineering Intelligence for the Future',
  },
  {
    path: '/services',
    changefreq: 'weekly',
    priority: '0.9',
    title: 'AI Solutions & Strategy Services - AIxperts Labs',
  },
  {
    path: '/about',
    changefreq: 'monthly',
    priority: '0.8',
    title: 'About AIxperts Labs - Premier AI Innovation Hub',
  },
  {
    path: '/portfolio',
    changefreq: 'weekly',
    priority: '0.8',
    title: 'Portfolio & Case Studies - AIxperts Labs',
  },
  {
    path: '/corporate',
    changefreq: 'monthly',
    priority: '0.8',
    title: 'Corporate AI Training & Upskilling - AIxperts Labs',
  },
  {
    path: '/institute',
    changefreq: 'monthly',
    priority: '0.8',
    title: 'AI Courses for Colleges & Institutes - AIxperts Labs',
  },
  {
    path: '/academy',
    changefreq: 'weekly',
    priority: '0.9',
    title: 'AIxperts Academy - AI Certification Programs',
  },
  {
    path: '/school',
    changefreq: 'monthly',
    priority: '0.8',
    title: 'School AI Programs & Workshops - AIxperts Labs',
  },
  {
    path: '/consultation',
    changefreq: 'monthly',
    priority: '0.8',
    title: 'Book a Free AI Consultation - AIxperts Labs',
  },
  {
    path: '/hellogini',
    changefreq: 'monthly',
    priority: '0.7',
    title: 'Hello Gini - Intelligent AI Assistant',
  },
  {
    path: '/contact',
    changefreq: 'monthly',
    priority: '0.7',
    title: 'Contact AIxperts Labs',
  },
  {
    path: '/privacy',
    changefreq: 'yearly',
    priority: '0.3',
    title: 'Privacy Policy - AIxperts Labs',
  },
  {
    path: '/terms',
    changefreq: 'yearly',
    priority: '0.3',
    title: 'Terms of Service - AIxperts Labs',
  },
];

// Same as slugify() in src/data/courses.ts, which the app uses for /academy/:slug.
const slugify = (s) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// One /academy/:slug page per program. The course list lives in TypeScript, which this
// plain-Node script can't import, so read the flagship slug and course titles from its source.
function programRoutes() {
  const source = fs.readFileSync(path.resolve(__dirname, '../src/data/courses.ts'), 'utf8');
  const flagship = source.match(/export const flagship = \{\s*slug: "([^"]+)"/)?.[1];
  const titles = [...source.matchAll(/^\s*\["[a-z]+", "([^"]+)", \d+,/gm)].map((m) => m[1]);

  if (!flagship || titles.length === 0) {
    console.warn('[sitemap] Could not read programs from src/data/courses.ts; program pages not listed.');
  }

  return [...(flagship ? [flagship] : []), ...titles.map(slugify)].map((slug) => ({
    path: `/academy/${slug}`,
    changefreq: 'monthly',
    priority: '0.7',
  }));
}

const allRoutes = () => [...routes, ...programRoutes()];

export function generateSitemapXml(baseUrl = normalizedBaseUrl) {
  const currentDate = new Date().toISOString().split('T')[0];

  const urlsXml = allRoutes()
    .map((route) => {
      const fullUrl = `${baseUrl}${route.path === '/' ? '' : route.path}`;
      return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlsXml}
</urlset>
`;
}

export function generateRobotsTxt(baseUrl = normalizedBaseUrl) {
  return `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap Index
Sitemap: ${baseUrl}/sitemap.xml
`;
}

// Generate files in public directory
function run() {
  const publicDir = path.resolve(__dirname, '../public');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  const robotsPath = path.join(publicDir, 'robots.txt');

  const sitemapXml = generateSitemapXml(normalizedBaseUrl);
  const robotsTxt = generateRobotsTxt(normalizedBaseUrl);

  fs.writeFileSync(sitemapPath, sitemapXml.trimEnd() + '\n', 'utf8');
  console.log(`[sitemap] Generated sitemap.xml with ${allRoutes().length} routes at ${sitemapPath}`);

  fs.writeFileSync(robotsPath, robotsTxt.trimEnd() + '\n', 'utf8');
  console.log(`[sitemap] Generated robots.txt at ${robotsPath}`);
}

// If executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run();
}
