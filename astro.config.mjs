// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Domínio final — usado para links canónicos, sitemap e partilhas sociais.
  site: 'https://www.updesenvolvimento.com',

  // Gera /voluntario/index.html em vez de /voluntario.html (URLs limpos no Vercel).
  build: { format: 'directory' },
  trailingSlash: 'ignore',

  // Carrega páginas no hover dos links → navegação quase instantânea.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
