import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

export default function ServicesBackground() {
    const group = useRef();

    useFrame((state) => {
        if (group.current) {
            // Very subtle mouse parallax
            group.current.rotation.y = (state.mouse.x * Math.PI) / 20;
            group.current.rotation.x = -(state.mouse.y * Math.PI) / 20;
        }
    });

    return (
        <group ref={group}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />

            {/* Soft global lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#818cf8" />

            {/* Multiple particle layers for depth without a central 'object' */}
            <AtmosphericParticles count={1500} size={0.03} color="#38bdf8" speed={0.1} />
            <AtmosphericParticles count={1000} size={0.015} color="#818cf8" speed={0.05} />

            {/* Subtle moving light 'clouds' or glow points */}
            <MovingGlow color="#38bdf8" position={[2, 2, -2]} />
            <MovingGlow color="#818cf8" position={[-3, -1, -3]} />
        </group>
    );
}

function AtmosphericParticles({ count, size, color, speed }) {
    const mesh = useRef();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y += state.clock.getElapsedTime() * 0.0001 * speed;
            mesh.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5 * speed) * 0.1;
        }
    });

    return (
        <Points ref={mesh} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color={color}
                size={size}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
}

function MovingGlow({ color, position }) {
    const light = useRef();
    useFrame((state) => {
        if (light.current) {
            light.current.position.x = position[0] + Math.sin(state.clock.getElapsedTime() * 0.5) * 2;
            light.current.position.y = position[1] + Math.cos(state.clock.getElapsedTime() * 0.3) * 1;
        }
    });

    return (
        <pointLight
            ref={light}
            position={position}
            intensity={2}
            distance={10}
            color={color}
        />
    );
}
