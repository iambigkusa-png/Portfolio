<?php
/*
 * EDIT THIS FILE to personalize your portfolio.
 * Keep text inside quotes. For arrays, separate items with commas.
 * Use full URLs for links and image paths relative to this project folder.
 */
$profile = [
    'name' => 'Yvan Herbito',
    'callsign' => 'FALSE SKY',
    'classification' => '',
    'role' => 'Developer',
    'tagline' => 'False Sky',
    'intro' => 'A fun loving individual.',
    'about' => 'I am a skilled Python programmer who codes, plays, and sometimes sleeps. I enjoy building practical digital experiences and creating applications for the good of mankind.',
    'location' => 'Valenzuela, Philippines',
    'focus' => 'Programming and problem solving',
    'availability' => 'OPEN TO WORK',
    'spoken_languages' => '',
    'operator_id' => '',
    'portrait' => '', // Example: assets/images/profile.jpg
    'resume_url' => '', // Example: assets/files/resume.pdf
    'email' => 'iamyvanherbito@gmail.com',
    'contact_message' => 'Have a project, opportunity, or interesting problem in mind? Send me a message.',
];

$projects = [
    [
        'title' => 'Furrpect Choice',
        'short_label' => '',
        'category' => 'Web',
        'year' => '',
        'description' => '',
        'stack' => [],
        'image' => '', // Example: assets/images/project-one.jpg
        'demo' => '',
        'source' => '',
    ],
    [
        'title' => 'Library Management System',
        'short_label' => '',
        'category' => 'Software',
        'year' => '',
        'description' => '',
        'stack' => [],
        'image' => '',
        'demo' => '',
        'source' => '',
    ],
    [
        'title' => 'Volunteer Website',
        'short_label' => '',
        'category' => 'Other',
        'year' => '',
        'description' => '',
        'stack' => [],
        'image' => '',
        'demo' => '',
        'source' => '',
    ],
];

$skills = [
    'LANGUAGES' => ['Python', 'Java', 'HTML', 'CSS', 'PHP', 'GDScript', 'C++'],
    'SOFT SKILLS' => ['Music', 'Web Design'],
    'TOOLS & WORKFLOW' => ['Git', 'GitHub', 'VS Code'],
];

$timeline = [
    [
        'period' => 'YEAR 3',
        'type' => 'EDUCATION',
        'title' => 'Bachelor',
        'organization' => 'PLV',
        'description' => 'Relevant coursework: Programming.',
    ],
];

$socials = [
    ['label' => 'GITHUB', 'url' => ''],
    ['label' => 'LINKEDIN', 'url' => ''],
    ['label' => 'FACEBOOK', 'url' => ''],
];

// Automatically create filter buttons from project categories.
$projectCategories = array_values(array_unique(array_map(
    static fn(array $project): string => $project['category'],
    $projects
))); 
