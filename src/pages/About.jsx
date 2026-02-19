import { content } from '../content_data';
import { motion } from 'framer-motion';

export default function About() {
    const { hero, overview, mission, management } = content.about;

    return (
        <div className="space-y-16 py-10">
            <section>
                <motion.h1
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-4xl md:text-6xl font-display font-bold mb-6 text-white"
                >
                    {hero.title}
                </motion.h1>
                <p className="text-xl text-gray-400 max-w-3xl">{hero.description}</p>
            </section>

            <section className="grid md:grid-cols-2 gap-12">
                <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-white/5">
                    <h2 className="text-2xl font-bold mb-4 text-cyan-400">{overview.title}</h2>
                    <p className="text-gray-400">{overview.description}</p>
                </div>
                <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-white/5">
                    <h2 className="text-2xl font-bold mb-4 text-cyan-400">{mission.title}</h2>
                    <p className="text-gray-400">{mission.description}</p>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-8 text-center text-white">Company Management</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {management.map((person, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-panel p-6 rounded-xl border border-white/5 bg-white/5"
                        >
                            {person.image ? (
                                <img
                                    src={person.image}
                                    alt={person.name}
                                    className="w-20 h-20 rounded-full object-cover mb-4 mx-auto border border-white/10"
                                />
                            ) : (
                                <div className="w-20 h-20 bg-white/10 border border-white/10 rounded-full mb-4 mx-auto block"></div>
                            )}
                            <h3 className="text-xl font-bold text-center text-white">{person.name}</h3>
                            <p className="text-sm text-cyan-400 text-center mb-4">{person.role}</p>
                            <p className="text-sm text-gray-400 text-center">{person.bio}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
