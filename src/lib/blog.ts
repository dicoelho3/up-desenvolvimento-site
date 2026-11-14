/**
 * Funções de apoio ao blog.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

type Post = CollectionEntry<'blog'>;

/** "pt/dia-do-up-2026" → "dia-do-up-2026" */
export function postSlug(post: Post): string {
  return post.id.split('/').slice(1).join('/');
}

/** Artigos publicados de um idioma, do mais recente para o mais antigo. */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const posts = await getCollection('blog', (post) => post.id.startsWith(`${lang}/`) && !post.data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** O mesmo artigo no outro idioma, se existir. */
export async function getTranslation(post: Post, lang: Lang): Promise<Post | undefined> {
  const posts = await getPosts(lang);
  return posts.find((p) => postSlug(p) === postSlug(post));
}
