import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

describe("realistic slice landing rebuild", () => {
  it("keeps the established colour tokens and accessible reduced-motion support", async () => {
    const styles = await readFile(resolve(projectRoot, "client/src/index.css"), "utf8");

    expect(styles).toContain("--ink: #080808");
    expect(styles).toContain("--gold: #d4af37");
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

    expect(styles).toContain("@media (max-width: 760px)");
    expect(styles).toContain(".hero-stage { position: absolute");
    expect(styles).toContain("@media (max-width: 560px)");
    expect(styles).toContain("width: min(60%, 520px)");
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

  it("keeps the primary navigation and cart/order triggers wired after the header logo swap", async () => {
    const home = await readFile(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");

    expect(home).toContain('<a href="#menu">Menu</a>');
    expect(home).toContain('<a href="#story">Our Story</a>');
    expect(home).toContain('<a href="#location">Location</a>');
    expect(home).toContain('className="nav-order" onClick={openCart}');
    expect(home).toContain('className="cart-order" onClick={openCart}');
    expect(home).toContain("<CartDrawer />");
  });

  it("uses the requested self-contained SVG pizza logo in the shared brand mark", async () => {
    const home = await readFile(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
    const logo = await readFile(resolve(projectRoot, "client/src/components/PizzaLogo.tsx"), "utf8");

    expect(home).toContain('import { PizzaLogo } from "@/components/PizzaLogo";');
    expect(home).toContain('<Brand useCustomLogo />');
    expect(home).toContain('<PizzaLogo className="brand-mark" />');
    expect(home).toContain('brand-mark brand-mark--legacy');
    expect(logo).toContain('viewBox="0 0 360 360"');
    expect(logo).toContain("BEST IN TOWN");
    expect(logo).toContain("DELIVERY");
    expect(logo).toContain("The Pizza Lover&apos;s");
    expect(logo).toContain("Eat with Love");
    expect(logo).not.toContain("<image");
    expect(logo).not.toContain("http://");
    expect(logo).not.toContain("https://");
  });
});
