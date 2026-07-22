# Projects Section Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the three outdated projects in the resume site's Projects section with seven recent projects and add an optional "View Live" link to cards with public URLs.

**Architecture:** Single-component content change. `src/components/Projects.tsx` holds a hardcoded `projects` array rendered as styled-components cards; we extend the entry shape with an optional `liveUrl` field, add one styled anchor, and swap the content. A Jest/RTL test locks in the new content and link behavior.

**Tech Stack:** React 18 + TypeScript (Create React App), styled-components 6, framer-motion 10, react-icons (Fi set), Jest + React Testing Library (via `react-scripts test`).

## Global Constraints

- Only `src/components/Projects.tsx` is modified; a new test file is created. No other component, style, or layout changes.
- Card order (spec): Camp Scout, AutoSocials, GainsIQ, Castle Killer, GRA Website, Asset Tag Scanner, Pong With Friends.
- Only Camp Scout (`https://campscout.tech`) and AutoSocials (`https://autosocials.work`) get `liveUrl`.
- Live links must use `target="_blank"` and `rel="noopener noreferrer"`.
- Copy must not claim App Store publication for GainsIQ, Castle Killer, or Pong With Friends (all pre-release). Use the exact descriptions from the spec (`docs/superpowers/specs/2026-07-22-projects-section-update-design.md`), reproduced verbatim in Task 1 below.
- Work happens on the already-created `update-projects-section` branch. Never commit to main.

---

### Task 1: New projects content + View Live link

**Files:**
- Modify: `src/components/Projects.tsx` (whole file content given below)
- Test: `src/components/Projects.test.tsx` (create)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `Projects` React component (default export, unchanged signature) rendering seven cards; entries typed as `interface Project { title: string; technology: string; icon: React.ReactElement; description: string; techStack: string[]; liveUrl?: string }`. Task 2 relies only on the rendered output.

- [ ] **Step 1: Write the failing test**

Create `src/components/Projects.test.tsx`:

```tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Projects from "./Projects";

beforeAll(() => {
  // jsdom lacks IntersectionObserver, which framer-motion's whileInView uses
  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  (window as any).IntersectionObserver = MockIntersectionObserver;
});

test("renders all seven current projects in order", () => {
  render(<Projects />);
  const titles = [
    "Camp Scout",
    "AutoSocials",
    "GainsIQ",
    "Castle Killer",
    "GRA Website",
    "Asset Tag Scanner",
    "Pong With Friends",
  ];
  const headings = screen.getAllByRole("heading", { level: 3 });
  expect(headings.map((h) => h.textContent)).toEqual(titles);
});

test("old help-desk projects are gone", () => {
  render(<Projects />);
  expect(screen.queryByText("Classroom Monitoring Interface")).toBeNull();
  expect(screen.queryByText("Jira Issue Tagging System")).toBeNull();
  expect(screen.queryByText("Proctor Camera Centering System")).toBeNull();
});

test("live links exist only for Camp Scout and AutoSocials with safe attributes", () => {
  render(<Projects />);
  const links = screen.getAllByRole("link", { name: /view live/i });
  expect(links).toHaveLength(2);
  expect(links[0]).toHaveAttribute("href", "https://campscout.tech");
  expect(links[1]).toHaveAttribute("href", "https://autosocials.work");
  links.forEach((link) => {
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true npx react-scripts test src/components/Projects.test.tsx --watchAll=false`
Expected: FAIL — first test's heading list contains "Classroom Monitoring Interface" etc. instead of the new titles; third test fails with "Unable to find role=link".

- [ ] **Step 3: Replace `src/components/Projects.tsx` with the new implementation**

Full new file content (styled components above the data are unchanged from the current file except for the added `LiveLink`):

```tsx
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiShare2,
  FiActivity,
  FiTarget,
  FiShoppingBag,
  FiCamera,
  FiWatch,
  FiExternalLink,
} from "react-icons/fi";

const ProjectsSection = styled.section`
  padding: 100px 0;
  background: #f8fafc;
  color: #1a202c;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #1a202c;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const ProjectCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ProjectIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #1a202c;
`;

const ProjectDescription = styled.p`
  color: #4a5568;
  line-height: 1.7;
  margin-bottom: 1rem;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const LiveLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.25rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: #667eea;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #764ba2;
  }
`;

interface Project {
  title: string;
  technology: string;
  icon: React.ReactElement;
  description: string;
  techStack: string[];
  liveUrl?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "Camp Scout",
      technology: "Full-Stack SaaS",
      icon: <FiMapPin />,
      description:
        "Full-stack campsite monitoring and auto-booking platform for Recreation.gov. Watches for availability, alerts users via email/SMS/push, and completes bookings automatically with browser automation. Includes Stripe subscription billing and iOS/Android apps via Capacitor.",
      techStack: [
        "React",
        "Node.js",
        "Firebase",
        "Playwright",
        "Stripe",
        "AWS",
        "Twilio",
      ],
      liveUrl: "https://campscout.tech",
    },
    {
      title: "AutoSocials",
      technology: "Full-Stack SaaS",
      icon: <FiShare2 />,
      description:
        "Social media automation SaaS that publishes video and photo content to Instagram, X, Facebook, Threads, and YouTube from a single submission — with scheduling, a unified comments/DM inbox, analytics, and zero-downtime Docker CI/CD with automatic rollback.",
      techStack: [
        "React",
        "TypeScript",
        "Node.js",
        "Firestore",
        "Redis",
        "FFmpeg",
        "Docker",
      ],
      liveUrl: "https://autosocials.work",
    },
    {
      title: "GainsIQ",
      technology: "iOS App",
      icon: <FiActivity />,
      description:
        "Offline-first iOS workout tracker with a research-backed progression coaching engine — estimated-1RM tracking, plateau detection, deload timing, and in-workout weight/rep suggestions. Local SQLite database, no accounts required.",
      techStack: ["React Native", "Expo", "TypeScript", "SQLite", "Drizzle ORM"],
    },
    {
      title: "Castle Killer",
      technology: "3D Game",
      icon: <FiTarget />,
      description:
        "3D castle-destruction artillery game with a custom multi-core Rust physics engine (Rapier3D) — support-graph collapse cascades, ragdoll soldiers, and destructible brick-by-brick castles. Ships as a native desktop/iOS app via Tauri with a hand-built AdMob plugin.",
      techStack: [
        "Rust",
        "Three.js",
        "Rapier3D",
        "Tauri",
        "WebAssembly",
        "Swift",
      ],
    },
    {
      title: "GRA Website",
      technology: "E-Commerce",
      icon: <FiShoppingBag />,
      description:
        "E-commerce and brand platform for the GRA apparel line: Shopify Storefront checkout, a real-time GraphQL admin CMS with role-based access and live updates over WebSockets, and custom WebGL shader visuals. Deployed to AWS with Terraform and GitHub Actions.",
      techStack: [
        "React",
        "TypeScript",
        "GraphQL",
        "Shopify",
        "Firebase",
        "AWS",
        "Terraform",
      ],
    },
    {
      title: "Asset Tag Scanner",
      technology: "Enterprise IT",
      icon: <FiCamera />,
      description:
        "Power Apps barcode-scanning app used during hardware refresh cycles — scans device asset tags and cross-references SharePoint to instantly flag which machines need cut sheets, including nonstandard-device and missing-inventory detection.",
      techStack: ["Power Apps", "SharePoint", "Power Fx", "Microsoft 365"],
    },
    {
      title: "Pong With Friends",
      technology: "watchOS Game",
      icon: <FiWatch />,
      description:
        "Native Apple Watch Pong with Digital Crown paddle control and real-time watch-to-watch multiplayer — host-authoritative netcode over Apple's Network framework, 60fps SwiftUI Canvas rendering, and haptic feedback.",
      techStack: ["Swift", "SwiftUI", "watchOS", "Network framework"],
    },
  ];

  return (
    <ProjectsSection id="projects">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </SectionTitle>

        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ProjectHeader>
                <ProjectIcon>{project.icon}</ProjectIcon>
                <div>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <TechTag>{project.technology}</TechTag>
                </div>
              </ProjectHeader>

              <ProjectDescription>{project.description}</ProjectDescription>

              <ProjectTech>
                {project.techStack.map((tech, idx) => (
                  <TechTag key={idx}>{tech}</TechTag>
                ))}
              </ProjectTech>

              {project.liveUrl && (
                <LiveLink
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Live <FiExternalLink />
                </LiveLink>
              )}
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `CI=true npx react-scripts test src/components/Projects.test.tsx --watchAll=false`
Expected: PASS — 3 tests passing.

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects.tsx src/components/Projects.test.tsx
git commit -m "Update Projects section with seven recent projects and live links"
```

---

### Task 2: Build and visual verification

**Files:**
- No file changes. Verification only.

**Interfaces:**
- Consumes: the rendered `Projects` component from Task 1.
- Produces: verified production build + visual confirmation.

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: "Compiled successfully." — no TypeScript errors, no new ESLint warnings (an unused-import warning here would fail CI per repo history, so treat any new warning as a failure).

- [ ] **Step 2: Start the dev server in the background**

Run: `BROWSER=none npm start` (background)
Expected: "Compiled successfully" and app served at http://localhost:3000.

- [ ] **Step 3: Visual check in the attached Chrome (browser-attach — NOT Playwright MCP)**

Use the `chrome-devtools` MCP per the system-wide rule:
1. `mcp__chrome-devtools__navigate_page` to `http://localhost:3000`.
2. `mcp__chrome-devtools__take_snapshot` — confirm seven project headings in spec order and two "View Live" links.
3. `mcp__chrome-devtools__take_screenshot` of the Projects section — confirm cards render cleanly, icons visible, grid intact.
4. `mcp__chrome-devtools__list_console_messages` — no new errors.
If Chrome isn't reachable on 127.0.0.1:9222, launch it with `bash /Volumes/bingobango/code/browser-attach/scripts/start-chrome.sh`, then retry. Do not fall back to Playwright MCP.

- [ ] **Step 4: Clean up**

Stop the dev server. Delete any screenshot files saved into the repo (per testing-hygiene rules); screenshots taken via MCP that only live in the conversation need no cleanup.

- [ ] **Step 5: Push the branch**

```bash
git push -u origin update-projects-section
```
Expected: branch pushed; owner merges via PR on GitHub. Never merge to main locally.
