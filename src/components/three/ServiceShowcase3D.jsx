import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Points, PointMaterial, Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo } from "react";
function OrbitingNode({ position, label, color, delay = 0 }) {
    const meshRef = useRef();

    useFrame(({ clock }) => {
        const t = clock.elapsedTime + delay;
        // Circular orbit
        const radius = 4;
        const x = Math.sin(t * 0.4) * radius;
        const y = Math.cos(t * 0.4) * radius * 0.3;
        const z = Math.cos(t * 0.4) * radius;

        if (meshRef.current) {
            meshRef.current.position.set(x, y, z);
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh ref={meshRef} castShadow>
                    <sphereGeometry args={[0.25, 32, 32]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={8}
                        roughness={0}
                        metalness={1}
                    />
                    <Text
                        position={[0, 0.5, 0]}
                        fontSize={0.2}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {label}
                    </Text>
                </mesh>
            </Float>
        </group>
    );
}

function HolographicGlobe() {
    const globeRef = useRef();
    const gridRef = useRef();
    const ringsRef = useRef();

    // Procedural Shader for the Globe surface
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
                    float n = noise(vUv * 10.0 + time * 0.1);
                    float intensity = smoothstep(0.4, 0.6, n);
                    float fresnel = pow(1.0 - dot(vNormal, vec3(0,0,1)), 3.0);
                    vec3 finalColor = mix(color * 0.5, color, intensity);
                    finalColor += glowColor * fresnel * 0.8;
                    gl_FragColor = vec4(finalColor, 0.4 + intensity * 0.4 + fresnel * 0.5);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
        });
    }, []);

    useFrame(({ clock }) => {
        const t = clock.elapsedTime;
        if (globeRef.current) globeRef.current.rotation.y = t * 0.1;
        if (gridRef.current) gridRef.current.rotation.y = t * 0.15;
        if (ringsRef.current) ringsRef.current.rotation.z = t * 0.1;
        continentMaterial.uniforms.time.value = t;
    });

    return (
        <group>
            {/* Inner Core Glow - Supports receiving shadows */}
            <mesh receiveShadow>
                <sphereGeometry args={[1.9, 64, 64]} />
                <meshStandardMaterial
                    color="#0c4a6e"
                    transparent
                    opacity={0.4}
                    roughness={0.4}
                    metalness={0.1}
                />
            </mesh>

            {/* Continent Shader Layer */}
            <mesh ref={globeRef} material={continentMaterial}>
                <sphereGeometry args={[2, 64, 64]} />
            </mesh>

            {/* Technical Grid Shell */}
            <mesh ref={gridRef}>
                <sphereGeometry args={[2.05, 32, 32]} />
                <meshBasicMaterial
                    color="#38bdf8"
                    wireframe
                    transparent
                    opacity={0.3}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Atmosphere Fresnel Layer */}
            <mesh scale={[1.15, 1.15, 1.15]}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshBasicMaterial
                    color="#0ea5e9"
                    transparent
                    opacity={0.25}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* technical Orbit Rings */}
            <group ref={ringsRef}>
                <mesh rotation={[Math.PI / 2.5, 0, 0]}>
                    <torusGeometry args={[3, 0.01, 16, 100]} />
                    <meshBasicMaterial color="#22d3ee" transparent opacity={0.3} />
                </mesh>
                <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
                    <torusGeometry args={[3.2, 0.008, 16, 100]} />
                    <meshBasicMaterial color="#0ea5e9" transparent opacity={0.2} />
                </mesh>
            </group>
        </group>
    );
}

export default function ServiceShowcase3D() {
    const nodes = [
        { label: "ADVICE", color: "#22d3ee", delay: 0 },
        { label: "SUPPORT", color: "#38bdf8", delay: (Math.PI * 2) / 3 },
        { label: "QUALITY", color: "#0ea5e9", delay: (Math.PI * 4) / 3 },
    ];

    return (
        <div className="w-full h-full relative">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                shadows
            >
                <ambientLight intensity={0.6} />
                <pointLight
                    position={[10, 10, 10]}
                    intensity={2.8}
                    color="#22d3ee"
                    castShadow
                    shadow-mapSize={[512, 512]}
                />
                <pointLight position={[-10, -10, -10]} intensity={2.0} color="#0ea5e9" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Sparkles count={60} scale={15} size={3} speed={0.4} color="#22d3ee" />

                {/* Floating Data Particles */}
                <Points count={100}>
                    <bufferGeometry attach="geometry">
                        <bufferAttribute
                            attach="attributes-position"
                            count={100}
                            array={new Float32Array(Array.from({ length: 300 }, () => (Math.random() - 0.5) * 12))}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <PointMaterial
                        transparent
                        color="#7dd3fc"
                        size={0.05}
                        sizeAttenuation={true}
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </Points>

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <HolographicGlobe />

                    <Text
                        position={[0, 0, 0.5]}
                        fontSize={0.8}
                        color="#ffffff"
                        anchorX="center"
                        anchorY="middle"
                    >
                        SERVICE
                        <meshStandardMaterial
                            emissive="#22d3ee"
                            emissiveIntensity={2}
                            attach="material"
                        />
                    </Text>

                    {nodes.map((node, i) => (
                        <OrbitingNode key={i} {...node} />
                    ))}
                </Float>
            </Canvas>

            {/* Bottom Glow */}
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-blue-600/5 via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
