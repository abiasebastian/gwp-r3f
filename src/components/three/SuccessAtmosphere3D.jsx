import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Sparkles, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo } from "react";


function TechCore() {
    const mesh = useRef();

    useFrame(({ clock }) => {
        const t = clock.elapsedTime;
        if (mesh.current) {
            // Rotation
            mesh.current.rotation.x = t * 0.1;
            mesh.current.rotation.y = t * 0.15;
            mesh.current.rotation.z = t * 0.05;

            // Floating movement across the background
            mesh.current.position.x = Math.sin(t * 0.3) * 5;
            mesh.current.position.y = Math.cos(t * 0.2) * 3;
            mesh.current.position.z = -3 + Math.sin(t * 0.1) * 2;
        }
    });

    return (
        <mesh ref={mesh} position={[0, 0, -3]}>
            <octahedronGeometry args={[2.5, 0]} />
            <meshStandardMaterial
                color="#38bdf8"
                emissive="#06b6d4"
                emissiveIntensity={3}
                wireframe
                transparent
                opacity={0.4}
            />
        </mesh>
    );
}

export default function SuccessAtmosphere3D() {
    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1.2} color="#22d3ee" />
                <pointLight position={[-10, -5, -10]} intensity={0.8} color="#0ea5e9" />

                <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1.5} />
                <Sparkles count={60} scale={20} size={4} speed={0.6} color="#38bdf8" />

                {/* Central Pulsing Tech Core */}
                <TechCore />

                {/* Soft Background Glow Sphere */}
                <mesh position={[0, 0, -5]} scale={[15, 15, 1]}>
                    <planeGeometry />
                    <meshBasicMaterial
                        color="#0c4a6e"
                        transparent
                        opacity={0.1}
                    />
                </mesh>
            </Canvas>
        </div>
    );
}

