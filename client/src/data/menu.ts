export type MenuSize = "S" | "M" | "L";

/** Legacy source categories retained for exact menu fidelity and search compatibility. */
export const MENU_CATEGORIES = [
  "Pizza — Basic",
  "Pizza — Special",
  "Pizza — Premium",
  "Extras",
  "Veg Combo Double",
  "Medium Combo",
  "Coffee",
  "Burger",
  "Sandwich",
  "French Fries",
  "Cold Drinks",
  "Maggi",
  "Side Orders",
  "Other Items",
  "Combo",
] as const;

/** User-facing categories used by the interactive menu navigation. */
export const MENU_DISPLAY_CATEGORIES = [
  "Pizza",
  "Maggie",
  "Burger",
  "Sandwich",
  "Pasta",
  "Momos",
  "Snacks",
  "Beverages",
  "Combos",
] as const;

export type LegacyMenuCategory = (typeof MENU_CATEGORIES)[number];
export type MenuCategory = (typeof MENU_DISPLAY_CATEGORIES)[number];

export type MenuItem = {
  id: string;
  name: string;
  category: LegacyMenuCategory;
  menuCategory: MenuCategory;
  subcategory?: string;
  prices: Partial<Record<MenuSize, number>>;
  image: string;
  shortDescription: string;
  description: string;
  ingredients: string[];
  isVegetarian: boolean;
  reviewLabel: string;
  reviewCount: number;
};

type MenuItemOverrides = Partial<Pick<MenuItem, "subcategory" | "shortDescription" | "description" | "ingredients" | "isVegetarian" | "reviewLabel" | "reviewCount">> & { id?: string };

type MenuCopy = {
  shortDescription: string;
  description: string;
  ingredients: string[];
};

const CATEGORY_COPY: Record<MenuCategory, MenuCopy> = {
  Pizza: {
    shortDescription: "A crisp, cheesy bake layered with generous vegetarian toppings.",
    description: "Hand-finished with a golden cheese melt and a generous layer of fresh vegetarian toppings, then baked for a warm, crisp edge and soft centre.",
    ingredients: ["Pizza base", "Tomato sauce", "Mozzarella", "Fresh vegetables", "Italian herbs"],
  },
  Maggie: {
    shortDescription: "A comforting, masala-tossed bowl with a warm homemade feel.",
    description: "A comforting bowl of noodles tossed with aromatic masala, fresh vegetables, and the easy-going warmth that makes a quick meal feel special.",
    ingredients: ["Noodles", "Vegetables", "Masala seasoning", "Onion", "Coriander"],
  },
  Burger: {
    shortDescription: "A soft bun, a hearty filling, and a satisfying toasted finish.",
    description: "A generously filled vegetarian burger with fresh crunch, creamy layers, and a toasted bun that brings every bite together.",
    ingredients: ["Toasted bun", "Vegetarian patty", "Lettuce", "Onion", "House sauces"],
  },
  Sandwich: {
    shortDescription: "Fresh, toasted, and layered for an easy, satisfying bite.",
    description: "Toasted bread layered with a savoury vegetarian filling, fresh vegetables, and a creamy finish for a balanced handheld meal.",
    ingredients: ["Bread", "Vegetarian filling", "Cheese", "Fresh vegetables", "House spread"],
  },
  Pasta: {
    shortDescription: "Creamy, comforting pasta finished with familiar Indian flavours.",
    description: "A generous portion of pasta folded through a velvety sauce and finished with vegetables, herbs, and a little extra comfort.",
    ingredients: ["Pasta", "Creamy sauce", "Vegetables", "Cheese", "Herbs"],
  },
  Momos: {
    shortDescription: "Soft dumplings with a savoury filling and a bright dip.",
    description: "Tender vegetarian dumplings filled with a savoury mix, steamed until soft, and served with a lively dipping sauce.",
    ingredients: ["Momo wrappers", "Cabbage", "Carrot", "Onion", "Spiced dip"],
  },
  Snacks: {
    shortDescription: "Small plates and sides made for sharing, dipping, and adding on.",
    description: "A table-friendly snack with a crisp, warm, or cheesy finish—made to round out the order or keep the conversation going.",
    ingredients: ["Seasoned vegetables", "Cheese", "Flour", "Herbs", "House seasoning"],
  },
  Beverages: {
    shortDescription: "A refreshing pour or warm cup to complete the table.",
    description: "A simple, satisfying drink selected to pair easily with a hot, loaded meal and keep every table refreshed.",
    ingredients: ["Premium beverage", "Chilled water or milk", "Ice", "Optional house garnish"],
  },
  Combos: {
    shortDescription: "A considered pairing for an easy, generous meal.",
    description: "A ready-to-enjoy combination built around familiar favourites, with the right balance of savoury bites and something refreshing.",
    ingredients: ["Selected combo item", "Freshly prepared side", "Refreshing drink", "House seasoning"],
  },
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function item(
  category: LegacyMenuCategory,
  menuCategory: MenuCategory,
  name: string,
  prices: Partial<Record<MenuSize, number>>,
  image: string,
  overrides: MenuItemOverrides = {},
): MenuItem {
  const copy = CATEGORY_COPY[menuCategory];
  const { id: overrideId, ...details } = overrides;
  return {
    id: overrideId ?? slugify(`${category}-${name}`),
    name,
    category,
    menuCategory,
    prices,
    image,
    shortDescription: copy.shortDescription,
    description: copy.description,
    ingredients: copy.ingredients,
    isVegetarian: true,
    reviewLabel: "Reviews coming soon",
    reviewCount: 0,
    ...details,
  };
}

const STORAGE = "/manus-storage/";

/**
 * Edit this array to add, remove, or update menu items. The legacy category is
 * kept for source-menu fidelity; menuCategory controls the customer-facing tabs.
 */
export const MENU_ITEMS: MenuItem[] = [
  item("Pizza — Basic", "Pizza", "Cheese Pizza", { S: 75, M: 165, L: 265 }, `${STORAGE}menu-cheese-pizza_b2dd2ac1.png`),
  item("Pizza — Basic", "Pizza", "Tomato & Cheese Pizza", { S: 75, M: 165, L: 265 }, `${STORAGE}menu-tomato-cheese-pizza_21b79c17.png`),
  item("Pizza — Basic", "Pizza", "Onion & Cheese Pizza", { S: 75, M: 165, L: 265 }, `${STORAGE}menu-onion-cheese-pizza_7e486823.png`),
  item("Pizza — Basic", "Pizza", "Capsicum & Cheese Pizza", { S: 75, M: 165, L: 265 }, `${STORAGE}menu-capsicum-cheese-pizza_6b9cb614.png`),
  item("Pizza — Basic", "Pizza", "Corn & Cheese Pizza", { S: 75, M: 165, L: 265 }, `${STORAGE}menu-corn-cheese-pizza_f2325c74.png`),
  item("Pizza — Special", "Pizza", "Loaded Cheese Pizza", { S: 135, M: 265, L: 365 }, `${STORAGE}menu-retry-loaded-cheese-pizza_657743bb.png`, { subcategory: "Special" }),
  item("Pizza — Special", "Pizza", "Pizza Indiana", { S: 135, M: 265, L: 365 }, `${STORAGE}menu-retry-pizza-indiana_b0bb1921.png`, { subcategory: "Special" }),
  item("Pizza — Special", "Pizza", "Masala Paneer", { S: 135, M: 265, L: 365 }, `${STORAGE}menu-retry-masala-paneer_932f19f6.png`, { subcategory: "Special" }),
  item("Pizza — Special", "Pizza", "Fresh Veggie", { S: 135, M: 265, L: 365 }, `${STORAGE}menu-retry-fresh-veggie_00f75bb4.png`, { subcategory: "Special" }),
  item("Pizza — Special", "Pizza", "Crush Veggie", { S: 135, M: 265, L: 365 }, `${STORAGE}menu-retry-crush-veggie_2a4e267b.png`, { subcategory: "Special" }),
  item("Pizza — Special", "Pizza", "Country Fresh", { S: 135, M: 265, L: 365 }, `${STORAGE}menu-retry-country-fresh_5ffed968.png`, { subcategory: "Special" }),
  item("Pizza — Special", "Pizza", "Farm Fresh", { S: 135, M: 265, L: 365 }, `${STORAGE}menu-retry-farm-fresh_df7d1d0b.png`, { subcategory: "Special" }),
  item("Pizza — Premium", "Pizza", "Dark Spicy", { S: 175, M: 335, L: 465 }, `${STORAGE}menu-retry-dark-spicy_b8ff0014.png`, { subcategory: "Premium" }),
  item("Pizza — Premium", "Pizza", "Mexican Pizza", { S: 175, M: 335, L: 465 }, `${STORAGE}menu-retry-mexican-pizza_e9d126b0.png`, { subcategory: "Premium" }),
  item("Pizza — Premium", "Pizza", "Spicy Paneer", { S: 175, M: 335, L: 465 }, `${STORAGE}menu-retry-spicy-paneer_06c54997.png`, { subcategory: "Premium" }),
  item("Pizza — Premium", "Pizza", "Deluxe Delight", { S: 175, M: 335, L: 465 }, `${STORAGE}menu-retry-deluxe-delight_a8e38464.png`, { subcategory: "Premium" }),
  item("Pizza — Premium", "Pizza", "Spicy Hot", { S: 175, M: 335, L: 465 }, `${STORAGE}menu-retry-spicy-hot_93471ddf.png`, { subcategory: "Premium" }),
  item("Pizza — Premium", "Pizza", "Paneer Makhani", { S: 175, M: 335, L: 465 }, `${STORAGE}menu-retry-paneer-makhani_0c1d63d1.png`, { subcategory: "Premium" }),
  item("Pizza — Premium", "Pizza", "Peppy Paneer Pizza", { S: 175, M: 335, L: 465 }, `${STORAGE}menu-retry-peppy-paneer-pizza_d8792c05.png`, { subcategory: "Premium" }),
  item("Pizza — Premium", "Pizza", "The Pizza Lover's Special", { S: 175, M: 335, L: 465 }, `${STORAGE}menu-verified-pizza-lovers-special_f1d99be1.png`, { subcategory: "Premium" }),
  item("Extras", "Snacks", "Extra Cheese", { S: 30, M: 45, L: 60 }, `${STORAGE}menu-retry-extra-cheese_96215ad0.png`, { subcategory: "Extras" }),
  item("Extras", "Snacks", "Extra Topping", { S: 25, M: 40, L: 55 }, `${STORAGE}menu-final-extra-topping_70e431a5.png`, { subcategory: "Extras" }),
  item("Veg Combo Double", "Combos", "Cheese Onion & Capsicum", { M: 55 }, `${STORAGE}menu-retry-cheese-onion-capsicum_89db801d.png`, { subcategory: "Veg Combo Double" }),
  item("Veg Combo Double", "Combos", "Cheese Tomato & Capsicum", { M: 55 }, `${STORAGE}menu-retry-cheese-tomato-capsicum_065e2ad0.png`, { subcategory: "Veg Combo Double" }),
  item("Veg Combo Double", "Combos", "Cheese Onion & Paneer", { M: 55 }, `${STORAGE}menu-final-cheese-onion-paneer_c623ee6c.png`, { subcategory: "Veg Combo Double" }),
  item("Veg Combo Double", "Combos", "Cheese Jalapeno & Corn", { M: 55 }, `${STORAGE}menu-final-cheese-jalapeno-corn_aba39860.png`, { subcategory: "Veg Combo Double" }),
  item("Medium Combo", "Combos", "Medium Pizza + 2 Coke", { M: 209 }, `${STORAGE}menu-retry-medium-pizza-2-coke_d004ca7d.png`, { subcategory: "Medium Combo" }),
  item("Coffee", "Beverages", "Hot Coffee", { M: 25 }, `${STORAGE}menu-hot-coffee_72232f8a.png`, { subcategory: "Warm" }),
  item("Coffee", "Beverages", "Cold Coffee", { M: 49 }, `${STORAGE}menu-cold-coffee_cf066491.png`, { subcategory: "Cold" }),
  item("Coffee", "Beverages", "Kulhad Chai", { M: 20 }, `${STORAGE}menu-kulhad-chai_5160e597.png`, { subcategory: "Warm" }),
  item("Maggi", "Maggie", "Veg Maggi", { M: 39 }, `${STORAGE}menu-final-veg-maggi_f1a24a13.png`),
  item("Maggi", "Maggie", "Veg Paneer Maggi", { M: 49 }, `${STORAGE}menu-retry-veg-paneer-maggi_9aab985b.png`),
  item("Burger", "Burger", "Veg Burger", { M: 29 }, `${STORAGE}menu-last-veg-burger_a9dc5b41.png`),
  item("Burger", "Burger", "Paneer Burger", { M: 39 }, `${STORAGE}menu-verified-paneer-burger_d21acb68.png`),
  item("Burger", "Burger", "Cheese Burger", { M: 49 }, `${STORAGE}menu-retry-cheese-burger_0388557f.png`),
  item("Burger", "Burger", "French Fries Cheese Burger", { M: 55 }, `${STORAGE}menu-final-french-fries-cheese-burger_708f2ac8.png`),
  item("Sandwich", "Sandwich", "Veg Sandwich", { M: 29 }, `${STORAGE}menu-retry-veg-sandwich_27bc348d.png`),
  item("Sandwich", "Sandwich", "Paneer Sandwich", { M: 39 }, `${STORAGE}menu-final-paneer-sandwich_dcb9c8fe.png`),
  item("Sandwich", "Sandwich", "Cheese Sandwich", { M: 49 }, `${STORAGE}menu-final-cheese-sandwich_c3fae5e4.png`),
  item("Other Items", "Pasta", "White Pasta", { M: 79 }, `${STORAGE}menu-retry-white-pasta_8d2dbd07.png`),
  item("Other Items", "Pasta", "Smoky Paneer Pasta", { M: 99 }, `${STORAGE}menu-final-smoky-paneer-pasta_7f7240e6.png`),
  item("Side Orders", "Momos", "Veg Momos", { M: 39 }, `${STORAGE}menu-last-veg-momos_5b8e4442.png`),
  item("French Fries", "Snacks", "French Fries", { M: 39 }, `${STORAGE}menu-retry-french-fries_0d0cd03a.png`),
  item("French Fries", "Snacks", "Cheese French Fries", { M: 49 }, `${STORAGE}menu-final-cheese-french-fries_7cf9a671.png`),
  item("Side Orders", "Snacks", "Paneer Tikka", { M: 49 }, `${STORAGE}menu-verified-paneer-tikka-side_5c827cb8.png`),
  item("Side Orders", "Snacks", "Bowl Ice Cream", { M: 39 }, `${STORAGE}menu-final-bowl-ice-cream_4d0e5bdd.png`),
  item("Side Orders", "Snacks", "Patties", { M: 15 }, `${STORAGE}menu-verified-patties_f7bd2d0a.png`),
  item("Side Orders", "Snacks", "Cake", { M: 15 }, `${STORAGE}menu-final-cake_98c9cb41.png`),
  item("Other Items", "Snacks", "PotatoBets", { M: 39 }, `${STORAGE}menu-retry-potatobets_6cf1d8bc.png`),
  item("Other Items", "Snacks", "Cheese Garlic Bread", { M: 80 }, `${STORAGE}menu-final-cheese-garlic-bread_1fb8b624.png`),
  item("Other Items", "Snacks", "Zingy Parcel", { M: 60 }, `${STORAGE}menu-last-zingy-parcel_54f44d8b.png`),
  item("Other Items", "Snacks", "Stuffed Garlic Bread", { M: 100 }, `${STORAGE}menu-retry-stuffed-garlic-bread_6cea4e02.png`),
  item("Other Items", "Snacks", "Paneer Tikka", { M: 49 }, `${STORAGE}menu-final-paneer-tikka-other_c52acede.png`, { id: "other-items-paneer-tikka" }),
  item("Other Items", "Snacks", "Chillie Stuffed Garlic Bread", { M: 120 }, `${STORAGE}menu-final-chillie-stuffed-garlic-bread_b8d63fe1.png`),
  item("Cold Drinks", "Beverages", "Thums Up", { M: 20 }, `${STORAGE}menu-retry-thums-up_d485bdb2.png`, { subcategory: "Cold" }),
  item("Cold Drinks", "Beverages", "Sprite", { M: 20 }, `${STORAGE}menu-last-sprite_27c20598.png`, { subcategory: "Cold" }),
  item("Cold Drinks", "Beverages", "Dew", { M: 20 }, `${STORAGE}menu-retry-dew_b40ad7a5.png`, { subcategory: "Cold" }),
  item("Cold Drinks", "Beverages", "Limca", { M: 20 }, `${STORAGE}menu-final-limca_8f4f3a2e.png`, { subcategory: "Cold" }),
  item("Cold Drinks", "Beverages", "Pepsi", { M: 20 }, `${STORAGE}menu-verified-pepsi_d926fb9c.png`, { subcategory: "Cold" }),
  item("Cold Drinks", "Beverages", "Maaza", { M: 20 }, `${STORAGE}menu-verified-maaza_fa37f5bf.png`, { subcategory: "Cold" }),
  item("Combo", "Combos", "Burger, Fingers, Cold Drink Combo", { M: 99 }, `${STORAGE}menu-retry-burger-fingers-cold-drink-combo_49a2e669.png`, { subcategory: "Combo" }),
];

export const BOOKING_OPTIONS = ["Marriage Anniversary", "Birthday Party", "Kitty Party"] as const;

export function firstAvailableSize(menuItem: MenuItem): MenuSize {
  return (Object.keys(menuItem.prices)[0] ?? "M") as MenuSize;
}

export function startingPrice(menuItem: MenuItem): number {
  return Math.min(...Object.values(menuItem.prices).filter((price): price is number => typeof price === "number"));
}
