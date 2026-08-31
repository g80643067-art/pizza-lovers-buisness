# Logo validation notes

The desktop homepage header shows the new circular SVG logo at the left without shifting the existing navigation, order button, or hero layout. The logo visibly includes a black outer circle with red outline, a pizza illustration, yellow-edged red ribbon, and a small chef/pizza mascot.

The mobile homepage header shows the SVG logo at the left alongside the existing brand copy and the menu trigger. The logo stays contained within the header and does not obstruct the menu button or the fixed quick-contact bar. The hero, menu, and cart controls remain present and visually unchanged outside the logo area.

The footer continues to use the legacy image mark through the separate `brand-mark--legacy` path, preserving the no-other-content-change requirement.

The final Vitest suite includes a focused source contract check for the existing `#menu`, `#story`, and `#location` navigation anchors, the desktop/mobile order triggers, and the mounted cart drawer. TypeScript checking, all eight landing-design checks, and the full project suite pass; the production build also completes successfully.

An interaction-level browser check completed successfully against the preview: the header logo became visible, the desktop Menu link updated the `#menu` hash, the desktop `Your order` trigger opened and closed the cart drawer, and the mobile menu opened with its `View your order` action reopening the cart drawer.
