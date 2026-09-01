import { CartDrawer } from "@/components/CartDrawer";
import { PizzaLogo } from "@/components/PizzaLogo";
import { MapView } from "@/components/Map";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import {
  BOOKING_OPTIONS,
  firstAvailableSize,
  MENU_DISPLAY_CATEGORIES,
  MENU_ITEMS,
  type MenuCategory,
  type MenuItem,
  type MenuSize,
} from "@/data/menu";
import { formatMoney } from "@/lib/format";
import { getVisibleMenuItems, selectMenuCategory } from "@/lib/menu-search";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Coffee,
  ExternalLink,
  Flame,
  Heart,
  Instagram,
  Facebook,
  Leaf,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  PartyPopper,
  Phone,
  Pizza,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Utensils,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const WHATSAPP_NUMBER = "919369722736";
const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20The%20Pizza%20Lover%27s%2C%20I%20would%20like%20to%20ask%20about%20today%27s%20menu.`;
const DIRECTIONS = "https://www.google.com/maps/search/?api=1&query=Shiv%20Market%2C%20Raebareli%20Road%2C%20Takiya%20Patan%2C%20Unnao";
const ADDRESS = "Shiv Market, Raebareli Road, Takiya Patan, Unnao (Infront of Takiya Mela)";
const INSTAGRAM = "https://www.instagram.com/the_pizza_lovers_/";
const FACEBOOK = "https://www.facebook.com/The.Pizza.Lovers/posts/food-pizza-takiya/122270990516086142/";
const SIGNATURE_IMAGE = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1800&q=88";
const PARTY_IMAGE = "/manus-storage/pizza-lovers-birthday-table_0c82266e.png";
const PizzaScene = lazy(() => import("@/components/PizzaScene").then(module => ({ default: module.PizzaScene })));

const CATEGORY_META: Record<MenuCategory, { icon: LucideIcon; note: string }> = {
  Pizza: { icon: Pizza, note: "Oven baked" },
  Maggie: { icon: Flame, note: "Masala comfort" },
  Burger: { icon: Utensils, note: "Stacked fresh" },
  Sandwich: { icon: Sparkles, note: "Toasted warm" },
  Pasta: { icon: Utensils, note: "Saucy bowls" },
  Momos: { icon: Leaf, note: "Steamed soft" },
  Snacks: { icon: Heart, note: "Made to share" },
  Beverages: { icon: Coffee, note: "Pour & refresh" },
  Combos: { icon: ShoppingBag, note: "Easy pairings" },
};

const reasons = [
  { icon: Pizza, title: "Hot on the table", copy: "The best reason for your group to make room for one more slice." },
  { icon: Leaf, title: "All veg, all in", copy: "A veg-only stop where every pizza plan begins comfortably." },
  { icon: Flame, title: "The oven moment", copy: "That close-to-the-heat feeling, served when the appetite arrives." },
  { icon: Heart, title: "For the gathering", copy: "A little more cheese, a longer conversation, and a happy table." },
];

function Brand({ compact = false, useCustomLogo = false }: { compact?: boolean; useCustomLogo?: boolean }) {
  return (
    <a href="#home" className="brand" aria-label="The Pizza Lover's home">
      <span className={`brand-mark-wrap${useCustomLogo ? "" : " brand-mark-wrap--legacy"}`}>
        {useCustomLogo ? <PizzaLogo className="brand-mark" /> : <img className="brand-mark brand-mark--legacy" src="/manus-storage/pizza-lovers-mark_05b40109.png" alt="" />}
      </span>
      <span className="brand-copy"><b>The Pizza Lover&apos;s</b>{!compact && <small>Takiya Patan</small>}</span>
    </a>
  );
}

function getPriceLabel(menuItem: MenuItem) {
  const prices = Object.values(menuItem.prices).filter((price): price is number => typeof price === "number");
  if (prices.length > 1) return `From ${formatMoney(Math.min(...prices), "INR")}`;
  return formatMoney(prices[0] ?? 0, "INR");
}

function MenuCard({ menuItem, onViewDetails }: { menuItem: MenuItem; onViewDetails: (item: MenuItem) => void }) {
  const { addItem } = useCart();
  const sizes = Object.keys(menuItem.prices) as MenuSize[];
  const [size, setSize] = useState<MenuSize>(firstAvailableSize(menuItem));
  const price = menuItem.prices[size] ?? menuItem.prices[sizes[0]] ?? 0;

  return (
    <article
      className="menu-item-card"
      role="group"
      aria-label={`${menuItem.name} menu item`}
      onClick={() => onViewDetails(menuItem)}
    >
      <button className="menu-item-card__image" type="button" onClick={() => onViewDetails(menuItem)} aria-label={`View ${menuItem.name} details`}>
        <img src={menuItem.image} alt={menuItem.name} loading="lazy" />
        <span className="menu-item-card__image-label">{menuItem.subcategory ?? menuItem.category}</span>
        <span className="menu-item-card__image-action"><ExternalLink size={14} /> Details</span>
      </button>
      <div className="menu-item-card__body">
        <div className="menu-item-card__topline"><span>{menuItem.category}</span><strong>{getPriceLabel(menuItem)}</strong></div>
        <h3>{menuItem.name}</h3>
        <p>{menuItem.shortDescription}</p>
        <div className="menu-item-card__footer">
          <span className="menu-item-card__reviews" aria-label={menuItem.reviewLabel}>
            <Star size={13} aria-hidden="true" />
            {menuItem.reviewCount > 0 ? `${menuItem.reviewCount} reviews` : menuItem.reviewLabel}
          </span>
          <span className="menu-item-card__veg"><Leaf size={13} /> Veg</span>
        </div>
        {sizes.length > 1 && (
          <div className="menu-size-picker" aria-label={`Choose a size for ${menuItem.name}`} onClick={event => event.stopPropagation()}>
            {sizes.map(option => (
              <button key={option} type="button" className={size === option ? "is-selected" : ""} onClick={() => setSize(option)} aria-pressed={size === option}>
                {option}
              </button>
            ))}
          </div>
        )}
        <div className="menu-item-card__actions" onClick={event => event.stopPropagation()}>
          <button type="button" className="menu-item-card__details" onClick={() => onViewDetails(menuItem)}>View Details <ArrowUpRight size={15} /></button>
          <button type="button" className="menu-item-card__add" onClick={() => { addItem(menuItem, size); toast.success(`${menuItem.name} is in your order.`); }} aria-label={`Add ${menuItem.name} to your order`}>
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}

function DetailModal({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  const { addItem } = useCart();
  const [size, setSize] = useState<MenuSize>("M");
  const sizes = item ? Object.keys(item.prices) as MenuSize[] : [];
  const price = item ? (item.prices[size] ?? item.prices[sizes[0]] ?? 0) : 0;

  useEffect(() => {
    if (item) setSize(firstAvailableSize(item));
  }, [item]);

  const handleOrder = () => {
    if (!item) return;
    addItem(item, size);
    toast.success(`${item.name} is in your order.`);
    onClose();
  };

  return (
    <Dialog open={Boolean(item)} onOpenChange={open => { if (!open) onClose(); }}>
      <DialogContent className="menu-detail-dialog" showCloseButton={false}>
        {item && (
          <div className="menu-detail">
            <div className="menu-detail__visual">
              <img src={item.image} alt={item.name} />
              <div className="menu-detail__visual-badge"><Leaf size={14} /> 100% vegetarian</div>
              <DialogClose asChild>
                <button type="button" className="menu-detail__close" aria-label="Close food details"><X size={18} /></button>
              </DialogClose>
            </div>
            <div className="menu-detail__copy">
              <DialogHeader>
                <span className="menu-detail__category">{item.category}{item.subcategory ? ` / ${item.subcategory}` : ""}</span>
                <DialogTitle>{item.name}</DialogTitle>
                <DialogDescription>{item.description}</DialogDescription>
              </DialogHeader>
              <div className="menu-detail__price-row"><strong>{formatMoney(price, "INR")}</strong><span><Star size={14} /> {item.reviewLabel}</span></div>
              <div className="menu-detail__ingredients"><span>What&apos;s inside</span><div>{item.ingredients.map(ingredient => <span key={ingredient}><Check size={13} /> {ingredient}</span>)}</div></div>
              {sizes.length > 1 && (
                <div className="menu-detail__sizes" aria-label={`Choose a size for ${item.name}`}>
                  <span>Choose size</span>
                  <div>{sizes.map(option => <button key={option} type="button" className={size === option ? "is-selected" : ""} onClick={() => setSize(option)} aria-pressed={size === option}>{option} <small>{formatMoney(item.prices[option] ?? 0, "INR")}</small></button>)}</div>
                </div>
              )}
              <div className="menu-detail__actions">
                <button type="button" className="menu-detail__interested" onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`I am interested in ${item.name}. Please share more details.`)}`, "_blank", "noopener,noreferrer")}><MessageCircle size={16} /> Interested</button>
                <button type="button" className="menu-detail__order" onClick={handleOrder}>Order Now <ArrowUpRight size={16} /></button>
              </div>
              <p className="menu-detail__note">Prices are shown in Indian rupees. Add this item to your order and confirm with us on WhatsApp.</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(MENU_DISPLAY_CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { itemCount, openCart } = useCart();
  const visibleItems = useMemo(
    () => getVisibleMenuItems(MENU_ITEMS, activeCategory, searchQuery),
    [activeCategory, searchQuery],
  );
  const handleCategorySelect = (category: MenuCategory) => {
    const nextSelection = selectMenuCategory({ activeCategory, searchQuery }, category);
    setActiveCategory(nextSelection.activeCategory as MenuCategory);
    setSearchQuery(nextSelection.searchQuery);
  };

  return (
    <div className="site-shell">
      <header className="nav"><div className="container nav-inner"><Brand useCustomLogo /><nav className="nav-links" aria-label="Primary navigation"><a href="#menu">Menu</a><a href="#story">Our Story</a><a href="#location">Location</a></nav><button type="button" className="nav-order" onClick={openCart}><ShoppingBag size={14} /> Your order{itemCount ? ` (${itemCount})` : ""}</button><button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <MenuIcon size={22} />}</button></div>{menuOpen && <div className="absolute left-0 right-0 top-[68px] border-b border-[#d4af37]/20 bg-[#080808]/98 px-5 py-5 shadow-2xl backdrop-blur-xl md:hidden"><nav className="grid gap-4" aria-label="Mobile navigation">{["Menu", "Our Story", "Location"].map(link => <a className="text-sm font-bold uppercase tracking-[.14em] text-[#fff8e7]" onClick={() => setMenuOpen(false)} href={`#${link === "Our Story" ? "story" : link.toLowerCase()}`} key={link}>{link}</a>)}<button type="button" className="button-primary mobile-menu-purchase mt-2 w-fit" onClick={() => { setMenuOpen(false); openCart(); }}>View your order <ShoppingBag size={15} /></button></nav></div>}</header>

      <main>
        <section className="hero hero--slice-opening" id="home"><div className="container hero-grid"><div className="hero-copy"><div className="hero-proof"><span className="eyebrow"><i /> A refined veg-only pizzeria in Takiya Patan</span><span className="hero-veg-seal"><i /> 100% Veg only</span></div><h1 className="display hero-title">One good slice.<br /><em>That&apos;s the point.</em></h1><p className="hero-kicker"><b>Made with intention.</b><br />Choose your exact item from the menu, add it to your order, and send the details straight to WhatsApp.</p><div className="hero-actions"><a className="button-primary" href="#menu">Order now <ArrowUpRight size={15} /></a><button type="button" className="button-quiet" onClick={openCart}>Your order <ShoppingBag size={15} /></button></div><div className="hero-meta"><div className="hero-status"><b>Open until 10 PM</b>Vegetarian restaurant &amp; pizzeria</div></div></div><div className="hero-stage"><Suspense fallback={null}><PizzaScene /></Suspense></div></div><a className="scroll-cue" href="#menu"><span aria-hidden="true" /> Scroll for the menu</a></section>

        <div className="opening-divider" aria-hidden="true"><span>Veg-only pizza</span><i /><span>Fresh from the oven</span><i /><span>Takiya Patan</span></div>

        <section className="menu-section" id="menu"><div className="container menu-layout"><div className="section-head"><span className="eyebrow"><i /> The exact menu</span><h2 className="display">Choose your kind of delicious.</h2><p>Browse the full menu by category, open any dish for the details, or add a favourite straight to your order. Every item below is structured in one easy-to-edit data file.</p></div><div className="menu-search-panel"><label className="menu-search" htmlFor="menu-search-input"><Search size={17} aria-hidden="true" /><span className="sr-only">Search menu</span><input id="menu-search-input" type="search" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="Search pizza, maggie, or drink" aria-describedby="menu-search-hint" />{searchQuery && <button type="button" className="menu-search__clear" onClick={() => setSearchQuery("")} aria-label="Clear menu search"><X size={15} /></button>}</label><p className="menu-search-meta" id="menu-search-hint" aria-live="polite">{searchQuery.trim() ? `${visibleItems.length} ${visibleItems.length === 1 ? "item" : "items"} found for “${searchQuery.trim()}”` : "Search by item or category."}</p></div><div className="menu-category-grid" role="tablist" aria-label="Menu categories">{MENU_DISPLAY_CATEGORIES.map(category => { const Icon = CATEGORY_META[category].icon; const isActive = !searchQuery.trim() && activeCategory === category; const count = MENU_ITEMS.filter(item => item.menuCategory === category).length; return <button key={category} type="button" role="tab" aria-selected={isActive} className={`menu-category-card${isActive ? " is-active" : ""}`} onClick={() => handleCategorySelect(category)}><span className="menu-category-card__icon"><Icon size={19} /></span><span className="menu-category-card__copy"><strong>{category}</strong><small>{CATEGORY_META[category].note}</small></span><span className="menu-category-card__count">{count}</span></button>; })}</div><div className="menu-results-head"><div><span className="menu-results-kicker">{searchQuery.trim() ? "Search results" : "Now serving"}</span><h3>{searchQuery.trim() ? `Showing ${visibleItems.length} ${visibleItems.length === 1 ? "dish" : "dishes"}` : activeCategory}</h3></div><span className="menu-results-rule" aria-hidden="true" /></div><div className="storefront-grid" key={`${activeCategory}-${searchQuery}`}>{visibleItems.length > 0 ? visibleItems.map(menuItem => <MenuCard key={menuItem.id} menuItem={menuItem} onViewDetails={setSelectedItem} />) : <div className="menu-empty-state" role="status"><h3>No menu items found</h3><p>Try a different dish or category name.</p><button type="button" className="button-quiet menu-empty-state__clear" onClick={() => setSearchQuery("")}>Clear search</button></div>}</div><p className="menu-note"><b>Need a party menu?</b> Call 9369722736 or 7007800532 for anniversary, birthday, and kitty party bookings.</p></div></section>

        <section className="signature" id="story"><img className="signature-photo" src={SIGNATURE_IMAGE} alt="A freshly baked vegetarian pizza with melted cheese" /><div className="container signature-inner"><div className="signature-copy"><span className="eyebrow"><i /> The house mood</span><h2 className="display">A table worth lingering at.</h2><p>Fresh ingredients. Loaded toppings. Perfectly baked. The whole idea is simple: make room for a hotter, happier slice.</p><a className="button-primary" href="#menu">Choose from the menu <ArrowUpRight size={15} /></a></div></div></section>

        <section className="reasons"><div className="container"><div className="section-head"><span className="eyebrow"><i /> The pizza lover&apos;s way</span><h2 className="display">Why the table stays a little longer.</h2></div><div className="reasons-grid">{reasons.map(({ icon: Icon, title, copy }) => <article className="reason-card" key={title}><Icon className="reason-card__icon" size={24} /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

        <section className="party"><img className="party-img" src={PARTY_IMAGE} alt="A warm pizza-table birthday celebration" /><div className="container party-inner"><div className="party-copy"><span className="eyebrow"><i /> Bookings</span><h2 className="display">Evenings deserve a little ceremony.</h2><p>Marriage anniversaries, birthday parties, and kitty parties are welcome at The Pizza Lover&apos;s.</p><div className="booking-options">{BOOKING_OPTIONS.map(option => <span key={option}>{option}</span>)}</div><a className="button-primary" href={WHATSAPP} target="_blank" rel="noreferrer"><PartyPopper size={15} /> Ask about a booking <ArrowUpRight size={15} /></a></div></div></section>

        <section className="trust-location" id="location"><div className="container"><div className="location-grid"><div className="location-info"><span className="eyebrow"><i /> Come hungry</span><h2 className="display">Find your way to the table.</h2><p>{ADDRESS}</p><div className="location-where"><MapPin size={15} /> Infront of Takiya Mela</div><div className="location-actions"><a className="location-action" href={DIRECTIONS} target="_blank" rel="noreferrer"><MapPin size={14} /> Get directions</a><a className="location-action" href="tel:+919369722736"><Phone size={14} /> 9369722736</a><a className="location-action" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={14} /> WhatsApp</a></div><div className="social-links" aria-label="Follow The Pizza Lover&apos;s"><a className="social-link" href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} aria-hidden="true" /></a><a className="social-link" href={FACEBOOK} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} aria-hidden="true" /></a></div></div><div className="map-frame"><MapView initialZoom={14} onMapReady={map => { if (!window.google?.maps) return; const geocoder = new window.google.maps.Geocoder(); geocoder.geocode({ address: ADDRESS }, (results, status) => { if (status === "OK" && results?.[0]) { const position = results[0].geometry.location; map.setCenter(position); map.setZoom(16); new window.google.maps.Marker({ map, position, title: "The Pizza Lover's — Takiya Patan" }); } }); }} /><div className="map-overlay"><div className="map-pin"><MapPin size={23} /><b>Takiya Mela Ground</b><small>Find your next slice</small></div></div></div></div></div></section>
      </main>

      <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><Brand /><p>Fresh. Hot. Loaded with Love.<br />Veg-only pizza in Takiya Patan.</p></div><div className="footer-col"><h3>Explore</h3><a href="#home">Home</a><a href="#menu">Choose from the menu</a><a href="#story">About</a><a href="#location">Location</a></div><div className="footer-col"><h3>Bring your appetite</h3><button type="button" onClick={openCart}>Your order ({itemCount})</button><a href={WHATSAPP} target="_blank" rel="noreferrer">Message on WhatsApp</a><a href="tel:+917007800532">Call 7007800532</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} The Pizza Lover&apos;s — Takiya Patan</span><span>Open until 10 PM <Clock3 size={12} className="inline align-[-2px]" /></span></div></footer>

      <nav className="mobile-bar" aria-label="Quick contact"><a href="tel:+919369722736"><Phone size={14} /> Call</a><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={14} /> WhatsApp</a><button type="button" className="cart-order" onClick={openCart}><ShoppingBag size={14} /> Order{itemCount ? ` (${itemCount})` : ""}</button></nav>
      <CartDrawer />
      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
