/**
 * Coleções de conteúdo escritas em Markdown.
 *
 * Blog: um ficheiro .md por artigo, numa pasta por idioma:
 *   src/content/blog/pt/o-meu-artigo.md  → /blog/o-meu-artigo/
 *   src/content/blog/en/o-meu-artigo.md  → /en/blog/o-meu-artigo/
 * Usar o mesmo nome de ficheiro nas duas línguas liga as traduções entre si.
 *
 * Quem não programa edita estes artigos pelo Pages CMS (ver README).
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    /** Caminho de uma imagem em /public (ex.: /images/uploads/foto.jpg). */
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    author: z.string().optional(),
    /** Rascunhos não são publicados. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
