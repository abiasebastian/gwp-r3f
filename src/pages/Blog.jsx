import { content } from '../content_data';
import { motion } from 'framer-motion';

export default function Blog() {
    const { title, featured, topReads } = content.blog;

    return (
        <div className="py-10">
            <h1 className="text-4xl font-display font-bold mb-12 text-center">{title}</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Featured Post */}
                <motion.div
                    className="md:col-span-2 glass-panel p-8 rounded-2xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 block">Featured</span>
                    <h2 className="text-2xl font-bold mb-4">{featured.title}</h2>
                    <p className="text-gray-300 mb-6">{featured.excerpt}</p>
                    <button className="text-secondary hover:text-white transition-colors">Read more &rarr;</button>
                </motion.div>

                {/* Top Reads */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold mb-4">Top Reads</h3>
                    {topReads.map((read, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-panel p-4 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                        >
                            <h4 className="font-medium">{read}</h4>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
