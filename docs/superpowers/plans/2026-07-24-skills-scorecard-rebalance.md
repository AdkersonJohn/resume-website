# Skills Scorecard Rebalance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebalance the Skills scorecard so React is the only 5/5 rating, per the approved spec.

**Architecture:** `src/components/Skills.tsx` gets 10 `level` value changes in its `skillCategories` array plus one test hook (`data-filled` attribute on each `SkillDot`). A new `src/components/Skills.test.tsx` structurally asserts exactly one skill renders five filled dots and that it is React.

**Tech Stack:** React 18 + TypeScript (CRA), styled-components 6, Jest + RTL via `react-scripts test`.

## Global Constraints

- Only `level` numbers change in the data; the single permitted non-data change is adding `data-filled={i < skill.level}` to the `SkillDot` JSX. No styling, skill-name, category, or Additional Skills changes.
- Final rating spread must be exactly: React 5; C#, JavaScript/TypeScript, Java (17+), Spring 6.x / Spring Boot 3.x, Angular/AngularJS, REST APIs, Git/GitHub/GitLab, Jenkins/JFrog, VSCode/IntelliJ, Visual Studio, Jira/Bitbucket, T-SQL/RDBMS, Agile/Scrum, Test-Driven Development, Object-Oriented Design all 4; Python, C++, ASP.NET, Azure all 3.
- Existing 8 tests pass unchanged; suite becomes 9/9.
- Work on branch `rebalance-skill-ratings`. Never commit to main.

---

### Task 1: Rating values, test hook, and test

**Files:**
- Modify: `src/components/Skills.tsx` (ten `level` values in `skillCategories`, one JSX attribute on the dot render)
- Test: `src/components/Skills.test.tsx` (new file)

**Interfaces:**
- Consumes: existing `Skills` component; `SkillDot` render loop `{[...Array(5)].map((_, i) => (<SkillDot key={i} filled={i < skill.level} />))}` inside `SkillLevel`, which sits next to the `SkillName` span inside `SkillItem`.
- Produces: each dot carries `data-filled="true"`/`"false"`; Task 2 relies only on the passing suite.

- [ ] **Step 1: Write the failing test**

Create `src/components/Skills.test.tsx`:

```tsx
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Skills from "./Skills";

beforeAll(() => {
  // jsdom lacks IntersectionObserver, which framer-motion's whileInView uses
  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  (window as any).IntersectionObserver = MockIntersectionObserver;
});

test("exactly one skill is rated 5/5 and it is React", () => {
  const { container } = render(<Skills />);
  const filledCounts = new Map<Element, number>();
  container.querySelectorAll('[data-filled="true"]').forEach((dot) => {
    const group = dot.parentElement!;
    filledCounts.set(group, (filledCounts.get(group) ?? 0) + 1);
  });
  expect(filledCounts.size).toBe(20);
  const fiveStarNames: string[] = [];
  filledCounts.forEach((count, group) => {
    if (count === 5) {
      fiveStarNames.push(group.parentElement!.querySelector("span")!.textContent!);
    }
  });
  expect(fiveStarNames).toEqual(["React"]);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true npx react-scripts test src/components/Skills.test.tsx --watchAll=false`
Expected: FAIL — `expect(filledCounts.size).toBe(20)` receives 0 because no element has a `data-filled` attribute yet.

- [ ] **Step 3: Implement in `src/components/Skills.tsx`**

3a. In the JSX render of the dots, add the `data-filled` attribute. Replace:

```tsx
                      {[...Array(5)].map((_, i) => (
                        <SkillDot key={i} filled={i < skill.level} />
                      ))}
```

with:

```tsx
                      {[...Array(5)].map((_, i) => (
                        <SkillDot
                          key={i}
                          filled={i < skill.level}
                          data-filled={i < skill.level}
                        />
                      ))}
```

3b. In the `skillCategories` array, change exactly these ten `level` values (all other lines untouched):

- `{ name: "Java (17+)", level: 5 }` → `{ name: "Java (17+)", level: 4 }`
- `{ name: "Python", level: 4 }` → `{ name: "Python", level: 3 }`
- `{ name: "Spring 6.x / Spring Boot 3.x", level: 5 }` → `{ name: "Spring 6.x / Spring Boot 3.x", level: 4 }`
- `{ name: "ASP.NET", level: 4 }` → `{ name: "ASP.NET", level: 3 }`
- `{ name: "React", level: 4 }` → `{ name: "React", level: 5 }`
- `{ name: "REST APIs", level: 5 }` → `{ name: "REST APIs", level: 4 }`
- `{ name: "Git/GitHub/GitLab", level: 5 }` → `{ name: "Git/GitHub/GitLab", level: 4 }`
- `{ name: "VSCode/IntelliJ", level: 5 }` → `{ name: "VSCode/IntelliJ", level: 4 }`
- `{ name: "Azure", level: 4 }` → `{ name: "Azure", level: 3 }`
- `{ name: "Agile/Scrum", level: 5 }` → `{ name: "Agile/Scrum", level: 4 }`

- [ ] **Step 4: Run test to verify it passes**

Run: `CI=true npx react-scripts test src/components/Skills.test.tsx --watchAll=false`
Expected: PASS — 1/1 in this file.

- [ ] **Step 5: Commit**

```bash
git add src/components/Skills.tsx src/components/Skills.test.tsx
git commit -m "Rebalance skills scorecard so React is the only 5/5"
```

---

### Task 2: Full-suite, build, and push

**Files:**
- No file changes. Verification only.

**Interfaces:**
- Consumes: passing suite from Task 1.
- Produces: verified build + pushed branch.

- [ ] **Step 1: Full test suite**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: 9/9 (4 Projects + 4 Experience + 1 Skills).

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: "Compiled successfully." — no new warnings. Afterwards: `git checkout -- build/ 2>/dev/null || true`; delete any NEW untracked files under `build/static/` created by this build; confirm `git status --short` shows no modified tracked files.

- [ ] **Step 3: Optional visual check (only if chrome-devtools MCP is attached)**

Check ToolSearch "select:mcp__chrome-devtools__navigate_page". If available: dev server in background, navigate to http://localhost:3000, confirm React shows 5 filled dots and no other skill does, no console errors, stop server. If unavailable: skip with a note. Never fall back to the Playwright MCP.

- [ ] **Step 4: Push**

```bash
git push -u origin rebalance-skill-ratings
```
Expected: branch pushed; owner merges via PR. Never merge to main locally.
