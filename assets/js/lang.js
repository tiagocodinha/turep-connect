const messages = {
  pt: {
    'nav.programas': 'Programas',
    'nav.quem': 'Quem Somos',
    'nav.contactos': 'Contactos',
    'footer.company': 'TUREP - Turismo Único Representações',
    'footer.privacy': 'Política de Privacidade & Cookies'
  },
  en: {
    'nav.programas': 'Programs',
    'nav.quem': 'About Us',
    'nav.contactos': 'Contacts',
    'footer.company': 'TUREP - Unique Tourism Representations',
    'footer.privacy': 'Privacy & Cookies Policy'
  }
};

function applyLang(lang) {
  const dict = messages[lang] || messages.pt;
  document.documentElement.lang = lang;
  document
    .querySelectorAll('[data-i18n]')
    .forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

  document
    .querySelectorAll('.btn-lang')
    .forEach((btn) => btn.classList.toggle('active', btn.dataset.lang === lang));

  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('lang') || 'pt';
  applyLang(stored);

  document.querySelectorAll('.btn-lang').forEach((btn) => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
});
