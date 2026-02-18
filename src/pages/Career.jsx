import { content } from '../content_data';
import { motion } from 'framer-motion';
import AlarmClockScene from '../components/three/AlarmClockScene';

export default function Career() {
    const { hero, future, culture, jobs, internships } = content.career;

    return (
        <div className="relative min-h-screen bg-[#020617]">
            <div className="relative z-10 space-y-16 py-10 container mx-auto px-6">
                <section className="pt-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <motion.h1
                                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-6xl font-display font-bold mb-6 text-white"
                            >
                                {hero.title}
                            </motion.h1>
                            <p className="text-xl text-gray-400 max-w-2xl">{hero.description}</p>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full" />
                            <AlarmClockScene />
                        </div>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="glass-panel p-8 rounded-2xl bg-white/5 border border-white/10">
                        <h2 className="text-2xl font-bold mb-4 text-cyan-400">{future.title}</h2>
                        <p className="text-gray-400">{future.description}</p>
                    </div>
                    <div className="glass-panel p-8 rounded-2xl bg-white/5 border border-white/10">
                        <h2 className="text-2xl font-bold mb-4 text-cyan-400">{culture.title}</h2>
                        <p className="text-gray-400">{culture.description}</p>
                    </div>
                </div>

                <section className="pb-20">
                    <h2 className="text-3xl font-bold mb-8 text-white">Open Positions</h2>
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-cyan-400 mb-4 border-b border-white/10 pb-2">Jobs (India & USA)</h3>
                            <div className="flex flex-col gap-3">
                                {jobs.map((job, idx) => (
                                    <div key={idx} className="glass-panel p-4 rounded-xl flex justify-between items-center group cursor-pointer bg-white/5 hover:bg-white/10 transition-all border border-white/5">
                                        <span className="font-medium text-gray-300 group-hover:text-cyan-400 transition-colors">{job}</span>
                                        <span className="text-gray-500 group-hover:translate-x-1 transition-transform">&rarr;</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-cyan-400 mb-4 border-b border-white/10 pb-2">Internships</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {internships.map((internship, idx) => (
                                    <div key={idx} className="glass-panel p-4 rounded-xl text-sm group cursor-pointer bg-white/5 hover:bg-white/10 transition-all border border-white/5">
                                        <span className="font-medium text-gray-300 group-hover:text-cyan-400 transition-colors text-center block w-full">{internship}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
