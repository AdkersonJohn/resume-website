# Project Hosting Info — Design

**Date:** 2026-07-22
**Status:** Design and card layout approved by owner (labeled hosting row).

## Goal

Add a hosting/deployment line to each of the seven project cards so the
Projects section shows not just what was built but how it ships and runs.
Hosting facts were verified against each project's repository.

## Scope

Single file changed: `src/components/Projects.tsx` (new `hosting` field +
one new styled component + one render line). One new test added to
`src/components/Projects.test.tsx`. Nothing else.

## Changes

### 1. Data shape

`interface Project` gains a required `hosting: string` field. Values
(verbatim, middle dot `·` separators):

| Project | hosting |
|---|---|
| Camp Scout | `AWS EC2 · S3 + CloudFront · Firestore · custom domain` |
| AutoSocials | `Docker Compose on VPS · GitHub Actions zero-downtime CI/CD · S3 media` |
| GainsIQ | `Offline-first, no backend · on-device SQLite · App Store via Expo EAS` |
| Castle Killer | `Native desktop/iOS via Tauri · no server, physics runs locally` |
| GRA Website | `AWS via Terraform · S3 + CloudFront · ECS Fargate + ALB · GitHub Actions` |
| Asset Tag Scanner | `Microsoft Power Platform (M365 cloud) · SharePoint backend` |
| Pong With Friends | `Runs entirely on-watch · local-network multiplayer · TestFlight` |

### 2. Rendering

New styled component `HostingRow` rendered between `ProjectTech` and the
conditional `LiveLink`:

- Layout: `display: flex; align-items: flex-start; gap: 0.5rem;
  margin-top: 1.25rem;`
- Typography/color: `font-size: 0.85rem; color: var(--text-secondary);
  line-height: 1.5;`
- Icon: `FiServer` from the already-imported `react-icons/fi` package
  (added to the existing import list), rendered before the text with
  `flex-shrink: 0; margin-top: 0.15rem;` so multi-line text wraps cleanly
  beside it.
- Uses existing dark-theme CSS variables only; no new colors.

JSX addition (inside the card, after `</ProjectTech>`):

```tsx
<HostingRow>
  <FiServer />
  {project.hosting}
</HostingRow>
```

### 3. Tests

One new test in `Projects.test.tsx`: renders `<Projects />` and asserts each
of the seven hosting strings above is in the document (exact-string
`getByText`). Existing tests unchanged.

## Constraints

- Dark-theme tokens only (`var(--text-secondary)` etc.); no new colors, no
  layout changes to other card elements.
- Hosting strings must match the table verbatim — they are derived from the
  actual repos; do not embellish (e.g., Castle Killer and Pong are NOT
  described as published/live).
- Existing 7 tests pass unchanged; suite becomes 8.

## Testing / verification

1. `CI=true` full test run: 8/8.
2. `npm run build` clean, no new warnings.
3. Optional visual check via chrome-devtools MCP if attached; otherwise skip
   with a note (never Playwright MCP).

## Out of scope

- Repo hygiene follow-ups from earlier reviews (.gitignore, Inter link tags,
  hover-contrast token) — separate branch.
- Changes to tech-tag chips, Experience section, or any other component.
