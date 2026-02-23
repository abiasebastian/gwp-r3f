
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Float, Points, PointMaterial, Ring, RoundedBox, Text, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

function GlowingGlobe() {
    const groupRef = useRef();

    // Create random points for the network nodes
    const [positions] = useMemo(() => {
        const positions = [];
        const radius = 2;
        for (let i = 0; i < 300; i++) {
            const phi = Math.acos(-1 + (2 * i) / 300);
            const theta = Math.sqrt(300 * Math.PI) * phi;
            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);
            positions.push(x, y, z);
        }
        return [new Float32Array(positions)];
    }, []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Core glowing sphere */}
            <Sphere args={[1.9, 64, 64]}>
                <meshBasicMaterial color="#0ea5e9" transparent opacity={0.1} />
            </Sphere>

            {/* Wireframe outer sphere */}
            <Sphere args={[2, 32, 32]}>
                <meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.2} />
            </Sphere>

            {/* Glowing points */}
            <Points positions={positions}>
                <PointMaterial transparent color="#f472b6" size={0.08} sizeAttenuation depthWrite={false} />
            </Points>

            {/* Inner bright core */}
            <Sphere args={[0.5, 32, 32]}>
                <meshBasicMaterial color="#ffffff" />
            </Sphere>
            <pointLight distance={10} intensity={5} color="#c0dbf9" />
        </group>
    );
}

function OrbitRings() {
    return (
        <group rotation={[Math.PI / 4, 0, 0]}>
            <Ring args={[3, 3.02, 64]} rotation={[Math.PI / 2, 0, 0]}>
                <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} side={THREE.DoubleSide} />
            </Ring>
            <Ring args={[4, 4.02, 64]} rotation={[Math.PI / 2.2, 0.1, 0]}>
                <meshBasicMaterial color="#f472b6" transparent opacity={0.2} side={THREE.DoubleSide} />
            </Ring>
        </group>
    );
}

function BadgeToken({ position, color, text, delay = 0 }) {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
            <group position={position}>
                {/* Coin base */}
                <Cylinder args={[0.6, 0.6, 0.15, 32]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshPhysicalMaterial
                        color={color}
                        transmission={0.9}
                        opacity={1}
                        metalness={0.1}
                        roughness={0.1}
                        ior={1.5}
                        thickness={0.5}
                    />
                </Cylinder>
                <Cylinder args={[0.5, 0.5, 0.16, 32]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color={color} />
                </Cylinder>
                {/* Coin Inner Text or Icon */}
                <Text position={[0, 0, 0.1]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
                    {text}
                </Text>
            </group>
        </Float>
    );
}

function WindowBadge({ position }) {
    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <group position={position} rotation={[0, -0.2, 0.1]}>
                <RoundedBox args={[2, 1.5, 0.1]} radius={0.1} smoothness={4}>
                    <meshPhysicalMaterial color="#0ea5e9" transmission={0.8} opacity={1} roughness={0.2} ior={1.5} />
                </RoundedBox>
                {/* Code Window Lines */}
                <Text position={[0, 0.3, 0.06]} fontSize={0.2} color="white" anchorX="center">
                    {"</>"}
                </Text>
                <mesh position={[-0.4, 0, 0.06]}>
                    <planeGeometry args={[0.8, 0.05]} />
                    <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
                </mesh>
                <mesh position={[-0.2, -0.2, 0.06]}>
                    <planeGeometry args={[1.2, 0.05]} />
                    <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
                </mesh>
                <mesh position={[-0.3, -0.4, 0.06]}>
                    <planeGeometry args={[1.0, 0.05]} />
                    <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
                </mesh>
            </group>
        </Float>
    );
}

export default function Hero3D() {
    return (
        <Canvas className="h-full w-full" camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
            <directionalLight position={[-10, -10, -5]} intensity={1} color="#f472b6" />

            <GlowingGlobe />
            <OrbitRings />

            {/* Tokens spread around */}
            <BadgeToken position={[3.5, -1, 1]} color="#0ea5e9" text="AI" />
            <BadgeToken position={[2.5, -3, 2]} color="#6366f1" text="Brain" />
            <WindowBadge position={[-3, 2.5, 0]} />
            <BadgeToken position={[3, 2.5, -1]} color="#f472b6" text="Cloud" />

            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
    );
}
