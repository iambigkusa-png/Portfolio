// Loading screen: keeps the interface visible while the page assets settle.
(() => {
  const body = document.body;
  const loader = document.createElement('div');
  loader.className = 'loading-screen';
  loader.setAttribute('role', 'status');
  loader.setAttribute('aria-label', 'Loading portfolio');
  loader.innerHTML = `
    <div class="loading-content">
      <div class="loading-brand"><span class="loading-mark" aria-hidden="true">P</span><span>PERSONAL ARCHIVE / SYSTEM BOOT</span></div>
      <div class="loading-kicker">WELCOME TO THE OPERATIONS BASE</div>
      <div class="loading-title">INITIALIZING<span>.</span></div>
      <div class="loading-progress-meta"><span>LOADING PROFILE DATA</span><span class="loading-percent">00%</span></div>
      <div class="loading-track" aria-hidden="true"><span></span></div>
      <button class="loading-skip" type="button">SKIP INTRO ↗</button>
    </div>`;
  body.classList.add('is-loading');
  body.setAttribute('aria-busy', 'true');
  body.append(loader);

  const bar = loader.querySelector('.loading-track span');
  const percent = loader.querySelector('.loading-percent');
  const startedAt = performance.now();
  let progress = 0;
  let finished = false;

  const progressTimer = window.setInterval(() => {
    if (finished) return;
    progress = Math.min(93, progress + Math.max(1, Math.ceil((93 - progress) / 14)));
    bar.style.width = `${progress}%`;
    percent.textContent = `${String(progress).padStart(2, '0')}%`;
  }, 45);

  function finishLoading() {
    if (finished) return;
    finished = true;
    window.clearInterval(progressTimer);
    bar.style.width = '100%';
    percent.textContent = '100%';
    const wait = Math.max(0, 650 - (performance.now() - startedAt));
    window.setTimeout(() => {
      loader.classList.add('is-hidden');
      body.classList.remove('is-loading');
      body.removeAttribute('aria-busy');
      window.setTimeout(() => loader.remove(), 600);
    }, wait);
  }

  loader.querySelector('.loading-skip').addEventListener('click', finishLoading);
  if (document.readyState === 'complete') finishLoading();
  else window.addEventListener('load', finishLoading, { once: true });
  // Avoid trapping visitors on unusually slow connections.
  window.setTimeout(finishLoading, 2400);
})();

// Mobile navigation menu.
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Tabbed portfolio navigation.
const tabButtons = document.querySelectorAll('[data-tab]');
const tabPanels = document.querySelectorAll('[data-tab-panel]');
function activateTab(tabName) {
  const target = document.querySelector(`[data-tab-panel="${tabName}"]`);
  if (!target) return;
  tabPanels.forEach(panel => panel.classList.toggle('is-active', panel === target));
  tabButtons.forEach(button => {
    const active = button.dataset.tab === tabName;
    button.classList.toggle('active', active);
    if (button.classList.contains('tab-link')) button.setAttribute('aria-current', active ? 'page' : 'false');
  });
  if (nav) nav.classList.remove('open');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', `#${tabName}`);
}
tabButtons.forEach(button => button.addEventListener('click', () => activateTab(button.dataset.tab)));
const initialTab = location.hash.replace('#', '');
if (initialTab && document.querySelector(`[data-tab-panel="${initialTab}"]`)) activateTab(initialTab);

// Project category filters.
const filters = document.querySelectorAll('.filter');
const cards = [...document.querySelectorAll('.project-card')];
filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.filter;
    cards.forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; });
    if (track) track.scrollTo({ left: 0, behavior: 'smooth' });
    updateCarousel();
  });
});

// Turn the existing project list into a keyboard-accessible, touch-friendly carousel.
const track = document.querySelector('.project-grid');
if (track && cards.length) {
  track.classList.add('is-carousel');
  const toolbar = document.createElement('div');
  toolbar.className = 'carousel-toolbar';
  toolbar.setAttribute('aria-label', 'Project carousel controls');
  toolbar.innerHTML = `
    <span class="carousel-count" aria-live="polite"><strong>01</strong> / ${String(cards.length).padStart(2, '0')}</span>
    <button class="carousel-arrow carousel-prev" type="button" aria-label="Previous projects">←</button>
    <button class="carousel-arrow carousel-next" type="button" aria-label="Next projects">→</button>`;
  track.parentNode.insertBefore(toolbar, track);
  const previous = toolbar.querySelector('.carousel-prev');
  const next = toolbar.querySelector('.carousel-next');
  const count = toolbar.querySelector('.carousel-count');

  function visibleCards() { return cards.filter(card => !card.hidden); }
  function updateCarousel() {
    if (!track || !toolbar.isConnected) return;
    const visible = visibleCards();
    const first = visible.findIndex(card => card.offsetLeft >= track.scrollLeft + track.offsetLeft - 4);
    const index = first < 0 ? Math.max(0, visible.length - 1) : first;
    count.innerHTML = `<strong>${String(visible.length ? index + 1 : 0).padStart(2, '0')}</strong> / ${String(visible.length).padStart(2, '0')}`;
    previous.disabled = index <= 0;
    next.disabled = index >= visible.length - 1;
    toolbar.hidden = visible.length < 2;
  }

  function moveCarousel(direction) {
    const visible = visibleCards();
    if (!visible.length) return;
    const current = visible.findIndex(card => card.offsetLeft >= track.scrollLeft + track.offsetLeft - 4);
    const nextIndex = Math.max(0, Math.min(visible.length - 1, (current < 0 ? 0 : current) + direction));
    track.scrollTo({ left: visible[nextIndex].offsetLeft - track.offsetLeft, behavior: 'smooth' });
  }

  previous.addEventListener('click', () => moveCarousel(-1));
  next.addEventListener('click', () => moveCarousel(1));
  track.addEventListener('scroll', updateCarousel, { passive: true });
  window.addEventListener('resize', updateCarousel);
  updateCarousel();
}
