import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float, Instance, Instances, Environment } from '@react-three/drei';
import * as THREE from 'three';


const PixelParticles = () => {
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI / 4) + (Math.random() * 0.8);
            const radius = 3.2 + Math.random() * 1; // Slightly further out
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            temp.push({ position: [x, y, 0], scale: 0.12 + Math.random() * 0.1 });
        }
        return temp;
    }, []);

    return (
        <group>
            {particles.map((p, i) => (
                <mesh key={i} position={p.position}>
                    <boxGeometry args={[p.scale, p.scale, p.scale]} />
                    <meshStandardMaterial color={i % 2 === 0 ? "#00ffff" : "#0088ff"} />
                </mesh>
            ))}
        </group>
    );
};

const TopSwoosh = () => {
    // Top half of the "circle" / hold
    // Positioned to cup the top of the text
    return (
        <group>
            {/* Main Cyan Arc */}
            <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
                {/* Tube to look like a swoosh - slightly longer arc */}
                <torusGeometry args={[3.2, 0.15, 16, 60, Math.PI * 0.9]} />
                <meshStandardMaterial color="#00ffff" />
            </mesh>

            {/* Accent Dark Arc */}
            <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 4 + 0.2]}>
                <torusGeometry args={[3.5, 0.05, 16, 60, Math.PI * 0.6]} />
                <meshStandardMaterial color="#0088ff" opacity={0.5} transparent />
            </mesh>

            <PixelParticles />
        </group>
    )
}

const BottomHand = () => {
    const groupRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // Gentle float/breath
        if (groupRef.current) {
            // Subtle "breathing" scale or rotation to feel alive
            const breath = Math.sin(time * 1.5) * 0.02;
            groupRef.current.scale.setScalar(1 + breath);
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.5, 0]}>
            {/* Main Cyan Swoosh (Hand Arm) - slightly longer arc */}
            <mesh rotation={[0, 0, Math.PI * 1.15]}>
                <torusGeometry args={[3.2, 0.2, 16, 60, Math.PI * 0.9]} />
                <meshStandardMaterial color="#00ffff" />
            </mesh>

            {/* Accent Dark Swoosh */}
            <mesh rotation={[0, 0, Math.PI * 1.3]}>
                <torusGeometry args={[3.0, 0.08, 16, 60, Math.PI * 0.6]} />
                <meshStandardMaterial color="#0088ff" opacity={0.5} transparent />
            </mesh>

            {/* "Hand" stylized end - shifted slightly inside */}
            <mesh position={[2.0, -2.4, 0]} rotation={[0, 0, -0.4]}>
                <boxGeometry args={[0.8, 0.4, 0.3]} />
                <meshStandardMaterial color="#00ffff" />
            </mesh>
            <mesh position={[2.0, -2.4, 0.1]} rotation={[0, 0, -0.4]}>
                <boxGeometry args={[0.9, 0.2, 0.2]} />
                <meshStandardMaterial color="#0088ff" />
            </mesh>
        </group>
    )
}

const LogoText = () => {
    return (
        <group position={[0, -0.2, 0]}>
            <Center top>
                <Text3D
                    font="/fonts/helvetiker_bold.typeface.json"
                    size={0.65}
                    height={0.15}
                    curveSegments={12}
                    letterSpacing={0.06}
                >
                    GLOBAL
                    <meshStandardMaterial color="#fff" />
                </Text3D>
            </Center>
            <Center bottom position={[0, -0.7, 0]}>
                <Text3D
                    font="/fonts/helvetiker_bold.typeface.json"
                    size={0.32}
                    height={0.08}
                    curveSegments={12}
                    letterSpacing={0.08}
                >
                    WEB PRODUCTION
                    <meshStandardMaterial color="#ccc" />
                </Text3D>
            </Center>
        </group>
    );
};

const LogoContent = () => {
    const groupRef = useRef();
    const topRef = useRef();
    const bottomRef = useRef();

    // Track if we have initialized the starting rotations
    const initialized = useRef(false);

    useFrame((state) => {
        // Initialize rotations once
        if (!initialized.current && topRef.current && bottomRef.current) {
            // Top starts mostly open (rotated +120 deg)
            topRef.current.rotation.z = Math.PI * 0.7;
            // Bottom starts mostly open (rotated -120 deg)
            bottomRef.current.rotation.z = -Math.PI * 0.7;
            initialized.current = true;
        }

        if (groupRef.current) {
            // Scale entrance for the whole group
            groupRef.current.scale.lerp(new THREE.Vector3(0.85, 0.85, 0.85), 0.05);
        }

        if (topRef.current) {
            // Animate Top Swoosh closing in (to 0)
            topRef.current.rotation.z = THREE.MathUtils.lerp(topRef.current.rotation.z, 0, 0.04);
        }

        if (bottomRef.current) {
            // Animate Bottom Hand closing in (to 0)
            bottomRef.current.rotation.z = THREE.MathUtils.lerp(bottomRef.current.rotation.z, 0, 0.04);
        }
    });

    return (
        <Center>
            <group ref={groupRef} scale={0}>
                {/* Top Part */}
                <group ref={topRef}>
                    <TopSwoosh />
                </group>

                {/* Text stays static in middle */}
                <LogoText />

                {/* Bottom Part */}
                <group ref={bottomRef}>
                    <BottomHand />
                </group>
            </group>
        </Center>
    )
}

export default function Logo3D({ className = "w-64 h-24" }) {
    return (
        <div className={className}>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={0.7} />
                <pointLight position={[-10, -10, -10]} intensity={0.3} />
                <pointLight position={[0, 0, 10]} intensity={0.5} />

                <LogoContent />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
