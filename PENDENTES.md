# Pendentes

Coisas a resolver antes (ou depois) de pôr o site no ar.

## 1. Marca e assets
- [x] Cores oficiais do Manual de Identidade aplicadas (`src/styles/tokens.css`)
- [x] Fonte secundária **Afacad** (texto) aplicada
- [x] Elementos gráficos oficiais (traços, setas, doodles, highlights, ícones, personagens, fundos de papel, fotos com efeito) — gerados por `scripts/brand-assets.mjs`
- [ ] **Fonte Hagrid (títulos)**: é paga (Zetafonts). Comprar a **licença web** e pôr os ficheiros `.woff2` em `public/fonts/`.
  Até lá usa-se a **Archivo Expanded** (gratuita, parecida). Para trocar: declarar a Hagrid com `@font-face` em `src/styles/base.css`
  e em `src/styles/tokens.css` pôr `--font-display-stretch: 100%`.
- [ ] **Ficheiros do logo oficial** em SVG (ou PNG transparente): principal, horizontal, reduzido, e as versões para fundo azul.
  O site usa versões extraídas do PDF da apresentação (`src/assets/brand/`). Com o logo horizontal, pode passar a ir no topo do site.
- [x] Favicon e ícones (separador, telemóvel) gerados a partir do logótipo reduzido com balão laranja (Manual p. 7–8). Refazer quando houver o SVG oficial
- [ ] Fotos originais em boa resolução, só de voluntários/adultos → `src/assets/photos/`
- [ ] Logos dos parceiros em boa qualidade → `src/assets/partners/`
- [ ] **Regra: nunca mostrar a cara de jovens/mentorados (menores).**
- [ ] **PRIORIDADE — Mais fotos no site:** fotos das mentorias e atividades com a cara dos jovens **tapada** com os **stickers / personagens ilustradas** da marca (hoje o site tem poucas fotos por causa da regra dos menores). Enviar já editadas, ou as originais + indicação de quem tapar → `src/assets/photos/`
  (como no Manual, p. 15). Editar as imagens antes de as pôr no site (tapar na própria imagem, não só por CSS). As personagens estão em `public/brand/characters/`.
- [x] Imagem de partilha (`public/og-image.jpg`): fundo azul do manual + logótipo claro com balão laranja + foto da equipa
- [x] Folha de ícones de linha (`Icons_2.svg`, 84 ícones) cortada para `public/brand/line-icons/` e usada nos números, programas, bairros, passos, percurso, blog, contactos e rodapé. Nos números, programas e percurso, o ícone escolhe-se nos dados (campo `icon`)

## 2. Decisões de design que o manual não define (validar com quem desenhou a marca)
- [ ] Botões: pílula laranja/azul com sombra sólida por baixo (escolhido por vocês)
- [ ] Cartões "senha destacável" na página Apoiar, cartões com cabeçalho colorido (programas, bairros), post-its nos testemunhos
- [ ] Destaque de palavras: **rabisco de pincel da primeira versão** por baixo da palavra, em títulos e texto (amarelo claro; azul céu nos fundos azuis) — reposto a pedido da equipa, fora do manual (o manual usa pincelada nos títulos e marcador no texto). Sobre o fundo mostarda o amarelo nota-se pouco
- [ ] Notas curtas/legendas em letra manuscrita **Caveat** (Google Fonts, gratuita) — reposta a pedido da equipa; o manual só prevê Hagrid + Afacad
- [ ] Etiqueta tipo carimbo ("Qualidade", "Apadrinhamento"…) como mancha sólida torta em vez de pincelada com riscas — as riscas cortavam o texto
- [ ] Ícones: todo o site usa os ícones de linha desenhados à mão (Icons_2.svg); os ícones chapados de Icons.svg ficaram de fora para não misturar estilos
- [ ] Texto laranja sobre fundos claros (títulos dos Eixos e da cronologia, nomes manuscritos) mantido por decisão da equipa, como no manual — tem contraste baixo (2,3; o recomendado para títulos é 3). Alternativa acessível: marrom da paleta
- [ ] Seta fina ↙ a seguir aos títulos principais de cada página (inspirada nas capas do manual)
- [ ] Fios decorativos a **lápis** (os da primeira versão, tirados da apresentação) em vez dos traços de marcador do manual — escolha da equipa; os traços do manual continuam disponíveis em `public/brand/strokes`
- [ ] Os fios a lápis **desenham-se** ao entrar no ecrã (animação; o percurso de cada fio está em `src/lib/pencil-paths.ts` — se trocarem a imagem de um fio, é preciso retraçar o percurso). Quem tem "reduzir movimento" ligado vê o fio já desenhado

## 3. Conteúdo a confirmar
- [x] Ano de fundação confirmado: nasceu em 2021, associação legal em dezembro de 2022 (o site já diz isto; o "Fundada em 2022" do manual refere-se à legalização)
- [ ] Números de impacto: o site usa os da apresentação 2026 (+70 jovens); o manual fala em "35+ jovens" → `src/data/stats.json`
- [ ] Testemunhos de voluntários (texto copiado do site atual, o da Marta foi completado) → `src/data/testimonials.json`
- [ ] Respostas das **perguntas frequentes** (escritas a partir dos documentos) → `src/i18n/pt.ts` → `volunteer.faq`
- [ ] Data de início da parceria na Damaia (2026?) e no Bairro Alto (2025?) → `src/data/neighborhoods.json`
- [ ] **Confirmar a localização dos bairros no mapa** (as coordenadas são aproximadas e agora aparecem no mapa da página inicial / Sobre nós) → `src/data/neighborhoods.json`
- [ ] Os 3 artigos do blog foram escritos com base no Relatório 2025/26 — rever ou trocar pelos artigos originais do Wix
- [ ] Mostrar a Direção atual na página "Sobre nós"? (nomes estão no Plano de Atividades, confirmar se podem ser públicos)
- [ ] Rever a tradução inglesa (`src/i18n/en.ts` e `src/content/blog/en/`). Para esconder o inglês: `showLanguageSwitch: false` em `src/config/site.ts`

## 4. Faltam dados
- [x] **NIF** (517 259 532) — no cartão do IRS (com botão "Copiar NIF") e no rodapé
- [x] YouTube (@UPDesenvolvimento) no rodapé e nos Contactos. [ ] TikTok: enviar o link se a conta existir
- [x] Política de Privacidade e Termos & Condições — páginas `/politica-de-privacidade/` e `/termos-e-condicoes/` (+ EN), texto em `src/content/legal/` (editável no Pages CMS)
- [ ] **Validar os textos legais** (de preferência com alguém da área jurídica). Em relação ao texto do Wix: trocou-se o Wix pelo Vercel (alojamento) e Google (formulários/email); a secção de cookies diz agora que o site **não usa cookies**; acrescentou-se o direito de reclamar à CNPD; corrigiram-se erros (frase dos direitos de autor fora do sítio, secção 3 sem número, título "Ligações Externas" repetido → "Responsabilidade"). A versão inglesa é tradução, com a nota de que prevalece a portuguesa. **Se um dia ativarem estatísticas de visitas ou outro serviço, a secção 9 tem de ser atualizada.**

## 5. Formulários e donativos (ficou como está, por agora)
- [ ] O formulário de padrinhos é o mesmo do voluntariado — criar um próprio? → `src/config/site.ts`
- [ ] Mostrar IBAN / MB Way na página Apoiar? (o relatório diz que o MB Way ainda não funciona)

## 6. Domínio e publicação
- [x] Criar repositório no GitHub (só com a pasta `website/` — **não** incluir os PDFs internos)
- [ ] Ligar o repositório ao Vercel
- [ ] Domínio comprado na Wix: há duas opções
  - **Agora:** manter o domínio na Wix e, nas definições de DNS da Wix, apontar para o Vercel (registos A/CNAME que o Vercel indicar)
  - **Depois:** transferir o domínio para outro registrador (Cloudflare, Namecheap, Vercel…) — desbloquear na Wix e pedir o código de transferência
- [ ] Cancelar o plano Wix do site **só depois** de o novo site estar no ar (o domínio pode ter renovação ligada ao plano)
- [ ] Depois de o site estar no ar: registar o domínio no **Google Search Console** (grátis) e submeter `https://www.updesenvolvimento.com/sitemap.xml` — permite ver se o Google já indexou as páginas e com que pesquisas as pessoas chegam ao site
- [ ] Configurar o Pages CMS e dar acesso no GitHub a quem escreve no blog; testar a criação de um artigo

## 7. Melhorias futuras
- [x] Mapa interativo dos bairros (página inicial e Sobre nós). Novo bairro: acrescentar em `src/data/neighborhoods.json`; se ficar fora da zona do mapa, correr `node scripts/build-map.mjs`
  - Mapa base: Esri Light Gray Base (dados OpenStreetMap), recolorido com as cores da marca e guardado no site; a atribuição aparece no mapa. Se um dia a Esri restringir este uso, dá para trocar por outro mapa base em `scripts/build-map.mjs`
- [ ] **Formulário de contacto no site** (ideia aprovada, para mais tarde): Web3Forms, grátis até 250 mensagens/mês — falta alguém registar o Gmail do UP em web3forms.com e passar a chave
- [ ] Analytics respeitador de privacidade (ex.: Vercel Analytics ou Plausible)
- [x] Sitemap e robots.txt — gerados automaticamente em `/sitemap.xml` e `/robots.txt` (`src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts`)
- [ ] Otimizar os SVG grandes da marca (ex.: com SVGO) — alguns têm 100–300 KB
- [ ] Mover o projeto para fora do OneDrive (a pasta `node_modules` tem milhares de ficheiros e torna a sincronização lenta)
