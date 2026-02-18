import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Sparkles, PerspectiveCamera, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ──────────────── Helper Components ──────────────── */

const IconButton = ({ symbol, index, total, activeIndex, rotaryAngle, isPressed }) => {
    const meshRef = useRef();
    const angle = (index / total) * Math.PI * 2;
    const radius = 3.8;

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();

        // Position on the ring
        const currentAngle = angle + rotaryAngle;
        meshRef.current.position.x = Math.cos(currentAngle) * radius;
        meshRef.current.position.y = Math.sin(currentAngle) * radius;

        // Subtle floating
        meshRef.current.position.z = Math.sin(t * 2 + index) * 0.1;

        // Pressing effect (deeper scale reduction)
        const targetScale = isPressed ? 0.65 : 1.0;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);

        // Glow intensity (brighter when pressed)
        if (meshRef.current.children[0].material) {
            const targetEmissive = isPressed ? 10 : 1.5;
            meshRef.current.children[0].material.emissiveIntensity = THREE.MathUtils.lerp(
                meshRef.current.children[0].material.emissiveIntensity,
                targetEmissive,
                0.15
            );
        }
    });

    return (
        <group ref={meshRef}>
            {/* The circular button plate - Rotated to face the viewer */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.6, 0.6, 0.15, 32]} />
                <meshStandardMaterial
                    color="#0ea5e9"
                    emissive="#ffffff"
                    emissiveIntensity={1.5}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* The Icon Symbol - Facing viewer directly */}
            <Text
                position={[0, 0, 0.12]}
                fontSize={0.45}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {symbol}
            </Text>

            {/* Ring highlight */}
            <mesh position={[0, 0, -0.05]}>
                <torusGeometry args={[0.62, 0.02, 16, 32]} />
                <meshBasicMaterial color="#67e8f9" transparent opacity={0.6} />
            </mesh>
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
            <torusGeometry args={[radius, 0.015, 2, 100]} />
            <meshBasicMaterial color={color} transparent opacity={opacity} blending={THREE.AdditiveBlending} />
        </mesh>
    );
};

/* ──────────────── Main Component ──────────────── */

const SceneContent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [rotaryAngle, setRotaryAngle] = useState(Math.PI / 2); // Start at top
    const [targetAngle, setTargetAngle] = useState(Math.PI / 2);
    const [isPressed, setIsPressed] = useState(false);

    const icons = [
        "⚙️", // Gears
        "🔧", // Wrench
        "🎧", // Headset
        "🏆", // Trophy
        "💡", // Lightbulb
        "💬", // Chat
    ];

    // Stepped animation sequence: Rotate -> Press -> Full Spin -> Release -> Next
    useEffect(() => {
        const iconCycle = 5000; // 5s per icon cycle to allow for full rotation

        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % icons.length;

            // 1. Move to next icon
            setActiveIndex(nextIndex);
            setTargetAngle(-(nextIndex / icons.length) * Math.PI * 2 + Math.PI / 2);
            setIsPressed(false);

            // 2. Press after it settles (1.2s)
            setTimeout(() => {
                setIsPressed(true);

                // 3. Start a full 360 spin WHILE pressed (2s duration)
                setTimeout(() => {
                    setTargetAngle(prev => prev - Math.PI * 2);

                    // 4. Release after the spin is well underway (1.8s)
                    setTimeout(() => {
                        setIsPressed(false);
                    }, 1800);
                }, 800);
            }, 1200);

        }, iconCycle);

        return () => clearInterval(interval);
    }, [activeIndex, icons.length]);

    useFrame(() => {
        // Smoothly rotate the whole ring (slightly slower for spin feel)
        setRotaryAngle((prev) => THREE.MathUtils.lerp(prev, targetAngle, 0.04));
    });

    return (
        <group rotation={[Math.PI / 6, 0, 0]}>
            {/* Central Disc */}
            <group>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[1.5, 1.5, 0.2, 64]} />
                    <meshStandardMaterial
                        color="#0c4a6e"
                        emissive="#0ea5e9"
                        emissiveIntensity={1}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>
                <Text
                    position={[0, 0, 0.15]}
                    fontSize={0.4}
                    fontWeight="bold"
                    color="white"
                >
                    SERVICE
                    <meshStandardMaterial emissive="#67e8f9" emissiveIntensity={2} />
                </Text>

                {/* Internal Glow */}
                <pointLight intensity={2} distance={5} color="#22d3ee" />
            </group>

            {/* Rotary Ring HUD Elements */}
            <HUDCircle radius={3.8} speed={0.5} opacity={0.3} />
            <HUDCircle radius={4.2} speed={-0.3} opacity={0.15} />
            <HUDCircle radius={3.4} speed={0.8} color="#0ea5e9" opacity={0.4} />

            {/* Icon Buttons */}
            {icons.map((symbol, i) => (
                <IconButton
                    key={i}
                    symbol={symbol}
                    index={i}
                    total={icons.length}
                    activeIndex={activeIndex}
                    isPressed={isPressed && activeIndex === i}
                    rotaryAngle={rotaryAngle}
                />
            ))}

            {/* Background Particles */}
            <Sparkles count={50} scale={10} size={2} speed={0.3} color="#22d3ee" />
        </group>
    );
};

export default function ServiceRotaryScene() {
    return (
        <div className="w-full h-full">
            <Canvas
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 2]}
                camera={{ position: [0, 0, 12], fov: 45 }}
            >
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#0ea5e9" />

                <SceneContent />

                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
