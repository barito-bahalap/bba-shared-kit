# @barito-bahalap/styles

## Supersedes the earlier `packages-config` output

An earlier turn produced `tokens.css` + `globals-corporate/tech/media/dashboard.css`
under `packages-config/`. This package replaces that entirely with a fuller
system (reset, typography, layout, cards, motion, divider) plus the same
brand-override pattern, now under `brands/`. Use this one; don't keep both,
or you'll have two competing sources of truth for `--clr-primary`.

Keep `packages/config` (if you still want it) for build tooling only —
eslint config, tsconfig base, Tailwind preset if you use one. This package
is pure CSS custom properties and has no Tailwind dependency, so it works
whether or not the app also uses Tailwind.

## Architecture

Two-layer tokens, same discipline as your e-palugada reference:

- `--palette-*` — raw values. Never reference these in component CSS.
- `--clr-*` — semantic aliases. Components only ever use these.

`tokens.css` sets BBA's base weighting (teal primary, orange accent).
Each app then imports exactly one file from `brands/` which overrides
`--clr-primary` / `--clr-accent` / `--clr-surface` / `--clr-primary-ink`
to reweight the same four brand colors differently:

| Brand file             | App                  | Primary | Accent                                      |
| ---------------------- | -------------------- | ------- | ------------------------------------------- |
| `brands/corporate.css` | bba-corporate (BBA) | Teal    | Orange (CTA only)                           |
| `brands/tech.css`      | bba-tech (BBT)      | Teal    | Neutral gray (orange reserved for warnings) |
| `brands/media.css`     | bba-media (BBM)     | Orange  | Teal                                        |
| `brands/dashboard.css` | bba-dashboard       | Teal    | Neutral gray                                |

Components in `@barito-bahalap/ui` should reference only `--clr-*` tokens, never
`--palette-*` directly — that's what makes one component library look
right across four differently-weighted brands.

## Usage

```css
/* app/globals.css in each app */
@import "@barito-bahalap/styles";
@import "@barito-bahalap/styles/brands/corporate"; /* swap per app */
```

Order matters: the brand import must come after the base import, since
it overrides variables the base file sets.

## What changed vs. your e-palugada reference

- Shadows: soft/blurred (`--shadow-sm/md/lg`) instead of hard-offset
  "brutal" shadows.
- Radius: generous by default (10-20px) instead of sharp-except-pills.
- Borders: 1px hairline instead of 1.5-2px "ink" borders.
- Motion: slightly calmer durations (220ms base vs 180ms), same
  no-bounce rule and same `prefers-reduced-motion` handling.
- Fonts: PT Serif (headings) / Google Sans (body, control) / Google
  Sans Code (mono), per your spec.
- Cut: `.red`/`.green` dev helpers, project-specific comment
  references, and the `--fw-extrabold`/`--fw-black` weight tokens
  (PT Serif only reliably supports 400/700 — anything heavier gets
  faked by the browser rather than rendered as a real weight).
- Added: `.card.bordered` variant (shadow-free, for document/spec-style
  content where a shadow reads too "consumer app" for a BUMN/gov
  audience), and `--clr-primary-ink` / `--clr-accent-ink` tokens so
  text-on-color always resolves to a WCAG AA-safe value per brand,
  since BBM's orange-as-primary needs dark text where teal-as-primary
  needs white text.

## Open items

- Confirm the exact Google Sans / Google Sans Code weight axis at
  fonts.google.com before shipping — both fonts opened up recently
  (Aug/Dec 2025) and the import URL here is a best-effort weight list.
- "control" typography defaults to `text-transform: capitalize`
  globally per your spec (not just in the dashboard). Change
  `--txt-control-transform` in `tokens.css` to `uppercase` if you
  meant ALL CAPS.
- Logo / logotype still not defined for BBA, BBT, or BBM.
