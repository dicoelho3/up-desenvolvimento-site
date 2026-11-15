/**
 * Porta de entrada dos dados do site.
 *
 * Os ficheiros .json desta pasta são editáveis (à mão ou pelo CMS).
 * Aqui são validados: se alguém se enganar num campo, o build falha
 * com uma mensagem clara em vez de publicar uma página partida.
 */
import { z } from 'astro/zod';
import type { ImageMetadata } from 'astro';

import { lineIconNames } from '../lib/line-icons';
import statsJson from './stats.json';
import programsJson from './programs.json';
import neighborhoodsJson from './neighborhoods.json';
import partnersJson from './partners.json';
import foundersJson from './founders.json';
import timelineJson from './timeline.json';
import surveyJson from './survey.json';
import testimonialsJson from './testimonials.json';

const localized = z.object({ pt: z.string(), en: z.string() });
const localizedList = z.object({ pt: z.array(z.string()), en: z.array(z.string()) });
/** Ícone de linha opcional (nomes em src/lib/line-icons.ts) */
const icon = z.enum(lineIconNames).optional();

const schemas = {
  stats: z.object({ items: z.array(z.object({ value: z.string(), label: localized, icon })) }),
  programs: z.object({
    items: z.array(
      z.object({
        id: z.string(),
        icon,
        title: localized,
        text: localized,
        details: localizedList,
        frequency: z.enum(['weekly', 'monthly', 'oneOff']),
        highlight: localized,
      }),
    ),
  }),
  neighborhoods: z.object({
    items: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        partner: z.string(),
        logo: z.string(),
        since: z.string(),
        /** Concelho (aparece no mapa, ao lado do nome do bairro). */
        municipality: z.string().optional(),
        /** Coordenadas do marcador no mapa (latitude, longitude). */
        coords: z.object({ lat: z.number(), lng: z.number() }),
      }),
    ),
  }),
  partners: z.object({
    items: z.array(z.object({ name: z.string(), logo: z.string(), url: z.url().optional() })),
  }),
  founders: z.object({
    items: z.array(z.object({ name: z.string(), photo: z.string(), studies: z.string(), quote: localized })),
  }),
  timeline: z.object({ items: z.array(z.object({ year: z.string(), icon, title: localized, text: localized })) }),
  survey: z.object({
    mentees: z.array(z.object({ value: z.number().min(0).max(100), text: localized })),
    mentors: z.array(z.object({ value: z.number().min(0).max(100), text: localized })),
  }),
  testimonials: z.object({ items: z.array(z.object({ name: z.string(), role: localized, quote: localized })) }),
};

function load<T extends z.ZodType>(name: string, schema: T, data: unknown): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Erro em src/data/${name}.json:\n${result.error.message}`);
  }
  return result.data;
}

export const stats = load('stats', schemas.stats, statsJson).items;
export const programs = load('programs', schemas.programs, programsJson).items;
export const neighborhoods = load('neighborhoods', schemas.neighborhoods, neighborhoodsJson).items;
export const partners = load('partners', schemas.partners, partnersJson).items;
export const founders = load('founders', schemas.founders, foundersJson).items;
export const timeline = load('timeline', schemas.timeline, timelineJson).items;
export const survey = load('survey', schemas.survey, surveyJson);
export const testimonials = load('testimonials', schemas.testimonials, testimonialsJson).items;

export type Program = (typeof programs)[number];

/* — Imagens referenciadas por nome de ficheiro nos JSON — */
type ImageModule = { default: ImageMetadata };
const partnerLogos = import.meta.glob<ImageModule>('../assets/partners/*', { eager: true });
const photos = import.meta.glob<ImageModule>('../assets/photos/*', { eager: true });

function findImage(collection: Record<string, ImageModule>, folder: string, file: string): ImageMetadata {
  const image = collection[`../assets/${folder}/${file}`];
  if (!image) throw new Error(`Imagem não encontrada: src/assets/${folder}/${file}`);
  return image.default;
}

export const partnerLogo = (file: string) => findImage(partnerLogos, 'partners', file);
export const photo = (file: string) => findImage(photos, 'photos', file);
