/**
 * EMBER ATELIER DESIGN REMINDER
 * A charcoal-and-ember Italian editorial page with a straightforward, exact menu.
 */
import { CartDrawer } from "@/components/CartDrawer";
import { MapView } from "@/components/Map";
import { useCart } from "@/contexts/CartContext";
import { MENU_CATEGORIES, MENU_ITEMS, BOOKING_OPTIONS, firstAvailableSize, type MenuItem, type MenuSize } from "@/data/menu";
import { formatMoney } from "@/lib/format";
import { lazy, Suspense, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowUpRight,
  Clock3,
  ExternalLink,
  Flame,
  Heart,
  Leaf,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  PartyPopper,
  Phone,
  Pizza,
  ShoppingBag,
  Utensils,
  X,
} from "lucide-react";

const WHATSAPP = "https://wa.me/919369722736?text=Hello%20The%20Pizza%20Lover%27s%2C%20I%20would%20like%20to%20ask%20about%20today%27s%20menu.";
const DIRECTIONS = "https://www.google.com/maps/search/?api=1&query=Shiv%20Market%2C%20Raebareli%20Road%2C%20Takiya%20Patan%2C%20Unnao";
const ADDRESS = "Shiv Market, Raebareli Road, Takiya Patan, Unnao (Infront of Takiya Mela)";
const SIGNATURE_IMAGE = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1800&q=88";
const PARTY_IMAGE = "/manus-storage/pizza-lovers-birthday-table_0c82266e.png";
const PizzaScene = lazy(() => import("@/components/PizzaScene").then(module => ({ default: module.PizzaScene })));

const reasons = [
  { icon: Pizza, title: "Hot on the table", copy: "The best reason for your group to make room for one more slice." },
  { icon: Leaf, title: "All veg, all in", copy: "A veg-only stop where every pizza plan begins comfortably." },
  { icon: Flame, title: "The oven moment", copy: "That close-to-the-heat feeling, served when the appetite arrives." },
  { icon: Heart, title: "For the gathering", copy: "A little more cheese, a longer conversation, and a happy table." },
];

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#home" className="brand" aria-label="The Pizza Lover's home">
      <span className="brand-mark-wrap"><img className="brand-mark" src="/manus-storage/pizza-lovers-mark_05b40109.png" alt="" /></span>
      <span className="brand-copy"><b>The Pizza Lover&apos;s</b>{!compact && <small>Takiya Patan</small>}</span>
    </a>
  );
}

function MenuCard({ menuItem }: { menuItem: MenuItem }) {
  const { addItem } = useCart();
  const sizes = Object.keys(menuItem.prices) as MenuSize[];
  const [size, setSize] = useState<MenuSize>(firstAvailableSize(menuItem));
  const price = menuItem.prices[size] ?? menuItem.prices[sizes[0]] ?? 0;

  return (
    <article className="shop-product menu-card">
      <div className="menu-card__image" aria-label={`Exact food image for ${menuItem.name} will be added from the restaurant menu assets`}>
        <Utensils size={22} aria-hidden="true" />
        <span>{menuItem.category}</span><small>Exact food photo pending</small>
      </div>
      <div className="shop-product__body">
        <div className="shop-product__meta"><span>Fresh from the counter</span><strong>{formatMoney(price, "INR")}</strong></div>
        <h3>{menuItem.name}</h3>
        {sizes.length > 1 && <div className="menu-size-picker" aria-label={`Choose a size for ${menuItem.name}`}>
          {sizes.map(option => <button key={option} type="button" className={size === option ? "is-selected" : ""} onClick={() => setSize(option)} aria-pressed={size === option}>{option}</button>)}
        </div>}
        <button type="button" className="shop-product__add" onClick={() => { addItem(menuItem, size); toast.success(`${menuItem.name} is in your order.`); }}>Add to your order <ShoppingBag size={15} /></button>
      </div>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(MENU_CATEGORIES[0]);
  const { itemCount, openCart } = useCart();
  const visibleItems = useMemo(() => MENU_ITEMS.filter(item => item.category === activeCategory), [activeCategory]);

  return (
    <div className="site-shell">
      <header className="nav"><div className="container nav-inner"><Brand /><nav className="nav-links" aria-label="Primary navigation"><a href="#menu">Menu</a><a href="#story">Our Story</a><a href="#location">Location</a></nav><button type="button" className="nav-order" onClick={openCart}><ShoppingBag size={14} /> Your order{itemCount ? ` (${itemCount})` : ""}</button><button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <MenuIcon size={22} />}</button></div>{menuOpen && <div className="absolute left-0 right-0 top-[68px] border-b border-white/10 bg-[#1a110e]/98 px-5 py-5 shadow-2xl backdrop-blur-xl md:hidden"><nav className="grid gap-4" aria-label="Mobile navigation">{["Menu", "Our Story", "Location"].map(link => <a className="text-sm font-bold uppercase tracking-[.14em] text-[#f5dec0]" onClick={() => setMenuOpen(false)} href={`#${link === "Our Story" ? "story" : link.toLowerCase()}`} key={link}>{link}</a>)}<button type="button" className="button-primary mobile-menu-purchase mt-2 w-fit" onClick={() => { setMenuOpen(false); openCart(); }}>View your order <ShoppingBag size={15} /></button></nav></div>}</header>

      <main>
        <section className="hero hero--slice-opening" id="home"><div className="container hero-grid"><div className="hero-copy"><div className="hero-proof"><span className="eyebrow"><i /> Veg-only pizza at Takiya Mela Ground</span><span className="hero-veg-seal"><i /> 100% Veg only</span></div><h1 className="display hero-title">One good slice.<br /><em>That&apos;s the point.</em></h1><p className="hero-kicker"><b>Eat with love.</b><br />Choose your exact item from the menu, add it to your order, and send the details straight to WhatsApp.</p><div className="hero-actions"><a className="button-primary" href="#menu">See the menu <ArrowUpRight size={15} /></a><button type="button" className="button-quiet" onClick={openCart}>Your order <ShoppingBag size={15} /></button></div><div className="hero-meta"><div className="hero-status"><b>Open until 10 PM</b>Vegetarian restaurant &amp; pizzeria</div></div></div><div className="hero-stage"><Suspense fallback={null}><PizzaScene /></Suspense></div></div><a className="scroll-cue" href="#menu"><span aria-hidden="true" /> Scroll for the menu</a></section>

        <div className="opening-divider" aria-hidden="true"><span>Veg-only pizza</span><i /><span>Fresh from the oven</span><i /><span>Takiya Patan</span></div>

        <section className="menu-section" id="menu"><div className="container menu-layout"><div className="section-head"><span className="eyebrow"><i /> The exact menu</span><h2 className="display">Choose what feels good.</h2><p>Every item and price below follows the restaurant menu. Pizza sizes are shown where available; all other items are listed at their exact single price.</p></div><div className="menu-category-nav" role="tablist" aria-label="Menu categories">{MENU_CATEGORIES.map(category => <button key={category} type="button" role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? "is-active" : ""} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><div className="storefront-grid">{visibleItems.map(menuItem => <MenuCard key={menuItem.id} menuItem={menuItem} />)}</div><p className="menu-note"><b>Need a party menu?</b> Call 9369722736 or 7007800532 for anniversary, birthday, and kitty party bookings.</p></div></section>

        <section className="signature" id="story"><img className="signature-photo" src={SIGNATURE_IMAGE} alt="A freshly baked vegetarian pizza with melted cheese" /><div className="container signature-inner"><div className="signature-copy"><span className="eyebrow"><i /> The house mood</span><h2 className="display">Made for pizza lovers.</h2><p>Fresh ingredients. Loaded toppings. Perfectly baked. The whole idea is simple: make room for a hotter, happier slice.</p><a className="button-primary" href="#menu">Choose from the menu <ArrowUpRight size={15} /></a></div></div></section>

        <section className="reasons"><div className="container"><div className="section-head"><span className="eyebrow"><i /> The pizza lover&apos;s way</span><h2 className="display">Why the table stays a little longer.</h2></div><div className="reasons-grid">{reasons.map(({ icon: Icon, title, copy }) => <article className="reason-card" key={title}><Icon className="reason-card__icon" size={24} /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

        <section className="party"><img className="party-img" src={PARTY_IMAGE} alt="A warm pizza-table birthday celebration" /><div className="container party-inner"><div className="party-copy"><span className="eyebrow"><i /> Bookings</span><h2 className="display">Make your celebration extra cheesy.</h2><p>Marriage anniversaries, birthday parties, and kitty parties are welcome at The Pizza Lover&apos;s.</p><div className="booking-options">{BOOKING_OPTIONS.map(option => <span key={option}>{option}</span>)}</div><a className="button-primary" href={WHATSAPP} target="_blank" rel="noreferrer"><PartyPopper size={15} /> Ask about a booking <ArrowUpRight size={15} /></a></div></div></section>

        <section className="trust-location" id="location"><div className="container"><div className="location-grid"><div className="location-info"><span className="eyebrow"><i /> Come hungry</span><h2 className="display">Meet us at the mela ground.</h2><p>{ADDRESS}</p><div className="location-where"><MapPin size={15} /> Infront of Takiya Mela</div><div className="location-actions"><a className="location-action" href={DIRECTIONS} target="_blank" rel="noreferrer"><MapPin size={14} /> Get directions</a><a className="location-action" href="tel:+919369722736"><Phone size={14} /> 9369722736</a><a className="location-action" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={14} /> WhatsApp</a></div></div><div className="map-frame"><MapView initialZoom={14} onMapReady={map => { if (!window.google?.maps) return; const geocoder = new window.google.maps.Geocoder(); geocoder.geocode({ address: ADDRESS }, (results, status) => { if (status === "OK" && results?.[0]) { const position = results[0].geometry.location; map.setCenter(position); map.setZoom(16); new window.google.maps.Marker({ map, position, title: "The Pizza Lover's — Takiya Patan" }); } }); }} /><div className="map-overlay"><div className="map-pin"><MapPin size={23} /><b>Takiya Mela Ground</b><small>Find your next slice</small></div></div></div></div></div></section>
      </main>

      <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><Brand /><p>Fresh. Hot. Loaded with Love.<br />Veg-only pizza in Takiya Patan.</p></div><div className="footer-col"><h3>Explore</h3><a href="#home">Home</a><a href="#menu">Choose pizza</a><a href="#story">About</a><a href="#location">Location</a></div><div className="footer-col"><h3>Bring your appetite</h3><button type="button" onClick={openCart}>Your order ({itemCount})</button><a href={WHATSAPP} target="_blank" rel="noreferrer">Message on WhatsApp</a><a href="tel:+917007800532">Call 7007800532</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} The Pizza Lover&apos;s — Takiya Patan</span><span>Open until 10 PM <Clock3 size={12} className="inline align-[-2px]" /></span></div></footer>

      <nav className="mobile-bar" aria-label="Quick contact"><a href="tel:+919369722736"><Phone size={14} /> Call</a><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={14} /> WhatsApp</a><button type="button" className="cart-order" onClick={openCart}><ShoppingBag size={14} /> Order{itemCount ? ` (${itemCount})` : ""}</button></nav>
      <CartDrawer />
    </div>
  );
}
