/**
 * Textos do site em português.
 *
 * Mini-formatação disponível nos textos:
 *   *palavra*   → destacada com a pincelada amarela da marca
 *   **palavra** → negrito
 *
 * Dados que mudam com frequência (números, programas, bairros, parceiros, equipa…)
 * NÃO estão aqui — estão em src/data/*.json.
 */
export const pt = {
  meta: {
    siteDescription:
      'O UP Desenvolvimento é uma associação de jovens voluntários que acompanha jovens de bairros vulneráveis da Grande Lisboa através de mentorias e atividades. Elevar jovens. Transformar comunidades.',
  },

  nav: {
    home: 'Início',
    volunteer: 'Voluntário',
    support: 'Apoiar',
    about: 'Sobre nós',
    blog: 'Blog',
    contact: 'Contactos',
    cta: 'Junta-te ao UP',
    menu: 'Menu',
    close: 'Fechar',
    skip: 'Saltar para o conteúdo',
    switchLang: 'Ver em inglês',
  },

  legal: {
    label: 'Informação legal',
    updated: 'Última atualização:',
    privacy: 'Política de Privacidade',
    terms: 'Termos & Condições',
    nif: 'NIF',
  },

  footer: {
    tagline: 'Elevar jovens. Transformar comunidades.',
    about: 'Associação sem fins lucrativos, criada por jovens em 2021, em Lisboa.',
    explore: 'Explorar',
    getInvolved: 'Participar',
    follow: 'Segue-nos',
    becomeMentor: 'Ser mentor',
    becomeSponsor: 'Ser padrinho',
    irs: 'Consignar o IRS',
    rights: 'UP Desenvolvimento',
  },

  common: {
    readMore: 'Ler mais',
    seeAll: 'Ver tudo',
    applyMentor: 'Quero ser mentor',
    becomeSponsor: 'Quero ser padrinho',
    learnMore: 'Saber mais',
    howItWorks: 'Como funciona',
    writeUs: 'Escreve-nos',
    weekly: 'Semanal',
    monthly: 'Mensal',
    oneOff: 'Pontual',
    since: 'desde',
    opensNewTab: '(abre numa nova janela)',
    emailCopied: 'Email copiado',
  },

  home: {
    title: 'Elevar jovens. Transformar comunidades.',
    hero: {
      eyebrow: 'Associação de jovens voluntários · Grande Lisboa',
      title: 'Elevar *jovens.* Transformar comunidades.',
      lead: 'Todas as semanas, os nossos mentores sentam-se ao lado de um jovem de um bairro vulnerável. Estudam juntos, conversam e constroem confiança. Uma mentoria de cada vez, o caminho começa a abrir-se.',
      note: 'parte da equipa UP',
      secondary: 'Como funciona',
    },
    question: {
      label: 'Porquê?',
      text: 'De que forma as tuas *oportunidades* moldaram **o teu caminho?**',
      aside: 'Nem toda a gente começa com as mesmas. Foi por isso que o UP nasceu.',
    },
    mission: {
      label: 'Quem somos?',
      title: 'De jovens. *Para jovens.*',
      kicker: 'A nossa missão',
      text: 'Promover mobilidade social e igualdade de oportunidades, **através do desenvolvimento de jovens em contextos vulneráveis.**',
      body: 'Somos estudantes e jovens profissionais. Recrutamos, formamos e acompanhamos voluntários que, em parceria com associações locais, se tornam mentores de jovens nos seus próprios bairros.',
      link: 'Conhece a nossa história',
    },
    programs: {
      label: 'Como atuamos no terreno?',
      title: 'Quatro programas de impacto',
    },
    stats: {
      label: 'Estatísticas',
      title: 'Impacto real, *medido*',
      note: 'Números acumulados desde 2021. Todos os semestres medimos o impacto com questionários a mentores e mentorados.',
      link: 'Como medimos o impacto',
    },
    neighborhoods: {
      label: 'Atuamos em parceria com',
      title: 'Associações em *bairros* vulneráveis',
      text: 'Não chegamos de fora com respostas feitas. Trabalhamos com quem já conhece cada bairro por dentro, e as mentorias acontecem nas sedes destas associações.',
    },
    join: {
      label: 'Queres fazer parte?',
      mentor: {
        title: 'Dá 1h30 por semana',
        text: 'Torna-te mentor de um jovem durante o ano letivo. Não precisas de ser professor, precisas de aparecer.',
        cta: 'Quero ser mentor',
      },
      sponsor: {
        title: 'Apadrinha um jovem',
        text: 'Com 40€ por ano cobres a inscrição de um jovem no UP: materiais, transporte e atividades.',
        cta: 'Formas de apoiar',
      },
    },
    blog: {
      label: 'Do nosso blog',
      title: 'Últimas notícias',
    },
    partners: {
      label: 'A nossa comunidade',
      title: 'Contamos com vários *parceiros*',
    },
  },

  volunteer: {
    title: 'Voluntário',
    description:
      'Torna-te mentor UP: 1h30 por semana a acompanhar um jovem de um bairro vulnerável, com formação e uma comunidade inteira contigo.',
    hero: {
      label: 'Voluntário',
      title: 'Torna-te *mentor* UP',
      lead: '1h30 por semana. Um jovem. Um ano letivo inteiro a crescer lado a lado, com formação e uma comunidade de voluntários contigo.',
    },
    role: {
      label: 'O que faz um mentor?',
      title: 'Mais do que *explicações*',
      items: [
        {
          title: 'Uma mentoria por semana',
          text: 'Sessões de 1h30, individuais ou em dupla, em horário pós-laboral, na sede de uma associação parceira do bairro.',
        },
        {
          title: 'Uma relação de confiança',
          text: 'Ajudas nos trabalhos e nos métodos de estudo, mas sobretudo estás presente. É essa continuidade que faz a diferença.',
        },
        {
          title: 'Uma atividade por mês',
          text: 'Aos fins de semana juntamos mentores e mentorados para sair do bairro: museus, escalada, ciência, desporto.',
        },
      ],
    },
    gets: {
      label: 'E tu, o que levas?',
      title: 'Não vais estar *sozinho*',
      items: [
        { title: 'Formação', text: 'Encontro Anual de Voluntários em outubro e workshops ao longo do ano, alguns com a Teach For Portugal.' },
        { title: 'Acompanhamento', text: 'Cada bairro tem um coordenador que conhece os jovens, organiza os turnos e está lá quando surgem dúvidas.' },
        { title: 'Comunidade', text: 'Mais de 45 voluntários, jantares, teambuildings e amizades que ficam muito para lá do ano letivo.' },
        { title: 'Welcome Book', text: 'Um guia com tudo o que precisas para a primeira sessão: missão, boas práticas e materiais.' },
      ],
    },
    steps: {
      label: 'Como funciona?',
      title: 'Do formulário à *primeira* mentoria',
      items: [
        { title: 'Candidatura', text: 'Preenches o formulário. Demora poucos minutos.' },
        { title: 'Conversa', text: 'Entre setembro e outubro, falamos contigo para nos conhecermos e percebermos a tua disponibilidade.' },
        { title: 'Formação', text: 'Participas no Encontro Anual de Voluntários e recebes o Welcome Book.' },
        { title: 'Primeira mentoria', text: 'Conheces o teu mentorado. A partir daqui, é semana a semana até ao fim do ano letivo.' },
      ],
    },
    extra: {
      label: 'Para além das mentorias',
      reading: {
        title: 'Projeto de Leitura',
        stat: '23 mil',
        statText: 'crianças em Portugal estão "em risco de dificuldades futuras" devido ao seu nível de leitura.',
        text: 'Criámos um jogo de tabuleiro que leva os mentorados a ler mais, e a gostar disso. No Dia do UP há prémios para quem lê mais.',
      },
      psycho: {
        title: 'Atividades psicossociais',
        text: 'Todos os meses, uma saída diferente: marionetas, escalada, um circo de física, o Jardim Zoológico. Graças aos nossos parceiros, os jovens visitam sítios novos e descobrem do que são capazes.',
        list: ['Museu da Marioneta', 'Escalada', 'Circo de Física', 'Jardim Zoológico', 'Dia do UP'],
        listNote: 'algumas saídas de 2025/26',
      },
    },
    testimonials: {
      label: 'Quem já é mentor',
      title: 'Na primeira *pessoa*',
    },
    faq: {
      label: 'Perguntas frequentes',
      title: 'Ainda tens *dúvidas?*',
      items: [
        {
          q: 'Preciso de ter experiência a dar aulas?',
          a: 'Não. Uma mentoria não é uma explicação. Damos-te formação e materiais, e o mais importante é a consistência e a vontade de criar uma relação com o teu mentorado.',
        },
        {
          q: 'Quanto tempo exige?',
          a: 'Uma sessão semanal de 1h30, em horário pós-laboral, durante o ano letivo (outubro a maio). As atividades mensais ao fim de semana são opcionais, mas muito recomendadas.',
        },
        {
          q: 'Onde são as mentorias?',
          a: 'Nas sedes das associações parceiras: Apelação, São João da Talha, Damaia e Bairro Alto. Tentamos sempre juntar-te ao bairro que te dá mais jeito e organizamos boleias entre voluntários.',
        },
        {
          q: 'Quando posso candidatar-me?',
          a: 'O recrutamento principal acontece entre setembro e outubro, mas podes preencher o formulário em qualquer altura e entramos em contacto quando houver vaga.',
        },
        {
          q: 'Posso ajudar sem ser mentor?',
          a: 'Claro. Há sempre trabalho em comunicação, angariação de fundos, eventos e organização. Escreve-nos a contar o que gostavas de fazer.',
        },
      ],
    },
    cta: {
      title: 'Começa hoje a tua *jornada* como mentor',
      text: 'O formulário demora cinco minutos. O resto, fazemos juntos.',
    },
  },

  support: {
    title: 'Apoiar',
    description:
      'Apadrinha um jovem, consigna o teu IRS ou junta a tua empresa ao UP. Todas as formas de apoiar o UP Desenvolvimento.',
    hero: {
      label: 'Apoiar',
      title: 'Há várias formas de *dar a mão*',
      lead: 'O UP é feito por voluntários, mas as mentorias, as deslocações e as atividades têm custos. Cada apoio chega diretamente aos jovens.',
    },
    sponsor: {
      tag: 'Apadrinhamento',
      title: 'Apadrinha um jovem',
      price: '40€',
      period: 'por ano',
      text: 'Cobres a inscrição anual de um jovem no UP. Ao longo do ano enviamos-te notícias do que se passa nos bairros e convidamos-te para os nossos eventos.',
      covers: 'O que está incluído',
      items: ['Materiais escolares', 'Recursos educativos', 'Transporte', 'Atividades mensais'],
      cta: 'Quero ser padrinho',
    },
    irs: {
      tag: 'Consignação do IRS',
      title: 'Consigna 1% do teu IRS',
      price: '0€',
      period: 'para ti',
      text: 'Uma parte do imposto que já pagas, e que iria para o Estado, pode vir para o UP. Não pagas mais nada nem recebes menos reembolso.',
      steps: [
        'Entra no Portal das Finanças.',
        'Na declaração de IRS (quadro 11) ou na área "Consignação", escolhe uma entidade.',
        'Indica o NIF do UP Desenvolvimento e confirma.',
      ],
      nifLabel: 'NIF do UP',
      copyNif: 'Copiar NIF',
      copied: 'Copiado!',
      guide: 'Ver o guia passo a passo',
      highlight: 'No último ano, a consignação do IRS foi a maior fonte de financiamento do UP.',
    },
    volunteer: {
      tag: 'Voluntariado',
      title: 'Dá o teu tempo',
      text: 'Se o que tens para dar é tempo, temos um lugar para ti: como mentor, ou a ajudar na comunicação, nos eventos e na organização.',
      cta: 'Ser voluntário',
    },
    companies: {
      tag: 'Empresas e parceiros',
      title: 'Abre a porta aos nossos jovens',
      text: 'Muitas das atividades psicossociais só acontecem porque alguém nos abriu uma porta: um museu, um parque, uma empresa. Se tens um espaço, uma experiência ou recursos para partilhar, fala connosco.',
      cta: 'Propor uma parceria',
    },
  },

  about: {
    title: 'Sobre nós',
    description:
      'A história, a missão e a equipa do UP Desenvolvimento. Nascemos em 2021, na Apelação, para ajudar uma jovem a entrar no secundário.',
    hero: {
      label: 'Como nasceu esta ideia?',
      title: 'Tudo começou com o sonho de *uma* jovem',
      lead: 'Em 2021, um grupo de universitários juntou-se para ajudar uma jovem do Bairro da Apelação a entrar no Ensino Secundário. Hoje somos uma associação com dezenas de voluntários e quatro bairros parceiros.',
    },
    gap: {
      label: 'Porquê?',
      title: 'O UP nasceu para fechar uma lacuna *simples, mas estrutural*',
      left: {
        title: 'Associações locais',
        text: '**De um lado**, associações que fazem um trabalho essencial e conhecem profundamente as comunidades, mas que têm recursos limitados para um acompanhamento individualizado.',
      },
      right: {
        title: 'Jovens determinados',
        text: '**Do outro**, uma geração determinada a fazer a diferença, mas que nem sempre encontra a comunidade, a estrutura e a formação para um voluntariado responsável e com propósito.',
      },
    },
    axes: {
      label: 'Qual é a nossa ambição?',
      title: 'Eixos *estratégicos*',
      items: [
        {
          tag: 'Qualidade',
          title: 'Cada sessão conta.',
          question: 'Como garantir que as mentorias têm um impacto positivo e duradouro?',
          text: 'Criar um ciclo de transformação social, em que os jovens que hoje apoiamos se tornam os mentores do futuro.',
        },
        {
          tag: 'Alcance',
          title: 'Cada bairro importa.',
          question: 'Como expandir o UP através de núcleos liderados por associações de jovens?',
          text: 'Chegar a todos os bairros em contexto vulnerável de Portugal, para que todos os seus jovens tenham boas oportunidades.',
        },
      ],
    },
    method: {
      label: 'Como criamos impacto positivo e duradouro?',
      title: 'Metodologia *UP*',
      items: [
        { title: 'Contexto no terreno', text: 'Trabalhamos dentro dos bairros, com as associações que já lá estão.' },
        { title: 'Abordagem completa', text: 'Acompanhamos o percurso escolar e o pessoal, dentro e fora da sala.' },
        { title: 'Comunidade de voluntários', text: 'Voluntários formados, acompanhados e ligados entre si.' },
        { title: 'Avaliação de impacto', text: 'Medimos todos os semestres e ajustamos com base no que aprendemos.' },
      ],
    },
    timeline: {
      label: 'O nosso percurso',
      title: 'De explicadores a *mentores*',
    },
    impact: {
      label: 'Estatísticas',
      title: 'Como *medimos* impacto?',
      text: 'Os nossos questionários semestrais cruzam a perspetiva de mentorados e mentores com indicadores objetivos e subjetivos. Assim acompanhamos mudanças ao longo do tempo e melhoramos os programas.',
      mentees: 'Mentorados',
      mentors: 'Mentores',
    },
    founders: {
      label: 'A nossa comunidade',
      title: 'Co-fundadores',
    },
    governance: {
      label: 'Como nos organizamos',
      title: 'Uma associação *a sério*',
      text: 'Desde dezembro de 2022 somos uma Associação Legal Sem Fins Lucrativos. Todos os anos publicamos um Plano de Atividades e um Relatório de Atividades e Contas, aprovados em Assembleia Geral.',
      bodies: [
        { title: 'Assembleia Geral', text: 'Aprova planos, relatórios e elege os órgãos sociais.' },
        { title: 'Direção', text: 'Gere a associação no dia a dia e define a estratégia.' },
        { title: 'Conselho Fiscal', text: 'Acompanha as contas e garante transparência.' },
        { title: 'Conselho Consultivo', text: 'Os quatro co-fundadores, que aconselham a Direção e protegem a missão.' },
      ],
    },
  },

  blog: {
    title: 'Blog',
    description: 'Notícias, histórias e reflexões do UP Desenvolvimento.',
    label: 'Blog',
    heading: 'Histórias dos *bairros*',
    lead: 'O que temos feito, o que temos aprendido e as pessoas que fazem o UP acontecer.',
    empty: 'Ainda não há artigos publicados.',
    back: 'Voltar ao blog',
    publishedOn: 'Publicado a',
    otherPosts: 'Continua a ler',
  },

  contact: {
    title: 'Contactos',
    description: 'Fala com o UP Desenvolvimento: email, Instagram, LinkedIn e Facebook.',
    label: 'Contactos',
    heading: 'Fala *connosco*',
    lead: 'Respondemos a todas as mensagens. Normalmente em menos de uma semana, mas somos voluntários, por isso dá-nos algum desconto.',
    emailTitle: 'Email',
    emailText: 'Para dúvidas, parcerias, imprensa ou só para dizer olá.',
    copyEmail: 'Copiar email',
    copied: 'Copiado!',
    socialTitle: 'Redes sociais',
    socialText: 'É no Instagram que vês o dia a dia dos bairros.',
    volunteerTitle: 'Queres ser voluntário?',
    volunteerText: 'O caminho mais rápido é preencher o formulário de candidatura.',
    partnerTitle: 'Tens uma proposta de parceria?',
    partnerText: 'Escreve-nos com o assunto "Parceria" e conta-nos o que tens em mente.',
  },

  notFound: {
    title: 'Página não encontrada',
    heading: 'Este balão *voou*',
    text: 'A página que procuras não existe ou mudou de sítio.',
    back: 'Voltar ao início',
  },
};
