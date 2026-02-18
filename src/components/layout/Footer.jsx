import React from "react";


import Logo from "../../assets/gwplogo.svg";
import LinkedinIcon from "../../assets/Linkedin-footer-icon.svg";
import EmailIcon from "../../assets/email-footer-icon.svg";
import IndiaFlag from "../../assets/indian-flag.svg";
import USAFlag from "../../assets/usa-flag.svg";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-[#061539] via-[#062157] to-[#062862] text-white w-full z-[60] font-poppins px-4 py-8 md:px-32 md:py-10">
            <div className="container mx-auto">

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between w-full gap-10 lg:gap-16">


                    <div className="flex justify-center lg:justify-start lg:pr-10">
                        <img src={Logo} alt="Global Web Production" className="w-32 md:w-28" />
                    </div>


                    <div className="hidden lg:flex gap-16">


                        <div className="flex flex-col space-y-2 text-[#57C2FF]">
                            <h1 className="text-white text-lg font-semibold">Company</h1>
                            <a href="/" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-[#57C2FF]">Home</a>
                            <a href="/about" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">About</a>
                            <a href="/contact" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Contact us</a>
                            <a href="/enterprise-solutions" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Enterprise Solutions</a>
                            <a href="/small-to-medium-business" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Small to Medium Business</a>
                            <a href="/career" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Careers</a>
                        </div>


                        <div className="flex flex-col space-y-2 text-[#57C2FF]">
                            <h1 className="text-white text-lg font-semibold">Services</h1>
                            <a href="/services/applicationServices" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Application Support Services</a>
                            <a href="/services/enterpriseplatformServices" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Enterprise Platform Services</a>
                            <a href="/services/CRMImplementation" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">CRM Implementation</a>
                            <a href="/services/softwareproductdevelopment" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Software Product Development</a>
                            <a href="/services/qualityengineeringassurance" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Quality Engineering &amp; Assurance</a>
                            <a href="/services/engineeringresearchdevelopment" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Engineering Research &amp; Development</a>
                            <a href="/services/technology" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Technology Consulting</a>
                        </div>


                        <div className="flex flex-col space-y-2 text-[#57C2FF]">
                            <div className="h-6"></div>
                            <a href="/services/businessprocessservices" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Business Process Services</a>
                            <a href="/services/dataandai" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Data &amp; AI</a>
                            <a href="/services/agenticaisolutions" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Agentic AI Solutions</a>
                            <a href="/services/intelligentbusinessautomations" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Intelligent Business Automations</a>
                            <a href="/services/gwpinsights" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">GWP Insights</a>
                            <a href="/services/experimentationoptimization" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Experimentation &amp; Optimization</a>
                        </div>


                        <div className="flex flex-col space-y-2 text-[#57C2FF]">
                            <div className="h-6"></div>
                            <a href="/services/digital" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Digital Strategy</a>
                            <a href="/services/sustainability" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Sustainability &amp; Resilience</a>
                            <a href="/services/experiencestudio" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Experience Studio</a>
                            <a href="/services/contentservices" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Content Services</a>
                            <a href="/services/branding" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Branding</a>
                            <a href="/services/gamesproductiondevelopment" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Games Production &amp; Development</a>
                            <a href="/services/accessibility" className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white">Accessibility</a>
                        </div>

                        <div className="flex flex-col space-y-2 text-[#57C2FF]">
                            <h1 className="text-white text-lg font-semibold">Partners</h1>
                            <a href="https://www.artech.com/" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors duration-300 text-white hover:text-[#57C2FF]">Artech</a>
                            <a href="https://ladder7.in" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors duration-300 text-white hover:text-[#57C2FF]">Ladder7</a>
                        </div>
                    </div>

                </div>


                <div className="w-full h-px bg-white/10 my-6"></div>


                <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-10">


                    <div className="flex flex-col items-start space-y-4">
                        <div className="flex space-x-4">
                            <a href="https://www.linkedin.com/company/global-web-production/" target="_blank" rel="noopener noreferrer" className="bg-white p-1 rounded">
                                <img src={LinkedinIcon} alt="LinkedIn" className="w-6 h-6 object-cover" />
                            </a>
                            <a href="mailto:lekshmi@globalwebproduction.com" className="bg-white p-1 rounded">
                                <img src={EmailIcon} alt="Email" className="w-6 h-6 object-cover" />
                            </a>
                        </div>
                        <div className="text-white text-xs md:text-sm">
                            © Copyright 2025 | Global Web Production LLC | All Rights Reserved
                        </div>
                    </div>

                    <div className="flex flex-row sm:flex-col md:flex-row gap-10 text-right items-start pl-0 sm:pl-10">
                        <div className="flex flex-col items-end space-y-2">
                            <div className="flex items-center space-x-2">
                                <img src={IndiaFlag} alt="India Flag" className="w-6 h-4 object-cover" />
                                <div className="font-semibold">INDIA</div>
                            </div>
                            <p className="text-xs md:text-sm max-w-xs text-right">Trivandrum,<br />Kerala, India</p>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                            <div className="flex items-center space-x-2">
                                <img src={USAFlag} alt="USA Flag" className="w-6 h-4 object-cover" />
                                <div className="font-semibold">USA</div>
                            </div>
                            <p className="text-xs md:text-sm max-w-xs text-right">Hourglass ST,<br />Temecula, CA</p>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
