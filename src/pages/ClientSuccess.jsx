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

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <SuccessAtmosphere3D />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-[#020617] pointer-events-none"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 space-y-24">

                {/* Hero Section */}
                <motion.section
                    initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                    className="text-center pt-10 md:pt-20 max-w-4xl mx-auto"
                >
                    <motion.div variants={fadeUp} className="inline-block mb-6">
                        <span className="px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 text-sm font-semibold tracking-widest uppercase backdrop-blur-md">
                            Proven Results
                        </span>
                    </motion.div>
                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-500 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                        {hero.title}
                    </motion.h1>
                    <motion.h2 variants={fadeUp} className="text-xl md:text-2xl text-cyan-400 font-medium tracking-wide mb-8">
                        {hero.subtitle}
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed glass-panel p-6 rounded-2xl border border-white/5">
                        {hero.description}
                    </motion.p>
                </motion.section>

                {/* Filters */}
                <section className="flex flex-wrap justify-center gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-8 py-3 rounded-full border transition-all duration-300 text-sm font-semibold tracking-wide backdrop-blur-md ${activeCategory === cat
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-[0_0_20px_rgba(34,211,238,0.4)] transform scale-105'
                                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30 hover:shadow-lg'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </section>

                {/* Case Study Grid */}
                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                    <AnimatePresence mode='popLayout'>
                        {filteredStudies.map((study, index) => (
                            <motion.div
                                key={study.title}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 20 }}
                                className="glass-panel p-8 sm:p-10 rounded-3xl flex flex-col justify-between group h-full border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] group-hover:bg-cyan-500/20 transition-colors duration-500"></div>

                                <div className="relative z-10">
                                    <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-cyan-400 mb-6 backdrop-blur-sm">
                                        {study.category}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300 font-display leading-snug">
                                        {study.title}
                                    </h3>
                                    <p className="text-slate-300 text-sm leading-relaxed mb-8 font-light">
                                        {study.description}
                                    </p>
                                </div>
                                <div className="mt-auto relative z-10">
                                    <div className="border-t border-white/10 pt-6">
                                        <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">{study.impact}</p>
                                        <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold flex items-center">
                                            <span className="w-1 h-1 rounded-full bg-slate-400 mr-2"></span>
                                            Client: <span className="text-white ml-2">{study.client}</span>
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </section>

                {/* Social Proof / Clients */}
                <motion.section
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
                    className="pb-20 pt-10"
                >
                    <div className="text-center mb-12">
                        <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-500/70 mb-2">Trusted By Industry Leaders</h3>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mx-auto"></div>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700 text-white cursor-default">
                        {clients.map(client => (
                            <span key={client} className="text-2xl md:text-3xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-white opacity-80 hover:opacity-100 transition-opacity">
                                {client}
                            </span>
                        ))}
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
