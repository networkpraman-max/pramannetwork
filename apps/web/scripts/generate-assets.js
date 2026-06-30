import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

// Check if dist folder exists
if (!fs.existsSync(distDir)) {
  console.error('Dist directory does not exist. Cannot generate sitemap and robots.txt.');
  process.exit(1);
}

const sitemapPath = path.join(distDir, 'sitemap.xml');
const robotsPath = path.join(distDir, 'robots.txt');

const publicUrls = [
  { url: '', changefreq: 'monthly', priority: '1.0' },
  { url: 'dashboard', changefreq: 'monthly', priority: '0.8' },
  { url: 'contact', changefreq: 'monthly', priority: '0.5' },
  { url: 'privacy', changefreq: 'yearly', priority: '0.3' },
  { url: 'terms', changefreq: 'yearly', priority: '0.3' },
  { url: 'talent-coming-soon', changefreq: 'monthly', priority: '0.5' }
];

const today = new Date().toISOString().split('T')[0];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicUrls.map(item => `  <url>
    <loc>https://praman.network/${item.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const robotsContent = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /dashboard/api/

Sitemap: https://praman.network/sitemap.xml
`;

fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
console.log('Successfully generated sitemap.xml in dist/');

fs.writeFileSync(robotsPath, robotsContent, 'utf8');
console.log('Successfully generated robots.txt in dist/');
