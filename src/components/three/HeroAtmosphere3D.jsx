import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Sparkles, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo } from "react";

function TechAtmosphere() {
  const mesh = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.15;
      mesh.current.rotation.z = t * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={mesh} position={[1.5, 0, -1]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color="#22d3ee"
          roughness={0.1}
          metalness={0.9}
          distort={0.5}
          speed={2.5}
          emissive="#0ea5e9"
          emissiveIntensity={1.5}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Outer holographic wireframe shell */}
      <mesh position={[1.5, 0, -1]} rotation={[0.5, 0.5, 0]}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.2}
          emissive="#38bdf8"
          emissiveIntensity={0.5}
        />
      </mesh>

      <Sparkles count={120} scale={12} size={3} speed={0.5} color="#22d3ee" />
    </group>
  );
}

export default function HeroAtmosphere3D() {
  return (
    <div className="w-full h-full opacity-80 relative">
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-transparent pointer-events-none" />

      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color="#0ea5e9" />

        <Stars radius={60} depth={50} count={4000} factor={4} saturation={0} fade speed={1} />

        <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
          <TechAtmosphere />
        </Float>
      </Canvas>
    </div>
  );
}

