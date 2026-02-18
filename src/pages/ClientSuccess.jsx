import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../content_data';
import SuccessAtmosphere3D from '../components/three/SuccessAtmosphere3D';

export default function ClientSuccess() {
    const { hero, categories, caseStudies, clients } = content.clientSuccess;
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredStudies = activeCategory === 'All'
        ? caseStudies
        : caseStudies.filter(study => study.category === activeCategory);

    return (
        <div className="relative min-h-screen">
            {/* 3D Background */}
            <SuccessAtmosphere3D />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 space-y-24">
                {/* Hero Section */}
                <section className="text-center pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight text-white">
                            {hero.title}
                        </h1>
                        <h2 className="text-2xl md:text-3xl text-gradient font-semibold mb-8">
                            {hero.subtitle}
                        </h2>
                        <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            {hero.description}
                        </p>
                    </motion.div>
                </section>

                {/* Filters */}
                <section className="flex flex-wrap justify-center gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full border transition-all duration-300 ${activeCategory === cat
                                ? 'bg-white text-black border-white'
                                : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </section>

                {/* Case Study Grid */}
                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredStudies.map((study, index) => (
                            <motion.div
                                key={study.title}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="glass-panel p-8 rounded-2xl flex flex-col justify-between group h-full border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-500"
                            >
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#f472b6] mb-4 block">
                                        {study.category}
                                    </span>
                                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-all duration-300 leading-snug">
                                        {study.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                        {study.description}
                                    </p>
                                </div>
                                <div className="mt-auto">
                                    <div className="border-t border-white/5 pt-4">
                                        <p className="text-lg font-bold text-[#38bdf8]">{study.impact}</p>
                                        <p className="text-xs text-gray-500 uppercase mt-1">Client: {study.client}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </section>

                {/* Social Proof / Clients */}
                <section className="pb-20">
                    <h3 className="text-center text-sm font-bold uppercase tracking-[0.3em] text-gray-500 mb-12">
                        Trusted by industry leaders
                    </h3>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:opacity-100 transition-all duration-700 text-white">
                        {clients.map(client => (
                            <span key={client} className="text-2xl md:text-3xl font-display font-bold whitespace-nowrap">
                                {client}
                            </span>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
