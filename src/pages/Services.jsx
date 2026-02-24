import { content } from "../content_data";
import { motion } from "framer-motion";
import { Suspense } from "react";

import ServicesIconsHub from "../components/three/ServicesIconsHub";

export default function Services() {
    const { hero, categories } = content.servicesPage;

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="relative text-white min-h-[calc(100vh-80px)] py-10 lg:py-20 overflow-hidden">
            {/* Background glowing effects */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-40 left-0 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none"></div>

            <section className="relative px-6 z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                {/* Left Side: Content */}
                <motion.div
                    initial="hidden" animate="visible" variants={staggerContainer}
                    className="text-left w-full lg:w-1/2 pt-10"
                >
                    <motion.div variants={fadeUp} className="inline-block mb-4">
                        <span className="px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-400/10 text-blue-400 text-sm font-semibold tracking-widest uppercase backdrop-blur-md">
                            What we do
                        </span>
                    </motion.div>
                    <motion.h1
                        variants={fadeUp}
                        className="text-5xl md:text-7xl font-display font-black tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-500 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                    >
                        {hero.title}
                    </motion.h1>
                    <motion.p
                        variants={fadeUp}
                        className="text-lg md:text-xl text-slate-300 font-light max-w-2xl leading-relaxed glass-panel p-6 rounded-2xl border border-white/5"
                    >
                        {hero.description}
                    </motion.p>
                </motion.div>

                {/* Right Side: 3D Model */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end h-[400px] lg:h-[600px] relative">
                    <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-cyan-400 animate-pulse">Loading Interactive 3D...</div>}>
                        <ServicesIconsHub />
                    </Suspense>
                </div>
            </section>

            {/* Services Grid Section */}
            <section className="relative mt-20 md:mt-32 pb-12 px-6 z-10">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-white font-display"
                        >
                            Our Expertise
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            viewport={{ once: true }}
                            className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mt-6 rounded-full"
                        ></motion.div>
                    </div>

                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {categories.map((category, idx) => (
                            <motion.div
                                key={category.title}
                                variants={fadeUp}
                                whileHover={{ y: -8, scale: 1.01 }}
                                className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent relative overflow-hidden group hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-500 flex flex-col h-full"
                            >
                                {/* Decorative Glow */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-[40px] group-hover:bg-cyan-500/30 transition-colors duration-500"></div>

                                <div className="relative z-10">
                                    <h2 className="text-2xl font-bold leading-tight mb-6 text-white font-display flex items-center">
                                        <div className="w-2 h-8 rounded-full bg-cyan-400 mr-4"></div>
                                        {category.title}
                                    </h2>

                                    <ul className="space-y-4 mb-8">
                                        {category.items.map((item) => (
                                            <li key={item} className="text-slate-300 text-sm font-medium flex items-center group/item hover:text-white transition-colors">
                                                <svg className="w-4 h-4 text-cyan-500 mr-3 opacity-0 -ml-7 group-hover/item:opacity-100 group-hover/item:ml-0 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                                <span className="transform group-hover/item:translate-x-1 transition-transform">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-auto pt-6 border-t border-white/10 relative z-10">
                                    <p className="text-sm text-cyan-100/70 leading-relaxed font-light italic">
                                        "{category.focus}"
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

