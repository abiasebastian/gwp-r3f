import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

const Hexagon = ({ position, color, delay, speedFactor }) => {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // Smooth, varied vertical movement for a "breathing" GLTF effect
        if (meshRef.current) {
            const yOffset = Math.sin(time * 0.4 * speedFactor + delay) * 0.3;
            meshRef.current.position.y = position[1] + yOffset;
            meshRef.current.rotation.z = Math.cos(time * 0.1 + delay) * 0.02;
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            rotation={[Math.PI / 2, 0, Math.PI / 6]}
            castShadow
            receiveShadow
        >
            <cylinderGeometry args={[1, 1, 0.8, 6]} />
            <meshPhysicalMaterial
                color={color}
                roughness={0.4}
                metalness={0.1}
                clearcoat={0.3}
                clearcoatRoughness={0.2}
                flatShading={false}
            />
        </mesh>
    );
};

const HexGrid = () => {
    const grid = useMemo(() => {
        const hexes = [];
        const radius = 1;
        const width = Math.sqrt(3) * radius;
        const height = 2 * radius;

        const rows = 14;
        const cols = 14;

        // Exact colors from the provided image
        const colors = [
            '#C4B5A6', // Primary Beige
            '#B8A899', // Warm Brown
            '#F5F0E1', // Accent Cream
            '#E8D5C4', // Soft Gold
            '#D9CDC1'  // Neutral Taupe
        ];

        for (let r = -rows / 2; r < rows / 2; r++) {
            for (let c = -cols / 2; c < cols / 2; c++) {
                const x = c * width + (r % 2 === 0 ? 0 : width / 2);
                const z = r * (height * 0.75);
                const color = colors[Math.floor(Math.random() * colors.length)];
                const delay = Math.random() * Math.PI * 2;
                const speedFactor = 0.5 + Math.random() * 0.5;

                hexes.push({
                    position: [x, 0, z],
                    color,
                    delay,
                    speedFactor,
                    id: `${r}-${c}`
                });
            }
        }
        return hexes;
    }, []);

    return (
        <group rotation={[-Math.PI / 8, 0, 0]} position={[0, -2, -5]}>
            {grid.map((hex) => (
                <Hexagon key={hex.id} {...hex} />
            ))}
        </group>
    );
};

export default function HexBackground3D() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 12, 18]} fov={50} />

                <color attach="background" args={['#050510']} />

                <ambientLight intensity={1.5} />

                {/* Debug Marker */}
                <mesh position={[0, 0, 5]}>
                    <boxGeometry args={[0.5, 0.5, 0.5]} />
                    <meshStandardMaterial color="red" emissive="red" emissiveIntensity={2} />
                </mesh>

                <directionalLight
                    position={[10, 20, 10]}
                    intensity={3}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                    color="#F5F0E1"
                />

                <pointLight position={[-10, 10, -5]} intensity={2} color="#C4B5A6" />

                <Suspense fallback={null}>
                    <HexGrid />
                </Suspense>

                <Sparkles
                    count={120}
                    scale={30}
                    size={3}
                    speed={0.2}
                    color="#F5F0E1"
                    opacity={0.6}
                />
            </Canvas>
        </div>
    );
}
