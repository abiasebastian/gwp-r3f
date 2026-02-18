import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

// Speech Bubble component with continuous piano key press effect
const SpeechBubbleLetter = ({ letter, position, index, totalLetters }) => {
    const groupRef = useRef();
    const bubbleRef = useRef();

    // Animation state - start immediately in loop mode
    const startTime = useRef(null);

    // State for colors (will trigger re-renders)
    const [bubbleColor, setBubbleColor] = useState('#22d3ee'); // Brighter Cyan
    const [letterColor, setLetterColor] = useState('#ffffff'); // White text

    // Create speech bubble shape
    // Create speech bubble shape
    const bubbleShape = useMemo(() => {
        const shape = new THREE.Shape();
        const radius = 1.8;
        // Explicitly start at the edge to avoid any implicit line from (0,0)
        shape.moveTo(radius, 0);
        shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
        shape.closePath(); // Ensure the shape is closed
        return shape;
    }, []);

    // Extrude settings for 3D depth
    const extrudeSettings = useMemo(() => ({
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelSegments: 5,
    }), []);

    useFrame((state) => {
        if (!groupRef.current) return;

        // Initialize start time
        if (startTime.current === null) {
            startTime.current = state.clock.elapsedTime;
        }

        const currentTime = state.clock.elapsedTime - startTime.current;

        // Easing function
        const easeInOutQuad = (t) => {
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        };

        // Continuous looping piano press animation
        const cycleDuration = 0.5; // Duration for one key press
        const totalCycleDuration = cycleDuration * totalLetters;
        const timeSinceLoop = currentTime % totalCycleDuration;

        const myTurnStart = index * cycleDuration;
        const myTurnEnd = myTurnStart + cycleDuration;

        let pressDepth = 0;
        let isPressed = false;

        if (timeSinceLoop >= myTurnStart && timeSinceLoop < myTurnEnd) {
            const localProgress = (timeSinceLoop - myTurnStart) / cycleDuration;

            if (localProgress < 0.5) {
                // Press down
                const pressProgress = localProgress / 0.5;
                const easePress = easeInOutQuad(pressProgress);
                pressDepth = easePress * 0.6;
                isPressed = true;
            } else {
                // Release up
                const releaseProgress = (localProgress - 0.5) / 0.5;
                const easeRelease = 1 - Math.pow(1 - releaseProgress, 3);
                pressDepth = 0.6 * (1 - easeRelease);
                isPressed = releaseProgress < 0.5;
            }
        }

        // Update colors when press state changes
        if (isPressed) {
            setBubbleColor('#ffffff'); // White when pressed
            setLetterColor('#22d3ee'); // Brighter Cyan text
        } else {
            setBubbleColor('#22d3ee'); // Brighter Cyan bubble
            setLetterColor('#ffffff'); // White text
        }

        // Apply position with press effect
        groupRef.current.position.y = position[1] - pressDepth;

        // Tilt during press
        if (pressDepth > 0.1) {
            const tiltAmount = (pressDepth / 0.6) * 0.1;
            groupRef.current.rotation.x = tiltAmount;
        } else {
            groupRef.current.rotation.x = 0;
        }

        // Gentle floating when not pressed
        if (!isPressed) {
            const floatOffset = Math.sin(currentTime * 0.8 + index * 0.5) * 0.03;
            groupRef.current.position.y += floatOffset;
        }

        // Bubble compression
        if (bubbleRef.current) {
            if (pressDepth > 0.1) {
                const compressRatio = pressDepth / 0.6;
                const compression = 1 - (compressRatio * 0.2);
                bubbleRef.current.scale.y = compression;
            } else {
                bubbleRef.current.scale.y = 1;
            }
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Speech Bubble */}
            <mesh ref={bubbleRef} castShadow receiveShadow>
                <extrudeGeometry args={[bubbleShape, extrudeSettings]} />
                <meshStandardMaterial
                    color={bubbleColor}
                    metalness={0.1}
                    roughness={0.3}
                    side={THREE.DoubleSide}
                    emissive={bubbleColor}
                    emissiveIntensity={0.05}
                />
            </mesh>

            {/* Letter - 3D Text */}
            <Center position={[0, 0, 0.4]}>
                <Text3D
                    font="/fonts/helvetiker_bold.typeface.json"
                    size={1.2}
                    height={0.3}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelSegments={5}
                >
                    {letter}
                    <meshStandardMaterial
                        color={letterColor}
                        metalness={0.3}
                        roughness={0.4}
                    />
                </Text3D>
            </Center>

            {/* Rim/Border effect */}
            <mesh position={[0, 0, -0.05]}>
                <extrudeGeometry args={[bubbleShape, { ...extrudeSettings, depth: 0.1 }]} />
                <meshStandardMaterial
                    color="#0c4a6e"
                    metalness={0.2}
                    roughness={0.5}
                />
            </mesh>
        </group>
    );
};

// Main component
const BlogLetters3D = () => {
    const letters = ['B', 'L', 'O', 'G', 'S'];
    const spacing = 4.2;

    return (
        <>
            {/* Strong lighting for visibility */}
            <ambientLight intensity={0.6} />

            <directionalLight
                position={[5, 10, 5]}
                intensity={0.8}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />

            <directionalLight position={[-5, 5, -5]} intensity={0.5} />

            <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />

            {/* Letter bubbles - centered */}
            <group position={[-(letters.length - 1) * spacing / 2, 0, 0]}>
                {letters.map((letter, index) => (
                    <SpeechBubbleLetter
                        key={letter}
                        letter={letter}
                        position={[index * spacing, 0, 0]}
                        index={index}
                        totalLetters={letters.length}
                    />
                ))}
            </group>
        </>
    );
};

export default BlogLetters3D;
