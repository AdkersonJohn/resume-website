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
