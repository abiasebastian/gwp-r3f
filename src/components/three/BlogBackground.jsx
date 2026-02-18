import React, { useMemo } from 'react';
import { Float, Text3D, Stars, Sparkles, Environment } from '@react-three/drei';

const ScatteredLetter = ({ char, position, rotation, scale }) => {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Text3D
                font="/fonts/helvetiker_bold.typeface.json"
                position={position}
                rotation={rotation}
                scale={scale}
                height={0.1}
                bevelEnabled
                bevelSize={0.01}
                bevelThickness={0.02}
            >
                {char}
                <meshPhysicalMaterial
                    color="#88ccff"
                    metalness={0.8}
                    roughness={0.2}
                    transparent
                    opacity={0.6}
                    transmission={0.2}
                />
            </Text3D>
        </Float>
    );
};

const BlogBackground = () => {
    // Generate scattered characters
    const scatteredChars = useMemo(() => {
        const chars = '0123456789ABCDEFabcdef';
        const items = [];
        for (let i = 0; i < 50; i++) {
            items.push({
                char: chars[Math.floor(Math.random() * chars.length)],
                position: [
                    (Math.random() - 0.5) * 30, // Wider spread
                    (Math.random() - 0.5) * 15,
                    (Math.random() - 0.5) * 10 - 5 // Behind characters mainly
                ],
                rotation: [
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                ],
                scale: 0.3 + Math.random() * 0.4
            });
        }
        return items;
    }, []);

    return (
        <>
            {/* Environment for reflections on the background elements */}
            <Environment preset="city" />

            {/* Stars/Particles for "Dark but not entirely dark" vibe */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={300} scale={25} size={3} speed={0.4} opacity={0.5} color="#4dc4ff" />

            {/* Scattered characters in background */}
            <group position={[0, 0, -2]}>
                {scatteredChars.map((item, i) => (
                    <ScatteredLetter
                        key={i}
                        char={item.char}
                        position={item.position}
                        rotation={item.rotation}
                        scale={item.scale}
                    />
                ))}
            </group>
        </>
    );
};

export default BlogBackground;
