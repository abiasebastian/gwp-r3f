import { content } from "../content_data";
import { motion } from "framer-motion";
import { Suspense } from "react";

import ServicesIconsHub from "../components/three/ServicesIconsHub";

export default function Services() {
    const { hero, categories } = content.servicesPage;

    return (
        <div className="relative text-white min-h-screen">
            <section className="relative pt-4 pb-12 px-6 z-10">
                <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
                    {/* Left Side: Content */}
                    <div className="text-left md:w-1/2">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-8 bg-gradient-to-b from-cyan-400 to-blue-600 bg-clip-text text-transparent"
                        >
                            {hero.title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 max-w-2xl text-xl md:text-2xl leading-relaxed"
                        >
                            {hero.description}
                        </motion.p>
                    </div>

                    {/* Right Side: 3D Model */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                        <Suspense fallback={<div className="h-[600px] w-full flex items-center justify-center text-cyan-400">Loading 3D...</div>}>
                            <ServicesIconsHub />
                        </Suspense>
                    </div>
                </div>
            </section>

            {/* Services Grid Section */}
            <section className="relative pb-12 px-6 z-10">

                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Services Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-cyan-500/20 pt-12">
                        {categories.map((category, idx) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="space-y-8"
                            >
                                <h2 className="text-xl font-bold leading-tight min-h-[3.5rem] flex items-start text-white border-l-2 border-cyan-500 pl-4">
                                    {category.title}
                                </h2>

                                <ul className="space-y-4">
                                    {category.items.map((item) => (
                                        <li key={item} className="text-gray-400 text-sm hover:text-cyan-400 transition-colors cursor-default">
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-6 border-t border-white/5">
                                    <p className="text-xs text-cyan-400/80 leading-relaxed italic">
                                        {category.focus}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom transition accent */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        </div>
    );
}

