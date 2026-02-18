import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Text, Float, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ──────────────── Lightning Ring Shader ──────────────── */
const getLightningRingMaterial = () => ({
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#00d4ff') },
        uGlowColor: { value: new THREE.Color('#ffffff') },
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
        uniform float uTime;
        uniform vec3 uColor;
        uniform vec3 uGlowColor;
        varying vec2 vUv;
        varying vec3 vNormal;

        // Simple pseudo-random
        float hash(float n) { return fract(sin(n) * 43758.5453); }
        float noise(float x) {
            float i = floor(x);
            float f = fract(x);
            return mix(hash(i), hash(i + 1.0), smoothstep(0.0, 1.0, f));
        }

        void main() {
            float angle = vUv.x * 6.28318;

            // Multiple lightning bolts circulating
            float bolt1 = sin(vUv.x * 40.0 - uTime * 6.0) * 0.5 + 0.5;
            float bolt2 = sin(vUv.x * 60.0 + uTime * 8.0) * 0.5 + 0.5;
            float bolt3 = sin(vUv.x * 25.0 - uTime * 4.0 + 2.0) * 0.5 + 0.5;

            // Sharp lightning peaks
            bolt1 = pow(bolt1, 8.0);
            bolt2 = pow(bolt2, 10.0);
            bolt3 = pow(bolt3, 6.0);

            // Flickering noise
            float flicker = noise(uTime * 15.0 + vUv.x * 100.0);
            float boltFlash = step(0.92, flicker) * 2.0;

            // Combine
            float intensity = bolt1 * 0.6 + bolt2 * 0.4 + bolt3 * 0.3 + boltFlash * 0.5;

            // Base glow that fades from center
            float baseGlow = 0.3 + 0.2 * sin(uTime * 2.0);

            // Pulse wave circulating
            float pulse = pow(sin(vUv.x * 3.14159 * 2.0 - uTime * 3.0) * 0.5 + 0.5, 3.0);

            float alpha = clamp(baseGlow + intensity + pulse * 0.5, 0.0, 1.0);
            vec3 color = mix(uColor, uGlowColor, intensity * 0.8 + pulse * 0.3);
            color += uGlowColor * boltFlash * 0.5;

            gl_FragColor = vec4(color, alpha * 0.95);
        }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
});

/* ──────────────── Circuit Line Shader ──────────────── */
const getCircuitLineMaterial = () => ({
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#0ea5e9') },
        uGlowColor: { value: new THREE.Color('#67e8f9') },
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform vec3 uGlowColor;
        varying vec2 vUv;

        float hash(float n) { return fract(sin(n) * 43758.5453); }

        void main() {
            // Traveling data pulse
            float speed = 2.0;
            float pulsePos = fract(uTime * speed * 0.3);
            float dist = abs(vUv.x - pulsePos);
            float pulse = exp(-dist * 15.0);

            // Second pulse in opposite direction
            float pulsePos2 = 1.0 - fract(uTime * speed * 0.2 + 0.5);
            float dist2 = abs(vUv.x - pulsePos2);
            float pulse2 = exp(-dist2 * 12.0);

            float combined = pulse + pulse2 * 0.7;

            // Base visibility
            float base = 0.25 + 0.1 * sin(uTime * 1.5);

            // Lightning sparks along line
            float spark = step(0.97, hash(floor(vUv.x * 80.0) + floor(uTime * 20.0)));

            float alpha = clamp(base + combined + spark * 1.5, 0.0, 1.0);
            vec3 color = mix(uColor, uGlowColor, combined + spark);

            gl_FragColor = vec4(color, alpha * 0.9);
        }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
});

/* ──────────────── Electric Arc Shader ──────────────── */
const ArcShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#00d4ff') },
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec2 vUv;

        float hash(float n) { return fract(sin(n) * 43758.5453); }

        void main() {
            float t = uTime * 8.0 + vUv.x * 30.0;
            float arc = pow(sin(t) * 0.5 + 0.5, 12.0);
            float flicker = step(0.85, hash(floor(uTime * 30.0) + vUv.x * 10.0));
            float alpha = (arc + flicker) * 0.8;
            vec3 color = uColor * (1.0 + arc * 2.0);
            gl_FragColor = vec4(color, alpha);
        }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
};

/* ──────────────── Components ──────────────── */

/** Outer lightning ring */
const LightningRing = ({ radius = 2.0 }) => {
    const shaderRef = useRef();
    const outerShaderRef = useRef();
    const groupRef = useRef();

    const ringMaterial = useMemo(() => getLightningRingMaterial(), []);
    const outerRingMaterial = useMemo(() => {
        const mat = getLightningRingMaterial();
        mat.uniforms.uColor.value = new THREE.Color('#0369a1');
        return mat;
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (shaderRef.current) shaderRef.current.uniforms.uTime.value = t;
        if (outerShaderRef.current) outerShaderRef.current.uniforms.uTime.value = t;
        if (groupRef.current) groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.05;
    });

    return (
        <group ref={groupRef}>
            {/* Main glowing ring */}
            <mesh>
                <torusGeometry args={[radius, 0.08, 16, 128]} />
                <shaderMaterial ref={shaderRef} {...ringMaterial} />
            </mesh>

            {/* Outer glow ring (softer, bigger) */}
            <mesh>
                <torusGeometry args={[radius, 0.22, 16, 128]} />
                <shaderMaterial ref={outerShaderRef} {...outerRingMaterial} />
            </mesh>

            {/* Dark inner fill */}
            <mesh position={[0, 0, -0.05]}>
                <circleGeometry args={[radius - 0.05, 64]} />
                <meshBasicMaterial color="#000510" opacity={0.6} transparent />
            </mesh>
        </group>
    );
};

/** Animated pen/nib icon */
const PenIcon = () => {
    const groupRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.position.y = 1.2 + Math.sin(t * 1.5) * 0.08;
        }
    });

    return (
        <group ref={groupRef} position={[0, 1.2, 0.1]}>
            {/* Pen body (upper cylinder) */}
            <mesh position={[0, 0.35, 0]}>
                <cylinderGeometry args={[0.22, 0.22, 0.35, 8]} />
                <meshStandardMaterial
                    color="#ffffff" emissive="#0ea5e9" emissiveIntensity={1.5}
                    metalness={0.9} roughness={0.1}
                />
            </mesh>
            {/* Pen nib (cone) */}
            <mesh position={[0, -0.05, 0]}>
                <cylinderGeometry args={[0.08, 0.28, 0.55, 4]} />
                <meshStandardMaterial
                    color="#ffffff" emissive="#06b6d4" emissiveIntensity={1.5}
                    metalness={0.9} roughness={0.1}
                />
            </mesh>
            {/* Nib tip glow */}
            <mesh position={[0, -0.35, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshBasicMaterial color="#67e8f9" />
            </mesh>
            {/* Top cap */}
            <mesh position={[0, 0.55, 0]}>
                <cylinderGeometry args={[0.18, 0.22, 0.1, 8]} />
                <meshStandardMaterial
                    color="#ffffff" emissive="#0ea5e9" emissiveIntensity={1}
                    metalness={0.9} roughness={0.1}
                />
            </mesh>
        </group>
    );
};

/** Bottom pointer triangle */
const BottomPointer = ({ radius }) => {
    const glowRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (glowRef.current) {
            glowRef.current.material.emissiveIntensity = 1.5 + Math.sin(t * 3) * 0.5;
        }
    });

    return (
        <group position={[0, -radius - 0.5, 0]}>
            {/* Triangle pointer */}
            <mesh rotation={[0, 0, Math.PI]}>
                <coneGeometry args={[0.55, 1.1, 4]} />
                <meshStandardMaterial
                    color="#ffffff" emissive="#0ea5e9" emissiveIntensity={1.5}
                    metalness={0.8} roughness={0.1} transparent opacity={0.9}
                />
            </mesh>
            {/* Tip node */}
            <mesh ref={glowRef} position={[0, -0.55, 0]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial
                    color="#67e8f9" emissive="#00d4ff" emissiveIntensity={2}
                />
            </mesh>
        </group>
    );
};

/** Glowing tube for circuit lines */
const GlowingTube = ({ curve }) => {
    const shaderRef = useRef();
    const material = useMemo(() => getCircuitLineMaterial(), []);

    useFrame((state) => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh>
            <tubeGeometry args={[curve, 64, 0.045, 8, false]} />
            <shaderMaterial ref={shaderRef} {...material} />
        </mesh>
    );
};

/** Pulsing node at circuit intersections */
const CircuitNode = ({ position, size = 0.1 }) => {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            const scale = 1 + Math.sin(t * 3 + position[0] * 2) * 0.3;
            meshRef.current.scale.setScalar(scale);
            meshRef.current.material.emissiveIntensity = 1.5 + Math.sin(t * 4 + position[0]) * 1;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshStandardMaterial
                color="#67e8f9" emissive="#00d4ff" emissiveIntensity={2}
                metalness={0.9} roughness={0.1}
            />
        </mesh>
    );
};

/** Circuit lines below the ring */
const CircuitLines = ({ radius }) => {
    const y = -radius - 1;

    const curves = useMemo(() => {
        const main = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-6, y, 0),
            new THREE.Vector3(-3, y, 0),
            new THREE.Vector3(-1, y, 0),
            new THREE.Vector3(0, y, 0),
            new THREE.Vector3(1, y, 0),
            new THREE.Vector3(3, y, 0),
            new THREE.Vector3(6, y, 0),
        ]);

        const leftDown = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-3.5, y, 0),
            new THREE.Vector3(-4.5, y - 1.5, 0),
        ]);

        const rightDown = new THREE.CatmullRomCurve3([
            new THREE.Vector3(3.5, y, 0),
            new THREE.Vector3(4.5, y - 1.5, 0),
        ]);

        const rightUp = new THREE.CatmullRomCurve3([
            new THREE.Vector3(4, y, 0),
            new THREE.Vector3(5.5, y + 0.8, 0),
        ]);

        const leftAngle = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-2, y, 0),
            new THREE.Vector3(-2.5, y - 0.8, 0),
            new THREE.Vector3(-3.5, y - 1, 0),
        ]);

        const rightAngle = new THREE.CatmullRomCurve3([
            new THREE.Vector3(2, y, 0),
            new THREE.Vector3(2.5, y - 0.8, 0),
            new THREE.Vector3(3.5, y - 1, 0),
        ]);

        return { main, leftDown, rightDown, rightUp, leftAngle, rightAngle };
    }, [y]);

    return (
        <group>
            <GlowingTube curve={curves.main} />
            <GlowingTube curve={curves.leftDown} />
            <GlowingTube curve={curves.rightDown} />
            <GlowingTube curve={curves.rightUp} />
            <GlowingTube curve={curves.leftAngle} />
            <GlowingTube curve={curves.rightAngle} />

            {/* Nodes at intersections and endpoints */}
            <CircuitNode position={[-6, y, 0]} size={0.1} />
            <CircuitNode position={[6, y, 0]} size={0.1} />
            <CircuitNode position={[-3.5, y, 0]} size={0.08} />
            <CircuitNode position={[3.5, y, 0]} size={0.08} />
            <CircuitNode position={[-4.5, y - 1.5, 0]} size={0.09} />
            <CircuitNode position={[4.5, y - 1.5, 0]} size={0.09} />
            <CircuitNode position={[5.5, y + 0.8, 0]} size={0.08} />
            <CircuitNode position={[-3.5, y - 1, 0]} size={0.07} />
            <CircuitNode position={[3.5, y - 1, 0]} size={0.07} />
            <CircuitNode position={[0, y, 0]} size={0.1} />
        </group>
    );
};

/** Small electric arcs floating around the ring */
const ElectricArcs = ({ radius }) => {
    const arcsRef = useRef([]);

    const arcData = useMemo(() => {
        return Array.from({ length: 6 }, (_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const r = radius + 0.2;
            return {
                position: [Math.cos(angle) * r, Math.sin(angle) * r, 0],
                rotation: [0, 0, angle + Math.PI / 2],
            };
        });
    }, [radius]);

    return (
        <group>
            {arcData.map((arc, i) => (
                <ArcMesh key={i} position={arc.position} rotation={arc.rotation} />
            ))}
        </group>
    );
};

const ArcMesh = ({ position, rotation }) => {
    const ref = useRef();
    useFrame((state) => {
        if (ref.current) ref.current.uniforms.uTime.value = state.clock.getElapsedTime();
    });

    return (
        <mesh position={position} rotation={rotation}>
            <planeGeometry args={[0.6, 0.06]} />
            <shaderMaterial ref={ref} {...ArcShaderMaterial} />
        </mesh>
    );
};

/* ──────────────── Contact Icon Component ──────────────── */

const ContactIcon = ({ type, index }) => {
    const meshRef = useRef();

    // Icon symbols based on the type
    const symbols = {
        chat: "💬",
        at: "@",
        phone: "📞",
        email: "✉️"
    };

    const delay = index * 2.5; // Staggered start

    useFrame((state) => {
        const t = (state.clock.getElapsedTime() - delay) % 10; // 10s loop

        if (t > 0 && t < 6) { // Active for 6s
            const progress = t / 6;

            // Travel path: from left-front to right-back, passing ring center
            // Ring center is approx [0, 0.8, 0]
            const x = THREE.MathUtils.lerp(-10, 10, progress);
            const y = 0.8 + Math.sin(t * 2) * 0.2; // Slight vertical wave
            const z = THREE.MathUtils.lerp(4, -4, progress);

            if (meshRef.current) {
                meshRef.current.position.set(x, y, z);
                meshRef.current.visible = true;
                // Spin the disc
                meshRef.current.rotation.y = t * 1.5;
                // Fade in/out
                const opacity = progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - progress) * 10 : 1;
                meshRef.current.children[0].material.opacity = opacity;
            }
        } else {
            if (meshRef.current) meshRef.current.visible = false;
        }
    });

    return (
        <group ref={meshRef} visible={false}>
            {/* The Disc */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
                <meshStandardMaterial
                    color="#0ea5e9"
                    emissive="#00d4ff"
                    emissiveIntensity={1}
                    transparent
                    opacity={0.8}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* The Symbol (Front) */}
            <Text
                position={[0, 0, 0.07]}
                fontSize={0.55}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
            >
                {symbols[type]}
                <meshStandardMaterial attach="material" color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
            </Text>

            {/* The Symbol (Back) */}
            <Text
                position={[0, 0, -0.07]}
                rotation={[0, Math.PI, 0]}
                fontSize={0.55}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
            >
                {symbols[type]}
                <meshStandardMaterial attach="material" color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
            </Text>

            {/* Inner glow */}
            <pointLight intensity={1} distance={2} color="#ffffff" />
        </group>
    );
};

/* ──────────────── Main Scene ──────────────── */
export default function ContactLightningScene() {
    const radius = 2.0;

    return (
        <div className="h-[400px] w-full" style={{ background: 'transparent' }}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
                <color attach="background" args={['#020817']} />

                {/* Lighting */}
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={1} color="#0ea5e9" />
                <pointLight position={[-5, -3, 3]} intensity={0.7} color="#06b6d4" />
                <pointLight position={[0, 0, 5]} intensity={0.5} color="#67e8f9" />

                <group position={[0, 0.5, 0]}>
                    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                        {/* Lightning Ring */}
                        <LightningRing radius={radius} />

                        {/* Pen Icon */}
                        <group scale={0.85}>
                            <PenIcon />
                        </group>

                        {/* CONTACT US Text */}
                        <Text
                            position={[0, -0.25, 0.1]}
                            fontSize={0.45}
                            color="#ffffff"
                            anchorX="center"
                            anchorY="middle"
                            letterSpacing={0.12}
                        >
                            CONTACT US
                            <meshStandardMaterial
                                attach="material"
                                color="#ffffff"
                                emissive="#0ea5e9"
                                emissiveIntensity={1.5}
                                metalness={0.9}
                                roughness={0.1}
                            />
                        </Text>

                        {/* Electric Arcs around ring */}
                        <ElectricArcs radius={radius} />

                        {/* Bottom pointer */}
                        <BottomPointer radius={radius} />
                    </Float>

                    {/* Circuit lines (outside Float so they stay grounded) */}
                    <CircuitLines radius={radius} />

                    {/* Contact Icons traveling through the ring */}
                    <ContactIcon type="chat" index={0} />
                    <ContactIcon type="at" index={1} />
                    <ContactIcon type="phone" index={2} />
                    <ContactIcon type="email" index={3} />
                </group>

                {/* Ambient particles */}
                <Sparkles
                    count={80}
                    scale={12}
                    size={2.5}
                    speed={0.5}
                    opacity={0.6}
                    color="#0ea5e9"
                />
                <Sparkles
                    count={30}
                    scale={8}
                    size={4}
                    speed={0.3}
                    opacity={0.3}
                    color="#67e8f9"
                />
            </Canvas>
        </div>
    );
}
