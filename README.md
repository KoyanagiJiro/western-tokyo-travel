# Western Tokyo Walks

An English-language static publication for independent travel, local history, cultural landscapes and walking in Western Tokyo. This repository is the public-site layer: it turns approved Markdown into a small, readable website.

## Technology

- Astro with strict TypeScript
- Markdown Content Collections using Astro's `glob()` content loader
- Static HTML generation
- Official `@astrojs/sitemap` integration
- Plain CSS and no client-side framework

The production origin is configured once through `SITE_URL`. Until a domain is chosen, the build falls back to `https://example.com`.

## Directory structure

```text
src/
  components/          Shared presentational components
  content/articles/    Publisher-facing Markdown input
  layouts/             Site and article layouts
  lib/                 Article query and URL helpers
  pages/               File-based routes
  styles/              Global CSS
  content.config.ts    Article frontmatter schema
public/                Unprocessed public assets, if needed later
```

## Development

Requires a current Node.js release supported by the installed Astro version.

```sh
npm install
npm run dev
```

Open the local address printed by Astro (normally `http://localhost:4321`).

## Validate, build and preview

```sh
npm run check
npm run build
npm run preview
```

Set the eventual public origin when building or previewing canonical and sitemap output:

```sh
SITE_URL=https://www.your-domain.example npm run build
```

## Add an article

Create a standard Markdown file under `src/content/articles/`. The file name is an internal content identifier; the required `slug` frontmatter field controls the public URL at `/articles/{slug}/`. Keep slugs unique. The content collection validates every entry at check/build time.

```md
---
title: "Article title"
description: "Search and social description."
slug: article-url-slug
publishDate: 2026-09-11
updatedDate: 2026-09-12
contentType: editorial
excerpt: "Short text shown in article lists."
heroImage: /images/example.jpg
heroAlt: "Meaningful description of the image"
draft: false
tags:
  - walking
---

Article body in standard Markdown.
```

### Frontmatter schema

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | yes | Public headline |
| `description` | string | yes | Meta description and article summary |
| `slug` | lowercase hyphenated string | yes | Public article URL segment |
| `publishDate` | date | yes | Parsed and validated as a date |
| `updatedDate` | date | no | Shown only when present |
| `contentType` | enum | yes | `editorial`, `planning`, or `commercial` |
| `excerpt` | string | yes | Article-list introduction |
| `heroImage` | string | no | Prefer a root-relative path in `public/` |
| `heroAlt` | string | when image exists | Required by validation with `heroImage` |
| `draft` | boolean | yes | Controls public inclusion |
| `tags` | string array | no | Display topics |

Entries with `draft: true` are removed by the shared article query before list rendering and static route generation. They therefore produce no article page and are absent from the generated sitemap. Draft preview tooling is not implemented.

## Repository boundary and future Publisher integration

This public repository is deliberately separate from the `affiliate-ai-team` production repository. Researcher, Writer, Designer, Analyst and editorial workflow logs do not belong here. Do not copy internal pipeline artifacts or unapproved drafts into this repository.

A future Publisher stage should transform only a Human Editor-approved Publication Package into schema-valid Markdown in `src/content/articles/`, plus explicitly approved local assets in `public/` if needed. Web-facing metadata and article prose belong here; pipeline state, prompts, research logs and agent outputs do not. The schema is the handoff contract and the build is the acceptance check.

## Current limitations

This foundation does not implement the Publisher stage, deployment, CMS, database, authentication, comments, search, newsletter, analytics, consent, multilingual content, automated translation, image pipeline or any affiliate/API integration. The related-articles region is intentionally an empty, non-linked placeholder. No affiliate CTA is inserted automatically for any content type.
