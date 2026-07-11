# Design notes

## Brief

Blend two references without cloning either:

- **Layout** from [brittanychiang.com](https://brittanychiang.com) — a fixed
  sidebar (name, role, scroll-aware section nav, socials) beside a single
  scrolling column of About → Experience → Projects; entries as structured,
  scannable cards with mono metadata and tech tags.
- **Style** from [leerob.com](https://leerob.com) — light, low-color,
  typographically restrained; the opposite of Chiang's dark navy/teal.

Hybrid navigation: Home holds the three sections as anchors; **Film** is a
real route with its own nav link. (An earlier Writing route was removed —
no blog planned.)

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

- **Palette** — pure white ground with a Tailwind-gray text scale
  (`#111827` ink, `#6b7280` faint) and a single blue accent (`#2563eb`),
  used only where it carries meaning: links, active nav indicator, focus
  rings, hover states. Cards are bordered boxes (1px `#e5e7eb`) on white.
  No gradients, no shadows beyond a subtle lift on hover. These values
  were verified against leerob.com's implementation after the initial
  zinc/steel-blue version shipped.
- **Type** — Inter (sans) + Geist Mono, self-hosted via Fontsource.
  Display weight 640 with tight tracking for the name; mono smallcaps for
  all metadata (dates, section overlines, nav, tags). Inter was chosen
  after verifying leerob.com's actual implementation — his `layout.tsx`
  imports Inter from `next/font/google` over `bg-white text-gray-900`
  with a blue interaction accent, so the shipped tokens mirror that
  (white ground, Tailwind-gray scale, blue-600 accent) rather than the
  earlier zinc/steel-blue approximation.
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
