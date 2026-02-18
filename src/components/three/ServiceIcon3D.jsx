import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Icon() {
  const ref = useRef();

  useFrame(({ mouse }) => {
    ref.current.rotation.x = mouse.y * 0.4;
    ref.current.rotation.y = mouse.x * 0.4;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial
        color="#38bdf8"
        wireframe
        emissive="#38bdf8"
        emissiveIntensity={2}
      />
    </mesh>
  );
}

export default function ServiceIcon3D() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={1.5} />
      <Icon />
    </Canvas>
  );
}
