---
title: 'Building this site'
description: 'A short colophon: the stack, the design constraints, and the decisions behind this portfolio.'
date: 2026-07-11
---

This site is intentionally boring in the ways that matter and particular in the ways that don't.

## The stack

It's a static [Astro](https://astro.build) site deployed to GitHub Pages through GitHub Actions. There's no client-side framework — the only JavaScript that ships is a scroll-spy for the homepage navigation and a lightbox for the [film](../../film/) page. Everything else is HTML and CSS.

Fonts are self-hosted (Geist and Geist Mono via Fontsource), images are optimized at build time, and the whole thing builds in a few seconds.

## The design

The layout borrows its information architecture from [Brittany Chiang's site](https://brittanychiang.com) — a fixed sidebar with scroll-aware navigation, and experience/project entries as structured, scannable cards. The visual language runs the other direction: instead of dark navy and teal, it takes cues from [Lee Robinson's](https://leerob.com) restraint — a light neutral ground, one desaturated accent, and type doing most of the work.

A few deliberate choices:

- **One accent color.** A desaturated steel blue, used only where it carries meaning: links, the active section indicator, focus rings.
- **Cards, not prose.** Experience and projects are boxed and bordered so a recruiter can scan the page in thirty seconds.
- **One signature interaction.** Hovering the card lists gently dims the neighbors — a light-mode translation of Chiang's spotlight effect. Everything else stays still.

## Updating it

Content lives in typed data files (`src/data/`) and a markdown collection (`src/content/writing/`). Photos drop into `src/photos/` and the gallery picks them up at build time. If future-me wants to change anything, it's one file away.
