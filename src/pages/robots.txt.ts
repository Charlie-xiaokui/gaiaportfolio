import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';

export const GET: APIRoute = () =>
  new Response(
    ['User-agent: *', 'Allow: /', 'Disallow: /admin/', 'Disallow: /api/', '', `Sitemap: ${new URL('/sitemap-index.xml', siteConfig.siteUrl)}`, ''].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
