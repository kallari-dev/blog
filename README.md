# kallari.dev

Recall, a blog and portfolio by Kallari, built with Jekyll and served by GitHub Pages at https://kallari.dev.

## Structure

| Path | What it holds |
|---|---|
| `_posts/` | Blog posts |
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

## Writing a post

Create `_posts/YYYY-MM-DD-slug.md`. The date must not be in the future, or the post won't publish.

```yaml
---
title: Post title
description: One or two sentences for cards and search results.
category: writeup   # writeup | guide | extra
tags: [web, python]
toc: true           # optional: table of contents from the h2 headings
---
```

Callouts are blockquotes with a class on the line below:

```markdown
> Something worth flagging.
{: .callout .note}
```

Use `.note`, `.warning` or `.critical`.

## Adding a project

Create `_projects/slug.md`:

```yaml
---
title: Project title
description: One line for the card.
order: 5                  # sort position
type: engagement          # engagement | coding | research
status: closed            # closed | active
target_label: Web application   # optional, shown on the card cover
method: Grey box          # optional (engagements)
stack: Python · YAML      # optional (coding)
duration: 2 weeks         # optional
repo: https://github.com/kallari-dev/example   # optional
featured: true            # show on the home and portfolio pages (first three by order)
sample: false             # true shows a "Sample entry" badge
findings:                 # optional, rendered with severity labels
  - severity: high        # critical | high | medium | low | info
    title: Short description of the finding
outcome: >-
  What changed as a result.
---
```

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
