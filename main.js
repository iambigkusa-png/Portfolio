// Mobile navigation menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Tabbed portfolio navigation: one main view is visible at a time.
const tabButtons = document.querySelectorAll('[data-tab]');
const tabPanels = document.querySelectorAll('[data-tab-panel]');

function activateTab(tabName) {
  const target = document.querySelector(`[data-tab-panel="${tabName}"]`);
  if (!target) return;

  tabPanels.forEach(panel => panel.classList.toggle('is-active', panel === target));
  tabButtons.forEach(button => {
    const active = button.dataset.tab === tabName;
    button.classList.toggle('active', active);
    if (button.classList.contains('tab-link')) {
      button.setAttribute('aria-current', active ? 'page' : 'false');
    }
  });

  if (nav) nav.classList.remove('open');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', `#${tabName}`);
}

tabButtons.forEach(button => {
  button.addEventListener('click', () => activateTab(button.dataset.tab));
});

// Open the requested tab when a visitor uses a direct URL hash.
const initialTab = location.hash.replace('#', '');
if (initialTab && document.querySelector(`[data-tab-panel="${initialTab}"]`)) {
  activateTab(initialTab);
}

// Project category filters
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.filter;
    cards.forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });
  });
});
