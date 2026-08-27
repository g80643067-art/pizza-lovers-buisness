/**
 * Real Pizza Theatre
 * A photographic hero object with a pointer-led 3D presentation. The ingredient details
 * are purposefully typographic and restrained so the pizza remains recognisably real.
 */
import { useState } from "react";

const HERO_IMAGE = "/manus-storage/pizza-lovers-realistic-hero_ffb09d09.png";

export function PizzaScene() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 11, y: y * -8 });
  };

  return (
    <div
      className="pizza-scene pizza-scene--real"
      aria-label="A photo-real vegetarian pizza presented as an interactive three dimensional food object."
      role="img"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="pizza-scene__depth-grid" aria-hidden="true" />
      <div className="pizza-scene__halo" aria-hidden="true" />
      <div className="pizza-scene__orbit-line pizza-scene__orbit-line--one" aria-hidden="true" />
      <div className="pizza-scene__orbit-line pizza-scene__orbit-line--two" aria-hidden="true" />
      <div className="pizza-scene__orbit pizza-scene__orbit--one" aria-hidden="true"><span>Basil</span></div>
      <div className="pizza-scene__orbit pizza-scene__orbit--two" aria-hidden="true"><span>Cheese</span></div>
      <div className="pizza-scene__orbit pizza-scene__orbit--three" aria-hidden="true"><span>Oven 01</span></div>
      <div
        className="pizza-scene__plate"
        style={{ transform: `perspective(1150px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translate3d(${tilt.x * 0.7}px, ${tilt.y * -0.35}px, 0)` }}
      >
        <div className="pizza-scene__undershadow" aria-hidden="true" />
        <div className="pizza-scene__rim" />
        <div className="pizza-scene__photo">
          <img src={HERO_IMAGE} alt="A freshly baked vegetarian pizza with molten cheese and colourful vegetable toppings" />
          <div className="pizza-scene__shine" aria-hidden="true" />
        </div>
        <div className="pizza-scene__tag pizza-scene__tag--top"><span>01</span> oven warm</div>
        <div className="pizza-scene__tag pizza-scene__tag--bottom"><span>veg</span> loaded high</div>
      </div>
      <div className="pizza-scene__heat pizza-scene__heat--one" aria-hidden="true" />
      <div className="pizza-scene__heat pizza-scene__heat--two" aria-hidden="true" />
      <div className="pizza-scene__caption"><span /> Move with your taste</div>
    </div>
  );
}
