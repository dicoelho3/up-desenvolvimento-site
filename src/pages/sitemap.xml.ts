/**
 * /sitemap.xml — a lista de todas as páginas do site, para o Google (e outros motores de busca)
 * as encontrar e indexar. Gerada automaticamente em cada publicação:
 *   - as páginas do menu (src/i18n → routes), em português e em inglês;
 *   - os artigos do blog publicados (os rascunhos ficam de fora).
 * Cada endereço indica também a sua versão no outro idioma (hreflang), para o Google mostrar
 * a página em português a quem pesquisa em português e a inglesa a quem pesquisa em inglês.
 */
import type { APIRoute } from 'astro';
import { routes, postPath, type Lang } from '../i18n';
import { getPosts, postSlug } from '../lib/blog';

type Entry = { urls: Partial<Record<Lang, string>>; lastmod?: Date };

export const GET: APIRoute = async ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const entries: Entry[] = Object.values(routes).map((r) => ({ urls: { pt: r.pt, en: r.en } }));

  // Artigos: o mesmo nome de ficheiro em pt/ e en/ liga as duas traduções
  const [pt, en] = await Promise.all([getPosts('pt'), getPosts('en')]);
  const slugs = new Set([...pt, ...en].map(postSlug));
  for (const slug of slugs) {
    const p = pt.find((x) => postSlug(x) === slug);
    const e = en.find((x) => postSlug(x) === slug);
    entries.push({
      urls: { ...(p && { pt: postPath(slug, 'pt') }), ...(e && { en: postPath(slug, 'en') }) },
      lastmod: (p ?? e)!.data.date,
    });
  }

  const xml = entries
    .flatMap(({ urls, lastmod }) =>
      (Object.entries(urls) as [Lang, string][]).map(([, url]) => {
        const alternates = (Object.entries(urls) as [Lang, string][])
          .map(([l, u]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(u)}"/>`)
          .join('\n');
        const xDefault = urls.pt ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(urls.pt)}"/>` : '';
        const date = lastmod ? `\n    <lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : '';
        return `  <url>\n    <loc>${abs(url)}</loc>${date}\n${alternates}${xDefault}\n  </url>`;
      }),
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${xml}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
