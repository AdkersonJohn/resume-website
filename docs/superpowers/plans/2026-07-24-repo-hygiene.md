# Repo Hygiene Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clear the accumulated hygiene punch list: untrack generated files, remove dead font tags, fix hover contrast with tokens, silence the `filled` prop warning, hide decorative icons from screen readers, and add a local pre-push test gate.

**Architecture:** Five tasks. Task 1 is git-index-only (new `.gitignore` + `git rm --cached`). Tasks 2–3 are small source edits guarded by the existing 9-test suite. Task 4 adds a committed git hook wired by an npm `prepare` script. Task 5 verifies and pushes.

**Tech Stack:** React 18 + TypeScript (CRA), styled-components 6, react-icons 4, Jest + RTL via `react-scripts test`, git hooks via `core.hooksPath`.

## Global Constraints

- Hosting strings, skill names/levels, and all user-visible copy stay byte-identical.
- No new npm packages (hook wiring uses `git config core.hooksPath`, not husky).
- Existing suite stays 9/9 (4 Projects + 4 Experience + 1 Skills); no tests are modified.
- Work on branch `repo-hygiene`. Never commit to main; never merge to main locally.
- The deploy workflow `.github/workflows/deploy.yml` is NOT modified.

---

### Task 1: .gitignore and untrack generated files

**Files:**
- Create: `.gitignore` (repo root)
- Modify: git index only — untrack `node_modules/` (39,905 files) and `build/` (6 files). Working tree copies stay on disk.

**Interfaces:**
- Consumes: nothing.
- Produces: a clean `git status`; later tasks no longer see node_modules cache noise, and Task 5's build step needs no build/ cleanup dance.

- [ ] **Step 1: Create `.gitignore`**

Create `.gitignore` at the repo root with exactly:

```
# dependencies
/node_modules

# production
/build

# superpowers scratch
/.superpowers

# misc
.DS_Store
npm-debug.log*
```

- [ ] **Step 2: Untrack generated files (index only)**

```bash
git rm -r -q --cached node_modules build
```

- [ ] **Step 3: Verify the index**

Run: `git ls-files | grep -c "^node_modules/" || true` — Expected: `0`
Run: `git ls-files | grep -c "^build/" || true` — Expected: `0`
Run: `git status --short | grep -v "^D " | head` — Expected: only `A  .gitignore` (after `git add .gitignore` in the next step it shows as added; before that, `?? .gitignore`). No modified tracked files remain.

- [ ] **Step 4: Commit**

```bash
git add .gitignore
git commit -m "Stop tracking build and node_modules; add .gitignore"
```

- [ ] **Step 5: Verify clean status**

Run: `git status --short`
Expected: empty output (the node_modules cache noise is gone for good).

**Note for the controller/reviewer:** this commit contains ~39,911 `D` index entries — do NOT generate a full diff review package. Review via `git show --stat <commit> | tail -5` (expect "39912 files changed" ballpark), `git show <commit> -- .gitignore`, and the Step 3 verification commands.

---

### Task 2: Dead font tags, hover tokens, prettier check

**Files:**
- Modify: `public/index.html:14-19`
- Modify: `src/styles/GlobalStyles.ts:12` (token block)
- Modify: `src/components/Experience.tsx:41`, `src/components/Projects.tsx:52`, `src/components/Contact.tsx:48,107`, `src/components/Hero.tsx:102`
- Modify (maybe no-op): `src/components/Projects.tsx` via prettier

**Interfaces:**
- Consumes: existing CSS custom properties in `GlobalStyles.ts` `:root`.
- Produces: tokens `--surface-hover: #1f1f21` and `--chip-hover: #3d3d3f` used by any future component.

- [ ] **Step 1: Remove Inter font tags**

In `public/index.html`, delete exactly these six lines (14–19):

```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
```

Verify: `grep -c "fonts.g" public/index.html || true` → `0`.

- [ ] **Step 2: Add hover tokens**

In `src/styles/GlobalStyles.ts`, replace:

```ts
    --nav-bg: rgba(22, 22, 23, 0.8);
  }
```

with:

```ts
    --nav-bg: rgba(22, 22, 23, 0.8);
    --surface-hover: #1f1f21;
    --chip-hover: #3d3d3f;
  }
```

- [ ] **Step 3: Replace the five hover literals**

In each file, the change is inside a styled-component `&:hover` block:

`src/components/Experience.tsx` (line 41), `src/components/Projects.tsx` (line 52), `src/components/Contact.tsx` (line 48) — replace:

```ts
    background: #252527;
```

with:

```ts
    background: var(--surface-hover);
```

`src/components/Hero.tsx` (line 102), `src/components/Contact.tsx` (line 107) — replace:

```ts
    background: #3d3d3f;
```

with:

```ts
    background: var(--chip-hover);
```

Verify: `grep -rn "#252527\|#3d3d3f" src/ || true` → no output. Note the card hover color changes from `#252527` to `#1f1f21` intentionally (WCAG AA: `#86868b` text on `#1f1f21` is ≥ 4.5:1; on the old `#252527` it was 4.22:1).

- [ ] **Step 4: Prettier pass on Projects.tsx**

Run: `npx prettier --write src/components/Projects.tsx`
Then: `git diff --stat src/components/Projects.tsx`
Expected: EITHER no changes (prettier cannot break long string literals — the file is already prettier-clean; record "verified no-op" in your report) OR a small formatting-only diff. Do NOT introduce string concatenation. Hosting strings must stay byte-identical.

- [ ] **Step 5: Run the suite (regression net for the strings)**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: 9/9 pass (Projects exact-string tests prove hosting copy is untouched).

- [ ] **Step 6: Commit**

```bash
git add public/index.html src/styles/GlobalStyles.ts src/components/Experience.tsx src/components/Projects.tsx src/components/Contact.tsx src/components/Hero.tsx
git commit -m "Remove dead Inter font tags; tokenize hover colors with AA-compliant surface hover"
```

---

### Task 3: aria-hidden icons and transient $filled prop

**Files:**
- Modify: `src/App.tsx` (import + wrapper)
- Modify: `src/components/Hero.tsx:166-179` (two aria-labels)
- Modify: `src/components/Contact.tsx:181-195` (two aria-labels)
- Modify: `src/components/Skills.tsx` (SkillDot styled def + JSX)

**Interfaces:**
- Consumes: react-icons `IconContext` (exported from `react-icons`); `SkillDot` styled component and its render loop in `Skills.tsx`.
- Produces: every react-icons svg renders with `aria-hidden="true"`; `SkillDot` takes `$filled: boolean` (transient) plus the unchanged `data-filled` attribute that `Skills.test.tsx` depends on.

- [ ] **Step 1: Wrap the app in IconContext.Provider**

In `src/App.tsx`, add to the imports:

```tsx
import { IconContext } from "react-icons";
```

and replace the return:

```tsx
  return (
    <>
      <GlobalStyles />
      <AppContainer>
```

with:

```tsx
  return (
    <IconContext.Provider value={{ attr: { "aria-hidden": true } }}>
      <GlobalStyles />
      <AppContainer>
```

and the closing:

```tsx
      </AppContainer>
    </>
  );
```

with:

```tsx
      </AppContainer>
    </IconContext.Provider>
  );
```

- [ ] **Step 2: Add aria-labels to the four icon-only links**

In `src/components/Hero.tsx` (lines 166–179), add `aria-label` to each SocialLink:

```tsx
          <SocialLink
            href="https://github.com/AdkersonJohn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FiGithub />
          </SocialLink>
          <SocialLink
            href="https://www.linkedin.com/in/john-adkerson-63a0171b0/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </SocialLink>
```

In `src/components/Contact.tsx` (lines 181–195), the same two anchors get the same labels:

```tsx
          <SocialLink
            href="https://github.com/AdkersonJohn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FiGithub />
          </SocialLink>
          <SocialLink
            href="https://www.linkedin.com/in/john-adkerson-63a0171b0/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </SocialLink>
```

- [ ] **Step 3: Make the filled prop transient in Skills.tsx**

Replace the styled definition:

```tsx
const SkillDot = styled.div<{ filled: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ filled }) => (filled ? "var(--text)" : "var(--chip)")};
`;
```

with:

```tsx
const SkillDot = styled.div<{ $filled: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $filled }) => ($filled ? "var(--text)" : "var(--chip)")};
`;
```

and the JSX:

```tsx
                        <SkillDot
                          key={i}
                          filled={i < skill.level}
                          data-filled={i < skill.level}
                        />
```

with:

```tsx
                        <SkillDot
                          key={i}
                          $filled={i < skill.level}
                          data-filled={i < skill.level}
                        />
```

`data-filled` must remain — `Skills.test.tsx` selects on it.

- [ ] **Step 4: Run the suite and check the warning is gone**

Run: `CI=true npx react-scripts test --watchAll=false 2>&1 | tee /tmp/suite.log; grep -c "non-boolean attribute" /tmp/suite.log || true`
Expected: 9/9 pass and grep prints `0` (the `filled` warning no longer appears).

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/components/Hero.tsx src/components/Contact.tsx src/components/Skills.tsx
git commit -m "Hide decorative icons from screen readers; label icon-only links; make SkillDot prop transient"
```

---

### Task 4: Local pre-push test hook

**Files:**
- Create: `.githooks/pre-push` (executable)
- Modify: `package.json:24-31` (scripts block)

**Interfaces:**
- Consumes: nothing.
- Produces: pushes from any clone that has run `npm install`/`npm ci` are gated on the test suite. Nothing runs on GitHub.

- [ ] **Step 1: Create the hook**

Create `.githooks/pre-push` with exactly:

```sh
#!/bin/sh
echo "pre-push: running test suite..."
CI=true npx react-scripts test --watchAll=false
```

Then: `chmod +x .githooks/pre-push`

- [ ] **Step 2: Wire it via the prepare script**

In `package.json`, replace:

```json
  "scripts": {
    "start": "react-scripts start",
```

with:

```json
  "scripts": {
    "prepare": "git config core.hooksPath .githooks",
    "start": "react-scripts start",
```

- [ ] **Step 3: Activate and verify**

Run: `npm run prepare && git config core.hooksPath`
Expected: prints `.githooks`

Run: `.githooks/pre-push`
Expected: suite runs and exits 0 with 9/9 passing (this is exactly what a real push will execute).

- [ ] **Step 4: Commit**

```bash
git add .githooks/pre-push package.json
git commit -m "Add local pre-push test gate wired via npm prepare"
```

---

### Task 5: Full verification and push

**Files:**
- No file changes. Verification only.

**Interfaces:**
- Consumes: all prior tasks' commits.
- Produces: verified build + pushed branch.

- [ ] **Step 1: Full test suite**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: 9/9 (4 Projects + 4 Experience + 1 Skills).

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: "Compiled successfully." — no new warnings. `build/` is now git-ignored, so no cleanup is needed; confirm with `git status --short` → empty output.

- [ ] **Step 3: Optional visual check (only if chrome-devtools MCP is attached)**

Check ToolSearch "select:mcp__chrome-devtools__navigate_page". If available: dev server in background, navigate to http://localhost:3000, confirm hover states still render on cards/chips and icons carry aria-hidden, no console errors, stop server. If unavailable: skip with a note. Never fall back to the Playwright MCP.

- [ ] **Step 4: Push (this exercises the new hook)**

```bash
git push -u origin repo-hygiene
```
Expected: the pre-push hook runs the suite first (9/9), then the branch pushes. Owner merges via PR. Never merge to main locally.
