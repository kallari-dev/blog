# kallari.dev

Recall, a blog and portfolio by Kallari, built with Jekyll and served by GitHub Pages at https://kallari.dev.

## Structure

| Path | What it holds |
|---|---|
| `_articles/` | Blog posts |
| `_projects/` | Project overviews (engagements, coding, research) |
| `_data/profile.yml` | Portfolio readout and skill tree |
| `_data/categories.yml` | Blog categories |
| `_data/project_types.yml` | Project types |
| `_data/art.yml` | Optional image slots |
| `_layouts/`, `_includes/` | Templates |
| `_includes/ascii/` | Generated ASCII art (rings, avatar) |
| `_includes/css/` | Style partials, combined into `assets/css/main.css` |
| `assets/fonts/` | Self-hosted fonts |
| `assets/js/` | Blog and projects filter, code block bar |

## Writing posts and projects

Posts and projects share the same properties, all editable from Obsidian's Properties panel:

```yaml
---
title: Post title
description: One or two sentences for cards and search results.
date: 2026-10-03
category: writeup     # posts: writeup | guide | extra · projects: engagement | coding | research
tags: [web, python]
---
```

Optional, only shown when present:

```yaml
toc: false            # hide the table of contents (on by default, built from ## headings)
status: closed        # projects: closed | active
method: Grey box      # projects: shown in the header and on the card
stack: Python · YAML
duration: 2 weeks
repo: https://github.com/kallari-dev/example
cover: example.webp   # featured image from assets/images/ (see below)
featured: true        # projects: show on the home and portfolio pages (newest three)
sample: true          # shows a "Sample entry" badge
```

Everything else is plain Markdown in the body: use any headings and sections you like (findings, outcome, scope...).

- Posts live in `_articles/slug.md` and are published at `/blog/slug/`, sorted newest first by `date`.
- Projects live in `_projects/slug.md`, sorted newest first by `date`.
- Images live in `assets/images/` (subfolders are fine). Reference them by file name and the site finds them, both Obsidian-style and Markdown-style:

  ```markdown
  ![[shot.png]]              plain
  ![[shot.png|400]]          400px wide (400x300 sets both sides)
  ![[shot.png|What it shows]]  alt text
  ![What it shows](Assets/shot.png)   any relative path works, only the name is used
  ```

  Put an embed with `|` on its own line, otherwise the Markdown converter reads the `|` as a table. Embeds of other notes (`![[note]]`) show the note's name as plain text.
- Featured image: set `cover` to an image name, plain (`cover: crackme.webp`) or as a link (`cover: "[[crackme.webp]]"`). On posts it shows between the header and the text, on projects it replaces the ASCII rings on the page and the card. Covers render in greyscale with a dot screen to match the site; landscape works best (cards crop to 5:2). Only images from this site load (the CSP blocks external URLs).
- Callouts use Obsidian syntax. Note-like types render as notes, `warning`/`caution`/`important` as warnings, `danger`/`bug`/`error` as critical:

  ```markdown
  > [!warning] Optional title
  > Something worth flagging.
  ```

- Don't repeat the title as a `# heading`: the page shows it from the property. Links to other notes (`[[note]]`) aren't converted, so link to published pages with normal Markdown links.

Never name clients, employers, people or systems.

The current posts and projects are **test content**. Replace or delete them before launch. Skill levels in `_data/profile.yml` are placeholders while `sample_levels: true`.

## Fonts

- Departure Mono by Helena Zhang, SIL Open Font License 1.1.
- Hacked by David Libeau, CC BY 4.0.

## Local preview

Needs a Ruby version GitHub Pages supports (3.x).

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.
