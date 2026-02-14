import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Navbar from './Navbar';
import Scene from '../3d/Scene';
import { Loader } from '@react-three/drei';

export default function Layout({ children }) {
    return (
        <div className="relative min-h-screen text-white">
            {/* 3D Background Layer */}
            <div className="fixed inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>
                </Canvas>
            </div>

            {/* UI Content Layer */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow pt-20 px-6 max-w-7xl mx-auto w-full">
                    {children}
                </main>
                <Footer />
            </div>
            <Loader />
        </div>
    );
}

function Footer() {
    return (
        <footer className="w-full py-8 mt-12 border-t border-glass-border bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} Global Web Production. All rights reserved.</p>
            </div>
        </footer>
    )
}
