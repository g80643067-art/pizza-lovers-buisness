import type { MenuItem } from "@/data/menu";

/**
 * Search menu names and categories while keeping whitespace and casing forgiving.
 */
export function filterMenuItems(items: MenuItem[], query: string): MenuItem[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  if (!normalizedQuery) return items;

  return items.filter((item) =>
    `${item.name} ${item.category}`.toLocaleLowerCase().includes(normalizedQuery),
  );
}

export function getVisibleMenuItems(items: MenuItem[], activeCategory: string, query: string): MenuItem[] {
  return query.trim()
    ? filterMenuItems(items, query)
    : items.filter((item) => item.category === activeCategory);
}

export type MenuSelection = {
  activeCategory: string;
  searchQuery: string;
};

export function selectMenuCategory(selection: MenuSelection, category: string): MenuSelection {
  return { activeCategory: category, searchQuery: "" };
}
