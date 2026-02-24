import { content } from '../content_data';
import { motion } from 'framer-motion';
import AlarmClockScene from '../components/three/AlarmClockScene';

export default function Career() {
    const { hero, future, culture, jobs, internships } = content.career;

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    return (
        <div className="relative min-h-[calc(100vh-80px)] py-10 lg:py-20 w-full overflow-hidden">
            {/* Background glowing effects */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-pink-900/20 rounded-full blur-[150px] pointer-events-none"></div>

            <motion.div
                initial="hidden" animate="visible" variants={staggerContainer}
                className="relative z-10 max-w-7xl mx-auto px-6 space-y-24"
            >
                {/* Hero Section */}
                <section className="pt-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <motion.div variants={fadeUp} className="inline-block mb-4">
                                <span className="px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 text-sm font-semibold tracking-widest uppercase backdrop-blur-md">
                                    Join The Team
                                </span>
                            </motion.div>
                            <motion.h1
                                variants={fadeUp}
                                className="text-5xl md:text-7xl font-display font-black tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-500 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                            >
                                {hero.title}
                            </motion.h1>
                            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-xl glass-panel p-6 rounded-2xl border border-white/5">
                                {hero.description}
                            </motion.p>
                        </div>
                        <motion.div variants={fadeUp} className="relative h-[400px] lg:h-[500px] w-full">
                            <div className="absolute inset-0 bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />
                            <AlarmClockScene />
                        </motion.div>
                    </div>
                </section>

                {/* Culture & Future Panels */}
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 gap-8">
                    <motion.div variants={fadeUp} className="glass-panel p-10 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-cyan-400/20 transition-colors"></div>
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-white font-display">{future.title}</h2>
                        <p className="text-slate-300 leading-relaxed font-light">{future.description}</p>
                    </motion.div>

                    <motion.div variants={fadeUp} className="glass-panel p-10 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 relative overflow-hidden group hover:border-pink-400/50 transition-all duration-500">
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-400/10 rounded-full blur-3xl -mr-10 -mb-10 group-hover:bg-pink-400/20 transition-colors"></div>
                        <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-white font-display">{culture.title}</h2>
                        <p className="text-slate-300 leading-relaxed font-light">{culture.description}</p>
                    </motion.div>
                </motion.div>

                {/* Open Positions Section */}
                <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="pb-20">
                    <div className="text-center mb-16">
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white font-display">
                            Open Positions
                        </motion.h2>
                        <motion.div variants={fadeUp} className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mt-6 rounded-full"></motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Jobs */}
                        <motion.div variants={fadeUp} className="space-y-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white font-display">Jobs <span className="text-cyan-400 text-lg font-light">(India & USA)</span></h3>
                            </div>
                            <div className="flex flex-col gap-4">
                                {jobs.map((job, idx) => (
                                    <div key={idx} className="glass-panel p-5 rounded-2xl flex justify-between items-center group cursor-pointer bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                                        <span className="font-medium text-slate-300 group-hover:text-cyan-400 transition-colors">{job}</span>
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-900 transition-colors">
                                            <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Internships */}
                        <motion.div variants={fadeUp} className="space-y-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white font-display">Internships</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {internships.map((internship, idx) => (
                                    <div key={idx} className="glass-panel p-5 rounded-2xl text-sm group cursor-pointer bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(244,114,182,0.15)] flex items-center justify-center text-center">
                                        <span className="font-medium text-slate-300 group-hover:text-pink-400 transition-colors w-full">{internship}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.section>
            </motion.div>
        </div>
    );
}
