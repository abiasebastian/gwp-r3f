import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Sparkles, PerspectiveCamera, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ──────────────── Helper Components ──────────────── */

const Gear = ({ teeth = 12, radius = 1, thickness = 0.3, color = "#0ea5e9", speed = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) => {
    const gearRef = useRef();

    const gearGeometry = useMemo(() => {
        const shape = new THREE.Shape();
        const innerRadius = radius * 0.8;
        const toothDepth = radius * 0.2;
        const toothWidth = (Math.PI * 2) / teeth * 0.5;

        for (let i = 0; i < teeth; i++) {
            const angle = (i / teeth) * Math.PI * 2;

            // Move to start of tooth
            const x1 = Math.cos(angle - toothWidth / 2) * innerRadius;
            const y1 = Math.sin(angle - toothWidth / 2) * innerRadius;
            if (i === 0) shape.moveTo(x1, y1);
            else shape.lineTo(x1, y1);

            // Outside part of tooth
            const x2 = Math.cos(angle - toothWidth / 4) * (innerRadius + toothDepth);
            const y2 = Math.sin(angle - toothWidth / 4) * (innerRadius + toothDepth);
            shape.lineTo(x2, y2);

            const x3 = Math.cos(angle + toothWidth / 4) * (innerRadius + toothDepth);
            const y3 = Math.sin(angle + toothWidth / 4) * (innerRadius + toothDepth);
            shape.lineTo(x3, y3);

            // Back to inner radius
            const x4 = Math.cos(angle + toothWidth / 2) * innerRadius;
            const y4 = Math.sin(angle + toothWidth / 2) * innerRadius;
            shape.lineTo(x4, y4);
        }
        shape.closePath();

        // Hole in the middle
        const holePath = new THREE.Path();
        holePath.absarc(0, 0, radius * 0.3, 0, Math.PI * 2, true);
        shape.holes.push(holePath);

        const extrudeSettings = {
            steps: 2,
            depth: thickness,
            bevelEnabled: true,
            bevelThickness: 0.05,
            bevelSize: 0.05,
            bevelOffset: 0,
            bevelSegments: 1
        };

        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }, [teeth, radius, thickness]);

    useFrame((state) => {
        if (gearRef.current) {
            gearRef.current.rotation.z += 0.01 * speed;
        }
    });

    return (
        <mesh ref={gearRef} position={position} rotation={rotation} geometry={gearGeometry}>
            <meshStandardMaterial
                color={color}
                metalness={0.9}
                roughness={0.1}
                emissive={color}
                emissiveIntensity={0.5}
            />
        </mesh>
    );
};

const StylizedHand = () => {
    // Creating a simplified "hand" shape using primitive geometries for a tech look
    return (
        <group position={[0, -2.5, -0.5]} rotation={[-Math.PI / 6, 0, 0]}>
            {/* Palm/Base */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[3, 0.5, 2]} />
                <meshStandardMaterial color="#0c4a6e" metalness={0.9} roughness={0.2} emissive="#0ea5e9" emissiveIntensity={0.2} />
            </mesh>

            {/* Thumb-like extension */}
            <mesh position={[-1.8, 0.2, 0.5]} rotation={[0, 0, Math.PI / 4]}>
                <capsuleGeometry args={[0.25, 1, 4, 16]} />
                <meshStandardMaterial color="#0c4a6e" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Fingers-like background block */}
            <mesh position={[0.5, 0.5, -0.2]} rotation={[Math.PI / 12, 0, 0]}>
                <boxGeometry args={[2.5, 0.4, 1.5]} />
                <meshStandardMaterial color="#0c4a6e" metalness={0.9} roughness={0.2} />
            </mesh>

            <pointLight position={[0, 1, 1]} intensity={1} color="#22d3ee" />
        </group>
    );
};

const HUDCircle = ({ radius, color = "#22d3ee", opacity = 0.2, speed = 1 }) => {
    const ref = useRef();
    useFrame(({ clock }) => {
        if (ref.current) ref.current.rotation.z = clock.elapsedTime * 0.2 * speed;
    });
    return (
        <mesh ref={ref}>
            <torusGeometry args={[radius, 0.01, 2, 128]} />
            <meshBasicMaterial color={color} transparent opacity={opacity} blending={THREE.AdditiveBlending} />
        </mesh>
    );
};

/* ──────────────── Main Component ──────────────── */

const SceneContent = () => {
    return (
        <group position={[0, 0, 0]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Stylized Hand - Scaled down */}
                <group scale={0.7}>
                    <StylizedHand />
                </group>

                {/* The Gears - Scaled down/Adjusted */}
                <group position={[0, 0.2, 0]}>
                    {/* Big Gear */}
                    <Gear
                        teeth={12}
                        radius={1.2}
                        thickness={0.3}
                        color="#0ea5e9"
                        speed={1}
                        position={[-0.6, 0, 0]}
                    />

                    {/* Small Gear - interlocked */}
                    {/* Offset Adjusted for new radii */}
                    <Gear
                        teeth={8}
                        radius={0.8}
                        thickness={0.3}
                        color="#67e8f9"
                        speed={-1.5}
                        position={[1.1, 0.8, 0]}
                        rotation={[0, 0, Math.PI / 8]}
                    />
                </group>
            </Float>

            {/* HUD Elements - Also slightly smaller */}
            <group rotation={[Math.PI / 3, 0, 0]} position={[0, -1, -2]}>
                <HUDCircle radius={4} speed={0.5} />
                <HUDCircle radius={4.5} speed={-0.3} opacity={0.1} />
                <HUDCircle radius={3.5} speed={0.8} color="#0ea5e9" opacity={0.3} />
            </group>

            {/* Ambient Background */}
            <Sparkles count={30} scale={10} size={1.5} speed={0.3} color="#22d3ee" />
        </group>
    );
};

export default function ServiceGearsScene() {
    return (
        <div className="w-full h-[600px]">
            <Canvas
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                camera={{ position: [0, 0, 7], fov: 40 }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#0ea5e9" />

                <SceneContent />

                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
