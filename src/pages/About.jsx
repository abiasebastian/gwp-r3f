import { content } from '../content_data';
import { motion } from 'framer-motion';

export default function About() {
    const { hero, overview, mission, management } = content.about;

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div className="min-h-screen py-20 overflow-hidden relative">
            {/* Background glowing orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">

                {/* Hero Section */}
                <motion.section
                    initial="hidden" animate="visible" variants={staggerContainer}
                    className="text-center max-w-4xl mx-auto pt-10"
                >
                    <motion.div variants={fadeUp} className="inline-block mb-4">
                        <span className="px-4 py-1.5 rounded-full border border-pink-400/30 bg-pink-400/10 text-pink-400 text-sm font-semibold tracking-widest uppercase backdrop-blur-md">
                            About Us
                        </span>
                    </motion.div>
                    <motion.h1
                        variants={fadeUp}
                        className="text-5xl md:text-7xl font-display font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400"
                    >
                        {hero.title}
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                        {hero.description}
                    </motion.p>
                </motion.section>

                {/* Overview & Mission Section */}
                <motion.section
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {/* Overview Panel */}
                    <motion.div variants={fadeUp} className="glass-panel p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-cyan-400/20 transition-colors"></div>
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-white font-display">{overview.title}</h2>
                        <p className="text-slate-300 leading-relaxed font-light">{overview.description}</p>
                    </motion.div>

                    {/* Mission Panel */}
                    <motion.div variants={fadeUp} className="glass-panel p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent relative overflow-hidden group hover:border-pink-400/50 transition-all duration-500">
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-400/10 rounded-full blur-3xl -mr-10 -mb-10 group-hover:bg-pink-400/20 transition-colors"></div>
                        <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-white font-display">{mission.title}</h2>
                        <p className="text-slate-300 leading-relaxed font-light">{mission.description}</p>
                    </motion.div>
                </motion.section>

                {/* Management Section */}
                <motion.section
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                >
                    <div className="text-center mb-16">
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white font-display">
                            Company Management
                        </motion.h2>
                        <motion.div variants={fadeUp} className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mt-6 rounded-full"></motion.div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {management.map((person, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeUp}
                                whileHover={{ y: -10 }}
                                className="glass-panel p-8 rounded-3xl border border-white/10 bg-white/5 flex flex-col items-center text-center group hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300"
                            >
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                    {person.image ? (
                                        <img
                                            src={person.image}
                                            alt={person.name}
                                            className="w-32 h-32 rounded-full object-cover relative z-10 border-4 border-slate-900"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full relative z-10 border-4 border-slate-900 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                                            <span className="text-3xl font-bold text-white max-w-full overflow-hidden truncate">
                                                {person.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{person.name}</h3>
                                <p className="text-sm tracking-widest text-cyan-400 uppercase font-semibold mb-6">{person.role}</p>
                                <p className="text-sm text-slate-400 font-light leading-relaxed">{person.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
