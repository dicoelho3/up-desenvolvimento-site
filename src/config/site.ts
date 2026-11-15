/**
 * Informação global do UP — contactos, redes sociais e links externos.
 * Se algo mudar (email, formulário, NIF…), muda-se aqui e atualiza em todo o site.
 */
export const site = {
  name: 'UP Desenvolvimento',
  url: 'https://www.updesenvolvimento.com',
  email: 'up.desenvolvimento.geral@gmail.com',

  /** NIF da associação — quando preenchido, aparece na secção da consignação do IRS. */
  nif: '517 259 532' as string | null,

  forms: {
    /** Formulário de candidatura a voluntário/mentor. */
    volunteer:
      'https://docs.google.com/forms/d/e/1FAIpQLSccKp_n2QsJNH5svSWs5GVu304RuF4phlUWFiDxW_JcUFVJ5w/viewform',
    /** Formulário para padrinhos (por agora é o mesmo do voluntariado, como no site atual). */
    sponsor:
      'https://docs.google.com/forms/d/e/1FAIpQLSccKp_n2QsJNH5svSWs5GVu304RuF4phlUWFiDxW_JcUFVJ5w/viewform',
  },

  /** Publicação do Instagram com o guia da consignação do IRS. */
  irsGuide: 'https://www.instagram.com/p/DWmMJESAPmJ/',

  social: {
    instagram: { label: '@up_desenvolvimento_', url: 'https://www.instagram.com/up_desenvolvimento_/' },
    linkedin: { label: 'UP Desenvolvimento', url: 'https://www.linkedin.com/company/associacao-up-desenvolvimento/' },
    facebook: { label: 'UP Desenvolvimento', url: 'https://www.facebook.com/profile.php?id=61550473344816' },
  },

  /** Mostra o seletor PT/EN no menu. Põe `false` para esconder a versão inglesa. */
  showLanguageSwitch: true,
} as const;
