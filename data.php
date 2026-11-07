<?php
/*
 * EDIT THIS FILE to personalize your portfolio.
 * Keep text inside quotes. For arrays, separate items with commas.
 * Use full URLs for links and image paths relative to this project folder.
 */
$profile = [
    'name' => 'Your Name',
    'callsign' => 'YOUR CALLSIGN',
    'classification' => 'PUBLIC',
    'role' => 'Web Developer / Programmer',
    'tagline' => 'I design and build practical digital experiences, one project at a time.',
    'intro' => 'I am a developer who enjoys turning ideas and problems into useful digital products.',
    'about' => 'Write a little about yourself here. Mention what you are studying or working on, what kind of development you enjoy, and what you are currently aiming to learn or achieve.',
    'location' => 'Your City, Country',
    'focus' => 'Web Development',
    'availability' => 'OPEN TO WORK',
    'spoken_languages' => 'English, Filipino',
    'operator_id' => 'OP-001',
    'portrait' => '', // Example: assets/images/profile.jpg
    'resume_url' => '', // Example: assets/files/resume.pdf
    'email' => 'you@example.com',
    'contact_message' => 'Have a project, opportunity, or interesting problem in mind? Send me a message.',
];

$projects = [
    [
        'title' => 'Project One',
        'short_label' => 'WEB APPLICATION',
        'category' => 'Web',
        'year' => '2026',
        'description' => 'Describe the problem this project solves, what you built, and the result. Keep it clear and specific.',
        'stack' => ['PHP', 'MySQL', 'JavaScript'],
        'image' => '', // Example: assets/images/project-one.jpg
        'demo' => '',
        'source' => '',
    ],
    [
        'title' => 'Project Two',
        'short_label' => 'SYSTEM TOOL',
        'category' => 'Software',
        'year' => '2025',
        'description' => 'Explain your role, the main features, and one interesting technical decision you made.',
        'stack' => ['Python', 'SQLite', 'HTML/CSS'],
        'image' => '',
        'demo' => '',
        'source' => '',
    ],
    [
        'title' => 'Project Three',
        'short_label' => 'CREATIVE BUILD',
        'category' => 'Other',
        'year' => '2025',
        'description' => 'Add another project, contribution, experiment, or school project worth showcasing.',
        'stack' => ['JavaScript', 'CSS'],
        'image' => '',
        'demo' => '',
        'source' => '',
    ],
];

$skills = [
    'LANGUAGES' => ['PHP', 'JavaScript', 'Python', 'Java', 'HTML5', 'CSS3'],
    'FRAMEWORKS & LIBRARIES' => ['Laravel', 'Bootstrap', 'React', 'jQuery'],
    'DATABASES' => ['MySQL', 'PostgreSQL', 'SQLite'],
    'TOOLS & WORKFLOW' => ['Git', 'GitHub', 'VS Code', 'Figma', 'Linux'],
];

$timeline = [
    [
        'period' => '2024 — PRESENT',
        'type' => 'EDUCATION',
        'title' => 'Your Degree / Program',
        'organization' => 'Your School or University',
        'description' => 'Add relevant coursework, achievements, activities, or what you are currently learning.',
    ],
    [
        'period' => '2025 — 2026',
        'type' => 'EXPERIENCE',
        'title' => 'Your Role / Internship',
        'organization' => 'Company or Organization',
        'description' => 'Describe your responsibilities, contributions, and measurable outcomes. Delete this entry if not applicable.',
    ],
];

$socials = [
    ['label' => 'GITHUB', 'url' => 'https://github.com/yourusername'],
    ['label' => 'LINKEDIN', 'url' => 'https://linkedin.com/in/yourusername'],
    ['label' => 'FACEBOOK', 'url' => 'https://facebook.com/yourusername'],
];

// Automatically create filter buttons from project categories.
$projectCategories = array_values(array_unique(array_map(
    static fn(array $project): string => $project['category'],
    $projects
)));
