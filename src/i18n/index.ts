/**
 * Idiomas do site.
 *
 * - Português é o idioma principal (sem prefixo: /voluntario/).
 * - Inglês vive em /en/ (ex.: /en/volunteer/).
 *
 * Os textos de cada página estão em `pt.ts` e `en.ts`.
 * O `en.ts` é obrigado (pelo TypeScript) a ter exatamente as mesmas chaves que o `pt.ts`,
 * por isso nunca fica um texto por traduzir sem darmos conta.
 */
import { pt } from './pt';
import { en } from './en';

export const languages = { pt: 'Português', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'pt';

const dictionaries = { pt, en };
export type Dictionary = typeof pt;

/** Devolve todos os textos de um idioma: `const t = useTranslations(lang)` → `t.home.hero.title` */
export function useTranslations(lang: Lang): Dictionary {
  return dictionaries[lang];
}

/** Texto que existe nas duas línguas (usado nos ficheiros de dados em src/data). */
export type Localized<T = string> = Record<Lang, T>;
export function pick<T>(value: Localized<T>, lang: Lang): T {
  return value[lang] ?? value[defaultLang];
}

/**
 * Mapa de rotas. Cada página tem um endereço por idioma.
 * Para criar uma página nova: acrescenta aqui + cria o ficheiro em src/pages (pt) e src/pages/en (en).
 */
export const routes = {
  home: { pt: '/', en: '/en/' },
  volunteer: { pt: '/voluntario/', en: '/en/volunteer/' },
  support: { pt: '/apoiar/', en: '/en/support/' },
  about: { pt: '/sobre-nos/', en: '/en/about/' },
  blog: { pt: '/blog/', en: '/en/blog/' },
  contact: { pt: '/contactos/', en: '/en/contact/' },
  privacy: { pt: '/politica-de-privacidade/', en: '/en/privacy-policy/' },
  terms: { pt: '/termos-e-condicoes/', en: '/en/terms/' },
} as const satisfies Record<string, Localized>;

export type RouteKey = keyof typeof routes;

export function path(route: RouteKey, lang: Lang): string {
  return routes[route][lang];
}

/** Endereço de um artigo do blog. */
export function postPath(slug: string, lang: Lang): string {
  return `${routes.blog[lang]}${slug}/`;
}

/** Datas no formato local: "31 de março de 2026" / "31 March 2026". */
export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'pt' ? 'pt-PT' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
