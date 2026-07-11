# Film gallery photos

Every image in this folder automatically appears on the `/film` page — no code
changes needed. Drop in `.jpg`, `.jpeg`, `.png`, `.webp`, or `.avif` files and
rebuild.

## How it works

- Photos are sorted by **filename**, so prefix with numbers to control order:
  `01-hudson-dusk.jpg`, `02-red-hook.jpg`, …
- The filename (minus the number prefix and extension) becomes the photo's
  caption and alt text: `03-brooklyn-bridge-fog.jpg` → “brooklyn bridge fog”.
- Astro generates optimized WebP thumbnails and lightbox sizes at build time,
  so drop in full-resolution files (they won't be shipped at full weight).

## Replacing the placeholders

The `placeholder-*.jpg` files are generated color studies
(`scripts/generate-placeholder-photos.mjs`). Delete them once real photos are
in — nothing references them by name.
