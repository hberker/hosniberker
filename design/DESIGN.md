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

## v2 — dark, borderless (July 2026)

After living with the shipped light version, the direction changed on
explicit feedback: the bordered white cards read as "clunky boxes," and a
dark ground was what was wanted all along — specifically leerob.com's dark
mode, with brittanychiang.com's invisible-card interaction. v2 keeps the
structure and content order untouched and changes two things:

- **Theme** — leerob.com's dark mode, verified against his `layout.tsx`
  (`Inter` from `next/font/google`, `dark:bg-zinc-950`,
  `dark:text-zinc-200`, body `tracking-tight`): near-black zinc ground
  (`#09090b`) with a zinc text scale (`#e4e4e7` ink, `#a1a1aa` body,
  `#82828c` meta — a tone between zinc-400/500 so small mono text keeps
  AA) and one blue accent (`#60a5fa`), kept scarce leerob-style: hover
  titles, inline-link hovers, focus rings. Tags are neutral zinc chips.
  Body tracking tightened to `-0.025em` to match his texture.
  `color-scheme: dark` so UA chrome (scrollbars, form controls) follows.
- **Entries instead of cards** — the border/background/padding box is
  gone; entries are plain text in the page flow (date column + content).
  On hover, a linked entry reveals a translucent zinc wash that bleeds
  ~1rem past the text edges (Chiang's negative-inset treatment — the page
  highlights, not a box), the title tints to the accent, the ↗ nudges, and
  siblings dim. The whole entry is one click target to the external site,
  via a stretched pseudo-element sized to match the wash exactly. Entries
  without a URL get no wash and no pointer. Gated behind `hover: hover`;
  `:focus-within` shows the wash for keyboard users unconditionally.

Everything else — fonts, metric-adjusted fallbacks, layout grid,
scroll-spy, lightbox — carries over unchanged.

## v3 — write-ups, the light table, and a footer (July 2026)

Three additions, no theme changes:

- **Project write-ups** — projects with real source material (C-Note,
  WisprFree, Guitar Trainer) gained long-form pages under `/projects/…`,
  rendered through a shared `Writeup` layout (breadcrumb, mono meta line,
  tag chips, external-link row, measure-limited prose). On the home list an
  entry with a write-up links internally and its indicator is a `→` that
  nudges sideways, while external-only entries keep the `↗`. The C-Note
  page adapts (with credit and a link) teammate Zach Behrman's write-up and
  photos.
- **Film as a light table** — the masonry grid became cut strips of
  negatives: film-base panels with punched sprocket rows, amber edge
  markings (`HB 135 · ROLL 01`, frame numbers), and thumbnails shown
  inverted with the orange mask of colour negative stock. Hovering a frame
  "develops" it to a positive; clicking puts it on the light table — a
  full-screen tape of frames that slides horizontally across a glowing
  panel, Lightroom-filmstrip style. The viewer auto-advances every 5s with
  a visible pause control (WCAG 2.2.2), skips auto-play entirely under
  `prefers-reduced-motion`, lazy-loads only the current frame ± 1, and
  keeps the keyboard/focus behaviour of the old lightbox.
- **Colophon + analytics** — a shared footer (built-with + source link) on
  every page, and GoatCounter (no-cookie) wired site-wide, pending the
  `hberker` site-code registration.

Verified: axe-core clean on home, film (gallery and open viewer), and
write-up pages; auto-advance/pause/reduced-motion behaviour asserted in
headless Chromium; no horizontal overflow at 390px.

### v3.1 — display face

Space Grotesk (variable, Fontsource) added as `--display` for names and
headings only — the "monospace-esque" texture wanted from the font
explorations, chosen over full-mono options; body stays Inter, metadata
stays Geist Mono. Metric-adjusted Arial fallback (size-adjust 107%,
measured) keeps CLS at zero. OG card regenerated to match.
