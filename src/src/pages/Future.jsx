import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Zap, Eye } from 'lucide-react';

const Future = () => {
    return (
        <div className="min-h-screen bg-heaven-dark text-heaven-starlight selection:bg-heaven-emerald/30 selection:text-white">
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-heaven-emerald/5 blur-[120px] rounded-full" />
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-heaven-forest/5 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <Link
                        to="/"
                        className="group flex items-center gap-3 text-heaven-emerald/60 hover:text-heaven-emerald transition-colors duration-300 uppercase text-xs tracking-[0.3em] font-medium"
                    >
                        <div className="p-2 border border-heaven-emerald/20 group-hover:border-heaven-emerald/50 rounded-full transition-all duration-300">
                            <ArrowLeft size={16} />
                        </div>
                        Back to Sanctuary
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-6 text-heaven-emerald">
                        <Sparkles size={32} strokeWidth={1.5} />
                        <span className="uppercase tracking-[0.4em] text-sm">Destiny</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif text-heaven-starlight leading-tight mb-8">
                        The Future I See
                    </h1>
                    <p className="text-xl text-heaven-starlight/60 font-light leading-relaxed italic">
                        "A future where every home is a forest, and every person is a steward."
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3 text-heaven-emerald/80">
                            <Eye size={20} />
                            <h2 className="uppercase tracking-widest text-sm font-medium">Visionary Living</h2>
                        </div>
                        <p className="text-heaven-starlight/70 leading-relaxed font-light">
                            I see a world where our built environment is no longer a scar on the landscape, but a contribution to it. Where our buildings breathe with the forest and our communities are woven into the wild.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3 text-heaven-emerald/80">
                            <Zap size={20} />
                            <h2 className="uppercase tracking-widest text-sm font-medium">The Spark of Change</h2>
                        </div>
                        <p className="text-heaven-starlight/70 leading-relaxed font-light">
                            This sanctuary is just the beginning. The vision is to scale these regenerative practices to projects around the globe, creating a network of 'Heavens on Earth' that restore the planet.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="p-12 bg-heaven-emerald/5 border-l-2 border-heaven-emerald relative"
                >
                    <p className="text-2xl font-serif italic text-heaven-emerald/90 leading-relaxed">
                        "The best way to predict the future is to create it, one seed at a time."
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Future;
