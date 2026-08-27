import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

describe("midnight-plum landing design", () => {
  it("defines the refreshed brand palette and accessible motion fallback", async () => {
    const styles = await readFile(resolve(projectRoot, "client/src/index.css"), "utf8");

    expect(styles).toContain("--midnight-plum: #170f1c");
    expect(styles).toContain("--tomato-coral: #ff5a47");
    expect(styles).toContain("--saffron-glow: #f8ba52");
    expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("keeps the hero a photographic scene with explicit dimensional layers", async () => {
    const scene = await readFile(resolve(projectRoot, "client/src/components/PizzaScene.tsx"), "utf8");

    expect(scene).toContain("pizza-scene__depth-grid");
    expect(scene).toContain("pizza-scene__orbit-line");
    expect(scene).toContain("pizza-scene__undershadow");
    expect(scene).toContain("pizza-scene__heat");
    expect(scene).toContain("pizza-scene__slice");
    expect(scene).toContain("pizza-slice-3d-hero");
    expect(scene).toContain("pizza-lovers-realistic-hero");
  });

  it("provides a reduced-motion fallback for the floating pizza slice", async () => {
    const styles = await readFile(resolve(projectRoot, "client/src/index.css"), "utf8");

    expect(styles).toContain("slice-float");
    expect(styles).toContain(".pizza-scene__slice-float { animation: none; }");
  });

  it("mounts the dedicated slice asset with desktop and mobile positioning rules", async () => {
    const [scene, styles] = await Promise.all([
      readFile(resolve(projectRoot, "client/src/components/PizzaScene.tsx"), "utf8"),
      readFile(resolve(projectRoot, "client/src/index.css"), "utf8"),
    ]);

    expect(scene).toContain('const SLICE_IMAGE = "/manus-storage/pizza-slice-3d-hero');
    expect(scene).toContain("<img src={SLICE_IMAGE}");
    expect(styles).toContain("@media (max-width: 880px) { .pizza-scene__slice-orbit");
    expect(styles).toContain("@media (max-width: 580px) { .mobile-bar");
  });

  it("keeps the location experience useful if the external map script is unavailable", async () => {
    const map = await readFile(resolve(projectRoot, "client/src/components/Map.tsx"), "utf8");

    expect(map).toContain("setIsUnavailable(true)");
    expect(map).toContain("map-fallback");
    expect(map).not.toContain('console.error("Failed to load Google Maps script")');
  });
});
