import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { MENU_CATEGORIES, MENU_DISPLAY_CATEGORIES, MENU_ITEMS } from "../client/src/data/menu";
import { filterMenuItems, getVisibleMenuItems, selectMenuCategory } from "../client/src/lib/menu-search";

async function readHome() {
  return await readFile(resolve(import.meta.dirname, "../client/src/pages/Home.tsx"), "utf8");
}

describe("exact restaurant menu", () => {
  it("preserves the exact source menu and exposes the requested display categories", () => {
    expect(MENU_CATEGORIES).toHaveLength(15);
    expect(MENU_DISPLAY_CATEGORIES).toEqual(["Pizza", "Maggie", "Burger", "Sandwich", "Pasta", "Momos", "Snacks", "Beverages", "Combos"]);
    expect(MENU_ITEMS).toHaveLength(61);
    expect(MENU_ITEMS.find(item => item.name === "Cheese Pizza")?.prices).toEqual({ S: 75, M: 165, L: 265 });
    expect(MENU_ITEMS.find(item => item.name === "The Pizza Lover's Special")?.prices).toEqual({ S: 175, M: 335, L: 465 });
    expect(MENU_ITEMS.find(item => item.name === "Medium Pizza + 2 Coke")?.prices).toEqual({ M: 209 });
    expect(MENU_ITEMS.find(item => item.name === "Chillie Stuffed Garlic Bread")?.prices).toEqual({ M: 120 });
  });

  it("searches item names and all category labels without being sensitive to case or spacing", () => {
    expect(filterMenuItems(MENU_ITEMS, "  PIZZA LOVER'S  ").map(item => item.name)).toEqual(["The Pizza Lover's Special"]);
    expect(filterMenuItems(MENU_ITEMS, "combo")).toHaveLength(6);
    expect(filterMenuItems(MENU_ITEMS, "maggie")).toHaveLength(2);
    expect(filterMenuItems(MENU_ITEMS, "   ")).toBe(MENU_ITEMS);
    expect(filterMenuItems(MENU_ITEMS, "not on this menu")).toEqual([]);
  });

  it("keeps search global and restores either display-category or source-category results when search is cleared", () => {
    const searchResults = getVisibleMenuItems(MENU_ITEMS, "Pizza", "combo");
    const displayCategoryResults = getVisibleMenuItems(MENU_ITEMS, "Pizza", "");
    const sourceCategoryResults = getVisibleMenuItems(MENU_ITEMS, "Pizza — Premium", "");

    expect(searchResults).toHaveLength(6);
    expect(searchResults.every(item => item.category.includes("Combo") || item.category === "Combo")).toBe(true);
    expect(displayCategoryResults).toHaveLength(20);
    expect(displayCategoryResults.every(item => item.menuCategory === "Pizza")).toBe(true);
    expect(sourceCategoryResults).toHaveLength(8);
    expect(sourceCategoryResults.every(item => item.category === "Pizza — Premium")).toBe(true);
  });

  it("models the search-to-category selection transition", () => {
    let selection = { activeCategory: "Pizza", searchQuery: "combo" };

    expect(getVisibleMenuItems(MENU_ITEMS, selection.activeCategory, selection.searchQuery)).toHaveLength(6);

    selection = selectMenuCategory(selection, "Maggie");

    expect(selection).toEqual({ activeCategory: "Maggie", searchQuery: "" });
    expect(getVisibleMenuItems(MENU_ITEMS, selection.activeCategory, selection.searchQuery)).toHaveLength(2);
  });

  it("renders category controls, detail affordances, and item metadata hooks", async () => {
    const home = await readHome();

    expect(home).toContain("MENU_DISPLAY_CATEGORIES.map");
    expect(home).toContain("aria-selected={isActive}");
    expect(home).toContain("menu-category-card");
    expect(home).toContain("onClick={() => handleCategorySelect(category)}");
    expect(home).toContain("selectMenuCategory({ activeCategory, searchQuery }, category)");
    expect(home).toContain("<DetailModal item={selectedItem}");
    expect(home).toContain("View Details");
    expect(home).toContain("Interested");
    expect(home).toContain("Order Now");
  });

  it("keeps the exact delivery numbers in the storefront contact actions", async () => {
    const home = await readHome();

    expect(home).toContain("9369722736");
    expect(home).toContain("7007800532");
    expect(home).not.toContain("7007805053");
  });

  it("adds Instagram and Facebook only at the bottom of the contact card", async () => {
    const home = await readHome();
    const contactStart = home.indexOf('className="location-info"');
    const socialLinksStart = home.indexOf('className="social-links"');
    const mapStart = home.indexOf('className="map-frame"');

    expect(home).toContain("Instagram");
    expect(home).toContain("Facebook");
    expect(home).toContain("https://www.instagram.com/the_pizza_lovers_/");
    expect(home).toContain("https://www.facebook.com/The.Pizza.Lovers/posts/food-pizza-takiya/122270990516086142/");
    expect(home.match(/https:\/\/www\.instagram\.com\/the_pizza_lovers_\//g)).toHaveLength(1);
    expect(home.match(/https:\/\/www\.facebook\.com\/The\.Pizza\.Lovers\/posts\/food-pizza-takiya\/122270990516086142\//g)).toHaveLength(1);
    expect(home).toContain('aria-label="Instagram"');
    expect(home).toContain('aria-label="Facebook"');
    expect(home).toContain('target="_blank" rel="noopener noreferrer"');
    expect(socialLinksStart).toBeGreaterThan(contactStart);
    expect(socialLinksStart).toBeLessThan(mapStart);
  });

  it("maps one unique image to every menu item", () => {
    const imageUrls = MENU_ITEMS.map(item => item.image);

    expect(imageUrls).toHaveLength(61);
    expect(imageUrls.every(Boolean)).toBe(true);
    expect(new Set(imageUrls).size).toBe(61);
  });

  it("keeps duplicate item names distinct by source category", () => {
    const paneerTikka = MENU_ITEMS.filter(item => item.name === "Paneer Tikka");
    expect(paneerTikka).toHaveLength(2);
    expect(new Set(paneerTikka.map(item => item.id)).size).toBe(2);
  });
});
