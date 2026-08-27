/**
 * A restrained opening object: one photographic pizza slice, a natural shadow,
 * and a low-amplitude pointer tilt. No synthetic ingredients or orbit effects.
 */
import { useState } from "react";

const SLICE_IMAGE = "/manus-storage/pizza-slice-3d-hero_f670c07d.png";

export function PizzaScene() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 5, y: y * -4 });
  };

  return (
    <figure
      className="slice-opening"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <span className="slice-opening__light" aria-hidden="true" />
      <span className="slice-opening__shadow" aria-hidden="true" />
      <img
        className="slice-opening__image"
        src={SLICE_IMAGE}
        alt="A wood-fired vegetarian pizza slice with tomato, basil, olives, mushrooms, and a cheese pull"
        style={{ transform: `perspective(1000px) rotateX(${tilt.y + 3}deg) rotateY(${tilt.x - 5}deg) translate3d(${tilt.x * 0.55}px, ${tilt.y * 0.35}px, 0)` }}
      />
      <figcaption><span>Wood-fired</span> A little closer to the oven.</figcaption>
    </figure>
  );
}
