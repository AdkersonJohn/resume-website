# Warehouse Automation Pivot — Design

**Date:** 2026-08-04
**Status:** Approved

## Goal

Reposition the resume site toward warehouse-automation / AutoStore jobs by putting the
Kardex and KPI experience at the forefront. Content-only changes; no layout or
structural changes. Everything stays factual: WMS/Manhattan WMi integration and
AutoStore installs are confirmed by John for both Kardex and KPI roles.

## Changes

### Hero.tsx
- Title: `Software Developer & IT Support Specialist` → `Software Engineer — Warehouse Automation & AutoStore`
- Description: rewritten to lead with 2.5 years of AutoStore ASRS software at Kardex
  Remstar and KPI Solutions, WMS integration incl. Manhattan WMi, on-site installs and
  go-lives; full-stack Java/Spring Boot, C#/.NET, React, Angular.

### Experience.tsx (order stays reverse-chronological)
- Kardex: description reframed around develop/integrate/deploy for AutoStore incl.
  on-site installs. New first bullet: WMS/Manhattan WMi integration. Deployment bullet
  reframed as installs/go-lives. React/.NET and sim-grid bullets kept.
- KPI: same treatment (WMS/WMI bullet first, deployment bullet reframed,
  Angular/Spring Boot and sim-grid bullets kept).
- Encore: unchanged.

### Skills.tsx
- New FIRST category card "Warehouse Automation": AutoStore ASRS 4, WMS/WMI
  Integration 4, Production Installs & Go-Lives 4, Hardware Simulation Testing 4.
  Grid auto-fits to 5 cards. Everything else unchanged.

## Out of scope
Projects section, page meta tags, the CCHMC-targeted PDF resume (a second
warehouse-automation PDF can be generated from the updated site on request).
