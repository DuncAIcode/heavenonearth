import React from 'react';
import { motion } from 'framer-motion';
import { Home, Leaf, Wind, ArrowLeft, Sparkles, Droplets, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const Regenerative = () => {
    return (
        <div className="min-h-screen bg-heaven-dark text-heaven-starlight selection:bg-heaven-emerald/30 selection:text-heaven-emerald">
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-end pb-12 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1518005020250-6859453309a9?auto=format&fit=crop&q=80"
                        alt="Regenerative Architecture"
                        className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-heaven-dark via-heaven-dark/60 to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-heaven-emerald/60 hover:text-heaven-emerald transition-all mb-8 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] uppercase tracking-[0.4em] font-medium">Return to Base</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 bg-heaven-emerald/10 border border-heaven-emerald/20 text-heaven-emerald text-[10px] font-bold uppercase tracking-[0.3em] rounded-full backdrop-blur-md">
                                Architecture of Renewal
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif text-white mb-4">Regenerative <span className="text-heaven-emerald/80 italic">Living</span></h1>
                        <p className="text-heaven-starlight/60 text-lg max-w-2xl font-light leading-relaxed">
                            Building the future from the earth beneath our feet. We create structures that don't just sit on the land, but breathe with it.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Main Narrative */}
                    <div className="lg:col-span-7 space-y-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-[1px] w-12 bg-heaven-emerald/40" />
                                <span className="text-[10px] uppercase tracking-[0.5em] text-heaven-emerald font-bold">The Philosophy</span>
                            </div>

                            <h2 className="text-3xl font-serif leading-tight">
                                Our regenerative living philosophy is rooted in <span className="italic">earth-architecture</span> and sustainable stewardship.
                            </h2>

                            <p className="text-heaven-starlight/70 leading-relaxed text-lg font-light">
                                We specialize in mud houses and bamboo structures that integrate seamlessly with the Costa Rican rainforest. Every home is a part of the ecosystem, employing thermal mass, natural ventilation, and organic materials to create a living space that heals both the dweller and the soil.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                                <div className="p-6 bg-heaven-dark/40 border border-heaven-emerald/10 rounded-2xl hover:border-heaven-emerald/30 transition-all duration-500 group">
                                    <div className="w-10 h-10 rounded-xl bg-heaven-emerald/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Home className="text-heaven-emerald/60" size={20} />
                                    </div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-2">Thermal Mass</h4>
                                    <p className="text-xs text-heaven-starlight/50 leading-loose">Utilizing earth walls to regulate temperature naturally, eliminating the need for artificial cooling.</p>
                                </div>
                                <div className="p-6 bg-heaven-dark/40 border border-heaven-emerald/10 rounded-2xl hover:border-heaven-emerald/30 transition-all duration-500 group">
                                    <div className="w-10 h-10 rounded-xl bg-heaven-emerald/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Droplets className="text-heaven-emerald/60" size={20} />
                                    </div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-2">Water Circles</h4>
                                    <p className="text-xs text-heaven-starlight/50 leading-loose">Integrated greywater systems and rainwater harvesting that nourish our permaculture gardens.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Offerings Sidebar */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-heaven-dark/40 border border-heaven-emerald/10 p-10 rounded-[2rem] backdrop-blur-xl sticky top-32"
                        >
                            <h3 className="text-heaven-emerald text-[10px] uppercase tracking-[0.4em] font-bold mb-8 flex items-center gap-3">
                                <Sparkles size={14} /> Sanctuary Offerings
                            </h3>

                            <ul className="space-y-8">
                                {[
                                    { icon: Leaf, title: "Earth-Architecture", desc: "Mud house & bamboo design" },
                                    { icon: Wind, title: "Natural Ventilation", desc: "Passive cooling systems" },
                                    { icon: Sun, title: "Solar Integration", desc: "Grid-independent power" },
                                    { icon: Home, title: "Permaculture Landscaping", desc: "Edible forest integration" }
                                ].map((offering, idx) => (
                                    <li key={idx} className="group cursor-default">
                                        <div className="flex items-center gap-4 mb-2">
                                            <offering.icon size={18} className="text-heaven-emerald/40 group-hover:text-heaven-emerald transition-colors" />
                                            <span className="text-sm font-medium text-white/90">{offering.title}</span>
                                        </div>
                                        <p className="text-xs text-heaven-starlight/40 pl-8 leading-relaxed">
                                            {offering.desc}
                                        </p>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12 pt-8 border-t border-heaven-emerald/10">
                                <button className="w-full py-4 bg-heaven-emerald/10 hover:bg-heaven-emerald/20 border border-heaven-emerald/20 text-heaven-emerald text-[10px] font-bold uppercase tracking-[0.3em] rounded-xl transition-all duration-300">
                                    Discuss Your Build
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Ambient Background Elements */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-heaven-emerald/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-heaven-emerald/5 rounded-full blur-[100px]" />
            </div>
        </div>
    );
};

export default Regenerative;

