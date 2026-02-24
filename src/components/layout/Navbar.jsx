import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Logo from '../../assets/gwplogo.svg';

const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blogs', path: '/blog' },
    { name: 'Careers', path: '/career' },
    { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-glass-border">
            <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
                {/* Logo on the left */}
                <Link to="/" className="flex items-center shrink-0">
                    <img src={Logo} alt="Global Web Production" className="w-40 md:w-48" />
                </Link>

                {/* Desktop Menu on the right */}
                <div className="hidden md:flex space-x-8 ml-auto">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-base font-bold transition-all duration-300 hover:scale-110 ${location.pathname === link.path
                                ? 'text-cyan-400'
                                : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button - Moved to the right on mobile */}
                <div className="md:hidden text-white cursor-pointer ml-auto" onClick={() => setIsOpen(!isOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`px-4 pt-2 pb-4 space-y-2 bg-slate-900 shadow-xl border-t border-white/5`}
                    >
                        <div className="px-6 py-4 flex flex-col space-y-4">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-lg font-bold transition-transform active:scale-95 ${location.pathname === link.path ? 'text-cyan-400' : 'text-gray-300 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
