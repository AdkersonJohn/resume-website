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
