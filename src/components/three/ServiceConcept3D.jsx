import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, ContactShadows, Environment } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function BlocksSystem() {
  const group = useRef();
  useFrame(({ clock }) => {
    group.current.rotation.y = clock.elapsedTime * 0.2;
  });

  return (
    <group ref={group}>
      {[...Array(12)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[Math.cos(i) * 2, Math.sin(i) * 1.5, Math.sin(i * 0.5) * 1]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial
              color="#22d3ee"
              roughness={0.1}
              metalness={0.9}
              transparent
              opacity={0.8}
              emissive="#0ea5e9"
              emissiveIntensity={1.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function NodeNetwork() {
  const group = useRef();
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < 25; i++) {
      p.push(new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      ));
    }
    return p;
  }, []);

  useFrame(({ clock }) => {
    group.current.rotation.y = clock.elapsedTime * 0.1;
  });

  return (
    <group ref={group}>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

function CyberCore() {
  const mesh = useRef();
  useFrame(({ clock }) => {
    mesh.current.rotation.x = clock.elapsedTime * 0.5;
    mesh.current.rotation.y = clock.elapsedTime * 0.2;
  });

  return (
    <mesh ref={mesh}>
      <octahedronGeometry args={[1.8, 0]} />
      <meshStandardMaterial
        color="#38bdf8"
        wireframe
        transparent
        opacity={0.6}
        emissive="#22d3ee"
        emissiveIntensity={2.5}
      />
    </mesh>
  );
}

export default function ServiceConcept3D({ type }) {
  return (
    <div className="w-full h-full bg-blue-900/10 rounded-2xl border border-white/10 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
      <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#22d3ee" />
        <Environment preset="city" />

        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          {type === "web" && <BlocksSystem />}
          {type === "ai" && <NodeNetwork />}
          {(!type || (type !== "web" && type !== "ai")) && <CyberCore />}
        </Float>

        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.5}
          scale={10}
          blur={2.5}
          far={4.5}
        />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}

