# Dark Minimal Restyle — Design

**Date:** 2026-07-22
**Status:** Approach approved by owner (Approach B: CSS custom properties;
dark Apple-style palette; system font stack).

## Goal

Restyle the entire site from the purple-gradient/glassmorphism theme to a
black-and-white minimal aesthetic modeled on Apple's dark product pages
(Mac Pro / AirPods Max): black backgrounds, white text, gray secondary text,
hairline borders, pill buttons, translucent blurred nav, no decorative color.

## Approach

Define the palette once as CSS custom properties in
`src/styles/GlobalStyles.ts`; every styled component references the variables.
No ThemeProvider, no new dependencies, no layout/structure changes — colors,
typography, borders, radii, and shadows only. All content and all
framer-motion animations stay as they are.

## Design tokens (defined on `:root` in GlobalStyles)

| Variable | Value | Use |
|---|---|---|
| `--bg` | `#000000` | Page and primary section background |
| `--surface` | `#1d1d1f` | Cards |
| `--surface-alt` | `#161617` | Alternate section background, icon chips |
| `--chip` | `#2d2d2f` | Tech-tag chips |
| `--text` | `#f5f5f7` | Primary text, headings |
| `--text-secondary` | `#86868b` | Secondary/meta text, descriptions |
| `--hairline` | `rgba(255, 255, 255, 0.12)` | Card borders, dividers |
| `--nav-bg` | `rgba(22, 22, 23, 0.8)` | Header background (with backdrop blur) |

Typography: font stack `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
Helvetica, Arial, sans-serif` (replaces Inter). Headings get
`letter-spacing: -0.015em`. Weights stay as-is.

Buttons: white pill — background `#f5f5f7`, text `#000`,
`border-radius: 980px` (Apple's pill radius), hover background `#d5d5d9`.
No gradients anywhere.

Cards: background `var(--surface)`, `1px solid var(--hairline)` border,
`border-radius: 18px`, no box-shadow (hover: background lightens to `#252527`
instead of lift/shadow — subtle, Apple-like).

## Per-component treatment

- **GlobalStyles.ts** — add `:root` variables; body background `var(--bg)`,
  color `var(--text)`; new font stack; heading letter-spacing; selection
  color white-on-gray.
- **App.tsx** — `AppContainer` purple gradient background → `var(--bg)`;
  font-family inherits from GlobalStyles (remove Inter reference).
- **Header.tsx** — glassmorphism nav → fixed bar with
  `background: var(--nav-bg)` and
  `backdrop-filter: saturate(180%) blur(20px)`; links `var(--text-secondary)`
  → `var(--text)` on hover; hamburger/menu colors follow the same tokens.
- **Hero.tsx** — sits on `var(--bg)`; greeting/subtitle
  `var(--text-secondary)`; name/headline `var(--text)` (larger, tighter,
  per typography above); buttons become the white pill; social icon links
  `var(--text-secondary)` → `var(--text)` on hover.
- **Experience.tsx** — section background `var(--bg)`; cards per card spec;
  `JobTitle` `var(--text)`; `Company` `var(--text-secondary)` (loses purple);
  meta items `var(--text-secondary)`; bullet markers `var(--text-secondary)`.
- **Skills.tsx** — section background `var(--surface-alt)`; any gradient
  chips/bars → `var(--chip)` chips with `var(--text)` text; headings
  `var(--text)`.
- **Projects.tsx** — section background `var(--bg)` (was `#f8fafc`); cards per
  card spec; `ProjectIcon` gradient chip → `var(--surface-alt)` chip with
  `var(--text)` icon and `1px solid var(--hairline)`; `TechTag` gradient →
  `var(--chip)` background, `var(--text)` text; `LiveLink` purple →
  `var(--text-secondary)`, hover `var(--text)`.
- **Education.tsx** — section background `var(--surface-alt)`; card per card
  spec; `University` purple → `var(--text-secondary)`.
- **Contact.tsx** — section background `var(--bg)`; contact links
  `var(--text)`, hover `var(--text-secondary)`; icon chips like ProjectIcon;
  any gradient buttons → white pill.

Sections alternate `var(--bg)` and `var(--surface-alt)` in page order:
Hero (bg) → Experience (bg — separated from hero by content, keep bg) →
Skills (surface-alt) → Projects (bg) → Education (surface-alt) →
Contact (bg). Exact current backgrounds per component are replaced 1:1;
the alternation above is the target.

## Constraints

- Content strings, component structure, JSX hierarchy, and all
  framer-motion animation props are unchanged. The existing 7 tests
  (Experience 4, Projects 3) must pass unmodified — they assert content,
  not styling.
- No new npm dependencies.
- Contrast: primary text `#f5f5f7` on `#000` and on `#1d1d1f` far exceeds
  WCAG AA; `#86868b` secondary is reserved for meta/secondary text (matches
  Apple's own usage).
- The hover-lift `transform: translateY(-4px)` on cards may stay or go —
  decision: **remove** it along with shadows (Apple cards don't lift);
  replace with the background-lighten hover.

## Testing / verification

1. Existing suite passes unmodified: 7/7.
2. `npm run build` compiles clean, no new warnings.
3. Visual check in the attached Chrome (chrome-devtools MCP) if available in
   the executing session; otherwise skip with a note — never fall back to
   Playwright MCP.

## Out of scope

- Repo hygiene (`.gitignore`, untracking `build/`/`node_modules/`) — separate
  follow-up branch.
- Layout, spacing, or copy changes beyond the color/typography swap.
- Light/dark mode toggle (site is dark-only by owner decision).
