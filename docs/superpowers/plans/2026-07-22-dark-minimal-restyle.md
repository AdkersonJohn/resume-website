# Dark Minimal Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the site from the purple-gradient theme to a black-and-white Apple-dark aesthetic using CSS custom properties, with zero content or structure changes.

**Architecture:** CSS variables defined once in `GlobalStyles.ts`; every component's styled-components swap hardcoded colors/gradients for the variables. JSX, content strings, component structure, and framer-motion props are untouched except one inline style object in Header (colors only). The existing 7-test suite is the regression guard — it asserts content, which must be unaffected.

**Tech Stack:** React 18 + TypeScript (CRA), styled-components 6, framer-motion 10, Jest + RTL via `react-scripts test`.

## Global Constraints

- Design tokens (define exactly): `--bg: #000000`, `--surface: #1d1d1f`, `--surface-alt: #161617`, `--chip: #2d2d2f`, `--text: #f5f5f7`, `--text-secondary: #86868b`, `--hairline: rgba(255, 255, 255, 0.12)`, `--nav-bg: rgba(22, 22, 23, 0.8)`.
- Font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` (Inter removed).
- Buttons are white pills: background `#f5f5f7`, text `#000`, `border-radius: 980px`, hover background `#d5d5d9`.
- Cards: `background: var(--surface)`, `border: 1px solid var(--hairline)`, `border-radius: 18px`, no box-shadow; hover changes background to `#252527` — no translateY lift anywhere.
- Icon chips use `var(--chip)` with `1px solid var(--hairline)` (deliberate refinement of the spec's `--surface-alt` icon-chip value: `#161617` chips would be invisible on `#1d1d1f` cards; `--chip` keeps the spec's intent of a subtle neutral chip).
- Section backgrounds: Hero `var(--bg)`, Experience `var(--bg)`, Skills `var(--surface-alt)`, Projects `var(--bg)`, Education `var(--surface-alt)`, Contact `var(--bg)`.
- No content-string, JSX-structure, or framer-motion prop changes. No new dependencies.
- After every task: `CI=true npx react-scripts test --watchAll=false` must stay 7/7.
- Work on branch `restyle-dark-minimal`. Never commit to main.
- Styling has no TDD cycle; the existing suite is the guard. Run it before the first change (baseline 7/7) and after each task.

---

### Task 1: Tokens foundation — GlobalStyles.ts + App.tsx

**Files:**
- Modify: `src/styles/GlobalStyles.ts` (whole file, replacement below)
- Modify: `src/App.tsx:13-17` (`AppContainer` only)

**Interfaces:**
- Consumes: nothing.
- Produces: the eight CSS variables on `:root` (names in Global Constraints) that Tasks 2-4 reference via `var(...)`.

- [ ] **Step 1: Baseline test run**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: 7/7 pass (4 Experience + 3 Projects). If not, STOP and report BLOCKED.

- [ ] **Step 2: Replace `src/styles/GlobalStyles.ts` entirely with:**

```ts
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --bg: #000000;
    --surface: #1d1d1f;
    --surface-alt: #161617;
    --chip: #2d2d2f;
    --text: #f5f5f7;
    --text-secondary: #86868b;
    --hairline: rgba(255, 255, 255, 0.12);
    --nav-bg: rgba(22, 22, 23, 0.8);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
    line-height: 1.6;
    color: var(--text);
    background-color: var(--bg);
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1rem;
    letter-spacing: -0.015em;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default GlobalStyles;
```

- [ ] **Step 3: In `src/App.tsx`, replace the `AppContainer` definition with:**

```tsx
const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--bg);
`;
```

(The old definition had the purple `linear-gradient` background and a `font-family: "Inter", sans-serif;` line — both go; font now inherits from GlobalStyles.)

- [ ] **Step 4: Run tests**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: 7/7 pass.

- [ ] **Step 5: Commit**

```bash
git add src/styles/GlobalStyles.ts src/App.tsx
git commit -m "Add dark design tokens and base typography"
```

---

### Task 2: Header + Hero

**Files:**
- Modify: `src/components/Header.tsx` (styled components + one inline style object)
- Modify: `src/components/Hero.tsx` (styled components only)

**Interfaces:**
- Consumes: CSS variables from Task 1.
- Produces: nothing consumed later.

- [ ] **Step 1: In `src/components/Header.tsx`, replace these styled-component definitions:**

`HeaderContainer`:
```tsx
const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--nav-bg);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--hairline);
  transition: all 0.3s ease;
`;
```

`Logo`:
```tsx
const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
`;
```

`NavLinks` (only the mobile `background` line changes; keep everything else):
```tsx
const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(22, 22, 23, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 2rem;
    transform: ${({ isOpen }) =>
      isOpen ? "translateY(0)" : "translateY(-100%)"};
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    transition: all 0.3s ease;
  }
`;
```

`NavLink`:
```tsx
const NavLink = styled.a`
  color: var(--text-secondary);
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: var(--text);
  }
`;
```

`MobileMenuButton`:
```tsx
const MobileMenuButton = styled.button`
  display: none;
  font-size: 1.5rem;
  color: var(--text);

  @media (max-width: 768px) {
    display: block;
  }
`;
```

- [ ] **Step 2: In the same file's JSX, replace the `style={{...}}` object on `<HeaderContainer>` (currently white rgba backgrounds + boxShadow) with:**

```tsx
      style={{
        background: isScrolled
          ? "rgba(22, 22, 23, 0.94)"
          : "rgba(22, 22, 23, 0.8)",
      }}
```

- [ ] **Step 3: In `src/components/Hero.tsx`, replace these styled-component definitions:**

`HeroSection` (color only):
```tsx
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--text);
  padding: 100px 20px 50px;
`;
```

`Greeting`:
```tsx
const Greeting = styled(motion.div)`
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: var(--text-secondary);
`;
```

`Name` (gradient text-fill removed):
```tsx
const Name = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text);
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;
```

`Title`:
```tsx
const Title = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: var(--text-secondary);
`;
```

`Description`:
```tsx
const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 3rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;
```

`Button` (single white pill; the `.primary`/`.secondary` class blocks collapse into one base style — the JSX `className="secondary"` stays and becomes a no-op):
```tsx
const Button = styled(motion.button)`
  padding: 12px 24px;
  border-radius: 980px;
  font-weight: 500;
  font-size: 1rem;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  background: #f5f5f7;
  color: #000;

  &:hover {
    background: #d5d5d9;
  }
`;
```

`SocialLink`:
```tsx
const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--chip);
  border: 1px solid var(--hairline);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  font-size: 1.2rem;
  transition: background 0.3s ease;

  &:hover {
    background: #3d3d3f;
  }
`;
```

- [ ] **Step 4: Run tests**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: 7/7 pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.tsx src/components/Hero.tsx
git commit -m "Restyle header and hero to dark minimal theme"
```

---

### Task 3: Experience + Skills

**Files:**
- Modify: `src/components/Experience.tsx` (styled components only; the `experiences` array and JSX are untouched)
- Modify: `src/components/Skills.tsx` (styled components only)

**Interfaces:**
- Consumes: CSS variables from Task 1.
- Produces: nothing consumed later.

- [ ] **Step 1: In `src/components/Experience.tsx`, replace these styled-component definitions:**

```tsx
const ExperienceSection = styled.section`
  padding: 100px 0;
  background: var(--bg);
  color: var(--text);
`;
```

```tsx
const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: var(--text);
`;
```

```tsx
const ExperienceCard = styled(motion.div)`
  background: var(--surface);
  border-radius: 18px;
  padding: 2rem;
  border: 1px solid var(--hairline);
  transition: background 0.3s ease;

  &:hover {
    background: #252527;
  }
`;
```

```tsx
const JobTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.5rem;
`;
```

```tsx
const Company = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;
```

```tsx
const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
`;
```

```tsx
const JobDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1rem;
`;
```

```tsx
const Responsibility = styled.li`
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;

  &:before {
    content: "•";
    color: var(--text-secondary);
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;
```

- [ ] **Step 2: In `src/components/Skills.tsx`, replace these styled-component definitions:**

```tsx
const SkillsSection = styled.section`
  padding: 100px 0;
  background: var(--surface-alt);
  color: var(--text);
`;
```

```tsx
const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: var(--text);
`;
```

```tsx
const SkillCategory = styled(motion.div)`
  background: var(--surface);
  border-radius: 18px;
  padding: 2rem;
  border: 1px solid var(--hairline);
`;
```

```tsx
const CategoryIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: var(--chip);
  border: 1px solid var(--hairline);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  font-size: 1.5rem;
`;
```

```tsx
const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text);
`;
```

```tsx
const SkillName = styled.span`
  font-weight: 500;
  color: var(--text-secondary);
`;
```

```tsx
const SkillDot = styled.div<{ filled: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ filled }) => (filled ? "var(--text)" : "var(--chip)")};
`;
```

```tsx
const AdditionalSkills = styled(motion.div)`
  background: var(--surface);
  border-radius: 18px;
  padding: 2rem;
  border: 1px solid var(--hairline);
  max-width: 800px;
  margin: 0 auto;
`;
```

```tsx
const AdditionalSkillsTitle = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text);
`;
```

```tsx
const SkillTag = styled.span`
  background: var(--chip);
  color: var(--text);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;
```

- [ ] **Step 3: Run tests**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: 7/7 pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/Experience.tsx src/components/Skills.tsx
git commit -m "Restyle experience and skills sections to dark minimal theme"
```

---

### Task 4: Projects + Education + Contact

**Files:**
- Modify: `src/components/Projects.tsx` (styled components only; the `projects` array and JSX are untouched)
- Modify: `src/components/Education.tsx` (styled components only)
- Modify: `src/components/Contact.tsx` (styled components only)

**Interfaces:**
- Consumes: CSS variables from Task 1.
- Produces: nothing consumed later.

- [ ] **Step 1: In `src/components/Projects.tsx`, replace these styled-component definitions:**

```tsx
const ProjectsSection = styled.section`
  padding: 100px 0;
  background: var(--bg);
  color: var(--text);
`;
```

```tsx
const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: var(--text);
`;
```

```tsx
const ProjectCard = styled(motion.div)`
  background: var(--surface);
  border-radius: 18px;
  padding: 2rem;
  border: 1px solid var(--hairline);
  transition: background 0.3s ease;

  &:hover {
    background: #252527;
  }
`;
```

```tsx
const ProjectIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: var(--chip);
  border: 1px solid var(--hairline);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  font-size: 1.5rem;
`;
```

```tsx
const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text);
`;
```

```tsx
const ProjectDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1rem;
`;
```

```tsx
const TechTag = styled.span`
  background: var(--chip);
  color: var(--text);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;
```

```tsx
const LiveLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.25rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--text);
  }
`;
```

- [ ] **Step 2: In `src/components/Education.tsx`, replace these styled-component definitions:**

```tsx
const EducationSection = styled.section`
  padding: 100px 0;
  background: var(--surface-alt);
  color: var(--text);
`;
```

```tsx
const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: var(--text);
`;
```

```tsx
const EducationCard = styled(motion.div)`
  background: var(--surface);
  border-radius: 18px;
  padding: 2rem;
  border: 1px solid var(--hairline);
  max-width: 600px;
  margin: 0 auto;
`;
```

```tsx
const Degree = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.5rem;
`;
```

```tsx
const University = styled.h4`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;
```

```tsx
const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
`;
```

```tsx
const TrackInfo = styled.div`
  background: var(--chip);
  color: var(--text);
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
`;
```

```tsx
const GPA = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--text);
  font-size: 1.1rem;
`;
```

- [ ] **Step 3: In `src/components/Contact.tsx`, replace these styled-component definitions:**

```tsx
const ContactSection = styled.section`
  padding: 100px 0;
  background: var(--bg);
  color: var(--text);
`;
```

```tsx
const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: var(--text);
`;
```

```tsx
const ContactCard = styled(motion.div)`
  background: var(--surface);
  border-radius: 18px;
  padding: 2rem;
  border: 1px solid var(--hairline);
  text-align: center;
  transition: background 0.3s ease;

  &:hover {
    background: #252527;
  }
`;
```

```tsx
const ContactIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--chip);
  border: 1px solid var(--hairline);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.5rem;
`;
```

```tsx
const ContactInfo = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
`;
```

```tsx
const ContactLink = styled.a`
  color: var(--text);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: var(--text-secondary);
  }
`;
```

```tsx
const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--chip);
  border: 1px solid var(--hairline);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
  font-size: 1.2rem;
  transition: background 0.3s ease;

  &:hover {
    background: #3d3d3f;
  }
`;
```

- [ ] **Step 4: Run tests**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: 7/7 pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects.tsx src/components/Education.tsx src/components/Contact.tsx
git commit -m "Restyle projects, education, and contact sections to dark minimal theme"
```

---

### Task 5: Verify no purple remains, build, and push

**Files:**
- No file changes expected. Verification only (a leftover-color fix, if found, modifies only the file containing it).

**Interfaces:**
- Consumes: the fully restyled components from Tasks 1-4.
- Produces: verified build + pushed branch.

- [ ] **Step 1: Grep for leftover theme colors in source**

Run: `grep -rn "667eea\|764ba2\|f8fafc\|1a202c\|4a5568\|718096\|e2e8f0\|Inter" src/ --include="*.tsx" --include="*.ts" | grep -v ".test."`
Expected: no output. Any hit is a missed swap — fix it with the corresponding token from Global Constraints and include the fix in this task's report.

- [ ] **Step 2: Full test suite**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: 7/7 pass.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: "Compiled successfully." — no TypeScript errors, no new ESLint warnings. Afterwards restore tracked build artifacts: `git checkout -- build/ 2>/dev/null || true`, then confirm `git status --short` shows no modified tracked files.

- [ ] **Step 4: Optional visual check (only if chrome-devtools MCP is attached)**

Check availability via ToolSearch "select:mcp__chrome-devtools__navigate_page". If available: `BROWSER=none npm start` in background, navigate attached Chrome to http://localhost:3000, screenshot hero + one card section, confirm dark theme renders (black background, white text, no purple), check console for errors, stop the server. If unavailable: skip with a note — never fall back to the Playwright MCP.

- [ ] **Step 5: Push**

```bash
git push -u origin restyle-dark-minimal
```
Expected: branch pushed; owner merges via PR. Never merge to main locally.
