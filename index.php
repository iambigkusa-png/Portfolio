@import url("../../style.css");

body.is-loading { overflow: hidden; }
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  padding: 24px;
  overflow: hidden;
  background: #111518;
  color: var(--text, #edf1f2);
  opacity: 1;
  visibility: visible;
  transition: opacity 0.55s ease, visibility 0.55s ease;
}

.loading-screen::before,
.loading-screen::after { position: absolute; content: ""; pointer-events: none; }

.loading-screen::before {
  inset: 0;
  background: linear-gradient(115deg, transparent 48%, rgba(98, 210, 208, 0.035) 49%, transparent 50%),
              repeating-linear-gradient(0deg, transparent 0 5px, rgba(255, 255, 255, 0.018) 6px);
}

.loading-screen::after {
  width: min(60vw, 560px);
  aspect-ratio: 1;
  border: 1px solid rgba(98, 210, 208, 0.13);
  transform: rotate(45deg);
  box-shadow: 0 0 0 28px rgba(98, 210, 208, 0.025), 0 0 0 56px rgba(98, 210, 208, 0.018);
}

body[data-theme="light"] .loading-screen {
  background: #edf5fb;
  color: var(--text);
}

body[data-theme="light"] .loading-screen::before {
  background: linear-gradient(115deg, transparent 48%, rgba(15, 125, 184, 0.055) 49%, transparent 50%),
              repeating-linear-gradient(0deg, transparent 0 5px, rgba(15, 25, 35, 0.025) 6px);
}

body[data-theme="light"] .loading-screen::after {
  border-color: rgba(15, 125, 184, 0.18);
  box-shadow: 0 0 0 28px rgba(15, 125, 184, 0.035), 0 0 0 56px rgba(15, 125, 184, 0.02);
}

.loading-screen.is-hidden { opacity: 0; visibility: hidden; }
.loading-content { position: relative; z-index: 1; width: min(420px, 100%); }
.loading-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;
  color: var(--cyan, #62d2d0);
  font: 600 11px/1.5 var(--mono, monospace);
  letter-spacing: 0.18em;
}

.loading-mark {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border: 1px solid currentColor;
  font: 700 17px/1 var(--display, sans-serif);
}

.loading-kicker {
  color: var(--muted, #9aa5ad);
  font: 10px/1.5 var(--mono, monospace);
  letter-spacing: 0.2em;
}

.loading-title {
  margin: 8px 0 28px;
  font: 700 clamp(38px, 9vw, 58px)/0.95 var(--display, sans-serif);
  letter-spacing: 0.025em;
}

.loading-title span { color: var(--cyan, #62d2d0); }
.loading-progress-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 9px;
  color: var(--muted, #9aa5ad);
  font: 9px/1.5 var(--mono, monospace);
  letter-spacing: 0.12em;
}

.loading-percent { color: var(--cyan, #62d2d0); }
.loading-track { height: 2px; background: #30383c; }
body[data-theme="light"] .loading-track { background: #d5dde8; }
.loading-track span {
  display: block;
  width: 0;
  height: 100%;
  background: var(--cyan, #62d2d0);
  box-shadow: 0 0 12px rgba(98, 210, 208, 0.7);
  transition: width 0.18s ease;
}

.loading-skip {
  margin-top: 24px;
  padding: 8px 0;
  border: 0;
  background: none;
  color: var(--muted, #9aa5ad);
  cursor: pointer;
  font: 9px/1.5 var(--mono, monospace);
  letter-spacing: 0.14em;
}

.loading-skip:hover { color: var(--cyan, #62d2d0); }

.carousel-toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  margin: -4px 0 15px;
}

.carousel-count {
  min-width: 62px;
  color: var(--muted, #9aa5ad);
  text-align: center;
  font: 10px/1 var(--mono, monospace);
  letter-spacing: 0.1em;
}

.carousel-arrow {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 1px solid var(--line, #3b434b);
  background: transparent;
  color: var(--text, #edf1f2);
  cursor: pointer;
  font-size: 19px;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.carousel-arrow:hover:not(:disabled) {
  transform: translateY(-2px);
  border-color: var(--cyan, #62d2d0);
  background: var(--cyan, #62d2d0);
  color: #171a1e;
}

.carousel-arrow:disabled { opacity: 0.35; cursor: default; }

.project-grid.is-carousel {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 8px 2px 18px;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: var(--cyan, #62d2d0) var(--panel, #22272d);
}

.project-grid.is-carousel .project-card {
  flex: 0 0 calc((100% - 16px) / 2);
  min-width: 0;
  scroll-snap-align: start;
}

.project-grid.is-carousel .project-card[hidden] { display: none !important; }
.project-grid.is-carousel:focus-visible { outline-offset: 3px; }

.project-card {
  transform: translateZ(0);
  transition: transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  z-index: 1;
  transform: translateY(-6px);
  border-color: rgba(98, 210, 208, 0.7);
  box-shadow: 0 16px 38px rgba(0, 0, 0, 0.24), 0 0 22px rgba(98, 210, 208, 0.08);
}

.project-visual img {
  transition: transform 0.65s cubic-bezier(0.2, 0.7, 0.2, 1), filter 0.4s ease;
}

.project-card:hover .project-visual img {
  transform: scale(1.055);
  filter: saturate(1.12);
}

.project-card .project-class {
  transition: background 0.25s ease, color 0.25s ease;
}

.project-card:hover .project-class {
  background: var(--cyan, #62d2d0);
  color: #171a1e;
}

.button {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}

.button::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  content: "";
  background: rgba(255, 255, 255, 0.12);
  transform: translateX(-105%);
  transition: transform 0.3s ease;
}

.button:hover::before { transform: translateX(0); }

.skill-items span {
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.skill-items span:hover {
  transform: translateY(-2px);
  border-color: var(--cyan, #62d2d0);
  background: rgba(98, 210, 208, 0.08);
  color: var(--cyan, #62d2d0);
}

.text-link, .project-links a, .social-links a { transition: color 0.2s ease, padding 0.2s ease; }
.project-links a:hover, .social-links a:hover { padding-left: 4px; }

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 38px;
  width: 38px;
  height: 38px;
  margin-left: auto;
  margin-right: 14px;
  border: 1px solid var(--line, #3b434b);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text, #edf1f2);
  cursor: pointer;
  font-size: 17px;
  line-height: 1;
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.theme-toggle:hover {
  transform: translateY(-1px);
  border-color: var(--cyan, #62d2d0);
  color: var(--cyan, #62d2d0);
}

body[data-theme="light"] .theme-toggle { background: rgba(15, 125, 184, 0.06); }

.hero { isolation: isolate; overflow: hidden; }
.hero::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0 -12vw;
  pointer-events: none;
  background: radial-gradient(ellipse at 74% 44%, rgba(98, 210, 208, 0.10), transparent 34%), radial-gradient(ellipse at 5% 90%, rgba(71, 124, 169, 0.11), transparent 38%);
  opacity: 0.9;
}

body[data-theme="light"] .hero::before {
  background: radial-gradient(ellipse at 74% 44%, rgba(15, 125, 184, 0.12), transparent 34%), radial-gradient(ellipse at 5% 90%, rgba(77, 122, 177, 0.10), transparent 38%);
}

.hero-grid {
  transform: translate3d(var(--parallax-x, 0), var(--parallax-y, 0), 0);
  transition: transform 0.35s ease-out;
  will-change: transform;
}

.hero-side {
  transform: translate3d(0, var(--parallax-y, 0), 0);
  transition: transform 0.4s ease-out;
  will-change: transform;
}

.operator-frame {
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.24), 0 0 28px rgba(98, 210, 208, 0.10);
}

body[data-theme="light"] .operator-frame {
  box-shadow: 0 20px 50px rgba(25, 49, 71, 0.12), 0 0 28px rgba(15, 125, 184, 0.09);
}

body[data-theme="light"] .project-card:hover {
  box-shadow: 0 18px 34px rgba(23, 36, 53, 0.13), 0 0 22px rgba(15, 125, 184, 0.10);
}

body[data-theme="light"] .scanline { opacity: 0.12; }

@media (max-width: 800px) {
  .theme-toggle { margin-left: auto; margin-right: 10px; }
}

@media (max-width: 700px) {
  .project-grid.is-carousel .project-card { flex-basis: min(88%, 420px); }
}

@media (prefers-reduced-motion: reduce) {
  .loading-screen, .loading-track span, .carousel-arrow, .project-card, .project-visual img, .button::before, .skill-items span, .hero-grid, .hero-side {
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
