// Loading screen, theme controls, navigation, and motion-enhanced project carousel.
(() => {
  const body = document.body;
  const storageKey = 'portfolio-theme';

  try {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      body.dataset.theme = savedTheme;
    }
  } catch (error) {
    body.dataset.theme = 'dark';
  }

  if (!body.dataset.theme) body.dataset.theme = 'dark';

  const header = document.querySelector('.topbar');
  const nav = document.querySelector('.nav');
  if (header && !header.querySelector('.theme-toggle')) {
    const themeButton = document.createElement('button');
    themeButton.type = 'button';
    themeButton.className = 'theme-toggle';
    themeButton.setAttribute('aria-label', body.dataset.theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    themeButton.title = themeButton.getAttribute('aria-label');
    themeButton.innerHTML = body.dataset.theme === 'light' ? '☾' : '☼';
    themeButton.setAttribute('aria-pressed', String(body.dataset.theme === 'light'));

    themeButton.addEventListener('click', () => {
      const isLight = body.dataset.theme !== 'light';
      body.dataset.theme = isLight ? 'light' : 'dark';
      themeButton.setAttribute('aria-pressed', String(isLight));
      themeButton.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
      themeButton.title = themeButton.getAttribute('aria-label');
      themeButton.innerHTML = isLight ? '☾' : '☼';

      try {
        localStorage.setItem(storageKey, isLight ? 'light' : 'dark');
      } catch (error) {
        // Ignore storage failures and keep the theme in memory for the page session.
      }
    });

    header.insertBefore(themeButton, nav || null);
  }

  // Animated loading overlay.
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
    const wait = Math.max(0, 550 - (performance.now() - startedAt));
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
  window.setTimeout(finishLoading, 2400);
})();

const toggle = document.querySelector('.menu-toggle');
const navMain = document.querySelector('.nav');
if (toggle && navMain) {
  toggle.addEventListener('click', () => {
    const isOpen = navMain.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

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

  if (navMain) navMain.classList.remove('open');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', `#${tabName}`);
}

tabButtons.forEach(button => {
  button.addEventListener('click', () => activateTab(button.dataset.tab));
});

const initialTab = location.hash.replace('#', '');
if (initialTab && document.querySelector(`[data-tab-panel="${initialTab}"]`)) {
  activateTab(initialTab);
}

const filters = document.querySelectorAll('.filter');
const cards = [...document.querySelectorAll('.project-card')];
const track = document.querySelector('.project-grid');
let updateCarousel = () => {};

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.filter;
    cards.forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });
    if (track) track.scrollTo({ left: 0, behavior: 'smooth' });
    updateCarousel();
  });
});

if (track && cards.length) {
  track.classList.add('is-carousel');
  track.setAttribute('role', 'region');
  track.setAttribute('aria-label', 'Selected project carousel');
  track.setAttribute('tabindex', '0');

  const toolbar = document.createElement('div');
  toolbar.className = 'carousel-toolbar';
  toolbar.setAttribute('aria-label', 'Project carousel controls');
  toolbar.innerHTML = `
    <span class="carousel-count" aria-live="polite"></span>
    <button class="carousel-arrow carousel-prev" type="button" aria-label="Previous project">←</button>
    <button class="carousel-arrow carousel-next" type="button" aria-label="Next project">→</button>
    <button class="carousel-arrow carousel-play" type="button" aria-label="Pause automatic slideshow" aria-pressed="false">Ⅱ</button>`;

  track.parentNode.insertBefore(toolbar, track);

  const previous = toolbar.querySelector('.carousel-prev');
  const next = toolbar.querySelector('.carousel-next');
  const playPause = toolbar.querySelector('.carousel-play');
  const count = toolbar.querySelector('.carousel-count');
  const visibleCards = () => cards.filter(card => !card.hidden);
  let currentIndex = 0;
  let timer = null;
  let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let pointerInside = false;
  let focusInside = false;

  function cardOffset(card) {
    return card.offsetLeft - track.offsetLeft;
  }

  function nearestIndex() {
    const visible = visibleCards();
    if (!visible.length) return 0;
    let nearest = 0;
    let smallestDistance = Infinity;
    visible.forEach((card, index) => {
      const distance = Math.abs(cardOffset(card) - track.scrollLeft);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        nearest = index;
      }
    });
    return nearest;
  }

  function renderCarousel() {
    const visible = visibleCards();
    if (!visible.length) {
      count.textContent = '00 / 00';
      previous.disabled = true;
      next.disabled = true;
      playPause.disabled = true;
      toolbar.hidden = true;
      return;
    }

    currentIndex = Math.min(nearestIndex(), visible.length - 1);
    count.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(visible.length).padStart(2, '0')}`;
    previous.disabled = visible.length < 2;
    next.disabled = visible.length < 2;
    playPause.disabled = visible.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    toolbar.hidden = visible.length < 2;
    playPause.setAttribute('aria-pressed', String(paused));
    playPause.setAttribute('aria-label', paused ? 'Play automatic slideshow' : 'Pause automatic slideshow');
    playPause.title = paused ? 'Play automatic slideshow' : 'Pause automatic slideshow';
    playPause.textContent = paused ? '▶' : 'Ⅱ';
  }

  updateCarousel = renderCarousel;

  function goTo(index, behavior = 'smooth') {
    const visible = visibleCards();
    if (visible.length < 2) return;
    const wrappedIndex = (index + visible.length) % visible.length;
    track.scrollTo({ left: cardOffset(visible[wrappedIndex]), behavior });
  }

  function stopTimer() {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function startTimer() {
    stopTimer();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || pointerInside || focusInside || document.hidden || visibleCards().length < 2 || reducedMotion) return;
    timer = window.setInterval(() => {
      goTo(nearestIndex() + 1);
    }, 5200);
  }

  previous.addEventListener('click', () => goTo(nearestIndex() - 1));
  next.addEventListener('click', () => goTo(nearestIndex() + 1));
  playPause.addEventListener('click', () => {
    paused = !paused;
    renderCarousel();
    startTimer();
  });

  track.addEventListener('scroll', renderCarousel, { passive: true });
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(nearestIndex() + 1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(nearestIndex() - 1);
    }
  });

  track.addEventListener('mouseenter', () => {
    pointerInside = true;
    stopTimer();
  });
  track.addEventListener('mouseleave', () => {
    pointerInside = false;
    startTimer();
  });
  toolbar.addEventListener('mouseenter', () => {
    pointerInside = true;
    stopTimer();
  });
  toolbar.addEventListener('mouseleave', () => {
    pointerInside = false;
    startTimer();
  });

  track.addEventListener('focusin', () => {
    focusInside = true;
    stopTimer();
  });
  track.addEventListener('focusout', event => {
    if (!track.contains(event.relatedTarget)) {
      focusInside = false;
      startTimer();
    }
  });

  toolbar.addEventListener('focusin', () => {
    focusInside = true;
    stopTimer();
  });
  toolbar.addEventListener('focusout', event => {
    if (!toolbar.contains(event.relatedTarget)) {
      focusInside = false;
      startTimer();
    }
  });

  document.addEventListener('visibilitychange', startTimer);
  window.addEventListener('resize', renderCarousel);

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (typeof motionQuery.addEventListener === 'function') {
    motionQuery.addEventListener('change', () => {
      paused = motionQuery.matches;
      renderCarousel();
      startTimer();
    });
  }

  renderCarousel();
  startTimer();
}

const hero = document.querySelector('.hero');
const heroGrid = hero && hero.querySelector('.hero-grid');
const heroSide = hero && hero.querySelector('.hero-side');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if (hero && heroGrid && !motionPreference.matches && window.matchMedia('(pointer: fine)').matches) {
  let pointerX = 0;
  let pointerY = 0;
  let rafId = null;

  function paintParallax() {
    rafId = null;
    const scrollFactor = Math.min(window.scrollY, window.innerHeight) / Math.max(window.innerHeight, 1);
    heroGrid.style.setProperty('--parallax-x', `${pointerX * 8}px`);
    heroGrid.style.setProperty('--parallax-y', `${pointerY * 7 - scrollFactor * 12}px`);
    if (heroSide) {
      heroSide.style.setProperty('--parallax-y', `${pointerY * -5 + scrollFactor * 18}px`);
    }
  }

  function queueParallax() {
    if (rafId === null) {
      rafId = window.requestAnimationFrame(paintParallax);
    }
  }

  hero.addEventListener('pointermove', event => {
    const bounds = hero.getBoundingClientRect();
    pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
    queueParallax();
  }, { passive: true });

  hero.addEventListener('pointerleave', () => {
    pointerX = 0;
    pointerY = 0;
    queueParallax();
  });

  window.addEventListener('scroll', queueParallax, { passive: true });
}





















































































































