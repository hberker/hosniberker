# hberker.github.io — personal portfolio

Portfolio site for **Hosni Berker** — built with [Astro](https://astro.build),
deployed to GitHub Pages. Dark, fast, no client-side framework: the only
JavaScript shipped is a scroll-spy on the homepage and the film-page lightbox.

**Live URL:** `https://hberker.github.io/hosniberker/`
(or `https://hberker.github.io/` if the repo is renamed — see
[Hosting modes](#hosting-modes)).

## Structure

| Page       | Route       | Source                                        |
| ---------- | ----------- | --------------------------------------------- |
| Home       | `/`         | `src/pages/index.astro` — About → Experience → Projects as one scrolling page |
| Film       | `/film/`    | `src/pages/film.astro` — auto-built from images in `src/photos/` |

## Updating content

- **Intro / contact** — `src/data/site.ts`
- **Experience & education** — `src/data/experience.ts` (date, role, 2–3 sentence description, tags)
- **Projects** — `src/data/projects.ts`
- **Photos** — drop image files into `src/photos/` (see
  [`src/photos/README.md`](src/photos/README.md)). The current images are
  generated placeholders; delete them when real photos land.
- **Social-share image** — `npm run og` regenerates `public/og.png`
  (requires Chromium; used by link previews).

## Development

```sh
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # serve the production build
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the
site with [withastro/action](https://github.com/withastro/action) and
publishes it with `actions/deploy-pages`.

**One-time setup:** in the repo settings → *Pages*, set **Source** to
**GitHub Actions** (first workflow run may prompt this automatically).

### Hosting modes

`astro.config.mjs` derives the site URL and base path from
`GITHUB_REPOSITORY`, so both GitHub Pages modes work with **zero code
changes**:

| Repo name           | Published at                            |
| ------------------- | --------------------------------------- |
| `hosniberker`       | `https://hberker.github.io/hosniberker/` |
| `hberker.github.io` | `https://hberker.github.io/`             |

To claim the clean root domain later, rename the repository to
`hberker.github.io` and re-run the deploy workflow. **Note:** a repo named
`hberker.github.io` already exists on this account (an older personal
site) — it must be renamed or deleted first.

## Design

The design brief, the explored-and-rejected directions, and the rationale
for the final one live in [`design/DESIGN.md`](design/DESIGN.md), with
self-contained HTML mockups in `design/explorations/` (open them in a
browser after `npm install` — they reference fonts from `node_modules`).

Quality floor verified before shipping: Lighthouse 100/100/100/100
(performance / accessibility / best practices / SEO) on home and film
pages, zero axe-core violations on every page, responsive to 390px,
keyboard-operable lightbox, metric-adjusted font fallbacks (CLS = 0).
