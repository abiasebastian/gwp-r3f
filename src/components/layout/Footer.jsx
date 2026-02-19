
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/gwplogo.svg";
import LinkedinIcon from "../../assets/Linkedin-footer-icon.svg";
import EmailIcon from "../../assets/email-footer-icon.svg";
import IndiaFlag from "../../assets/indian-flag.svg";
import USAFlag from "../../assets/usa-flag.svg";

const Footer = () => {
    return (
        <footer className="relative z-50 mt-20 border-t border-white/10 bg-black/20 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
                    {/* Logo & Socials */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link to="/" className="inline-block">
                            <img src={Logo} alt="Global Web Production" className="w-32" />
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Transforming businesses with cutting-edge web solutions and 3D experiences.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.linkedin.com/company/global-web-production/" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-2 rounded-lg hover:bg-white/10 transition-colors border border-white/10">
                                <img src={LinkedinIcon} alt="LinkedIn" className="w-5 h-5" />
                            </a>
                            <a href="mailto:lekshmi@globalwebproduction.com" className="bg-white/5 p-2 rounded-lg hover:bg-white/10 transition-colors border border-white/10">
                                <img src={EmailIcon} alt="Email" className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-display font-bold text-white mb-6">Company</h4>
                        <ul className="space-y-3">
                            {['Home', 'About', 'Contact', 'Career'].map((item) => (
                                <li key={item}>
                                    <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link to="/enterprise-solutions" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                                    Enterprise Solutions
                                </Link>
                            </li>
                            <li>
                                <Link to="/small-to-medium-business" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                                    SMB Solutions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services 1 */}
                    <div>
                        <h4 className="font-display font-bold text-white mb-6">Services</h4>
                        <ul className="space-y-3">
                            {[
                                { name: 'App Support', path: '/services/applicationServices' },
                                { name: 'Enterprise Platform', path: '/services/enterpriseplatformServices' },
                                { name: 'CRM Implementation', path: '/services/CRMImplementation' },
                                { name: 'Product Dev', path: '/services/softwareproductdevelopment' },
                                { name: 'Quality Engineering', path: '/services/qualityengineeringassurance' },
                            ].map((service) => (
                                <li key={service.name}>
                                    <Link to={service.path} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services 2 */}
                    <div>
                        <div className="h-0 md:h-12 hidden md:block"></div> {/* Spacer for alignment */}
                        <ul className="space-y-3">
                            {[
                                { name: 'Data & AI', path: '/services/dataandai' },
                                { name: 'Agentic AI', path: '/services/agenticaisolutions' },
                                { name: 'Business Automation', path: '/services/intelligentbusinessautomations' },
                                { name: 'GWP Insights', path: '/services/gwpinsights' },
                                { name: 'Digital Strategy', path: '/services/digital' },
                            ].map((service) => (
                                <li key={service.name}>
                                    <Link to={service.path} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-display font-bold text-white mb-6">Locations</h4>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-3">
                                <img src={IndiaFlag} alt="India" className="w-6 mt-1" />
                                <div>
                                    <p className="text-white font-semibold text-sm">India</p>
                                    <p className="text-slate-400 text-xs">Trivandrum, Kerala</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <img src={USAFlag} alt="USA" className="w-6 mt-1" />
                                <div>
                                    <p className="text-white font-semibold text-sm">USA</p>
                                    <p className="text-slate-400 text-xs">Temecula, CA</p>
                                </div>
                            </div>
                        </div>
                        <h4 className="font-display font-bold text-white mt-8 mb-4">Partners</h4>
                        <div className="space-y-2">
                            <a href="https://www.artech.com/" target="_blank" rel="noopener noreferrer" className="block text-sm text-slate-400 hover:text-cyan-400 transition-colors">Artech</a>
                            <a href="https://ladder7.in" target="_blank" rel="noopener noreferrer" className="block text-sm text-slate-400 hover:text-cyan-400 transition-colors">Ladder7</a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-xs text-center md:text-left">
                        © 2025 Global Web Production LLC. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link to="/privacy" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
