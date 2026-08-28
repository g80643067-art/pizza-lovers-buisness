import { useCart } from "@/contexts/CartContext";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { formatMoney } from "@/lib/format";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

export function CartDrawer() {
  const { cart, closeCart, isOpen, itemCount, openCart, proceedToCheckout, removeItem, updateQuantity } = useCart();

  return (
    <Drawer open={isOpen} onOpenChange={open => (open ? openCart() : closeCart())} direction="right">
      <DrawerContent className="cart-drawer">
        <DrawerHeader className="cart-drawer__header">
          <div>
            <DrawerTitle className="display cart-drawer__title">Your order</DrawerTitle>
            <DrawerDescription className="cart-drawer__description">
              {itemCount ? `${itemCount} ${itemCount === 1 ? "item" : "items"} in your order` : "Your next slice starts here."}
            </DrawerDescription>
          </div>
          <DrawerClose asChild><button type="button" className="cart-close" aria-label="Close basket"><X size={18} /></button></DrawerClose>
        </DrawerHeader>

        <div className="cart-drawer__body">
          {!cart?.items.length ? (
            <div className="cart-empty"><ShoppingBag size={25} /><p>Your order is waiting for something hot.</p><button type="button" onClick={closeCart}>Keep browsing</button></div>
          ) : (
            <div className="cart-lines">
              {cart.items.map(line => (
                <article className="cart-line" key={line.lineId}>
                  <div className="cart-line__image cart-line__image--menu" aria-hidden="true"><ShoppingBag size={17} /></div>
                  <div className="cart-line__copy"><strong>{line.productTitle}</strong><small>{line.variantTitle !== "M" ? `Size ${line.variantTitle}` : "Single serving"}</small><span>{formatMoney(line.unitPrice, "INR")}</span></div>
                  <div className="cart-line__controls">
                    <div className="cart-quantity" aria-label={`Quantity for ${line.productTitle}`}><button type="button" onClick={() => updateQuantity(line.lineId, line.quantity - 1)} aria-label={`Remove one ${line.productTitle}`}><Minus size={13} /></button><span>{line.quantity}</span><button type="button" onClick={() => updateQuantity(line.lineId, line.quantity + 1)} aria-label={`Add one ${line.productTitle}`}><Plus size={13} /></button></div>
                    <button type="button" className="cart-remove" onClick={() => removeItem(line.lineId)} aria-label={`Remove ${line.productTitle} from basket`}><Trash2 size={14} /></button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <DrawerFooter className="cart-drawer__footer">
          <div className="cart-total"><span>Order total</span><strong>{cart ? formatMoney(cart.total, "INR") : "₹0"}</strong></div>
          <button type="button" className="cart-checkout" disabled={!itemCount} onClick={proceedToCheckout}>Order on WhatsApp <ShoppingBag size={16} /></button>
          <p>We&apos;ll send your selected items to 9369722736 for confirmation.</p>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
