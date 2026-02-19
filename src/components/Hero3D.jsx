
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';

export default function Hero3D() {
    return (
        <Canvas className="h-full w-full">
            <ambientLight intensity={1} />
            <directionalLight position={[3, 2, 1]} />
            <Float
                speed={4} // Animation speed, defaults to 1
                rotationIntensity={1} // XYZ rotation intensity, defaults to 1
                floatIntensity={2} // Up/down float intensity, defaults to 1
            >
                <Sphere args={[1, 100, 200]} scale={2.4}>
                    <MeshDistortMaterial
                        color="#22d3ee" // Cyan-400
                        attach="material"
                        distort={0.5}
                        speed={2}
                    />
                </Sphere>
            </Float>
            <OrbitControls enableZoom={false} autoRotate />
        </Canvas>
    );
}
