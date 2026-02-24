import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial, Sphere, Environment, ContactShadows } from '@react-three/drei';

export default function Scene() {
    return (
        <group>
            <color attach="background" args={['#020617']} />

            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#0ea5e9" />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#f472b6" />

            <Float
                speed={1.5}
                rotationIntensity={1.5}
                floatIntensity={2}
                position={[2, 0, -5]}
            >
                <Sphere args={[1.5, 64, 64]}>
                    <MeshDistortMaterial
                        color="#0f172a"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </Sphere>
            </Float>

            <Float
                speed={2}
                rotationIntensity={2}
                floatIntensity={1.5}
                position={[-3, 1, -8]}
            >
                <Sphere args={[2, 64, 64]}>
                    <MeshDistortMaterial
                        color="#0f172a"
                        attach="material"
                        distort={0.3}
                        speed={1.5}
                        roughness={0.1}
                        metalness={0.9}
                    />
                </Sphere>
            </Float>

            <Sparkles
                count={200}
                scale={15}
                size={2}
                speed={0.4}
                opacity={0.3}
                color="#38bdf8"
            />

            <ContactShadows position={[0, -3, 0]} opacity={0.5} scale={20} blur={2} far={4} />
            <Environment preset="city" />
        </group>
    );
}
