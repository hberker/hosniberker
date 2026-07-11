# Design notes

## Brief

Blend two references without cloning either:

- **Layout** from [brittanychiang.com](https://brittanychiang.com) — a fixed
  sidebar (name, role, scroll-aware section nav, socials) beside a single
  scrolling column of About → Experience → Projects; entries as structured,
  scannable cards with mono metadata and tech tags.
- **Style** from [leerob.com](https://leerob.com) — light, low-color,
  typographically restrained; the opposite of Chiang's dark navy/teal.

Hybrid navigation: Home holds the three sections as anchors; **Writing** and
**Film** are real routes with their own nav links.

Explicitly avoided (the "generic AI portfolio" defaults): warm cream +
high-contrast serif + terracotta accent; near-black + single neon accent;
broadsheet hairline columns.

## Explorations

Four self-contained mockups live in `explorations/` — open them in a browser
after `npm install` (they load fonts from `node_modules`):

| File | Direction | Verdict |
| --- | --- | --- |
| `a-ledger.html` | Pure monochrome ink on white, Geist + Geist Mono, inversion hovers | Crispest type of the three, but fully colorless — active nav, links, and route affordances lose hierarchy; reads sterile for a recruiter-facing page. |
| `b-steel.html` | Zinc neutrals (`#fafafa` ground, white cards) + one desaturated steel-blue accent, Inter + JetBrains Mono, group-dimming hover | Strongest system: the accent does quiet, meaningful work and the dimming is a genuine light-mode translation of Chiang's spotlight. Weakness: Inter is anonymous. |
| `c-fern.html` | Warm paper + moss green, Instrument Sans + IBM Plex Mono | Pleasant and personal, but drifts toward the banned warm-cream default, and Instrument Sans is less crisp at small sizes. |
| `d-steel-geist-CHOSEN.html` | **B's palette + signature with A's typography** | The shipped direction. |

## The shipped system

- **Palette** — zinc neutrals with a single desaturated steel-blue accent
  (`#2e5678`), used only where it carries meaning: links, active nav
  indicator, tag pills, focus rings. Cards are white on `#fafafa` with 1px
  `#e4e4e7` borders. No gradients, no shadows beyond a 1px-blur lift on
  hover.
- **Type** — Geist (sans) + Geist Mono, self-hosted via Fontsource. One
  family voice: display weight 640 with tight tracking for the name; mono
  smallcaps for all metadata (dates, section overlines, nav, tags).
  Fittingly, Geist is the typeface of leerob's world (Vercel).
- **Signature interaction** (one, executed well): hovering an
  Experience/Projects list gently dims sibling cards while the hovered card
  gains the accent border and an ↗ nudge — Chiang's spotlight, translated to
  a light theme. Gated behind `hover: hover` and
  `prefers-reduced-motion: no-preference`.
- **Floor** — semantic landmarks and heading order, skip link, visible
  focus rings, keyboard-operable `<dialog>` lightbox with focus return,
  metric-adjusted font fallbacks (CLS = 0), lazy images with explicit
  dimensions, `prefers-reduced-motion` respected globally.

Verified: Lighthouse 100/100/100/100 (home and film), axe-core clean on all
four pages, responsive from 390px up.
