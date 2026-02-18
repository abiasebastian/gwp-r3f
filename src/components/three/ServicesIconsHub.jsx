import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Sparkles, PerspectiveCamera, Environment, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/* ──────────────── Icon Components ──────────────── */

const GearIcon = ({ color }) => {
    return (
        <group scale={0.5}>
            <mesh>
                <cylinderGeometry args={[0.8, 0.8, 0.3, 32]} />
                <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
            </mesh>
            {[...Array(8)].map((_, i) => (
                <mesh key={i} rotation={[0, (i / 8) * Math.PI * 2, 0]} position={[0, 0, 0]}>
                    <boxGeometry args={[0.3, 0.4, 1.8]} />
                    <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
                </mesh>
            ))}
            <mesh>
                <cylinderGeometry args={[0.3, 0.3, 0.4, 16]} />
                <meshBasicMaterial color="#020617" />
            </mesh>
        </group>
    );
};

const ToolsIcon = ({ color }) => {
    return (
        <group scale={0.4} rotation={[0, 0, Math.PI / 4]}>
            {/* Wrench */}
            <mesh position={[-0.4, 0, 0]}>
                <boxGeometry args={[0.2, 1.5, 0.2]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[-0.4, 0.7, 0]}>
                <torusGeometry args={[0.3, 0.1, 16, 32, Math.PI * 1.5]} />
                <meshStandardMaterial color={color} />
            </mesh>
            {/* Screwdriver */}
            <mesh position={[0.4, -0.2, 0]}>
                <boxGeometry args={[0.2, 1.2, 0.2]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0.4, 0.6, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.6, 16]} />
                <meshStandardMaterial color={color} metalness={0.8} />
            </mesh>
        </group>
    );
};

const HeadsetIcon = ({ color }) => {
    return (
        <group scale={0.5}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[0.7, 0.1, 16, 32, Math.PI]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0.7, -0.1, 0]}>
                <boxGeometry args={[0.3, 0.5, 0.4]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[-0.7, -0.1, 0]}>
                <boxGeometry args={[0.3, 0.5, 0.4]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0.7, -0.4, 0.3]} rotation={[0.5, 0, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </group>
    );
};

const TrophyIcon = ({ color }) => {
    return (
        <group scale={0.4}>
            <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.6, 0.4, 1, 16]} /><meshStandardMaterial color={color} metalness={0.9} /></mesh>
            <mesh position={[0, -0.2, 0]}><cylinderGeometry args={[0.5, 0.7, 0.3, 16]} /><meshStandardMaterial color={color} metalness={0.9} /></mesh>
            <mesh position={[0.7, 0.6, 0]} rotation={[0, 0, Math.PI / 4]}><torusGeometry args={[0.3, 0.08, 16, 32]} /><meshStandardMaterial color={color} /></mesh>
            <mesh position={[-0.7, 0.6, 0]} rotation={[0, 0, -Math.PI / 4]}><torusGeometry args={[0.3, 0.08, 16, 32]} /><meshStandardMaterial color={color} /></mesh>
        </group>
    );
};

const LightbulbIcon = ({ color }) => {
    return (
        <group scale={0.5}>
            <mesh position={[0, 0.4, 0]}>
                <sphereGeometry args={[0.6, 32, 32]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.6} />
            </mesh>
            <mesh position={[0, -0.2, 0]}>
                <cylinderGeometry args={[0.3, 0.2, 0.5, 16]} />
                <meshStandardMaterial color="#64748b" />
            </mesh>
            <mesh position={[0, 0.4, 0]}>
                <torusGeometry args={[0.2, 0.02, 8, 16]} rotation={[Math.PI / 2, 0, 0]} />
                <meshBasicMaterial color="#fff" />
            </mesh>
        </group>
    );
};

const ChatIcon = ({ color }) => {
    return (
        <group scale={0.5}>
            <mesh position={[-0.2, 0.2, 0]}>
                <RoundedBox args={[1, 0.7, 0.2]} radius={0.1}>
                    <meshStandardMaterial color={color} />
                </RoundedBox>
            </mesh>
            <mesh position={[0.3, -0.2, -0.1]}>
                <RoundedBox args={[1, 0.7, 0.2]} radius={0.1}>
                    <meshStandardMaterial color={color} opacity={0.8} transparent />
                </RoundedBox>
            </mesh>
        </group>
    );
};

/* ──────────────── Main Hub Component ──────────────── */

const HubIcon = ({ index, total, type, label, color }) => {
    const groupRef = useRef();
    const startTime = useRef(null);
    const radius = 3.0; // Reduced from 3.5
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    const targetPos = useMemo(() => [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
    ], [angle]);

    useFrame((state) => {
        if (startTime.current === null) startTime.current = state.clock.getElapsedTime();
        const t = state.clock.getElapsedTime() - startTime.current;
        const delay = index * 0.2;
        const jumpTime = Math.max(0, t - delay);

        if (jumpTime < 1) {
            // Initial Jump Animation (0 to 1s)
            const p = jumpTime;
            const ease = 1 - Math.pow(1 - p, 3);
            const height = Math.sin(p * Math.PI) * 2;
            groupRef.current.position.set(
                targetPos[0] * ease,
                targetPos[1] * ease + height,
                (1 - ease) * 5
            );
            groupRef.current.scale.setScalar(ease);
        } else {
            // Cycle Effect Logic
            // Each icon gets a 3-second spotlight in a continuous loop
            const cycleDuration = 3;
            const totalCycleTime = total * cycleDuration;
            const loopTime = (t - 2) % totalCycleTime; // Start cycle after initial jumps

            const activeIndex = Math.floor(loopTime / cycleDuration);
            const isActive = activeIndex === index;
            const cycleProgress = (loopTime % cycleDuration) / cycleDuration; // 0 to 1

            let zPos = 0;
            let rotationY = Math.sin(t + index) * 0.2;
            let scale = 1;

            if (isActive && t > 2) {
                if (cycleProgress < 0.3) {
                    // Zoom In
                    zPos = (cycleProgress / 0.3) * 1.0; // Slightly reduced to prevent clipping when larger
                    scale = 1 + (cycleProgress / 0.3) * 0.3;
                } else if (cycleProgress < 0.7) {
                    // Stay & Rotate
                    zPos = 1.0;
                    scale = 1.3;
                    const rotateProgress = (cycleProgress - 0.3) / 0.4;
                    rotationY = rotateProgress * Math.PI * 2;
                } else {
                    // Zoom Out
                    zPos = (1 - (cycleProgress - 0.7) / 0.3) * 1.0;
                    scale = 1 + (1 - (cycleProgress - 0.7) / 0.3) * 0.3;
                }
            }

            const floatOffset = Math.sin(t * 2 + index) * 0.1;
            groupRef.current.position.set(
                targetPos[0],
                targetPos[1] + floatOffset,
                zPos
            );
            groupRef.current.rotation.y = rotationY;
            groupRef.current.scale.setScalar(scale);
        }
    });

    return (
        <group ref={groupRef}>
            <group rotation={[Math.PI / 2, 0, 0]}>
                {type === 'gears' && <GearIcon color={color} />}
                {type === 'tools' && <ToolsIcon color={color} />}
                {type === 'headset' && <HeadsetIcon color={color} />}
                {type === 'trophy' && <TrophyIcon color={color} />}
                {type === 'lightbulb' && <LightbulbIcon color={color} />}
                {type === 'chat' && <ChatIcon color={color} />}
            </group>

            <Text
                position={[0, -1.2, 0.5]}
                fontSize={0.25}
                color="#ffffff"
                anchorX="center"
                maxWidth={2}
                textAlign="center"
            >
                {label}
            </Text>

            {/* Icon Background Glow */}
            <mesh position={[0, 0, -0.2]}>
                <circleGeometry args={[1, 32]} />
                <meshBasicMaterial color={color} transparent opacity={0.1} />
            </mesh>
        </group>
    );
};

const RingHUD = ({ radius, color, speed = 1, opacity = 0.2 }) => {
    const ref = useRef();
    useFrame(({ clock }) => {
        if (ref.current) ref.current.rotation.z = clock.elapsedTime * 0.2 * speed;
    });
    return (
        <mesh ref={ref}>
            <torusGeometry args={[radius, 0.02, 2, 128]} />
            <meshBasicMaterial color={color} transparent opacity={opacity} blending={THREE.AdditiveBlending} />
        </mesh>
    );
};

export default function ServicesIconsHub() {
    const icons = [
        { type: 'gears', label: 'Process', color: '#0ea5e9' },
        { type: 'tools', label: 'Support', color: '#38bdf8' },
        { type: 'headset', label: 'Consult', color: '#7dd3fc' },
        { type: 'trophy', label: 'Quality', color: '#eab308' },
        { type: 'lightbulb', label: 'Innovation', color: '#fcd34d' },
        { type: 'chat', label: 'Strategy', color: '#22d3ee' },
    ];

    return (
        <div className="w-full h-[400px] md:h-[500px]">
            <Canvas
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                camera={{ position: [0, 0, 11], fov: 45 }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />

                <group position={[0, -0.5, 0]} scale={1.2}>
                    {/* Central Hub */}
                    <group rotation={[Math.PI / 2, 0, 0]}>
                        <mesh>
                            <cylinderGeometry args={[1.5, 1.5, 0.2, 64]} />
                            <meshStandardMaterial color="#0c4a6e" metalness={0.9} roughness={0.1} />
                        </mesh>
                        <mesh position={[0, 0.11, 0]}>
                            <cylinderGeometry args={[1.4, 1.4, 0.02, 64]} />
                            <meshBasicMaterial color="#020617" />
                        </mesh>
                        <Text
                            position={[0, 0.12, 0]}
                            rotation={[-Math.PI / 2, 0, 0]}
                            fontSize={0.5}
                            color="#fff"
                            anchorX="center"
                            anchorY="middle"
                            letterSpacing={0.2}
                        >
                            SERVICE
                        </Text>

                        {/* Hub Glow - Behind Text */}
                        <Sparkles count={30} scale={1.5} size={1} speed={0.5} color="#22d3ee" position={[0, 0.05, 0]} />
                    </group>

                    {/* HUD Rings */}
                    <RingHUD radius={2.0} color="#0ea5e9" speed={0.5} />
                    <RingHUD radius={3.0} color="#22d3ee" speed={-0.3} opacity={0.1} />

                    {/* Icons */}
                    {icons.map((icon, idx) => (
                        <HubIcon
                            key={icon.type}
                            index={idx}
                            total={icons.length}
                            {...icon}
                        />
                    ))}
                </group>

                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
