import { translations } from './translations.js';

export function initializeLanguageSwitch() {
  const currentLang = localStorage.getItem('language') || 'en';
  document.documentElement.lang = currentLang;
  updateContent(currentLang);

  document.getElementById('languageSwitch').addEventListener('click', () => {
    const newLang = document.documentElement.lang === 'en' ? 'pt' : 'en';
    document.documentElement.lang = newLang;
    localStorage.setItem('language', newLang);
    updateContent(newLang);
  });
}

function updateContent(lang) {
  const t = translations[lang];
  
  // Update navigation
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n.split('.');
    let value = t;
    for (const k of key) {
      value = value[k];
    }
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.placeholder = value;
    } else {
      element.textContent = value;
    }
  });

  // Update button text
  document.getElementById('languageSwitch').textContent = lang === 'en' ? '🇧🇷 PT' : '🇺🇸 EN';
}