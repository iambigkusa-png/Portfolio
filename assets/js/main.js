// Portfolio UI: persistent theme, loading intro, tab navigation, carousel, and hero parallax.
(() => {
  const body = document.body;
  const themeKey = 'portfolio-theme';
  try {
    const storedTheme = localStorage.getItem(themeKey);
    body.dataset.theme = storedTheme === 'light' ? 'light' : 'dark';
  } catch (_) {
    body.dataset.theme = 'dark';
  }

  const header = document.querySelector('.topbar');
  const nav = document.querySelector('.nav');
  const menuToggle = document.querySelector('.menu-toggle');

  // Add a visible light/dark switch without changing the existing PHP markup.
  if (header && !header.querySelector('.theme-toggle')) {
    const themeButton = document.createElement('button');
    themeButton.type = 'button';
    themeButton.className = 'theme-toggle';
    const syncThemeButton = () => {
      const light = body.dataset.theme === 'light';
      themeButton.textContent = light ? '☾' : '☼';
      themeButton.setAttribute('aria-pressed', String(light));
      themeButton.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
      themeButton.title = themeButton.getAttribute('aria-label');
    };
    syncThemeButton();
    themeButton.addEventListener('click', () => {
      body.dataset.theme = body.dataset.theme === 'light' ? 'dark' : 'light';
      syncThemeButton();
      try { localStorage.setItem(themeKey, body.dataset.theme); } catch (_) { /* Keep theme active for this page view. */ }
    });
    header.insertBefore(themeButton, menuToggle || nav || null);
  }

  // Loading screen, with a skip control and a timeout failsafe.
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
  const progressBar = loader.querySelector('.loading-track span');
  const percentLabel = loader.querySelector('.loading-percent');
  const startTime = performance.now();
  let progress = 0;
  let loadingFinished = false;
  const progressTimer = window.setInterval(() => {
    if (loadingFinished) return;
    progress = Math.min(93, progress + Math.max(1, Math.ceil((93 - progress) / 14)));
    progressBar.style.width = `${progress}%`;
    percentLabel.textContent = `${String(progress).padStart(2, '0')}%`;
  }, 45);
  function dismissLoader() {
    if (loadingFinished) return;
    loadingFinished = true;
    window.clearInterval(progressTimer);
    progressBar.style.width = '100%';
    percentLabel.textContent = '100%';
    window.setTimeout(() => {
      loader.classList.add('is-hidden');
      body.classList.remove('is-loading');
      body.removeAttribute('aria-busy');
      window.setTimeout(() => loader.remove(), 600);
    }, Math.max(0, 550 - (performance.now() - startTime)));
  }
  loader.querySelector('.loading-skip').addEventListener('click', dismissLoader);
  if (document.readyState === 'complete') dismissLoader();
  else window.addEventListener('load', dismissLoader, { once: true });
  window.setTimeout(dismissLoader, 2400);

  // Mobile navigation menu.
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Tabbed portfolio navigation, also supporting direct hash links.
  const tabButtons = document.querySelectorAll('[data-tab]');
  const tabPanels = document.querySelectorAll('[data-tab-panel]');
  function activateTab(name) {
    const target = document.querySelector(`[data-tab-panel="${name}"]`);
    if (!target) return;
    tabPanels.forEach(panel => panel.classList.toggle('is-active', panel === target));
    tabButtons.forEach(button => {
      const active = button.dataset.tab === name;
      button.classList.toggle('active', active);
      if (button.classList.contains('tab-link')) button.setAttribute('aria-current', active ? 'page' : 'false');
    });
    if (nav) nav.classList.remove('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', `#${name}`);
  }
  tabButtons.forEach(button => button.addEventListener('click', () => activateTab(button.dataset.tab)));
  const hashTab = location.hash.slice(1);
  if (hashTab && document.querySelector(`[data-tab-panel="${hashTab}"]`)) activateTab(hashTab);

  // Project filter buttons and carousel controls.
  const filters = [...document.querySelectorAll('.filter')];
  const cards = [...document.querySelectorAll('.project-card')];
  const track = document.querySelector('.project-grid');
  let updateCarousel = () => {};
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(filter => filter.classList.toggle('active', filter === button));
    const category = button.dataset.filter;
    cards.forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; });
    if (track) track.scrollTo({ left: 0, behavior: 'smooth' });
    updateCarousel();
  }));

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
    let timer = null;
    let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pointerInside = false;
    let focusInside = false;

    const cardOffset = card => card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    function nearestIndex() {
      const visible = visibleCards();
      if (!visible.length) return 0;
      let best = 0;
      let shortest = Infinity;
      visible.forEach((card, index) => {
        const distance = Math.abs(cardOffset(card) - track.scrollLeft);
        if (distance < shortest) { shortest = distance; best = index; }
      });
      return best;
    }
    function stopTimer() {
      if (timer !== null) window.clearInterval(timer);
      timer = null;
    }
    function renderCarousel() {
      const visible = visibleCards();
      if (!visible.length) {
        count.textContent = '00 / 00';
        previous.disabled = next.disabled = playPause.disabled = true;
        toolbar.hidden = true;
        return;
      }
      const index = nearestIndex();
      count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(visible.length).padStart(2, '0')}`;
      previous.disabled = next.disabled = visible.length < 2;
      playPause.disabled = visible.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      toolbar.hidden = visible.length < 2;
      playPause.setAttribute('aria-pressed', String(paused));
      playPause.setAttribute('aria-label', paused ? 'Play automatic slideshow' : 'Pause automatic slideshow');
      playPause.title = playPause.getAttribute('aria-label');
      playPause.textContent = paused ? '▶' : 'Ⅱ';
    }
    function goTo(index) {
      const visible = visibleCards();
      if (visible.length < 2) return;
      const target = (index + visible.length) % visible.length;
      track.scrollTo({ left: cardOffset(visible[target]), behavior: 'smooth' });
    }
    function startTimer() {
      stopTimer();
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (paused || pointerInside || focusInside || document.hidden || visibleCards().length < 2 || reducedMotion) return;
      timer = window.setInterval(() => goTo(nearestIndex() + 1), 5200);
    }
    updateCarousel = renderCarousel;
    previous.addEventListener('click', () => goTo(nearestIndex() - 1));
    next.addEventListener('click', () => goTo(nearestIndex() + 1));
    playPause.addEventListener('click', () => { paused = !paused; renderCarousel(); startTimer(); });
    track.addEventListener('scroll', renderCarousel, { passive: true });
    track.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(nearestIndex() + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    [track, toolbar].forEach(element => {
      element.addEventListener('mouseenter', () => { pointerInside = true; stopTimer(); });
      element.addEventListener('mouseleave', () => { pointerInside = false; startTimer(); });
      element.addEventListener('focusin', () => { focusInside = true; stopTimer(); });
      element.addEventListener('focusout', event => {
        if (!element.contains(event.relatedTarget)) { focusInside = false; startTimer(); }
      });
    });
    document.addEventListener('visibilitychange', startTimer);
    window.addEventListener('resize', renderCarousel);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.addEventListener) motionQuery.addEventListener('change', () => {
      paused = motionQuery.matches;
      renderCarousel();
      startTimer();
    });
    renderCarousel();
    startTimer();
  }

  // Small pointer and scroll parallax on the hero. Disabled for touch/reduced motion.
  const hero = document.querySelector('.hero');
  const heroGrid = hero && hero.querySelector('.hero-grid');
  const heroSide = hero && hero.querySelector('.hero-side');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (hero && heroGrid && !motionQuery.matches && window.matchMedia('(pointer: fine)').matches) {
    let x = 0;
    let y = 0;
    let frame = null;
    const update = () => {
      frame = null;
      const scrollRatio = Math.min(window.scrollY, window.innerHeight) / Math.max(window.innerHeight, 1);
      heroGrid.style.setProperty('--parallax-x', `${x * 8}px`);
      heroGrid.style.setProperty('--parallax-y', `${y * 7 - scrollRatio * 12}px`);
      if (heroSide) heroSide.style.setProperty('--parallax-y', `${y * -5 + scrollRatio * 18}px`);
    };
    const queueUpdate = () => { if (frame === null) frame = requestAnimationFrame(update); };
    hero.addEventListener('pointermove', event => {
      const rect = hero.getBoundingClientRect();
      x = (event.clientX - rect.left) / rect.width - 0.5;
      y = (event.clientY - rect.top) / rect.height - 0.5;
      queueUpdate();
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { x = y = 0; queueUpdate(); });
    window.addEventListener('scroll', queueUpdate, { passive: true });
  }
})();
