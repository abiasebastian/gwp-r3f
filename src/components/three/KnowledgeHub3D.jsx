import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBox, Float } from '@react-three/drei';

const Book = ({ color, index, totalBooks, scatter }) => {
    const meshRef = useRef();

    // Target position in the stacked state
    // Books are stacked vertically with some random slight rotation for organic feel
    const targetPos = useMemo(() => [
        0,
        (index - (totalBooks - 1) / 2) * 0.7,
        0
    ], [index, totalBooks]);

    const targetRot = useMemo(() => [
        0,
        (index % 2 === 0 ? 0.1 : -0.1) + (Math.random() - 0.5) * 0.1,
        0
    ], [index]);

    // Random off-screen starting position
    const initialPos = useMemo(() => [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
    ], []);

    const [initialFlightDone, setInitialFlightDone] = useState(false);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();
        const delay = index * 0.4;

        let finalTargetPos = [...targetPos];
        let finalTargetRot = [...targetRot];

        if (scatter) {
            // Periodic scatter animation
            finalTargetPos = [
                Math.sin(time * 0.8 + index) * 8,
                Math.cos(time * 1.2 + index) * 6,
                Math.sin(time * 0.5 + index) * 5
            ];
            finalTargetRot = [
                time * 0.5 + index,
                time * 0.3 + index,
                time * 0.2 + index
            ];
        } else if (time < delay) {
            // Still in "flight" from initialPos
            finalTargetPos = initialPos;
            finalTargetRot = [Math.PI, Math.PI, 0];
        }

        // Smooth movement logic - Increase factor slightly for snappier follow
        // but avoid manual position increments that fight the lerp
        const speed = 0.06;
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, finalTargetPos[0], speed);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, finalTargetPos[1], speed);
        meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, finalTargetPos[2], speed);

        // Smooth rotation
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, finalTargetRot[0], speed);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, finalTargetRot[1], speed);
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, finalTargetRot[2], speed);
    });

    return (
        <group ref={meshRef}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Book Cover */}
                <RoundedBox args={[4.5, 0.6, 3.2]} radius={0.08} smoothness={4}>
                    <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
                </RoundedBox>

                {/* Pages (White block inside slightly smaller) */}
                <mesh position={[0.1, 0, 0]}>
                    <boxGeometry args={[4.3, 0.4, 3.0]} />
                    <meshStandardMaterial color="#f8fafc" roughness={0.5} />
                </mesh>

                {/* Binding Detail */}
                <mesh position={[-2.15, 0, 0]}>
                    <boxGeometry args={[0.2, 0.55, 3.1]} />
                    <meshStandardMaterial color={color} roughness={0.2} />
                </mesh>
            </Float>
        </group>
    );
};

const KnowledgeHub3D = () => {
    const [scatter, setScatter] = useState(false);

    // Toggle scatter periodically or on interaction if desired
    // For now, let's trigger it every 10 seconds or keep it on interaction

    const books = [
        { color: '#a855f7' }, // Purple
        { color: '#fb7185' }, // Pink/Rose
        { color: '#facc15' }, // Yellow
        { color: '#60a5fa' }  // Blue
    ];

    return (
        <group
            onPointerOver={() => setScatter(true)}
            onPointerOut={() => setScatter(false)}
            scale={1.2}
            position={[0, 0, 0]}
        >
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

            {books.map((book, i) => (
                <Book
                    key={i}
                    index={i}
                    totalBooks={books.length}
                    color={book.color}
                    scatter={scatter}
                />
            ))}
        </group>
    );
};

export default KnowledgeHub3D;
