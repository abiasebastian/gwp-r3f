import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useLocation } from 'react-router-dom';
import ServicesBackground from './ServicesBackground';

export default function Scene() {
    return (
        <group>
            <color attach="background" args={['#020617']} />
            <StarField />
        </group>
    );
}

function StarField(props) {
    const ref = useRef();
    const spheres = useMemo(() => {
        // Generate random points in a sphere
        return random.inSphere(new Float32Array(5000), { radius: 1.5 });
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={spheres} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#0ea5e9"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.4}
                />
            </Points>
        </group>
    );
}
