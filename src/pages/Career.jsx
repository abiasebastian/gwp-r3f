import { content } from '../content_data';
import { motion } from 'framer-motion';

export default function Career() {
    const { hero, future, culture, jobs, internships } = content.career;

    return (
        <div className="space-y-16 py-10">
            <section className="text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-display font-bold mb-6"
                >
                    {hero.title}
                </motion.h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">{hero.description}</p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-panel p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">{future.title}</h2>
                    <p className="text-gray-300">{future.description}</p>
                </div>
                <div className="glass-panel p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">{culture.title}</h2>
                    <p className="text-gray-300">{culture.description}</p>
                </div>
            </div>

            <section>
                <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-accent mb-4">Jobs (India & USA)</h3>
                        {jobs.map((job, idx) => (
                            <div key={idx} className="glass-panel p-4 rounded-lg flex justify-between items-center group cursor-pointer">
                                <span className="font-medium group-hover:text-secondary transition-colors">{job}</span>
                                <span className="text-gray-500 text-sm">&rarr;</span>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-accent mb-4">Internships</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {internships.map((internship, idx) => (
                                <div key={idx} className="glass-panel p-4 rounded-lg text-sm group cursor-pointer">
                                    <span className="font-medium group-hover:text-secondary transition-colors">{internship}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
