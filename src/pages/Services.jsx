import { content } from '../content_data';
import { motion } from 'framer-motion';

export default function Services() {
    const { hero, categories } = content.servicesPage;

    return (
        <div className="py-10 space-y-16">
            <section className="text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-display font-bold mb-6"
                >
                    {hero.title}
                </motion.h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">{hero.description}</p>
            </section>

            <div className="grid gap-8">
                {categories.map((category, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel p-8 rounded-2xl"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-gradient">{category.title}</h2>
                        <p className="text-gray-300 italic mb-6">{category.focus}</p>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {category.items.map((item, i) => (
                                <div key={i} className="bg-white/5 p-3 rounded-lg border border-glass-border text-sm hover:bg-white/10 transition-colors">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
