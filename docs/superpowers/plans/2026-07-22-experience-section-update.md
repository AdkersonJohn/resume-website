# Experience Section Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Experience section's two outdated entries with the owner's four verified roles (dates verified against The Work Number).

**Architecture:** Single-component content change. `src/components/Experience.tsx` holds a hardcoded `experiences` array rendered as styled-components cards; we swap the content (2 entries → 4) without touching styles or layout. A Jest/RTL test locks in titles, order, verified periods, and the removal of Pet Wants.

**Tech Stack:** React 18 + TypeScript (Create React App), styled-components 6, framer-motion 10, react-icons (Fi set), Jest + React Testing Library (via `react-scripts test`).

## Global Constraints

- Only `src/components/Experience.tsx` is modified; a new test file `src/components/Experience.test.tsx` is created. No other component, style, or layout changes.
- Entry order (most recent first): Encore Technologies, Kardex Remstar, KPI Solutions, University of Cincinnati.
- Periods are verified against The Work Number and must appear exactly as: `Sep 2025 - Present`, `Jul 2023 - Jul 2024`, `Jan 2022 - Jun 2023`, `Apr 2021 - Dec 2021`.
- "Pet Wants" must not appear anywhere in the codebase after this change.
- All content (titles, companies, descriptions, responsibilities) comes verbatim from the spec (`docs/superpowers/specs/2026-07-22-experience-section-update-design.md`), reproduced in Task 1 below.
- Work happens on the already-created `update-experience-section` branch. Never commit to main.

---

### Task 1: New experience content

**Files:**
- Modify: `src/components/Experience.tsx` (only the `experiences` array, lines 104-135 of the current file; styled components and JSX are unchanged)
- Test: `src/components/Experience.test.tsx` (create)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `Experience` React component (default export, unchanged signature) rendering four cards. Task 2 relies only on the rendered output.

- [ ] **Step 1: Write the failing test**

Create `src/components/Experience.test.tsx`:

```tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Experience from "./Experience";

beforeAll(() => {
  // jsdom lacks IntersectionObserver, which framer-motion's whileInView uses
  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  (window as any).IntersectionObserver = MockIntersectionObserver;
});

test("renders all four verified roles in order", () => {
  render(<Experience />);
  const titles = [
    "IT Analyst",
    "Software Engineer 2",
    "Software Engineer 3",
    "IT Support Technician",
  ];
  const headings = screen.getAllByRole("heading", { level: 3 });
  expect(headings.map((h) => h.textContent)).toEqual(titles);
});

test("renders the verified employment periods exactly", () => {
  render(<Experience />);
  expect(screen.getByText("Sep 2025 - Present")).toBeInTheDocument();
  expect(screen.getByText("Jul 2023 - Jul 2024")).toBeInTheDocument();
  expect(screen.getByText("Jan 2022 - Jun 2023")).toBeInTheDocument();
  expect(screen.getByText("Apr 2021 - Dec 2021")).toBeInTheDocument();
});

test("outdated employers and periods are gone", () => {
  render(<Experience />);
  expect(screen.queryByText(/Pet Wants/i)).toBeNull();
  expect(screen.queryByText("Aug 2019 - Aug 2022")).toBeNull();
  expect(screen.queryByText("Aug 2022 - Present")).toBeNull();
});

test("renders the four companies", () => {
  render(<Experience />);
  expect(screen.getByText("Encore Technologies")).toBeInTheDocument();
  expect(screen.getByText("Kardex Remstar")).toBeInTheDocument();
  expect(screen.getByText("KPI Solutions")).toBeInTheDocument();
  expect(
    screen.getByText("University of Cincinnati — Lindner College of Business")
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true npx react-scripts test src/components/Experience.test.tsx --watchAll=false`
Expected: FAIL — heading list contains the two old "Information Technology Help Desk Technician" titles instead of the four new ones; "Pet Wants" is present so the third test fails.

- [ ] **Step 3: Replace the `experiences` array in `src/components/Experience.tsx`**

Replace the entire `const experiences = [ ... ];` block (currently lines 104-135) with:

```tsx
  const experiences = [
    {
      title: "IT Analyst",
      company: "Encore Technologies",
      location: "Cincinnati, OH",
      period: "Sep 2025 - Present",
      description:
        "Provide IT support for Cincinnati Children's Hospital while developing applications for the IT department.",
      responsibilities: [
        "Develop internal applications for the IT department, including a Power Apps barcode-scanning tool that cross-references SharePoint to streamline hardware refresh cycles",
        "Provide day-to-day IT support for Cincinnati Children's Hospital staff and systems",
      ],
    },
    {
      title: "Software Engineer 2",
      company: "Kardex Remstar",
      location: "Cincinnati, OH",
      period: "Jul 2023 - Jul 2024",
      description:
        "Developed and tested features for AutoStore automated storage and retrieval systems on an Agile team.",
      responsibilities: [
        "Built features across a React frontend and C#/.NET backend with SQL Server persistence",
        "Validated changes daily against an in-house miniature AutoStore hardware simulation grid",
        "Ran weekend production deployments at customer sites, monitoring logs to ensure smooth rollouts",
      ],
    },
    {
      title: "Software Engineer 3",
      company: "KPI Solutions",
      location: "Cincinnati, OH",
      period: "Jan 2022 - Jun 2023",
      description:
        "Built features for AutoStore warehouse automation systems on an Agile team.",
      responsibilities: [
        "Developed features across an Angular frontend and Java Spring Boot backend with SQL Server persistence",
        "Tested throughout the day against an in-house AutoStore hardware simulation grid",
        "Handled weekend on-site production deployments with live log monitoring at customer facilities",
      ],
    },
    {
      title: "IT Support Technician",
      company: "University of Cincinnati — Lindner College of Business",
      location: "Cincinnati, OH",
      period: "Apr 2021 - Dec 2021",
      description:
        "Provided IT support for faculty, staff, and classroom technology in the Lindner College of Business IT department.",
      responsibilities: [
        "Developed a web-based display for the IT department to monitor classroom camera streams",
        "Troubleshot audio/video and network issues in classrooms",
        "Handled level-one service tickets via the ServiceNow ticketing system",
      ],
    },
  ];
```

Do not change anything else in the file — imports, styled components, and the JSX return stay exactly as they are.

- [ ] **Step 4: Run test to verify it passes**

Run: `CI=true npx react-scripts test src/components/Experience.test.tsx --watchAll=false`
Expected: PASS — 4 tests passing.

- [ ] **Step 5: Commit**

```bash
git add src/components/Experience.tsx src/components/Experience.test.tsx
git commit -m "Update Experience section with four verified roles"
```

---

### Task 2: Full-suite, build, and push

**Files:**
- No file changes. Verification only.

**Interfaces:**
- Consumes: the rendered `Experience` component from Task 1.
- Produces: verified build + pushed branch.

- [ ] **Step 1: Run the full test suite**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: PASS — both `Experience.test.tsx` (4 tests) and the pre-existing `Projects.test.tsx` (3 tests), 7/7 total.

- [ ] **Step 2: Confirm Pet Wants is fully gone from the source tree**

Run: `grep -ri "pet wants" src/ public/ && echo "FOUND — FAIL" || echo "clean"`
Expected: `clean`

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: "Compiled successfully." — no TypeScript errors, no new ESLint warnings (CI treats warnings as errors on deploy).

- [ ] **Step 4: Optional visual check (only if chrome-devtools MCP is attached)**

If and only if the `mcp__chrome-devtools__*` tools are available (check via ToolSearch): start `BROWSER=none npm start` in the background, navigate the attached Chrome to http://localhost:3000, snapshot to confirm four experience cards in order with the verified periods, check console for errors, then stop the dev server. If the MCP tools are not available, skip this step and note it in the report — do NOT fall back to the Playwright MCP.

- [ ] **Step 5: Push the branch**

```bash
git push -u origin update-experience-section
```
Expected: branch pushed; owner merges via PR on GitHub. Never merge to main locally.
