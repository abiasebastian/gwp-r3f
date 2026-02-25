import { content } from '../content_data';
import { motion } from 'framer-motion';
import ContactLightningScene from '../components/ContactLightningScene';

export default function Contact() {
    const { hero, form } = content.contact;

    return (
        <div className="py-10 space-y-12 max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start pt-10">
                {/* Left Column: Contact Form */}
                <div className="space-y-8 order-2 lg:order-1">
                    <div className="text-left">
                        <h1 className="text-2xl md:text-3xl font-display font-bold mb-4 text-white">{hero.title}</h1>
                        <p className="text-gray-400 text-lg">{hero.description}</p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="glass-panel p-8 rounded-2xl border border-white/5 bg-white/5"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-white">{form.title}</h2>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="First Name" className="bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-cyan-500 transition-colors w-full text-white" />
                                <input type="text" placeholder="Last Name" className="bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-cyan-500 transition-colors w-full text-white" />
                            </div>
                            <input type="text" placeholder="Company" className="bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-cyan-500 transition-colors w-full text-white" />
                            <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-cyan-500 transition-colors w-full text-white" />
                            <select className="bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-cyan-500 transition-colors w-full text-gray-400">
                                <option className="bg-[#020617]">Select Business Area</option>
                                <option className="bg-[#020617]">Enterprise</option>
                                <option className="bg-[#020617]">SMB</option>
                            </select>
                            <textarea placeholder="Message" rows="4" className="bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-cyan-500 transition-colors w-full text-white"></textarea>
                            <button type="submit" className="w-full bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-500/20">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
