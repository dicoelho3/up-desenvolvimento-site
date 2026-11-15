/**
 * /robots.txt — as "regras da casa" para os robôs dos motores de busca:
 * podem visitar o site todo e encontram a lista de páginas em /sitemap.xml.
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
