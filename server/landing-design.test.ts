import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

describe("realistic slice landing rebuild", () => {
  it("keeps the established colour tokens and accessible reduced-motion support", async () => {
    const styles = await readFile(resolve(projectRoot, "client/src/index.css"), "utf8");

    expect(styles).toContain("--midnight-plum: #170f1c");
    expect(styles).toContain("--tomato-coral: #ff5a47");
    expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
    expect(styles).toContain(".slice-opening__image { transition: none; transform: none !important; }");
    expect(styles).toContain(".hero--slice-opening");
    expect(styles).not.toContain("pizza-scene__");
  });

  it("uses one dedicated photographic pizza slice instead of the old decorative scene layers", async () => {
    const scene = await readFile(resolve(projectRoot, "client/src/components/PizzaScene.tsx"), "utf8");

    expect(scene).toContain('const SLICE_IMAGE = "/manus-storage/pizza-slice-3d-hero');
    expect(scene).toContain("slice-opening__image");
    expect(scene).toContain("pointer tilt");
    expect(scene).not.toContain("pizza-scene__orbit");
    expect(scene).not.toContain("pizza-scene__depth-grid");
    expect(scene).not.toContain("pizza-scene__heat");
  });

  it("replaces the animated marquee with a straightforward scroll cue into the live menu", async () => {
    const home = await readFile(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");

    expect(home).toContain('className="scroll-cue" href="#menu"');
    expect(home).toContain('className="opening-divider"');
    expect(home).not.toContain('className="marquee"');
  });

  it("defines explicit desktop and mobile rules for the simplified slice opening", async () => {
    const styles = await readFile(resolve(projectRoot, "client/src/index.css"), "utf8");

    expect(styles).toContain("@media (max-width: 880px) { .hero--slice-opening");
    expect(styles).toContain(".hero--slice-opening .hero-stage { position: absolute");
    expect(styles).toContain("@media (max-width: 580px) { .hero--slice-opening");
    expect(styles).toContain(".slice-opening__image { width: min(60%, 260px)");
  });

  it("keeps the location experience useful if the external map script is unavailable", async () => {
    const map = await readFile(resolve(projectRoot, "client/src/components/Map.tsx"), "utf8");

    expect(map).toContain("setIsUnavailable(true)");
    expect(map).toContain("map-fallback");
    expect(map).not.toContain('console.error("Failed to load Google Maps script")');
  });

  it("does not hardcode customer ratings or review counts", async () => {
    const home = await readFile(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");

    expect(home).not.toContain("4.3 / 5");
    expect(home).not.toContain("58 Reviews");
    expect(home).not.toContain("58 reviews");
    expect(home).not.toContain("rating-chip");
    expect(home).not.toContain("rating-hero");
  });
});
