import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
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
