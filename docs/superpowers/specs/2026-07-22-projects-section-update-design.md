# Projects Section Update — Design

**Date:** 2026-07-22
**Status:** Approved approach: content swap + live links

## Goal

Replace the three outdated help-desk-era projects on the resume site's Projects
section with seven recent projects, and add an optional "View Live" link to
project cards for products with public URLs.

## Scope

Single file changed: `src/components/Projects.tsx`. No other components,
styles, or layout changes. The existing responsive `auto-fit` grid accommodates
seven cards without modification.

## Changes

### 1. Data shape

Extend each entry in the `projects` array with an optional `liveUrl?: string`
field. Existing fields (`title`, `technology`, `icon`, `description`,
`techStack`) are unchanged.

### 2. Card rendering

When `liveUrl` is present, render a "View Live →" anchor at the bottom of the
card:

- Styled to match the site's purple gradient theme (`#667eea` → `#764ba2`).
- `target="_blank"` and `rel="noopener noreferrer"`.
- Rendered only when `liveUrl` exists — cards without it are unchanged.

### 3. Content — the seven projects (in order)

| # | Title | Tag | liveUrl | Icon (react-icons/fi) |
|---|-------|-----|---------|------------------------|
| 1 | Camp Scout | Full-Stack SaaS | https://campscout.tech | FiMapPin |
| 2 | AutoSocials | Full-Stack SaaS | https://autosocials.work | FiShare2 |
| 3 | GainsIQ | iOS App | — | FiActivity |
| 4 | Castle Killer | 3D Game | — | FiTarget |
| 5 | GRA Website | E-Commerce | — | FiShoppingBag |
| 6 | Asset Tag Scanner | Enterprise IT | — | FiCamera |
| 7 | Pong With Friends | watchOS Game | — | FiWatch |

Descriptions and tech tags (verified against each repo):

1. **Camp Scout** — Full-stack campsite monitoring and auto-booking platform
   for Recreation.gov. Watches for availability, alerts users via
   email/SMS/push, and completes bookings automatically with browser
   automation. Includes Stripe subscription billing and iOS/Android apps via
   Capacitor.
   Tech: React, Node.js, Firebase, Playwright, Stripe, AWS, Twilio

2. **AutoSocials** — Social media automation SaaS that publishes video and
   photo content to Instagram, X, Facebook, Threads, and YouTube from a single
   submission — with scheduling, a unified comments/DM inbox, analytics, and
   zero-downtime Docker CI/CD with automatic rollback.
   Tech: React, TypeScript, Node.js, Firestore, Redis, FFmpeg, Docker

3. **GainsIQ** — Offline-first iOS workout tracker with a research-backed
   progression coaching engine — estimated-1RM tracking, plateau detection,
   deload timing, and in-workout weight/rep suggestions. Local SQLite
   database, no accounts required.
   Tech: React Native, Expo, TypeScript, SQLite, Drizzle ORM

4. **Castle Killer** — 3D castle-destruction artillery game with a custom
   multi-core Rust physics engine (Rapier3D) — support-graph collapse
   cascades, ragdoll soldiers, and destructible brick-by-brick castles. Ships
   as a native desktop/iOS app via Tauri with a hand-built AdMob plugin.
   Tech: Rust, Three.js, Rapier3D, Tauri, WebAssembly, Swift

5. **GRA Website** — E-commerce and brand platform for the GRA apparel line:
   Shopify Storefront checkout, a real-time GraphQL admin CMS with role-based
   access and live updates over WebSockets, and custom WebGL shader visuals.
   Deployed to AWS with Terraform and GitHub Actions.
   Tech: React, TypeScript, GraphQL, Shopify, Firebase, AWS, Terraform

6. **Asset Tag Scanner** — Power Apps barcode-scanning app used during
   hardware refresh cycles — scans device asset tags and cross-references
   SharePoint to instantly flag which machines need cut sheets, including
   nonstandard-device and missing-inventory detection.
   Tech: Power Apps, SharePoint, Power Fx, Microsoft 365

7. **Pong With Friends** — Native Apple Watch Pong with Digital Crown paddle
   control and real-time watch-to-watch multiplayer — host-authoritative
   netcode over Apple's Network framework, 60fps SwiftUI Canvas rendering, and
   haptic feedback.
   Tech: Swift, SwiftUI, watchOS, Network framework

### Accuracy constraints

- Do not claim App Store publication for GainsIQ, Castle Killer, or Pong With
  Friends — all are pre-release.
- Only Camp Scout and AutoSocials get `liveUrl` (verified live production
  domains). The GRA site is deployed to a default CloudFront hostname without
  a branded domain, so it gets no link.

## Error handling

Not applicable — static content component with no runtime inputs.

## Testing / verification

1. `npm run build` completes without errors or new warnings.
2. Visual check of the Projects section in the browser (dev server): seven
   cards render, icons correct, live links open the right sites in a new tab,
   grid remains responsive at mobile width.

## Out of scope

- Hero/Experience/Skills copy updates (the hero still leads with IT support —
  possible follow-up, not part of this change).
- Status badges, featured cards, GitHub links per card.
- Any styling or layout redesign.
