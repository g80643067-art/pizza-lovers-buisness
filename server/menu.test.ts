import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { MENU_CATEGORIES, MENU_ITEMS } from "../client/src/data/menu";

describe("exact restaurant menu", () => {
  it("contains every requested category and preserves representative prices", () => {
    expect(MENU_CATEGORIES).toHaveLength(15);
    expect(MENU_ITEMS).toHaveLength(61);
    expect(MENU_ITEMS.find(item => item.name === "Cheese Pizza")?.prices).toEqual({ S: 75, M: 165, L: 265 });
    expect(MENU_ITEMS.find(item => item.name === "The Pizza Lover's Special")?.prices).toEqual({ S: 175, M: 335, L: 465 });
    expect(MENU_ITEMS.find(item => item.name === "Medium Pizza + 2 Coke")?.prices).toEqual({ M: 209 });
    expect(MENU_ITEMS.find(item => item.name === "Chillie Stuffed Garlic Bread")?.prices).toEqual({ M: 120 });
  });

  it("keeps the exact delivery numbers in the storefront contact actions", async () => {
    const home = await readFile(resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");

    expect(home).toContain("9369722736");
    expect(home).toContain("7007800532");
    expect(home).not.toContain("7007805053");
  });

  it("keeps duplicate item names distinct by category", () => {
    const paneerTikka = MENU_ITEMS.filter(item => item.name === "Paneer Tikka");
    expect(paneerTikka).toHaveLength(2);
    expect(new Set(paneerTikka.map(item => item.id)).size).toBe(2);
  });
});
