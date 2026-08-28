export type MenuSize = "S" | "M" | "L";

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  prices: Partial<Record<MenuSize, number>>;
  image?: string;
};

const item = (category: string, name: string, prices: Partial<Record<MenuSize, number>>): MenuItem => ({
  id: `${category}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  name,
  category,
  prices,
});

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

export const MENU_ITEMS: MenuItem[] = [
  item("Pizza — Basic", "Cheese Pizza", { S: 75, M: 165, L: 265 }),
  item("Pizza — Basic", "Tomato & Cheese Pizza", { S: 75, M: 165, L: 265 }),
  item("Pizza — Basic", "Onion & Cheese Pizza", { S: 75, M: 165, L: 265 }),
  item("Pizza — Basic", "Capsicum & Cheese Pizza", { S: 75, M: 165, L: 265 }),
  item("Pizza — Basic", "Corn & Cheese Pizza", { S: 75, M: 165, L: 265 }),
  item("Pizza — Special", "Loaded Cheese Pizza", { S: 135, M: 265, L: 365 }),
  item("Pizza — Special", "Pizza Indiana", { S: 135, M: 265, L: 365 }),
  item("Pizza — Special", "Masala Paneer", { S: 135, M: 265, L: 365 }),
  item("Pizza — Special", "Fresh Veggie", { S: 135, M: 265, L: 365 }),
  item("Pizza — Special", "Crush Veggie", { S: 135, M: 265, L: 365 }),
  item("Pizza — Special", "Country Fresh", { S: 135, M: 265, L: 365 }),
  item("Pizza — Special", "Farm Fresh", { S: 135, M: 265, L: 365 }),
  item("Pizza — Premium", "Dark Spicy", { S: 175, M: 335, L: 465 }),
  item("Pizza — Premium", "Mexican Pizza", { S: 175, M: 335, L: 465 }),
  item("Pizza — Premium", "Spicy Paneer", { S: 175, M: 335, L: 465 }),
  item("Pizza — Premium", "Deluxe Delight", { S: 175, M: 335, L: 465 }),
  item("Pizza — Premium", "Spicy Hot", { S: 175, M: 335, L: 465 }),
  item("Pizza — Premium", "Paneer Makhani", { S: 175, M: 335, L: 465 }),
  item("Pizza — Premium", "Peppy Paneer Pizza", { S: 175, M: 335, L: 465 }),
  item("Pizza — Premium", "The Pizza Lover's Special", { S: 175, M: 335, L: 465 }),
  item("Extras", "Extra Cheese", { S: 30, M: 45, L: 60 }),
  item("Extras", "Extra Topping", { S: 25, M: 40, L: 55 }),
  item("Veg Combo Double", "Cheese Onion & Capsicum", { M: 55 }),
  item("Veg Combo Double", "Cheese Tomato & Capsicum", { M: 55 }),
  item("Veg Combo Double", "Cheese Onion & Paneer", { M: 55 }),
  item("Veg Combo Double", "Cheese Jalapeno & Corn", { M: 55 }),
  item("Medium Combo", "Medium Pizza + 2 Coke", { M: 209 }),
  item("Coffee", "Hot Coffee", { M: 25 }),
  item("Coffee", "Cold Coffee", { M: 49 }),
  item("Coffee", "Kulhad Chai", { M: 20 }),
  item("Burger", "Veg Burger", { M: 29 }),
  item("Burger", "Paneer Burger", { M: 39 }),
  item("Burger", "Cheese Burger", { M: 49 }),
  item("Burger", "French Fries Cheese Burger", { M: 55 }),
  item("Sandwich", "Veg Sandwich", { M: 29 }),
  item("Sandwich", "Paneer Sandwich", { M: 39 }),
  item("Sandwich", "Cheese Sandwich", { M: 49 }),
  item("French Fries", "French Fries", { M: 39 }),
  item("French Fries", "Cheese French Fries", { M: 49 }),
  item("Cold Drinks", "Thums Up", { M: 20 }),
  item("Cold Drinks", "Sprite", { M: 20 }),
  item("Cold Drinks", "Dew", { M: 20 }),
  item("Cold Drinks", "Limca", { M: 20 }),
  item("Cold Drinks", "Pepsi", { M: 20 }),
  item("Cold Drinks", "Maaza", { M: 20 }),
  item("Maggi", "Veg Maggi", { M: 39 }),
  item("Maggi", "Veg Paneer Maggi", { M: 49 }),
  item("Side Orders", "Veg Momos", { M: 39 }),
  item("Side Orders", "Paneer Tikka", { M: 49 }),
  item("Side Orders", "Bowl Ice Cream", { M: 39 }),
  item("Side Orders", "Patties", { M: 15 }),
  item("Side Orders", "Cake", { M: 15 }),
  item("Other Items", "PotatoBets", { M: 39 }),
  item("Other Items", "Cheese Garlic Bread", { M: 80 }),
  item("Other Items", "Zingy Parcel", { M: 60 }),
  item("Other Items", "Stuffed Garlic Bread", { M: 100 }),
  item("Other Items", "White Pasta", { M: 79 }),
  item("Other Items", "Smoky Paneer Pasta", { M: 99 }),
  item("Other Items", "Paneer Tikka", { M: 49 }),
  item("Other Items", "Chillie Stuffed Garlic Bread", { M: 120 }),
  item("Combo", "Burger, Fingers, Cold Drink Combo", { M: 99 }),
];

export const BOOKING_OPTIONS = ["Marriage Anniversary", "Birthday Party", "Kitty Party"] as const;

export function firstAvailableSize(menuItem: MenuItem): MenuSize {
  return (Object.keys(menuItem.prices)[0] ?? "M") as MenuSize;
}
