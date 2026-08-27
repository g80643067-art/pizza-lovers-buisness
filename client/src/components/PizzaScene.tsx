/**
 * EMBER ATELIER DESIGN REMINDER
 * A contemporary Italian editorial food-film: the pizza is a warmly lit 3D protagonist
 * surrounded by a restrained ingredient orbit. Motion must feel tactile, not game-like.
 */
import { ContactShadows, Float, Sparkles, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import type * as THREE from "three";

type ToppingData = { position: [number, number, number]; color: string; radius: number };

const toppings: ToppingData[] = [
  { position: [-0.62, 0.18, 0.32], color: "#eead39", radius: 0.22 },
  { position: [0.26, 0.21, 0.46], color: "#df4738", radius: 0.18 },
  { position: [0.64, 0.21, -0.22], color: "#f0ba36", radius: 0.22 },
  { position: [-0.25, 0.2, -0.48], color: "#e14c3c", radius: 0.17 },
  { position: [0.05, 0.25, -0.02], color: "#e9b237", radius: 0.19 },
];

function Topping({ position, color, radius }: ToppingData) {
  return (
    <group position={position} rotation={[-Math.PI / 2, 0.3, 0.2]}>
      <mesh castShadow>
        <torusGeometry args={[radius, 0.065, 12, 22]} />
        <meshStandardMaterial color={color} roughness={0.52} metalness={0.04} />
      </mesh>
      <mesh position={[0.04, 0.02, 0.01]} castShadow>
        <sphereGeometry args={[radius * 0.52, 16, 16]} />
        <meshStandardMaterial color="#38190f" roughness={0.72} />
      </mesh>
    </group>
  );
}

function BasilLeaf({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshStandardMaterial color="#2f6d37" roughness={0.6} />
    </mesh>
  );
}

function IngredientOrbit() {
  return (
    <group>
      <Float speed={1.4} rotationIntensity={1.1} floatIntensity={1.25}>
        <BasilLeaf position={[-2.35, 1.2, 0.3]} rotation={[0.5, 0.4, 0.7]} />
      </Float>
      <Float speed={1.9} rotationIntensity={0.8} floatIntensity={1.1}>
        <mesh position={[2.12, 0.95, 0.1]} rotation={[0.2, 0.5, 0]} castShadow>
          <torusGeometry args={[0.17, 0.055, 12, 18]} />
          <meshStandardMaterial color="#23150f" roughness={0.58} />
        </mesh>
      </Float>
      <Float speed={1.25} rotationIntensity={1.5} floatIntensity={1.45}>
        <mesh position={[1.72, -1.42, 0.45]} rotation={[0.4, 0.1, 0.4]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.09, 32]} />
          <meshStandardMaterial color="#d94c3d" roughness={0.52} />
        </mesh>
      </Float>
      <Float speed={1.7} rotationIntensity={1.1} floatIntensity={1.25}>
        <BasilLeaf position={[-1.72, -1.38, 0.24]} rotation={[0.6, -0.25, -0.6]} />
      </Float>
    </group>
  );
}

function PizzaModel() {
  const group = useRef<THREE.Group>(null);
  const scrollProgress = useRef(0);
  const pizzaTexture = useTexture("/manus-storage/pizza-lovers-hero_0f182ab1.png");

  useEffect(() => {
    pizzaTexture.center.set(0.67, 0.5);
    pizzaTexture.repeat.set(1.34, 1.34);
    pizzaTexture.needsUpdate = true;
  }, [pizzaTexture]);

  useEffect(() => {
    const updateScroll = () => {
      scrollProgress.current = Math.min(window.scrollY / Math.max(window.innerHeight * 2, 1), 1);
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.17;
    group.current.rotation.x = 0.43 + state.pointer.y * 0.18 - scrollProgress.current * 0.22;
    group.current.rotation.z = state.pointer.x * 0.15 + Math.sin(state.clock.elapsedTime * 0.55) * 0.025;
    group.current.position.y = -scrollProgress.current * 0.42;
    group.current.position.x = state.pointer.x * 0.18;
  });

  return (
    <group ref={group} rotation={[0.43, 0.2, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.48, 1.53, 0.2, 72]} />
        <meshStandardMaterial color="#a84d22" roughness={0.68} metalness={0.02} />
      </mesh>
      <mesh position={[0, 0.13, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[1.38, 0.13, 18, 72]} />
        <meshStandardMaterial color="#d78636" roughness={0.64} metalness={0.01} />
      </mesh>
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.27, 1.27, 0.055, 72]} />
        <meshStandardMaterial color="#b3311f" roughness={0.72} />
      </mesh>
      <mesh position={[0, 0.215, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <circleGeometry args={[1.23, 72]} />
        <meshStandardMaterial map={pizzaTexture} roughness={0.52} metalness={0.01} />
      </mesh>
      {toppings.map((topping, index) => <Topping key={index} {...topping} />)}
      <BasilLeaf position={[-0.7, 0.28, -0.48]} rotation={[0.5, 0.1, 0.85]} />
      <BasilLeaf position={[0.7, 0.28, 0.42]} rotation={[0.35, 0.2, -0.55]} />
      <BasilLeaf position={[-0.12, 0.29, 0.76]} rotation={[0.6, 0.4, 0.2]} />
      <mesh position={[0.28, 0.42, 0.95]} rotation={[0.05, 0.15, 0.2]} castShadow>
        <cylinderGeometry args={[0.04, 0.07, 0.54, 18]} />
        <meshStandardMaterial color="#f7d77b" transparent opacity={0.86} roughness={0.42} />
      </mesh>
    </group>
  );
}

export function PizzaScene() {
  return (
    <div className="pizza-scene" aria-label="Interactive 3D vegetarian pizza. Move your pointer to shift the view.">
      <Canvas shadows dpr={[1, 1.65]} camera={{ position: [0, 0.45, 5.2], fov: 42 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.55} color="#ffe7bd" />
        <directionalLight position={[3.8, 4, 3]} intensity={3.4} color="#ffbf73" castShadow />
        <pointLight position={[-3, -0.4, 2]} intensity={4.3} color="#f4511e" distance={8} />
        <pointLight position={[0, 2.7, -3]} intensity={2.4} color="#fff1d2" distance={6} />
        <Suspense fallback={null}>
          <PizzaModel />
          <IngredientOrbit />
        </Suspense>
        <Sparkles count={36} scale={[5, 4, 3]} size={1.8} speed={0.2} color="#f9c476" opacity={0.38} />
        <ContactShadows position={[0, -1.62, 0]} opacity={0.62} scale={5.1} blur={2.7} far={4} color="#4c160d" />
      </Canvas>
      <div className="pizza-scene__caption"><span /> Move with your taste</div>
    </div>
  );
}
