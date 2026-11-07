<?php
declare(strict_types=1);
require __DIR__ . '/data.php';

function e(string $value): string {
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function initials(string $name): string {
    $parts = preg_split('/\s+/', trim($name)) ?: [];
    $out = '';
    foreach (array_slice($parts, 0, 2) as $part) {
        $first = function_exists('mb_substr') ? mb_substr($part, 0, 1) : substr($part, 0, 1);
        $out .= function_exists('mb_strtoupper') ? mb_strtoupper($first) : strtoupper($first);
    }
    return $out ?: 'OP';
}

$displayName = $profile['name'] ?: 'YOUR NAME';
$year = date('Y');
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#171a1e">
  <meta name="description" content="<?= e($profile['tagline']) ?>">
  <title><?= e($displayName) ?> — Developer Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<div class="scanline" aria-hidden="true"></div>
<header class="topbar">
  <a class="brand" href="#home" aria-label="Go to top">
    <span class="brand-mark"><?= e(initials($displayName)) ?></span>
    <span class="brand-copy"><strong><?= e($profile['callsign']) ?></strong><small>PERSONAL ARCHIVE / <?= e($profile['classification']) ?></small></span>
  </a>
  <button class="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false"><span></span><span></span></button>
  <nav class="nav" aria-label="Main navigation">
    <button type="button" class="tab-link active" data-tab="home"><i>00</i> HOME</button>
    <button type="button" class="tab-link" data-tab="about"><i>01</i> PROFILE</button>
    <button type="button" class="tab-link" data-tab="works"><i>02</i> OPERATIONS</button>
    <button type="button" class="tab-link" data-tab="skills"><i>03</i> ARSENAL</button>
    <button type="button" class="tab-link" data-tab="experience"><i>04</i> RECORD</button>
    <button type="button" class="tab-link nav-contact" data-tab="contact">CONTACT <span>↗</span></button>
  </nav>
</header>

<main>
  <section class="hero section-wrap tab-panel is-active" id="home" data-tab-panel="home">
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-content">
      <div class="eyebrow"><span class="pulse"></span> INDEPENDENT DEVELOPER <b>// AVAILABLE FOR OPPORTUNITIES</b></div>
      <p class="hero-pretitle">WELCOME TO MY OPERATIONS BASE</p>
      <h1><?= e($displayName) ?><span class="accent">.</span></h1>
      <h2><?= e($profile['role']) ?></h2>
      <p class="hero-description"><?= e($profile['tagline']) ?></p>
      <div class="hero-actions">
        <button class="button button-primary" type="button" data-tab="works">VIEW MY WORK <span>↘</span></button>
        <button class="button button-ghost" type="button" data-tab="contact">GET IN TOUCH <span>↗</span></button>
      </div>
      <div class="hero-meta">
        <span><small>BASE OF OPERATIONS</small><?= e($profile['location']) ?></span>
        <span><small>FOCUS</small><?= e($profile['focus']) ?></span>
        <span><small>STATUS</small><b class="status"><?= e($profile['availability']) ?></b></span>
      </div>
    </div>
    <div class="hero-side" aria-label="Profile insignia">
      <div class="crosshair" aria-hidden="true">+</div>
      <div class="side-number">NO. <?= e($profile['operator_id']) ?></div>
      <div class="operator-frame">
        <?php if (!empty($profile['portrait'])): ?>
          <img src="<?= e($profile['portrait']) ?>" alt="Portrait of <?= e($displayName) ?>">
        <?php else: ?>
          <div class="portrait-placeholder"><span><?= e(initials($displayName)) ?></span><small>INSERT<br>PORTRAIT</small></div>
        <?php endif; ?>
        <div class="frame-corner top-left" aria-hidden="true"></div>
        <div class="frame-corner bottom-right" aria-hidden="true"></div>
      </div>
      <div class="side-caption"><span>PERSONNEL FILE</span><b><?= e($profile['callsign']) ?></b></div>
    </div>
    <div class="hero-index"><span>SCROLL TO EXPLORE</span><span class="index-line"></span><span>01 / 05</span></div>
  </section>

  <section class="section-wrap section-block tab-panel" id="about" data-tab-panel="about">
    <div class="section-heading"><div><span class="section-kicker">01 / PERSONNEL DATA</span><h2>OPERATOR <em>PROFILE</em></h2></div><span class="section-code">FILE: <?= e($profile['operator_id']) ?></span></div>
    <div class="about-layout">
      <div class="about-stamp"><span><?= e(initials($displayName)) ?></span><small>IDENTITY<br>CONFIRMED</small><b>PERSONAL DOSSIER</b></div>
      <div class="about-copy">
        <p class="lead"><?= e($profile['intro']) ?></p>
        <p><?= e($profile['about']) ?></p>
        <div class="data-grid">
          <div><small>FULL NAME</small><strong><?= e($profile['name'] ?: 'Your name here') ?></strong></div>
          <div><small>DESIGNATION</small><strong><?= e($profile['role']) ?></strong></div>
          <div><small>LOCATION</small><strong><?= e($profile['location']) ?></strong></div>
          <div><small>LANGUAGES</small><strong><?= e($profile['spoken_languages']) ?></strong></div>
        </div>
        <?php if (!empty($profile['resume_url'])): ?>
          <a class="text-link" href="<?= e($profile['resume_url']) ?>" target="_blank" rel="noopener">ACCESS CURRICULUM VITAE <span>↗</span></a>
        <?php endif; ?>
      </div>
    </div>
  </section>

  <section class="section-wrap section-block works-section tab-panel" id="works" data-tab-panel="works">
    <div class="section-heading"><div><span class="section-kicker">02 / FIELD OPERATIONS</span><h2>SELECTED <em>WORKS</em></h2></div><span class="section-code"><?= count($projects) ?> RECORDS FOUND</span></div>
    <p class="section-intro">A selection of projects, experiments, and systems I have worked on. Open a record to inspect the details.</p>
    <div class="filter-row" aria-label="Filter projects">
      <button class="filter active" type="button" data-filter="all">ALL RECORDS <span><?= count($projects) ?></span></button>
      <?php foreach ($projectCategories as $category): ?>
        <button class="filter" type="button" data-filter="<?= e(strtolower($category)) ?>"><?= e(strtoupper($category)) ?></button>
      <?php endforeach; ?>
    </div>
    <div class="project-grid">
      <?php foreach ($projects as $i => $project): ?>
        <article class="project-card" data-category="<?= e(strtolower($project['category'])) ?>">
          <div class="project-visual">
            <?php if (!empty($project['image'])): ?>
              <img src="<?= e($project['image']) ?>" alt="<?= e($project['title']) ?> preview" loading="lazy">
            <?php else: ?>
              <div class="project-placeholder"><span><?= str_pad((string)($i + 1), 2, '0', STR_PAD_LEFT) ?></span><b><?= e($project['short_label']) ?></b><small>PROJECT VISUAL / PLACEHOLDER</small></div>
            <?php endif; ?>
            <span class="project-class"><?= e(strtoupper($project['category'])) ?></span>
          </div>
          <div class="project-info">
            <div class="project-topline"><span>OPERATION // <?= str_pad((string)($i + 1), 2, '0', STR_PAD_LEFT) ?></span><span><?= e($project['year']) ?></span></div>
            <h3><?= e($project['title']) ?></h3>
            <p><?= e($project['description']) ?></p>
            <div class="tag-list"><?php foreach ($project['stack'] as $tech): ?><span><?= e($tech) ?></span><?php endforeach; ?></div>
            <div class="project-links">
              <?php if (!empty($project['demo'])): ?><a href="<?= e($project['demo']) ?>" target="_blank" rel="noopener">LIVE DEMO ↗</a><?php endif; ?>
              <?php if (!empty($project['source'])): ?><a href="<?= e($project['source']) ?>" target="_blank" rel="noopener">SOURCE CODE ↗</a><?php endif; ?>
              <?php if (empty($project['demo']) && empty($project['source'])): ?><span class="muted-link">LINKS TO BE ADDED</span><?php endif; ?>
            </div>
          </div>
          <div class="card-index">R-<?= str_pad((string)($i + 1), 3, '0', STR_PAD_LEFT) ?></div>
        </article>
      <?php endforeach; ?>
    </div>
  </section>

  <section class="section-wrap section-block tab-panel" id="skills" data-tab-panel="skills">
    <div class="section-heading"><div><span class="section-kicker">03 / EQUIPMENT &amp; CAPABILITIES</span><h2>TECHNICAL <em>ARSENAL</em></h2></div><span class="section-code">LOADOUT / ACTIVE</span></div>
    <div class="skills-layout">
      <?php foreach ($skills as $group => $items): ?>
        <div class="skill-panel"><div class="skill-panel-head"><span><?= e($group) ?></span><b aria-hidden="true">+</b></div><div class="skill-items"><?php foreach ($items as $item): ?><span><?= e($item) ?></span><?php endforeach; ?></div></div>
      <?php endforeach; ?>
    </div>
  </section>

  <section class="section-wrap section-block tab-panel" id="experience" data-tab-panel="experience">
    <div class="section-heading"><div><span class="section-kicker">04 / SERVICE RECORD</span><h2>EXPERIENCE &amp; <em>EDUCATION</em></h2></div><span class="section-code">CHRONOLOGICAL LOG</span></div>
    <div class="timeline">
      <?php foreach ($timeline as $item): ?>
        <article class="timeline-item"><div class="timeline-date"><?= e($item['period']) ?></div><div class="timeline-marker" aria-hidden="true"></div><div class="timeline-content"><span><?= e($item['type']) ?></span><h3><?= e($item['title']) ?></h3><h4><?= e($item['organization']) ?></h4><p><?= e($item['description']) ?></p></div></article>
      <?php endforeach; ?>
    </div>
  </section>

  <section class="contact-section tab-panel" id="contact" data-tab-panel="contact">
    <div class="section-wrap contact-inner">
      <div><span class="section-kicker">05 / OPEN CHANNEL</span><h2>LET'S BUILD<br><em>SOMETHING</em><br>USEFUL.</h2><p><?= e($profile['contact_message']) ?></p></div>
      <div class="contact-panel">
        <span class="contact-label">COMMUNICATION CHANNELS</span>
        <a class="contact-email" href="mailto:<?= e($profile['email']) ?>"><?= e($profile['email'] ?: 'your@email.com') ?> <span>↗</span></a>
        <div class="social-links">
          <?php foreach ($socials as $social): ?><a href="<?= e($social['url']) ?>" target="_blank" rel="noopener noreferrer"><?= e($social['label']) ?> <span>↗</span></a><?php endforeach; ?>
        </div>
        <div class="contact-status"><span class="pulse"></span> CHANNEL OPEN / AWAITING TRANSMISSION</div>
      </div>
    </div>
  </section>
</main>
<footer class="footer section-wrap"><a class="footer-brand" href="#home"><?= e($profile['callsign']) ?> <span>®</span></a><span>PERSONAL ARCHIVE // <?= e($year) ?></span></footer>
<script src="assets/js/main.js" defer></script>
</body>
</html>
