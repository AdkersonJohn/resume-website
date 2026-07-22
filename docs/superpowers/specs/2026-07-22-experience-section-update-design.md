# Experience Section Update — Design

**Date:** 2026-07-22
**Status:** Content approved by owner; dates verified against The Work Number
Employment Data Report pulled 2026-07-22.

## Goal

Replace the Experience section's two outdated entries (Pet Wants, University
of Cincinnati with wrong dates) with the owner's four verified roles, matching
what employment-verification services report.

## Scope

Single file changed: `src/components/Experience.tsx` — content swap of the
`experiences` array only. No styled-components, layout, or other component
changes. A new test file `src/components/Experience.test.tsx` locks in the
content.

## Verified constraints (from The Work Number report)

- Dates below are authoritative; do not alter them.
- Pet Wants must not appear anywhere.
- No overlap or invented coverage of the Jul 2024 – Sep 2025 gap.

## Content — four entries, most recent first

Entry shape is unchanged: `title`, `company`, `location`, `period`,
`description`, `responsibilities[]`. All cards render a "Full-time" badge
(hardcoded in JSX, unchanged).

### 1. Encore Technologies

- title: `IT Analyst`
- company: `Encore Technologies`
- location: `Cincinnati, OH`
- period: `Sep 2025 - Present`
- description: `Provide IT support for Cincinnati Children's Hospital while developing applications for the IT department.`
- responsibilities:
  - `Develop internal applications for the IT department, including a Power Apps barcode-scanning tool that cross-references SharePoint to streamline hardware refresh cycles`
  - `Provide day-to-day IT support for Cincinnati Children's Hospital staff and systems`

### 2. Kardex Remstar

- title: `Software Engineer 2`
- company: `Kardex Remstar`
- location: `Cincinnati, OH`
- period: `Jul 2023 - Jul 2024`
- description: `Developed and tested features for AutoStore automated storage and retrieval systems on an Agile team.`
- responsibilities:
  - `Built features across a React frontend and C#/.NET backend with SQL Server persistence`
  - `Validated changes daily against an in-house miniature AutoStore hardware simulation grid`
  - `Ran weekend production deployments at customer sites, monitoring logs to ensure smooth rollouts`

### 3. KPI Solutions

- title: `Software Engineer 3`
- company: `KPI Solutions`
- location: `Cincinnati, OH`
- period: `Jan 2022 - Jun 2023`
- description: `Built features for AutoStore warehouse automation systems on an Agile team.`
- responsibilities:
  - `Developed features across an Angular frontend and Java Spring Boot backend with SQL Server persistence`
  - `Tested throughout the day against an in-house AutoStore hardware simulation grid`
  - `Handled weekend on-site production deployments with live log monitoring at customer facilities`

### 4. University of Cincinnati

- title: `IT Support Technician`
- company: `University of Cincinnati — Lindner College of Business`
- location: `Cincinnati, OH`
- period: `Apr 2021 - Dec 2021`
- description: `Provided IT support for faculty, staff, and classroom technology in the Lindner College of Business IT department.`
- responsibilities:
  - `Developed a web-based display for the IT department to monitor classroom camera streams`
  - `Troubleshot audio/video and network issues in classrooms`
  - `Handled level-one service tickets via the ServiceNow ticketing system`

## Testing / verification

1. New Jest/RTL test (`Experience.test.tsx`), mirroring the Projects test
   pattern (including the IntersectionObserver shim):
   - four job titles render in the order above (h3 headings)
   - "Pet Wants" appears nowhere
   - the four verified periods render exactly as specified
2. `CI=true` full test run passes (Projects tests must stay green).
3. `npm run build` compiles with no new warnings.

## Error handling

Not applicable — static content component.

## Out of scope

- Hero/Skills/Contact copy (the hero's Java/Spring Boot line remains accurate
  given the KPI role).
- Gap-filler jobs from the report (Kroger, LAC 143, etc.) — deliberately
  omitted; a software resume need not list them.
- Layout or styling changes.
