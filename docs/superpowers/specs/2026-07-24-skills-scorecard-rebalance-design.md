# Skills Scorecard Rebalance — Design

**Date:** 2026-07-24
**Status:** Design approved by owner.

## Goal

Make the Skills scorecard read as an honest self-assessment: exactly one
skill rated 5/5 (React), with the remaining ratings shifted down so the
card no longer shows six maxed-out skills. Requested by the owner on a
coworker's advice that a wall of 5s looks unrealistic to HR.

## Scope

Single component changed: `src/components/Skills.tsx` — only `level`
numbers in the `skillCategories` array. One new test file:
`src/components/Skills.test.tsx`. No layout, styling, skill-name, or
category changes. Additional Skills tags untouched.

## Changes

### 1. Rating values (10 changes)

| Skill | Current | New |
|---|---|---|
| React | 4 | 5 |
| Java (17+) | 5 | 4 |
| Spring 6.x / Spring Boot 3.x | 5 | 4 |
| REST APIs | 5 | 4 |
| Git/GitHub/GitLab | 5 | 4 |
| VSCode/IntelliJ | 5 | 4 |
| Agile/Scrum | 5 | 4 |
| Python | 4 | 3 |
| ASP.NET | 4 | 3 |
| Azure | 4 | 3 |

Unchanged: C# 4, JavaScript/TypeScript 4, C++ 3, Angular/AngularJS 4,
Jenkins/JFrog 4, Visual Studio 4, Jira/Bitbucket 4, T-SQL/RDBMS 4,
Test-Driven Development 4, Object-Oriented Design 4.

Resulting spread: one 5 (React), thirteen 4s, four 3s (Python, C++,
ASP.NET, Azure).

### 2. Rationale for the softened 4s

Python, ASP.NET, and Azure have the least professional evidence behind
them (professional history is Java/Spring at KPI, C#/React at Kardex,
Power Platform at Encore; personal cloud work is AWS). React keeps the
sole 5: daily driver at Kardex and the stack for most personal projects.

## Tests

New `src/components/Skills.test.tsx` with one test that renders
`<Skills />` and asserts the "only one 5" rule structurally: exactly one
skill row renders five filled dots, and that row's skill name is React.
Filled state is detectable via the `SkillDot` `filled` prop's background
(`var(--text)` vs `var(--chip)`); the test may instead assert via
computed styles or a data attribute added to the dot — implementation
plan decides the cleanest hook, but the assertion must fail if a second
5 is ever introduced.

Existing suite (8 tests) passes unchanged; suite becomes 9.

## Constraints

- Only `level` values change in `Skills.tsx`; if the test needs a hook
  (e.g., a `data-filled` attribute on `SkillDot`), that is the only
  permitted non-data change.
- Work on a feature branch; owner merges via PR. Never commit to main.
- Optional visual check via chrome-devtools MCP only if attached;
  never fall back to the Playwright MCP.

## Out of scope

- Skill names, categories, Additional Skills tags, any styling.
- Repo hygiene items (.gitignore, Inter link tags, hover contrast) —
  separate branch.
