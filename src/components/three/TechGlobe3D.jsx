import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, Points, PointMaterial, Sphere, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo } from "react";

function TechGlobeEnvironment() {
    const globeRef = useRef();
    const gridRef = useRef();
    const atmosphereRef = useRef();

    // Procedural "Continent" Shader Material
    const continentMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color("#22d3ee") },
                glowColor: { value: new THREE.Color("#0ea5e9") }
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color;
                uniform vec3 glowColor;
                varying vec2 vUv;
                varying vec3 vNormal;

                // Simple pseudo-noise for continent-like shapes
                float hash(vec2 p) {
                    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
                }
                float noise(vec2 p) {
                    vec2 i = floor(p);
                    vec2 f = fract(p);
                    f = f * f * (3.0 - 2.0 * f);
                    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
                               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
                }

                void main() {
                    float n = noise(vUv * 8.0 + time * 0.1);
                    n += 0.5 * noise(vUv * 16.0 - time * 0.05);
                    
                    // Threshold to create "islands"
                    float intensity = smoothstep(0.45, 0.55, n);
                    
                    // Edge glow (Fresnel)
                    float fresnel = pow(1.0 - dot(vNormal, vec3(0,0,1)), 3.0);
                    
                    vec3 finalColor = mix(color * 0.2, color, intensity);
                    finalColor += glowColor * fresnel * 0.5;
                    
                    gl_FragColor = vec4(finalColor, 0.4 + intensity * 0.4 + fresnel * 0.3);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
        });
    }, []);

    useFrame(({ clock }) => {
        const t = clock.elapsedTime;
        if (globeRef.current) globeRef.current.rotation.y = t * 0.1;
        if (gridRef.current) gridRef.current.rotation.y = t * 0.1;
        continentMaterial.uniforms.time.value = t;
    });

    return (
        <group>
            {/* Core Glow */}
            <mesh>
                <sphereGeometry args={[1.95, 64, 64]} />
                <meshBasicMaterial color="#0c4a6e" transparent opacity={0.3} />
            </mesh>

            {/* Continent Layer */}
            <mesh ref={globeRef} material={continentMaterial}>
                <sphereGeometry args={[2, 64, 64]} />
            </mesh>

            {/* Grid Layer */}
            <mesh ref={gridRef}>
                <sphereGeometry args={[2.02, 32, 32]} />
                <meshBasicMaterial
                    color="#38bdf8"
                    wireframe
                    transparent
                    opacity={0.15}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Atmosphere/Fresnel Shell */}
            <mesh scale={[1.1, 1.1, 1.1]}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshLambertMaterial
                    color="#0ea5e9"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                    emissive="#38bdf8"
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Orbiting Tech Rings */}
            <group rotation={[Math.PI / 4, 0, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[2.5, 0.005, 16, 100]} />
                    <meshBasicMaterial color="#22d3ee" transparent opacity={0.3} />
                </mesh>
            </group>
            <group rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[2.7, 0.005, 16, 100]} />
                    <meshBasicMaterial color="#22d3ee" transparent opacity={0.15} />
                </mesh>
            </group>

            {/* Floating Data Particles */}
            <Points count={100}>
                <bufferGeometry attach="geometry">
                    <bufferAttribute
                        attach="attributes-position"
                        count={100}
                        array={new Float32Array(Array.from({ length: 300 }, () => (Math.random() - 0.5) * 10))}
                        itemSize={3}
                    />
                </bufferGeometry>
                <PointMaterial
                    transparent
                    color="#7dd3fc"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

export default function TechGlobe3D() {
    return (
        <div className="w-full h-full relative group">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <color attach="background" args={["transparent"]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#0ea5e9" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#38bdf8" />

                <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
                    <TechGlobeEnvironment />
                </Float>
            </Canvas>

            {/* Subtle Overlay Glow */}
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 to-transparent pointer-events-none" />
        </div>
    );
}

