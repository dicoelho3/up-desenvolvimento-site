# Site do UP Desenvolvimento

Site institucional do UP Desenvolvimento, feito com [Astro](https://astro.build).
Gera HTML estático (rápido e barato de alojar) e publica-se no [Vercel](https://vercel.com).

## Começar

Precisas de [Node.js](https://nodejs.org) 22 ou superior.

```sh
npm install      # instala as dependências (só da primeira vez)
npm run dev      # abre o site em http://localhost:4321 e atualiza enquanto editas
npm run build    # gera a versão final em dist/
npm run preview  # mostra a versão final localmente
```

## Onde está cada coisa

```
src/
├── config/site.ts        → email, redes sociais, links dos formulários, NIF
├── i18n/
│   ├── pt.ts             → TODOS os textos das páginas em português
│   ├── en.ts             → os mesmos textos em inglês
│   └── index.ts          → idiomas, endereços das páginas (rotas) e funções de apoio
├── data/*.json           → números, programas, bairros, parceiros, fundadores, história, questionários, testemunhos
├── content/blog/pt|en/   → artigos do blog (um ficheiro .md por artigo)
├── assets/               → logo, fotos e logos de parceiros (otimizados automaticamente)
├── styles/
│   ├── tokens.css        → cores, fontes, tamanhos e espaçamentos da marca
│   └── base.css          → estilos globais e as texturas de papel
├── components/
│   ├── ui/               → peças pequenas: Button, SectionLabel (↘), Icon, Doodle (traços), Photo, Rich
│   ├── layout/           → Header e Footer
│   ├── sections/         → blocos de página (Hero, Programas, Números, FAQ…)
│   └── blog/             → cartão de artigo
├── layouts/BaseLayout.astro → esqueleto de todas as páginas (SEO, idiomas, header, footer)
├── views/                → cada página montada a partir das secções (partilhada entre PT e EN)
└── pages/                → os endereços do site; ficheiros curtos que chamam uma view
    └── en/               → versão inglesa
public/                   → ficheiros servidos tal como estão (texturas, favicon, imagens do blog)
```

### Tarefas comuns

| Quero…                         | Onde                                                                      |
| ------------------------------ | ------------------------------------------------------------------------- |
| Mudar um texto                 | `src/i18n/pt.ts` (e o mesmo em `en.ts`)                                    |
| Atualizar os números           | `src/data/stats.json`                                                     |
| Juntar um parceiro             | logo em `src/assets/partners/` + entrada em `src/data/partners.json`      |
| Juntar um bairro               | logo em `src/assets/partners/` + entrada em `src/data/neighborhoods.json` |
| Mudar cores ou fontes          | `src/styles/tokens.css`                                                   |
| Mudar o email ou o formulário  | `src/config/site.ts`                                                      |
| Reordenar blocos de uma página | `src/views/<Página>.astro`                                                |
| Escrever no blog               | Pages CMS (ver abaixo) ou um `.md` em `src/content/blog/pt/`              |

Nos textos podes usar `*palavra*` para a pincelada amarela da marca e `**palavra**` para negrito.

### Criar uma página nova

1. Acrescenta a rota em `src/i18n/index.ts` (`routes`).
2. Escreve os textos em `pt.ts` e `en.ts`.
3. Cria a view em `src/views/` juntando secções existentes.
4. Cria `src/pages/<nome>.astro` e `src/pages/en/<name>.astro` que chamam essa view.

### Funcionalidades futuras (ex.: mapa)

Os bairros já têm coordenadas em `src/data/neighborhoods.json`. Um mapa entra como um componente novo em `src/components/sections/`
(por exemplo com [Leaflet](https://leafletjs.com)) e só carrega JavaScript na página onde for usado.

## Marca (Manual de Identidade Visual)

O site segue o Manual de Identidade do UP:

- **Cores e fontes**: `src/styles/tokens.css`. Títulos em Hagrid (por agora Archivo Expanded, ver `PENDENTES.md`), texto em Afacad.
- **Elementos gráficos**: os ficheiros originais estão na pasta `ficheiros/Elementos Gráficos` (fora do repositório).
  O script abaixo converte-os para a web (SVG recoloríveis, ícones e personagens cortados, texturas leves):

  ```sh
  node scripts/brand-assets.mjs
  ```

  Corre-o de novo sempre que chegarem elementos novos.
- **Componentes da marca** (`src/components/ui/`):
  - `Doodle`: traços livres, setas e doodles oficiais, em qualquer cor da paleta (`<Doodle name="strokes/traco-3" color="var(--orange)" />`)
  - `BrandIcon`: ícones oficiais dentro de círculos (`<BrandIcon name="heart" tone="orange" />`; aceita também `line/<nome>`)
  - `LineIcon`: os 84 ícones de linha desenhados à mão (`<LineIcon name="calendar" />`) — lista de nomes em `src/lib/line-icons.ts`
  - `Characters`: personagens ilustradas, a forma oficial de representar os jovens sem mostrar caras
  - `SectionLabel`: a etiqueta "↘ Título" com linha fina; `TitleArrow`: a seta ↙ dos títulos
  - Nos textos, `*palavra*` aplica o destaque da marca (pincelada nos títulos, marcador no texto)
  - Classe `.brand-tag`: etiqueta tipo carimbo ("Qualidade", "Alcance")

**Fotos:** nunca mostrar caras de jovens/mentorados. Usar as personagens por cima das caras (Manual, p. 15).

## Blog para quem não programa: Pages CMS

O ficheiro `.pages.yml` configura o [Pages CMS](https://pagescms.org), um editor visual gratuito.

1. O código tem de estar num repositório GitHub.
2. Quem escreve entra em https://app.pagescms.org com a conta GitHub (tem de ter acesso ao repositório).
3. Escolhe "Blog (Português)", cria ou edita um artigo e guarda.
4. O Vercel deteta a alteração e publica o site sozinho em ~1 minuto.

## Publicar no Vercel

1. Cria um repositório no GitHub com o conteúdo desta pasta (`website/`) e faz push.
2. Em https://vercel.com → "Add New Project" → importa o repositório. O Vercel deteta o Astro sozinho.
3. Cada `git push` para `main` publica uma nova versão; outros ramos geram pré-visualizações.
4. Domínio: em Vercel → Project → Settings → Domains → adiciona `updesenvolvimento.com` e `www.updesenvolvimento.com`
   e segue as instruções de DNS (ver `PENDENTES.md`, porque o domínio está na Wix).

O `vercel.json` redireciona os endereços antigos do Wix (`/voluntário`, `/sobre-nós`, `/post/...`) para os novos.
