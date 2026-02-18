import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sphere, MeshDistortMaterial, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

/* ──────────────── Helper Components ──────────────── */

const Satellite = () => {
    const groupRef = useRef();
    const antennaRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            // Complex diagonal orbit
            const radius = 6;
            groupRef.current.position.x = Math.cos(t * 0.4) * radius;
            groupRef.current.position.y = Math.sin(t * 0.6) * radius * 0.5;
            groupRef.current.position.z = Math.sin(t * 0.4) * radius;

            // Look ahead (face movement direction)
            groupRef.current.rotation.y = t * 0.4 + Math.PI / 2;
            groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
        }

        if (antennaRef.current) {
            // Pulse antenna glow
            antennaRef.current.material.emissiveIntensity = 2 + Math.sin(t * 10) * 1.5;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Satellite Body */}
            <mesh>
                <cylinderGeometry args={[0.3, 0.3, 0.8, 6]} />
                <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} emissive="#0ea5e9" emissiveIntensity={0.5} />
            </mesh>

            {/* Solar Panels - Left */}
            <mesh position={[-0.8, 0, 0]}>
                <boxGeometry args={[1, 0.4, 0.05]} />
                <meshStandardMaterial color="#0ea5e9" transparent opacity={0.7} metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Solar Panels - Right */}
            <mesh position={[0.8, 0, 0]}>
                <boxGeometry args={[1, 0.4, 0.05]} />
                <meshStandardMaterial color="#0ea5e9" transparent opacity={0.7} metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Antenna Dish */}
            <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 4, 0, 0]}>
                <coneGeometry args={[0.2, 0.2, 16]} />
                <meshStandardMaterial color="#ffffff" metalness={0.9} />
            </mesh>

            {/* Pulsing Signal Node */}
            <mesh ref={antennaRef} position={[0, 0.65, 0]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" emissiveIntensity={2} />
            </mesh>
            <pointLight position={[0, 0.65, 0]} intensity={1} distance={4} color="#67e8f9" />
        </group>
    );
};

const TalentSphere = () => {
    const sphereRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (sphereRef.current) {
            sphereRef.current.rotation.y = t * 0.1;
            sphereRef.current.rotation.x = t * 0.05;
        }
    });

    return (
        <group>
            {/* Outer Wireframe */}
            <mesh ref={sphereRef}>
                <sphereGeometry args={[3, 32, 32]} />
                <meshStandardMaterial
                    color="#0ea5e9"
                    wireframe
                    transparent
                    opacity={0.3}
                    emissive="#0ea5e9"
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Inner Core */}
            <mesh>
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshStandardMaterial
                    color="#0c4a6e"
                    transparent
                    opacity={0.1}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Glowing Ring */}
            <mesh rotation={[Math.PI / 2.5, 0, 0]}>
                <torusGeometry args={[3.8, 0.015, 16, 128]} />
                <meshBasicMaterial color="#0ea5e9" transparent opacity={0.4} />
            </mesh>
        </group>
    );
};

/* ──────────────── Main Scene ──────────────── */

const SceneContent = () => {
    return (
        <group>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <TalentSphere />
                <Satellite />
            </Float>

            {/* Atmosphere */}
            <Sparkles count={100} scale={20} size={1} speed={0.2} color="#06b6d4" />

            {/* Connecting pulses (simulated by extra sparkles or rays) */}
            <group rotation={[Math.PI / 4, 0, 0]}>
                <mesh>
                    <torusGeometry args={[8, 0.01, 2, 128]} />
                    <meshBasicMaterial color="#0ea5e9" transparent opacity={0.1} />
                </mesh>
            </group>
        </group>
    );
};

export default function CareerScene() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#020617]">
            <Canvas
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                camera={{ position: [0, 0, 15], fov: 45 }}
            >
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />

                <SceneContent />

                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
