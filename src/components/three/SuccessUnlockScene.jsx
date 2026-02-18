import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Sparkles, PerspectiveCamera, Environment, MeshDistortMaterial, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/* ──────────────── Helper Components ──────────────── */

const KeyholeShape = () => {
    return useMemo(() => {
        const shape = new THREE.Shape();
        // Circle top
        shape.absarc(0, 0.2, 0.15, 0, Math.PI * 2, false);
        // Triangle/trapezoid bottom
        const hole = new THREE.Path();
        hole.moveTo(-0.1, 0.1);
        hole.lineTo(0.1, 0.1);
        hole.lineTo(0.2, -0.3);
        hole.lineTo(-0.2, -0.3);
        hole.closePath();
        shape.holes.push(hole);
        return shape;
    }, []);
};

const SuccessKey = ({ keyRef }) => {
    const headShape = useMemo(() => {
        const s = new THREE.Shape();
        // Ornamental head (clover-like)
        const radius = 0.4;
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const x = Math.cos(angle) * radius * 0.7;
            const y = Math.sin(angle) * radius * 0.7;
            s.absarc(x, y, 0.25, angle - Math.PI, angle + Math.PI, false);
        }

        // Small decorative hole in middle
        const hole = new THREE.Path();
        hole.absarc(0, 0, 0.1, 0, Math.PI * 2, true);
        s.holes.push(hole);

        return s;
    }, []);

    const extrudeSettings = useMemo(() => ({ depth: 0.08, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02 }), []);
    const geometry = useMemo(() => new THREE.ExtrudeGeometry(headShape, extrudeSettings), [headShape, extrudeSettings]);

    return (
        <group ref={keyRef}>
            {/* Key Head - Ornamental */}
            <mesh geometry={geometry}>
                <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} emissive="#0ea5e9" emissiveIntensity={0.5} />
            </mesh>

            {/* Key Shaft - Slightly tapered or with a collar */}
            <mesh position={[0.7, 0, 0.04]} rotation={[0, Math.PI / 2, 0]}>
                <cylinderGeometry args={[0.06, 0.08, 1.2, 16]} />
                <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Collar between head and shaft */}
            <mesh position={[0.15, 0, 0.04]} rotation={[0, Math.PI / 2, 0]}>
                <cylinderGeometry args={[0.12, 0.1, 0.1, 16]} />
                <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Key Bit (The part that actually turns) - More realistic 'original' look */}
            <group position={[1.2, -0.15, 0.04]}>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.3, 0.4, 0.06]} />
                    <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Teeth cuts */}
                <mesh position={[0.08, -0.1, 0]}>
                    <boxGeometry args={[0.1, 0.2, 0.1]} />
                    <meshBasicMaterial color="#020617" /> {/* Visual cut through */}
                </mesh>
                <mesh position={[-0.05, -0.05, 0]}>
                    <boxGeometry args={[0.1, 0.2, 0.1]} />
                    <meshBasicMaterial color="#020617" />
                </mesh>
            </group>
        </group>
    );
};

const TabletPortal = ({ tabletRef, isUnlocked }) => {
    return (
        <group ref={tabletRef}>
            {/* Tablet Body */}
            <RoundedBox args={[3, 4.5, 0.2]} radius={0.15} smoothness={4}>
                <meshStandardMaterial color="#0c4a6e" metalness={0.8} roughness={0.2} />
            </RoundedBox>

            {/* Glowing Screen/Border */}
            <mesh position={[0, 0, 0.11]}>
                <planeGeometry args={[2.7, 4.2]} />
                <meshStandardMaterial
                    color={isUnlocked ? "#22d3ee" : "#020617"}
                    emissive={isUnlocked ? "#22d3ee" : "#0ea5e9"}
                    emissiveIntensity={isUnlocked ? 2 : 0.2}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Keyhole indicator */}
            <mesh position={[0, -0.8, 0.12]}>
                <circleGeometry args={[0.25, 32]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* "SUCCESS" Text */}
            <Text
                position={[0, 0.5, 0.15]}
                fontSize={0.5}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                visible={isUnlocked}
            >
                SUCCESS
            </Text>
        </group>
    );
};

const FloatingIcon = ({ type, position, color = "#0ea5e9" }) => {
    const meshRef = useRef();
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        meshRef.current.position.y += Math.sin(t + position[0]) * 0.002;
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <group ref={meshRef} position={position}>
            {type === 'trophy' && (
                <group scale={0.4}>
                    <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.5, 0.3, 0.8, 16]} /><meshStandardMaterial color={color} metalness={0.8} /></mesh>
                    <mesh position={[0, 0, 0]}><cylinderGeometry args={[0.4, 0.5, 0.2, 16]} /><meshStandardMaterial color={color} metalness={0.8} /></mesh>
                    <mesh position={[0.5, 0.6, 0]} rotation={[0, 0, Math.PI / 4]}><torusGeometry args={[0.2, 0.05, 16, 32]} /><meshStandardMaterial color={color} /></mesh>
                    <mesh position={[-0.5, 0.6, 0]} rotation={[0, 0, -Math.PI / 4]}><torusGeometry args={[0.2, 0.05, 16, 32]} /><meshStandardMaterial color={color} /></mesh>
                </group>
            )}
            {type === 'briefcase' && (
                <group scale={0.4}>
                    <mesh><boxGeometry args={[1.2, 0.8, 0.4]} /><meshStandardMaterial color={color} /></mesh>
                    <mesh position={[0, 0.5, 0]}><torusGeometry args={[0.2, 0.05, 16, 32]} rotation={[Math.PI / 2, 0, 0]} /><meshStandardMaterial color={color} /></mesh>
                </group>
            )}
            {type === 'cap' && (
                <group scale={0.4}>
                    <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}><planeGeometry args={[1, 1]} /><meshStandardMaterial color={color} side={THREE.DoubleSide} /></mesh>
                    <mesh position={[0, -0.2, 0]}><cylinderGeometry args={[0.3, 0.3, 0.3, 16]} /><meshStandardMaterial color={color} /></mesh>
                </group>
            )}
        </group>
    );
};

const SceneContent = () => {
    const tabletRef = useRef();
    const keyRef = useRef();
    const [isUnlocked, setIsUnlocked] = React.useState(false);
    const unlockedRef = useRef(false);

    useFrame((state) => {
        const t = state.clock.getElapsedTime() % 6; // 6 second loop

        if (keyRef.current && tabletRef.current) {
            let nextUnlocked = false;

            if (t < 2) {
                // Key approaches
                keyRef.current.position.set(3 - t * 1.5, -0.8, 1);
                keyRef.current.rotation.set(0, 0, 0);
                nextUnlocked = false;
            } else if (t < 3) {
                // Key enters and turns
                keyRef.current.position.set(0, -0.8, 1 - (t - 2));
                keyRef.current.rotation.y = (t - 2) * Math.PI;
                if (t > 2.5) nextUnlocked = true;
            } else if (t < 5) {
                // Success reveal stay
                nextUnlocked = true;
                keyRef.current.position.set(0, -0.8, 0);
                keyRef.current.rotation.y = Math.PI;
            } else {
                // Reset/Fade out
                const alpha = (t - 5);
                keyRef.current.position.z -= alpha * 2;
                nextUnlocked = true;
            }

            if (nextUnlocked !== unlockedRef.current) {
                unlockedRef.current = nextUnlocked;
                setIsUnlocked(nextUnlocked);
            }
        }
    });

    return (
        <group>
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
                <TabletPortal tabletRef={tabletRef} isUnlocked={isUnlocked} />
                <SuccessKey keyRef={keyRef} />
            </Float>

            <FloatingIcon type="trophy" position={[-2.5, 1.5, -1]} color="#eab308" />
            <FloatingIcon type="briefcase" position={[2.5, -1.5, -1]} color="#94a3b8" />
            <FloatingIcon type="cap" position={[-2.2, -1.2, -0.5]} color="#0ea5e9" />

            <Sparkles count={40} scale={10} size={2} speed={0.4} color="#22d3ee" />
        </group>
    );
};

export default function SuccessUnlockScene() {
    return (
        <div className="w-full h-[500px] md:h-[600px]">
            <Canvas
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                camera={{ position: [0, 0, 8], fov: 40 }}
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
