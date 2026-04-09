const langButtons = document.querySelectorAll('.lang-btn');
const nodes = document.querySelectorAll('[data-fr][data-en]');
const html = document.documentElement;

function setLanguage(lang) {
  html.lang = lang;
  nodes.forEach((node) => {
    const value = node.getAttribute(`data-${lang}`);
    if (value !== null) node.innerHTML = value;
  });
  langButtons.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.lang === lang));
  try { localStorage.setItem('site-lang-v3', lang); } catch(e) {}
}

langButtons.forEach((btn) => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

try {
  setLanguage(localStorage.getItem('site-lang-v3') || 'fr');
} catch(e) {
  setLanguage('fr');
}

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const cards = document.querySelectorAll('.art-card');

function openLightbox(button) {
  const lang = document.documentElement.lang || 'fr';
  const image = button.getAttribute('data-image');
  const title = button.getAttribute(lang === 'en' ? 'data-title-en' : 'data-title-fr') || '';
  if (!image) return;
  lightboxImage.src = image;
  lightboxImage.alt = title;
  lightboxCaption.textContent = title;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  lightboxImage.alt = '';
  lightboxCaption.textContent = '';
  document.body.style.overflow = '';
}

cards.forEach((card) => card.addEventListener('click', () => openLightbox(card)));
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
});
