import { content } from '../content_data';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
    const { hero, services, offerings } = content.home;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
    };

    return (
        <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center py-10 lg:py-20 w-full overflow-hidden">


            <motion.div
                className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-10 md:mt-20 lg:mt-32"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Hero Content Area */}
                <div className="max-w-3xl pointer-events-none space-y-8">
                    <motion.div variants={itemVariants} className="inline-block">
                        <span className="px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 text-sm font-semibold tracking-widest uppercase backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                            {hero.subtitle}
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-6xl lg:text-7xl font-display font-black leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                    >
                        {hero.title}
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-slate-300 font-light leading-relaxed backdrop-blur-sm bg-black/10 p-6 rounded-2xl border border-white/5 shadow-2xl"
                    >
                        {hero.description}
                    </motion.p>

                    <motion.div variants={itemVariants} className="pointer-events-auto flex flex-wrap gap-4 pt-4">
                        <Link to="/contact">
                            <button className="px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)] hover:-translate-y-1">
                                Get a Consultation
                            </button>
                        </Link>
                        <Link to="/services">
                            <button className="px-8 py-4 rounded-full bg-white/5 border border-white/20 text-white font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-md hover:-translate-y-1">
                                Explore Services
                            </button>
                        </Link>
                    </motion.div>
                </div>

                {/* Services / Offerings Glass Cards */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32"
                >
                    {/* Enterprise Solutions */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="glass-panel p-8 rounded-3xl flex flex-col justify-between bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-[50px] group-hover:bg-cyan-400/40 transition-all duration-700"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-6 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 font-display">{services[0]?.title}</h3>
                            <p className="text-sm text-slate-300 leading-relaxed font-light">
                                {services[0]?.description}
                            </p>
                        </div>
                    </motion.div>

                    {/* SMB Solutions */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="glass-panel p-8 rounded-3xl flex flex-col justify-between bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-pink-500/20 rounded-full blur-[50px] group-hover:bg-pink-400/40 transition-all duration-700"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center mb-6 shadow-lg -rotate-3 group-hover:-rotate-6 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 font-display">{services[1]?.title}</h3>
                            <p className="text-sm text-slate-300 leading-relaxed font-light">
                                {services[1]?.description}
                            </p>
                        </div>
                    </motion.div>

                    {/* Offerings */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="glass-panel p-8 rounded-3xl flex flex-col bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 shadow-2xl relative overflow-hidden group col-span-1 md:col-span-2 lg:col-span-1"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-[60px] group-hover:bg-blue-400/40 transition-all duration-700"></div>
                        <div className="relative z-10 h-full flex flex-col">
                            <h3 className="text-2xl font-bold text-white mb-4 font-display">{offerings?.title}</h3>
                            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-light">
                                {offerings?.description}
                            </p>
                            <ul className="space-y-3 mt-auto">
                                {offerings?.list && offerings.list.map((item, index) => (
                                    <li key={index} className="flex items-center text-sm font-medium text-cyan-100 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/5">
                                        <svg className="w-4 h-4 text-cyan-400 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Partners Section */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 text-center"
                >
                    <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold mb-6">In Partnership With</p>
                    <div className="glass-panel inline-flex flex-col items-center bg-white/5 border border-white/10 px-10 py-6 rounded-3xl backdrop-blur-md">
                        <h4 className="text-xl font-bold text-white font-display mb-2">{content.home.partners?.title}</h4>
                        <p className="text-xs text-slate-300 max-w-xl font-light">{content.home.partners?.description}</p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
