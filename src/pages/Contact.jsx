import { content } from '../content_data';
import { motion } from 'framer-motion';

export default function Contact() {
    const { hero, form, services, locations } = content.contact;

    return (
        <div className="py-10 space-y-12">
            <section className="text-center">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{hero.title}</h1>
                <p className="text-gray-300">{hero.description}</p>
            </section>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    className="glass-panel p-8 rounded-2xl"
                >
                    <h2 className="text-2xl font-bold mb-6">{form.title}</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="First Name" className="bg-white/5 border border-glass-border rounded-lg p-3 focus:outline-none focus:border-secondary transition-colors w-full" />
                            <input type="text" placeholder="Last Name" className="bg-white/5 border border-glass-border rounded-lg p-3 focus:outline-none focus:border-secondary transition-colors w-full" />
                        </div>
                        <input type="text" placeholder="Company" className="bg-white/5 border border-glass-border rounded-lg p-3 focus:outline-none focus:border-secondary transition-colors w-full" />
                        <input type="email" placeholder="Email" className="bg-white/5 border border-glass-border rounded-lg p-3 focus:outline-none focus:border-secondary transition-colors w-full" />
                        <select className="bg-white/5 border border-glass-border rounded-lg p-3 focus:outline-none focus:border-secondary transition-colors w-full text-gray-400">
                            <option>Select Business Area</option>
                            <option>Enterprise</option>
                            <option>SMB</option>
                        </select>
                        <textarea placeholder="Message" rows="4" className="bg-white/5 border border-glass-border rounded-lg p-3 focus:outline-none focus:border-secondary transition-colors w-full"></textarea>
                        <button type="submit" className="w-full bg-secondary text-primary font-bold py-3 rounded-lg hover:bg-cyan-400 transition-colors">
                            Send Message
                        </button>
                    </form>
                </motion.div>

                {/* Info & Locations */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        className="glass-panel p-8 rounded-2xl"
                    >
                        <h3 className="text-xl font-bold mb-4 text-accent">Services Offered</h3>
                        <div className="flex flex-wrap gap-2">
                            {services.map((service, idx) => (
                                <span key={idx} className="px-3 py-1 bg-white/5 rounded-full text-sm border border-glass-border">
                                    {service}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-panel p-8 rounded-2xl"
                    >
                        <h3 className="text-xl font-bold mb-4 text-accent">Our Locations</h3>
                        <ul className="space-y-2">
                            {locations.map((loc, idx) => (
                                <li key={idx} className="flex items-center space-x-2">
                                    <span className="text-secondary">📍</span>
                                    <span>{loc}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
