# Repo Hygiene — Design

**Date:** 2026-07-24
**Status:** Design approved by owner.

## Goal

Clear the punch list accumulated across the last five feature reviews:
stop tracking generated files, remove dead font tags, fix the one known
accessibility contrast miss, tokenize hover colors, silence the React
`filled`-prop warning, hide decorative icons from screen readers, and add
a local (not CI) test gate on push.

## Items

### 1. .gitignore + untrack generated files

Create `.gitignore` at repo root:

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

Then untrack (index only, keep on disk): `git rm -r -q --cached node_modules build`.
Currently tracked: 39,905 files under `node_modules/`, 6 under `build/`
(including the stale pre-restyle bundle). `.superpowers/` is already
untracked; the ignore entry just keeps it that way. Deploys are
unaffected: the workflow runs `npm ci` and a fresh `npm run build`.

### 2. Remove dead Inter font tags

`public/index.html`: delete the two `fonts.googleapis.com` preconnect
`<link>` lines and the Inter stylesheet `<link>`. The site uses the Apple
system font stack; no other reference to Inter exists in `src/`.

### 3. Hover contrast fix + tokenization

`src/styles/GlobalStyles.ts` `:root` gains two tokens:

```
--surface-hover: #1f1f21;
--chip-hover: #3d3d3f;
```

Replace literals:
- `background: #252527;` → `background: var(--surface-hover);` in
  `Experience.tsx`, `Projects.tsx`, `Contact.tsx` (card hover states).
- `background: #3d3d3f;` → `background: var(--chip-hover);` in
  `Hero.tsx` and `Contact.tsx` (social-chip hover states).

`#1f1f21` (vs the old `#252527`) restores WCAG AA: `--text-secondary`
`#86868b` on `#1f1f21` is ≥ 4.5:1 (old value was 4.22:1).

### 4. Prettier rewrap of long hosting lines

Run `npx prettier --write src/components/Projects.tsx` and accept its
output verbatim. Prettier cannot break string literals, so the four
80-char-plus `hosting:` lines may come back unchanged — in that case the
file is already prettier-clean and this item closes as a verified no-op
(resolving the review note). String concatenation must NOT be introduced;
hosting strings stay byte-identical — the Projects test's exact-match
assertions must still pass.

### 5. aria-hidden for decorative icons

`src/App.tsx`: wrap the app tree in react-icons' provider:

```tsx
<IconContext.Provider value={{ attr: { "aria-hidden": true } }}>
```

(import `IconContext` from `react-icons`; the `attr` field — typed as
`React.SVGAttributes<SVGElement>` — forwards attributes onto every
rendered svg, and React renders the boolean as `aria-hidden="true"`). All icons on the site are decorative
except that four links are icon-only and would become nameless:

- `Hero.tsx`: GitHub and LinkedIn `SocialLink` anchors → add
  `aria-label="GitHub"` / `aria-label="LinkedIn"`.
- `Contact.tsx`: GitHub and LinkedIn `SocialLink` anchors → same two
  aria-labels.

### 6. Transient $filled prop

`src/components/Skills.tsx`: rename the `SkillDot` prop `filled` →
`$filled` (styled-components transient prop) in the styled definition and
the JSX. The `data-filled` attribute is unchanged — `Skills.test.tsx`
passes as-is. This removes the React console warning
"Received `true` for a non-boolean attribute `filled`".

### 7. Local pre-push test hook

- New executable file `.githooks/pre-push`:

```sh
#!/bin/sh
echo "pre-push: running test suite..."
CI=true npx react-scripts test --watchAll=false
```

- `package.json` scripts gain:
  `"prepare": "git config core.hooksPath .githooks"` — wires the hook
  automatically on `npm install`/`npm ci`; no manual setup, nothing runs
  on GitHub (owner's choice: keep the test gate local to avoid CI usage).
- The deploy workflow is NOT modified.

## Tests / verification

- Full suite stays 9/9; the Skills and Projects tests are the regression
  net for items 4 and 6.
- `npm run build` compiles clean, no new warnings.
- After item 1: `git status --short` is empty (no node_modules noise) and
  `git ls-files | grep -c "^node_modules/"` is 0, `^build/` is 0.
- Hook check: `git config core.hooksPath` prints `.githooks` after
  `npm run prepare`; the hook file is executable.
- Optional visual check via chrome-devtools MCP only if attached; never
  the Playwright MCP.

## Constraints

- Hosting strings, skill names/levels, and all copy stay byte-identical.
- No new npm packages (hook wiring uses git config, not husky).
- Work on branch `repo-hygiene`; owner merges via PR. Never commit to main.

## Out of scope

- Any visual redesign; deploy.yml changes; README/docs.
- camp scout repo secrets (separate repo, owner's task).
