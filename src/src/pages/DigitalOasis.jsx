import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Globe, Cpu, ArrowLeft, Wifi, Terminal, Shield, Workflow, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const DigitalOasis = () => {
    const technologies = [
        {
            icon: <Wifi className="text-heaven-emerald" size={24} />,
            title: "Liana Link (Low-Latency)",
            description: "Satellite fiber-optics woven through the canopy, providing high-speed connectivity with zero footprint."
        },
        {
            icon: <Terminal className="text-heaven-emerald" size={24} />,
            title: "Primal Code Hubs",
            description: "Minimalist co-working nodes designed to channel the jungle's focus into digital manifestation."
        },
        {
            icon: <Shield className="text-heaven-emerald" size={24} />,
            title: "Sovereign Infrastructure",
            description: "Self-healing network architecture powered by the sun and secured by biological encryption."
        },
        {
            icon: <Workflow className="text-heaven-emerald" size={24} />,
            title: "Digital De-Acceleration",
            description: "Smart filters and signal-damped zones that prioritize human presence over notification cycles."
        }
    ];

    return (
        <div className="min-h-screen bg-heaven-dark text-heaven-starlight overflow-hidden selection:bg-heaven-emerald/30 selection:text-heaven-emerald">
            {/* Background Grid Pattern */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-heaven-dark via-transparent to-heaven-dark" />
            </div>

            {/* Immersive Cyber-Organic Hero */}
            <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.2)_0%,transparent_70%)] animate-pulse" />
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                        alt="Digital Oasis"
                        className="w-full h-full object-cover grayscale opacity-40 mix-blend-overlay"
                    />
                </motion.div>

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-heaven-emerald/5 border border-heaven-emerald/20 text-heaven-emerald text-[10px] font-bold uppercase tracking-[0.5em] mb-8 backdrop-blur-md"
                    >
                        <Cpu size={14} className="animate-spin-slow" />
                        Bio-Digital Integration
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-7xl md:text-9xl font-serif mb-6 tracking-tighter"
                    >
                        Digital <span className="text-heaven-emerald italic font-light">Oasis</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ delay: 1 }}
                        className="text-xs uppercase tracking-[0.8em] font-bold text-heaven-starlight"
                    >
                        Stay Linked. Stay Wild.
                    </motion.p>
                </div>

                {/* Vertical Data Streams */}
                <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none overflow-hidden opacity-20">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute top-0 w-px h-[200px] bg-gradient-to-b from-transparent via-heaven-emerald to-transparent"
                            style={{ left: `${20 * i + 10}%` }}
                            animate={{
                                y: ['-200px', '100vh'],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 5
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
                {/* Navigation Link */}
                <Link to="/" className="inline-flex items-center gap-4 text-heaven-starlight/20 hover:text-heaven-emerald transition-all mb-20 group">
                    <div className="p-2 rounded-full border border-white/5 group-hover:border-heaven-emerald/40 transition-colors">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Base Command</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        <div>
                            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                                High-Speed <span className="italic">Serenity</span> for the Global Visionary.
                            </h2>
                            <p className="text-heaven-starlight/60 leading-loose font-serif font-light text-xl">
                                We believe that connectivity shouldn't cost our connection to the earth. The Digital Oasis provides the infrastructure for high-bandwidth creation, allowing you to manifest global impact without the static of traditional urban existence.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-12 pt-8 border-t border-white/5">
                            <div>
                                <div className="text-heaven-emerald text-3xl font-serif mb-2 italic">1 Gbps+</div>
                                <div className="text-[10px] uppercase tracking-widest text-heaven-starlight/40 font-bold">Forest Fiber</div>
                            </div>
                            <div>
                                <div className="text-heaven-emerald text-3xl font-serif mb-2 italic">0%</div>
                                <div className="text-[10px] uppercase tracking-widest text-heaven-starlight/40 font-bold">Signal Interference</div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                        {/* Decorative Glow */}
                        <div className="absolute inset-0 bg-heaven-emerald/5 blur-[120px] rounded-full z-0" />

                        {technologies.map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative z-10 p-8 bg-heaven-dark/40 border border-white/5 rounded-[2.5rem] hover:border-heaven-emerald/30 transition-all duration-700 backdrop-blur-2xl group flex flex-col justify-between aspect-square"
                            >
                                <div className="p-5 bg-heaven-emerald/5 rounded-2xl w-fit group-hover:bg-heaven-emerald/10 transition-all group-hover:scale-110">
                                    {tech.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-serif mb-3 group-hover:text-heaven-emerald transition-colors">{tech.title}</h3>
                                    <p className="text-heaven-starlight/40 text-[10px] leading-relaxed uppercase tracking-widest leading-relaxed">{tech.description}</p>
                                </div>
                                <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-10 transition-opacity">
                                    <Share2 size={40} className="text-heaven-emerald" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Tech Showcase Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <div className="p-10 bg-heaven-dark/20 border border-white/5 rounded-[3rem] text-center border-b-heaven-emerald/20 border-b-2">
                        <h4 className="font-serif text-2xl mb-4 italic text-heaven-emerald">The Link</h4>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-heaven-starlight/40 leading-relaxed font-bold">
                            Experience the future of remote presence with zero carbon footprint.
                        </p>
                    </div>
                    <div className="p-10 bg-heaven-dark/20 border border-white/5 rounded-[3rem] text-center border-b-heaven-emerald/20 border-b-2">
                        <h4 className="font-serif text-2xl mb-4 italic text-heaven-emerald">The Hub</h4>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-heaven-starlight/40 leading-relaxed font-bold">
                            Workspaces designed with the golden ratio to maximize creative output.
                        </p>
                    </div>
                    <div className="p-10 bg-heaven-dark/20 border border-white/5 rounded-[3rem] text-center border-b-heaven-emerald/20 border-b-2">
                        <h4 className="font-serif text-2xl mb-4 italic text-heaven-emerald">The Void</h4>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-heaven-starlight/40 leading-relaxed font-bold">
                            Absolute signal silence areas for deep recalibration and strategic thought.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DigitalOasis;
