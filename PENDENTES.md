# Pendentes

Coisas a resolver antes (ou depois) de pôr o site no ar.

## 1. Marca e assets
- [ ] Logo oficial em **SVG** (o atual foi extraído do PDF da apresentação, em PNG) → `src/assets/brand/`
- [ ] Favicon oficial (o atual `public/favicon.svg` é provisório)
- [ ] Confirmar as **fontes** oficiais. Usadas agora: Lexend (texto), Caveat (notas manuscritas), cores aproximadas do PDF → `src/styles/tokens.css`
- [ ] Fotos originais em boa resolução, só de voluntários/adultos (as atuais vêm do PDF) → `src/assets/photos/`
- [ ] Logos dos parceiros em boa qualidade → `src/assets/partners/`
- [ ] **Regra: nunca mostrar a cara de jovens/mentorados (menores).** As fotos de mentorias e atividades foram removidas. Para ilustrar estes momentos, usar fotos sem caras (mãos, cadernos, de costas) ou ilustrações
- [ ] Voltar a pôr fotos das mentorias e atividades com a cara dos jovens **tapada** (desfocada ou com autocolante/balão por cima, de forma irreversível — não basta um efeito CSS). Editar as imagens antes de as pôr em `src/assets/photos/`
- [ ] Imagem de partilha nas redes (`public/og-image.jpg`) — a atual é provisória

## 2. Conteúdo a confirmar
- [ ] Testemunhos de voluntários (texto copiado do site atual, o da Marta foi completado) → `src/data/testimonials.json`
- [ ] Respostas das **perguntas frequentes** (escritas a partir dos documentos) → `src/i18n/pt.ts` → `volunteer.faq`
- [ ] Números de impacto (estão os da apresentação 2026) → `src/data/stats.json`
- [ ] Data de início da parceria na Damaia (2026?) e no Bairro Alto (2025?) → `src/data/neighborhoods.json`
- [ ] Coordenadas dos bairros são aproximadas (para o futuro mapa)
- [ ] Os 3 artigos do blog foram escritos com base no Relatório 2025/26 — rever ou trocar pelos artigos originais do Wix
- [ ] Mostrar a Direção atual na página "Sobre nós"? (nomes estão no Plano de Atividades, confirmar se podem ser públicos)
- [ ] Rever a tradução inglesa (`src/i18n/en.ts` e `src/content/blog/en/`). Para esconder o inglês: `showLanguageSwitch: false` em `src/config/site.ts`

## 3. Faltam dados
- [ ] **NIF** da associação para a consignação do IRS → `src/config/site.ts` (`nif`)
- [ ] Contas de YouTube/TikTok (o site atual tem links genéricos) — acrescentar em `src/config/site.ts` se existirem
- [ ] Política de Privacidade e Termos & Condições (existem no site Wix, não foram copiados)

## 4. Formulários e donativos (ficou como está, por agora)
- [ ] O formulário de padrinhos é o mesmo do voluntariado — criar um próprio? → `src/config/site.ts`
- [ ] Mostrar IBAN / MB Way na página Apoiar? (o relatório diz que o MB Way ainda não funciona)
- [ ] Formulário de contacto no próprio site (ex.: Formspree ou Web3Forms) em vez de só email

## 5. Domínio e publicação
- [ ] Criar repositório no GitHub (só com a pasta `website/` — **não** incluir os PDFs internos)
- [ ] Ligar o repositório ao Vercel
- [ ] Domínio comprado na Wix: há duas opções
  - **Agora:** manter o domínio na Wix e, nas definições de DNS da Wix, apontar para o Vercel (registos A/CNAME que o Vercel indicar)
  - **Depois:** transferir o domínio para outro registrador (Cloudflare, Namecheap, Vercel…) — desbloquear na Wix e pedir o código de transferência
- [ ] Cancelar o plano Wix do site **só depois** de o novo site estar no ar (o domínio pode ter renovação ligada ao plano)
- [ ] Configurar o Pages CMS e dar acesso no GitHub a quem escreve no blog; testar a criação de um artigo

## 6. Melhorias futuras
- [ ] Mapa interativo dos bairros (coordenadas já estão em `src/data/neighborhoods.json`)
- [ ] Analytics respeitador de privacidade (ex.: Vercel Analytics ou Plausible)
- [ ] Sitemap (`@astrojs/sitemap`)
- [ ] Mover o projeto para fora do OneDrive (a pasta `node_modules` tem milhares de ficheiros e torna a sincronização lenta)
