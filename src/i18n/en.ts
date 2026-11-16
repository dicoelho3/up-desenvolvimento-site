/**
 * English copy. Must mirror the structure of `pt.ts` — TypeScript will complain if a key is missing.
 * Same mini-formatting: *highlight* and **bold**.
 */
import type { pt } from './pt';

export const en: typeof pt = {
  meta: {
    siteDescription:
      'UP Desenvolvimento is a youth-led non-profit in Greater Lisbon. Our volunteers mentor young people from vulnerable neighbourhoods every week. Lifting young people. Transforming communities.',
  },

  nav: {
    home: 'Home',
    volunteer: 'Volunteer',
    support: 'Support',
    about: 'About us',
    blog: 'Blog',
    contact: 'Contact',
    cta: 'Join UP',
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to content',
    switchLang: 'Ver em português',
  },

  legal: {
    label: 'Legal information',
    updated: 'Last updated:',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    nif: 'Tax no. (NIF)',
  },

  footer: {
    tagline: 'Lifting young people. Transforming communities.',
    about: 'A non-profit association founded by young people in 2021, in Lisbon.',
    explore: 'Explore',
    getInvolved: 'Get involved',
    follow: 'Follow us',
    becomeMentor: 'Become a mentor',
    becomeSponsor: 'Become a sponsor',
    irs: 'Donate your IRS',
    rights: 'UP Desenvolvimento',
  },

  common: {
    readMore: 'Read more',
    seeAll: 'See all',
    applyMentor: 'Become a mentor',
    becomeSponsor: 'Become a sponsor',
    learnMore: 'Learn more',
    howItWorks: 'How it works',
    writeUs: 'Write to us',
    weekly: 'Weekly',
    monthly: 'Monthly',
    oneOff: 'As needed',
    since: 'since',
    opensNewTab: '(opens in a new tab)',
    emailCopied: 'Email copied',
  },

  home: {
    title: 'Lifting young people. Transforming communities.',
    hero: {
      eyebrow: 'A youth-led non-profit · Greater Lisbon',
      title: 'Lifting *young people.* Transforming communities.',
      lead: 'Every week, our mentors sit down next to a young person from a vulnerable neighbourhood. They study together, talk and build trust. One session at a time, new paths start to open.',
      note: 'part of the UP team',
      secondary: 'How it works',
    },
    question: {
      label: 'Why?',
      text: 'How have your *opportunities* shaped **your path?**',
      aside: 'Not everyone starts with the same ones. That is why UP was born.',
    },
    video: {
      label: 'On video',
      title: 'UP, *in our own words*',
      text: 'Who we are, what we do in the neighbourhoods and why it matters. In just a few minutes.',
      note: 'press play',
      play: 'Watch the video',
      onYoutube: 'Watch on YouTube',
      posterLine1: 'Lifting young people.',
      posterLine2: 'Transforming communities.',
    },
    mission: {
      photo1Alt: 'A large group of UP volunteers in front of a glass-block wall, with the UP roll-up banner',
      photo2Alt: 'UP volunteers next to a tower of orange and blue balloons',
      label: 'Who are we?',
      title: 'By young people. *For young people.*',
      kicker: 'Our mission',
      text: 'To promote social mobility and equal opportunities **by supporting the development of young people in vulnerable contexts.**',
      body: 'We are students and young professionals. We recruit, train and support volunteers who, together with local associations, become mentors to young people in their own neighbourhoods.',
      link: 'Read our story',
    },
    programs: {
      label: 'What do we do on the ground?',
      title: 'Four impact programmes',
    },
    stats: {
      label: 'In numbers',
      title: 'Real, *measured* impact',
      note: 'Cumulative figures since 2021. Every semester we survey mentors and mentees to measure our impact.',
      link: 'How we measure impact',
    },
    neighborhoods: {
      label: 'We work together with',
      title: 'Associations in vulnerable *neighbourhoods*',
      text: 'We don’t arrive with ready-made answers. We partner with people who already know each neighbourhood from the inside, and sessions take place at their premises.',
      mapAlt: 'Map of the Lisbon area showing the neighbourhoods where UP works',
      prev: 'Previous neighbourhood',
      next: 'Next neighbourhood',
    },
    join: {
      label: 'Want to be part of it?',
      mentor: {
        title: 'Give 1h30 a week',
        text: 'Mentor a young person throughout the school year. You don’t need to be a teacher, you need to show up.',
        cta: 'Become a mentor',
      },
      sponsor: {
        title: 'Sponsor a young person',
        text: '€40 a year covers a young person’s yearly enrolment at UP: materials, transport and activities.',
        cta: 'Ways to support',
      },
    },
    blog: {
      label: 'From our blog',
      title: 'Latest news',
    },
    partners: {
      label: 'Our community',
      title: 'Backed by many *partners*',
    },
  },

  volunteer: {
    title: 'Volunteer',
    description:
      'Become a UP mentor: 1h30 a week supporting a young person from a vulnerable neighbourhood, with training and a whole community behind you.',
    hero: {
      label: 'Volunteer',
      title: 'Become a UP *mentor*',
      lead: '1h30 a week. One young person. A whole school year growing side by side, with training and a community of volunteers behind you.',
    },
    role: {
      label: 'What does a mentor do?',
      title: 'More than *tutoring*',
      items: [
        {
          title: 'One session a week',
          text: '1h30 sessions, one-to-one or in pairs, after working hours, at the premises of a local partner association.',
        },
        {
          title: 'A relationship built on trust',
          text: 'You help with homework and study methods, but above all you show up. That consistency is what makes the difference.',
        },
        {
          title: 'One activity a month',
          text: 'On weekends, mentors and mentees leave the neighbourhood together: museums, climbing, science, sports.',
        },
      ],
    },
    photos: {
      caption1: 'volunteer training',
      caption2: 'meeting the neighbourhoods',
      caption3: 'sharing in a circle',
      caption4: 'case studies',
      training1: 'UP volunteers at a training session',
      training2: 'A trainer presenting at a volunteer session',
      training3: 'Volunteers sitting in a circle during training',
      training4: 'Volunteers’ hands holding envelopes with case studies during training',
    },
    gets: {
      label: 'What’s in it for you?',
      title: 'You won’t be *alone*',
      items: [
        { title: 'Training', text: 'Our Annual Volunteer Meeting in October and workshops throughout the year, some with Teach For Portugal.' },
        { title: 'Support', text: 'Each neighbourhood has a coordinator who knows the young people, organises shifts and is there when questions come up.' },
        { title: 'Community', text: 'Over 45 volunteers, dinners, team-buildings and friendships that last well beyond the school year.' },
        { title: 'Welcome Book', text: 'A guide with everything you need for your first session: mission, good practices and materials.' },
      ],
    },
    steps: {
      label: 'How does it work?',
      title: 'From the form to your *first* session',
      items: [
        { title: 'Apply', text: 'Fill in the form. It only takes a few minutes.' },
        { title: 'Chat', text: 'Between September and October we talk to get to know you and understand your availability.' },
        { title: 'Training', text: 'You join the Annual Volunteer Meeting and receive the Welcome Book.' },
        { title: 'First session', text: 'You meet your mentee. From here on, it’s week by week until the end of the school year.' },
      ],
    },
    extra: {
      label: 'Beyond mentoring',
      reading: {
        title: 'Reading Project',
        stat: '23,000',
        statText: 'children in Portugal are “at risk of future difficulties” because of their reading level.',
        text: 'We created a board game that gets mentees reading more, and enjoying it. On UP Day there are prizes for the keenest readers.',
      },
      photos: {
        science: 'Science workshop: a mentor with two mentees in lab coats and gloves',
        scienceCaption: 'science workshop',
        planting: 'A mentor and a mentee at a tree-planting day',
        plantingCaption: 'tree planting',
        outing: 'Mentors and mentees seen from behind, on a trip to the Padrão dos Descobrimentos',
        outingCaption: 'trip to Belém',
        pottery: 'Clay mugs made by mentees at a pottery workshop',
        potteryCaption: 'pottery',
      },
      psycho: {
        title: 'Psychosocial activities',
        text: 'Every month, a different outing: puppets, climbing, a physics circus, the zoo. Thanks to our partners, young people visit new places and discover what they are capable of.',
        list: ['Puppet Museum', 'Climbing', 'Physics Circus', 'Lisbon Zoo', 'UP Day'],
        listNote: 'some 2025/26 outings',
      },
    },
    testimonials: {
      label: 'From our mentors',
      title: 'In their own *words*',
    },
    faq: {
      label: 'FAQ',
      title: 'Still have *questions?*',
      items: [
        {
          q: 'Do I need teaching experience?',
          a: 'No. Mentoring is not tutoring. We give you training and materials. What matters most is consistency and the will to build a relationship with your mentee.',
        },
        {
          q: 'How much time does it take?',
          a: 'One 1h30 session a week, after working hours, during the school year (October to May). The monthly weekend activities are optional but highly recommended.',
        },
        {
          q: 'Where do sessions take place?',
          a: 'At our partner associations in Apelação, São João da Talha, Damaia and Bairro Alto. We try to match you with the most convenient one and organise car-sharing between volunteers.',
        },
        {
          q: 'When can I apply?',
          a: 'Our main recruitment runs from September to October, but you can fill in the form any time and we’ll get in touch when there’s a spot.',
        },
        {
          q: 'Can I help without being a mentor?',
          a: 'Of course. There’s always work in communications, fundraising, events and organisation. Write to us and tell us what you’d like to do.',
        },
      ],
    },
    cta: {
      title: 'Start your *journey* as a mentor today',
      text: 'The form takes five minutes. The rest, we do together.',
    },
  },

  support: {
    title: 'Support',
    description:
      'Sponsor a young person, allocate your IRS or bring your company on board. All the ways to support UP Desenvolvimento.',
    hero: {
      imageAlt: 'A UP volunteer sitting with orange balloons',
      label: 'Support',
      title: 'There are many ways to *lend a hand*',
      lead: 'UP runs on volunteers, but sessions, transport and activities have costs. Every contribution goes straight to the young people.',
    },
    sponsor: {
      tag: 'Sponsorship',
      title: 'Sponsor a young person',
      price: '€40',
      period: 'per year',
      text: 'You cover a young person’s yearly enrolment at UP. Throughout the year we send you news from the neighbourhoods and invite you to our events.',
      photoAlt: 'A mentor with his mentee on an outdoor trip',
      covers: 'What it covers',
      items: ['School supplies', 'Learning resources', 'Transport', 'Monthly activities'],
      cta: 'Become a sponsor',
    },
    irs: {
      tag: 'IRS allocation (Portugal)',
      title: 'Allocate 1% of your IRS',
      price: '€0',
      period: 'for you',
      text: 'If you pay income tax in Portugal, part of the tax you already pay, which would go to the State, can come to UP instead. You don’t pay more or get a smaller refund.',
      steps: [
        'Log in to the Portal das Finanças.',
        'In your IRS return (box 11) or in the “Consignação” area, choose an entity.',
        'Enter UP Desenvolvimento’s tax number (NIF) and confirm.',
      ],
      nifLabel: 'UP’s NIF',
      copyNif: 'Copy NIF',
      copied: 'Copied!',
      guide: 'See the step-by-step guide',
      highlight: 'Last year, IRS allocations were UP’s largest source of funding.',
    },
    volunteer: {
      tag: 'Volunteering',
      title: 'Give your time',
      text: 'If time is what you have to give, there’s a place for you: as a mentor, or helping with communications, events and organisation.',
      cta: 'Volunteer',
    },
    companies: {
      tag: 'Companies & partners',
      title: 'Open a door for our young people',
      text: 'Many of our psychosocial activities only happen because someone opened a door: a museum, a park, a company. If you have a space, an experience or resources to share, get in touch.',
      cta: 'Propose a partnership',
    },
  },

  about: {
    title: 'About us',
    description:
      'The story, mission and team behind UP Desenvolvimento. Born in 2021 in Apelação to help one girl get into secondary school.',
    hero: {
      imageAlt: 'UP volunteers at a recruitment stand, next to the UP roll-up banner',
      label: 'How did it start?',
      title: 'It all began with *one* girl’s dream',
      lead: 'In 2021, a group of university students came together to help a girl from Bairro da Apelação get into secondary school. Today we are an association with dozens of volunteers and four partner neighbourhoods.',
    },
    gap: {
      label: 'Why?',
      title: 'UP was born to close a *simple but structural* gap',
      left: {
        title: 'Local associations',
        text: '**On one side**, associations doing essential work, with deep knowledge of their communities, but limited resources for one-to-one support.',
      },
      right: {
        title: 'Driven young people',
        text: '**On the other**, a generation determined to make a difference, but that doesn’t always find the community, structure and training for responsible, purposeful volunteering.',
      },
    },
    axes: {
      label: 'What is our ambition?',
      title: 'Strategic *pillars*',
      items: [
        {
          tag: 'Quality',
          title: 'Every session counts.',
          question: 'How do we make sure mentoring has a positive, lasting impact?',
          text: 'Create a cycle of social change, where the young people we support today become the mentors of tomorrow.',
        },
        {
          tag: 'Reach',
          title: 'Every neighbourhood matters.',
          question: 'How do we grow UP through hubs led by youth associations?',
          text: 'Reach every vulnerable neighbourhood in Portugal, so that all their young people have good opportunities.',
        },
      ],
    },
    values: {
      label: 'What guides us?',
      title: 'Our *values*',
      items: [
        { title: 'Trust', text: 'Building authentic, safe and consistent relationships, where young people feel seen, heard and valued. Trust is the foundation for learning, autonomy and change.' },
        { title: 'Closeness', text: 'Being present in the neighbourhood, regularly and accessibly. Our work grows out of living alongside people and listening, not from models imposed from outside. Being close means respecting each pace, story and reality.' },
        { title: 'Social change', text: 'Believing in change built from young person to young person. When young people develop their abilities and feel capable, they become an inspiration and a role model for others, creating lasting cycles of impact.' },
        { title: 'Community', text: 'Mentors, mentees, partners, families and volunteers form a living network. Change becomes possible when it is shared, when everyone sees themselves as part of the same movement.' },
      ],
    },
    method: {
      label: 'How do we create lasting impact?',
      title: 'The UP *method*',
      items: [
        { title: 'On-the-ground context', text: 'We work inside the neighbourhoods, with the associations already there.' },
        { title: 'Holistic approach', text: 'We support both school and personal journeys, inside and outside the classroom.' },
        { title: 'Volunteer community', text: 'Trained, supported and connected volunteers.' },
        { title: 'Impact assessment', text: 'We measure every semester and adjust based on what we learn.' },
      ],
    },
    timeline: {
      label: 'Our journey',
      title: 'From tutors to *mentors*',
    },
    impact: {
      label: 'In numbers',
      title: 'How do we *measure* impact?',
      text: 'Our twice-yearly surveys combine the views of mentees and mentors with objective and subjective indicators. This lets us track change over time and keep improving our programmes.',
      mentees: 'Mentees',
      mentors: 'Mentors',
    },
    team: {
      label: 'The team',
      title: 'Who runs UP *today*',
      text: 'UP’s board for 2026/27 and what each of them looks after. These are the people you’ll talk to when you join us.',
      members: 'Members',
    },
    founders: {
      label: 'Where it all began',
      title: 'The *co-founders*',
    },
    governance: {
      label: 'How we are organised',
      title: 'A *proper* association',
      text: 'Since December 2022 we have been a legally registered non-profit association. Every year we publish an Activity Plan and an Activity & Accounts Report, approved by our General Assembly.',
      bodies: [
        { title: 'General Assembly', text: 'Approves plans and reports and elects the governing bodies.' },
        { title: 'Board', text: 'Runs the association day to day and sets the strategy.' },
        { title: 'Audit Committee', text: 'Oversees the accounts and ensures transparency.' },
        { title: 'Advisory Council', text: 'The four co-founders, who advise the Board and safeguard the mission.' },
      ],
    },
  },

  blog: {
    title: 'Blog',
    description: 'News, stories and reflections from UP Desenvolvimento.',
    label: 'Blog',
    heading: 'Stories from the *neighbourhoods*',
    lead: 'What we’ve been doing, what we’ve been learning and the people who make UP happen.',
    empty: 'No posts published yet.',
    back: 'Back to the blog',
    publishedOn: 'Published on',
    otherPosts: 'Keep reading',
  },

  contact: {
    title: 'Contact',
    description: 'Get in touch with UP Desenvolvimento: email, Instagram, LinkedIn and Facebook.',
    label: 'Contact',
    heading: 'Get in *touch*',
    heroAlt: 'A UP volunteer blowing up an orange balloon',
    lead: 'We answer every message, usually within a week. We’re volunteers, so bear with us.',
    emailTitle: 'Email',
    emailText: 'Questions, partnerships, press, or just to say hello.',
    copyEmail: 'Copy email',
    copied: 'Copied!',
    socialTitle: 'Social media',
    socialText: 'Instagram is where you’ll see day-to-day life in the neighbourhoods.',
    volunteerTitle: 'Want to volunteer?',
    volunteerText: 'The quickest way is to fill in the application form.',
    partnerTitle: 'Have a partnership idea?',
    partnerText: 'Email us with the subject “Partnership” and tell us what you have in mind.',
  },

  notFound: {
    title: 'Page not found',
    heading: 'This balloon *flew away*',
    text: 'The page you’re looking for doesn’t exist or has moved.',
    back: 'Back to home',
  },
};
