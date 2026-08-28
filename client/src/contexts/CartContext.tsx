import type { MenuItem, MenuSize } from "@/data/menu";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CART_STORAGE_KEY = "pizza-lovers:menu-cart";
const WHATSAPP_NUMBER = "919369722736";

type CartLine = {
  lineId: string;
  itemId: string;
  productTitle: string;
  variantTitle: string;
  quantity: number;
  unitPrice: number;
};

type LocalCart = {
  items: CartLine[];
  itemCount: number;
  total: number;
};

type CartContextValue = {
  cart: LocalCart | null;
  isOpen: boolean;
  loading: boolean;
  itemCount: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: MenuItem, size?: MenuSize) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
  proceedToCheckout: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): LocalCart | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) ?? "null") as LocalCart | null;
    if (!parsed || !Array.isArray(parsed.items)) return null;
    return makeCart(parsed.items);
  } catch {
    return null;
  }
}

function makeCart(items: CartLine[]): LocalCart | null {
  if (!items.length) return null;
  return {
    items,
    itemCount: items.reduce((count, line) => count + line.quantity, 0),
    total: items.reduce((total, line) => total + line.unitPrice * line.quantity, 0),
  };
}

function writeStoredCart(cart: LocalCart | null) {
  if (typeof window === "undefined") return;
  if (cart) window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  else window.localStorage.removeItem(CART_STORAGE_KEY);
}

function formatWhatsAppMessage(cart: LocalCart) {
  const lines = cart.items.map(line => {
    const size = line.variantTitle === "M" ? "" : ` (${line.variantTitle})`;
    return `• ${line.productTitle}${size} × ${line.quantity} — ₹${line.unitPrice * line.quantity}`;
  });
  return [
    "Hello The Pizza Lover's, I want to place an order:",
    "",
    ...lines,
    "",
    `Total: ₹${cart.total}`,
    "",
    "Please confirm my order.",
  ].join("\n");
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<LocalCart | null>(() => readStoredCart());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    writeStoredCart(cart);
  }, [cart]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((item: MenuItem, size?: MenuSize) => {
    const selectedSize = size ?? (Object.keys(item.prices)[0] as MenuSize);
    const price = item.prices[selectedSize];
    if (price === undefined) return;
    const lineId = `${item.id}-${selectedSize}`;

    setCart(current => {
      const existing = current?.items.find(line => line.lineId === lineId);
      const items = existing
        ? current!.items.map(line => line.lineId === lineId ? { ...line, quantity: line.quantity + 1 } : line)
        : [...(current?.items ?? []), {
            lineId,
            itemId: item.id,
            productTitle: item.name,
            variantTitle: selectedSize,
            quantity: 1,
            unitPrice: price,
          }];
      return makeCart(items);
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setCart(current => {
      if (!current) return null;
      const items = current.items
        .map(line => line.lineId === lineId ? { ...line, quantity } : line)
        .filter(line => line.quantity > 0);
      return makeCart(items);
    });
  }, []);

  const removeItem = useCallback((lineId: string) => {
    setCart(current => current ? makeCart(current.items.filter(line => line.lineId !== lineId)) : null);
  }, []);

  const clearCart = useCallback(() => setCart(null), []);

  const proceedToCheckout = useCallback(() => {
    if (!cart || typeof window === "undefined") return;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formatWhatsAppMessage(cart))}`, "_blank", "noopener,noreferrer");
  }, [cart]);

  const value = useMemo<CartContextValue>(() => ({
    cart,
    isOpen,
    loading: false,
    itemCount: cart?.itemCount ?? 0,
    openCart,
    closeCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    proceedToCheckout,
  }), [cart, isOpen, openCart, closeCart, addItem, updateQuantity, removeItem, clearCart, proceedToCheckout]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
