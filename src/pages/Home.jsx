
import { content } from '../content_data';
import { motion } from 'framer-motion';

export default function Home() {
    const { hero, services, offerings, partners } = content.home;

    return (
        <div className="space-y-20 py-10">
            {/* Hero Section */}
            <section className="min-h-[60vh] flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 leading-tight text-white">
                        {hero.title}
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-cyan-400 font-light mb-6">
                        {hero.subtitle}
                    </h2>
                    <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                        {hero.description}
                    </p>
                </motion.div>
            </section>

            {/* Services Section */}
            <section className="grid md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel p-8 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-gradient">{service.title}</h3>
                        <p className="text-slate-400 leading-relaxed">{service.description}</p>
                    </motion.div>
                ))}
            </section>

            {/* Offerings Section */}
            <section>
                <h3 className="text-3xl font-display font-bold mb-8 text-center text-white">{offerings.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {offerings.list.map((item, idx) => (
                        <div key={idx} className="glass-panel p-6 rounded-xl text-center flex items-center justify-center min-h-[120px] border border-white/5">
                            <span className="font-semibold text-lg text-white">{item}</span>
                        </div>
                    ))}
                </div>
                <p className="mt-8 text-center text-slate-400 max-w-3xl mx-auto">
                    {offerings.description}
                </p>
            </section>

            {/* Partners Section */}
            <section className="glass-panel p-10 rounded-3xl text-center border border-white/5">
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">{partners.title}</h3>
                <p className="text-slate-400 max-w-2xl mx-auto">{partners.description}</p>
            </section>
        </div>
    );
}
