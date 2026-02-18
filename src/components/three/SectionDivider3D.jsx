import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Shard({ position, color }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.2;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color={color} wireframe transparent opacity={0.2} />
    </mesh>
  );
}

export default function SectionDivider3D() {
  return (
    <div className="w-full h-32 opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <group>
            <Shard position={[-3, 0, 0]} color="#3b82f6" />
            <Shard position={[0, 1, -1]} color="#60a5fa" />
            <Shard position={[3, -0.5, 0]} color="#22d3ee" />
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
