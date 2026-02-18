import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ── Clock Face ── */
const ClockFace = () => {
    const hourRef = useRef();
    const minRef = useRef();

    useFrame(() => {
        const now = new Date();
        const h = now.getHours() % 12;
        const m = now.getMinutes();
        const s = now.getSeconds();
        if (hourRef.current) hourRef.current.rotation.z = -((h + m / 60) / 12) * Math.PI * 2;
        if (minRef.current) minRef.current.rotation.z = -((m + s / 60) / 60) * Math.PI * 2;
    });

    return (
        <group position={[0, 0, 0.22]}>
            {/* White face disc */}
            <mesh>
                <circleGeometry args={[0.85, 64]} />
                <meshStandardMaterial color="#f8fafc" />
            </mesh>

            {/* Hour markers */}
            {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const r = 0.72;
                return (
                    <mesh key={i} position={[Math.sin(angle) * r, Math.cos(angle) * r, 0.01]}>
                        <boxGeometry args={[i % 3 === 0 ? 0.06 : 0.03, i % 3 === 0 ? 0.12 : 0.07, 0.01]} />
                        <meshBasicMaterial color="#1e293b" />
                    </mesh>
                );
            })}

            {/* Hour hand */}
            <group ref={hourRef}>
                <mesh position={[0, 0.22, 0.02]}>
                    <boxGeometry args={[0.055, 0.44, 0.015]} />
                    <meshBasicMaterial color="#0f172a" />
                </mesh>
            </group>

            {/* Minute hand */}
            <group ref={minRef}>
                <mesh position={[0, 0.3, 0.03]}>
                    <boxGeometry args={[0.035, 0.6, 0.015]} />
                    <meshBasicMaterial color="#0f172a" />
                </mesh>
            </group>

            {/* Center pin */}
            <mesh position={[0, 0, 0.04]}>
                <sphereGeometry args={[0.045, 16, 16]} />
                <meshStandardMaterial color="#ef4444" metalness={0.6} roughness={0.2} />
            </mesh>
        </group>
    );
};

/* ── Bell (dome-shaped, sits on top) ── */
const Bell = ({ side }) => {
    const bellRef = useRef();
    const dir = side === 'left' ? -1 : 1;

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Rapid tilt oscillation — the "ringing" rise motion
        if (bellRef.current) {
            bellRef.current.rotation.z = dir * Math.abs(Math.sin(t * 18)) * 0.22;
            bellRef.current.position.y = 1.02 + Math.abs(Math.sin(t * 18)) * 0.06;
        }
    });

    return (
        <group ref={bellRef} position={[dir * 0.52, 1.02, 0]}>
            {/* Dome bell body */}
            <mesh rotation={[Math.PI, 0, 0]}>
                <sphereGeometry args={[0.38, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
                <meshStandardMaterial color="#111827" metalness={0.85} roughness={0.15} />
            </mesh>
            {/* Bell rim ring */}
            <mesh position={[0, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.36, 0.04, 16, 64]} />
                <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Screw on top of bell */}
            <mesh position={[0, 0.25, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color="#6b7280" metalness={1} roughness={0.1} />
            </mesh>
        </group>
    );
};

/* ── Hammer between the bells ── */
const Hammer = () => {
    const hammerRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (hammerRef.current) {
            hammerRef.current.rotation.z = Math.sin(t * 18) * 0.35;
        }
    });

    return (
        <group ref={hammerRef} position={[0, 1.1, 0.1]}>
            {/* Shaft */}
            <mesh>
                <cylinderGeometry args={[0.03, 0.03, 0.55, 12]} />
                <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Head */}
            <mesh position={[0, 0.32, 0]}>
                <sphereGeometry args={[0.09, 16, 16]} />
                <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.1} />
            </mesh>
        </group>
    );
};

/* ── Main Clock Body ── */
const ClockBody = () => {
    return (
        <group>
            {/* Main round body */}
            <mesh>
                <cylinderGeometry args={[1, 1, 0.45, 64]} rotation={[Math.PI / 2, 0, 0]} />
                <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.25} />
            </mesh>

            {/* Outer bezel ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1, 0.07, 16, 100]} />
                <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Back plate */}
            <mesh position={[0, 0, -0.24]}>
                <circleGeometry args={[1, 64]} />
                <meshStandardMaterial color="#0f172a" />
            </mesh>

            {/* Four legs */}
            {[[-0.45, -0.85], [0.45, -0.85], [-0.45, -0.7], [0.45, -0.7]].map(([x, y], i) => (
                <mesh key={i} position={[x, y, 0]} rotation={[0, 0, x < 0 ? 0.3 : -0.3]}>
                    <cylinderGeometry args={[0.045, 0.055, 0.38, 12]} />
                    <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
                </mesh>
            ))}

            {/* Foot pads */}
            {[[-0.58, -1.0], [0.58, -1.0]].map(([x, y], i) => (
                <mesh key={i} position={[x, y, 0]}>
                    <sphereGeometry args={[0.07, 16, 16]} />
                    <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.2} />
                </mesh>
            ))}

            {/* Top button / snooze */}
            <mesh position={[0, 1.08, 0]}>
                <cylinderGeometry args={[0.13, 0.13, 0.12, 32]} />
                <meshStandardMaterial color="#ef4444" metalness={0.5} roughness={0.3} />
            </mesh>
        </group>
    );
};

/* ── Full Scene ── */
const AlarmClock = () => (
    <group rotation={[0.1, -0.3, 0]}>
        <ClockBody />
        <ClockFace />
        <Bell side="left" />
        <Bell side="right" />
        <Hammer />
    </group>
);

export default function AlarmClockScene() {
    return (
        <div className="w-full h-[420px] md:h-[520px]">
            <Canvas
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                camera={{ position: [0, 0.5, 6], fov: 38 }}
            >
                <ambientLight intensity={0.6} />
                <pointLight position={[4, 6, 4]} intensity={2} color="#ffffff" />
                <pointLight position={[-4, -2, 3]} intensity={0.8} color="#38bdf8" />
                <spotLight position={[0, 8, 4]} angle={0.4} penumbra={0.5} intensity={1.5} color="#ffffff" />

                <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
                    <AlarmClock />
                </Float>

                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
