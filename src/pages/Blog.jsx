import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { content } from '../content_data';
import BlogLetters3D from '../components/three/BlogLetters3D';

const Blog = () => {
    const { posts } = content.blog;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="min-h-screen text-white relative z-0">

            {/* Darker Overlay for readability - Softened to show more detail */}
            <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none"></div>

            {/* Content Wrapper - relative z-10 to sit above overlay */}
            <div className="relative z-10">

                {/* ================= 3D HEADING (JUST BELOW NAVBAR) ================= */}
                <div className="relative w-full h-[200px] md:h-[250px] bg-transparent">
                    <Canvas
                        camera={{ position: [0, 0, 18], fov: 60 }}
                        className="w-full h-full"
                        shadows
                        gl={{ antialias: true, alpha: true }}
                    >
                        <Suspense fallback={null}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={2} />
                            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                            <BlogLetters3D />
                        </Suspense>
                        <OrbitControls enableZoom={false} enablePan={false} />
                    </Canvas>
                </div>

                {/* ================= BLOG CONTENT ================= */}
                <div className="container mx-auto px-6 max-w-7xl pb-24">

                    {/* INTRO */}
                    <div className="flex flex-col items-center mb-16">


                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
                                Knowledge Hub
                            </h2>
                            <div className="w-20 h-1.5 bg-cyan-500 mx-auto rounded-full mb-6"></div>
                            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                                Exploring the intersection of Agentic AI, Automation, and the future of Digital Innovation.
                            </p>
                        </motion.div>
                    </div>

                    {/* BLOG GRID */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {posts.map((post, index) => (
                            <motion.article
                                key={post.slug}
                                variants={cardVariants}
                                className="group bg-slate-900/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:shadow-cyan-500/20 transition-all duration-500 flex flex-col h-full"
                            >
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        onError={(e) => {
                                            e.target.src = `https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800`;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-cyan-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border border-white/20">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 leading-snug">
                                        {post.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                                        <span className="text-xs font-medium text-slate-500 tracking-wide">
                                            {post.date}
                                        </span>
                                        <button className="text-cyan-400 font-bold text-sm flex items-center gap-2 group/btn">
                                            Read More
                                            <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Blog;
