# Tactical PHP Developer Portfolio

A responsive, single-page PHP portfolio starter with a restrained tactical / sci-fi dossier interface inspired by the atmosphere of **Arknights**. It uses original CSS and placeholder graphics rather than Arknights logos, characters, or game assets.

## Requirements

- PHP 8.0+ recommended
- Any local PHP server (XAMPP, Laragon, MAMP, WAMP, or PHP built-in server)

## Run locally

1. Extract this folder into your local server's web root (for XAMPP, usually `htdocs`).
2. Open `data.php` and replace the sample information with yours.
3. Start Apache / PHP.
4. Visit `http://localhost/arknights_php_portfolio/`.

Or, from this directory, run:

```bash
php -S localhost:8000
```

Then open `http://localhost:8000`.

## Where to edit your information

Everything intended for personal editing is in **`data.php`**:

- `$profile`: name, role, short introduction, location, status, email, portrait, CV link
- `$projects`: project title, category, year, description, technology stack, image, demo and source links
- `$skills`: grouped technologies
- `$timeline`: education, work experience, internships, awards or certifications
- `$socials`: GitHub, LinkedIn and other profile links

Add more projects by copying one project array entry. The category filter is generated automatically from the project categories.

## Add your images and resume

Create these optional folders if needed:

- `assets/images/` — profile picture and project screenshots
- `assets/files/` — resume PDF

Then set paths in `data.php`, for example:

```php
'portrait' => 'assets/images/profile.jpg',
'image' => 'assets/images/library-system.png',
'resume_url' => 'assets/files/resume.pdf',
```

Use images you own or have permission to publish. Recommended project screenshot ratio: 16:9.

## Customize the look

Edit `assets/css/style.css`. The main colors are CSS variables at the top:

- `--bg`: page background
- `--panel`: card background
- `--cyan`: main highlight
- `--amber`: secondary highlight

## Notes

- The email action opens the visitor's email app using `mailto:`. It is not a server-side contact form and does not store messages.
- External social and project links should be replaced with your actual URLs.
- The Google Fonts import requires an internet connection; system fallback fonts are included.
- The design is responsive and includes tab-based navigation (one main section visible at a time), animated tab transitions, subtle interface pulse/glow effects, a mobile navigation menu, and project category filters.

## Portfolio content checklist

For each project, try to include:
1. What problem it solves
2. What you personally built / your role
3. The important features or technical decisions
4. The technologies used
5. A live demo and source-code link, when public

A few complete, well-explained projects are more convincing than a large list of project titles.
