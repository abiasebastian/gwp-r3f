import { content } from '../content_data';
import { motion } from 'framer-motion';
import Hero3D from '../components/Hero3D';

export default function Home() {
    const { hero, services } = content.home;

    return (
        <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center py-10">
            {/* Top Left Text */}
            <div className="relative z-10 max-w-2xl mt-12 md:mt-24 pointer-events-none">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight text-white tracking-wide"
                >
                    {hero.title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-slate-300 font-light mb-10 max-w-xl leading-relaxed"
                >
                    {hero.subtitle}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="pointer-events-auto"
                >
                    <button className="px-8 py-3 rounded-full bg-white/5 border border-cyan-400/50 text-white font-medium shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all duration-300 flex items-center gap-2 relative overflow-hidden group">
                        <span className="relative z-10">Get a Consultation</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>
                </motion.div>
            </div>

            {/* Bottom Glassmorphism Cards */}
            <div className="relative z-10 mt-auto pt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
                {/* Card 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="glass-panel p-6 rounded-2xl flex flex-col justify-between min-h-[220px] bg-gradient-to-br from-white/10 to-transparent border-t border-l border-white/20 relative overflow-hidden group hover:border-cyan-400/50 transition-colors"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-cyan-400/20 transition-colors"></div>
                    <h3 className="text-xl font-semibold text-white z-10">{services[0]?.title || "Glassmorphism"}</h3>
                    <div className="mt-4 z-10 flex-grow text-sm text-slate-400 line-clamp-4">
                        {services[0]?.description}
                    </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="glass-panel p-6 rounded-2xl flex flex-col min-h-[220px] bg-gradient-to-br from-white/10 to-transparent border-t border-l border-white/20 relative overflow-hidden group hover:border-cyan-400/50 transition-colors"
                >
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-400/10 rounded-full blur-3xl -mr-10 -mb-10 group-hover:bg-pink-400/20 transition-colors"></div>
                    <h3 className="text-xl font-semibold text-white z-10 mb-4">{services[1]?.title || "Glassmorphism"}</h3>

                    <div className="flex items-center gap-4 z-10">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                        </div>
                        <p className="text-xs text-slate-400 text-left line-clamp-3 flex-1">
                            {services[1]?.description}
                        </p>
                    </div>
                </motion.div>

                {/* Card 3 (Smaller/Offerings) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="glass-panel p-6 rounded-2xl flex flex-col justify-end min-h-[220px] bg-gradient-to-br from-white/10 to-transparent border-t border-l border-white/20 relative overflow-hidden group hover:border-cyan-400/50 transition-colors"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
                    <h3 className="text-xl font-semibold text-white z-10">{content.home.offerings?.title || "Offerings"}</h3>
                    <p className="mt-2 text-xs text-slate-400 line-clamp-3">
                        {content.home.offerings?.description}
                    </p>
                </motion.div>
            </div>

            {/* Right Side 3D Globe Area */}
            <div className="absolute top-0 right-0 w-full md:w-2/3 h-full z-0 opacity-80 pointer-events-auto">
                <Hero3D />
            </div>

            {/* Background elements to match the design's dark glow */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
            <div className="fixed top-20 right-20 w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
        </div>
    );
}
