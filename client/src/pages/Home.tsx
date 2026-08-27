/**
 * EMBER ATELIER DESIGN REMINDER
 * A charcoal-and-ember Italian editorial page. Use asymmetric food-film composition,
 * left-aligned expressive display type, and tactile motion—not generic restaurant cards.
 */
import { Button } from "@/components/ui/button";
import { MapView } from "@/components/Map";
import { lazy, Suspense, useState } from "react";
import {
  ArrowUpRight,
  ChevronRight,
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
  Plus,
  Star,
  X,
} from "lucide-react";

const WHATSAPP = "https://wa.me/919369722736?text=Hello%20The%20Pizza%20Lover%27s%2C%20I%20would%20like%20to%20order%20or%20see%20today%27s%20menu.";
const DIRECTIONS = "https://www.google.com/maps/search/?api=1&query=Takiya%20Mela%20Ground%2C%20Takiya%20Rd%2C%20Patan%2C%20Uttar%20Pradesh%20209867";
const ADDRESS = "Takiya Mela Ground, Takiya Rd, Patan, Takiya, Uttar Pradesh 209867";
const HERO_IMAGE = "/manus-storage/pizza-lovers-realistic-hero_ffb09d09.png";
const MENU_IMAGE = "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=88";
const SIGNATURE_IMAGE = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1800&q=88";
const PARTY_IMAGE = "/manus-storage/pizza-lovers-birthday-table_0c82266e.png";
const PizzaScene = lazy(() => import("@/components/PizzaScene").then((module) => ({ default: module.PizzaScene })));

const menuCategories = [
  { id: "pizza", label: "Pizza", icon: "01", note: "Veg-only pizzas, made fresh for your table." },
  { id: "cheese", label: "Cheese Specials", icon: "02", note: "For the days when extra cheese is the whole plan." },
  { id: "veg", label: "Veg Specials", icon: "03", note: "Fresh vegetarian favourites, made for big appetite." },
  { id: "party", label: "Birthday / Party", icon: "04", note: "Pizza-ready celebrations for kids and their crew." },
  { id: "eat", label: "All You Can Eat", icon: "05", note: "Ask us about the all-you-can-eat option." },
];

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
      <span className="brand-copy">
        <b>The Pizza Lover&apos;s</b>
        {!compact && <small>Takiya Patan</small>}
      </span>
    </a>
  );
}

export default function Home() {
  const [selected, setSelected] = useState(menuCategories[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeCategory = menuCategories.find((category) => category.id === selected) ?? menuCategories[0];

  return (
    <div className="site-shell">
      <header className="nav">
        <div className="container nav-inner">
          <Brand />
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#menu">Menu</a>
            <a href="#story">Our Story</a>
            <a href="#reviews">Reviews</a>
            <a href="#location">Location</a>
          </nav>
          <a className="nav-order" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={14} /> Order on WhatsApp</a>
          <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <MenuIcon size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="absolute left-0 right-0 top-[68px] border-b border-white/10 bg-[#1a110e]/98 px-5 py-5 shadow-2xl backdrop-blur-xl md:hidden">
            <nav className="grid gap-4" aria-label="Mobile navigation">
              {["Menu", "Our Story", "Reviews", "Location"].map((link) => <a className="text-sm font-bold uppercase tracking-[.14em] text-[#f5dec0]" onClick={() => setMenuOpen(false)} href={`#${link === "Our Story" ? "story" : link.toLowerCase()}`} key={link}>{link}</a>)}
              <a className="button-primary mt-2 w-fit" href={WHATSAPP} target="_blank" rel="noreferrer">Order on WhatsApp <ArrowUpRight size={15} /></a>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section className="hero" id="home">
          <img className="hero-photo" src={HERO_IMAGE} alt="" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-proof"><span className="eyebrow"><i /> Veg-only pizza at Takiya Mela Ground</span><span className="hero-veg-seal"><i /> 100% Veg only</span></div>
              <h1 className="display hero-title">Pizza that<br /><em>pulls you closer.</em></h1>
              <p className="hero-kicker"><b>Fresh. Hot. Loaded with Love.</b><br />A better reason to stay for one more slice.</p>
              <div className="hero-actions">
                <a className="button-primary" href={WHATSAPP} target="_blank" rel="noreferrer">Order on WhatsApp <ArrowUpRight size={15} /></a>
                <a className="button-quiet" href="#menu">Explore menu <ChevronRight size={15} /></a>
              </div>
              <div className="hero-meta">
                <div className="rating-chip"><Star size={16} /><span><strong>4.3 / 5</strong><small>58 Reviews</small></span></div>
                <div className="hero-status"><b>Open until 10 PM</b>₹1–200 per person</div>
              </div>
            </div>
            <div className="hero-stage"><Suspense fallback={null}><PizzaScene /></Suspense></div>
          </div>
          <div className="hero-rail">Scroll to savour</div>
        </section>

        <div className="marquee" aria-hidden="true"><div className="marquee-track">{Array.from({ length: 2 }, (_, index) => <span key={index}>Veg-only pizza <i /> Fresh from the oven <i /> Birthdays get cheesy <i /> Takiya Patan <i /> All you can eat <i /></span>)}</div></div>

        <section className="menu-section" id="menu">
          <div className="container menu-layout">
            <div className="section-head"><span className="eyebrow"><i /> Choose your kind of cheesy</span><h2 className="display">The menu, with more appetite in it.</h2><p>We keep the experience honest: select a category, then ask us for today&apos;s exact options and prices on WhatsApp.</p></div>
            <div className="category-bar" role="tablist" aria-label="Menu categories">
              {menuCategories.map((category) => <Button key={category.id} variant="ghost" className="category-button" data-active={selected === category.id} onClick={() => setSelected(category.id)} role="tab" aria-selected={selected === category.id}>{category.icon}&nbsp; {category.label}</Button>)}
            </div>
            <div className="menu-body">
              <div className="menu-art"><img src={MENU_IMAGE} alt="A close-up selection of vegetarian pizzas" /><div className="menu-art-copy"><strong>Find your favourite kind of slice.</strong><span>Freshly prepared for your table</span></div></div>
              <div className="menu-cards">
                {[activeCategory, ...menuCategories.filter((category) => category.id !== selected).slice(0, 3)].map((category, index) => <article className="food-card" key={category.id}>
                  <div className="food-card__top"><span className="food-card__icon">{category.icon}</span><span className="veg-seal"><i /> Veg only</span></div>
                  <h3>{category.label}</h3><p>{category.note}</p>
                  <div className="food-card__bottom"><small>{index === 0 ? "Selected category" : "Ask for today’s options"}<br />Price on request</small><a className="food-card__order" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label={`Ask about ${category.label} on WhatsApp`}><Plus size={16} /></a></div>
                </article>)}
              </div>
            </div>
            <p className="menu-note"><b>Good to know:</b> The Pizza Lover&apos;s is veg-only. For exact dishes, availability and today&apos;s prices, place your request directly on WhatsApp.</p>
          </div>
        </section>

        <section className="signature" id="story">
          <img className="signature-photo" src={SIGNATURE_IMAGE} alt="A freshly baked vegetarian pizza with melted cheese" />
          <div className="container signature-inner"><div className="signature-copy"><span className="eyebrow"><i /> The house mood</span><h2 className="display">Made for pizza lovers.</h2><p>Fresh ingredients. Loaded toppings. Perfectly baked. The whole idea is simple: make room for a hotter, happier slice.</p><a className="button-primary" href={WHATSAPP} target="_blank" rel="noreferrer">Order now <ArrowUpRight size={15} /></a></div></div>
          <div className="signature-coin">Fresh<br />Hot<br />Love</div>
        </section>

        <section className="reasons">
          <div className="container"><div className="section-head"><span className="eyebrow"><i /> The pizza lover&apos;s way</span><h2 className="display">Why the table stays a little longer.</h2></div><div className="reasons-grid">{reasons.map(({ icon: Icon, title, copy }) => <article className="reason-card" key={title}><Icon className="reason-card__icon" size={24} /><h3>{title}</h3><p>{copy}</p></article>)}</div></div>
        </section>

        <section className="party">
          <img className="party-img" src={PARTY_IMAGE} alt="A warm birthday party setup" />
          <div className="container party-inner"><div className="party-copy"><span className="eyebrow"><i /> Good for kids&apos; birthdays</span><h2 className="display">Make your birthday extra cheesy.</h2><p>Bring the birthday energy. We&apos;ll bring the pizza-table atmosphere for a celebration the kids can gather around.</p><a className="button-primary" href={WHATSAPP} target="_blank" rel="noreferrer"><PartyPopper size={15} /> Plan your party <ArrowUpRight size={15} /></a></div></div>
        </section>

        <section className="trust-location" id="reviews">
          <div className="container">
            <div className="review-block"><div><span className="eyebrow"><i /> Community signal</span><div className="rating-hero">4.3<sup>/5</sup></div></div><div className="review-copy"><h3>58 reviews, one invitation.</h3><p>See the current customer feedback directly on the restaurant&apos;s public listing. We do not reproduce or invent review text here.</p><a className="review-link" href={DIRECTIONS} target="_blank" rel="noreferrer">View all reviews <ExternalLink size={14} /></a></div></div>
            <div className="location-grid" id="location"><div className="location-info"><span className="eyebrow"><i /> Come hungry</span><h2 className="display">Meet us at the mela ground.</h2><p>{ADDRESS}</p><div className="location-where"><MapPin size={15} /> Located in Takiya Mela Ground</div><div className="location-actions"><a className="location-action" href={DIRECTIONS} target="_blank" rel="noreferrer"><MapPin size={14} /> Get directions</a><a className="location-action" href="tel:+919369722736"><Phone size={14} /> Call now</a><a className="location-action" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={14} /> WhatsApp</a></div></div><div className="map-frame"><MapView initialZoom={14} onMapReady={(map) => { if (!window.google?.maps) return; const geocoder = new window.google.maps.Geocoder(); geocoder.geocode({ address: ADDRESS }, (results, status) => { if (status === "OK" && results?.[0]) { const position = results[0].geometry.location; map.setCenter(position); map.setZoom(16); new window.google.maps.Marker({ map, position, title: "The Pizza Lover's — Takiya Patan" }); } }); }} /><div className="map-overlay"><div className="map-pin"><MapPin size={23} /><b>Takiya Mela Ground</b><small>Find your next slice</small></div></div></div></div>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><Brand /><p>Fresh. Hot. Loaded with Love.<br />Veg-only pizza in Takiya Patan.</p></div><div className="footer-col"><h3>Explore</h3><a href="#home">Home</a><a href="#menu">Menu</a><a href="#story">About</a><a href="#reviews">Reviews</a><a href="#location">Location</a></div><div className="footer-col"><h3>Bring your appetite</h3><a href={WHATSAPP} target="_blank" rel="noreferrer">Order on WhatsApp</a><a href="tel:+919369722736">093697 22736</a><a href={DIRECTIONS} target="_blank" rel="noreferrer">Get directions</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} The Pizza Lover&apos;s — Takiya Patan</span><span>Open until 10 PM <Clock3 size={12} className="inline align-[-2px]" /></span></div></footer>

      <nav className="mobile-bar" aria-label="Quick contact"><a href="tel:+919369722736"><Phone size={14} /> Call</a><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={14} /> WhatsApp</a><a href={WHATSAPP} target="_blank" rel="noreferrer"><Pizza size={14} /> Order</a></nav>
    </div>
  );
}
