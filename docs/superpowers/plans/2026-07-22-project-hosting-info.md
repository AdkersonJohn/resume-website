# Project Hosting Info Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a verified hosting/deployment line to each of the seven project cards.

**Architecture:** `src/components/Projects.tsx` gains a required `hosting: string` on its `Project` interface, a `HostingRow` styled component (icon + gray text using existing dark-theme tokens), and one render line per card between the tech tags and the View Live link. A new test locks in the seven strings.

**Tech Stack:** React 18 + TypeScript (CRA), styled-components 6, react-icons (Fi), Jest + RTL via `react-scripts test`.

## Global Constraints

- Hosting strings must match the spec verbatim, including the middle dot `·` separator (U+00B7). They appear in both the component and the test — byte-identical.
- Dark-theme tokens only (`var(--text-secondary)`); no new colors.
- Only `src/components/Projects.tsx` and `src/components/Projects.test.tsx` change. No changes to tech-tag chips, other card elements, other components, or content strings.
- Existing 7 tests pass unchanged; suite becomes 8/8.
- Work on branch `add-project-hosting-info`. Never commit to main.

---

### Task 1: Hosting field, row, and test

**Files:**
- Modify: `src/components/Projects.tsx` (import list, one new styled component, `Project` interface, seven array entries, one JSX block)
- Test: `src/components/Projects.test.tsx` (append one test)

**Interfaces:**
- Consumes: existing `Project` interface `{ title, technology, icon, description, techStack, liveUrl? }` and the dark-theme CSS variables.
- Produces: `Project.hosting: string` (required) rendered in `HostingRow`. Task 2 relies only on rendered output.

- [ ] **Step 1: Write the failing test**

Append to `src/components/Projects.test.tsx`:

```tsx
test("renders hosting details for all seven projects", () => {
  render(<Projects />);
  const hosting = [
    "AWS EC2 · S3 + CloudFront · Firestore · custom domain",
    "Docker Compose on VPS · GitHub Actions zero-downtime CI/CD · S3 media",
    "Offline-first, no backend · on-device SQLite · App Store via Expo EAS",
    "Native desktop/iOS via Tauri · no server, physics runs locally",
    "AWS via Terraform · S3 + CloudFront · ECS Fargate + ALB · GitHub Actions",
    "Microsoft Power Platform (M365 cloud) · SharePoint backend",
    "Runs entirely on-watch · local-network multiplayer · TestFlight",
  ];
  hosting.forEach((h) => {
    expect(screen.getByText(h)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true npx react-scripts test src/components/Projects.test.tsx --watchAll=false`
Expected: FAIL — new test fails with "Unable to find an element with the text: AWS EC2 · S3 + CloudFront · Firestore · custom domain"; the 3 existing tests still pass.

- [ ] **Step 3: Implement in `src/components/Projects.tsx`**

3a. Add `FiServer` to the existing react-icons import:

```tsx
import {
  FiMapPin,
  FiShare2,
  FiActivity,
  FiTarget,
  FiShoppingBag,
  FiCamera,
  FiWatch,
  FiExternalLink,
  FiServer,
} from "react-icons/fi";
```

3b. Add this styled component directly after the `LiveLink` definition:

```tsx
const HostingRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 1.25rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;

  svg {
    flex-shrink: 0;
    margin-top: 0.15rem;
  }
`;
```

3c. Add `hosting: string;` to the `Project` interface after `techStack: string[];`.

3d. Add a `hosting` property to each of the seven entries in the `projects` array, immediately after its `techStack` array (before `liveUrl` where present), copying these values exactly:

- Camp Scout: `hosting: "AWS EC2 · S3 + CloudFront · Firestore · custom domain",`
- AutoSocials: `hosting: "Docker Compose on VPS · GitHub Actions zero-downtime CI/CD · S3 media",`
- GainsIQ: `hosting: "Offline-first, no backend · on-device SQLite · App Store via Expo EAS",`
- Castle Killer: `hosting: "Native desktop/iOS via Tauri · no server, physics runs locally",`
- GRA Website: `hosting: "AWS via Terraform · S3 + CloudFront · ECS Fargate + ALB · GitHub Actions",`
- Asset Tag Scanner: `hosting: "Microsoft Power Platform (M365 cloud) · SharePoint backend",`
- Pong With Friends: `hosting: "Runs entirely on-watch · local-network multiplayer · TestFlight",`

3e. In the JSX, insert between `</ProjectTech>` and the `{project.liveUrl && (` block:

```tsx
              <HostingRow>
                <FiServer />
                {project.hosting}
              </HostingRow>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `CI=true npx react-scripts test src/components/Projects.test.tsx --watchAll=false`
Expected: PASS — 4/4 in this file.

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects.tsx src/components/Projects.test.tsx
git commit -m "Add hosting details to project cards"
```

---

### Task 2: Full-suite, build, and push

**Files:**
- No file changes. Verification only.

**Interfaces:**
- Consumes: rendered output from Task 1.
- Produces: verified build + pushed branch.

- [ ] **Step 1: Full test suite**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: 8/8 (4 Projects + 4 Experience).

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: "Compiled successfully." — no new warnings. Afterwards: `git checkout -- build/ 2>/dev/null || true`; delete any NEW untracked files under `build/static/` created by this build; confirm `git status --short` shows no modified tracked files.

- [ ] **Step 3: Optional visual check (only if chrome-devtools MCP is attached)**

Check ToolSearch "select:mcp__chrome-devtools__navigate_page". If available: dev server in background, navigate to http://localhost:3000, confirm hosting rows render under tech tags on all seven cards, no console errors, stop server. If unavailable: skip with a note. Never fall back to the Playwright MCP.

- [ ] **Step 4: Push**

```bash
git push -u origin add-project-hosting-info
```
Expected: branch pushed; owner merges via PR. Never merge to main locally.
