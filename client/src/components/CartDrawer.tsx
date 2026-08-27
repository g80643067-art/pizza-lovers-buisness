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
  const {
    cart,
    closeCart,
    isOpen,
    itemCount,
    loading,
    openCart,
    proceedToCheckout,
    removeItem,
    updateQuantity,
  } = useCart();

  return (
    <Drawer open={isOpen} onOpenChange={open => (open ? openCart() : closeCart())} direction="right">
      <DrawerContent className="cart-drawer">
        <DrawerHeader className="cart-drawer__header">
          <div>
            <DrawerTitle className="display cart-drawer__title">Your pizza order</DrawerTitle>
            <DrawerDescription className="cart-drawer__description">
              {itemCount ? `${itemCount} ${itemCount === 1 ? "slice in your order" : "slices in your order"}` : "Your next slice starts here."}
            </DrawerDescription>
          </div>
          <DrawerClose asChild>
            <button type="button" className="cart-close" aria-label="Close basket"><X size={18} /></button>
          </DrawerClose>
        </DrawerHeader>

        <div className="cart-drawer__body">
          {!cart?.items.length ? (
            <div className="cart-empty"><ShoppingBag size={25} /><p>Your order is waiting for something hot.</p><button type="button" onClick={closeCart}>Keep browsing</button></div>
          ) : (
            <div className="cart-lines">
              {cart.items.map(item => (
                <article className="cart-line" key={item.lineId}>
                  {item.image ? <img src={item.image.url} alt={item.image.altText || item.productTitle} /> : <div className="cart-line__image" aria-hidden="true" />}
                  <div className="cart-line__copy"><strong>{item.productTitle}</strong>{item.variantTitle !== "Default Title" && <small>{item.variantTitle}</small>}<span>{formatMoney(item.unitPrice)}</span></div>
                  <div className="cart-line__controls">
                    <div className="cart-quantity" aria-label={`Quantity for ${item.productTitle}`}><button type="button" disabled={loading} onClick={() => void updateQuantity(item.lineId, item.quantity - 1)} aria-label={`Remove one ${item.productTitle}`}><Minus size={13} /></button><span>{item.quantity}</span><button type="button" disabled={loading} onClick={() => void updateQuantity(item.lineId, item.quantity + 1)} aria-label={`Add one ${item.productTitle}`}><Plus size={13} /></button></div>
                    <button type="button" className="cart-remove" disabled={loading} onClick={() => void removeItem(item.lineId)} aria-label={`Remove ${item.productTitle} from basket`}><Trash2 size={14} /></button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <DrawerFooter className="cart-drawer__footer">
          <div className="cart-total"><span>Order total</span><strong>{cart ? formatMoney(cart.total) : "₹0"}</strong></div>
          <button type="button" className="cart-checkout" disabled={!itemCount || loading} onClick={proceedToCheckout}>{loading ? "Updating order…" : "Continue to checkout"}<ShoppingBag size={16} /></button>
          <p>You&apos;ll finish payment at our secure checkout.</p>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
